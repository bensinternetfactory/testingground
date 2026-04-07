# Phase Gates — Operational Runbook

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Evidence ledger:** `project-transfer-execution-log.md`
> **Resume protocol:** `project-transfer-resume-protocol.md`
> **Phase prompts:** `project-transfer-phase-prompts.md`
>
> **Rule:** Exactly one phase is active at a time. Work on Phase N+1 must not begin until Phase N's go/no-go gate is `GO`. If any required item cannot be checked, stop and record the blocker. The phase gate checklist and the execution log must be updated in the same batch. The "Active Phase" marker changes only after a `GO` gate decision.

---

## Active Phase

**Phase 6 — Incremental Expansion**

---

## Phase 0: Scope Lock and Migration Charter

### Purpose
Establish agreement on what is being migrated, who owns the work, and what conventions will be followed.

### Preconditions
- Source repo is accessible and on a known commit
- Destination repo is accessible
- This artifact set exists and has been reviewed

### Execution Checklist

- [x] Review `project-transfer-spec.md` — confirm scope, exclusions, and risks
- [x] Confirm the source commit SHA that this planning is based on
- [x] Confirm destination repo URL and default branch name
- [x] Agree on migration branch name (recommended: `migration/towloans-marketing`)
- [x] Assign migration ownership (who executes, who reviews)
- [x] Confirm the destination prompt (`project-transfer-destination-prompt.md`) will be used for Phase 2

### Required Evidence/Artifacts
- Reviewed spec with any amendments recorded
- Source commit SHA recorded in execution log
- Destination repo identified
- Ownership assigned

### Go / No-Go Gate
- [x] Scope is agreed upon — no open scope questions
- [x] Source commit is pinned
- [x] Destination repo is identified and accessible
- [x] Ownership is assigned

**Decision:** `GO`
**Recorded in execution log:** `2026-04-07` (Entry 2)

---

## Phase 1: Source Inventory and Dependency Extraction

### Purpose
Complete the source-side analysis. Populate and verify the dependency matrix, source checklist, and copy manifest.

### Preconditions
- Phase 0 gate is `GO`

### Execution Checklist

- [x] Walk source checklist items SC-01 through SC-20 — mark each pass/fail
- [x] Verify dependency matrix against actual imports (spot-check at minimum 10 import chains)
- [x] Verify copy manifest against actual file tree
- [x] Run source tests: `npm run test` — record results
- [x] Run source build: `npm run build` — record results
- [x] Run source lint: `npm run lint` — record results
- [x] Flag any source checklist failures as blockers or accepted risks
- [x] Record all findings in execution log

### Required Evidence/Artifacts
- Source checklist with all items marked
- Dependency matrix verified (spot-checks recorded)
- Copy manifest verified
- Source test/build/lint results
- Execution log entry

### Go / No-Go Gate
- [x] All hard-blocker source checklist items pass
- [x] Dependency matrix reflects actual code (verified by import tracing)
- [x] Copy manifest is consistent with dependency matrix
- [x] Source builds and lints cleanly
- [x] No unresolved hard blockers

**Decision:** `GO`
**Recorded in execution log:** `2026-04-07` (Entry 3)

---

## Phase 2: Destination Inventory on a New Branch

### Purpose
Analyze the destination repo. Answer all unknowns U1–U12 from the spec. Create the migration branch.

### Preconditions
- Phase 1 gate is `GO`
- `project-transfer-destination-prompt.md` is ready to execute in the destination repo

### Execution Checklist

- [x] Execute destination prompt in destination repo context
- [x] Create migration branch from destination default branch
- [x] Record baseline build/lint/test results on new branch (DC-03)
- [x] Document destination answers for all unknowns U1–U12
- [x] Complete destination checklist items DC-01 through DC-03
- [x] Record all findings in execution log

### Required Evidence/Artifacts
- Migration branch created (branch name and base commit recorded)
- Baseline build/lint/test pass confirmation
- Destination inventory answers for U1–U12
- Execution log entry

### Go / No-Go Gate
- [x] Migration branch exists and is clean
- [x] Baseline build/lint/test recorded (build PASS; lint and test have pre-existing failures documented as regression baseline — see accepted risk below)
- [x] All unknowns U1–U12 have concrete answers (or are flagged `Unverified` with verification method)
- [x] Destination checklist DC-01 through DC-03 pass

**Decision:** `GO`
**Recorded in execution log:** `2026-04-07` (Entry 4)

**Accepted risk:** Baseline lint has 7 pre-existing `@typescript-eslint` errors and tests have 13 pre-existing failures (7/15 suites fail). These exist on destination `main` before any migration work. Build passes cleanly. Pre-existing failure counts are documented as the regression-detection baseline.

