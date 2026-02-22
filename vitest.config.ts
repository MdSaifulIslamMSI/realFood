import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["tests/unit/**/*.test.{js,mjs,ts}"],
        reporters: ["verbose"],
        testTimeout: 10_000,
    },
});
