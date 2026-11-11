# Security Audit — 2026-11-11

**Target:** `https://github.com/MdSaifulIslamMSI/realFood`
**Scope:** static mirror payload, Node development server, Vercel edge/function
surface, Nginx/Docker delivery path, CI/CD supply chain, dependencies.
**Method:** manual source review, local exploit reproduction, header/CORS/range
probing, dependency audit, container configuration review, and regression tests.
**Result:** 12 findings remediated; 4 residual risks accepted and documented.

> This was an authorized security review of the repository owner's own project.
> No third-party production system was attacked. Exploit probes were run against
> the local mirror on `127.0.0.1:4173` and, after hardening, against the Docker
> container.

---

## 1. Executive summary

The pre-hardening mirror had a credible exploit chain:

1. The daily sync workflow **pushed an unreviewed upstream snapshot directly to
   `main`**, so anyone who could influence `realfood.gov` or the capture path
   could inject content into production.
2. Nginx asset locations declared their own `add_header Cache-Control`, which
   **silently discarded the server-level CSP/HSTS/frame headers** on JavaScript,
   CSS, media, and document responses.
3. The telemetry/stub surface reflected **any `https://*.vercel.app` origin** and
   emitted `Access-Control-Allow-Origin: null`.
4. A single `GET /images/` request **crashed the local server** with an unhandled
   `EISDIR`, and state-changing methods returned `200`.

Individually these are serious. Together they meant the least-reviewed path
(automated upstream content) reached the deployment target with the weakest
response policy (no CSP on executable assets) and a permissive cross-origin
grant. The chain is closed at every link: review-gated sync, generated headers
on every Nginx location, exact-origin CORS, method allowlists, and exploit
regression tests.

---

## 2. Findings

| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | High | Unreviewed upstream sync could push straight to `main` | Fixed |
| 2 | High | Nginx asset locations dropped CSP/HSTS/frame headers | Fixed |
| 3 | High | CORS reflected arbitrary `*.vercel.app` and `null` origins | Fixed |
| 4 | High | Unhandled `EISDIR` crashed the mirror server | Fixed |
| 5 | Medium | `POST/PUT/DELETE/OPTIONS/TRACE /` returned `200` HTML | Fixed |
| 6 | Medium | Range parser mis-served suffix and multi-range requests | Fixed |
| 7 | Medium | Nginx CSP diverged from Vercel and lacked inline hashes | Fixed |
| 8 | Medium | Nginx telemetry/stub location had wildcard CORS and broad matching | Fixed |
| 9 | Medium | `embed.videodelivery.net` escaped the egress deny list | Fixed |
| 10 | Medium | Docker image ran Nginx as root | Fixed |
| 11 | Low | 37.34 MB orphaned subtree and malformed `browserconfig.xml` | Fixed |
| 12 | Low | CI lacked least-privilege permissions and used EOL Node 20 | Fixed |

### Finding 1 — Unreviewed upstream sync (High)

**Component:** `.github/workflows/upstream-sync.yml`

The scheduled job ran the capture pipeline and then:

```bash
git add public/ vercel.json
git commit -m "chore(mirror): autonomous upstream sync [skip ci]"
git push
```

**Impact:** the workflow had default write permissions and no review step. A
compromised or defaced upstream, a malicious asset, or a pipeline bug could land
directly on the production branch with `[skip ci]` suppressing CI. This is the
highest-leverage finding because it weaponizes the trust relationship between
the mirror and its upstream.

**Fix:** the job now has explicit `contents: write` and `pull-requests: write`
permissions, commits to `mirror/sync-${GITHUB_RUN_ID}`, pushes that branch, and
opens a PR with `gh pr create`. It cannot push `main`. CI permissions are
read-only. Dependabot tracks actions, npm, and Docker bases.

**Verification:** `grep -n "git push\\|gh pr create" .github/workflows/upstream-sync.yml`
shows branch-scoped push + PR; the workflow contains no `git push origin main`
or `[skip ci]`.

### Finding 2 — Nginx header inheritance (High)

**Component:** `nginx.conf`

The server block set CSP, HSTS, `X-Frame-Options`, and related headers. Each
asset location then declared `add_header Cache-Control …`. In Nginx, a child
`add_header` replaces the entire inherited set. Result: every JS/CSS/media/PDF
response shipped **without CSP, HSTS, or anti-framing headers**.

**Reproduction (pre-fix):**

```bash
curl -sI http://127.0.0.1:8080/_next/static/chunks/386-329e5ca5ca162a74.js
# content-security-policy: <absent>
# strict-transport-security: <absent>
```

**Fix:** `nginx/security-headers.conf` is included in every location that sets
its own header. The snippet is generated from `security/policy.mjs`, so Vercel
and Nginx cannot drift. `scripts/ci/check-security-policy.mjs` asserts every
header exists in the snippet and that the CSP equals `vercel.json`.

