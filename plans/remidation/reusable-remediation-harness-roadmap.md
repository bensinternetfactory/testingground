# Reusable Remediation Harness Roadmap

## Purpose

This document turns the replacement execution spec in `plans/remidation/plan.md`
into a build roadmap for a reusable remediation platform.

The finance pages are the first deployment target, not the permanent shape of the
system. The harness and orchestrator should be designed so a future program can
plug in a new registry, different validation requirements, different artifact
paths, and a different runner policy without forking the core logic.

Primary design goal:

- build a reusable remediation control system

Secondary design goal:

- use the finance remediation as the first fully exercised program

Implementation discipline:

- generalize from one, abstract at two

That means the finance program should drive the initial abstractions. The core
must stay reusable, but the roadmap should not force speculative placeholder
programs before the finance deployment exposes the real seams.

## System Philosophy

An aerospace engineer would not begin by wiring the live actuator and hoping the
rest of the system settles around it. They would separate:

- control logic
- actuator interface
- sensors and validation
- state persistence
- operator approval boundaries

Applied here:

- harness: deterministic control logic
- runner adapter: non-deterministic actuator interface
- validators: post-run sensors
- artifacts: persisted evidence
- orchestrator: sequencing shell around one remediation unit
- human approval: hard go/no-go gate between units

This means the system should be built in layers and verified from the inside out.

## Reusability Rules

The platform should be reusable across finance pages, SEO passes, design-system
cleanup, accessibility remediation, migration work, and future audit programs.

To make that practical:

- never hard-code "finance" into core harness logic
- keep remediation units program-scoped, not repo-global by assumption
- make registry shape generic and program-agnostic
- keep artifact storage configurable per program
- make validation policy data-driven
- make runner selection pluggable
- keep visual-change policy tied to unit type, not to one domain

Finance-specific data should live in program configuration only.

## Recommended Architecture

### Core layers

1. Program definition layer
   - declares one remediation program such as `finance-pages`
   - defines registry path, tracker path, baseline rules, artifact directory, and
     program-specific defaults

2. Harness layer
   - parses program state
   - validates registry and tracker consistency
   - resolves the next eligible remediation unit
   - generates prompt payloads
   - evaluates allowlists, dependencies, policies, and lock state

3. Validation layer
   - runs lint, build, test, browser, and visual checks
   - compares results against baseline when required

4. Runner adapter layer
   - runs `codex`, `claude`, or future runners in a fresh process
   - returns a normalized result shape

5. Orchestrator layer
   - performs the one-unit lifecycle
   - acquires and releases locks
   - persists artifacts
   - stages changes
   - prints the review packet
   - stops for explicit approval

### Recommended file layout

```text
scripts/remediation/
  cli.mjs
  types.ts
  programs/
    finance-pages.ts
  harness/
    registry.ts
    tracker.ts
    dependencies.ts
    policies.ts
    prompt.ts
    allowlist.ts
    lockfile.ts
    preflight.ts
    review-packet.ts
    artifacts.ts
  validators/
    lint.ts
    build.ts
    test.ts
    browser.ts
    visual.ts
    baseline.ts
  runners/
    adapter.ts
    codex.ts
    claude.ts
    fake.ts
  orchestrator/
    run-unit.ts
    approval.ts
    rollback.ts
    rejection.ts
scripts/__tests__/remediation/
```

This keeps reusable logic separate from program configuration.

## Data Model

### Program config

Each remediation program should declare:

- `programId`
- `displayName`
- `registryPath`
- `trackerPath`
- `statusPath`
- `artifactRoot`
- `baselineConfig`
- `defaultRunnerPolicyByWave`
- `defaultCommitPolicy`
- `defaultAttemptBudget`
- `requiredControlFiles`

Example concept:

- `finance-pages` points at the finance registry and finance artifacts
- later programs should be added only after finance proves the abstraction

### Remediation unit

Each unit should include the fields required in the main plan:

- `id`
- `wave`
- `title`
- `type`
- `branch`
- `allowedFiles`
- `dependsOn`
- `requiredSkills`
- `claudeMdHints`
- `requiresTests`
- `requiresBrowserValidation`
- `requiresVisualRegression`
- `browserChecks`
- `runnerPolicy`
- `commitPolicy`
- `attemptBudget`
- `fixReportPath`

Additional reusable fields worth adding now:

- `programId`
- `sourceRef`
- `tags`
- `ownerSurface`
- `baselineRoutes`
- `visualChangeScope`
- `rollbackHints`

