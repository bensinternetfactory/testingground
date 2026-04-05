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

export interface RemediationRunner {
  adapter: RunnerAdapterName;
  run(input: RunnerExecutionInput): RunnerExecutionResult;
}
