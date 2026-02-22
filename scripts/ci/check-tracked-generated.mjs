#!/usr/bin/env node
import { execSync } from "node:child_process";

const forbiddenPrefixes = [
  "artifacts/",
  "playwright-report/",
  "test-results/",
];

const tracked = execSync("git ls-files -z", { encoding: "buffer" })
  .toString("utf8")
  .split("\0")
  .filter(Boolean);

const violations = tracked.filter((path) =>
  forbiddenPrefixes.some((prefix) => path.startsWith(prefix)),
);

const report = {
  checkedAt: new Date().toISOString(),
  forbiddenPrefixes,
  violationCount: violations.length,
  violations,
};

if (violations.length > 0) {
  process.stderr.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exit(1);
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
