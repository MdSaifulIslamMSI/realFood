const ACCEPTED_CONTENT_TYPES = new Set([
  "application/csp-report",
  "application/reports+json",
  "application/json",
]);

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

export default async (request) => {
  const headers = new Headers(RESPONSE_HEADERS);

  if (request.method === "OPTIONS") {
    headers.set("Allow", "POST, OPTIONS");
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== "POST") {
    headers.set("Allow", "POST, OPTIONS");
    return new Response(null, { status: 405, headers });
  }

  const contentLength = Number.parseInt(request.headers.get("content-length") ?? "0", 10);
  if (Number.isFinite(contentLength) && contentLength > 64 * 1024) {
    return new Response(null, { status: 413, headers });
  }

  const contentType = String(request.headers.get("content-type") ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType && !ACCEPTED_CONTENT_TYPES.has(contentType)) {
    return new Response(null, { status: 415, headers });
  }

  // Reports are intentionally not logged or persisted.
  return new Response(null, { status: 204, headers });
};
