import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["tests/unit/**/*.test.mjs"],
        reporters: ["verbose"],
        testTimeout: 10_000,
    },
});
