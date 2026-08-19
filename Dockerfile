FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="realfood-mirror" \
      org.opencontainers.image.description="Air-gapped, zero-leakage offline mirror of realfood.gov" \
      org.opencontainers.image.authors="Md Saiful Islam"

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy full static mirror payload
COPY public/ /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
