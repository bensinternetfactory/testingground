import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import type {
  DevServerResolution,
  DevServerState,
  RemediationProgramDefinition,
  RemediationUnit,
} from "../types.ts";
import { ensureProgramArtifactRoot } from "./artifacts.ts";

const DEFAULT_PORT_CANDIDATES = [3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012];
const DEFAULT_SERVER_READY_TIMEOUT_MS = 30_000;
const DEFAULT_SERVER_POLL_INTERVAL_MS = 500;

export interface DevServerEnvironment {
  now?: Date;
  isProcessAlive?: (pid: number) => boolean;
  isPortAvailable?: (port: number) => boolean;
  isServerResponsive?: (url: string) => boolean;
  spawnDevServer?: (
    cwd: string,
    port: number,
    logPath: string,
  ) => { pid: number };
}

function defaultIsProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function runNodeProbeSync(script: string, value: string): boolean {
  try {
    const result = spawnSync(process.execPath, ["-e", script, value], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return result.status === 0 && result.stdout.trim() === "true";
  } catch {
    return false;
  }
}

function defaultIsPortAvailable(port: number): boolean {
  if (port === 3000) {
    return false;
  }

  return runNodeProbeSync(
    `
      const net = require("node:net");
      const port = Number(process.argv[1]);
      const server = net.createServer();
      server.once("error", () => {
        process.stdout.write("false");
        process.exit(0);
      });
      server.once("listening", () => {
        server.close(() => {
          process.stdout.write("true");
          process.exit(0);
        });
      });
      server.listen(port, "127.0.0.1");
    `,
    String(port),
  );
}

function defaultIsServerResponsive(url: string): boolean {
  return runNodeProbeSync(
    `
      const url = process.argv[1];
      const target = new URL(url);
      const transport = target.protocol === "https:" ? require("node:https") : require("node:http");
      const request = transport.request(target, { method: "GET", timeout: 2500 }, (response) => {
        process.stdout.write(String(response.statusCode && response.statusCode >= 200 && response.statusCode < 500));
        response.resume();
        response.on("end", () => process.exit(0));
      });
      request.on("timeout", () => {
        request.destroy(new Error("timeout"));
      });
      request.on("error", () => {
        process.stdout.write("false");
        process.exit(0);
      });
      request.end();
    `,
    url,
  );
}

function defaultSpawnDevServer(
  cwd: string,
  port: number,
  logPath: string,
): { pid: number } {
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  const logFd = fs.openSync(logPath, "a");
  const child = spawn("npm", ["run", "dev", "--", "--port", String(port)], {
    cwd,
    detached: true,
    stdio: ["ignore", logFd, logFd],
  });
  child.unref();
  fs.closeSync(logFd);

  if (!child.pid) {
    throw new Error(`Unable to start npm run dev on port ${port}.`);
  }

  return { pid: child.pid };
}

export function getDevServerStatePath(
  definition: RemediationProgramDefinition,
  cwd: string,
): string {
  return path.join(ensureProgramArtifactRoot(definition, cwd), "dev-server.json");
}

function readDevServerState(
  definition: RemediationProgramDefinition,
  cwd: string,
): DevServerState | undefined {
  const statePath = getDevServerStatePath(definition, cwd);

  if (!fs.existsSync(statePath)) {
    return undefined;
  }

  try {
    return JSON.parse(fs.readFileSync(statePath, "utf8")) as DevServerState;
  } catch {
    return undefined;
  }
}

function writeDevServerState(
  definition: RemediationProgramDefinition,
  cwd: string,
  state: DevServerState,
): string {
  const statePath = getDevServerStatePath(definition, cwd);
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
  return statePath;
}

function sleep(ms: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function waitForServer(
  url: string,
  environment: DevServerEnvironment,
): boolean {
  const startedAt = Date.now();
  const isServerResponsive = environment.isServerResponsive ?? defaultIsServerResponsive;

  while (Date.now() - startedAt < DEFAULT_SERVER_READY_TIMEOUT_MS) {
    if (isServerResponsive(url)) {
      return true;
    }

    sleep(DEFAULT_SERVER_POLL_INTERVAL_MS);
  }

  return false;
}

function findAvailablePort(
  environment: DevServerEnvironment,
): number | undefined {
  const isPortAvailable = environment.isPortAvailable ?? defaultIsPortAvailable;

  for (const port of DEFAULT_PORT_CANDIDATES) {
    if (isPortAvailable(port)) {
      return port;
    }
  }

  return undefined;
}

export function ensureDevServerForUnit(
  definition: RemediationProgramDefinition,
  cwd: string,
  unit: RemediationUnit,
  environment: DevServerEnvironment = {},
): DevServerResolution {
  if (!unit.requiresBrowserValidation) {
    return {
      status: "not-required",
      summary: "Dev server is not required for this remediation unit.",
    };
  }

  const isProcessAlive = environment.isProcessAlive ?? defaultIsProcessAlive;
  const statePath = getDevServerStatePath(definition, cwd);
  const existing = readDevServerState(definition, cwd);

  if (existing && existing.port !== 3000 && isProcessAlive(existing.pid)) {
    const responsive = (environment.isServerResponsive ?? defaultIsServerResponsive)(existing.url);

    if (responsive) {
      return {
        status: "reused",
        port: existing.port,
        pid: existing.pid,
        url: existing.url,
        logPath: existing.logPath,
        statePath,
        summary: `Reusing npm run dev on ${existing.url} (PID ${existing.pid}).`,
      };
    }
  }

  const port = findAvailablePort(environment);

  if (!port) {
    throw new Error("No open non-3000 port is available for npm run dev.");
  }

  const logPath = path.join(
    ensureProgramArtifactRoot(definition, cwd),
    "dev-server.log",
  );
  const { pid } = (environment.spawnDevServer ?? defaultSpawnDevServer)(cwd, port, logPath);
  const url = `http://127.0.0.1:${port}`;
  const ready = waitForServer(url, environment);

  if (!ready) {
    throw new Error(`npm run dev did not become ready at ${url} within ${DEFAULT_SERVER_READY_TIMEOUT_MS}ms.`);
  }

  writeDevServerState(definition, cwd, {
    port,
    pid,
    url,
    logPath,
    startedAt: (environment.now ?? new Date()).toISOString(),
  });

  return {
    status: "started",
    port,
    pid,
    url,
    logPath,
    statePath,
    summary: `Started npm run dev on ${url} (PID ${pid}).`,
  };
}
