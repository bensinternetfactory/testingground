import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

export const TODO_PATH = path.join(repoRoot, "plans", "todo.md");
export const STATUS_PATH = path.join(repoRoot, "plans", "reviews", "financing-status.md");
export const LEDGER_PATH = path.join(repoRoot, "plans", "reviews", "financing-findings-ledger.md");

const STATUS_KEYS = [
  "Current phase",
  "Current target substep",
  "Last completed substep",
  "Next substep",
  "Pass status",
  "Current output artifact",
  "Ledger updated",
  "Notes",
];

const STATUS_VALUES = new Set(["not-started", "in-progress", "completed", "blocked", "invalid"]);

// ── Control files every pass must read ───────────────────────────────────────

export const CONTROL_FILES = [
  "plans/reviews/financing-status.md",
  "plans/reviews/financing-review-rubric.md",
  "plans/reviews/financing-review-scope.md",
  "plans/reviews/financing-findings-ledger.md",
];

// ── Per-step metadata not derivable from todo.md prose ───────────────────────

const DEFAULT_META = {
  browserValidation: false,
  skills: [],
  claudeMdHints: [],
};

const ALL_AUDIT_SKILLS = [
  "vercel-composition-patterns",
  "vercel-react-best-practices",
  "next-best-practices",
];

const STEP_META = new Map([
  ["Step 1", {
    browserValidation: false,
    skills: [],
    claudeMdHints: [],
  }],
  ["Step 2a", {
    browserValidation: false,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["app/(marketing)/CLAUDE.md"],
  }],
  ["Step 2b", {
    browserValidation: false,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["app/(marketing)/CLAUDE.md"],
  }],
  ["Step 2c", {
    browserValidation: false,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["components/ui/pre-approval-drawer/CLAUDE.md"],
  }],
  ["Step 3a", {
    browserValidation: false,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["components/sections/heroes/hero-convert-framed/CLAUDE.md"],
  }],
  ["Step 3b", {
    browserValidation: true,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: [
      "components/sections/heroes/hero-convert-framed/CLAUDE.md",
      "components/ui/ripple-cta-link/CLAUDE.md",
    ],
  }],
  ["Step 3c", {
    browserValidation: true,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["components/sections/heroes/hero-lead-gen/CLAUDE.md"],
  }],
  ["Step 4a", {
    browserValidation: true,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: [
      "components/sections/page/tertiary-strip/CLAUDE.md",
      "components/sections/page/financing-offers-split/CLAUDE.md",
    ],
  }],
  ["Step 4b", {
    browserValidation: true,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["components/sections/page/brand-marquee/CLAUDE.md"],
  }],
  ["Step 4c", {
    browserValidation: false,
    skills: ["vercel-composition-patterns"],
    claudeMdHints: ["components/sections/page/program-cards/CLAUDE.md"],
  }],
  ["Step 5a", {
    browserValidation: false,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["components/sections/page/purchase-and-terms/CLAUDE.md"],
  }],
  ["Step 5b", {
    browserValidation: true,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: [
      "components/sections/page/purchase-source-grid/CLAUDE.md",
      "components/sections/page/term-length-slider/CLAUDE.md",
    ],
  }],
  ["Step 5c", {
    browserValidation: false,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["components/sections/page/content-image-split/CLAUDE.md"],
  }],
  ["Step 5d", {
    browserValidation: false,
    skills: ["vercel-composition-patterns"],
    claudeMdHints: [
      "components/sections/page/trust-bridge/CLAUDE.md",
      "components/sections/page/equipment-deals/CLAUDE.md",
    ],
  }],
  ["Step 6a", {
    browserValidation: true,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: ["components/sections/page/faq/CLAUDE.md"],
  }],
  ["Step 6b", {
    browserValidation: false,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: [
      "components/sections/page/financing-footnotes/CLAUDE.md",
      "components/sections/page/related-links-strip/CLAUDE.md",
    ],
  }],
  ["Step 6c", {
    browserValidation: true,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: [
      "components/sections/page/equipment-closing-cta/CLAUDE.md",
      "components/ui/ripple-cta-link/CLAUDE.md",
    ],
  }],
  ["Step 7", {
    browserValidation: false,
    skills: ALL_AUDIT_SKILLS,
    claudeMdHints: [],
  }],
  ["Step 8", {
    browserValidation: false,
    skills: [],
    claudeMdHints: [],
  }],
]);

