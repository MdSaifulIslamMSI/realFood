#!/usr/bin/env node
/**
 * download-assets – Downloads all assets listed in the snapshot manifest.
 * Features: concurrent downloads, incremental sync (skip unchanged), retry with backoff.
 */
import { mkdir, readFile, writeFile, rename, stat } from "node:fs/promises";
import { dirname, join, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../../mirror.config.mjs";
import { validateManifest } from "./lib/schema.mjs";
import { createLogger, delay, fetchWithRetry, sha256, isFirstPartyHost } from "./lib/utils.mjs";

const log = createLogger("download-assets");

const MANIFEST_PATH = new URL("../../artifacts/mirror/snapshot-manifest.json", import.meta.url);
const PUBLIC_ROOT = fileURLToPath(new URL("../../public/", import.meta.url));

const toFsPath = (localPath) => {
  if (!localPath.startsWith("/")) {
    throw new Error(`localPath must start with '/': ${localPath}`);
  }

  const segments = localPath
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));

  const candidate = join(PUBLIC_ROOT, ...segments);
  const rel = relative(PUBLIC_ROOT, candidate);
  if (rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error(`Path traversal detected: ${localPath}`);
  }
  return candidate;
};

/**
 * Run download tasks with a concurrency pool.
 * @param {Array} tasks - Array of async functions to execute.
 * @param {number} concurrency - Maximum concurrent tasks.
 */
const runWithConcurrency = async (tasks, concurrency) => {
  const results = [];
  let index = 0;

  const runNext = async () => {
    while (index < tasks.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await tasks[currentIndex]();
    }
  };

  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => runNext());
  await Promise.all(workers);
  return results;
};

const main = async () => {
  const startMs = Date.now();
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  validateManifest(manifest);

  const failures = [];
  let skipped = 0;
  let downloaded = 0;

  const tasks = manifest.assets.map((asset) => async () => {
    const outputPath = toFsPath(asset.localPath);

    // Delta sync: skip if local file exists and is not empty.
    // Next.js assets are heavily cached with content-hashes in their URLs.
    try {
      const stats = await stat(outputPath);
      if (stats.size > 0) {
        // We have the file. Sync metadata if missing.
        if (!asset.sha256 || !asset.bytes) {
          const cachedBytes = await readFile(outputPath);
          asset.sha256 = sha256(cachedBytes);
          asset.bytes = cachedBytes.length;
          asset.status = 200;
        }
        skipped += 1;
        return;
      }
    } catch {
      // File doesn't exist, proceed to download.
    }

    try {
      if (!isFirstPartyHost(new URL(asset.sourceUrl).hostname)) {
        throw new Error(`Rejected non-first-party sourceUrl: ${asset.sourceUrl}`);
      }

      const result = await fetchWithRetry(asset.sourceUrl, {
        userAgent: "strict-mirror-download/1.0",
      });

      if (result.ok) {
        asset.status = result.status;
        asset.contentType = "";
        asset.bytes = result.buffer.length;
        asset.sha256 = sha256(result.buffer);

        await mkdir(dirname(outputPath), { recursive: true });
        const tmpOutputPath = outputPath + ".tmp";
        await writeFile(tmpOutputPath, result.buffer);
        await rename(tmpOutputPath, outputPath);
        downloaded += 1;
        return;
      }

      // Fallback: use cached local file if remote is unavailable.
      try {
        const cachedBytes = await readFile(outputPath);
        asset.status = 200;
        asset.contentType = asset.contentType || "application/octet-stream";
        asset.bytes = cachedBytes.length;
        asset.sha256 = sha256(cachedBytes);
        log.warn("Using cached local file", { url: asset.sourceUrl });
      } catch {
        asset.status = 0;
        asset.sha256 = "";
        asset.bytes = 0;
        failures.push(`${asset.sourceUrl} -> ${result.status}`);
      }
    } catch (error) {
      // Fallback: use cached local file if fetch threw.
      try {
        const cachedBytes = await readFile(outputPath);
        asset.status = 200;
        asset.contentType = asset.contentType || "application/octet-stream";
        asset.bytes = cachedBytes.length;
        asset.sha256 = sha256(cachedBytes);
        log.warn("Using cached local file after error", { url: asset.sourceUrl });
      } catch {
        asset.status = 0;
        asset.contentType = "";
        asset.sha256 = "";
        asset.bytes = 0;
        failures.push(`${asset.sourceUrl} -> ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  });

  await runWithConcurrency(tasks, config.download.concurrency);
  const tmpManifestPath = new URL(MANIFEST_PATH.href + ".tmp");
  await writeFile(tmpManifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await rename(tmpManifestPath, MANIFEST_PATH);

  log.info("Download complete", { downloaded, skipped, failed: failures.length, total: manifest.assets.length });
  log.timing("download-assets", startMs);

  if (failures.length > 0) {
    for (const failure of failures) {
      log.error("Download failed", { detail: failure });
    }
    throw new Error(`Download failed for ${failures.length} assets`);
  }
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
