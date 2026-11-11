/**
 * Canonical production security policy for the deployed Vercel runtime.
 *
 * This file is the single source of truth for:
 *  - the CSP shipped by Vercel (`vercel.json`)
 *  - the CSP shipped by the Docker/Nginx image (`nginx/security-headers.conf`)
 *  - the CSP shipped by the local mirror server (`scripts/mirror/serve-mirror.mjs`)
 *  - the headers asserted by tests and CI
 *
 * Keep every public security claim in README.md/ARCHITECTURE.md aligned with
 * this file. `scripts/ci/check-security-policy.mjs` enforces that contract.
 */

export const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "report-uri /api/csp-report",
];

/**
 * Build a CSP for a specific runtime.
 *
 * @param {object} [options]
 * @param {string} [options.nonce] Per-response nonce used by the local server.
 * @param {string[]} [options.scriptHashes] SHA-256 hashes used by static hosts.
 * @returns {string}
 */
export const buildCsp = ({ nonce, scriptHashes = [] } = {}) => {
  const scriptSrc = ["'self'"];

  if (nonce) {
    scriptSrc.push(`'nonce-${nonce}'`);
  }

  scriptSrc.push(...scriptHashes);

  return CSP_DIRECTIVES.map((directive) =>
    directive.startsWith("script-src") ? `script-src ${scriptSrc.join(" ")}` : directive,
  ).join("; ");
};

/** Base deployed CSP. Inline-script hashes are appended by the pipeline. */
export const DEPLOY_CSP = buildCsp();

/** Headers that are identical across every deployment target. */
export const STATIC_SECURITY_HEADERS = [
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["Referrer-Policy", "no-referrer"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()"],
  ["Cross-Origin-Opener-Policy", "same-origin"],
  ["Cross-Origin-Resource-Policy", "same-origin"],
  // Only honoured over HTTPS; harmless when the Docker image is behind a TLS terminator.
  ["Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload"],
];

export const DEPLOY_HEADERS = [
  { key: "Content-Security-Policy", value: DEPLOY_CSP },
  ...STATIC_SECURITY_HEADERS.map(([key, value]) => ({ key, value })),
];

export const REQUIRED_README_CLAIMS = [
  "Vercel deployment path is the production security source of truth.",
  "No `unsafe-eval` is allowed in deployed CSP.",
  "Telemetry routes `/e` and `/decide` are actively routed to the local stub interceptor.",
];
