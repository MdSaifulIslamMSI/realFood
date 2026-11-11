FROM nginxinc/nginx-unprivileged:1.27-alpine

LABEL org.opencontainers.image.title="realfood-mirror" \
      org.opencontainers.image.description="Air-gapped, zero-leakage offline mirror of realfood.gov" \
      org.opencontainers.image.authors="Md Saiful Islam"

# Security headers are generated from security/policy.mjs by
# scripts/mirror/update-production-csp.mjs and must match vercel.json exactly.
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy full static mirror payload.
COPY public/ /usr/share/nginx/html/

EXPOSE 8080

# The base image already defaults to uid/gid 101 (nginx). Declare it explicitly
# so the container can never be started as root by a compose override.
USER 101

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
