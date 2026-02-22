#!/usr/bin/env node
/**
 * extract-static-refs – Extracts asset URLs from captured HTML and linked CSS files.
 * Outputs a structured JSON file used by the manifest builder.
 */
import { readFile, writeFile } from "node:fs/promises";
import config from "../../mirror.config.mjs";
import { createLogger, expandComposite, toAbsoluteUrl, unique } from "./lib/utils.mjs";

const log = createLogger("extract-static-refs");

const HTML_PATH = new URL("../../artifacts/mirror/source-index.html", import.meta.url);
const OUTPUT_PATH = new URL("../../artifacts/mirror/static-refs.json", import.meta.url);

const extractFromHtml = (html) => {
  const attrRefs = [
    ...html.matchAll(/(?:href|src|poster)="([^"]+)"/gi),
    ...html.matchAll(/(?:href|src|poster)='([^']+)'/gi),
  ].flatMap((match) => expandComposite(match[1]));

  const srcsetRefs = [
    ...html.matchAll(/(?:srcset|imageSrcSet)="([^"]+)"/gi),
    ...html.matchAll(/(?:srcset|imageSrcSet)='([^']+)'/gi),
  ].flatMap((match) => expandComposite(match[1]));

  return unique([...attrRefs, ...srcsetRefs]).map(toAbsoluteUrl);
};

const extractCssLinks = (htmlRefs) =>
  htmlRefs.filter(
    (url) =>
      url.startsWith(`${config.sourceOrigin}/_next/static/css/`) ||
      url.startsWith(`${config.sourceOrigin}/styles/`),
  );

const extractFromCss = (css) =>
  unique(
    [...css.matchAll(/url\(([^)]+)\)/gi)]
      .flatMap((match) => expandComposite(match[1]))
      .filter((value) => !value.startsWith("data:"))
      .map(toAbsoluteUrl),
  );

const main = async () => {
  const startMs = Date.now();
  const html = await readFile(HTML_PATH, "utf8");
  const htmlRefs = extractFromHtml(html);
  const cssLinks = extractCssLinks(htmlRefs);

  const cssRefs = [];
  for (const cssUrl of cssLinks) {
    const response = await fetch(cssUrl, {
      headers: { "user-agent": "strict-mirror-capture/1.0" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CSS ${cssUrl}: ${response.status} ${response.statusText}`);
    }

    const css = await response.text();
    cssRefs.push(...extractFromCss(css));
  }

  const result = {
    sourceOrigin: config.sourceOrigin,
    extractedAt: new Date().toISOString(),
    htmlRefs: unique(htmlRefs).sort((a, b) => a.localeCompare(b)),
    cssRefs: unique(cssRefs).sort((a, b) => a.localeCompare(b)),
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(result, null, 2)}\n`, "utf8");

  log.info("Extraction complete", {
    htmlRefCount: result.htmlRefs.length,
    cssRefCount: result.cssRefs.length,
  });
  log.timing("extract-static-refs", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
