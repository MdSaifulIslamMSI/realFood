#!/usr/bin/env node
/**
 * build-manifest – Builds the snapshot manifest from captured data sources.
 * Merges HTML refs, CSS refs, runtime requests, and manual URLs into a unified asset list.
 */
import { readFile, writeFile } from "node:fs/promises";
import config from "../../mirror.config.mjs";
import { validateCaptureMeta, validateStaticRefs } from "./lib/schema.mjs";
import {
  cdnLocalPath,
  createLogger,
  isFirstPartyHost,
  normalizeUrl,
  realfoodLocalPath,
  unique,
} from "./lib/utils.mjs";

const log = createLogger("build-manifest");

const STATIC_REFS_PATH = new URL("../../artifacts/mirror/static-refs.json", import.meta.url);
const RUNTIME_PATH = new URL("../../artifacts/mirror/runtime-requests.json", import.meta.url);
const META_PATH = new URL("../../artifacts/mirror/capture-meta.json", import.meta.url);
const OUTPUT_PATH = new URL("../../artifacts/mirror/snapshot-manifest.json", import.meta.url);

const chooseDiscoveredBy = (sourceUrl, sources) => {
  if (sources.runtime.has(sourceUrl)) return "runtime-network";
  if (sources.css.has(sourceUrl)) return "css";
  if (sources.html.has(sourceUrl)) return "html";
  return "manual";
};

const main = async () => {
  const startMs = Date.now();

  const staticRefs = JSON.parse(await readFile(STATIC_REFS_PATH, "utf8"));
  validateStaticRefs(staticRefs);

  const runtimeRefs = JSON.parse(await readFile(RUNTIME_PATH, "utf8"));
  if (!Array.isArray(runtimeRefs)) throw new TypeError("runtime-requests.json must be an array");

  const captureMeta = JSON.parse(await readFile(META_PATH, "utf8"));
  validateCaptureMeta(captureMeta);

  const htmlSet = new Set((staticRefs.htmlRefs ?? []).map(normalizeUrl).filter(Boolean));
  const cssSet = new Set((staticRefs.cssRefs ?? []).map(normalizeUrl).filter(Boolean));
  const runtimeSet = new Set(runtimeRefs.map((entry) => normalizeUrl(entry.url)).filter(Boolean));
  const manualSet = new Set(config.manualUrls.map(normalizeUrl).filter(Boolean));

  const allUrls = unique([...htmlSet, ...cssSet, ...runtimeSet, ...manualSet]).sort((a, b) =>
    a.localeCompare(b),
  );

  const assets = allUrls.map((sourceUrl) => {
    const parsed = new URL(sourceUrl);
    const localPath =
      parsed.hostname === "cdn.realfood.gov"
        ? cdnLocalPath(sourceUrl)
        : realfoodLocalPath(sourceUrl);

    return {
      sourceUrl,
      localPath,
      contentType: "",
      status: 0,
      sha256: "",
      bytes: 0,
      discoveredBy: chooseDiscoveredBy(sourceUrl, {
        html: htmlSet,
        css: cssSet,
        runtime: runtimeSet,
        manual: manualSet,
      }),
    };
  });

  const manifest = {
    sourceOrigin: config.sourceOrigin,
    capturedAt: captureMeta.capturedAt,
    entryUrl: "/",
    routes: ["/"],
    assets,
    htmlSha256: captureMeta.htmlSha256,
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  log.info("Manifest built", { assetCount: assets.length });
  log.timing("build-manifest", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
