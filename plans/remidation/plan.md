# Replacement Execution Spec: Supervised Remediation Orchestrator

  ## Summary

  Replace the current execution section with a stricter, tool-agnostic operating model built around one locked remediation unit at a time,
  deterministic validation, persisted evidence, and a hard approval stop after every run.

  This system has two layers:

  - harness: pure state, registry, dependency, and guard logic
  - orchestrator: runs one remediation unit in a fresh agent process, validates the result, writes evidence, and stops for approval

  Primary intent:

  - you do not manually manage the sequence
  - the system does not free-run across the whole plan
  - the runner may be codex, claude, or another configured CLI
  - nonvisual tickets must preserve frontend appearance unless the ticket explicitly authorizes a visual change

  ## Implementation Changes

  ### 1. Define the remediation unit and resolve ticket coupling up front

  The workflow default is one finding per pass. Exceptions must be declared before scaffolding starts.

  Required rule:

  - any inseparable pair must be merged into one composite remediation unit in the registry
  - do not allow prose-only coupling

  Apply this immediately:

  - merge FIN-schema-016 and FIN-config-003 into one composite unit, for example FIN-faq-unification
  - all dependency checks, prompts, reports, and validations must treat that as one unit

  ### 2. Split responsibilities cleanly

  #### Harness responsibilities

  The harness is the single source of truth for remediation state and must not run the agent itself.

  It owns:

  - remediation registry parsing and validation
  - tracker and status parsing
  - dependency enforcement
  - file allowlist enforcement
  - prompt payload generation
  - consistency checks across ledger, tracker, ticket files, and status
  - lock file management metadata
  - preflight requirements
  - review packet schema
  - failure artifact schema

  It exposes CLI commands such as:

  - validate
  - next
  - prompt
  - guard
  - preflight
  - review
  - unlock-stale

  #### Orchestrator responsibilities

  The orchestrator runs exactly one remediation unit per invocation.

  It owns:

  - acquiring the execution lock
  - launching a fresh runner process
  - enforcing attempt budget
  - running validations
  - collecting artifacts
  - staging changes
  - preparing commit text
  - printing the approval summary
  - stopping for explicit approval before the next unit

  ### 3. Use a structured registry, not prose tables

  Replace prose-only execution metadata with a machine-readable registry embedded in code or a structured file.

  Each remediation unit must define:

  - id
  - programId
  - wave
  - title
  - type: bugfix-nonvisual, bugfix-visual-safe, architecture, or docs
  - branch
  - sourceRef
  - allowedFiles
  - dependsOn
  - requiredSkills
  - claudeMdHints
  - requiresTests
  - requiresBrowserValidation
  - requiresVisualRegression
  - browserChecks
  - runnerPolicy
  - commitPolicy
  - attemptBudget
  - fixReportPath

  Rules:

  - type drives visual-change policy
  - dependsOn is enforced by code, not documentation
  - attemptBudget defaults to 3
  - runnerPolicy defaults by wave, but can be overridden per unit
  - the registry must be intake-agnostic and must not assume every unit comes from a ledger finding
  - sourceRef may point to a ledger item, review doc section, scan result, accessibility output, or another declared upstream source

  ### 4. Enforce a no-restyling policy unless explicitly allowed

  This is a hard requirement.

  For bugfix-nonvisual and architecture units:

  - prompts must explicitly forbid cosmetic styling changes, layout redesign, copy refreshes, spacing polish, font/color changes, and visual
    cleanup unrelated to the ticket
  - visual changes are only allowed when strictly required to fix the defect
  - review output must include visualSurfaceChanged: yes/no
  - if visual regression is detected outside expected scope, the run fails closed

  For bugfix-visual-safe units:

  - only the minimum visual change required for the finding is allowed
  - prompts must still prohibit opportunistic polish

  ### 5. Runner stays tool-agnostic

  The architecture must not depend on Codex-specific behavior.

  The orchestrator should support a configurable runner adapter:

  - codex
  - claude

  Both adapters must support:

  - fresh process per run
  - non-interactive execution
  - prompt injection from the harness
  - deterministic exit code capture

  Default recommendation:

  - use codex for Waves 1, 2, and 5
  - require explicit opt-in for automated runner execution in Waves 3 and 4

  ### 6. Wave automation policy

  Not every wave should run with the same autonomy level.

  Default execution mode by wave:

  - Wave 1: supervised auto-run allowed
  - Wave 2: supervised auto-run allowed
  - Wave 3: interactive or approval-before-commit required
  - Wave 4: interactive or approval-before-commit required
  - Wave 5: supervised auto-run allowed

  Meaning:

  - all waves still stop after each remediation unit
  - Waves 3 and 4 require stronger human review before commit because they carry architectural and visual-regression risk

  Additional branch protocol:

  - waves execute sequentially
  - a Wave N+1 branch must not be created until the Wave N PR is merged
  - if the target branch is more than 10 commits behind its base, the orchestrator must warn and require an explicit stale-branch override such as `--allow-stale`
  - when a wave PR merges, the system must write a wave summary artifact before enabling the next wave

  ### 7. Exact orchestration lifecycle

  For one remediation unit, run this exact sequence:

  1. Run preflight
  2. Acquire lock file with:
      - remediation unit ID
      - PID
      - timestamp
      - wave
      - runner
  3. Run validate
  4. Resolve next
  5. Generate the prompt payload
  6. Launch fresh runner process for that remediation unit only
  7. On runner exit, diff the worktree against allowedFiles
  8. If diff violates allowlist, mark run invalid and stop
  9. Run required validations in this order:
      - npm run lint
      - npm run build
      - npm run test
      - browser validation if required
      - screenshot/visual regression if required
      - compare results against baseline and fail closed if tracked metrics are worse than baseline
  10. Write fix report or failure artifact
  11. Update tracker/status
      - when a unit reaches fixed, record commitSha on the tracker row
      - when a unit becomes blocked, record the unblock action required before retry
  12. Stage changes
  13. Generate draft commit message
  14. Print review packet
  15. Ask user whether to approve staging/commit and whether to continue
  16. Release lock and exit

  Rules:

  - empty input, timeout, or malformed input means stop
  - no subsequent unit may start automatically
  - the orchestrator must never silently skip a failed validation
  - validation flake retries must be tracked separately from agent attempts
  - validation steps may retry up to 2 times for flake handling before the run is marked failed
  - only deterministic failures consume an agent attempt
  - if the attempt budget is exceeded, the unit moves to blocked and cannot be retried until a human rewrites the fix direction, splits the unit, or marks it deferred

  ### 8. Commit policy

  Do not auto-commit by default across the board.

  Default:

  - auto-stage on successful validation
  - generate draft commit message
  - require explicit human approval before commit

  Optional relaxed mode for low-risk units:

  - Wave 1, 2, and 5 may allow auto-commit if the user enables it
  - auto-committed runs must include provenance tagging

  Commit provenance requirements:

  - include a trailer like Remediation-Run-Id: <uuid>
  - include runner name
  - mark auto-generated commits explicitly
  - include prompt template version in artifacts and runtime metadata

  ### 9. Add interrupt safety and stale-lock recovery

  The system must fail safely if interrupted.

  Required behaviors:

  - if a run is interrupted, the unit is marked crashed or equivalent runtime failure state in persisted artifacts
  - startup must detect stale locks
  - stale lock auto-clear is allowed only when the recorded PID is no longer alive and the lock age exceeds the threshold
  - default stale threshold: 2 hours

  The system must never leave an ambiguous “in-progress but maybe dead” state.

  ### 10. Add environmental preflight and baseline capture

  Before the first remediation run, the system must verify the environment and capture the baseline.

  Preflight checks:

  - supported Node version
  - working tree status policy is satisfied
  - required files exist
  - dependencies are installed
  - baseline npm run lint passes or baseline warning count is recorded
  - baseline npm run build passes
  - runner binary exists
  - browser validation tooling exists
  - open non-3000 dev port can be found or started

  Baseline snapshot must record:

  - git SHA
  - lint result or warning count
  - build result
  - visual snapshot set for required routes/viewports if visual regression protection is enabled

  Per-unit pass criteria then become:

  - no worse than baseline on tracked metrics
  - all unit-specific checks pass

  Hard rule:

  - if lint warnings exceed baseline, the run fails
  - if build status regresses relative to baseline, the run fails
  - baseline comparison is enforcement logic, not reporting-only metadata

  ### 11. Persist both successes and failures

  Terminal output is not enough.

  Persisted artifacts required:

  - fix report for successful runs
  - failure artifact for failed or invalid runs
  - latest review packet
  - lock file
  - baseline snapshot
  - prompt template version
  - wave summary artifact when a wave closes

  Failure artifacts must include:

  - program ID
  - remediation unit ID
  - timestamp
  - runner
  - changed files
  - failing checks
  - short failure summary
  - agent attempt count
  - validation retry count
  - whether the worktree was left staged or unstaged
  - prompt template version
  - commit SHA if one exists

  ### 12. Add rollback and rejection handling

  Approved does not mean irreversible.

  The execution spec must define:

  - how to revert a previously committed remediation unit
  - how to mark tracker state after rejection
  - how to relock the unit for another attempt
  - how to preserve the rejected commit SHA in the artifact trail
  - how blocked state is cleared after attempt-budget exhaustion
  - how a rewritten fix direction or unit split is recorded before retries resume

  ## Public Interfaces / Types

  ### Runtime result

  The orchestrator must emit a structured result for every run:

  - programId
  - unitId
  - runId
  - runner
  - mode
  - attemptNumber
  - validationRetryCount
  - changedFiles
  - allowlistOk
  - lintOk
  - buildOk
  - testOk
  - browserOk
  - visualRegressionOk
  - reportWritten
  - trackerUpdated
  - statusUpdated
  - staged
  - commitApproved
  - commitSha
  - promptTemplateVersion
  - visualSurfaceChanged
  - finalState: passed, failed, blocked, invalid, crashed
  - nextUnit

  ### Review packet

  The user-facing approval summary must include:

  - remediation unit ID and title
  - unit type
  - files changed
  - whether any visual surface changed
  - validation results
  - screenshot diff result if applicable
  - draft commit message
  - prompt template version
  - artifact paths
  - next eligible unit
  - explicit prompt: approve commit?, then continue to next unit?

  ## Test Plan

  ### Harness tests

  Add tests for:

  - registry parsing
  - intake-agnostic source metadata handling
  - dependency enforcement
  - composite-unit handling
  - allowlist enforcement
  - stale lock detection
  - drift detection across ledger/tracker/tickets/status
  - prompt generation includes correct skill and constraint set
  - visual policy selection from unit type


  Required scenarios:

  1. successful low-risk unit run with staging and approval prompt
  2. non-allowlisted file touched, run becomes invalid
  3. lint failure
  4. build failure
  5. test failure
  6. browser validation failure
  7. screenshot diff failure for Wave 3 or 4 unit
  8. interrupted run leaves persisted failure artifact and recoverable state
  9. stale lock detection and safe unlock
  10. dependency violation prevents selection of next unit
  11. empty approval input exits cleanly
  12. attempt budget exceeded after three failed tries
  13. nonvisual unit reports unexpected visual change and fails closed
  14. lint or build regression against baseline fails even if the unit-specific fix otherwise passes
  15. validation flake retries are counted separately from agent attempts
  16. Wave N+1 branch creation is blocked until Wave N is merged

  ### Baseline and regression tests

  Add one integration-style test for:

  - preflight creates baseline snapshot
  - a unit run compares against that baseline
  - the review packet shows pass/fail relative to baseline
  - the run fails when tracked metrics exceed baseline

  ## Assumptions and Defaults

  - The runner is configurable; architecture must remain runner-agnostic.
  - codex is the likely primary runner for low-risk units, but not baked into the design.
  - Waves 3 and 4 are more supervised than Waves 1, 2, and 5.
  - Default policy is stage-only plus human approval before commit.
  - Nonvisual tickets must preserve appearance unless the finding explicitly requires visual change.
  - Fresh context means one new CLI process per remediation unit.
  - The orchestration loop is optional; one-unit execution is the required primitive.
  - Composite units must be declared before scaffolding begins; no ad hoc pairing during execution.
  - Finance is the first concrete program, but the core registry and artifact model must remain source-agnostic.
