import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("capture-html contract", () => {
    it("does not pin capturedAt and supports explicit snapshot tags", () => {
        const source = readFileSync("scripts/mirror/capture-html.mjs", "utf8");
        expect(source.includes("PINNED_CAPTURED_AT")).toBe(false);
        expect(source.includes("--snapshot-tag")).toBe(true);
    });
});
