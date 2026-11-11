import { buildCorsHeaders, isOriginAllowed } from "./security/cors.mjs";

export const config = {
  matcher: "/stubs/:path*",
};

const STUB_METHODS = new Set(["GET", "HEAD", "POST", "OPTIONS"]);

const textResponse = (status, headers, body = "") =>
  new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });

export default function middleware(request) {
  // Tracking scripts occasionally POST/OPTIONS to a static stub path. Vercel
  // would answer 405 for static files, so the edge terminates those requests
  // locally. No body is read, stored, or forwarded.
  const origin = request.headers.get("Origin");
  const method = request.method.toUpperCase();

  if (origin && !isOriginAllowed(origin)) {
    return textResponse(403, { Vary: "Origin" });
  }

  if (!STUB_METHODS.has(method)) {
    return textResponse(405, {
      ...buildCorsHeaders(origin),
      Allow: "GET, HEAD, POST, OPTIONS",
    });
  }

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        ...buildCorsHeaders(origin),
        "Cache-Control": "no-store",
      },
    });
  }

  return textResponse(200, buildCorsHeaders(origin));
}
