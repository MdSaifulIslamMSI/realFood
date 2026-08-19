import { test, expect } from "@playwright/test";

test.describe("Static Mirror Security & Routing Tests", () => {
  test("Network Guard rejects blocked host fetches", async ({ page }) => {
    await page.goto("/");

    const response = await page.evaluate(async () => {
      try {
        await fetch("https://us.i.posthog.com/e/?ip=1", {
          method: "POST",
          body: JSON.stringify({ data: "secret" }),
        });
        return { rejected: false };
      } catch (error) {
        return { rejected: true, message: error instanceof Error ? error.message : String(error) };
      }
    });

    expect(response.rejected).toBe(true);
    expect(response.message).toContain("Blocked by mirror network guard");
  });

  test("Network Guard keeps local first-party requests available", async ({ page }) => {
    await page.goto("/");

    const response = await page.evaluate(async () => {
      const fetchPatched = window.fetch.toString().includes("isBlockedUrl");
      const local = await fetch("/index.html");
      return { fetchPatched, status: local.status };
    });

    expect(response.fetchPatched).toBe(true);
    expect(response.status).toBe(200);
  });

  test("Network Guard rejects blocked WebSocket and EventSource attempts", async ({ page }) => {
    await page.goto("/");

    const result = await page.evaluate(() => {
      let wsBlocked = false;
      let esBlocked = false;

      try {
        new WebSocket("wss://us.i.posthog.com/socket");
      } catch (err) {
        wsBlocked = String(err).includes("Blocked by mirror network guard");
      }

      try {
        new EventSource("https://us.i.posthog.com/events");
      } catch (err) {
        esBlocked = String(err).includes("Blocked by mirror network guard");
      }

      return {
        wsBlocked,
        esBlocked,
        loggedCount: window.__MIRROR_BLOCKED_REQUESTS__?.length || 0,
      };
    });

    expect(result.wsBlocked).toBe(true);
    expect(result.esBlocked).toBe(true);
    expect(result.loggedCount).toBeGreaterThanOrEqual(2);
  });
});