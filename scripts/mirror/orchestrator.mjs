#!/usr/bin/env node
/**
 * orchestrator - Programmatic execution harness for the mirror pipeline.
 * Runs all pipeline stages in sequence with timing metrics and error handling.
 */
import { spawn } from "node:child_process";
import { createLogger } from "./lib/utils.mjs";
import { validateConfig } from "./lib/config-schema.mjs";
import config from "../../mirror.config.mjs";

const log = createLogger("orchestrator");

export const STAGES = [
  { name: "capture:html", script: "scripts/mirror/capture-html.mjs" },
  { name: "capture:runtime", script: "scripts/mirror/capture-runtime-graph.mjs" },
  { name: "extract:refs", script: "scripts/mirror/extract-static-refs.mjs" },
  { name: "build:manifest", script: "scripts/mirror/build-manifest.mjs" },
  { name: "build:download", script: "scripts/mirror/download-assets.mjs" },
  { name: "build:sanitize", script: "scripts/mirror/sanitize-third-party.mjs" },
  { name: "verify:sanity", script: "scripts/mirror/verify-sanity.mjs" },
  { name: "build:rewrite", script: "scripts/mirror/rewrite-html.mjs" },
  { name: "update:csp", script: "scripts/mirror/update-production-csp.mjs" },
];

const runStage = (stage) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [stage.script], {
      stdio: "inherit",
      env: process.env,
    });

    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Stage ${stage.name} failed with exit code ${code}`));
    });
  });

export const runPipeline = async (options = {}) => {
  const startMs = Date.now();
  validateConfig(config);

  const filter = options.stage ? new Set([options.stage]) : null;
  const stagesToRun = filter ? STAGES.filter((s) => filter.has(s.name)) : STAGES;

  log.info("Starting mirror pipeline", { stageCount: stagesToRun.length });

  const metrics = [];
  for (const stage of stagesToRun) {
    const stageStart = Date.now();
    log.info(`Running stage: ${stage.name}`);
    await runStage(stage);
    metrics.push({ stage: stage.name, durationMs: Date.now() - stageStart });
  }

  log.info("Pipeline completed successfully", {
    totalDurationMs: Date.now() - startMs,
    stages: metrics,
  });

  return { success: true, durationMs: Date.now() - startMs, metrics };
};

if (process.argv[1] && process.argv[1].endsWith("orchestrator.mjs")) {
  runPipeline().catch((err) => {
    log.error("Pipeline failed", { error: err.message });
    process.exit(1);
  });
}
