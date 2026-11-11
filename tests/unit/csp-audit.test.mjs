import { describe, expect, it } from "vitest";
import { auditCsp } from "../../scripts/mirror/lib/csp-audit.mjs";

const base = "default-src 'self'; script-src 'self' 'sha256-abc'; style-src 'self' 'unsafe-inline'";

describe("deployment CSP audit", () => {
    it("accepts style-src unsafe-inline when scripts remain hash-based", () => {
        expect(auditCsp(base)).toEqual({
            present: true,
            hasScriptSrc: true,
            hasUnsafeInlineScript: false,
            hasUnsafeEval: false,
        });
    });

    it("rejects unsafe-inline in script-src", () => {
        const result = auditCsp("script-src 'self' 'unsafe-inline'; style-src 'self'");
        expect(result.hasUnsafeInlineScript).toBe(true);
    });

    it("rejects unsafe-inline in script-src-elem even when script-src is strict", () => {
        const result = auditCsp("script-src 'self' 'sha256-abc'; script-src-elem 'unsafe-inline'");
        expect(result.hasUnsafeInlineScript).toBe(true);
    });

    it("rejects unsafe-eval in any directive", () => {
        expect(auditCsp("script-src 'self' 'unsafe-eval'").hasUnsafeEval).toBe(true);
        expect(auditCsp("worker-src 'self' 'unsafe-eval'").hasUnsafeEval).toBe(true);
    });

    it("flags a header without script-src", () => {
        const result = auditCsp("default-src 'self'");
        expect(result.present).toBe(true);
        expect(result.hasScriptSrc).toBe(false);
    });

    it("handles an empty header", () => {
        expect(auditCsp("")).toEqual({
            present: false,
            hasScriptSrc: false,
            hasUnsafeInlineScript: false,
            hasUnsafeEval: false,
        });
    });
});