---

## Phase 3: Compatibility and Collision Analysis

### Purpose
Cross-repo comparison. Identify blockers, required adaptations, and collision points.

### Preconditions
- Phase 2 gate is `GO`
- Destination inventory is complete

### Execution Checklist

- [x] Route collision check (DC-04) — compare all source URLs against destination routes
- [x] Layout/provider compatibility check (DC-05) — map destination provider tree; identify PreApprovalDrawerRoot insertion point
- [x] Alias/path compatibility check (DC-06)
- [x] Styling/design-system compatibility check (DC-07) — Tailwind version, CSS variable namespaces
- [x] Auth/session compatibility check (DC-08) — verify marketing routes are not auth-gated
- [x] Convex compatibility check (DC-09) — verify no accidental Convex coupling
- [x] Environment variable check (DC-10)
- [x] Runtime/deployment check (DC-11)
- [x] Observability check (DC-12)
- [x] Package version comparison (DC-13)
- [x] shadcn/ui configuration check (DC-14)
- [x] next.config comparison (DC-15)
- [x] Public asset conventions check (DC-16)
- [x] Update dependency matrix dispositions based on findings
- [x] Record all findings in execution log

### Required Evidence/Artifacts
- Destination checklist DC-04 through DC-16 completed
- Collision report (if any collisions found)
- Updated dependency matrix with final dispositions
- Adaptation requirements list
- Execution log entry

### Go / No-Go Gate
- [x] No unresolved route collisions
- [x] Layout insertion point for PreApprovalDrawerRoot identified
- [x] Tailwind compatibility plan exists (same version or adaptation strategy)
- [x] Auth/middleware does not block marketing routes (or exemption plan exists)
- [x] Convex isolation confirmed
- [x] All hard-blocker destination checklist items pass or have resolution plans
- [x] No `Blocker` dispositions remain in dependency matrix without a resolution

**Decision:** `GO`
**Recorded in execution log:** `2026-04-07` (Entry 5)

---

## Phase 4: Transfer Design and Adaptation Map

### Purpose
Define exactly what changes during copy and what changes after. Produce the adaptation map.

### Preconditions
- Phase 3 gate is `GO`

### Execution Checklist

- [x] For each "Transfer with adaptation" item in dependency matrix: define the specific adaptation
- [x] For each "Map to existing" item: identify the destination equivalent and mapping strategy
- [x] Define the smallest viable migration unit (Phase 5 scope)
- [x] Define the incremental expansion batches (Phase 6 scope)
- [x] Document the post-copy reconciliation sequence from copy manifest with destination-specific details
- [x] Define the verification plan for each batch (what to check, how to check)
- [x] Record all decisions in execution log

### Required Evidence/Artifacts
- Adaptation map (specific changes per dependency) — `project-transfer-adaptation-map.md`
- Phase 5 scope definition (which files, which routes) — adaptation map §3
- Phase 6 batch plan — adaptation map §4
- Post-copy reconciliation sequence with destination specifics — adaptation map §5
- Execution log entry — Entry 7

### Go / No-Go Gate
- [x] Every "Transfer with adaptation" item has a concrete adaptation plan
- [x] Phase 5 scope is defined and agreed upon
- [x] Phase 6 batches are defined
- [x] Post-copy reconciliation sequence is complete

**Decision:** `GO`
**Recorded in execution log:** `2026-04-07` (Entry 7)

---

## Phase 5: Smallest Viable Migration Unit

### Purpose
Transfer the minimum code needed to prove integration works. Recommended: homepage route + core dependencies (nav, footer, CTA, pre-approval drawer, shared UI).

### Preconditions
- Phase 4 gate is `GO`
- Migration branch is up to date with destination default branch

### Execution Checklist

- [x] Copy files from copy manifest "Required for smallest viable unit" column
- [x] Execute post-copy reconciliation steps from copy manifest
- [x] Resolve import path issues
- [x] Install missing npm packages
- [x] Run `tsc --noEmit` — fix type errors
- [x] Run destination lint — fix lint errors
- [x] Run `next build` — fix build errors
- [x] Start dev server — verify homepage renders
- [x] Browser verification: homepage loads, navigation works, CTA clicks work
- [x] Browser verification: pre-approval drawer opens via hash entry (`#get-pre-approved`)
- [x] Browser verification: pre-approval drawer opens via LeadCta click
- [x] Browser verification: drawer amount slider functions, continue button navigates
- [x] Browser verification: no console errors
- [x] Run destination test suite — confirm no regressions
- [x] Record all results in execution log

