#!/usr/bin/env node
/**
 * verify-all – Orchestrates all verification gates in sequence.
 * Starts the mirror server, then runs byte parity, DOM parity, network gate, and visual parity.
 */
import { spawn } from "node:child_process";
import config from "../../mirror.config.mjs";
import { createLogger, delay } from "./lib/utils.mjs";

const log = createLogger("verify-all");

const PORT = config.serve.port;
const CLONE_URL = `http://${config.serve.host}:${PORT}/`;

const runNode = (scriptPath, env = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], {
      stdio: "inherit",
      env: { ...process.env, ...env },
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${scriptPath} exited with code ${code}`));
      }
    });
  });

const waitForServer = async (url, timeoutMs = 45000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) return;
    } catch {
      // Retry until timeout.
    }

    await delay(750);
  }

  throw new Error(`Mirror server was not ready within ${timeoutMs}ms`);
};

const main = async () => {
  const startMs = Date.now();

  const server = spawn(
    process.execPath,
    ["scripts/mirror/serve-mirror.mjs", "--port", String(PORT)],
    { stdio: "inherit", env: process.env },
  );

  try {
    await waitForServer(CLONE_URL);
    log.info("Mirror server ready", { url: CLONE_URL });

    await runNode("scripts/mirror/verify-byte-parity.mjs");
    await runNode("scripts/mirror/verify-dom-parity.mjs");
    await runNode("scripts/mirror/verify-network-gate.mjs", { CLONE_URL });

    await runNode("scripts/capture-parity.mjs", { CLONE_URL });
    await runNode("scripts/compare-parity.mjs");

    log.info("All verification gates passed");
    log.timing("verify-all", startMs);
  } finally {
    server.kill("SIGTERM");
  }
};

main().catch((error) => {
  log.error("Fatal error", { error: error.message });
  process.exit(1);
});
