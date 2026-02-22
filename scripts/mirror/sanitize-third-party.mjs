#!/usr/bin/env node
/**
 * sanitize-third-party – Strips third-party host references from mirrored JS/CSS bundles.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../../mirror.config.mjs";
import { createLogger } from "./lib/utils.mjs";

const log = createLogger("sanitize-third-party");

const PUBLIC_ROOT = fileURLToPath(new URL("../../public/", import.meta.url));
const TARGET_DIRS = [
  join(PUBLIC_ROOT, "_next", "static", "chunks"),
  join(PUBLIC_ROOT, "_next", "static", "css"),
];
const REPORT_PATH = new URL("../../artifacts/mirror/sanitize-report.json", import.meta.url);

const walkFiles = async (dir) => {
  const result = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await walkFiles(fullPath)));
    } else {
      result.push(fullPath);
    }
  }
  return result;
};

const main = async () => {
  const startMs = Date.now();
  const touched = [];

  for (const dir of TARGET_DIRS) {
    let files = [];
    try {
      files = await walkFiles(dir);
    } catch {
      continue;
    }

    for (const filePath of files) {
      if (!filePath.endsWith(".js") && !filePath.endsWith(".css")) {
        continue;
      }

      let text = await readFile(filePath, "utf8");
      let replacementsApplied = 0;

      for (const [from, to] of config.sanitizeReplacements) {
        if (text.includes(from)) {
          text = text.split(from).join(to);
          replacementsApplied += 1;
        }
      }

      if (replacementsApplied > 0) {
        await writeFile(filePath, text, "utf8");
        touched.push({ filePath, replacementsApplied });
      }
    }
  }

  const report = {
    sanitizedAt: new Date().toISOString(),
    touchedCount: touched.length,
    touched,
  };

  await writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  log.info("Sanitization complete", { touchedFiles: touched.length });
  log.timing("sanitize-third-party", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
