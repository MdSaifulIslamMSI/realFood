#!/usr/bin/env node
/**
 * update-production-csp - Computes inline-script hashes and writes the CSP to
 * every static deployment target from the canonical policy.
 *
 * Outputs:
 *  - vercel.json Content-Security-Policy header
 *  - nginx/security-headers.conf (used by the Docker image)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import { buildCsp, STATIC_SECURITY_HEADERS } from "../../security/policy.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = join(__dirname, "../../public/index.html");
const vercelConfigPath = join(__dirname, "../../vercel.json");
const nginxHeadersPath = join(__dirname, "../../nginx/security-headers.conf");

const html = readFileSync(htmlPath, "utf8");
const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));

const $ = cheerio.load(html);
const inlineHashes = [];
$("script").each((_, el) => {
  const script = $(el);
  if (script.attr("src")) return;
  const content = script.html() ?? "";
  const hash = createHash("sha256").update(content, "utf8").digest("base64");
  inlineHashes.push(`'sha256-${hash}'`);
});

const csp = buildCsp({ scriptHashes: inlineHashes });

const route = (vercelConfig.headers || []).find((entry) => entry.source === "/(.*)");
const cspHeader = route?.headers?.find((header) => header.key === "Content-Security-Policy");

if (!cspHeader) {
  console.error("ERROR: Content-Security-Policy header not found in vercel.json.");
  process.exit(1);
}

cspHeader.value = csp;
writeFileSync(vercelConfigPath, `${JSON.stringify(vercelConfig, null, 2)}\n`, "utf8");

// The Docker/Nginx path must ship the exact same policy, including hashes.
const nginxHeaders = [
  ["Content-Security-Policy", csp],
  ...STATIC_SECURITY_HEADERS,
]
  .map(([key, value]) => `add_header ${key} "${value}" always;`)
  .join("\n");

mkdirSync(dirname(nginxHeadersPath), { recursive: true });
writeFileSync(nginxHeadersPath, `${nginxHeaders}\n`, "utf8");

const scriptSrc = csp.match(/script-src[^;]*/)?.[0] ?? "";
if (scriptSrc.includes("unsafe-inline") || scriptSrc.includes("unsafe-eval")) {
  console.error("ERROR: script-src contains unsafe-inline or unsafe-eval after update.");
  process.exit(1);
}
if (!csp.includes("report-uri /api/csp-report")) {
  console.error("ERROR: CSP is missing the report-uri sink.");
  process.exit(1);
}

console.log(
  `Updated vercel.json and nginx/security-headers.conf with ${inlineHashes.length} inline script hashes.`,
);
