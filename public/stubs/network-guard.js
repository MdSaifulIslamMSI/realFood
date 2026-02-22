/* strict mirror network guard */
(function () {
  var BLOCKED = [
    "realfood.gov",
    "cdn.realfood.gov",
    "challenges.cloudflare.com",
    "static.cloudflareinsights.com",
    "us-assets.i.posthog.com",
    "us.i.posthog.com"
  ];

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

  if (navigator && typeof navigator.sendBeacon === "function") {
    var nativeBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      if (isBlockedUrl(url)) {
        return true;
      }
      return nativeBeacon(url, data);
    };
  }

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
            try {
              self.onerror(new Event("error"));
            } catch (_) {}
          }
          if (typeof self.onloadend === "function") {
            try {
              self.onloadend(new Event("loadend"));
            } catch (_) {}
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
})();
