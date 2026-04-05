#!/usr/bin/env node

const { runCli } = await import("./cli-core.ts");

process.exitCode = runCli(process.argv.slice(2));
