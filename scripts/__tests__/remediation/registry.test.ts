import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateProgramDefinition } from "@/scripts/remediation/harness/registry";
import { financePagesProgram } from "@/scripts/remediation/programs/finance-pages";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..", "..");

describe("finance remediation registry", () => {
  it("validates cleanly against the repo", () => {
    const result = validateProgramDefinition(financePagesProgram, repoRoot);

    expect(result.issues).toEqual([]);
  });

  it("models the FAQ composite as one remediation unit", () => {
    const compositeUnit = financePagesProgram.units.find(
      (unit) => unit.id === "FIN-faq-unification",
    );

    expect(compositeUnit).toBeDefined();
    expect(compositeUnit?.sourceRef.findingIds).toEqual([
      "FIN-config-003",
      "FIN-schema-016",
    ]);

    const standaloneFaqUnits = financePagesProgram.units.filter(
      (unit) =>
        unit.id === "FIN-config-003" || unit.id === "FIN-schema-016",
    );

    expect(standaloneFaqUnits).toEqual([]);
  });

  it("catches duplicate finding ownership across units", () => {
    const duplicateFindingProgram = {
      ...financePagesProgram,
      units: [
        ...financePagesProgram.units,
        {
          ...financePagesProgram.units[0],
          id: "FIN-duplicate-test",
          sourceRef: {
            ...financePagesProgram.units[0].sourceRef,
            findingIds: ["FIN-metadata-001"],
          },
          allowedFiles: ["plans/remidation/plan.md"],
        },
      ],
    };

    const result = validateProgramDefinition(duplicateFindingProgram, repoRoot);

    expect(result.issues).toContainEqual(
      expect.objectContaining({
        code: "duplicate-finding-link",
        unitId: "FIN-duplicate-test",
      }),
    );
  });

  it("rejects absolute or parent-relative paths in allowlists", () => {
    const invalidPathProgram = {
      ...financePagesProgram,
      units: [
        {
          ...financePagesProgram.units[0],
          allowedFiles: ["/tmp/outside.ts", "../outside.ts"],
        },
      ],
    };

    const result = validateProgramDefinition(invalidPathProgram, repoRoot);

    expect(result.issues).toContainEqual(
      expect.objectContaining({
        code: "invalid-path",
        unitId: "FIN-metadata-001",
        field: "allowedFiles",
      }),
    );
  });
});