**Verification:** the Docker smoke test in §4 checks headers on both `/` and a
hashed JS chunk.

### Finding 3 — CORS reflection (High)

**Component:** `middleware.js`, `api/stub.js`

The previous logic reflected any origin matching `*.vercel.app` and emitted
`Access-Control-Allow-Origin: null` for sandboxed documents.

**Reproduction:**

```bash
curl -sI -H 'Origin: https://attacker.vercel.app' http://127.0.0.1:4173/stubs/noop-third-party.js
# access-control-allow-origin: https://attacker.vercel.app
curl -sI -H 'Origin: null' http://127.0.0.1:4173/stubs/noop-third-party.js
# access-control-allow-origin: null
```

**Impact:** any Vercel-hosted attacker page could read stub responses; a
sandboxed iframe could obtain a `null` grant. Neither leaks user data directly,
but both violate the same-origin contract and enable cross-origin probing.

**Fix:** [`security/cors.mjs`](../security/cors.mjs) implements an exact
allowlist. Disallowed origins receive only `Vary: Origin`; `null` is never
granted; credentials are never enabled; localhost is development-only.

**Verification:** `tests/unit/cors.test.mjs` (6 tests) plus
`scripts/ci/check-security-policy.mjs`.

### Finding 4 — Directory crash (High)

**Component:** `scripts/mirror/serve-mirror.mjs`

`GET /images/` resolved to a directory and was passed to `createReadStream`.
Node emitted an unhandled `EISDIR` error event and terminated the process.

**Reproduction (pre-fix):**

```text
node:events:487
      throw er; // Unhandled 'error' event
Error: EISDIR: illegal operation on a directory, read
```

**Fix:** `resolveFilePath` rejects non-files with `404`; stream failures are
contained by `pipeline` with a guarded 500/connection destroy; `clientError` is
handled.

**Verification:** `tests/security/serve-mirror.test.mjs` — directory test plus
subsequent liveness assertion.

### Finding 5 — HTTP method confusion (Medium)

**Component:** `scripts/mirror/serve-mirror.mjs`

`POST`, `PUT`, `DELETE`, `OPTIONS`, and `TRACE` on `/` all returned `200` HTML.
The server had no method allowlist, so it behaved as if every verb were `GET`.

**Fix:** GET/HEAD only for static content; telemetry allows
GET/HEAD/POST/OPTIONS; all other methods return `405` with `Allow`. OPTIONS
returns `204` only where explicitly supported.

