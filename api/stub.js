import { buildCorsHeaders, isOriginAllowed } from "../security/cors.mjs";

const STUB_METHODS = new Set(["GET", "HEAD", "POST", "OPTIONS"]);

export default function handler(req, res) {
  const origin = req.headers.origin || "";
  const method = String(req.method || "GET").toUpperCase();

  res.setHeader("Cache-Control", "no-store");

  // A browser only sends Origin for cross-origin requests. Reject disallowed
  // origins outright instead of granting them a spoofable `null` origin.
  if (origin && !isOriginAllowed(origin)) {
    res.status(403).end();
    return;
  }

  for (const [key, value] of Object.entries(buildCorsHeaders(origin))) {
    res.setHeader(key, value);
  }

  if (!STUB_METHODS.has(method)) {
    res.setHeader("Allow", "GET, HEAD, POST, OPTIONS");
    res.status(405).end();
    return;
  }

  if (method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  // Return an empty 200 so analytics scripts fail closed without throwing.
  // The request body is intentionally ignored.
  res.status(200).send("");
}
