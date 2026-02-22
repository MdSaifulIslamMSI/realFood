/**
 * Canonical production security policy for the deployed Vercel runtime.
 * Tests and CI checks must validate all public security claims against this file.
 */

export const INLINE_SCRIPT_HASHES = [
  "'sha256-Ds9/fzRBXqARNaYGZz/h+3byD5UnHLYNjCjBQxVau84='",
  "'sha256-w9m+Ry99s1I0x2JSgcQy1gSD3q2t/NDHv+R4xKjt+8w='",
  "'sha256-HpAAPxymiIlc7VAHdVONwl8U/gz6mGgKTHQeAPiTPQ8='",
  "'sha256-xkVmWVVxi1sYr3OS0xLkPQGXm8OCWMMiwWTunArbLNw='",
  "'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo='",
  "'sha256-AjC4tqRSn8oqLgoo9Jg+MnQq1YRGAv5BfhkqenNw5+I='",
  "'sha256-k126xz3tlqBDmR0axkgMO40qYOHBJzRG7kQuLfloddE='",
  "'sha256-9VcNCkaVosAKEKOs27k3WdSYt7+V4AsytiL7LUDgHDE='",
  "'sha256-e3Dazh/T56Fl+DDmLDEjCA6DDTpNKmIAReUACMVy8jc='",
  "'sha256-vt3NmmMzQktI6FCQD3HiVQUrBFTW5oXOlG7XGpNOHpM='",
  "'sha256-F4pJHrWGopk156fxoAkyscyrTBE48cyUBFUikP60OTU='",
  "'sha256-ihXTe5jBv6XjKsml5T82HeC/7f2IvChjt7tbcN/paOU='",
];

export const CSP_DIRECTIVES = [
  "default-src 'self'",
  `script-src 'self' ${INLINE_SCRIPT_HASHES.join(" ")}`,
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
  "No `unsafe-eval` or `unsafe-inline` is allowed in deployed CSP.",
  "Compatibility rewrites for `/e` and `/decide` are intentionally removed.",
];
