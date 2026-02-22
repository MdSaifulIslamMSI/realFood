import { describe, expect, it } from "vitest";
import { validateCaptureMeta, validateManifest, validateStaticRefs } from "../../scripts/mirror/lib/schema.mjs";

/* ------------------------------------------------------------------ */
/*  validateManifest                                                  */
/* ------------------------------------------------------------------ */
describe("validateManifest", () => {
    const validManifest = {
        sourceOrigin: "https://realfood.gov",
        capturedAt: "2026-01-01T00:00:00Z",
        entryUrl: "/",
        routes: ["/"],
        assets: [
            { sourceUrl: "https://realfood.gov/images/foo.webp", localPath: "/images/foo.webp", contentType: "", status: 200, sha256: "abc", bytes: 100 },
        ],
        htmlSha256: "abc123",
    };

    it("accepts a valid manifest", () => {
        expect(() => validateManifest(validManifest)).not.toThrow();
    });

    it("rejects null", () => {
        expect(() => validateManifest(null)).toThrow(TypeError);
    });

    it("rejects missing sourceOrigin", () => {
        expect(() => validateManifest({ ...validManifest, sourceOrigin: "" })).toThrow(TypeError);
    });

    it("rejects non-array assets", () => {
        expect(() => validateManifest({ ...validManifest, assets: "not-array" })).toThrow(TypeError);
    });

    it("rejects asset without sourceUrl", () => {
        const bad = { ...validManifest, assets: [{ localPath: "/x" }] };
        expect(() => validateManifest(bad)).toThrow(TypeError);
    });

    it("rejects asset without localPath", () => {
        const bad = { ...validManifest, assets: [{ sourceUrl: "https://x" }] };
        expect(() => validateManifest(bad)).toThrow(TypeError);
    });
});

/* ------------------------------------------------------------------ */
/*  validateCaptureMeta                                               */
/* ------------------------------------------------------------------ */
describe("validateCaptureMeta", () => {
    const validMeta = {
        sourceOrigin: "https://realfood.gov",
        capturedAt: "2026-01-01T00:00:00Z",
        htmlSha256: "abc123",
        status: 200,
    };

    it("accepts valid metadata", () => {
        expect(() => validateCaptureMeta(validMeta)).not.toThrow();
    });

    it("rejects null", () => {
        expect(() => validateCaptureMeta(null)).toThrow(TypeError);
    });

    it("rejects missing capturedAt", () => {
        expect(() => validateCaptureMeta({ ...validMeta, capturedAt: "" })).toThrow(TypeError);
    });

    it("rejects non-number status", () => {
        expect(() => validateCaptureMeta({ ...validMeta, status: "200" })).toThrow(TypeError);
    });
});

/* ------------------------------------------------------------------ */
/*  validateStaticRefs                                                */
/* ------------------------------------------------------------------ */
describe("validateStaticRefs", () => {
    const validRefs = {
        sourceOrigin: "https://realfood.gov",
        htmlRefs: ["https://realfood.gov/images/foo.webp"],
        cssRefs: [],
    };

    it("accepts valid refs", () => {
        expect(() => validateStaticRefs(validRefs)).not.toThrow();
    });

    it("rejects null", () => {
        expect(() => validateStaticRefs(null)).toThrow(TypeError);
    });

    it("rejects non-array htmlRefs", () => {
        expect(() => validateStaticRefs({ ...validRefs, htmlRefs: "not-array" })).toThrow(TypeError);
    });
});
