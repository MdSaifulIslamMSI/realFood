#!/usr/bin/env node
/**
 * verify-network-gate – Verifies that the mirror makes zero disallowed external requests.
 * Uses Playwright to load the mirrored page and monitors all network traffic.
 */
import { writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import config from "../../mirror.config.mjs";
import { createLogger } from "./lib/utils.mjs";

const log = createLogger("verify-network-gate");

const CLONE_URL = process.env.CLONE_URL ?? `http://${config.serve.host}:${config.serve.port}/`;
const OUTPUT_PATH = new URL("../../artifacts/mirror/network-gate-report.json", import.meta.url);

const ALLOWED_HOSTS = new Set(["127.0.0.1", "localhost"]);
const BLOCKED_HOSTS = new Set(config.blockedHosts);

const main = async () => {
  const startMs = Date.now();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const violations = [];
  const observed = [];

  page.on("request", (request) => {
    const url = request.url();
    observed.push(url);

    if (!url.startsWith("http://") && !url.startsWith("https://")) return;

    const host = new URL(url).hostname;
    const disallowed = BLOCKED_HOSTS.has(host) || !ALLOWED_HOSTS.has(host);
    if (disallowed) {
      violations.push({ host, url, method: request.method(), resourceType: request.resourceType() });
    }
  });

  await page.goto(CLONE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  for (const sectionId of config.captureSectionIds) {
    await page.evaluate((targetId) => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo(0, Math.max(0, y));
    }, sectionId);
    await page.waitForTimeout(350);
  }

  const playButton = page.locator("button[aria-label='Announcement video for mobile fullscreen playback']");
  if (await playButton.count()) {
    await playButton.first().click({ timeout: 2000 }).catch(() => { });
    await page.waitForTimeout(600);
  }

  await browser.close();

  const report = {
    checkedAt: new Date().toISOString(),
    cloneUrl: CLONE_URL,
    observedRequestCount: observed.length,
    violationCount: violations.length,
    violations,
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  if (violations.length > 0) {
    for (const violation of violations) {
      log.error("Disallowed request", { url: violation.url, host: violation.host });
    }
    throw new Error(`Network gate failed with ${violations.length} disallowed requests`);
  }

  log.info("Network gate passed", { observedRequests: observed.length });
  log.timing("verify-network-gate", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