### Normalized runtime result

Use one result contract for all programs and all runners:

- `programId`
- `unitId`
- `runId`
- `runner`
- `mode`
- `attemptNumber`
- `validationRetryCount`
- `changedFiles`
- `allowlistOk`
- `lintOk`
- `buildOk`
- `testOk`
- `browserOk`
- `visualRegressionOk`
- `reportWritten`
- `trackerUpdated`
- `statusUpdated`
- `staged`
- `commitApproved`
- `commitSha`
- `promptTemplateVersion`
- `visualSurfaceChanged`
- `finalState`
- `nextUnit`

## Build Strategy

Build the system in eight steps. Do not start with real runner integration.

### Step 1: Freeze interfaces and schemas

Deliverables:

- `types.ts` for the reusable contracts
- registry schema
- program config schema
- lock file schema
- fix report schema
- failure artifact schema
- review packet schema

Why first:

- this prevents architecture churn and keeps later work aligned

Acceptance criteria:

- all schemas are explicit
- unit type and wave policy decisions are encoded in types
- finance-specific fields are not embedded in core contracts
- registry intake metadata is source-agnostic

### Step 2: Build the pure harness core

Implement pure functions for:

- registry parsing and validation
- dependency enforcement
- composite-unit handling
- next-unit resolution
- tracker and status drift detection
- prompt payload generation
- allowlist evaluation
- policy selection by unit type and wave

Why second:

- this is the deterministic control core
- it should be testable without running subprocesses

Acceptance criteria:

- harness logic can run entirely from fixtures
- invalid registry states fail before orchestration begins
- the finance registry can be parsed and validated without requiring a second
  synthetic program definition

### Step 3: Add reusable persistence and locking

Implement:

- lock acquisition and release
- stale-lock detection
- safe unlock logic
- artifact directory creation
- baseline snapshot writer
- fix report writer
- failure artifact writer
- latest review packet writer

Acceptance criteria:

- interrupted runs always leave an unambiguous persisted state
- stale locks only clear when PID is dead and age threshold is exceeded
- blocked state after attempt-budget exhaustion requires a human reset action

### Step 4: Build the validation pipeline

Implement validators as independent modules:

- lint
- build
- test
- browser
- visual regression
- baseline comparator

Rules:

- validators return normalized results
- orchestrator never decides policy ad hoc
- baseline comparison is reusable across programs
- baseline comparison is hard enforcement, not reporting-only metadata

Acceptance criteria:

- each validator can be called independently
- required validators cannot be silently skipped
- lint/build regressions against baseline fail the run
- validation flake retries are counted separately from agent attempts

### Step 5: Build a fake runner adapter

Create a `fake` runner that simulates:

- success
- timeout
- malformed output
- touched disallowed files
- crash
- visual-surface change

Why this matters:

- it lets the full orchestration lifecycle be tested before live agent coupling

Acceptance criteria:

- orchestrator integration tests can cover nominal and off-nominal runs using
  only the fake adapter and finance fixtures

### Step 6: Build the one-unit orchestrator

Implement the exact lifecycle from `plan.md`:

1. preflight
2. acquire lock
3. validate
4. resolve next
5. generate prompt
6. run one fresh runner process
7. diff changed files
8. enforce allowlist
9. run validators in required order
10. write artifacts
11. update tracker and status
12. stage changes
13. generate draft commit message
14. print review packet
15. stop for explicit approval
16. release lock and exit

Important constraint:

- the required primitive is one-unit execution
- any loop over multiple units should be optional and built later

Acceptance criteria:

- the orchestrator can complete one unit and stop cleanly every time
- empty approval input exits safely
- attempt-budget exhaustion moves the unit to blocked and writes an aggregated
  failure artifact

### Step 7: Add real runner adapters

Implement:

- `codex` adapter
- `claude` adapter

Each adapter must guarantee:

- fresh process per unit
- injected prompt payload
- deterministic exit capture
- normalized result output

Acceptance criteria:

- changing runner does not change harness behavior
- runner-specific code exists only in adapter modules

### Step 8: Add rollback and rejection workflows

Implement:

- rejection state recording
- relock for retry
- rejected commit SHA preservation
- rollback guidance or execution helpers

Acceptance criteria:

- a previously approved unit can be reverted without losing traceability
- rejection history remains attached to the unit
- retries cannot resume after a blocked state until a human rewrites the fix
  direction, splits the unit, or marks it deferred

