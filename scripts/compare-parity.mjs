#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const ROOT = new URL("../artifacts/parity/", import.meta.url);
const PER_SHOT_THRESHOLD = 0.25;
const AVG_THRESHOLD = 0.1;

const toPath = (url) => fileURLToPath(url);

const readPng = async (path) => PNG.sync.read(await readFile(path));

const compareShot = async (targetPath, clonePath, diffPath) => {
  const target = await readPng(targetPath);
  const clone = await readPng(clonePath);

  if (target.width !== clone.width || target.height !== clone.height) {
    throw new Error(`Dimension mismatch: ${targetPath} vs ${clonePath}`);
  }

  const diff = new PNG({ width: target.width, height: target.height });
  const mismatched = pixelmatch(target.data, clone.data, diff.data, target.width, target.height, {
    threshold: 0.12,
    includeAA: true,
  });

  await mkdir(dirname(diffPath), { recursive: true });
  await writeFile(diffPath, PNG.sync.write(diff));

  const totalPixels = target.width * target.height;
  const mismatchPercent = (mismatched / totalPixels) * 100;
  return mismatchPercent;
};

const main = async () => {
  const viewportDirs = ["desktop", "mobile"];
  const summary = [];

  for (const viewport of viewportDirs) {
    const targetDir = toPath(new URL(`./target/${viewport}/`, ROOT));
    const cloneDir = toPath(new URL(`./clone/${viewport}/`, ROOT));
    const fileNames = (await readdir(targetDir)).filter((name) => name.endsWith(".png"));

    for (const fileName of fileNames) {
      const targetPath = join(targetDir, fileName);
      const clonePath = join(cloneDir, fileName);
      const diffPath = toPath(new URL(`./diff/${viewport}/${fileName}`, ROOT));
      const mismatch = await compareShot(targetPath, clonePath, diffPath);
      summary.push({ viewport, fileName, mismatch });
    }
  }

  const average = summary.reduce((acc, item) => acc + item.mismatch, 0) / Math.max(summary.length, 1);

  for (const item of summary) {
    process.stdout.write(
      `${item.viewport.padEnd(8)} ${item.fileName.padEnd(16)} mismatch=${item.mismatch.toFixed(3)}%\n`,
    );
  }
  process.stdout.write(`Average mismatch=${average.toFixed(3)}%\n`);

  const overPerShot = summary.filter((item) => item.mismatch > PER_SHOT_THRESHOLD);
  if (overPerShot.length > 0 || average > AVG_THRESHOLD) {
    console.error(
      `Parity failed: ${overPerShot.length} shots exceeded ${PER_SHOT_THRESHOLD}% or average exceeded ${AVG_THRESHOLD}%`,
    );
    process.exit(1);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
