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

import * as cheerio from "cheerio";

const extractFromHtml = (html) => {
  const $ = cheerio.load(html);
  const refs = [];

  // 1. Parse standard component attributes via AST
  $('[src], [href], [poster]').each((_, el) => {
    ['src', 'href', 'poster'].forEach(attr => {
      const val = $(el).attr(attr);
      if (val) refs.push(...expandComposite(val));
    });
  });

  // 2. Parse srcset arrays
  $('[srcset], [imagesrcset]').each((_, el) => {
    ['srcset', 'imagesrcset'].forEach(attr => {
      const val = $(el).attr(attr);
      if (val) refs.push(...expandComposite(val));
    });
  });

  // 3. Autonomously discover deep-hidden Next.js dynamic assets by brute-forcing the raw text stream
  const rawRelMatches = html.match(/(\/(?:images|video|_next|cdn-cgi)\/[a-zA-Z0-9_./=,%-]+\.(?:png|jpeg|jpg|webp|gif|svg|mp4|webm|pdf|vtt))/gi);
  if (rawRelMatches) {
    rawRelMatches.forEach(m => refs.push(m.startsWith('http') ? m : (m.startsWith('/') ? m : `/${m}`)));
  }

  const rawNextImgMatches = html.match(/\/_next\/image\?url=[^"'\s&#\\]+(?:&amp;w=\d+&amp;q=\d+)?/gi);
  if (rawNextImgMatches) {
    rawNextImgMatches.forEach(m => {
      try {
        const decodedUrl = new URL(m.replace(/&amp;/g, '&'), 'http://localhost').searchParams.get('url');
        if (decodedUrl) refs.push(decodeURIComponent(decodedUrl));
      } catch (e) { }
    });
  }

  return unique(refs).map(toAbsoluteUrl);
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
