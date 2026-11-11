/**
 * Shared CORS policy for the edge middleware and the Vercel functions.
 *
 * Security invariants:
 *  - Never reflect an arbitrary origin. Only exact allowlisted origins are
 *    reflected, plus the deployment's own VERCEL_URL / production URL.
 *  - Never emit `Access-Control-Allow-Origin: null`; sandboxed documents
 *    routinely present a null origin.
 *  - Never trust a wildcard `*.vercel.app` origin. Anybody can deploy an
 *    attacker-controlled project under that suffix.
 *  - Localhost is a development convenience only and is denied in production.
 *  - Credentials are never enabled on the telemetry stubs.
 */

const LOCAL_ORIGIN_RE = /^http:\/\/(?:localhost|127\.0\.0\.1)(?::\d{1,5})?$/;

const normaliseEnvironment = (env) => {
  if (env && typeof env === "object") return env;
  return typeof process !== "undefined" && process.env ? process.env : {};
};

/**
 * Parse a comma-separated origin allowlist.
 *
 * `*` and `null` are rejected even if an operator puts them in the environment:
 * they are the two values this policy exists to eliminate.
 *
 * @param {string | undefined} value
 * @returns {string[]}
 */
export const parseAllowedOrigins = (value) =>
  String(value ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .filter((origin) => origin !== "*" && origin !== "null")
    .filter((origin) => /^https?:\/\/[^/\s]+$/.test(origin));

/**
 * Return the origin that may be reflected, or null when the origin is not
 * explicitly allowed.
 *
 * @param {string | null | undefined} origin
 * @param {Record<string, string | undefined>} [env]
 * @returns {string | null}
 */
export const getAllowedOrigin = (origin, env) => {
  if (!origin || origin === "null" || origin === "*") return null;

  const environment = normaliseEnvironment(env);
  const allowed = new Set(parseAllowedOrigins(environment.ALLOWED_ORIGINS));

  if (environment.ALLOWED_ORIGIN) {
    for (const candidate of parseAllowedOrigins(environment.ALLOWED_ORIGIN)) {
      allowed.add(candidate);
    }
  }

  if (environment.VERCEL_URL) {
    allowed.add(`https://${environment.VERCEL_URL}`);
  }

  if (environment.VERCEL_PROJECT_PRODUCTION_URL) {
    allowed.add(`https://${environment.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  if (allowed.has(origin)) return origin;

  // Local development is convenient, but production must always be explicit.
  if (environment.VERCEL_ENV !== "production" && LOCAL_ORIGIN_RE.test(origin)) {
    return origin;
  }

  return null;
};

/**
 * @param {string | null | undefined} origin
 * @param {Record<string, string | undefined>} [env]
 * @returns {boolean}
 */
export const isOriginAllowed = (origin, env) => Boolean(getAllowedOrigin(origin, env));

/**
 * Build CORS response headers. Disallowed origins receive no CORS grant at
 * all (not a `null` grant).
 *
 * @param {string | null | undefined} origin
 * @param {Record<string, string | undefined>} [env]
 * @returns {Record<string, string>}
 */
export const buildCorsHeaders = (origin, env) => {
  const allowedOrigin = getAllowedOrigin(origin, env);
  const headers = { Vary: "Origin" };

  if (!allowedOrigin) return headers;

  return {
    ...headers,
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With, X-CSRF-Token, Accept",
    "Access-Control-Max-Age": "600",
  };
};