export function getStepMeta(stepId) {
  return STEP_META.get(stepId) ?? DEFAULT_META;
}

// ── File utilities ───────────────────────────────────────────────────────────

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function normalizeValue(value) {
  return value.replace(/`/g, "").trim();
}

function parseArtifactList(value) {
  return value
    .split(",")
    .map((part) => normalizeValue(part))
    .filter(Boolean);
}

function isSentinelStep(value) {
  return value === "none" || value === "done";
}

function toSortedSet(values) {
  return [...new Set(values)].sort();
}

function haveSameValues(left, right) {
  const leftValues = toSortedSet(left);
  const rightValues = toSortedSet(right);

  if (leftValues.length !== rightValues.length) {
    return false;
  }

  return leftValues.every((value, index) => value === rightValues[index]);
}

function isBootstrapStep1(status) {
  return (
    status.currentTargetSubstep === "Step 1" &&
    status.nextSubstep === "Step 1" &&
    status.lastCompletedSubstep === "none" &&
    (status.passStatus === "not-started" || status.passStatus === "in-progress")
  );
}

// ── Parsing ──────────────────────────────────────────────────────────────────

export function parseTodoSteps(markdown) {
  const lines = markdown.split(/\r?\n/);
  const steps = [];
  let currentStep = null;

  for (const line of lines) {
    const match = line.match(/^### (Step [^:]+): (.+)$/);

    if (match) {
      if (currentStep) {
        currentStep.outputs = parseStepOutputs(currentStep.lines);
        steps.push(currentStep);
      }

      currentStep = {
        id: match[1].trim(),
        title: match[2].trim(),
        lines: [],
      };

      continue;
    }

    if (currentStep) {
      currentStep.lines.push(line);
    }
  }

  if (currentStep) {
    currentStep.outputs = parseStepOutputs(currentStep.lines);
    steps.push(currentStep);
  }

  return steps;
}

function parseStepOutputs(lines) {
  const outputs = [];
  let inOutputs = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (/^Outputs?:$/.test(line)) {
      inOutputs = true;
      continue;
    }

    if (!inOutputs) {
      continue;
    }

    if (
      /^(Work|Files|Focus|Required sections|Consolidation rules|Hard stop):$/.test(line) ||
      /^### /.test(line)
    ) {
      break;
    }

    if (line.startsWith("- ")) {
      const matches = [...line.matchAll(/`([^`]+)`/g)];

      for (const match of matches) {
        outputs.push(match[1]);
      }
    }
  }

  return outputs;
}

export function parseStatusMarkdown(markdown) {
  const entries = new Map();

  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^- ([^:]+):\s*(.+)$/);

    if (!match) {
      continue;
    }

    entries.set(match[1].trim(), normalizeValue(match[2]));
  }

  return entries;
}

export function parseStatusFile(markdown) {
  const entries = parseStatusMarkdown(markdown);
  const missing = STATUS_KEYS.filter((key) => !entries.has(key));

  if (missing.length > 0) {
    throw new Error(`Status file is missing required keys: ${missing.join(", ")}`);
  }

  const passStatus = entries.get("Pass status");

  if (!STATUS_VALUES.has(passStatus)) {
    throw new Error(`Unsupported pass status: ${passStatus}`);
  }

  return {
    currentPhase: entries.get("Current phase"),
    currentTargetSubstep: entries.get("Current target substep"),
    lastCompletedSubstep: entries.get("Last completed substep"),
    nextSubstep: entries.get("Next substep"),
    passStatus,
    currentOutputArtifact: entries.get("Current output artifact"),
    currentOutputArtifacts: parseArtifactList(entries.get("Current output artifact")),
    ledgerUpdated: entries.get("Ledger updated"),
    notes: entries.get("Notes"),
  };
}

