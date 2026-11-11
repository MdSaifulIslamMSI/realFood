import { afterAll, beforeAll, describe, expect, it } from "vitest";
import cspReport from "../../netlify/functions/csp-report.mjs";
import stub from "../../netlify/functions/stub.mjs";

const SITE = "https://realfood-mirror.netlify.app";
const originalAllowedOrigins = process.env.ALLOWED_ORIGINS;

const request = (path, init = {}) => new Request(`${SITE}${path}`, init);

beforeAll(() => {
    process.env.ALLOWED_ORIGINS = "https://allowed.example";
});

afterAll(() => {
    if (originalAllowedOrigins === undefined) {
        delete process.env.ALLOWED_ORIGINS;
    } else {
        process.env.ALLOWED_ORIGINS = originalAllowedOrigins;
    }
});

describe("Netlify telemetry stub", () => {
    it("accepts same-origin POST without emitting a cross-origin grant", async () => {
        const response = await stub(
            request("/e", { method: "POST", headers: { Origin: SITE } }),
        );
        expect(response.status).toBe(200);
        expect(response.headers.get("access-control-allow-origin")).toBeNull();
        expect(response.headers.get("cache-control")).toBe("no-store");
        expect(response.headers.get("vary")).toBe("Origin");
    });

    it("reflects only an explicitly allowed cross-origin", async () => {
        const response = await stub(
            request("/e", {
                method: "POST",
                headers: { Origin: "https://allowed.example" },
            }),
        );
        expect(response.status).toBe(200);
        expect(response.headers.get("access-control-allow-origin")).toBe(
            "https://allowed.example",
        );
    });

    it("rejects arbitrary vercel.app and null origins", async () => {
        for (const origin of ["https://attacker.vercel.app", "null"]) {
            const response = await stub(
                request("/e", { method: "POST", headers: { Origin: origin } }),
            );
            expect(response.status).toBe(403);
            expect(response.headers.get("access-control-allow-origin")).toBeNull();
        }
    });

    it("allows the read/telemetry method set and rejects state-changing verbs", async () => {
        for (const method of ["GET", "HEAD", "POST"]) {
            expect((await stub(request("/e", { method }))).status).toBe(200);
        }

        const options = await stub(request("/e", { method: "OPTIONS" }));
        expect(options.status).toBe(204);
        expect(options.headers.get("allow")).toBe("GET, HEAD, POST, OPTIONS");

        const put = await stub(request("/e", { method: "PUT" }));
        expect(put.status).toBe(405);
        expect(put.headers.get("allow")).toBe("GET, HEAD, POST, OPTIONS");
    });
});

describe("Netlify CSP report sink", () => {
    it("accepts a bounded POST and returns 204", async () => {
        const response = await cspReport(
            request("/api/csp-report", {
                method: "POST",
                headers: { "content-type": "application/csp-report" },
                body: "{}",
            }),
        );
        expect(response.status).toBe(204);
        expect(response.headers.get("cache-control")).toBe("no-store");
    });

    it("rejects non-POST methods", async () => {
        const response = await cspReport(request("/api/csp-report"));
        expect(response.status).toBe(405);
        expect(response.headers.get("allow")).toBe("POST, OPTIONS");
    });

    it("rejects oversized and non-report payloads", async () => {
        const oversized = await cspReport(
            request("/api/csp-report", {
                method: "POST",
                headers: {
                    "content-type": "application/csp-report",
                    "content-length": String(64 * 1024 + 1),
                },
            }),
        );
        expect(oversized.status).toBe(413);

        const wrongType = await cspReport(
            request("/api/csp-report", {
                method: "POST",
                headers: { "content-type": "text/plain" },
                body: "{}",
            }),
        );
        expect(wrongType.status).toBe(415);
    });
});
