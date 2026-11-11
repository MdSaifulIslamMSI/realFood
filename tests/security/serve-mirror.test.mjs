import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import http from "node:http";
import { createMirrorServer } from "../../scripts/mirror/serve-mirror.mjs";

/**
 * Regression suite for the local mirror server.
 *
 * Every test in this file maps to an exploit or crash that was reproduced
 * against the pre-hardening server:
 *  - GET /images/ crashed the process with an unhandled EISDIR.
 *  - POST/PUT/DELETE/OPTIONS/TRACE / returned 200 HTML.
 *  - bytes=-N returned the wrong slice and multi-range was mis-served.
 *  - encoded traversal probes reached outside public/.
 */
describe("mirror server hardening", () => {
  let server;
  let baseUrl;
  let fixtureRoot;

  beforeAll(async () => {
    fixtureRoot = await mkdtemp(join(tmpdir(), "realfood-server-"));
    const publicRoot = join(fixtureRoot, "public");
    await mkdir(join(publicRoot, "nested"), { recursive: true });
    await writeFile(join(publicRoot, "index.html"), "<!doctype html><html><head><script>window.ok=1</script></head><body>ok</body></html>");
    await writeFile(join(publicRoot, "data.txt"), "0123456789");
    await writeFile(join(publicRoot, "nested", "child.txt"), "child");
    await writeFile(join(fixtureRoot, "secret.txt"), "outside-root");

    server = await createMirrorServer({ publicRoot });
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    await rm(fixtureRoot, { recursive: true, force: true });
  });

  it("serves GET and HEAD with canonical security headers", async () => {
    const response = await fetch(`${baseUrl}/`);
    expect(response.status).toBe(200);

    const headers = response.headers;
    expect(headers.get("x-content-type-options")).toBe("nosniff");
    expect(headers.get("x-frame-options")).toBe("DENY");
    expect(headers.get("referrer-policy")).toBe("no-referrer");
    expect(headers.get("cross-origin-opener-policy")).toBe("same-origin");
    expect(headers.get("cross-origin-resource-policy")).toBe("same-origin");

    const csp = headers.get("content-security-policy");
    const scriptSrc = csp.match(/script-src[^;]*/)?.[0] ?? "";
    expect(csp).toContain("report-uri /api/csp-report");
    expect(scriptSrc).not.toContain("unsafe-eval");
    expect(scriptSrc).not.toContain("unsafe-inline");
    expect(scriptSrc).toMatch(/nonce-[A-Za-z0-9+/=]+/);

    const html = await response.text();
    const scriptTags = [...html.matchAll(/<script\b[^>]*>/gi)].map((match) => match[0]);
    expect(scriptTags.length).toBeGreaterThan(0);
    for (const tag of scriptTags) {
      expect(tag).toContain("nonce=");
    }

    const head = await fetch(`${baseUrl}/`, { method: "HEAD" });
    expect(head.status).toBe(200);
    expect(await head.text()).toBe("");
  });

  it("issues a unique nonce per response", async () => {
    const nonceOf = async () => {
      const response = await fetch(`${baseUrl}/`);
      return response.headers.get("content-security-policy").match(/'nonce-([^']+)'/)?.[1];
    };

    expect(await nonceOf()).not.toBe(await nonceOf());
  });

  it("rejects directory streaming with a 404 instead of crashing", async () => {
    const response = await fetch(`${baseUrl}/nested/`);
    expect(response.status).toBe(404);
  });

  it("rejects state-changing and unknown HTTP methods", async () => {
    for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
      const response = await fetch(`${baseUrl}/`, { method });
      expect(response.status, `method ${method}`).toBe(405);
      expect(response.headers.get("allow")).toBe("GET, HEAD, OPTIONS");
    }

    // fetch() refuses TRACE, so exercise it with the raw HTTP client.
    const traceStatus = await new Promise((resolve, reject) => {
      const request = http.request(
        { hostname: "127.0.0.1", port: server.address().port, path: "/", method: "TRACE" },
        (response) => {
          response.resume();
          response.on("end", () => resolve(response.statusCode));
        },
      );
      request.on("error", reject);
      request.end();
    });
    expect(traceStatus).toBe(405);

    // The process must still be alive after the method probes.
    expect((await fetch(`${baseUrl}/`)).status).toBe(200);
  });

  it("parses single, open-ended, and suffix byte ranges correctly", async () => {
    const single = await fetch(`${baseUrl}/data.txt`, { headers: { Range: "bytes=0-1" } });
    expect(single.status).toBe(206);
    expect(single.headers.get("content-range")).toBe("bytes 0-1/10");
    expect(await single.text()).toBe("01");

    const openEnded = await fetch(`${baseUrl}/data.txt`, { headers: { Range: "bytes=4-" } });
    expect(openEnded.status).toBe(206);
    expect(openEnded.headers.get("content-range")).toBe("bytes 4-9/10");
    expect(await openEnded.text()).toBe("456789");

    const suffix = await fetch(`${baseUrl}/data.txt`, { headers: { Range: "bytes=-5" } });
    expect(suffix.status).toBe(206);
    expect(suffix.headers.get("content-range")).toBe("bytes 5-9/10");
    expect(await suffix.text()).toBe("56789");
  });

  it("rejects multi-range and unsatisfiable ranges with 416", async () => {
    for (const range of ["bytes=0-1,4-5", "bytes=99-100", "bytes=-0", "bytes=abc"]) {
      const response = await fetch(`${baseUrl}/data.txt`, { headers: { Range: range } });
      expect(response.status, `range ${range}`).toBe(416);
      expect(response.headers.get("content-range")).toBe("bytes */10");
    }
  });

  it("blocks encoded traversal and NUL bytes", async () => {
    const traversal = await fetch(`${baseUrl}/..%2fsecret.txt`);
    expect([400, 403]).toContain(traversal.status);

    const nestedTraversal = await fetch(`${baseUrl}/nested%2f..%2f..%2fsecret.txt`);
    expect([400, 403]).toContain(nestedTraversal.status);

    const nul = await fetch(`${baseUrl}/%00`);
    expect(nul.status).toBe(400);
  });

  it("implements the telemetry stub surface without side effects", async () => {
    for (const path of ["/e", "/e/", "/decide", "/decide/"]) {
      const response = await fetch(`${baseUrl}${path}`);
      expect(response.status, `GET ${path}`).toBe(200);
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(response.headers.get("access-control-allow-origin")).toBeNull();
    }

    const post = await fetch(`${baseUrl}/e`, { method: "POST", body: '{"event":"x"}' });
    expect(post.status).toBe(200);

    const options = await fetch(`${baseUrl}/decide`, { method: "OPTIONS" });
    expect(options.status).toBe(204);
    expect(options.headers.get("allow")).toBe("GET, HEAD, POST, OPTIONS");
  });

  it("implements the CSP report sink contract", async () => {
    const options = await fetch(`${baseUrl}/api/csp-report`, { method: "OPTIONS" });
    expect(options.status).toBe(204);
    expect(options.headers.get("allow")).toBe("POST, OPTIONS");

    const get = await fetch(`${baseUrl}/api/csp-report`);
    expect(get.status).toBe(405);

    const valid = await fetch(`${baseUrl}/api/csp-report`, {
      method: "POST",
      headers: { "Content-Type": "application/csp-report" },
      body: "{}",
    });
    expect(valid.status).toBe(204);

    const wrongType = await fetch(`${baseUrl}/api/csp-report`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "x",
    });
    expect(wrongType.status).toBe(415);
  });

  it("keeps security headers on error responses", async () => {
    const notFound = await fetch(`${baseUrl}/missing`);
    expect(notFound.status).toBe(404);
    expect(notFound.headers.get("x-frame-options")).toBe("DENY");
    expect(notFound.headers.get("content-security-policy")).toBeTruthy();
  });
});
