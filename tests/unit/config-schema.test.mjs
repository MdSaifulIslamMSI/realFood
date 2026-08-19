import { describe, expect, it } from "vitest";
import config from "../../mirror.config.mjs";
import { validateConfig } from "../../scripts/mirror/lib/config-schema.mjs";

describe("validateConfig", () => {
  it("accepts valid canonical mirror config", () => {
    expect(() => validateConfig(config)).not.toThrow();
  });

  it("rejects null or non-object configuration", () => {
    expect(() => validateConfig(null)).toThrow(TypeError);
    expect(() => validateConfig("invalid")).toThrow(TypeError);
  });

  it("rejects missing or invalid sourceOrigin", () => {
    expect(() => validateConfig({ ...config, sourceOrigin: "http://insecure.com" })).toThrow(TypeError);
  });

  it("rejects non-positive serve port", () => {
    expect(() => validateConfig({ ...config, serve: { port: -1 } })).toThrow(TypeError);
  });
});
