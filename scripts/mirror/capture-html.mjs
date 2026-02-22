#!/usr/bin/env node
/**
 * capture-html – Captures the source HTML from the target site.
 * Stores the raw HTML and capture metadata for downstream pipeline stages.
 */
import { mkdir, writeFile, rename } from "node:fs/promises";
import config from "../../mirror.config.mjs";
import { createLogger, sha256 } from "./lib/utils.mjs";

const log = createLogger("capture-html");

const SOURCE_URL = `${config.sourceOrigin}/`;
const OUTPUT_DIR = new URL("../../artifacts/mirror/", import.meta.url);
const HTML_PATH = new URL("../../artifacts/mirror/source-index.html", import.meta.url);
const META_PATH = new URL("../../artifacts/mirror/capture-meta.json", import.meta.url);

const parseSnapshotTag = () => {
  const index = process.argv.indexOf("--snapshot-tag");
  if (index < 0) return null;

  const value = (process.argv[index + 1] ?? "").trim();
  if (!value) {
    throw new Error("--snapshot-tag requires a non-empty value");
  }
  return value;
};

const main = async () => {
  const startMs = Date.now();
  const snapshotTag = parseSnapshotTag();
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
  const capturedAt = new Date().toISOString();
  const hash = sha256(html);

  const tmpHtmlPath = new URL(HTML_PATH.href + ".tmp");
  await writeFile(tmpHtmlPath, html, "utf8");
  await rename(tmpHtmlPath, HTML_PATH);
  const meta = {
    sourceOrigin: config.sourceOrigin,
    entryUrl: "/",
    capturedAt,
    htmlSha256: hash,
    status: response.status,
  };
  if (snapshotTag) {
    meta.snapshotTag = snapshotTag;
  }

  const tmpMetaPath = new URL(META_PATH.href + ".tmp");
  await writeFile(
    tmpMetaPath,
    `${JSON.stringify(meta, null, 2)}\n`,
    "utf8",
  );
  await rename(tmpMetaPath, META_PATH);

  log.info("Captured source HTML", {
    capturedAt,
    snapshotTag: snapshotTag ?? "",
    htmlLength: html.length,
  });
  log.timing("capture-html", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
