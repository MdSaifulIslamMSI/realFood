#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import {
  DEPLOY_CSP,
  DEPLOY_HEADERS,
  REQUIRED_README_CLAIMS,
} from "../../security/policy.mjs";
import config from "../../mirror.config.mjs";
import * as cheerio from "cheerio";

const issues = [];
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

const vercelConfig = JSON.parse(read("../../vercel.json"));
const readme = read("../../README.md");
const html = read("../../public/index.html");
const nginxHeaders = read("../../nginx/security-headers.conf");
const nginxConfig = read("../../nginx.conf");
const middleware = read("../../middleware.js");
const stub = read("../../api/stub.js");
const dockerfile = read("../../Dockerfile");
const netlifyConfig = read("../../netlify.toml");
const netlifyHeaders = read("../../public/_headers");
const netlifyRedirects = read("../../public/_redirects");
const netlifyStub = read("../../netlify/functions/stub.mjs");
const netlifyCspReport = read("../../netlify/functions/csp-report.mjs");

if (Array.isArray(vercelConfig.crons) && vercelConfig.crons.length > 0) {
  issues.push("vercel.json must not define public cron endpoints.");
}

const deployedHeaders = vercelConfig.headers?.[0]?.headers ?? [];
const deployedHeaderMap = new Map(deployedHeaders.map((header) => [header.key, header.value]));

for (const expected of DEPLOY_HEADERS) {
  if (expected.key === "Content-Security-Policy") continue;
  const actual = deployedHeaderMap.get(expected.key);
  if (actual !== expected.value) {
    issues.push(`Header mismatch for ${expected.key}.`);
  }
}

const csp = deployedHeaderMap.get("Content-Security-Policy") ?? "";
const baseDeployedCsp = csp.replace(/ 'sha256-[^']+'/g, "");
if (baseDeployedCsp !== DEPLOY_CSP) {
  issues.push("Base deployed CSP (without hashes) does not match canonical security policy.");
}
if (!csp.includes("report-uri /api/csp-report")) {
  issues.push("Deployed CSP must send violations to /api/csp-report.");
}

const scriptSrc = csp.match(/script-src[^;]*/)?.[0] ?? "";
if (scriptSrc.includes("unsafe-eval")) {
  issues.push("Deployed script-src must not include unsafe-eval.");
}
if (scriptSrc.includes("unsafe-inline")) {
  issues.push("Deployed script-src must not include unsafe-inline.");
}

// Netlify's `_headers` file must stay byte-identical to the Vercel policy.
const netlifyHeaderMap = new Map();
for (const line of netlifyHeaders.split("\n")) {
  const match = /^\s{2}([A-Za-z0-9-]+):\s*(.+)$/.exec(line);
  if (match) netlifyHeaderMap.set(match[1], match[2].trim());
}
for (const expected of DEPLOY_HEADERS) {
  const actual = netlifyHeaderMap.get(expected.key);
  const wanted = expected.key === "Content-Security-Policy" ? csp : expected.value;
  if (actual !== wanted) {
    issues.push(`public/_headers mismatch for ${expected.key}.`);
  }
}

if (!/publish\s*=\s*"public"/.test(netlifyConfig)) {
  issues.push('netlify.toml must publish the "public" directory.');
}
if (!/functions\s*=\s*"netlify\/functions"/.test(netlifyConfig)) {
  issues.push('netlify.toml must use the "netlify/functions" directory.');
}
for (const route of [
  "/e",
  "/e/",
  "/e/*",
  "/decide",
  "/decide/",
  "/decide/*",
  "/api/stub",
  "/api/csp-report",
  "/api/*",
  "/cdn-cgi/image/:options/images/*",
  "/*",
]) {
  const present = netlifyRedirects
    .split("\n")
    .map((line) => line.trim())
    .some((line) => line.startsWith(`${route} `));
  if (!present) {
    issues.push(`public/_redirects is missing the ${route} route.`);
  }
}
if (!netlifyStub.includes("isOriginAllowed") || !netlifyStub.includes("buildCorsHeaders")) {
  issues.push("Netlify stub function must use the shared CORS policy.");
}
if (!netlifyCspReport.includes("64 * 1024") || !netlifyCspReport.includes("ACCEPTED_CONTENT_TYPES")) {
  issues.push("Netlify CSP report function must enforce size and content-type limits.");
}