### Required Evidence/Artifacts
- TypeScript compilation result
- Build result
- Browser verification screenshots or descriptions
- Pre-approval drawer functional verification
- Test suite result (no regressions)
- Execution log entry

### Go / No-Go Gate
- [x] Homepage renders correctly in browser
- [x] Navigation is functional
- [x] At least one CTA click works
- [x] Pre-approval drawer opens and functions
- [x] Build passes
- [x] No existing test regressions
- [x] No console errors

**Decision:** `GO`
**Recorded in execution log:** `2026-04-07` (Entry 9)

---

## Phase 6: Incremental Expansion

### Purpose
Transfer remaining routes in batches. Each batch must be verified before the next begins.

### Preconditions
- Phase 5 gate is `GO`

### Recommended batch order

1. **Batch 6a:** About page + MinimalNavPage-based resource pages (low risk, thin pages)
2. **Batch 6b:** Program pages (ProgramPageShell + program configs + section blocks)
3. **Batch 6c:** Financing pages (EquipmentFinancingPageShell + financing configs + hero variants)
4. **Batch 6d:** Calculator page (Calculator component + calculator data)

### Per-batch execution checklist

- [ ] Copy batch files from copy manifest
- [ ] Resolve import path issues
- [ ] Run `tsc --noEmit`
- [ ] Run destination lint
- [ ] Run `next build`
- [ ] Browser verification: each transferred page renders
- [ ] Browser verification: page-specific interactions work (CTA, pre-approval, sections)
- [ ] Browser verification: no console errors
- [ ] Run destination test suite — no regressions
- [ ] Record batch results in execution log

### Required Evidence/Artifacts (per batch)
- Build result
- Browser verification for each page in batch
- Test result
- Execution log entry

### Go / No-Go Gate (per batch, and overall Phase 6)
- [ ] All pages in batch render correctly
- [ ] Build passes
- [ ] No test regressions
- [ ] No console errors on any transferred page

**Decision:** `_________` (GO / NO-GO)
**Recorded in execution log:** `_________` (date)

---

## Phase 7: Pre-Merge Validation

### Purpose
Full regression check across all transferred routes and existing destination routes.

### Preconditions
- Phase 6 gate is `GO` (all batches complete)

### Execution Checklist

- [ ] Run full destination test suite
- [ ] Run `next build` — clean build with zero warnings (or only pre-existing warnings)
- [ ] Run full lint
- [ ] Browser verification: visit every transferred page — confirm render
- [ ] Browser verification: visit every pre-existing destination page — confirm no regression
- [ ] Browser verification: test pre-approval drawer from at least 3 different entry points
- [ ] Browser verification: test navigation between transferred and existing pages
- [ ] Browser verification: test error and loading states (if possible to trigger)
- [ ] Review `project-transfer-go-no-go.md` — answer every question
- [ ] Review `project-transfer-rollback-plan.md` — confirm readiness
- [ ] Confirm branch hygiene (DC-02)
- [ ] Record all results in execution log

### Required Evidence/Artifacts
- Full test suite result
- Full build result
- Full lint result
- Browser verification log (all pages)
- Completed go/no-go checklist
- Rollback plan confirmed
- Execution log entry

### Go / No-Go Gate
- [ ] All items in `project-transfer-go-no-go.md` are resolved
- [ ] Build, lint, and tests pass
- [ ] Every transferred page verified in browser
- [ ] No regressions on existing destination pages
- [ ] Rollback plan reviewed and ready

**Decision:** `_________` (GO / NO-GO)
**Recorded in execution log:** `_________` (date)

---

## Phase 8: Merge Decision and Rollback Readiness

### Purpose
Final merge or rollback decision. Post-merge monitoring setup.

### Preconditions
- Phase 7 gate is `GO`

### Execution Checklist

- [ ] Final review of execution log — all phases have `GO` decisions
- [ ] Confirm rollback plan is actionable (know exactly what to do if merge causes issues)
- [ ] Merge migration branch to destination default branch
- [ ] Run post-merge build and deploy (if applicable)
- [ ] Monitor for errors/regressions post-merge
- [ ] Record merge commit and post-merge status in execution log

### Required Evidence/Artifacts
- Merge commit SHA
- Post-merge build result
- Post-merge deployment status (if applicable)
- Monitoring confirmation
- Execution log entry

### Go / No-Go Gate (post-merge)
- [ ] Post-merge build passes
- [ ] Post-merge deployment successful (if applicable)
- [ ] No critical errors in first monitoring window
- [ ] Migration declared complete, or rollback initiated per rollback plan

**Decision:** `_________` (COMPLETE / ROLLBACK)
**Recorded in execution log:** `_________` (date)
