#!/usr/bin/env node
/**
 * rewrite-html - Rewrites captured source HTML for offline mirror serving.
 *
 * - Rewrites first-party URLs to local asset paths using the manifest
 * - Strips third-party script/link references before runtime boot
 * - Injects a network guard with explicit blocked-request failure semantics
 * - Emits deterministic stub files used by local/offline runs
 */
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import config from "../../mirror.config.mjs";
import { validateManifest } from "./lib/schema.mjs";
import { createLogger, escapeRegex } from "./lib/utils.mjs";
import * as cheerio from "cheerio";

const log = createLogger("rewrite-html");

const SOURCE_HTML_PATH = new URL("../../artifacts/mirror/source-index.html", import.meta.url);
const MANIFEST_PATH = new URL("../../artifacts/mirror/snapshot-manifest.json", import.meta.url);
const OUTPUT_HTML_PATH = new URL("../../public/index.html", import.meta.url);
const STUB_PATH = new URL("../../public/stubs/noop-third-party.js", import.meta.url);
const NETWORK_GUARD_PATH = new URL("../../public/stubs/network-guard.js", import.meta.url);
const REWRITE_REPORT_PATH = new URL("../../artifacts/mirror/rewrite-report.json", import.meta.url);

const decodeNextImageUrl = (value) => {
  const parsed = new URL(value, "http://localhost");
  const encoded = parsed.searchParams.get("url");
  if (!encoded) return null;
  return decodeURIComponent(encoded);
};

