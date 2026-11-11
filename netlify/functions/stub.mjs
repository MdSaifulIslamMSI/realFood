import { buildCorsHeaders, isOriginAllowed } from "../../security/cors.mjs";

const STUB_METHODS = new Set(["GET", "HEAD", "POST", "OPTIONS"]);
const SECURITY_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Type": "application/javascript; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

const isSameOrigin = (origin, request) => {
  if (!origin) return false;
  try {
    return origin === new URL(request.url).origin;
  } catch {
    return false;
  }
};

export default async (request) => {
  const origin = request.headers.get("origin") || "";
  const method = String(request.method || "GET").toUpperCase();
  const headers = new Headers({ ...SECURITY_HEADERS, Vary: "Origin" });

  // Same-origin telemetry is always allowed; cross-origin callers must match
  // the exact shared allowlist. `*` and `null` are rejected by the policy.
  if (origin && !isSameOrigin(origin, request) && !isOriginAllowed(origin)) {
    return new Response(null, { status: 403, headers });
  }

  for (const [key, value] of Object.entries(buildCorsHeaders(origin))) {
    headers.set(key, value);
  }

  if (!STUB_METHODS.has(method)) {
    headers.set("Allow", "GET, HEAD, POST, OPTIONS");
    return new Response(null, { status: 405, headers });
  }

  if (method === "OPTIONS") {
    headers.set("Allow", "GET, HEAD, POST, OPTIONS");
    return new Response(null, { status: 204, headers });
  }

  // Return an empty 200 so analytics scripts fail closed without throwing.
  return new Response("", { status: 200, headers });
};
