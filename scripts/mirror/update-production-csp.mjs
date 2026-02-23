#!/usr/bin/env node
/**
 * update-production-csp - Dynamically injects script-src hashes into vercel.json
 * to eliminate the need for unsafe-inline during Next.js hydration.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = join(__dirname, "../../public/index.html");
const vercelConfigPath = join(__dirname, "../../vercel.json");

const html = readFileSync(htmlPath, "utf8");
const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));

const $ = cheerio.load(html);
const inlineHashes = [];
$("script").each((_, el) => {
    const script = $(el);
    if (script.attr("src")) return;
    const content = script.html() ?? "";
    const hash = createHash("sha256").update(content, "utf8").digest("base64");
    inlineHashes.push(`'sha256-${hash}'`);
});

// Inject into vercel.json
let updated = false;
for (const route of vercelConfig.headers || []) {
    if (route.source === "/(.*)") {
        for (const header of route.headers) {
            if (header.key === "Content-Security-Policy") {
                let csp = header.value;

                // Dynamically replace the script-src segment
                const scriptSrcRegex = /script-src[^;]*/;
                csp = csp.replace(scriptSrcRegex, `script-src 'self' ${inlineHashes.join(" ")}`);

                // Remove unsafe-inline from style-src
                csp = csp.replace(/style-src 'self' 'unsafe-inline'/, "style-src 'self'");

                header.value = csp;
                updated = true;
            }
        }
    }
}

if (updated) {
    writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2) + "\n", "utf8");

    // Safety check to ensure it was actually eliminated
    const newConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));
    const route = newConfig.headers?.find(h => h.source === "/(.*)");
    const newCsp = route?.headers.find(h => h.key === "Content-Security-Policy")?.value || "";
    if (newCsp.includes("unsafe-inline")) {
        console.error("ERROR: unsafe-inline is still present in vercel.json after update.");
        process.exit(1);
    }

    console.log(`Updated vercel.json CSP with ${inlineHashes.length} secure inline hashes. Eliminated unsafe-inline.`);
} else {
    console.error("ERROR: CSP script-src pattern not found in vercel.json. Update failed.");
    process.exit(1);
}
