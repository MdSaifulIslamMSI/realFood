#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { DEPLOY_CSP, DEPLOY_HEADERS, REQUIRED_README_CLAIMS } from "../../security/policy.mjs";
import * as cheerio from "cheerio";

const issues = [];

const vercelConfig = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"));
const readme = readFileSync(new URL("../../README.md", import.meta.url), "utf8");
const html = readFileSync(new URL("../../public/index.html", import.meta.url), "utf8");



if (Array.isArray(vercelConfig.crons) && vercelConfig.crons.length > 0) {
  issues.push("vercel.json must not define public cron endpoints.");
}

const deployedHeaders = vercelConfig.headers?.[0]?.headers ?? [];
const deployedHeaderMap = new Map(deployedHeaders.map((header) => [header.key, header.value]));

for (const expected of DEPLOY_HEADERS) {
  const actual = deployedHeaderMap.get(expected.key);
  if (actual !== expected.value) {
    issues.push(`Header mismatch for ${expected.key}.`);
  }
}

const csp = deployedHeaderMap.get("Content-Security-Policy") ?? "";
if (csp !== DEPLOY_CSP) {
  issues.push("Deployed CSP does not match canonical security policy.");
}
if (csp.includes("unsafe-eval")) {
  issues.push("Deployed CSP must not include unsafe-eval.");
}

if (existsSync(new URL("../../api/cron.js", import.meta.url))) {
  issues.push("api/cron.js must not exist.");
}


for (const claim of REQUIRED_README_CLAIMS) {
  if (!readme.includes(claim)) {
    issues.push(`README missing required claim: ${claim}`);
  }
}



const report = {
  checkedAt: new Date().toISOString(),
  issueCount: issues.length,
  issues,
};

if (issues.length > 0) {
  process.stderr.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exit(1);
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
