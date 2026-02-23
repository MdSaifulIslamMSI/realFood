#!/usr/bin/env node
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const TARGET_URL = process.env.TARGET_URL ?? "https://realfood.gov/";
const CLONE_URL = process.env.CLONE_URL ?? "http://127.0.0.1:4173/";
const OUTPUT_ROOT = new URL("../artifacts/parity", import.meta.url);

const sections = ["intro", "problem", "solution", "pyramid", "resources", "answers", "winning", "faqs", "footer"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const stabilizePage = async (page) => {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(500);
  await page
    .evaluate(async () => {
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch (_) { }
      }

      const videos = Array.from(document.querySelectorAll("video"));
      for (const video of videos) {
        try {
          video.pause();
          video.currentTime = 0;
          video.muted = true;
          video.autoplay = false;
        } catch (_) { }
      }

      if (!document.getElementById("__parity_stabilizer__")) {
        const style = document.createElement("style");
        style.id = "__parity_stabilizer__";
        style.textContent = `
          html, body { scroll-behavior: auto !important; }
          [class*="usg-banner_banner__"],
          [class*="nav_nav__"],
          [class*="mobile-nav_nav__"],
          section[aria-label="Notifications alt+T"],
          .fluid-width-video-wrapper,
          .bg-video_background-video__,
          [class*="slider_slider__"],
          iframe {
            display: none !important;
          }
          .swiper-wrapper {
            transform: translate3d(0px, 0px, 0px) !important;
            transition-duration: 0ms !important;
          }
        `;
        document.head.appendChild(style);
      }
    })
    .catch(() => { });
};

const captureSection = async (page, section, outputFile) => {
  if (section !== "intro") {
    await page
      .waitForFunction(
        (targetId) => !!document.getElementById(targetId),
        section,
        { timeout: 8_000 },
      )
      .catch(() => { });
  }

  await page.evaluate((targetId) => {
    if (targetId === "intro") {
      const heading = document.querySelector("h1");
      if (!heading) {
        window.scrollTo(0, 0);
        return;
      }
      const headingY = heading.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, Math.max(0, headingY));
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }

    const y = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, Math.max(0, y));
  }, section);

  await page.waitForTimeout(1200);
  await page
    .evaluate(() => {
      const wrappers = Array.from(document.querySelectorAll(".swiper-wrapper"));
      for (const wrapper of wrappers) {
        wrapper.style.transitionDuration = "0ms";
        wrapper.style.transform = "translate3d(0px, 0px, 0px)";
      }
      const slides = Array.from(document.querySelectorAll(".swiper-slide"));
      for (const slide of slides) {
        slide.style.transitionDuration = "0ms";
      }
    })
    .catch(() => { });
  await stabilizePage(page);
  await page.screenshot({ path: outputFile, fullPage: false });
};

const runSet = async (browser, baseUrl, label) => {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    await context.addInitScript(() => {
      const installParityStyle = () => {
        if (document.getElementById("__parity_stabilizer__")) {
          return;
        }
        const style = document.createElement("style");
        style.id = "__parity_stabilizer__";
        style.textContent = `
          html, body { scroll-behavior: auto !important; }
          [class*="usg-banner_banner__"],
          [class*="nav_nav__"],
          [class*="mobile-nav_nav__"],
          section[aria-label="Notifications alt+T"],
          .fluid-width-video-wrapper,
          .bg-video_background-video__,
          [class*="slider_slider__"],
          iframe {
            display: none !important;
          }
          .swiper-wrapper {
            transform: translate3d(0px, 0px, 0px) !important;
            transition-duration: 0ms !important;
          }
        `;
        document.head.appendChild(style);
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", installParityStyle, { once: true });
      } else {
        installParityStyle();
      }

      if (window.HTMLMediaElement?.prototype) {
        const originalPlay = window.HTMLMediaElement.prototype.play;
        window.HTMLMediaElement.prototype.play = function () {
          try {
            this.pause();
            this.currentTime = 0;
            this.muted = true;
            this.autoplay = false;
          } catch (_) { }
          return Promise.resolve();
        };
        window.HTMLMediaElement.prototype.__mirrorOriginalPlay = originalPlay;
      }
    });
    const page = await context.newPage();

    await mkdir(new URL(`../artifacts/parity/${label}/${viewport.name}`, import.meta.url), { recursive: true });
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2200);
    await stabilizePage(page);

    for (const section of sections) {
      const outputFile = new URL(`../artifacts/parity/${label}/${viewport.name}/${section}.png`, import.meta.url);
      process.stdout.write(`Capturing ${label}/${viewport.name}/${section}\n`);
      await captureSection(page, section, fileURLToPath(outputFile));
    }

    await context.close();
  }
};

const main = async () => {
  const browser = await chromium.launch({ headless: true });

  try {
    await runSet(browser, TARGET_URL, "target");
    await runSet(browser, CLONE_URL, "clone");
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
