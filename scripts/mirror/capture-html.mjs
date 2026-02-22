#!/usr/bin/env node
/**
 * capture-html – Captures the source HTML from the target site.
 * Stores the raw HTML and capture metadata for downstream pipeline stages.
 */
import { mkdir, writeFile } from "node:fs/promises";
import config from "../../mirror.config.mjs";
import { createLogger, sha256 } from "./lib/utils.mjs";

const log = createLogger("capture-html");

const SOURCE_URL = `${config.sourceOrigin}/`;
const PINNED_CAPTURED_AT = "2026-02-21T19:16:49.621Z";
const OUTPUT_DIR = new URL("../../artifacts/mirror/", import.meta.url);
const HTML_PATH = new URL("../../artifacts/mirror/source-index.html", import.meta.url);
const META_PATH = new URL("../../artifacts/mirror/capture-meta.json", import.meta.url);

const main = async () => {
  const startMs = Date.now();
  await mkdir(OUTPUT_DIR, { recursive: true });

  const response = await fetch(SOURCE_URL, {
    headers: {
      "user-agent": "strict-mirror-capture/1.0",
      accept: "text/html,*/*;q=0.9",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${SOURCE_URL}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const observedAt = new Date().toISOString();
  const hash = sha256(html);

  await writeFile(HTML_PATH, html, "utf8");
  await writeFile(
    META_PATH,
    `${JSON.stringify(
      {
        sourceOrigin: config.sourceOrigin,
        entryUrl: "/",
        capturedAt: PINNED_CAPTURED_AT,
        observedAt,
        htmlSha256: hash,
        status: response.status,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  log.info("Captured source HTML", {
    pinnedAt: PINNED_CAPTURED_AT,
    observedAt,
    htmlLength: html.length,
  });
  log.timing("capture-html", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
