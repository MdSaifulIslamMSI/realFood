# Security Policy

## Supported versions

`realfood-mirror` is deployed as a continuously verified snapshot. Security
fixes land on `main`; there are no long-lived release branches. Run the latest
commit.

## Reporting a vulnerability

Do **not** open a public issue for a vulnerability.

- Use GitHub's private vulnerability reporting:
  `https://github.com/MdSaifulIslamMSI/realFood/security/advisories/new`
- Include the affected route/component, a minimal reproduction, and the impact.
- Expect an acknowledgement within 72 hours and a remediation plan within 7 days.

Please do not test against production with destructive payloads, do not access
other users' data, and do not run automated scanners that degrade availability.
The local mirror (`npm run serve`) is the preferred target for research.

## Security model

This repository is a **static mirror** of `realfood.gov` plus a small set of
Vercel functions. It has no authentication, no database, no file uploads, and
no user-generated content. The security goals are therefore narrower than a
typical application:

| Goal | Control |
|---|---|
| No third-party network egress from the mirror | Runtime network guard, sanitized bundles, zero-egress E2E and network-gate tests |
| Upstream tampering cannot reach production unreviewed | Daily sync opens a PR; it cannot push to `main`; CI and parity gates must pass first |
| Script injection is constrained | Hash/nonce-based CSP, no `unsafe-eval`, no `unsafe-inline` in `script-src` |
| Cross-origin abuse of stubs is prevented | Exact origin allowlist, no wildcard, no `null` grant, no credentials |
| Path traversal / file disclosure is prevented | Canonical containment checks in Node and Nginx; dotfiles and source maps denied |
| Container compromise is limited | Unprivileged Nginx, read-only root filesystem, all capabilities dropped, `no-new-privileges` |
| Dependency compromise is detected | `npm audit`, Dependabot, lockfile, review-gated upstream sync |

### Trust boundaries

1. **Upstream `realfood.gov`** — untrusted input. Its HTML and assets are
   captured but sanitized before they are published.
2. **Build pipeline and CI** — trusted to run the canonical policy generators
   and gates. Pull requests do not receive write permissions or secrets.
3. **Vercel** — production serving path and source of truth for headers.
4. **Docker/Nginx** — air-gapped delivery path. It must ship byte-identical
   security headers, generated from `security/policy.mjs`.
5. **Browser** — the network guard is defense in depth, not the only control.
   CSP and sanitized bundles are the primary controls.

## Accepted residual risks

- `style-src` allows `'unsafe-inline'` because the mirrored Next.js build emits
  element-level `style` attributes. Inline styles cannot execute JavaScript.
  This is the only `unsafe-*` token in the deployed policy.
- The Docker image serves plain HTTP by design. Run it behind a TLS terminator;
  HSTS is emitted but only honoured over HTTPS.
- `realfood.gov` content is captured from a third party. The review-gated sync
  plus byte/DOM/visual/network parity checks reduce, but cannot eliminate, the
  risk of upstream content changing maliciously between capture and review.
- GitHub Actions are referenced by major version tags. Dependabot keeps them
  current; pinning to commit SHAs is recommended for a higher-assurance fork.

## Security-relevant commands

```bash
npm ci
npm run policy:check
npm run check:mirror-integrity
npm run test:unit
npm run test:e2e
npm audit --audit-level=high
docker build -t realfood-mirror .
docker compose up -d
```

The full audit that produced the current controls is recorded in
[`docs/security-audit-2026-11-11.md`](docs/security-audit-2026-11-11.md).
