import { describe, expect, it } from "vitest";
import { buildCorsHeaders, getAllowedOrigin, isOriginAllowed } from "../../security/cors.mjs";

/**
 * Regression suite for the reflected-CORS vulnerability:
 *  - the old middleware reflected any https://*.vercel.app origin,
 *  - and emitted `Access-Control-Allow-Origin: null` for sandboxed documents.
 */
describe("shared CORS policy", () => {
  it("allows only exact configured origins", () => {
    const env = { ALLOWED_ORIGINS: "https://realfood.example, https://www.realfood.example" };

    expect(getAllowedOrigin("https://realfood.example", env)).toBe("https://realfood.example");
    expect(getAllowedOrigin("https://www.realfood.example", env)).toBe("https://www.realfood.example");
    expect(getAllowedOrigin("https://realfood.example.evil.com", env)).toBeNull();
    expect(getAllowedOrigin("http://realfood.example", env)).toBeNull();
  });

  it("never trusts an arbitrary *.vercel.app origin", () => {
    const env = {
      VERCEL_URL: "realfood-git-main.vercel.app",
      VERCEL_ENV: "production",
    };

    expect(getAllowedOrigin("https://realfood-git-main.vercel.app", env)).toBe(
      "https://realfood-git-main.vercel.app",
    );
    expect(getAllowedOrigin("https://attacker.vercel.app", env)).toBeNull();
    expect(getAllowedOrigin("https://realfood-git-main.vercel.app.attacker.com", env)).toBeNull();
  });

  it("never emits a null origin grant", () => {
    const headers = buildCorsHeaders("null", {});
    expect(headers["Access-Control-Allow-Origin"]).toBeUndefined();
    expect(headers.Vary).toBe("Origin");
    expect(getAllowedOrigin("null")).toBeNull();
  });

  it("treats localhost as development-only", () => {
    expect(isOriginAllowed("http://localhost:4173")).toBe(true);
    expect(isOriginAllowed("http://127.0.0.1:3000")).toBe(true);

    const production = { VERCEL_ENV: "production" };
    expect(isOriginAllowed("http://localhost:4173", production)).toBe(false);
    expect(isOriginAllowed("http://127.0.0.1:3000", production)).toBe(false);
  });

  it("returns no CORS grant for a disallowed origin", () => {
    const headers = buildCorsHeaders("https://evil.example", {});
    expect(headers).toEqual({ Vary: "Origin" });
  });

  it("cannot be reconfigured into wildcard or null grants", () => {
    const poisoned = { ALLOWED_ORIGINS: "*, null, https://realfood.example" };

    expect(getAllowedOrigin("*", poisoned)).toBeNull();
    expect(getAllowedOrigin("null", poisoned)).toBeNull();
    expect(getAllowedOrigin("https://realfood.example", poisoned)).toBe("https://realfood.example");
    expect(buildCorsHeaders("*", poisoned)["Access-Control-Allow-Origin"]).toBeUndefined();
  });

  it("does not enable credentials on telemetry stubs", () => {
    const headers = buildCorsHeaders("https://realfood.example", {
      ALLOWED_ORIGINS: "https://realfood.example",
    });

    expect(headers["Access-Control-Allow-Origin"]).toBe("https://realfood.example");
    expect(headers["Access-Control-Allow-Credentials"]).toBeUndefined();
  });
});
