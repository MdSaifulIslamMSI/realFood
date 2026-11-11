#!/usr/bin/env node
/**
 * Generate Netlify's `_headers` file from the canonical deployed headers.
 *
 * `vercel.json` is the production source of truth. Keeping the Netlify target
 * generated from it prevents the two static deployments from drifting apart.
 */
import { readFile, writeFile } from "node:fs/promises";

const vercelConfig = JSON.parse(
  await readFile(new URL("../../vercel.json", import.meta.url), "utf8"),
);
const headers = vercelConfig.headers?.[0]?.headers ?? [];

if (headers.length === 0) {
  throw new Error("vercel.json does not define deployed headers.");
}

const lines = ["/*", ...headers.map(({ key, value }) => `  ${key}: ${value}`), ""];
await writeFile(new URL("../../public/_headers", import.meta.url), lines.join("\n"), "utf8");
process.stdout.write(`Wrote ${headers.length} headers to public/_headers\n`);
