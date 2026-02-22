/** @module mirror.config – Single source of truth for all mirror pipeline settings. */

const config = {
    /** Origin of the website being mirrored. */
    sourceOrigin: "https://realfood.gov",

    /** CDN origin serving downloadable documents for the source site. */
    cdnOrigin: "https://cdn.realfood.gov",

    /** Hosts whose requests must be blocked at runtime in the mirror. */
    blockedHosts: [
        "realfood.gov",
        "cdn.realfood.gov",
        "challenges.cloudflare.com",
        "static.cloudflareinsights.com",
        "us-assets.i.posthog.com",
        "us.i.posthog.com",
    ],

    /** First-party hostnames considered part of the source site. */
    firstPartyHosts: ["realfood.gov", "cdn.realfood.gov"],

    /** Section IDs expected in the mirrored page (used by tests & capture). */
    sectionIds: ["problem", "solution", "pyramid", "answers", "winning", "faqs", "footer"],

    /** Extended section list used during runtime capture (includes non-nav sections). */
    captureSectionIds: ["problem", "solution", "pyramid", "resources", "answers", "winning", "faqs", "footer"],

    /** URLs that must be manually included in the manifest (not auto-discovered). */
    manualUrls: [
        "https://realfood.gov/video/Real_Food_by_Mike_Tyson.mp4",
        "https://realfood.gov/video/bgv.mp4",
        "https://realfood.gov/transcript.vtt",
        "https://realfood.gov/images/video-placeholder.webp",
        "https://realfood.gov/images/intro/broccoli.webp",
        "https://realfood.gov/images/intro/steak.webp",
        "https://realfood.gov/images/pyramid/almond.webp",
        "https://realfood.gov/images/pyramid/apples.webp",
        "https://realfood.gov/images/pyramid/avocado.webp",
        "https://realfood.gov/images/pyramid/bananas.webp",
        "https://realfood.gov/images/pyramid/blueberries.webp",
        "https://realfood.gov/images/pyramid/blueberry.webp",
        "https://realfood.gov/images/pyramid/bowl-oats.webp",
        "https://realfood.gov/images/pyramid/bowl-rice-beans.webp",
        "https://realfood.gov/images/pyramid/bread.webp",
        "https://realfood.gov/images/pyramid/broccoli.webp",
        "https://realfood.gov/images/pyramid/butter.webp",
        "https://realfood.gov/images/pyramid/butternut.webp",
        "https://realfood.gov/images/pyramid/canned-tuna.webp",
        "https://realfood.gov/images/pyramid/carrots.webp",
        "https://realfood.gov/images/pyramid/cheese.webp",
        "https://realfood.gov/images/pyramid/chicken.webp",
        "https://realfood.gov/images/pyramid/cut-apple.webp",
        "https://realfood.gov/images/pyramid/eggs.webp",
        "https://realfood.gov/images/pyramid/frozen-peas.webp",
        "https://realfood.gov/images/pyramid/grapes.webp",
        "https://realfood.gov/images/pyramid/green-beans.webp",
        "https://realfood.gov/images/pyramid/ground-beef.webp",
        "https://realfood.gov/images/pyramid/lettuce.webp",
        "https://realfood.gov/images/pyramid/milk.webp",
        "https://realfood.gov/images/pyramid/oats.webp",
        "https://realfood.gov/images/pyramid/olive-oil.webp",
        "https://realfood.gov/images/pyramid/oranges.webp",
        "https://realfood.gov/images/pyramid/peanuts.webp",
        "https://realfood.gov/images/pyramid/potato.webp",
        "https://realfood.gov/images/pyramid/salmon.webp",
        "https://realfood.gov/images/pyramid/shrimp.webp",
        "https://realfood.gov/images/pyramid/steak.webp",
        "https://realfood.gov/images/pyramid/strawberry.webp",
        "https://realfood.gov/images/pyramid/strawberry-right.webp",
        "https://realfood.gov/images/pyramid/tomatoes.webp",
        "https://realfood.gov/images/pyramid/walnut-kernel.webp",
        "https://realfood.gov/images/pyramid/walnut-shelled.webp",
        "https://realfood.gov/images/pyramid/yogurt.webp",
        "https://realfood.gov/android-chrome-192x192.png",
        "https://realfood.gov/images/broken-system/food-pyramid.webp",
        "https://realfood.gov/images/covers/1.webp",
        "https://realfood.gov/images/covers/2.webp",
        "https://realfood.gov/images/covers/3.webp",
        "https://realfood.gov/images/covers/4.webp",
        "https://cdn.realfood.gov/DGA.pdf",
        "https://cdn.realfood.gov/Daily%20Serving%20Sizes.pdf",
        "https://cdn.realfood.gov/Scientific%20Report_508.pdf",
        "https://cdn.realfood.gov/Scientific%20Report%20Appendices_FINAL_1.28.26.pdf",
    ],

    /** Third-party URL patterns to strip from HTML and JS bundles. */
    thirdPartyPatterns: [
        /https:\/\/challenges\.cloudflare\.com[^"']*/gi,
        /https:\/\/static\.cloudflareinsights\.com[^"']*/gi,
        /https:\/\/us-assets\.i\.posthog\.com[^"']*/gi,
        /https:\/\/us\.i\.posthog\.com[^"']*/gi,
    ],

    /** Replacement pairs for sanitizing third-party references in JS/CSS bundles. */
    sanitizeReplacements: [
        ["https://us-assets.i.posthog.com", "/stubs/noop-third-party.js?"],
        ["https://us.i.posthog.com", "/stubs/noop-third-party.js?"],
        ["https://challenges.cloudflare.com", "/stubs/noop-third-party.js?"],
        ["https://static.cloudflareinsights.com", "/stubs/noop-third-party.js?"],
        ["https:\\/\\/us-assets.i.posthog.com", "\\/stubs\\/noop-third-party.js?"],
        ["https:\\/\\/us.i.posthog.com", "\\/stubs\\/noop-third-party.js?"],
        ["https:\\/\\/challenges.cloudflare.com", "\\/stubs\\/noop-third-party.js?"],
        ["https:\\/\\/static.cloudflareinsights.com", "\\/stubs\\/noop-third-party.js?"],
    ],

    /** Mirror server settings. */
    serve: {
        port: 4173,
        host: "127.0.0.1",
        /** Maximum requests per IP per window before rate limiting kicks in. */
        rateLimit: { windowMs: 60_000, maxRequests: 300 },
    },

    /** Asset download settings. */
    download: {
        concurrency: 6,
        retryAttempts: 4,
        retryDelayMs: 800,
        fetchTimeoutMs: 30_000,
    },

    /** Visual parity comparison thresholds. */
    parity: {
        perShotThreshold: 0.25,
        avgThreshold: 0.1,
        pixelmatchThreshold: 0.12,
    },

    /** Path prefixes considered valid for first-party asset mirroring. */
    allowedAssetPrefixes: [
        "/_next/static/chunks/",
        "/_next/static/css/",
        "/_next/static/media/",
        "/images/",
        "/video/",
        "/transcript",
        "/font/",
        "/favicon",
        "/apple-touch-icon",
        "/android-chrome",
        "/browserconfig",
        "/manifest",
        "/opengraph-image",
        "/twitter-image",
        "/seo/",
        "/cdn-cgi/image/",
    ],

    /** MIME type mappings for the static file server. */
    mimeTypes: {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".mjs": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json",
        ".xml": "application/xml",
        ".txt": "text/plain; charset=utf-8",
        ".ico": "image/x-icon",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".mp4": "video/mp4",
        ".vtt": "text/vtt",
        ".pdf": "application/pdf",
    },
};

export default config;
