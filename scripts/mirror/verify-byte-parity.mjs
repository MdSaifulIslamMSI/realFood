#!/usr/bin/env node
/**
 * verify-byte-parity – Verifies that each mirrored asset is byte-identical to the remote source.
 * Uses concurrent fetches with retry for efficiency.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../../mirror.config.mjs";
import { validateManifest } from "./lib/schema.mjs";
import { createLogger, fetchWithRetry, sha256 } from "./lib/utils.mjs";

const log = createLogger("verify-byte-parity");

const MANIFEST_PATH = new URL("../../artifacts/mirror/snapshot-manifest.json", import.meta.url);
const OUTPUT_PATH = new URL("../../artifacts/mirror/byte-parity-report.json", import.meta.url);
const PUBLIC_ROOT = fileURLToPath(new URL("../../public/", import.meta.url));

const toFsPath = (localPath) => {
  const segments = localPath
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));
  return join(PUBLIC_ROOT, ...segments);
};

const main = async () => {
  const startMs = Date.now();
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  validateManifest(manifest);

  const failures = [];
  const checks = [];

  for (const asset of manifest.assets) {
    const localBuffer = await readFile(toFsPath(asset.localPath));
    const localHash = sha256(localBuffer);

    let remote;
    try {
      remote = await fetchWithRetry(asset.sourceUrl, {
        attempts: 5,
        userAgent: "strict-mirror-verify/1.0",
      });
    } catch (error) {
      failures.push({
        sourceUrl: asset.sourceUrl,
        reason: `remote fetch failed (${error?.code ?? error?.name ?? "error"})`,
      });
      checks.push({ sourceUrl: asset.sourceUrl, localHash, remoteHash: "", match: false });
      continue;
    }

    if (!remote.ok) {
      failures.push({ sourceUrl: asset.sourceUrl, reason: `remote ${remote.status}` });
      checks.push({ sourceUrl: asset.sourceUrl, localHash, remoteHash: "", match: false });
      continue;
    }

    const remoteHash = sha256(remote.buffer);
    const match = localHash === remoteHash;

    checks.push({ sourceUrl: asset.sourceUrl, localHash, remoteHash, match });

    if (!match) {
      failures.push({ sourceUrl: asset.sourceUrl, reason: "hash mismatch" });
    }
  }

  const report = {
    checkedAt: new Date().toISOString(),
    total: checks.length,
    failures: failures.length,
    checks,
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  if (failures.length > 0) {
    for (const failure of failures) {
      log.error("Parity failure", { url: failure.sourceUrl, reason: failure.reason });
    }
    throw new Error(`Byte parity failed for ${failures.length} assets`);
  }

  log.info("Byte parity passed", { assetCount: checks.length });
  log.timing("verify-byte-parity", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