const $ = cheerio.load(html);
$("script").each((_, el) => {
  const script = $(el);
  if (script.attr("src")) return;
  const content = script.html() ?? "";
  const hash = createHash("sha256").update(content, "utf8").digest("base64");
  if (!csp.includes(`'sha256-${hash}'`)) {
    issues.push(`Missing CSP hash for inline script: ${hash}`);
  }
});

// The Nginx/Docker path must ship the same CSP, hashes included.
const nginxCsp = /add_header Content-Security-Policy "([^"]+)" always;/.exec(nginxHeaders)?.[1];
if (nginxCsp !== csp) {
  issues.push("nginx/security-headers.conf CSP does not match vercel.json CSP.");
}
for (const [key, value] of [
  ["Content-Security-Policy", csp],
  ...DEPLOY_HEADERS.filter((header) => header.key !== "Content-Security-Policy").map(
    (header) => [header.key, header.value],
  ),
]) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!new RegExp(`add_header ${key} "${escaped}" always;`).test(nginxHeaders)) {
    issues.push(`nginx/security-headers.conf is missing ${key}.`);
  }
}

// CORS must never be wildcarded or reflected from arbitrary *.vercel.app hosts.
for (const [name, source] of [
  ["middleware.js", middleware],
  ["api/stub.js", stub],
  ["nginx.conf", nginxConfig],
  ["netlify/functions/stub.mjs", netlifyStub],
  ["netlify/functions/csp-report.mjs", netlifyCspReport],
]) {
  if (/Access-Control-Allow-Origin["'\s:,]*["']\*["']/i.test(source)) {
    issues.push(`${name} must not emit a wildcard Access-Control-Allow-Origin.`);
  }
  if (/\.vercel\\?\.app/.test(source) || /\.vercel\.app/.test(source)) {
    issues.push(`${name} must not trust arbitrary *.vercel.app origins.`);
  }
  if (/Access-Control-Allow-Origin["'\s:,]*["']null["']/i.test(source)) {
    issues.push(`${name} must not emit a null Access-Control-Allow-Origin.`);
  }
}

if (!middleware.includes("isOriginAllowed") || !stub.includes("isOriginAllowed")) {
  issues.push("Edge middleware and API stubs must use the shared CORS policy.");
}

// Docker must run as a non-root, unprivileged Nginx image.
if (!/FROM\s+nginxinc\/nginx-unprivileged:/i.test(dockerfile)) {
  issues.push("Dockerfile must use the unprivileged Nginx image.");
}
if (!/^USER\s+\S+/m.test(dockerfile)) {
  issues.push("Dockerfile must declare a non-root USER.");
}

// Vercel must route both telemetry spellings, including /decide without a slash.
const rewrites = vercelConfig.rewrites ?? [];
for (const source of ["/e", "/e/", "/decide", "/decide/"]) {
  if (!rewrites.some((rewrite) => rewrite.source === source && rewrite.destination === "/api/stub")) {
    issues.push(`vercel.json is missing the ${source} telemetry rewrite.`);
  }
}

if (existsSync(new URL("../../api/cron.js", import.meta.url))) {
  issues.push("api/cron.js must not exist.");
}

if (existsSync(new URL("../../public/assets/mirror/realfood.gov", import.meta.url))) {
  issues.push("Unreferenced public/assets/mirror/realfood.gov subtree must not be tracked.");
}

// The generated network guard must know every blocked host.
const guard = read("../../public/stubs/network-guard.js");
for (const host of config.blockedHosts) {
  if (!guard.includes(host)) {
    issues.push(`Network guard is missing blocked host: ${host}`);
  }
}

for (const claim of REQUIRED_README_CLAIMS) {
  if (!readme.includes(claim)) {
    issues.push(`README missing required claim: ${claim}`);
  }
}

const report = {
  checkedAt: new Date().toISOString(),
  issueCount: issues.length,
  issues,
};

if (issues.length > 0) {
  process.stderr.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exit(1);
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
