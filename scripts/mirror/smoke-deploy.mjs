#!/usr/bin/env node
import { createLogger } from "./lib/utils.mjs";

const log = createLogger("smoke-deploy");
const previewUrl = process.env.PREVIEW_URL;

if (!previewUrl) {
  throw new Error("PREVIEW_URL is required (for example https://example.vercel.app).");
}

const requestOnce = async (url) => {
  const response = await fetch(url, { method: "GET" });
  const csp = response.headers.get("content-security-policy") ?? "";
  const hasUnsafe = csp.includes("unsafe-inline") || csp.includes("unsafe-eval");

  return {
    url,
    status: response.status,
    hasCsp: csp.length > 0,
    hasUnsafe,
  };
};

const main = async () => {
  const startMs = Date.now();
  const checks = await Promise.all(
    Array.from({ length: 8 }, () => requestOnce(new URL("/", previewUrl).toString())),
  );

  const failures = checks.filter((check) => check.status !== 200 || !check.hasCsp || check.hasUnsafe);
  log.info("Smoke checks completed", {
    previewUrl,
    checks: checks.length,
    failures: failures.length,
  });
  log.timing("smoke-deploy", startMs);

  if (failures.length > 0) {
    for (const failure of failures) {
      log.error("Smoke check failed", failure);
    }
    throw new Error(`Smoke checks failed for ${failures.length} request(s).`);
  }
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
