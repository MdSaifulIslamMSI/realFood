#!/usr/bin/env node
/**
 * capture-runtime-graph – Captures runtime network requests from the target site.
 * Uses Playwright to load the page, scroll through sections, and record first-party requests.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import config from "../../mirror.config.mjs";
import { createLogger, isFirstPartyHost } from "./lib/utils.mjs";

const log = createLogger("capture-runtime-graph");

const SOURCE_URL = `${config.sourceOrigin}/`;
const OUTPUT_PATH = new URL("../../artifacts/mirror/runtime-requests.json", import.meta.url);

const main = async () => {
  const startMs = Date.now();
  await mkdir(new URL("../../artifacts/mirror/", import.meta.url), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const entries = [];
  const seen = new Set();

  page.on("response", async (response) => {
    const url = response.url();
    try {
      const hostname = new URL(url).hostname;
      if (!isFirstPartyHost(hostname)) return;
    } catch {
      return;
    }

    const request = response.request();
    const key = `${request.method()}::${request.resourceType()}::${url}`;
    if (seen.has(key)) return;
    seen.add(key);

    entries.push({
      url,
      method: request.method(),
      resourceType: request.resourceType(),
      status: response.status(),
      timestamp: new Date().toISOString(),
    });
  });

  await page.goto(SOURCE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);

  for (const sectionId of config.captureSectionIds) {
    await page.evaluate((targetId) => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo(0, Math.max(0, y));
    }, sectionId);

    await page.waitForTimeout(450);
  }

  await browser.close();

  await writeFile(OUTPUT_PATH, `${JSON.stringify(entries, null, 2)}\n`, "utf8");

  log.info("Capture complete", { requestCount: entries.length });
  log.timing("capture-runtime-graph", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