const main = async () => {
  const startMs = Date.now();
  let html = await readFile(SOURCE_HTML_PATH, "utf8");
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  validateManifest(manifest);

  log.info("Loaded source HTML and manifest", {
    htmlLength: html.length,
    assetCount: manifest.assets.length,
  });

  const rewriteMap = new Map();
  for (const asset of manifest.assets) {
    rewriteMap.set(asset.sourceUrl, asset.localPath);
  }

  const $ = cheerio.load(html);
  let rewrites = 0;

  // Un-optimize Next.js image loader URLs in src/srcset attributes.
  $("img").each((index, element) => {
    const src = $(element).attr("src");
    if (src && src.includes("/_next/image?url=")) {
      try {
        const decoded = decodeNextImageUrl(src);
        if (decoded) {
          $(element).attr("src", decoded);
          rewrites += 1;
        }
      } catch (error) {
        log.warn("Failed to decode image src", {
          index,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const srcset = $(element).attr("srcset");
    if (srcset && srcset.includes("/_next/image?url=")) {
      const updatedSrcset = srcset
        .split(",")
        .map((entry) => {
          const [rawUrl, size] = entry.trim().split(" ");
          if (!rawUrl || !rawUrl.includes("/_next/image?url=")) return entry;
          try {
            const decoded = decodeNextImageUrl(rawUrl);
            return decoded ? `${decoded}${size ? ` ${size}` : ""}` : entry;
          } catch (error) {
            log.warn("Failed to decode image srcset entry", {
              index,
              error: error instanceof Error ? error.message : String(error),
            });
            return entry;
          }
        })
        .join(", ");

      $(element).attr("srcset", updatedSrcset);
      rewrites += 1;
    }
  });

  if (!$("script[data-mirror-network-guard='true']").length) {
    $("head").prepend('<script src="/stubs/network-guard.js" data-mirror-network-guard="true"></script>');
  }

  const blockedPatterns = config.blockedHosts.map((host) => host.replace(/\./g, "\\."));
  const blockedRegex = new RegExp(`https?://(?:${blockedPatterns.join("|")})`, "i");

  $("script[src]").each((_, element) => {
    const src = $(element).attr("src");
    if (src && blockedRegex.test(src)) {
      $(element).remove();
      rewrites += 1;
    }
  });

  $("link[href]").each((_, element) => {
    const href = $(element).attr("href");
    if (href && blockedRegex.test(href)) {
      $(element).remove();
      rewrites += 1;
    }
  });

  // Ensure IDs remain unique for deterministic navigation and testing.
  const seenIds = new Set();
  $("[id]").each((_, element) => {
    const id = $(element).attr("id");
    if (!id) return;
    if (seenIds.has(id)) {
      $(element).removeAttr("id");
      rewrites += 1;
      return;
    }
    seenIds.add(id);
  });

  // Remove stale animation transforms left behind when runtime JS is stripped.
  $("[style*='translateY']").each((_, element) => {
    const style = $(element).attr("style") || "";
    const cleaned = style
      .replace(/transform\s*:\s*translateY\([^)]*\)\s*;?/gi, "")
      .replace(/;\s*$/, "")
      .trim();
    if (cleaned) {
      $(element).attr("style", cleaned);
    } else {
      $(element).removeAttr("style");
    }
    rewrites += 1;
  });

  let nextHtml = $.html();
  if (rewriteMap.size > 0) {
    const pattern = new RegExp(
      Array.from(rewriteMap.keys())
        .sort((a, b) => b.length - a.length)
        .map((url) => escapeRegex(url))
        .join("|"),
      "g",
    );

    nextHtml = nextHtml.replace(pattern, (match) => {
      const replacement = rewriteMap.get(match);
      if (replacement) {
        rewrites += 1;
        return replacement;
      }
      return match;
    });
  }

  html = nextHtml;

  await mkdir(new URL("../../public/stubs/", import.meta.url), { recursive: true });

  await writeFile(
    STUB_PATH,
    "/* strict mirror third-party stub */\nwindow.__MIRROR_STUB__ = true;\n",
    "utf8",
  );

  const blockedHostsJson = JSON.stringify(config.blockedHosts);

  await writeFile(
    NETWORK_GUARD_PATH,
    `/* strict mirror network guard */
(function () {
  var BLOCKED = ${blockedHostsJson};

  function emitBlocked(reason, url, extra) {
    var detail = {
      reason: reason,
      url: url || "",
      extra: extra || {},
      timestamp: Date.now()
    };

    try {
      window.dispatchEvent(new CustomEvent("mirror-network-blocked", { detail: detail }));
    } catch (dispatchError) {
      console.warn("[mirror-network-guard] dispatch failed", dispatchError);
    }

    console.warn("[mirror-network-guard] blocked", detail);
  }

  function isBlockedHost(host) {
    return BLOCKED.some(function (blockedHost) {
      return host === blockedHost || host.endsWith("." + blockedHost);
    });
  }

  function toUrl(value) {
    if (!value) return null;
    try {
      return new URL(String(value), window.location.href);
    } catch (error) {
      emitBlocked("invalid-url", String(value), { message: error && error.message ? error.message : String(error) });
      return null;
    }
  }

  function isBlockedUrl(value) {
    var parsed = toUrl(value);
    return parsed ? isBlockedHost(parsed.hostname) : false;
  }

  function isBlockedNode(node) {
    if (!node || node.nodeType !== 1 || !node.tagName) return false;
    var tag = node.tagName.toLowerCase();
    if (tag === "script") {
      return isBlockedUrl(node.src || node.getAttribute("src"));
    }
    if (tag === "link") {
      return isBlockedUrl(node.href || node.getAttribute("href"));
    }
    if (tag === "img") {
      return isBlockedUrl(node.src || node.getAttribute("src"));
    }
    if (tag === "iframe") {
      return isBlockedUrl(node.src || node.getAttribute("src"));
    }
    return false;
  }

  var nativeFetch = window.fetch ? window.fetch.bind(window) : null;
  if (nativeFetch) {
    window.fetch = function (input, init) {
      var url =
        typeof input === "string"
          ? input
          : input && typeof input.url === "string"
            ? input.url
            : "";

      if (isBlockedUrl(url)) {
        emitBlocked("fetch", url);
        return Promise.reject(new Error("Blocked by mirror network guard: " + url));
      }

      return nativeFetch(input, init);
    };
  }

  if (navigator && typeof navigator.sendBeacon === "function") {
    var nativeBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      if (isBlockedUrl(url)) {
        emitBlocked("sendBeacon", url, { bytes: data && data.length ? data.length : 0 });
        return false;
      }
      return nativeBeacon(url, data);
    };
  }

  if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
    var xhrOpen = window.XMLHttpRequest.prototype.open;
    var xhrSend = window.XMLHttpRequest.prototype.send;

    window.XMLHttpRequest.prototype.open = function (method, url) {
      this.__mirrorBlocked = isBlockedUrl(url);
      this.__mirrorBlockedUrl = String(url || "");
      if (this.__mirrorBlocked) {
        emitBlocked("xhr-open", this.__mirrorBlockedUrl, { method: method });
        return;
      }
      return xhrOpen.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype.send = function () {
      if (this.__mirrorBlocked) {
        var self = this;
        queueMicrotask(function () {
          try {
            self.dispatchEvent(new Event("error"));
            self.dispatchEvent(new Event("loadend"));
          } catch (error) {
            console.warn("[mirror-network-guard] xhr event dispatch failed", error);
          }
          if (typeof self.onerror === "function") {
            try {
              self.onerror(new Event("error"));
            } catch (error) {
              console.warn("[mirror-network-guard] xhr onerror failed", error);
            }
          }
          if (typeof self.onloadend === "function") {
            try {
              self.onloadend(new Event("loadend"));
            } catch (error) {
              console.warn("[mirror-network-guard] xhr onloadend failed", error);
            }
          }
        });
        return;
      }
      return xhrSend.apply(this, arguments);
    };
  }

  if (window.Node && window.Node.prototype) {
    var appendChild = window.Node.prototype.appendChild;
    var insertBefore = window.Node.prototype.insertBefore;

    window.Node.prototype.appendChild = function (child) {
      if (isBlockedNode(child)) {
        emitBlocked("dom-append", child && child.src ? child.src : "");
        queueMicrotask(function () {
          if (child && typeof child.dispatchEvent === "function") {
            child.dispatchEvent(new Event("error"));
          }
        });
        return child;
      }
      return appendChild.call(this, child);
    };

    window.Node.prototype.insertBefore = function (child, ref) {
      if (isBlockedNode(child)) {
        emitBlocked("dom-insert", child && child.src ? child.src : "");
        queueMicrotask(function () {
          if (child && typeof child.dispatchEvent === "function") {
            child.dispatchEvent(new Event("error"));
          }
        });
        return child;
      }
      return insertBefore.call(this, child, ref);
    };
  }

  if (window.Element && window.Element.prototype) {
    var setAttribute = window.Element.prototype.setAttribute;
    window.Element.prototype.setAttribute = function (name, value) {
      var key = String(name).toLowerCase();
      if ((key === "src" || key === "href") && isBlockedUrl(value)) {
        emitBlocked("setAttribute", String(value));
        return;
      }
      return setAttribute.call(this, name, value);
    };
  }

  if (window.Worker) {
    var NativeWorker = window.Worker;
    window.Worker = function (url, options) {
      if (isBlockedUrl(url)) {
        emitBlocked("worker", String(url));
        throw new Error("Blocked by mirror network guard: " + url);
      }
      return new NativeWorker(url, options);
    };
    window.Worker.prototype = NativeWorker.prototype;
  }
})();
`,
    "utf8",
  );

  const tmpHtmlPath = new URL(OUTPUT_HTML_PATH.href + ".tmp");
  await writeFile(tmpHtmlPath, html, "utf8");
  await rename(tmpHtmlPath, OUTPUT_HTML_PATH);

  const report = {
    rewrittenAt: new Date().toISOString(),
    rewrittenUrlCount: rewrites,
    output: "/index.html",
  };

  const tmpReportPath = new URL(REWRITE_REPORT_PATH.href + ".tmp");
  await writeFile(tmpReportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await rename(tmpReportPath, REWRITE_REPORT_PATH);

  log.info("Rewrite complete", { rewrites });
  log.timing("rewrite-html", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});