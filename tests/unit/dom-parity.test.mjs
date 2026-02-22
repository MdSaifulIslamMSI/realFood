import { describe, expect, it } from "vitest";
import { normalizeHtml } from "../../scripts/mirror/verify-dom-parity.mjs";

/* ------------------------------------------------------------------ */
/*  normalizeHtml                                                     */
/* ------------------------------------------------------------------ */
describe("normalizeHtml", () => {
    it("strips third-party preload links", () => {
        const html = '<link rel="preload" href="https://challenges.cloudflare.com/turnstile/v0/api.js" as="script">';
        expect(normalizeHtml(html)).toBe("");
    });

    it("strips third-party script tags", () => {
        const html = '<script src="https://static.cloudflareinsights.com/beacon.min.js"></script>';
        expect(normalizeHtml(html)).toBe("");
    });

    it("strips mirror stub scripts", () => {
        const html = '<script src="/stubs/noop-third-party.js" data-mirror-stub="true"></script>';
        expect(normalizeHtml(html)).toBe("");
    });

    it("strips network guard scripts", () => {
        const html = '<script src="/stubs/network-guard.js" data-mirror-network-guard="true"></script>';
        expect(normalizeHtml(html)).toBe("");
    });

    it("removes nonce attributes", () => {
        const html = '<script nonce="abc123">console.log("hi")</script>';
        const result = normalizeHtml(html);
        expect(result).not.toContain("nonce");
        expect(result).toContain("console.log");
    });

    it("normalizes origin references", () => {
        const html = '<a href="https://realfood.gov/about">About</a>';
        const result = normalizeHtml(html);
        expect(result).toContain('href="/about"');
        expect(result).not.toContain("realfood.gov");
    });

    it("normalizes CDN references", () => {
        const html = '<a href="https://cdn.realfood.gov/DGA.pdf">PDF</a>';
        const result = normalizeHtml(html);
        expect(result).toContain("/assets/mirror/cdn.realfood.gov/DGA.pdf");
    });

    it("collapses whitespace", () => {
        const html = "<div>  <span>  text  </span>  </div>";
        const result = normalizeHtml(html);
        expect(result).not.toMatch(/\s{2,}/);
    });
});
