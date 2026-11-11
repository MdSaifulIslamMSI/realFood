#!/usr/bin/env node
/**
 * scan-mirror-integrity - Supply-chain and zero-leakage gate for the static mirror.
 *
 * The mirror is a snapshot of a government website. Even though the capture
 * pipeline sanitizes it, a future scheduled sync could reintroduce a tracker,
 * an external script, a source map, or a committed credential. This gate fails
 * closed on all four classes and is run by `ci:audit-report` and `ci:local`.
 */
import { execSync } from "node:child_process";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../../mirror.config.mjs";

const PUBLIC_ROOT = fileURLToPath(new URL("../../public/", import.meta.url));
const REPORT_PATH = new URL("../../artifacts/ci/mirror-integrity.json", import.meta.url);

const TEXT_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".js",
  ".mjs",
  ".css",
  ".json",
  ".xml",
  ".svg",
  ".txt",
  ".vtt",
]);

// Files that are expected to mention blocked hostnames (the guard must know
// what to block) or that are binary-ish.
const BLOCKED_HOST_ALLOWLIST = new Set(["stubs/network-guard.js"]);

const SECRET_PATTERNS = [
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/g],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9]{36,}\b/g],
  ["Private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  [
    "Vercel token",
    /\b(?:VERCEL_TOKEN|VERCEL_OIDC_TOKEN)\s*[:=]\s*["']?[A-Za-z0-9._-]{20,}/g,
  ],
];

const walk = async (dir, result = []) => {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, result);
    } else {
      result.push(fullPath);
    }
  }
  return result;
};

const issues = [];
const scannedFiles = [];
const blockedHosts = new Set(config.blockedHosts);
const firstPartyHosts = new Set(config.firstPartyHosts);

const files = await walk(PUBLIC_ROOT);

for (const filePath of files) {
  const relativePath = relative(PUBLIC_ROOT, filePath).replaceAll("\\", "/");
  const extension = extname(filePath).toLowerCase();

  if (extension === ".map") {
    issues.push(`Source map shipped to production: ${relativePath}`);
    continue;
  }

  if (!TEXT_EXTENSIONS.has(extension)) continue;

  const content = await readFile(filePath, "utf8");
  scannedFiles.push(relativePath);

  if (!BLOCKED_HOST_ALLOWLIST.has(relativePath)) {
    for (const host of blockedHosts) {
      if (content.includes(host)) {
        issues.push(`Blocked third-party host "${host}" referenced in ${relativePath}`);
      }
    }
  }

  if (extension === ".html" || extension === ".htm") {
    // Outbound <a href> navigation to usda.gov/hhs.gov is legitimate content.
    // Subresources (script/link/iframe/media/form) must never leave the mirror.
    const subresourceTags = content.matchAll(
      /<(script|link|iframe|img|video|audio|source|form)\b[^>]*\b(?:src|href|action)=["'](https?:\/\/[^"']+)["']/gi,
    );
    for (const match of subresourceTags) {
      const tag = match[1].toLowerCase();
      const rawTag = match[0];

      // <link rel="author"> / canonical / alternate are document metadata, not
      // subresources. Navigation links are allowed; fetchable relations are not.
      if (tag === "link") {
        const rel = /\brel=["']([^"']+)["']/i.exec(rawTag)?.[1].toLowerCase() ?? "";
        const fetchable = /(?:^|\s)(?:stylesheet|preload|modulepreload|prefetch|preconnect|dns-prefetch|icon|manifest)(?:\s|$)/;
        if (!fetchable.test(rel)) continue;
      }

      let hostname;
      try {
        hostname = new URL(match[2]).hostname;
      } catch {
        issues.push(`Malformed absolute URL in ${relativePath}: ${match[2]}`);
        continue;
      }

      if (!firstPartyHosts.has(hostname)) {
        issues.push(`External ${tag} subresource "${hostname}" in ${relativePath}`);
      }
    }
  }

  // Only scan human-authored/config-like files for secrets. Minified vendor
  // bundles legitimately contain high-entropy strings that would false-positive.
  if ([".html", ".htm", ".json", ".xml", ".svg"].includes(extension)) {
    for (const [label, pattern] of SECRET_PATTERNS) {
      if (pattern.test(content)) {
        pattern.lastIndex = 0;
        issues.push(`Possible ${label} committed in ${relativePath}`);
      }
      pattern.lastIndex = 0;
    }
  }
}

// The generated guard must still cover the full configured deny list.
const guardPath = join(PUBLIC_ROOT, "stubs", "network-guard.js");
const guard = await readFile(guardPath, "utf8");
for (const host of blockedHosts) {
  if (!guard.includes(host)) {
    issues.push(`network-guard.js does not block configured host "${host}"`);
  }
}

// A tracked orphaned snapshot tree balloons the image and can shadow the
// first-party asset rewrite. The previous 37 MB subtree was removed; keep it
// removed.
let trackedOrphan = "";
try {
  trackedOrphan = execSync("git ls-files public/assets/mirror/realfood.gov", {
    encoding: "utf8",
  }).trim();
} catch {
  // git is unavailable (e.g. source archive); nothing to assert.
}
if (trackedOrphan) {
  issues.push("Tracked orphaned subtree public/assets/mirror/realfood.gov still exists.");
}

// Guard against a future regression that drags the old browserconfig HTML blob
// back in with the wrong MIME type.
const browserConfigPath = join(PUBLIC_ROOT, "assets", "mirror", "realfood.gov", "browserconfig.xml");
try {
  const browserConfig = await stat(browserConfigPath);
  if (browserConfig.size > 16_384) {
    issues.push("Oversized browserconfig.xml served as XML from the orphan subtree.");
  }
} catch {
  // Expected: the orphan tree is gone.
}

const report = {
  checkedAt: new Date().toISOString(),
  scannedFileCount: scannedFiles.length,
  blockedHostCount: blockedHosts.size,
  issueCount: issues.length,
  issues,
};

await mkdir(new URL("../../artifacts/ci/", import.meta.url), { recursive: true });
await writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

if (issues.length > 0) {
  process.stderr.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exit(1);
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
