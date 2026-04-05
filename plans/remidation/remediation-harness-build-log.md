# Remediation Harness Build Log

## Module Status

- [x] Module 1: registry foundation
- [x] Module 2: dependency + policy core
- [x] Module 3: prompt payload generation
- [x] Module 4: CLI wiring for `validate`, `next`, and `prompt`
- [x] Module 5: locks, artifacts, and preflight
- [x] Module 6: validators
- [x] Module 7: orchestrator + fake runner
- [x] Module 8: real runner adapters
- [x] Module 9: approval, rejection, rollback, and wave-close state transitions
- [x] Module 10: browser execution, dev-port orchestration, and wave branch gating

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

## Module 6

- Date: `2026-04-05`
- Scope:
  - added reusable validator result contracts in `scripts/remediation/types.ts`
  - added independent validator modules for lint, build, test, browser, visual regression, and baseline comparison in `scripts/remediation/validators/`
  - upgraded preflight baseline capture to record real lint/build outcomes instead of placeholder `pending` markers
  - tightened preflight browser-tooling checks so missing `agent-browser` now fails closed for units that require browser validation
  - added focused validator coverage in `scripts/__tests__/remediation/validators.test.ts` and updated persistence/preflight coverage
- Decisions:
  - lint baseline enforcement compares warning counts, not just pass/fail state
  - build baseline enforcement only accepts a passing baseline snapshot; unusable baseline state fails closed
  - browser and visual validators are normalized result checkers now, with orchestration/execution wiring deferred to the later runner/orchestrator modules
  - visual regression validation treats missing captures and unexpected changes as hard failures when policy says to fail on unexpected change
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/preflight.ts`
  - `scripts/remediation/validators/command.ts`
  - `scripts/remediation/validators/shared.ts`
  - `scripts/remediation/validators/lint.ts`
  - `scripts/remediation/validators/build.ts`
  - `scripts/remediation/validators/test.ts`
  - `scripts/remediation/validators/browser.ts`
  - `scripts/remediation/validators/visual.ts`
  - `scripts/remediation/validators/baseline.ts`
  - `scripts/__tests__/remediation/persistence.test.ts`
  - `scripts/__tests__/remediation/validators.test.ts`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint -- scripts/remediation scripts/__tests__/remediation`
  - `npm run build`
- Next module boundary:
  - implement the one-unit orchestrator and fake runner so a single remediation unit can acquire a lock, run validators in order, write artifacts, and stop for approval

## Module 7

- Date: `2026-04-05`
- Scope:
  - added reusable allowlist evaluation in `scripts/remediation/harness/allowlist.ts`
  - added tracker write helpers and a generic runtime status-section writer for persisted orchestrator state
  - added a reusable fake runner adapter in `scripts/remediation/runners/`
  - added the one-unit orchestrator in `scripts/remediation/orchestrator/run-unit.ts` covering preflight, lock lifecycle, fake-runner execution, allowlist enforcement, ordered validators, baseline comparison, artifact writes, tracker/status updates, staging, and review packet generation
  - extended the CLI with `run` plus package scripts for generic and finance-program execution
  - added focused orchestrator integration coverage in `scripts/__tests__/remediation/orchestrator.test.ts`
- Decisions:
  - successful stage-and-approve runs remain `in-progress` in the tracker until a later approval/commit step can write a real `commitSha`
  - the status file is updated via an appended `## Remediation Runtime` section so the reusable harness can coexist with pre-existing program status formats
  - module 7 only resolves real execution through the fake runner unless a custom runner is injected; codex/claude adapters remain module 8 work
  - nonvisual units fail closed when the runner reports a visual surface change even if no visual-regression capture was required for that unit
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/allowlist.ts`
  - `scripts/remediation/harness/artifacts.ts`
  - `scripts/remediation/harness/tracker.ts`
  - `scripts/remediation/harness/status.ts`
  - `scripts/remediation/runners/adapter.ts`
  - `scripts/remediation/runners/fake.ts`
  - `scripts/remediation/orchestrator/run-unit.ts`
  - `scripts/remediation/cli-core.ts`
  - `scripts/__tests__/remediation/orchestrator.test.ts`
  - `package.json`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint -- scripts/remediation scripts/__tests__/remediation`
  - `npm run build`
- Next module boundary:
  - implement the real `codex` and `claude` runner adapters, then thread approval/commit handling through the staged orchestrator result

## Module 8

- Date: `2026-04-05`
- Scope:
  - added shared subprocess runner utilities for timeout handling, structured-output parsing, and before/after git-status diff capture in `scripts/remediation/runners/shared.ts`
  - added real local CLI adapters for `codex exec` and `claude --print` in `scripts/remediation/runners/`
  - rewired the orchestrator so configured `codex` and `claude` runners resolve without test-only injection
  - tightened preflight so missing configured runner binaries now fail closed instead of warning
  - added focused runner adapter coverage in `scripts/__tests__/remediation/runners.test.ts`
- Decisions:
  - real adapters shell out to the locally authenticated CLIs rather than calling provider APIs directly
  - prompt payloads are injected over stdin, not argv, to avoid quoting and length hazards
  - adapter `changedFiles` come from git-status snapshots before and after the subprocess run instead of trusting model self-reporting
  - `visualSurfaceChanged` defaults to the structured runner output, but the harness still treats visual validation as the authoritative post-run enforcement layer
