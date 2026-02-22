#!/usr/bin/env node
/**
 * verify-dom-parity – Verifies that the rewritten HTML matches the source after normalization.
 */
import { readFile, writeFile } from "node:fs/promises";
import config from "../../mirror.config.mjs";
import { createLogger, sha256 } from "./lib/utils.mjs";

const log = createLogger("verify-dom-parity");

const SOURCE_HTML_PATH = new URL("../../artifacts/mirror/source-index.html", import.meta.url);
const CLONE_HTML_PATH = new URL("../../public/index.html", import.meta.url);
const OUTPUT_PATH = new URL("../../artifacts/mirror/dom-parity-report.json", import.meta.url);

/**
 * Normalize HTML for comparison by stripping elements that are intentionally different
 * between source and mirror (third-party scripts, stubs, nonces, etc.).
 * @param {string} html
 * @returns {string}
 */
export const normalizeHtml = (html) => {
  let normalized = html;

  // Remove third-party preload links and script tags.
  normalized = normalized.replace(/<link[^>]+rel="preload"[^>]+href="https:\/\/(?:challenges\.cloudflare\.com|static\.cloudflareinsights\.com|us-assets\.i\.posthog\.com)[^>]*>/gi, "");
  normalized = normalized.replace(/<script[^>]+src="https:\/\/(?:challenges\.cloudflare\.com|static\.cloudflareinsights\.com|us-assets\.i\.posthog\.com|us\.i\.posthog\.com)[^>]*><\/script>/gi, "");

  // Remove mirror-specific stubs.
  normalized = normalized.replace(/<script[^>]+src="\/stubs\/noop-third-party\.js"[^>]*><\/script>/gi, "");
  normalized = normalized.replace(/<script[^>]+src="\/stubs\/network-guard\.js"[^>]*><\/script>/gi, "");

  // Normalize origins.
  normalized = normalized.replace(/https:\/\/realfood\.gov/gi, "");
  normalized = normalized.replace(/https:\/\/cdn\.realfood\.gov/gi, "/assets/mirror/cdn.realfood.gov");

  // Remove nonce, integrity, crossorigin attributes.
  normalized = normalized.replace(/\snonce="[^"]*"/gi, "");
  normalized = normalized.replace(/\sintegrity="[^"]*"/gi, "");
  normalized = normalized.replace(/\scrossorigin="[^"]*"/gi, "");

  // Collapse whitespace.
  normalized = normalized.replace(/>\s+</g, "><");
  normalized = normalized.replace(/\s+/g, " ");
  normalized = normalized.trim();

  return normalized;
};

const findFirstDiff = (a, b) => {
  const max = Math.min(a.length, b.length);
  for (let i = 0; i < max; i += 1) {
    if (a[i] !== b[i]) return i;
  }
  return max;
};

const main = async () => {
  const startMs = Date.now();

  const sourceHtml = await readFile(SOURCE_HTML_PATH, "utf8");
  const cloneHtml = await readFile(CLONE_HTML_PATH, "utf8");

  const normalizedSource = normalizeHtml(sourceHtml);
  const normalizedClone = normalizeHtml(cloneHtml);

  const sourceHash = sha256(normalizedSource);
  const cloneHash = sha256(normalizedClone);
  const match = sourceHash === cloneHash;

  const diffIndex = match ? -1 : findFirstDiff(normalizedSource, normalizedClone);

  const report = {
    checkedAt: new Date().toISOString(),
    match,
    sourceHash,
    cloneHash,
    diffIndex,
    sourceLength: normalizedSource.length,
    cloneLength: normalizedClone.length,
    sourceSnippet: diffIndex >= 0 ? normalizedSource.slice(Math.max(0, diffIndex - 120), diffIndex + 120) : "",
    cloneSnippet: diffIndex >= 0 ? normalizedClone.slice(Math.max(0, diffIndex - 120), diffIndex + 120) : "",
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  if (!match) {
    log.error("DOM parity failed", { diffIndex });
    throw new Error(`DOM parity failed at index ${diffIndex}`);
  }

  log.info("DOM parity passed", { sourceLength: normalizedSource.length });
  log.timing("verify-dom-parity", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
