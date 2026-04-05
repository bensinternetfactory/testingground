# Remediation Harness Build Log

## Module Status

- [x] Module 1: registry foundation
- [x] Module 2: dependency + policy core
- [x] Module 3: prompt payload generation
- [x] Module 4: CLI wiring for `validate`, `next`, and `prompt`
- [x] Module 5: locks, artifacts, and preflight
- [ ] Module 6: validators
- [ ] Module 7: orchestrator + fake runner
- [ ] Module 8: real runner adapters

## Module 1

- Date: `2026-04-05`
- Scope:
  - added reusable remediation contracts in `scripts/remediation/types.ts`
  - translated the finance ledger into a concrete TypeScript registry in `scripts/remediation/programs/finance-pages.ts`
  - encoded the FAQ composite as `FIN-faq-unification` in registry data instead of prose
  - added registry validation and indexing in `scripts/remediation/harness/registry.ts`
  - added focused registry tests in `scripts/__tests__/remediation/registry.test.ts`
- Decisions:
  - registry format is TypeScript source, not JSON/YAML
  - source markdown stays evidence only; registry units are the normalized execution queue
  - stale `plans/reviews/...` evidence pointers were normalized to the real `plans/financing-pages/...` step files inside the registry
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/registry.ts`
  - `scripts/remediation/programs/finance-pages.ts`
  - `scripts/__tests__/remediation/registry.test.ts`
- Verification:
  - `npm test -- scripts/__tests__/remediation/registry.test.ts`
  - `npm run lint scripts/remediation scripts/__tests__/remediation`
- Next module boundary:
  - implement dependency resolution and policy selection without touching runner/orchestrator code

## Notes For The Next Agent

- The finance registry currently contains `18` remediation units because `FIN-config-003` and `FIN-schema-016` were merged into one composite unit.
- The first explicit dependency already encoded is `FIN-patterns-007 -> FIN-architecture-006`.
- `trackerPath` is declared but intentionally not created yet; tracker/state persistence belongs to a later module.

## Module 2

- Date: `2026-04-05`
- Scope:
  - added reusable tracker-state and resolved-policy contracts in `scripts/remediation/types.ts`
  - added pure dependency and next-unit resolution helpers in `scripts/remediation/harness/dependencies.ts`
  - added reusable runner/commit/visual policy resolution in `scripts/remediation/harness/policies.ts`
  - added finance-program coverage for execution ordering, wave gating, dependency blocking, composite-unit handling, tracker validation, and policy defaults in `scripts/__tests__/remediation/harness-core.test.ts`
- Decisions:
  - next-unit resolution is wave-ordered first, then registry declaration order inside a wave
  - only `fixed` dependencies satisfy `dependsOn`; `blocked`, `deferred`, `in-progress`, and missing tracker rows keep dependents unresolved
  - `deferred` units count as resolved for whole-program completion and wave advancement, but not as dependency satisfaction
  - invalid tracker rows fail closed before next-unit resolution returns an actionable unit
  - per-unit runner policy overrides merge over wave defaults so a unit can override `mode` without restating the adapter/rationale
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/dependencies.ts`
  - `scripts/remediation/harness/policies.ts`
  - `scripts/__tests__/remediation/harness-core.test.ts`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint scripts/remediation scripts/__tests__/remediation`
- Next module boundary:
  - implement prompt payload generation on top of resolved unit policies and dependency-selected next-unit metadata without adding CLI or persistence wiring yet

## Module 3

- Date: `2026-04-05`
- Scope:
  - added reusable prompt payload contracts in `scripts/remediation/types.ts`
  - added pure prompt payload and prompt text generation helpers in `scripts/remediation/harness/prompt.ts`
  - wired prompt generation to dependency-selected next-unit resolution and merged unit policies
  - extended finance-program harness coverage for next-unit prompt selection, composite-unit prompt metadata, strict visual guardrails, and no-payload blocked-wave behavior in `scripts/__tests__/remediation/harness-core.test.ts`
- Decisions:
  - prompt generation now produces both a structured payload and a deterministic rendered prompt string for later CLI and runner adapter reuse
  - prompt validation requirements always include lint and build, while tests/browser/visual requirements remain unit-driven
  - prompt payloads carry control-file paths, CLAUDE.md hints, rollback hints, and visual guardrails directly from program + unit metadata instead of re-deriving them in the runner layer
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/prompt.ts`
  - `scripts/__tests__/remediation/harness-core.test.ts`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint scripts/remediation scripts/__tests__/remediation`
  - `npm run build`
- Next module boundary:
  - add CLI wiring for `validate`, `next`, and `prompt` on top of the pure registry, dependency, policy, and prompt helpers without adding locks or persistence flows yet

## Module 4

- Date: `2026-04-05`
- Scope:
  - added reusable tracker-file parsing and bootstrap loading in `scripts/remediation/harness/tracker.ts`
  - added program registration/loading in `scripts/remediation/programs/index.ts`
  - added reusable CLI wiring for `validate`, `next`, and `prompt` in `scripts/remediation/cli-core.ts` with a thin node entrypoint in `scripts/remediation/cli.mjs`
  - rewired the finance package scripts to call the reusable remediation CLI instead of the finance-only harness for `validate`, `next`, and `prompt`
  - added focused CLI coverage in `scripts/__tests__/remediation/cli.test.ts`
- Decisions:
  - the tracker file schema is an explicit JSON object with `programId` and `entries`
  - missing tracker files are treated as an empty bootstrap state with a warning instead of a hard failure
  - the CLI supports both human-readable output and `--json` output without adding runner, lock, or artifact behavior yet
  - `prompt` may target either the next eligible unit or an explicit `--unit` for inspection/debugging
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/tracker.ts`
  - `scripts/remediation/programs/index.ts`
  - `scripts/remediation/cli-core.ts`
  - `scripts/remediation/cli.mjs`
  - `scripts/__tests__/remediation/cli.test.ts`
  - `package.json`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint -- scripts/remediation scripts/__tests__/remediation`
  - `npm run build`
- Next module boundary:
  - add locks, stale-lock handling, artifact persistence, and preflight flows without introducing runner execution yet

## Module 5

- Date: `2026-04-05`
- Scope:
  - added reusable lockfile lifecycle helpers in `scripts/remediation/harness/lockfile.ts`
  - added reusable artifact persistence helpers for baseline snapshots, fix reports, failure artifacts, and latest review packets in `scripts/remediation/harness/artifacts.ts`
  - added reusable preflight checks and baseline capture in `scripts/remediation/harness/preflight.ts`
  - extended the remediation CLI with `preflight` and `unlock-stale`
  - added focused persistence/preflight coverage in `scripts/__tests__/remediation/persistence.test.ts`
- Decisions:
  - the active program lock lives at `<artifactRoot>/active-lock.json`
  - stale locks fail preflight closed and must be removed explicitly with `unlock-stale`
  - baseline snapshots are persisted as JSON now, while lint/build/visual execution details remain `pending` until validator modules land
  - missing runner/browser binaries remain warnings during module 5 because runner adapters and validators are not implemented yet
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/lockfile.ts`
  - `scripts/remediation/harness/artifacts.ts`
  - `scripts/remediation/harness/preflight.ts`
  - `scripts/remediation/cli-core.ts`
  - `scripts/__tests__/remediation/persistence.test.ts`
  - `package.json`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint -- scripts/remediation scripts/__tests__/remediation`
  - `npm run build`
- Next module boundary:
  - implement normalized validators for lint, build, test, browser, visual regression, and baseline comparison without introducing real runner execution yet
