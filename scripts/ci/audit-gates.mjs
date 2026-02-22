#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";

const gates = [
  { name: "typecheck", args: ["run", "typecheck"] },
  { name: "unit-tests", args: ["run", "test:unit"] },
  { name: "policy-check", args: ["run", "policy:check"] },
  { name: "tracked-generated-check", args: ["run", "check:tracked-generated"] },
  { name: "dependency-audit", args: ["run", "audit:deps"] },
];

const report = {
  startedAt: new Date().toISOString(),
  passed: true,
  gates: [],
};

for (const gate of gates) {
  const start = Date.now();
  const result = spawnSync(`${npmBin} ${gate.args.join(" ")}`, {
    shell: true,
    stdio: "inherit",
    env: process.env,
  });

  const entry = {
    gate: gate.name,
    exitCode: result.status ?? 1,
    durationMs: Date.now() - start,
  };
  report.gates.push(entry);

  if (entry.exitCode !== 0) {
    report.passed = false;
  }
}

report.finishedAt = new Date().toISOString();
await mkdir(new URL("../../artifacts/ci/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../../artifacts/ci/audit-report.json", import.meta.url),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (!report.passed) {
  process.exit(1);
}
