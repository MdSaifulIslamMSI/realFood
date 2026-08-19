#!/usr/bin/env node
/**
 * verify-dom-parity – Verifies that the rewritten HTML matches the source after normalization.
 */
import { readFile, writeFile } from "node:fs/promises";
import config from "../../mirror.config.mjs";
import { createLogger, normalizeHtml, sha256 } from "./lib/utils.mjs";

const log = createLogger("verify-dom-parity");

const SOURCE_HTML_PATH = new URL("../../artifacts/mirror/source-index.html", import.meta.url);
const CLONE_HTML_PATH = new URL("../../public/index.html", import.meta.url);
const OUTPUT_PATH = new URL("../../artifacts/mirror/dom-parity-report.json", import.meta.url);

export { normalizeHtml };
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

if (process.argv[1] && process.argv[1].endsWith('verify-dom-parity.mjs')) {
  main().catch((error) => {
    log.error("Fatal error", { error: error.message });
    process.exit(1);
  });
}