- Outputs:
  - `scripts/remediation/runners/adapter.ts`
  - `scripts/remediation/runners/shared.ts`
  - `scripts/remediation/runners/codex.ts`
  - `scripts/remediation/runners/claude.ts`
  - `scripts/remediation/orchestrator/run-unit.ts`
  - `scripts/remediation/harness/preflight.ts`
  - `scripts/__tests__/remediation/runners.test.ts`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint -- scripts/remediation scripts/__tests__/remediation`
  - `npm run build`
- Next module boundary:
  - add approval/rejection handling, rollback guidance, wave-close artifacts, and post-approval commit state transitions on top of the staged orchestrator result

## Module 9

- Date: `2026-04-05`
- Scope:
  - added explicit `approve`, `reject`, and `rollback` orchestrator flows in `scripts/remediation/orchestrator/`
  - extended the remediation CLI and package scripts with post-run workflow commands for generic and finance-program execution
  - persisted JSON-backed latest review packet state so approve/reject can resume from the staged handoff without recomputing intent
  - added approval, rejection, rollback, and wave-summary artifacts plus runtime status updates for each post-run transition
  - updated approval flow to commit staged changes, write the real `commitSha`, move tracker rows to `fixed`, and emit a wave-close artifact when a wave completes
  - updated rejection flow to preserve the artifact trail, unstage the pending diff, and return the unit to a retryable `not-started` state
  - updated rollback flow to revert approved commits and move the unit to `blocked` with explicit unblock guidance so retries remain human-gated
- Decisions:
  - `latest-review-packet.md` now has a sibling `latest-review-packet.json` file which is the machine-readable resume contract for `approve` and `reject`
  - rejection clears the staged index with `git reset HEAD -- <files>` but intentionally leaves working-tree edits intact so rejected work is not silently discarded
  - rollback preserves the original approved `commitSha` on the tracker row and blocks the unit until a human rewrites the fix direction
  - wave-close artifacts are written automatically at approval time when the next eligible unit moves to a later wave or the program becomes complete
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/artifacts.ts`
  - `scripts/remediation/harness/status.ts`
  - `scripts/remediation/orchestrator/review-state.ts`
  - `scripts/remediation/orchestrator/approval.ts`
  - `scripts/remediation/orchestrator/rejection.ts`
  - `scripts/remediation/orchestrator/rollback.ts`
  - `scripts/remediation/orchestrator/run-unit.ts`
  - `scripts/remediation/cli-core.ts`
  - `scripts/__tests__/remediation/orchestrator.test.ts`
  - `scripts/__tests__/remediation/persistence.test.ts`
  - `scripts/__tests__/remediation/cli.test.ts`
  - `package.json`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint -- scripts/remediation scripts/__tests__/remediation`
  - `npm run build`
- Next module boundary:
  - move browser observation execution into a harness-owned layer, add non-`3000` dev-port orchestration, and enforce wave branch gating before Wave N+1 execution
- Acceptance criteria:
  - approving a staged successful run writes a real commit, persists `commitSha`, and marks the unit `fixed`
  - rejecting a run preserves rejection history and keeps the unit recoverable for a later retry or defer decision
  - rolling back an approved unit preserves both the original approved SHA and the rollback SHA in persisted artifacts
  - wave-close artifacts are written when the final unit in a wave is approved
- Recommended implementation notes:
  - add dedicated CLI commands rather than overloading `run`
  - treat approval/rejection/rollback as harness-owned state transitions, not runner behavior
  - keep provenance tagging mandatory where commit policy requires it
- Next module boundary:
  - add browser-execution plumbing, dev-port probing/boot, and wave branch gating so browser-required finance units can execute end to end

## Module 10

- Date: `2026-04-05`
- Scope:
  - added a harness-owned browser execution layer in `scripts/remediation/harness/browser-execution.ts` that expands declared route/viewport checks, drives `agent-browser`, and emits normalized `BrowserCheckObservation[]`
  - added reusable non-`3000` dev-server lifecycle management in `scripts/remediation/harness/dev-server.ts` with persisted state, port probing, background `npm run dev` boot, and reuse of a compatible running server
  - added reusable wave branch gating in `scripts/remediation/harness/branch-gating.ts` to block Wave N+1 before Wave N merge state is satisfied and to fail closed on stale branches unless `--allow-stale` is explicitly provided
  - threaded dev-server resolution and branch gating through `preflight`, browser execution through the orchestrator, and `--allow-stale` through the CLI/run path
  - added focused coverage for missing dev server, stale-branch override behavior, and failed browser observations in the remediation test suite
- Decisions:
  - browser automation remains harness-owned even when the remediation runner is `codex` or `claude`; the runner no longer needs to be the source of browser observations for browser-required units
  - browser assertion execution is keyed off the declared finance assertions so the first deployed program gets deterministic post-run checks without inventing a second registry format midstream
  - dev-server reuse is persisted under the program artifact root so repeated preflight/run passes can share the same non-`3000` `npm run dev` instance
  - branch gating uses wave summary artifacts plus commit ancestry into the configured base branch to decide when a later wave is eligible to start
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/browser-execution.ts`
  - `scripts/remediation/harness/dev-server.ts`
  - `scripts/remediation/harness/branch-gating.ts`
  - `scripts/remediation/harness/preflight.ts`
  - `scripts/remediation/orchestrator/run-unit.ts`
  - `scripts/remediation/cli-core.ts`
  - `scripts/remediation/programs/finance-pages.ts`
  - `scripts/__tests__/remediation/persistence.test.ts`
  - `scripts/__tests__/remediation/orchestrator.test.ts`
  - `scripts/__tests__/remediation/cli.test.ts`
- Verification:
  - `npm test -- scripts/__tests__/remediation`
  - `npm run lint -- scripts/remediation scripts/__tests__/remediation`
  - `npm run build`
