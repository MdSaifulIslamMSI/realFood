/**
 * @module config-schema - Invariant and schema validation for mirror.config.mjs.
 */

export const validateConfig = (config) => {
  if (!config || typeof config !== "object") {
    throw new TypeError("Configuration must be a non-null object");
  }

  if (!config.sourceOrigin || !config.sourceOrigin.startsWith("https://")) {
    throw new TypeError("config.sourceOrigin must be a valid https URL");
  }

  if (!config.cdnOrigin || !config.cdnOrigin.startsWith("https://")) {
    throw new TypeError("config.cdnOrigin must be a valid https URL");
  }

  if (!Array.isArray(config.blockedHosts) || config.blockedHosts.length === 0) {
    throw new TypeError("config.blockedHosts must be a non-empty array of hostnames");
  }

  if (!Array.isArray(config.firstPartyHosts) || config.firstPartyHosts.length === 0) {
    throw new TypeError("config.firstPartyHosts must be a non-empty array of hostnames");
  }

  if (!config.serve || typeof config.serve.port !== "number" || config.serve.port <= 0) {
    throw new TypeError("config.serve.port must be a positive integer");
  }

  if (!config.download || typeof config.download.concurrency !== "number" || config.download.concurrency <= 0) {
    throw new TypeError("config.download.concurrency must be a positive integer");
  }

  if (!config.parity || typeof config.parity.perShotThreshold !== "number") {
    throw new TypeError("config.parity.perShotThreshold must be a number");
  }

  return true;
};
