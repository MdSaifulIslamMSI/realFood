#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import config from "../mirror.config.mjs";

const ROOT = new URL("../artifacts/parity/", import.meta.url);
const CACHE_PATH = new URL("../artifacts/parity/.compare-cache.json", import.meta.url);

const toPath = (url) => fileURLToPath(url);

const readPng = async (path) => PNG.sync.read(await readFile(path));

const digestFile = async (path) =>
  createHash("sha256").update(await readFile(path)).digest("hex");

const compareShot = async (targetPath, clonePath, diffPath) => {
  const target = await readPng(targetPath);
  const clone = await readPng(clonePath);

  if (target.width !== clone.width || target.height !== clone.height) {
    throw new Error(`Dimension mismatch: ${targetPath} vs ${clonePath}`);
  }

  const diff = new PNG({ width: target.width, height: target.height });
  const mismatched = pixelmatch(target.data, clone.data, diff.data, target.width, target.height, {
    threshold: config.parity.pixelmatchThreshold,
    includeAA: true,
  });

  await mkdir(dirname(diffPath), { recursive: true });
  await writeFile(diffPath, PNG.sync.write(diff));

  const totalPixels = target.width * target.height;
  return (mismatched / totalPixels) * 100;
};

const loadCache = async () => {
  try {
    return JSON.parse(await readFile(CACHE_PATH, "utf8"));
  } catch {
    return { entries: {} };
  }
};

const main = async () => {
  const viewportDirs = ["desktop", "mobile"];
  const summary = [];
  const cache = await loadCache();
  const nextCache = { generatedAt: new Date().toISOString(), entries: {} };

  for (const viewport of viewportDirs) {
    const targetDir = toPath(new URL(`./target/${viewport}/`, ROOT));
    const cloneDir = toPath(new URL(`./clone/${viewport}/`, ROOT));
    const fileNames = (await readdir(targetDir)).filter((name) => name.endsWith(".png"));

    for (const fileName of fileNames) {
      const targetPath = join(targetDir, fileName);
      const clonePath = join(cloneDir, fileName);
      const diffPath = toPath(new URL(`./diff/${viewport}/${fileName}`, ROOT));

      const key = `${viewport}/${fileName}`;
      const [targetHash, cloneHash] = await Promise.all([digestFile(targetPath), digestFile(clonePath)]);
      const signature = `${targetHash}:${cloneHash}`;

      let mismatch;
      const cached = cache.entries?.[key];
      if (cached && cached.signature === signature) {
        mismatch = cached.mismatch;
      } else {
        mismatch = await compareShot(targetPath, clonePath, diffPath);
      }

      nextCache.entries[key] = { signature, mismatch };
      summary.push({ viewport, fileName, mismatch });
    }
  }

  await mkdir(new URL("../artifacts/parity/", import.meta.url), { recursive: true });
  await writeFile(CACHE_PATH, `${JSON.stringify(nextCache, null, 2)}\n`, "utf8");

  const average = summary.reduce((acc, item) => acc + item.mismatch, 0) / Math.max(summary.length, 1);

  for (const item of summary) {
    process.stdout.write(
      `${item.viewport.padEnd(8)} ${item.fileName.padEnd(16)} mismatch=${item.mismatch.toFixed(3)}%\n`,
    );
  }
  process.stdout.write(`Average mismatch=${average.toFixed(3)}%\n`);

  const overPerShot = summary.filter((item) => item.mismatch > config.parity.perShotThreshold);
  if (overPerShot.length > 0 || average > config.parity.avgThreshold) {
    console.error(
      `Parity failed: ${overPerShot.length} shots exceeded ${config.parity.perShotThreshold}% or average exceeded ${config.parity.avgThreshold}%`,
    );
    process.exit(1);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});