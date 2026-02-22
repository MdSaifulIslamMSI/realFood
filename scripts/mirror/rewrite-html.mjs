#!/usr/bin/env node
/**
 * rewrite-html – Rewrites the captured source HTML for offline mirror serving.
 *
 * - Replaces source URLs with local asset paths using the manifest
 * - Strips third-party script tags and preload links
 * - Injects a network guard that intercepts fetch/XHR/DOM injection/Workers
 * - Generates noop stub scripts
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import config from "../../mirror.config.mjs";
import { validateManifest } from "./lib/schema.mjs";
import { createLogger, replaceAllLiteral } from "./lib/utils.mjs";

const log = createLogger("rewrite-html");

const SOURCE_HTML_PATH = new URL("../../artifacts/mirror/source-index.html", import.meta.url);
const MANIFEST_PATH = new URL("../../artifacts/mirror/snapshot-manifest.json", import.meta.url);
const OUTPUT_HTML_PATH = new URL("../../public/index.html", import.meta.url);
const STUB_PATH = new URL("../../public/stubs/noop-third-party.js", import.meta.url);
const NETWORK_GUARD_PATH = new URL("../../public/stubs/network-guard.js", import.meta.url);
const REWRITE_REPORT_PATH = new URL("../../artifacts/mirror/rewrite-report.json", import.meta.url);

const main = async () => {
  const startMs = Date.now();
  let html = await readFile(SOURCE_HTML_PATH, "utf8");
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  validateManifest(manifest);

  log.info("Loaded source HTML and manifest", {
    htmlLength: html.length,
    assetCount: manifest.assets.length,
  });

  // Build rewrite map from manifest.
  const rewriteMap = new Map();
  for (const asset of manifest.assets) {
    rewriteMap.set(asset.sourceUrl, asset.localPath);
  }

  // Rewrite all source URLs to local paths.
  let rewrites = 0;
  for (const [sourceUrl, localPath] of rewriteMap.entries()) {
    const nextHtml = replaceAllLiteral(html, sourceUrl, localPath);
    if (nextHtml !== html) {
      rewrites += 1;
      html = nextHtml;
    }
  }


  // Rewrite Next.js optimized image URLs to direct static paths to prevent Vercel 404s
  html = html.replace(/\/_next\/image\?url=([^&"'\s]+)[^"'\s]*/gi, (match, url) => {
    return decodeURIComponent(url);
  });

  // Install network guard before app scripts execute.
  if (!html.includes("data-mirror-network-guard")) {
    html = html.replace(
      "<head>",
      '<head><script src="/stubs/network-guard.js" data-mirror-network-guard="true"></script>',
    );
  }

  // Write stub scripts.
  await mkdir(new URL("../../public/stubs/", import.meta.url), { recursive: true });

  await writeFile(
    STUB_PATH,
    "/* strict mirror third-party stub */\nwindow.__MIRROR_STUB__ = true;\n",
    "utf8",
  );

  // Build the blocked hosts array from config for the network guard.
  const blockedHostsJson = JSON.stringify(config.blockedHosts);

  await writeFile(
    NETWORK_GUARD_PATH,
    `/* strict mirror network guard */
(function () {
  var BLOCKED = ${blockedHostsJson};

  function isBlockedHost(host) {
    return BLOCKED.some(function (blockedHost) {
      return host === blockedHost || host.endsWith("." + blockedHost);
    });
  }

  function toUrl(value) {
    if (!value) return null;
    try {
      return new URL(String(value), window.location.href);
    } catch (_) {
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

  /* --- fetch interception --- */
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
        return Promise.resolve(
          new Response("{}", {
            status: 200,
            statusText: "OK",
            headers: { "content-type": "application/json; charset=utf-8" },
          }),
        );
      }

      return nativeFetch(input, init);
    };
  }

  /* --- sendBeacon interception --- */
  if (navigator && typeof navigator.sendBeacon === "function") {
    var nativeBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      if (isBlockedUrl(url)) {
        return true;
      }
      return nativeBeacon(url, data);
    };
  }

  /* --- XHR interception --- */
  if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
    var xhrOpen = window.XMLHttpRequest.prototype.open;
    var xhrSend = window.XMLHttpRequest.prototype.send;

    window.XMLHttpRequest.prototype.open = function (method, url) {
      this.__mirrorBlocked = isBlockedUrl(url);
      if (this.__mirrorBlocked) {
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
          } catch (_) {}
          if (typeof self.onerror === "function") {
            try { self.onerror(new Event("error")); } catch (_) {}
          }
          if (typeof self.onloadend === "function") {
            try { self.onloadend(new Event("loadend")); } catch (_) {}
          }
        });
        return;
      }
      return xhrSend.apply(this, arguments);
    };
  }

  /* --- DOM injection interception --- */
  if (window.Node && window.Node.prototype) {
    var appendChild = window.Node.prototype.appendChild;
    var insertBefore = window.Node.prototype.insertBefore;

    window.Node.prototype.appendChild = function (child) {
      if (isBlockedNode(child)) {
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

  /* --- setAttribute interception --- */
  if (window.Element && window.Element.prototype) {
    var setAttribute = window.Element.prototype.setAttribute;
    window.Element.prototype.setAttribute = function (name, value) {
      var key = String(name).toLowerCase();
      if ((key === "src" || key === "href") && isBlockedUrl(value)) {
        return;
      }
      return setAttribute.call(this, name, value);
    };
  }

  /* --- Worker interception --- */
  if (window.Worker) {
    var NativeWorker = window.Worker;
    window.Worker = function (url, options) {
      if (isBlockedUrl(url)) {
        return { postMessage: function(){}, terminate: function(){}, addEventListener: function(){}, removeEventListener: function(){} };
      }
      return new NativeWorker(url, options);
    };
    window.Worker.prototype = NativeWorker.prototype;
  }

  /* --- dynamic import() interception via import map is not possible, so we block via fetch --- */
})();
`,
    "utf8",
  );

  await writeFile(OUTPUT_HTML_PATH, html, "utf8");

  const report = {
    rewrittenAt: new Date().toISOString(),
    rewrittenUrlCount: rewrites,
    output: "/index.html",
  };
  await writeFile(REWRITE_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  log.info("Rewrite complete", { rewrites });
  log.timing("rewrite-html", startMs);
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
