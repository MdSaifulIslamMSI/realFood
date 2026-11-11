#!/usr/bin/env node
/**
 * serve-mirror - Local static file server for mirror development and local checks.
 *
 * Production is served via Vercel static hosting. This server exists for local
 * parity checks and offline validation only.
 *
 * Security properties:
 *  - GET/HEAD only (plus a tiny, side-effect-free telemetry stub surface).
 *  - Canonical-path containment check so encoded traversal and symlinks cannot
 *    escape `public/`.
 *  - Directory requests are rejected instead of streamed (streaming a directory
 *    used to raise an unhandled EISDIR and terminate the process).
 *  - Stream errors are contained; a malformed range request cannot crash the
 *    process.
 *  - Per-response CSP nonce injected into every script tag.
 *  - The same canonical CSP/header policy as Vercel and Nginx.
 */
import { createReadStream } from "node:fs";
import { readFile, realpath, stat } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import http from "node:http";
import { pipeline } from "node:stream/promises";
import { extname, isAbsolute, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../../mirror.config.mjs";
import { buildCsp, STATIC_SECURITY_HEADERS } from "../../security/policy.mjs";
import { createLogger } from "./lib/utils.mjs";

const log = createLogger("serve-mirror");
const DEFAULT_PUBLIC_ROOT = resolve(fileURLToPath(new URL("../../public/", import.meta.url)));

const getMimeType = (filePath) =>
  config.mimeTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream";

const isTelemetryPath = (pathname) =>
  pathname === "/e" ||
  pathname.startsWith("/e/") ||
  pathname === "/decide" ||
  pathname.startsWith("/decide/");

const CSP_REPORT_PATH = "/api/csp-report";
const CSP_REPORT_CONTENT_TYPES = new Set([
  "application/csp-report",
  "application/reports+json",
  "application/json",
]);

const buildSecurityHeaders = (nonce) => ({
  "Content-Security-Policy": buildCsp({ nonce }),
  ...Object.fromEntries(STATIC_SECURITY_HEADERS),
});

/**
 * Parse a single RFC 7233 byte range.
 *
 * @param {string} header
 * @param {number} size
 * @returns {{start: number, end: number} | "invalid" | "unsatisfiable"}
 */
const parseRange = (header, size) => {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || size <= 0) return "invalid";

  const [, startRaw, endRaw] = match;
  if (!startRaw && !endRaw) return "invalid";

  if (startRaw) {
    const start = Number(startRaw);
    if (!Number.isSafeInteger(start) || start >= size) return "unsatisfiable";

    const requestedEnd = endRaw ? Number(endRaw) : size - 1;
    if (!Number.isSafeInteger(requestedEnd) || requestedEnd < start) return "invalid";

    return { start, end: Math.min(requestedEnd, size - 1) };
  }

  const suffixLength = Number(endRaw);
  if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return "invalid";

  return { start: Math.max(0, size - suffixLength), end: size - 1 };
};

/* ---------- HTML nonce injection ---------- */
const injectNonce = async (filePath, nonce) => {
  let html = await readFile(filePath, "utf8");
  html = html.replace(/<script(?![^>]*\bnonce=)/gi, `<script nonce="${nonce}"`);
  return html;
};

/**
 * Create the HTTP server without binding a port. Exported for security tests.
 *
 * @param {object} [options]
 * @param {string} [options.publicRoot]
 * @param {{windowMs: number, maxRequests: number}} [options.rateLimit]
 * @returns {Promise<import("node:http").Server>}
 */
