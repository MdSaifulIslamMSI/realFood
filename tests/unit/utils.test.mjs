import { describe, expect, it } from "vitest";
import {
    cdnLocalPath,
    expandComposite,
    escapeRegex,
    isAllowedAssetPath,
    isFirstPartyHost,
    normalizeUrl,
    realfoodLocalPath,
    replaceAllLiteral,
    sanitizeQuery,
    sha256,
    toAbsoluteUrl,
    unique,
} from "../../scripts/mirror/lib/utils.mjs";

/* ------------------------------------------------------------------ */
/*  unique                                                            */
/* ------------------------------------------------------------------ */
describe("unique", () => {
    it("deduplicates values", () => {
        expect(unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
    });

    it("removes falsy values", () => {
        expect(unique(["a", "", null, undefined, "b", 0, false])).toEqual(["a", "b"]);
    });

    it("handles empty array", () => {
        expect(unique([])).toEqual([]);
    });
});

/* ------------------------------------------------------------------ */
/*  sha256                                                            */
/* ------------------------------------------------------------------ */
describe("sha256", () => {
    it("returns correct hash for known input", () => {
        // SHA-256 of empty string
        expect(sha256("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    });

    it("returns consistent hash for Buffer", () => {
        const hash = sha256(Buffer.from("hello"));
        expect(hash).toBe("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
    });
});

/* ------------------------------------------------------------------ */
/*  escapeRegex                                                       */
/* ------------------------------------------------------------------ */
describe("escapeRegex", () => {
    it("escapes special regex characters", () => {
        expect(escapeRegex("a.b*c?d")).toBe("a\\.b\\*c\\?d");
    });

    it("handles URL-like strings", () => {
        const url = "https://realfood.gov/path?q=1";
        const escaped = escapeRegex(url);
        expect(new RegExp(escaped).test(url)).toBe(true);
    });
});

/* ------------------------------------------------------------------ */
/*  replaceAllLiteral                                                 */
/* ------------------------------------------------------------------ */
describe("replaceAllLiteral", () => {
    it("replaces all occurrences literally", () => {
        expect(replaceAllLiteral("a.b a.b c", "a.b", "X")).toBe("X X c");
    });

    it("handles regex-special characters safely", () => {
        expect(replaceAllLiteral("(foo) [bar]", "(foo)", "baz")).toBe("baz [bar]");
    });
});

/* ------------------------------------------------------------------ */
/*  isFirstPartyHost                                                  */
/* ------------------------------------------------------------------ */
describe("isFirstPartyHost", () => {
    it("accepts realfood.gov", () => {
        expect(isFirstPartyHost("realfood.gov")).toBe(true);
    });

    it("accepts cdn.realfood.gov", () => {
        expect(isFirstPartyHost("cdn.realfood.gov")).toBe(true);
    });

    it("rejects third-party hosts", () => {
        expect(isFirstPartyHost("google.com")).toBe(false);
        expect(isFirstPartyHost("us.i.posthog.com")).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  isAllowedAssetPath                                                */
/* ------------------------------------------------------------------ */
describe("isAllowedAssetPath", () => {
    it("allows known prefixes", () => {
        expect(isAllowedAssetPath("/images/foo.webp")).toBe(true);
        expect(isAllowedAssetPath("/_next/static/css/main.css")).toBe(true);
        expect(isAllowedAssetPath("/video/test.mp4")).toBe(true);
        expect(isAllowedAssetPath("/font/Inter.woff2")).toBe(true);
    });

    it("rejects root path", () => {
        expect(isAllowedAssetPath("/")).toBe(false);
    });

    it("rejects unknown prefixes", () => {
        expect(isAllowedAssetPath("/api/data")).toBe(false);
        expect(isAllowedAssetPath("/unknown/path")).toBe(false);
    });
});

/* ------------------------------------------------------------------ */
/*  expandComposite                                                   */
/* ------------------------------------------------------------------ */
describe("expandComposite", () => {
    it("handles single value", () => {
        expect(expandComposite("/images/foo.webp")).toEqual(["/images/foo.webp"]);
    });

    it("parses srcset format", () => {
        const result = expandComposite("/img/a.webp 1x, /img/b.webp 2x");
        expect(result).toEqual(["/img/a.webp", "/img/b.webp"]);
    });

    it("handles empty/null/undefined", () => {
        expect(expandComposite("")).toEqual([]);
        expect(expandComposite(null)).toEqual([]);
        expect(expandComposite(undefined)).toEqual([]);
    });

    it("strips quotes", () => {
        expect(expandComposite("'/images/foo.webp'")).toEqual(["/images/foo.webp"]);
        expect(expandComposite('"/images/foo.webp"')).toEqual(["/images/foo.webp"]);
    });
});

/* ------------------------------------------------------------------ */
/*  toAbsoluteUrl                                                     */
/* ------------------------------------------------------------------ */
describe("toAbsoluteUrl", () => {
    it("returns absolute URLs unchanged", () => {
        expect(toAbsoluteUrl("https://example.com/path")).toBe("https://example.com/path");
    });

    it("converts root-relative to absolute", () => {
        expect(toAbsoluteUrl("/images/foo.webp")).toBe("https://realfood.gov/images/foo.webp");
    });

    it("converts protocol-relative to absolute", () => {
        expect(toAbsoluteUrl("//cdn.example.com/file")).toBe("https://cdn.example.com/file");
    });

    it("returns empty for empty input", () => {
        expect(toAbsoluteUrl("")).toBe("");
    });
});

/* ------------------------------------------------------------------ */
/*  sanitizeQuery                                                     */
/* ------------------------------------------------------------------ */
describe("sanitizeQuery", () => {
    it("removes leading ? and special characters", () => {
        expect(sanitizeQuery("?v=1.2&format=webp")).toBe("v_1.2_format_webp");
    });

    it("handles empty string", () => {
        expect(sanitizeQuery("")).toBe("");
    });
});

/* ------------------------------------------------------------------ */
/*  normalizeUrl                                                      */
/* ------------------------------------------------------------------ */
describe("normalizeUrl", () => {
    it("accepts valid first-party asset URLs", () => {
        const result = normalizeUrl("https://realfood.gov/images/foo.webp");
        expect(result).toBe("https://realfood.gov/images/foo.webp");
    });

    it("rejects third-party URLs", () => {
        expect(normalizeUrl("https://google.com/foo")).toBe("");
    });

    it("rejects non-asset realfood paths", () => {
        expect(normalizeUrl("https://realfood.gov/")).toBe("");
        expect(normalizeUrl("https://realfood.gov/api/data")).toBe("");
    });

    it("accepts CDN PDFs", () => {
        const result = normalizeUrl("https://cdn.realfood.gov/DGA.pdf");
        expect(result).toBe("https://cdn.realfood.gov/DGA.pdf");
    });

    it("rejects CDN non-PDFs", () => {
        expect(normalizeUrl("https://cdn.realfood.gov/data.json")).toBe("");
    });

    it("returns empty for malformed URLs", () => {
        expect(normalizeUrl("not a url")).toBe("");
    });
});

/* ------------------------------------------------------------------ */
/*  realfoodLocalPath                                                 */
/* ------------------------------------------------------------------ */
describe("realfoodLocalPath", () => {
    it("returns pathname for no-query URLs", () => {
        expect(realfoodLocalPath("https://realfood.gov/images/foo.webp")).toBe("/images/foo.webp");
    });

    it("encodes query into filename", () => {
        const result = realfoodLocalPath("https://realfood.gov/images/foo.webp?v=1");
        expect(result).toContain("__q_");
        expect(result).toContain("v_1");
        expect(result).toMatch(/\.webp$/);
    });
});

/* ------------------------------------------------------------------ */
/*  cdnLocalPath                                                      */
/* ------------------------------------------------------------------ */
describe("cdnLocalPath", () => {
    it("maps CDN URL to local mirror path", () => {
        expect(cdnLocalPath("https://cdn.realfood.gov/DGA.pdf")).toBe(
            "/assets/mirror/cdn.realfood.gov/DGA.pdf",
        );
    });
});
