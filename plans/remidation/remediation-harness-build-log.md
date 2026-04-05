# Remediation Harness Build Log

## Module Status

- [x] Module 1: registry foundation
- [x] Module 2: dependency + policy core
- [x] Module 3: prompt payload generation
- [ ] Module 4: CLI wiring for `validate`, `next`, and `prompt`
- [ ] Module 5: locks, artifacts, and preflight
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
