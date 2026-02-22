/* strict mirror network guard */
(function () {
  var BLOCKED = ["realfood.gov","cdn.realfood.gov","challenges.cloudflare.com","static.cloudflareinsights.com","us-assets.i.posthog.com","us.i.posthog.com"];

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
