import { defineConfig, devices } from "@playwright/test";

const previewUrl = process.env.PREVIEW_URL?.trim();
const baseURL = previewUrl && previewUrl.length > 0 ? previewUrl : "http://127.0.0.1:4173";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 0,
  workers: 2,
  timeout: 60000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: previewUrl
    ? undefined
    : {
      command: "node scripts/mirror/serve-mirror.mjs --port 4173",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: true,
      timeout: 120000,
    },
  projects: [
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
