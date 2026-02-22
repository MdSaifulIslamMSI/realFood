/**
 * @module utils – Shared utility functions for the mirror pipeline.
 * Consolidated from duplicate implementations across scripts.
 */

import { createHash } from "node:crypto";
import config from "../../../mirror.config.mjs";

/**
 * Deduplicate an array, removing falsy values.
 * @param {Array} values
 * @returns {Array}
 */
export const unique = (values) => [...new Set(values)].filter(Boolean);

/**
 * Compute SHA-256 hex digest of a string or Buffer.
 * @param {string | Buffer} value
 * @returns {string}
 */
export const sha256 = (value) => createHash("sha256").update(value).digest("hex");

/**
 * Promise-based delay.
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Escape a string for use in a RegExp literal.
 * @param {string} value
 * @returns {string}
 */
export const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Replace all literal occurrences of `from` in `text` with `to`.
 * @param {string} text
 * @param {string} from
 * @param {string} to
 * @returns {string}
 */
export const replaceAllLiteral = (text, from, to) =>
    text.replace(new RegExp(escapeRegex(from), "g"), to);

/**
 * Check whether a hostname is a first-party origin.
 * @param {string} hostname
 * @returns {boolean}
 */
export const isFirstPartyHost = (hostname) =>
    config.firstPartyHosts.includes(hostname);

/**
 * Check whether a pathname is allowed for asset mirroring.
 * @param {string} pathname
 * @returns {boolean}
 */
export const isAllowedAssetPath = (pathname) => {
    if (pathname === "/") return false;
    return config.allowedAssetPrefixes.some((prefix) => pathname.startsWith(prefix));
};

/**
 * Expand a composite attribute value (e.g. srcset) into individual URLs.
 * @param {string | undefined | null} value
 * @returns {string[]}
 */
export const expandComposite = (value) => {
    if (!value) return [];
    const trimmed = value.trim().replace(/^['"]|['"]$/g, "").replace(/[\\\s]+$/g, "");
    if (!trimmed) return [];

    const looksLikeSrcset =
        trimmed.includes(",") &&
        (/\s\d+(?:\.\d+)?[wx](?:,|$)/.test(trimmed) || /,\s*(?:\/|https?:)/.test(trimmed));

    const chunks = looksLikeSrcset ? trimmed.split(/,(?=\s*(?:\/|https?:))/) : [trimmed];

    return chunks
        .map((chunk) => chunk.trim().split(/\s+/)[0])
        .map((chunk) => chunk.replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
};

/**
 * Convert a relative or protocol-relative URL to absolute using the source origin.
 * @param {string} value
 * @returns {string}
 */
export const toAbsoluteUrl = (value) => {
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    if (value.startsWith("//")) return `https:${value}`;
    if (value.startsWith("/")) return `${config.sourceOrigin}${value}`;
    return new URL(value, `${config.sourceOrigin}/`).toString();
};

/**
 * Sanitize a URL query string into a filesystem-safe suffix.
 * @param {string} search
 * @returns {string}
 */
export const sanitizeQuery = (search) =>
    search
        .replace(/^\?/, "")
        .replace(/[^a-zA-Z0-9._-]+/g, "_")
        .replace(/^_+|_+$/g, "");

/**
 * Normalize a source URL: validate it's first-party, check allowed paths, and return canonical form.
 * Returns empty string for rejected URLs.
 * @param {string} value
 * @returns {string}
 */
export const normalizeUrl = (value) => {
    try {
        const parsed = new URL(value);
        if (!isFirstPartyHost(parsed.hostname)) return "";

        if (parsed.hostname === "realfood.gov") {
            if (!isAllowedAssetPath(parsed.pathname)) return "";
            if (parsed.pathname.startsWith("/cdn-cgi/rum")) return "";
        }

        if (parsed.hostname === "cdn.realfood.gov") {
            if (!parsed.pathname.toLowerCase().endsWith(".pdf")) return "";
        }

        return parsed.toString();
    } catch {
        return "";
    }
};

/**
 * Compute the local filesystem path for a mirrored realfood.gov asset.
 * @param {string} url
 * @returns {string}
 */
export const realfoodLocalPath = (url) => {
    const { pathname, search } = new URL(url);
    if (!search) return pathname;

    const suffix = sanitizeQuery(search);
    const extIndex = pathname.lastIndexOf(".");
    if (extIndex > pathname.lastIndexOf("/")) {
        return `${pathname.slice(0, extIndex)}__q_${suffix}${pathname.slice(extIndex)}`;
    }
    return `${pathname}__q_${suffix}`;
};

/**
 * Compute the local filesystem path for a mirrored CDN asset.
 * @param {string} url
 * @returns {string}
 */
export const cdnLocalPath = (url) => {
    const parsed = new URL(url);
    return `/assets/mirror/cdn.realfood.gov${parsed.pathname}`;
};

/**
 * Fetch a URL with retry and timeout support.
 * @param {string} url
 * @param {object} [options]
 * @param {number} [options.attempts]
 * @param {number} [options.delayMs]
 * @param {number} [options.timeoutMs]
 * @param {string} [options.userAgent]
 * @returns {Promise<{ok: boolean, status: number, buffer: Buffer}>}
 */
export const fetchWithRetry = async (url, options = {}) => {
    const {
        attempts = config.download.retryAttempts,
        delayMs = config.download.retryDelayMs,
        timeoutMs = config.download.fetchTimeoutMs,
        userAgent = "strict-mirror/1.0",
    } = options;

    let lastError = null;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: { "user-agent": userAgent },
            });

            clearTimeout(timeout);

            if (!response.ok) {
                if (response.status >= 500 && attempt < attempts) {
                    await delay(delayMs * attempt);
                    continue;
                }
                return { ok: false, status: response.status, buffer: Buffer.alloc(0) };
            }

            const buffer = Buffer.from(await response.arrayBuffer());
            return { ok: true, status: response.status, buffer };
        } catch (error) {
            clearTimeout(timeout);
            lastError = error;
            if (attempt >= attempts) break;
            await delay(delayMs * attempt);
        }
    }

    throw lastError ?? new Error(`Failed to fetch ${url} after ${attempts} attempts`);
};

/**
 * Structured JSON logger for pipeline observability.
 * @param {string} scriptName - Identifier for the calling script.
 * @returns {{ info: Function, warn: Function, error: Function, timing: Function }}
 */
export const createLogger = (scriptName) => {
    const emit = (level, message, data = {}) => {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            script: scriptName,
            message,
            ...data,
        };
        const output = level === "error" ? process.stderr : process.stdout;
        output.write(`${JSON.stringify(entry)}\n`);
    };

    return {
        info: (message, data) => emit("info", message, data),
        warn: (message, data) => emit("warn", message, data),
        error: (message, data) => emit("error", message, data),
        timing: (label, startMs) =>
            emit("info", `${label} completed`, { durationMs: Date.now() - startMs }),
    };
};
