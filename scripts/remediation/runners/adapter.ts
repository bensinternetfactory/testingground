import type {
  RemediationProgramDefinition,
  RemediationPromptPayload,
  RemediationUnit,
  RunnerAdapterName,
  RunnerExecutionResult,
} from "../types.ts";

export interface RunnerExecutionInput {
  cwd: string;
  definition: RemediationProgramDefinition;
  unit: RemediationUnit;
  payload: RemediationPromptPayload;
  runId: string;
  attemptNumber: number;
}

export interface RunnerCommandExecutionOptions {
  cwd: string;
  input: string;
  timeoutMs: number;
}

export interface RunnerCommandExecutionResult {
  command: string[];
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  errorMessage?: string;
}

export type RunnerCommandExecutor = (
  command: string,
  args: string[],
  options: RunnerCommandExecutionOptions,
) => RunnerCommandExecutionResult;

export interface RemediationRunner {
  adapter: RunnerAdapterName;
  run(input: RunnerExecutionInput): RunnerExecutionResult;
}