// ── Resolution ───────────────────────────────────────────────────────────────

export function resolveNextStep(steps, status) {
  const stepMap = new Map(steps.map((step) => [step.id, step]));

  const candidateIds = [];

  if (!isSentinelStep(status.nextSubstep)) {
    candidateIds.push(status.nextSubstep);
  }

  if (status.passStatus !== "completed" && !isSentinelStep(status.currentTargetSubstep)) {
    candidateIds.push(status.currentTargetSubstep);
  }

  if (!isSentinelStep(status.lastCompletedSubstep)) {
    const lastIndex = steps.findIndex((step) => step.id === status.lastCompletedSubstep);

    if (lastIndex >= 0 && steps[lastIndex + 1]) {
      candidateIds.push(steps[lastIndex + 1].id);
    }
  }

  if (steps[0]) {
    candidateIds.push(steps[0].id);
  }

  for (const candidateId of candidateIds) {
    const step = stepMap.get(candidateId);

    if (step) {
      return step;
    }
  }

  return null;
}

// ── Validation ───────────────────────────────────────────────────────────────

export function validateHarnessState({ todoMarkdown, statusMarkdown, cwd = repoRoot }) {
  const steps = parseTodoSteps(todoMarkdown);
  const status = parseStatusFile(statusMarkdown);
  const errors = [];
  const warnings = [];
  const bootstrapStep1 = isBootstrapStep1(status);

  if (steps.length === 0) {
    errors.push("No review steps were parsed from plans/todo.md.");
  }

  const seenIds = new Set();

  for (const step of steps) {
    if (seenIds.has(step.id)) {
      errors.push(`Duplicate step id in todo plan: ${step.id}`);
    }

    seenIds.add(step.id);
  }

  for (const key of ["currentTargetSubstep", "lastCompletedSubstep", "nextSubstep"]) {
    const value = status[key];

    if (isSentinelStep(value)) {
      continue;
    }

    if (!seenIds.has(value)) {
      errors.push(`Status references unknown step: ${value}`);
    }
  }

  if (status.ledgerUpdated !== "yes" && status.ledgerUpdated !== "no") {
    errors.push(`Ledger updated must be yes or no, received: ${status.ledgerUpdated}`);
  }

  if (!bootstrapStep1) {
    for (const file of CONTROL_FILES) {
      const controlFilePath = path.join(cwd, file);

      if (!fileExists(controlFilePath)) {
        errors.push(`Required control file is missing: ${file}`);
      }
    }
  }

  const currentStep = steps.find((step) => step.id === status.currentTargetSubstep);

  if (currentStep && !haveSameValues(status.currentOutputArtifacts, currentStep.outputs)) {
    errors.push(
      `Current output artifact does not match declared outputs for ${currentStep.id}. ` +
      `Status: ${status.currentOutputArtifacts.join(", ") || "none"}; ` +
      `Expected: ${currentStep.outputs.join(", ") || "none"}`
    );
  }

  // Ledger content check: if marked updated, file must exist and be non-empty
  if (status.ledgerUpdated === "yes") {
    const ledgerPath = path.join(cwd, "plans", "reviews", "financing-findings-ledger.md");

    if (!fileExists(ledgerPath)) {
      errors.push("Ledger updated is yes but financing-findings-ledger.md does not exist.");
    } else {
      const content = readFile(ledgerPath).trim();

      if (content.length === 0) {
        errors.push("Ledger updated is yes but financing-findings-ledger.md is empty.");
      }
    }
  }

  if (status.passStatus === "completed" && !isSentinelStep(status.lastCompletedSubstep)) {
    const completedStep = steps.find((step) => step.id === status.lastCompletedSubstep);

    if (completedStep) {
      for (const output of completedStep.outputs) {
        const outputPath = path.join(cwd, output);

        if (!fileExists(outputPath)) {
          errors.push(
            `Completed step ${completedStep.id} is missing required output artifact: ${output}`
          );
        }
      }
    }
  }

  const nextStep = resolveNextStep(steps, status);

  if (!nextStep) {
    warnings.push("No next step could be resolved from the current status file.");
  } else if (status.nextSubstep !== nextStep.id && !isSentinelStep(status.nextSubstep)) {
    errors.push(
      `Next substep in status (${status.nextSubstep}) does not match resolved step (${nextStep.id}).`
    );
  }

  if (nextStep && !STEP_META.has(nextStep.id)) {
    warnings.push(`No step metadata defined for ${nextStep.id} — prompt will use defaults.`);
  }

  return { steps, status, nextStep, errors, warnings };
}

