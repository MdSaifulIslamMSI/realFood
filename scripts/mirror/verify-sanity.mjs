#!/usr/bin/env node
/**
 * verify-sanity - Asserts pipeline correctness before allowing rewrite/deployment.
 * Prevents Vercel from deploying an empty/corrupted site if upstream changes frameworks.
 */
import { readFile } from "node:fs/promises";
import { createLogger } from "./lib/utils.mjs";

const log = createLogger("verify-sanity");

const HTML_PATH = new URL("../../artifacts/mirror/source-index.html", import.meta.url);
const MANIFEST_PATH = new URL("../../artifacts/mirror/snapshot-manifest.json", import.meta.url);

const main = async () => {
    const startMs = Date.now();

    const html = await readFile(HTML_PATH, "utf8");
    const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));

    // Invariant 1: HTML should be reasonably large. Upstream payload is ~230KB.
    const MIN_HTML_SIZE = 100 * 1024; // 100KB
    if (html.length < MIN_HTML_SIZE) {
        throw new Error(`Sanity check failed: HTML payload is too small (${Math.round(html.length / 1024)}KB < 100KB). Upstream may have blocked the request or changed radically.`);
    }

    // Invariant 2: Total assets should be high. Currently ~703.
    const MIN_ASSETS = 600;
    if (!manifest.assets || manifest.assets.length < MIN_ASSETS) {
        const count = manifest.assets ? manifest.assets.length : 0;
        throw new Error(`Sanity check failed: Discovered assets plummeted (${count} < ${MIN_ASSETS}). Upstream obfucation or framework changes likely broke extraction. Halting to preserve last healthy deploy.`);
    }

    log.info("Pipeline sanity invariants passed", {
        htmlSizeKb: Math.round(html.length / 1024),
        assetCount: manifest.assets.length
    });

    log.timing("verify-sanity", startMs);
};

main().catch((error) => {
    log.error("Sanity check tripped", { error: error.message });
    process.exit(1);
});