## Suggested Delivery Milestones

### Milestone A: Reusable harness foundation

Scope:

- types
- registry
- program config
- harness core
- tests for parsing, dependencies, policies, and allowlist checks

Outcome:

- the system can parse and validate the finance registry and reason about units
  without running them yet

### Milestone B: Safe persistence and validation

Scope:

- locks
- artifacts
- baseline
- validators

Outcome:

- the system can prove safe state handling and evidence capture

### Milestone C: Orchestrator with fake runner

Scope:

- one-unit orchestration lifecycle
- review packet
- approval stop
- integration tests against fake runner

Outcome:

- the entire control loop works against finance fixtures without a live agent

### Milestone D: Finance program rollout

Scope:

- finance program definition
- finance registry
- finance artifact paths
- finance-specific browser and visual policies

Outcome:

- the first real remediation program is running, and any abstraction gaps found
  during rollout are fixed in the core

### Milestone E: Cross-program proof

Scope:

- second program fixture or dummy program
- cross-program compatibility test
- cleanup of abstractions proven too finance-specific during Milestone D

Outcome:

- the platform has a real cross-program reuse proof after finance has exercised
  the seams

### Milestone F: Real runner adapters

Scope:

- codex adapter
- claude adapter
- operator docs

Outcome:

- supervised production execution becomes possible

## Finance As The First Program

The finance pages should be modeled as:

- `programId: finance-pages`

Do not let finance-specific naming leak into:

- core types
- harness commands
- runner contracts
- validator interfaces
- artifact schemas

Finance-specific inputs should include:

- finance registry entries
- finance tracker and status files
- finance browser checks
- finance visual baseline routes
- the declared composite unit combining `FIN-schema-016` and `FIN-config-003`

That composite relationship should be implemented in the finance registry, not as
special logic in the harness.

The finance program should be the concrete proof during the first build phases.
Do not add speculative non-finance program modules before finance rollout
demonstrates where the abstractions hold and where they need correction.

## Test Strategy

### Unit tests for reusable core

Add tests for:

- registry parsing
- invalid registry rejection
- source-agnostic intake metadata handling
- dependency enforcement
- composite-unit handling
- allowlist enforcement
- stale-lock detection
- drift detection across registry, tracker, tickets, and status
- prompt generation with the correct skill and constraint set
- visual policy selection from unit type

### Integration tests for the orchestrator

Add scenarios for:

1. successful low-risk unit run
2. non-allowlisted file touched
3. lint failure
4. build failure
5. test failure
6. browser validation failure
7. visual regression failure
8. interrupted run with persisted failure artifact
9. stale lock and safe unlock
10. dependency violation blocks next-unit selection
11. empty approval input exits cleanly
12. attempt budget exceeded
13. nonvisual unit reports unexpected visual change and fails closed
14. lint or build status regresses relative to baseline and the run fails
15. validation flake retries do not consume additional agent attempts
16. Wave N+1 branch creation is blocked until Wave N merges

### Cross-program proof test

Add one explicit cross-program fixture test after finance rollout:

- finance program and a second dummy program both use the same harness modules
- only configuration changes
- no core logic changes are required

This is a post-finance proof, not an early design exercise.

## Design Constraints

These rules should remain true across every program:

- one remediation unit per invocation
- no silent validation skips
- no baseline regressions accepted for tracked metrics
- no dependency decisions in prose only
- no opportunistic visual polish in nonvisual work
- no auto-advance to the next unit without explicit human approval
- no ambiguous in-progress state after interruption
- no runner-specific behavior in core harness logic

## First Build Slice

The best first implementation slice is:

1. add `scripts/remediation/types.ts` for core contracts
2. add `scripts/remediation/harness/registry.ts` for parse and validate
3. add `scripts/remediation/harness/dependencies.ts` for `dependsOn` enforcement
4. add `scripts/remediation/harness/policies.ts` for unit-type to visual-policy
   selection
5. add tests for those four modules in `scripts/__tests__/remediation/`

Reason:

- this produces the highest leverage foundation with the lowest integration risk

## Definition Of Done

The reusable remediation harness is ready when:

- finance pages run as one configured program
- the orchestrator can safely stop after every unit
- every run emits persisted success or failure evidence
- lock state is crash-safe
- validators are ordered, explicit, and fail closed
- runner adapters are replaceable without changing the control core
- after finance rollout, a second program can run through the same harness
  without code forks

At that point, the remediation system is a platform rather than a finance-only
script.