export const createMirrorServer = async ({
  publicRoot = DEFAULT_PUBLIC_ROOT,
  rateLimit = config.serve.rateLimit,
} = {}) => {
  const canonicalRoot = await realpath(publicRoot);
  const { windowMs, maxRequests } = rateLimit;
  const rateBuckets = new Map();

  const isRateLimited = (ip) => {
    if (ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1") return false;

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
  const pruneTimer = setInterval(() => {
    const cutoff = Date.now() - windowMs * 2;
    for (const [ip, bucket] of rateBuckets) {
      if (bucket.windowStart < cutoff) rateBuckets.delete(ip);
    }
  }, 120_000);
  pruneTimer.unref();

  const resolveFilePath = async (requestPathname) => {
    const pathname = requestPathname === "/" ? "/index.html" : requestPathname;
    let decoded;

    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      return { status: 400 };
    }

    // NUL bytes and Windows drive-letter paths are never valid mirror assets.
    if (decoded.includes("\0") || /^[a-zA-Z]:/.test(decoded.slice(1))) {
      return { status: 400 };
    }

    const relativePath = decoded.replace(/^[/\\]+/, "");
    const candidate = normalize(join(publicRoot, relativePath));

    try {
      const resolved = await realpath(candidate);
      const rel = relative(canonicalRoot, resolved);

      if (rel.startsWith("..") || isAbsolute(rel)) {
        return { status: 403 };
      }

      const stats = await stat(resolved);
      if (!stats.isFile()) {
        return { status: 404 };
      }

      return { status: 200, filePath: resolved, stats };
    } catch {
      return { status: 404 };
    }
  };

  const sendText = (res, status, body, securityHeaders, extra = {}) => {
    const payload = Buffer.from(body, "utf8");
    res.writeHead(status, {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Length": payload.length,
      "Cache-Control": "no-store",
      ...securityHeaders,
      ...extra,
    });
    res.end(payload);
  };

  const sendEmpty = (res, status, securityHeaders, extra = {}) => {
    res.writeHead(status, {
      "Content-Length": 0,
      "Cache-Control": "no-store",
      ...securityHeaders,
      ...extra,
    });
    res.end();
  };

  const sendFile = async (req, res, filePath, stats, securityHeaders) => {
    const mimeType = getMimeType(filePath);
    const isHtml = mimeType.startsWith("text/html");
    const body = isHtml ? Buffer.from(await injectNonce(filePath, req.mirrorNonce), "utf8") : null;
    const rangeHeader = req.headers.range;
    let range = null;

    // HTML is nonce-rewritten per request; ranges over the rewritten body are
    // not meaningful, so HTML always returns the complete document.
    if (!isHtml && rangeHeader) {
      const parsed = parseRange(rangeHeader, stats.size);

      if (parsed === "invalid" || parsed === "unsatisfiable") {
        res.writeHead(416, {
          "Content-Range": `bytes */${stats.size}`,
          "Content-Length": 0,
          "Cache-Control": "no-store",
          ...securityHeaders,
        });
        res.end();
        return;
      }

      range = parsed;
    }

    const length = range ? range.end - range.start + 1 : body ? body.length : stats.size;
    const headers = {
      "Content-Type": mimeType,
      "Content-Length": length,
      "Accept-Ranges": "bytes",
      "Cache-Control": isHtml ? "no-cache" : "public, max-age=31536000, immutable",
      ...securityHeaders,
    };

    if (range) {
      headers["Content-Range"] = `bytes ${range.start}-${range.end}/${stats.size}`;
    }

    res.writeHead(range ? 206 : 200, headers);

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    if (body) {
      res.end(body);
      return;
    }

    try {
      await pipeline(createReadStream(filePath, range ?? undefined), res);
    } catch (error) {
      // The client may have disconnected; never let a stream error reach the
      // process-level uncaught exception handler.
      if (!res.headersSent) {
        sendText(res, 500, "Internal Server Error", securityHeaders);
      } else if (!res.destroyed) {
        res.destroy();
      }
      log.warn("File stream failed", {
        filePath,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const server = http.createServer(async (req, res) => {
    req.mirrorNonce = randomBytes(16).toString("base64");
    const securityHeaders = buildSecurityHeaders(req.mirrorNonce);
    const clientIp = req.socket.remoteAddress ?? "unknown";

    if (isRateLimited(clientIp)) {
      sendText(res, 429, "Too Many Requests", securityHeaders, { "Retry-After": "60" });
      return;
    }

    let url;
    try {
      url = new URL(req.url ?? "/", "http://127.0.0.1");
    } catch {
      sendText(res, 400, "Bad Request", securityHeaders);
      return;
    }

    const method = req.method ?? "GET";

    // CSP violation sink. Mirrors the Vercel function's contract: POST only,
    // 64 KB cap, accepted report content types, no logging or persistence.
    if (url.pathname === CSP_REPORT_PATH) {
      if (method === "OPTIONS") {
        sendEmpty(res, 204, securityHeaders, { Allow: "POST, OPTIONS" });
        return;
      }

      if (method !== "POST") {
        sendEmpty(res, 405, securityHeaders, { Allow: "POST, OPTIONS" });
        return;
      }

      const contentLength = Number.parseInt(String(req.headers["content-length"] ?? "0"), 10);
      if (Number.isFinite(contentLength) && contentLength > 64 * 1024) {
        sendEmpty(res, 413, securityHeaders);
        return;
      }

      const contentType = String(req.headers["content-type"] ?? "")
        .split(";")[0]
        .trim()
        .toLowerCase();
      if (contentType && !CSP_REPORT_CONTENT_TYPES.has(contentType)) {
        sendEmpty(res, 415, securityHeaders);
        return;
      }

      req.resume();
      sendEmpty(res, 204, securityHeaders);
      return;
    }

    // Privacy stubs mirrored from the Vercel rewrites. They never read or store
    // the request body and never contact a third party.
    if (isTelemetryPath(url.pathname)) {
      if (method === "OPTIONS") {
        sendEmpty(res, 204, securityHeaders, { Allow: "GET, HEAD, POST, OPTIONS" });
        return;
      }

      if (method !== "GET" && method !== "HEAD" && method !== "POST") {
        sendEmpty(res, 405, securityHeaders, { Allow: "GET, HEAD, POST, OPTIONS" });
        return;
      }

      sendEmpty(res, 200, securityHeaders, { "Content-Type": "text/plain; charset=utf-8" });
      return;
    }

    if (method === "OPTIONS") {
      sendEmpty(res, 204, securityHeaders, { Allow: "GET, HEAD, OPTIONS" });
      return;
    }

    if (method !== "GET" && method !== "HEAD") {
      sendEmpty(res, 405, securityHeaders, {
        Allow: "GET, HEAD, OPTIONS",
        Connection: "close",
      });
      return;
    }

    try {
      const resolved = await resolveFilePath(url.pathname);

      if (resolved.status !== 200) {
        const body =
          resolved.status === 400
            ? "Bad Request"
            : resolved.status === 403
              ? "Forbidden"
              : "Not Found";
        sendText(res, resolved.status, body, securityHeaders);
        return;
      }

      await sendFile(req, res, resolved.filePath, resolved.stats, securityHeaders);
    } catch (error) {
      if (!res.headersSent) {
        sendText(res, 500, "Internal Server Error", securityHeaders);
      } else if (!res.destroyed) {
        res.destroy();
      }
      log.error("Request failed", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // Malformed request lines/headers must not crash the server either.
  server.on("clientError", (error, socket) => {
    if (!socket.writable) return;
    socket.end("HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-Length: 0\r\n\r\n");
  });

  return server;
};

/**
 * Create and bind the server.
 *
 * @param {object} [options]
 * @param {number} [options.port]
 * @param {string} [options.host]
 * @param {string} [options.publicRoot]
 * @param {{windowMs: number, maxRequests: number}} [options.rateLimit]
 * @returns {Promise<import("node:http").Server>}
 */
export const startMirrorServer = async ({
  port = config.serve.port,
  host = config.serve.host,
  ...options
} = {}) => {
  const server = await createMirrorServer(options);

  await new Promise((resolvePromise, rejectPromise) => {
    const onError = (error) => {
      server.off("listening", onListening);
      rejectPromise(error);
    };
    const onListening = () => {
      server.off("error", onError);
      resolvePromise();
    };

    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(port, host);
  });

  return server;
};

const main = async () => {
  const portArgIndex = process.argv.indexOf("--port");
  const requestedPort =
    portArgIndex >= 0
      ? Number.parseInt(process.argv[portArgIndex + 1] ?? String(config.serve.port), 10)
      : config.serve.port;
  const port =
    Number.isInteger(requestedPort) && requestedPort >= 0 && requestedPort <= 65535
      ? requestedPort
      : config.serve.port;

  const server = await startMirrorServer({ port });
  const address = server.address();
  log.info("Server started", {
    port: typeof address === "object" && address ? address.port : port,
    host: config.serve.host,
  });
};

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();

if (isMain) {
  main().catch((error) => {
    log.error("Fatal error", { error: error.message });
    process.exit(1);
  });
}