// ── Prompt generation ────────────────────────────────────────────────────────

export function createPrompt(step) {
  const meta = getStepMeta(step.id);
  const lines = [];
  const isStep1 = step.id === "Step 1";

  lines.push(`## Financing Review — ${step.id} Execution Prompt`);
  lines.push("");

  // Preflight
  lines.push("### Preflight (required before any work)");
  lines.push("1. Run: `npm run review:financing:validate`");
  lines.push("2. Run: `npm run review:financing:next`");
  lines.push(`3. Confirm output matches: **${step.id}**`);
  lines.push("4. If validate fails or next does not match, STOP and fix state first.");
  lines.push("");

  // Context files
  lines.push("### Context Files (read in this order)");
  let i = 1;

  if (isStep1) {
    lines.push(`${i}. \`plans/todo.md\` — read the **${step.id}** section for Files and Focus`);
    i++;
    lines.push(`${i}. \`CLAUDE.md\` (root)`);
    i++;
  } else {
    for (const file of CONTROL_FILES) {
      lines.push(`${i}. \`${file}\``);
      i++;
    }

    lines.push(`${i}. \`plans/todo.md\` — read the **${step.id}** section for Files and Focus`);
    i++;
    lines.push(`${i}. \`CLAUDE.md\` (root)`);
    i++;
  }

  for (const hint of meta.claudeMdHints) {
    lines.push(`${i}. \`${hint}\``);
    i++;
  }

  lines.push("");

  // Skills
  if (meta.skills.length > 0) {
    lines.push("### Required Skills (invoke before analysis)");

    for (const skill of meta.skills) {
      lines.push(`- \`/${skill}\``);
    }

    lines.push("");
  }

  // Target
  lines.push(`### Target: ${step.id} — ${step.title}`);
  lines.push("");

  // Required lenses
  lines.push("### Required Lenses (report all — even \"no issue found\")");
  lines.push("- [ ] accessibility");
  lines.push("- [ ] responsive behavior");
  lines.push("- [ ] Core Web Vitals risk");
  lines.push("- [ ] repo convention compliance");
  lines.push("");

  // Browser validation
  if (meta.browserValidation) {
    lines.push("### Browser Validation: REQUIRED");
    lines.push("- Run against local server on port `3005`");
    lines.push("- Validate at mobile (390x844) and desktop (1440x900)");
    lines.push("- Open at least one affected financing route");
    lines.push("- Perform at least one interaction relevant to the audited area");
    lines.push("- Record evidence notes in the substep report");
  } else {
    lines.push("### Browser Validation: NOT REQUIRED");
    lines.push("(Code/config review only — state why in the report.)");
  }

  lines.push("");

  // Output rules
  lines.push("### Output Rules");

  if (step.outputs.length > 0) {
    lines.push(isStep1 ? "Files to create:" : "Write output to:");

    for (const output of step.outputs) {
      lines.push(`- \`${output}\``);
    }
  }

  lines.push("");
  lines.push("Then:");
  lines.push("1. Update `plans/reviews/financing-findings-ledger.md` with any findings");
  lines.push("2. Update `plans/reviews/financing-status.md` — set pass status to `completed`");
  lines.push(`3. **STOP** — do not proceed beyond ${step.id}`);

  return lines.join("\n");
}

