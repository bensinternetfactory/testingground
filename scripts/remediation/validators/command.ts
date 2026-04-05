import { spawnSync } from "node:child_process";

export interface CommandExecutionResult {
  command: string[];
  exitCode: number;
  stdout: string;
  stderr: string;
}

export type CommandExecutor = (
  command: string,
  args: string[],
  cwd: string,
) => CommandExecutionResult;

export function defaultCommandExecutor(
  command: string,
  args: string[],
  cwd: string,
): CommandExecutionResult {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  return {
    command: [command, ...args],
    exitCode: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

export function getOutputExcerpt(
  result: Pick<CommandExecutionResult, "stdout" | "stderr">,
  maxLines = 6,
): string[] {
  const joined = [result.stdout, result.stderr]
    .filter(Boolean)
    .join("\n")
    .trim();

  if (!joined) {
    return [];
  }

  const lines = joined
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.slice(-maxLines);
}
