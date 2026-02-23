/**
 * Canonical production security policy for the deployed Vercel runtime.
 * Tests and CI checks must validate all public security claims against this file.
 */



export const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
];

export const DEPLOY_CSP = CSP_DIRECTIVES.join("; ");

export const DEPLOY_HEADERS = [
  { key: "Content-Security-Policy", value: DEPLOY_CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

export const REQUIRED_README_CLAIMS = [
  "Vercel deployment path is the production security source of truth.",
  "No `unsafe-eval` is allowed in deployed CSP.",
  "Telemetry routes `/e` and `/decide` are actively routed to the local stub interceptor.",
];
