import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { runCliForTest } from "@/scripts/remediation/cli-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("remediation CLI", () => {
  it("lists the post-run workflow commands in help output", () => {
    const result = runCliForTest(["help"], repoRoot);

    expect(result.exitCode).toBe(0);
    expect(result.stdout.join("\n")).toContain("approve|reject|rollback");
    expect(result.stdout.join("\n")).toContain("--allow-stale");
  });

  it("validates the finance program and tolerates a missing bootstrap tracker", () => {
    const result = runCliForTest(["validate", "--program", "finance-pages", "--json"], repoRoot);

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toEqual([]);

    const payload = JSON.parse(result.stdout.join("\n"));

    expect(payload).toMatchObject({
      command: "validate",
      programId: "finance-pages",
      isValid: true,
      trackerFilePresent: false,
      currentWave: 1,
      nextUnitId: "FIN-metadata-001",
    });
    expect(payload.warnings).toContain(
      "Tracker file does not exist yet at plans/remidation/finance-pages-tracker.json; using an empty tracker.",
    );
  });

  it("prints the next eligible finance remediation unit", () => {
    const result = runCliForTest(["next", "--program", "finance-pages"], repoRoot);

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toEqual([]);
    expect(result.stdout.join("\n")).toContain("FIN-metadata-001: Move route metadata ownership back into financing page files");
    expect(result.stdout.join("\n")).toContain("Wave: 1");
  });

  it("renders the next-unit prompt text from the CLI", () => {
    const result = runCliForTest(["prompt", "--program", "finance-pages"], repoRoot);

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toEqual([]);
    expect(result.stdout.join("\n")).toContain("You are executing exactly one remediation unit.");
    expect(result.stdout.join("\n")).toContain("Unit: FIN-metadata-001 - Move route metadata ownership back into financing page files");
  });

  it("supports prompting a specific remediation unit for inspection", () => {
    const result = runCliForTest(
      ["prompt", "--program", "finance-pages", "--unit", "FIN-faq-unification", "--json"],
      repoRoot,
    );

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toEqual([]);

    const payload = JSON.parse(result.stdout.join("\n"));

    expect(payload.payload.unit.id).toBe("FIN-faq-unification");
    expect(payload.payload.unit.isComposite).toBe(true);
    expect(payload.payload.validation.requiresBrowserValidation).toBe(true);
  });
});
