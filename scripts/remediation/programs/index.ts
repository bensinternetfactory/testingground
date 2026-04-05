import type { RemediationProgramDefinition } from "../types.ts";
import { financePagesProgram } from "./finance-pages.ts";

const remediationPrograms = new Map<string, RemediationProgramDefinition>([
  [financePagesProgram.program.programId, financePagesProgram],
]);

export function listRemediationProgramIds(): string[] {
  return [...remediationPrograms.keys()].sort();
}

export function getRemediationProgramDefinition(programId: string): RemediationProgramDefinition {
  const definition = remediationPrograms.get(programId);

  if (!definition) {
    throw new Error(
      `Unknown remediation program "${programId}". Available programs: ${listRemediationProgramIds().join(", ")}`,
    );
  }

  return definition;
}
