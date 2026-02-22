/// <reference lib="dom" />
import { expect, test, type Page } from "@playwright/test";
// @ts-expect-error -- JS config module, no .d.ts needed at runtime
import config from "../../mirror.config.mjs";

const SECTION_IDS = config.sectionIds;
const BLOCKED_HOSTS = new Set(config.blockedHosts);

const settle = async (page: Page): Promise<void> => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1200);
};

test("mirror root renders source sections", async ({ page }) => {
  await settle(page);

  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("no blocked external runtime requests", async ({ page }) => {
  const violations: string[] = [];

  page.on("request", (request) => {
    const url = request.url();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return;
    }

    const hostname = new URL(url).hostname;
    if (BLOCKED_HOSTS.has(hostname)) {
      violations.push(url);
    }
  });

  await settle(page);

  for (const id of SECTION_IDS) {
    await page.evaluate((sectionId: string) => {
      const node = document.getElementById(sectionId);
      if (!node) return;
      const y = node.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo(0, Math.max(0, y));
    }, id);
    await page.waitForTimeout(300);
  }

  expect(violations).toEqual([]);
});

test("mirrored PDFs are locally served", async ({ page }) => {
  await settle(page);

  const links = page.locator('a[href*="/assets/mirror/cdn.realfood.gov/"]');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i += 1) {
    const href = await links.nth(i).getAttribute("href");
    expect(href).toBeTruthy();

    const absolute = new URL(href!, page.url()).toString();
    const response = await page.request.get(absolute);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"] ?? "").toContain("application/pdf");
  }
});

test("security headers are present", async ({ page }) => {
  const response = await page.goto("/");
  expect(response).not.toBeNull();
  const headers = response!.headers();

  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("no-referrer");
  expect(headers["content-security-policy"]).toBeDefined();
  expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
});