// ── Guard ────────────────────────────────────────────────────────────────────

export function guardFile({ filePath, steps, status, cwd = repoRoot }) {
  const absolute = path.resolve(cwd, filePath);
  const relative = path.relative(cwd, absolute);

  // Only guard plans/reviews/ writes
  if (!relative.startsWith(path.join("plans", "reviews"))) {
    return { allowed: true, reason: "not a review file" };
  }

  const currentStep = steps.find((s) => s.id === status.currentTargetSubstep);

  if (!currentStep) {
    return { allowed: false, reason: "no current step could be determined from status file" };
  }

  // Ledger and status are always writable (updated every step)
  const alwaysAllowed = new Set([
    path.join("plans", "reviews", "financing-findings-ledger.md"),
    path.join("plans", "reviews", "financing-status.md"),
  ]);

  const allowed = new Set([...alwaysAllowed, ...currentStep.outputs]);

  if (allowed.has(relative)) {
    return { allowed: true, reason: `valid output for ${currentStep.id}` };
  }

  return {
    allowed: false,
    reason: `${relative} is not an allowed output for ${currentStep.id}. Allowed: ${[...allowed].join(", ")}`,
  };
}

// ── CLI ──────────────────────────────────────────────────────────────────────

function formatStep(step) {
  const meta = getStepMeta(step.id);

  const outputBlock =
    step.outputs.length > 0 ? step.outputs.map((output) => `  - ${output}`).join("\n") : "  - none";

  const parts = [`${step.id}: ${step.title}`, "Outputs:", outputBlock];

  if (meta.skills.length > 0) {
    parts.push(`Skills: ${meta.skills.map((s) => `/${s}`).join(", ")}`);
  }

  if (meta.claudeMdHints.length > 0) {
    parts.push(`CLAUDE.md: ${meta.claudeMdHints.join(", ")}`);
  }

  parts.push(`Browser validation: ${meta.browserValidation ? "required" : "not required"}`);

  return parts.join("\n");
}

function runCli(argv) {
  const command = argv[2] ?? "next";
  const todoMarkdown = readFile(TODO_PATH);
  const statusMarkdown = readFile(STATUS_PATH);
  const result = validateHarnessState({ todoMarkdown, statusMarkdown });

  if (command === "validate") {
    if (result.errors.length > 0) {
      for (const error of result.errors) {
        console.error(`ERROR: ${error}`);
      }

      for (const warning of result.warnings) {
        console.error(`WARNING: ${warning}`);
      }

      process.exitCode = 1;
      return;
    }

    console.log("Harness state is valid.");

    for (const warning of result.warnings) {
      console.log(`WARNING: ${warning}`);
    }

    return;
  }

  if (command === "guard") {
    const targetPath = argv[3];

    if (!targetPath) {
      console.error("Usage: guard <file-path>");
      process.exitCode = 1;
      return;
    }

    if (result.errors.length > 0) {
      for (const error of result.errors) {
        console.error(`ERROR: ${error}`);
      }

      console.error("BLOCKED: fix harness errors before writing review files.");
      process.exitCode = 1;
      return;
    }

    const guardResult = guardFile({
      filePath: targetPath,
      steps: result.steps,
      status: result.status,
    });

    if (guardResult.allowed) {
      console.log(`ALLOWED: ${guardResult.reason}`);
    } else {
      console.error(`BLOCKED: ${guardResult.reason}`);
      process.exitCode = 1;
    }

    return;
  }

  if (!result.nextStep) {
    console.error("No next step could be resolved.");
    process.exitCode = 1;
    return;
  }

  if (result.errors.length > 0) {
    for (const error of result.errors) {
      console.error(`ERROR: ${error}`);
    }

    process.exitCode = 1;
    return;
  }

  if (command === "next") {
    console.log(formatStep(result.nextStep));
    return;
  }

  if (command === "prompt") {
    console.log(createPrompt(result.nextStep));
    return;
  }

  console.error(`Unknown command: ${command}`);
  process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli(process.argv);
}
