import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("security policy contract", () => {
    it("matches deployed config, docs, and inline script hashes", () => {
        const result = spawnSync(
            process.execPath,
            ["scripts/ci/check-security-policy.mjs"],
            { encoding: "utf8" },
        );

        if (result.status !== 0) {
            // Keep stderr visible in test output to aid incident debugging.
            // eslint-disable-next-line no-console
            console.error(result.stderr || result.stdout);
        }

        expect(result.status).toBe(0);
    });
});
