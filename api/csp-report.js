const ACCEPTED_CONTENT_TYPES = new Set([
  "application/csp-report",
  "application/reports+json",
  "application/json",
]);

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).end();
    return;
  }

  const contentLength = Number.parseInt(String(req.headers["content-length"] ?? "0"), 10);
  if (Number.isFinite(contentLength) && contentLength > 64 * 1024) {
    res.status(413).end();
    return;
  }

  const contentType = String(req.headers["content-type"] ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();

  // Legacy CSP reports use application/csp-report; Reporting API uses
  // application/reports+json. A missing content type is tolerated for older
  // browsers, but arbitrary payloads are not accepted.
  if (contentType && !ACCEPTED_CONTENT_TYPES.has(contentType)) {
    res.status(415).end();
    return;
  }

  // Reports are intentionally not logged or persisted. This endpoint exists so
  // CSP violations are observable without collecting user data.
  res.status(204).end();
}
