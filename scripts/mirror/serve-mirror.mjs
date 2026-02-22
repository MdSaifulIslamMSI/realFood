#!/usr/bin/env node
/**
 * serve-mirror - Local static file server for mirror development and local checks.
 *
 * Production is served via Vercel static hosting. This server exists for local
 * parity checks and offline validation only.
 */
import { createReadStream } from "node:fs";
import { readFile, realpath, stat } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import http from "node:http";
import { extname, isAbsolute, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../../mirror.config.mjs";
import { createLogger } from "./lib/utils.mjs";

const log = createLogger("serve-mirror");
const PUBLIC_ROOT = resolve(fileURLToPath(new URL("../../public/", import.meta.url)));
const PUBLIC_ROOT_CANONICAL = await realpath(PUBLIC_ROOT);

const getMimeType = (filePath) =>
  config.mimeTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream";

/* ---------- Rate limiter ---------- */
const rateBuckets = new Map();
const { windowMs, maxRequests } = config.serve.rateLimit;

const isRateLimited = (ip) => {
  const now = Date.now();
  let bucket = rateBuckets.get(ip);

  if (!bucket || now - bucket.windowStart > windowMs) {
    bucket = { windowStart: now, count: 0 };
    rateBuckets.set(ip, bucket);
  }

  bucket.count += 1;
  return bucket.count > maxRequests;
};

// Prune stale buckets every 2 minutes.
setInterval(() => {
  const cutoff = Date.now() - windowMs * 2;
  for (const [ip, bucket] of rateBuckets) {
    if (bucket.windowStart < cutoff) rateBuckets.delete(ip);
  }
}, 120_000).unref();

/* ---------- Path resolution ---------- */
const resolveFilePath = async (requestPathname) => {
  const pathname = requestPathname === "/" ? "/index.html" : requestPathname;
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const relativePath = decoded.replace(/^[/\\]+/, "");
  const candidate = normalize(join(PUBLIC_ROOT, relativePath));

  try {
    const resolved = await realpath(candidate);
    const rel = relative(PUBLIC_ROOT_CANONICAL, resolved);
    if (rel.startsWith("..") || isAbsolute(rel)) {
      return null;
    }
    return resolved;
  } catch {
    return null;
  }
};

/* ---------- CSP ---------- */
const buildCsp = (nonce) =>
  [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self'",
    "img-src 'self' data: blob:",
    "media-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

/* ---------- HTML nonce injection ---------- */
const injectNonce = async (filePath, nonce) => {
  let html = await readFile(filePath, "utf8");
  html = html.replace(/<script(?![^>]*\bnonce=)/gi, `<script nonce="${nonce}"`);
  return html;
};

/* ---------- File serving ---------- */
const sendFile = async (req, res, filePath, nonce) => {
  const fileStat = await stat(filePath);
  const mimeType = getMimeType(filePath);

  const securityHeaders = {
    "Content-Security-Policy": buildCsp(nonce),
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
  };

  if (filePath.endsWith(".html") || filePath.endsWith(".htm")) {
    const html = await injectNonce(filePath, nonce);
    const body = Buffer.from(html, "utf8");
    res.writeHead(200, {
      "Content-Type": mimeType,
      "Content-Length": body.length,
      "Cache-Control": "no-cache",
      ...securityHeaders,
    });
    res.end(body);
    return;
  }

  const rangeHeader = req.headers.range;
  if (rangeHeader && mimeType.startsWith("video/")) {
    const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
    if (!match) {
      res.writeHead(416, securityHeaders);
      res.end();
      return;
    }

    const start = match[1] ? Number.parseInt(match[1], 10) : 0;
    const end = match[2] ? Number.parseInt(match[2], 10) : fileStat.size - 1;

    if (start > end || end >= fileStat.size) {
      res.writeHead(416, securityHeaders);
      res.end();
      return;
    }

    res.writeHead(206, {
      "Content-Type": mimeType,
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
      ...securityHeaders,
    });

    createReadStream(filePath, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, {
    "Content-Type": mimeType,
    "Content-Length": fileStat.size,
    "Cache-Control": "public, max-age=31536000, immutable",
    ...securityHeaders,
  });

  createReadStream(filePath).pipe(res);
};

/* ---------- Server ---------- */
const main = async () => {
  const portArgIndex = process.argv.indexOf("--port");
  const port =
    portArgIndex >= 0
      ? Number.parseInt(process.argv[portArgIndex + 1] ?? String(config.serve.port), 10)
      : config.serve.port;

  const nonce = randomBytes(16).toString("base64");

  const server = http.createServer(async (req, res) => {
    const clientIp = req.socket.remoteAddress ?? "unknown";

    if (isRateLimited(clientIp)) {
      res.writeHead(429, { "Content-Type": "text/plain; charset=utf-8", "Retry-After": "60" });
      res.end("Too Many Requests");
      return;
    }

    try {
      const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "127.0.0.1"}`);
      const filePath = await resolveFilePath(url.pathname);

      if (!filePath) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
      }

      await sendFile(req, res, filePath, nonce);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
    }
  });

  server.listen(port, config.serve.host, () => {
    log.info("Server started", { port, host: config.serve.host, nonce: nonce.slice(0, 4) + "..." });
  });
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});