**Verification:** raw `TRACE` test (Node's `fetch` refuses TRACE) and
POST/PUT/PATCH/DELETE tests in the security suite.

### Finding 6 — Range parsing (Medium)

**Component:** `scripts/mirror/serve-mirror.mjs`

The parser treated `bytes=-100` as `0-100` (wrong suffix semantics) and silently
served only the first range for `bytes=0-1,5-6`.

**Fix:** RFC 7233-compliant single-range parser: `start-end`, `start-`, `-suffix`;
multi-range and unsatisfiable ranges return `416` with `Content-Range: bytes */size`.

**Verification:** suffix, open-ended, multi-range, and invalid range tests.

### Finding 7 — CSP divergence (Medium)

**Component:** `nginx.conf`, `vercel.json`, `security/policy.mjs`

The Nginx CSP omitted the inline-script hashes present in Vercel's CSP. Inline
bootstrap scripts would therefore be blocked in the container, or operators
would be tempted to add `unsafe-inline`.

**Fix:** one generator writes both targets from the same policy and refuses to
emit `unsafe-inline`/`unsafe-eval` in `script-src`. `policy:check` asserts exact
equality (hashes included).

### Finding 8 — Nginx telemetry CORS/breadth (Medium)

**Component:** `nginx.conf`

`location ~ ^/(stubs/|e/?|decide/?)` returned `200` for **every** path under
`/stubs/`, including non-existent files, and added `Access-Control-Allow-Origin: *`
to telemetry and CSP-report responses.

**Fix:** separate exact telemetry regex (`^/(e|decide)/?$`), static `/stubs/`
with `try_files $uri =404`, POST-only CSP sink, and no CORS grants.

### Finding 9 — Unblocked Cloudflare Stream host (Medium)

**Component:** `mirror.config.mjs`, generated guard, JS chunks

`embed.videodelivery.net` appeared in two mirrored chunks but was absent from
`blockedHosts`, `thirdPartyPatterns`, and `sanitizeReplacements`. The guard
would not block it, and the sanitizer would not rewrite it.

**Fix:** added to all three lists; chunks sanitized; guard regenerated.

**Verification:** `grep -R "embed.videodelivery.net" public` returns only the
guard's deny list; `check:mirror-integrity` fails if it appears elsewhere.

### Finding 10 — Root container (Medium)

**Component:** `Dockerfile`, `docker-compose.yml`

The image used `nginx:1.27-alpine` and ran as root. Compose had no read-only
filesystem, no capability drop, and mapped host `8080` to container `80`.

**Fix:** `nginxinc/nginx-unprivileged:1.27-alpine`, explicit `USER 101`, port
`8080`, read-only root, `cap_drop: ALL`, `no-new-privileges`, `noexec,nosuid`
tmpfs, healthcheck on `/healthz`.

### Finding 11 — Orphan subtree and malformed XML (Low)

**Component:** `public/assets/mirror/realfood.gov/`

37.34 MB and 74 tracked files, unreferenced by the site. It included a 231 KB
HTML document named `browserconfig.xml`, served as `application/xml`. Dead
weight expands the attack surface and the image.

**Fix:** removed after a reference search; `check:mirror-integrity` and
`check-security-policy` fail if it returns.

### Finding 12 — CI hygiene (Low)

**Component:** `.github/workflows/*.yml`, dependencies

Node 20 was used after its end of life; workflows had default permissions; no
Dependabot configuration; `vitest`, `vite`, `undici`, and `source-map-js` had
advisories.

**Fix:** Node 24 in CI, top-level read-only permissions, concurrency groups,
timeouts, artifact upload on failure, Dependabot, and dependency upgrades.
`npm audit --audit-level=high` now reports **0 vulnerabilities**.

---

## 3. Exploit chain (pre-fix)

```text
Deface/compromise upstream or capture path
        │
        ▼
upstream-sync pushes directly to main ([skip ci])
        │
        ▼
Vercel/Nginx serve attacker-influenced bundle
        │
        ├── Nginx asset locations have no CSP/HSTS/frame headers
        ├── CORS reflects attacker.vercel.app / null
        └── telemetry/stub surface broadly matches /stubs/*
        │
        ▼
Attacker page can probe/read stub responses; injected script runs
under a policy that is absent on the very assets it loads
```

The chain required several independent mistakes. Removing any one link breaks
it; the remediation removes all of them and adds regression tests so they
cannot silently return.

---

## 4. Post-fix verification matrix

| Check | Command | Result |
|---|---|---|
| Unit + security regressions | `npm run test:unit` | 11 files, 93 tests passed |
| Exploit probes | `npm run security:probe` | 10/10 probes passed |
| Dependency audit | `npm audit --audit-level=high` | 0 vulnerabilities |
| Policy contract | `npm run policy:check` | 0 issues |
| Mirror integrity | `npm run check:mirror-integrity` | 0 issues |
| E2E | `npm run test:e2e` | 16 tests passed (desktop + mobile) |
| Container headers | `curl -I` against `/` and `/_next/...js` | CSP/HSTS present on both |
| Container privilege | `docker inspect` | UID 101, read-only root, `cap_drop: ALL`, `no-new-privileges` |
| Method probe | `curl -X POST /` | `405` on Node/Nginx, `400` on Netlify (both fail closed) |
| Directory probe | `curl /images/` | `404` on Node, `403` on Nginx; process/container alive |
| Traversal probe | `curl '/..%2fpackage.json'` | `403` |
| CORS probe | `Origin: https://attacker.vercel.app` | no ACAO |
| Null origin | `Origin: null` | no ACAO |
| Netlify live E2E | `PREVIEW_URL=https://realfood-mirror-prod.netlify.app npm run test:e2e` | 16 tests passed |
| Netlify smoke | `PREVIEW_URL=... npm run smoke:deploy` | 8 checks, 0 failures |
| Netlify CSP sink | `POST /api/csp-report` | `204`; oversized `413`; wrong type `415`; `GET` `405` |
| Netlify fail-closed API | `GET /api/unknown` | `404` |
| Netlify image rewrite | `/cdn-cgi/image/.../images/intro/broccoli.webp` | `200 image/webp` |
| Netlify byte ranges | PDF + MP4 with `Range: bytes=0-1023` | `206` with correct `Content-Range` |

> The Docker checks require a running Docker daemon. If Docker is unavailable,
> the equivalent Nginx assertions are still enforced statically by
> `policy:check`, and the Node server suite covers the same semantic controls.

---

## 5. Residual risks

1. **`style-src 'unsafe-inline'`** — required by the captured Next.js build.
   Inline CSS cannot execute JavaScript; no script relaxation is accepted.
2. **HTTP inside the container** — TLS is terminated upstream. HSTS is emitted
   but only effective over HTTPS.
3. **Upstream content trust** — parity and review reduce, but do not eliminate,
   the risk of a malicious upstream change.
4. **Action pinning** — workflows use major-version tags. Dependabot updates
   them; SHA pinning is recommended for high-assurance forks.

---

## 6. Reproduction notes

Baseline probes were run on 2026-11-11 against the local server bound to
`127.0.0.1:4173`. Post-fix probes use the same server plus the unprivileged
container. Commands and expected outputs are embedded in the findings above and
in `README.md` §Verification. Test fixtures use a temporary directory so
traversal tests never depend on repository layout.
