import fs from "node:fs";
import path from "node:path";
import type { RemediationProgramDefinition, RemediationRuntimeResult } from "../types.ts";

const RUNTIME_SECTION_HEADING = "## Remediation Runtime";

export interface RuntimeStatusUpdate {
  runId: string;
  unitId: string;
  title: string;
  runner: string;
  attemptNumber: number;
  finalState: RemediationRuntimeResult["finalState"];
  nextUnit?: string;
  artifactPaths: string[];
  updatedAt: string;
}

function ensureParentDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function renderRuntimeSection(update: RuntimeStatusUpdate): string {
  return [
    RUNTIME_SECTION_HEADING,
    "",
    `- Last run ID: ${update.runId}`,
    `- Unit: ${update.unitId}`,
    `- Title: ${update.title}`,
    `- Runner: ${update.runner}`,
    `- Attempt number: ${update.attemptNumber}`,
    `- Final state: ${update.finalState}`,
    `- Next eligible unit: ${update.nextUnit ?? "none"}`,
    `- Artifact paths: ${update.artifactPaths.length > 0 ? update.artifactPaths.join(", ") : "none"}`,
    `- Updated at: ${update.updatedAt}`,
    "",
  ].join("\n");
}

export function writeRuntimeStatusSection(
  definition: RemediationProgramDefinition,
  cwd: string,
  update: RuntimeStatusUpdate,
): string {
  const statusPath = path.resolve(cwd, definition.program.statusPath);
  ensureParentDir(statusPath);

  const existing = fs.existsSync(statusPath) ? fs.readFileSync(statusPath, "utf8").trimEnd() : "";
  const renderedSection = renderRuntimeSection(update);
  const nextContents = existing.includes(RUNTIME_SECTION_HEADING)
    ? existing.replace(new RegExp(`${RUNTIME_SECTION_HEADING}[\\s\\S]*$`), renderedSection.trimEnd())
    : `${existing}${existing ? "\n\n" : ""}${renderedSection}`.trimEnd();

  fs.writeFileSync(statusPath, `${nextContents}\n`);
  return statusPath;
}
