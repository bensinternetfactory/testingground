# Project Transfer Phase Prompts

## Purpose

These are copy-paste kickoff prompts for Claude or Codex to execute the TowLoans marketing site migration one phase at a time.

Use these with:

- `plans/project-transfer/project-transfer-spec.md`
- `plans/project-transfer/project-transfer-dependency-matrix.md`
- `plans/project-transfer/project-transfer-source-checklist.md`
- `plans/project-transfer/project-transfer-destination-checklist.md`
- `plans/project-transfer/project-transfer-copy-manifest.md`
- `plans/project-transfer/project-transfer-phase-gates.md`
- `plans/project-transfer/project-transfer-execution-log.md`
- `plans/project-transfer/project-transfer-go-no-go.md`
- `plans/project-transfer/project-transfer-rollback-plan.md`
- `plans/project-transfer/project-transfer-resume-protocol.md`
- `plans/project-transfer/project-transfer-destination-prompt.md`

## Universal rules for every phase

- Read `project-transfer-execution-log.md` first — find the most recent entry, note the phase, status, gate decision, and next required action
- Confirm the active phase in `project-transfer-phase-gates.md` matches the execution log before doing any work
- Mark only the active phase in `project-transfer-phase-gates.md`
- Do only the work allowed in that phase — no early work on later phases
- Update `project-transfer-phase-gates.md` and `project-transfer-execution-log.md` in the same batch as the implementation or analysis work
- Do not check off any gate item without matching evidence recorded in the execution log
- Update the "Active Phase" marker only after the current phase's gate decision is `GO`
- Do not advance to the next phase unless the current phase gate is fully satisfied
- If any required check fails, evidence is missing, or any state is `Unverified`, blocked, or inconsistent, stop with a `NO-GO`
- If resuming a previously started phase, read the execution log first to identify what was already completed, what evidence exists, and what remains before continuing
- Use `project-transfer-resume-protocol.md` if you need to pause and resume later — record the mandatory stop summary before ending
- Record exact commands, artifact references, and search queries in the execution log; do not mark a box complete without matching evidence

---

## Pre-Start Readiness Prompt

```text
Act as a pre-start review agent for the TowLoans marketing site migration. Do not
execute any migration phase. Do not mark any phase active. Do not edit production
code. Do not touch the destination repo. Read only:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-dependency-matrix.md
- plans/project-transfer/project-transfer-source-checklist.md
- plans/project-transfer/project-transfer-destination-checklist.md
- plans/project-transfer/project-transfer-copy-manifest.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md
- plans/project-transfer/project-transfer-go-no-go.md
- plans/project-transfer/project-transfer-resume-protocol.md
- plans/project-transfer/project-transfer-phase-prompts.md

Produce one readiness report that answers:

1. What is the current active phase according to the phase-gates file?
2. Does the execution log agree with the active-phase marker? If not, what is the
   discrepancy?
3. What is the gate decision for the most recently completed phase?
4. What is the next required action from the execution log?
5. Are there any open blockers or NO-GO decisions?
6. Are the artifact files internally consistent (spec, gates, log, resume protocol
   all agree on phasing rules, evidence requirements, and active-phase semantics)?
7. Are there any gaps in the planning artifacts that would block safe execution?
8. Which phase is authorized to start next, and what are its exact preconditions?

Call out any NO-GO blockers clearly. If the docs are not clean enough to begin
execution safely, say so directly.

End with a readiness decision: READY TO START PHASE [N] or NO-GO — [reason].
```

---

## Phase 1 Prompt — Source Inventory and Dependency Extraction

```text
Act as the migration execution agent for the TowLoans project transfer. Execute
only Phase 1 using:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-dependency-matrix.md
- plans/project-transfer/project-transfer-source-checklist.md
- plans/project-transfer/project-transfer-copy-manifest.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md

Before doing any work, read those files. Confirm that Phase 0's gate is GO and
Phase 1 is the only active phase in project-transfer-phase-gates.md. If the
execution log shows Phase 1 was previously started, identify what was completed
and what remains before continuing.

Perform only work allowed in Phase 1:

1. Walk source checklist items SC-01 through SC-20 — mark each pass/fail with
   evidence.
2. Verify dependency matrix against actual imports — spot-check at minimum 10
   import chains and record the exact files and imports checked.
3. Verify copy manifest against actual file tree — confirm every listed file
   exists and every excluded file is correctly excluded.
4. Run source build (npm run build), lint (npm run lint), and tests if available —
   record results.
5. Flag any source checklist failures as blockers or accepted risks.
6. Record all findings in the execution log using the full entry template.

Do not begin destination-side work. Do not execute the destination prompt. Do not
copy files to the destination.

Update the Phase 1 checklist in project-transfer-phase-gates.md and record a
full evidence entry in project-transfer-execution-log.md in the same batch.

Evaluate the Phase 1 gate. If all hard-blocker source checklist items pass, the
dependency matrix reflects actual code, the copy manifest is consistent, and the
source builds and lints cleanly, mark GO and update the active-phase marker to
Phase 2. Otherwise stop with NO-GO and document the specific blockers.
```

---

## Phase 2 Prompt — Destination Inventory

```text
Act as the migration execution agent for the TowLoans project transfer. Execute
only Phase 2 using:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-destination-prompt.md
- plans/project-transfer/project-transfer-destination-checklist.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md

Before doing any work, read those files. Confirm that Phase 1's gate is GO and
Phase 2 is the only active phase. If Phase 1 is not GO, stop immediately — do
not execute the destination prompt.

Perform only work allowed in Phase 2:

1. Execute the destination prompt in the destination repo context.
2. Create the migration branch from the destination default branch.
3. Record baseline build/lint/test results on the new branch (DC-03).
4. Document destination answers for all unknowns U1–U12 from the spec.
5. Complete destination checklist items DC-01 through DC-03.
6. Record all findings in the execution log.

Do not begin compatibility analysis. Do not copy any source files.

Update the Phase 2 checklist in project-transfer-phase-gates.md and record a
full evidence entry in project-transfer-execution-log.md in the same batch.

Evaluate the Phase 2 gate. If the migration branch exists and is clean, baseline
checks pass, and all unknowns U1–U12 have concrete answers (or are flagged
Unverified with a verification method), mark GO and update the active-phase
marker to Phase 3. Otherwise stop with NO-GO and document the specific blockers.
```

---

## Phase 3 Prompt — Compatibility and Collision Analysis

```text
Act as the migration execution agent for the TowLoans project transfer. Execute
only Phase 3 using:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-dependency-matrix.md
- plans/project-transfer/project-transfer-destination-checklist.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md

Before doing any work, read those files. Confirm that Phase 2's gate is GO and
Phase 3 is the only active phase. Confirm that the destination inventory from
Phase 2 is recorded in the execution log.

Perform only work allowed in Phase 3:

1. Route collision check (DC-04) — compare all source URLs against destination
   routes.
2. Layout/provider compatibility check (DC-05) — map destination provider tree;
   identify PreApprovalDrawerRoot insertion point.
3. Alias/path compatibility check (DC-06).
4. Styling/design-system compatibility check (DC-07) — Tailwind version, CSS
   variable namespaces.
5. Auth/session compatibility check (DC-08).
6. Convex compatibility check (DC-09).
7. Environment variable check (DC-10).
8. Runtime/deployment check (DC-11).
9. Observability check (DC-12).
10. Package version comparison (DC-13).
11. shadcn/ui configuration check (DC-14).
12. next.config comparison (DC-15).
13. Public asset conventions check (DC-16).
14. Update dependency matrix dispositions based on findings.
15. Record all findings in the execution log.

Do not begin transfer design. Do not copy any source files.

Update the Phase 3 checklist in project-transfer-phase-gates.md and record a
full evidence entry in project-transfer-execution-log.md in the same batch.

Evaluate the Phase 3 gate. If no unresolved route collisions remain, layout
insertion point is identified, Tailwind compatibility plan exists, auth/middleware
does not block marketing routes, Convex isolation is confirmed, and all
hard-blocker destination checklist items pass or have resolution plans, mark GO
and update the active-phase marker to Phase 4. Otherwise stop with NO-GO and
document the specific blockers.
```

---

## Phase 4 Prompt — Transfer Design and Adaptation Map

```text
Act as the migration execution agent for the TowLoans project transfer. Execute
only Phase 4 using:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-dependency-matrix.md
- plans/project-transfer/project-transfer-copy-manifest.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md

Before doing any work, read those files. Confirm that Phase 3's gate is GO and
Phase 4 is the only active phase.

Perform only work allowed in Phase 4:

1. For each "Transfer with adaptation" item in the dependency matrix: define the
   specific adaptation needed.
2. For each "Map to existing" item: identify the destination equivalent and the
   mapping strategy.
3. Define the smallest viable migration unit (Phase 5 scope) — which files, which
   routes, which dependencies.
4. Define the incremental expansion batches (Phase 6 scope) — batch boundaries,
   batch order, per-batch verification plan.
5. Document the post-copy reconciliation sequence from the copy manifest with
   destination-specific details.
6. Define the verification plan for each batch.
7. Record all decisions in the execution log.

Do not copy any source files. Do not begin code transfer.

Update the Phase 4 checklist in project-transfer-phase-gates.md and record a
full evidence entry in project-transfer-execution-log.md in the same batch.

Evaluate the Phase 4 gate. If every "Transfer with adaptation" item has a
concrete adaptation plan, Phase 5 scope is defined, Phase 6 batches are defined,
and the post-copy reconciliation sequence is complete, mark GO and update the
active-phase marker to Phase 5. Otherwise stop with NO-GO and document the
specific blockers.
```

---

## Phase 5 Prompt — Smallest Viable Migration Unit

```text
Act as the migration execution agent for the TowLoans project transfer. Execute
only Phase 5 using:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-copy-manifest.md
- plans/project-transfer/project-transfer-dependency-matrix.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md

Before doing any work, read those files. Confirm that Phase 4's gate is GO and
Phase 5 is the only active phase. Confirm that the migration branch is up to date
with the destination default branch.

Perform only work allowed in Phase 5:

1. Copy files from the copy manifest's "Required for smallest viable unit" column.
2. Execute post-copy reconciliation steps from the copy manifest.
3. Resolve import path issues.
4. Install missing npm packages.
5. Run tsc --noEmit — fix type errors.
6. Run destination lint — fix lint errors.
7. Run next build — fix build errors.
8. Start dev server — verify homepage renders.
9. Browser verification: homepage loads, navigation works, CTA clicks work.
10. Browser verification: pre-approval drawer opens via hash entry
    (#get-pre-approved).
11. Browser verification: pre-approval drawer opens via LeadCta click.
12. Browser verification: drawer amount slider functions, continue button
    navigates.
13. Browser verification: no console errors.
14. Run destination test suite — confirm no regressions.
15. Record all results in the execution log.

Do not transfer remaining routes. Do not begin Phase 6 batches.

Update the Phase 5 checklist in project-transfer-phase-gates.md and record a
full evidence entry in project-transfer-execution-log.md in the same batch.

Evaluate the Phase 5 gate. If the homepage renders correctly, navigation is
functional, at least one CTA click works, the pre-approval drawer opens and
functions, the build passes, no existing test regressions occur, and no console
errors appear, mark GO and update the active-phase marker to Phase 6. Otherwise
stop with NO-GO and document the specific blockers.
```

---

## Phase 6 Prompt — Incremental Expansion

```text
Act as the migration execution agent for the TowLoans project transfer. Execute
only Phase 6 using:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-copy-manifest.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md

Before doing any work, read those files. Confirm that Phase 5's gate is GO and
Phase 6 is the only active phase.

Perform only work allowed in Phase 6. Transfer remaining routes in batches as
defined in the Phase 4 adaptation map. Execute one batch at a time.

Recommended batch order (from Phase 4 plan):
- Batch 6a: About page + MinimalNavPage-based resource pages
- Batch 6b: Program pages (ProgramPageShell + program configs + section blocks)
- Batch 6c: Financing pages (EquipmentFinancingPageShell + financing configs +
  hero variants)
- Batch 6d: Calculator page (Calculator component + calculator data)

Per-batch execution:
1. Copy batch files from the copy manifest.
2. Resolve import path issues.
3. Run tsc --noEmit.
4. Run destination lint.
5. Run next build.
6. Browser verification: each transferred page renders.
7. Browser verification: page-specific interactions work (CTA, pre-approval,
   sections).
8. Browser verification: no console errors.
9. Run destination test suite — no regressions.
10. Record batch results in the execution log before starting the next batch.

Do not combine batches. Do not skip browser verification for any batch.

After all batches are complete, update the Phase 6 checklist in
project-transfer-phase-gates.md and record final evidence in
project-transfer-execution-log.md in the same batch.

Evaluate the Phase 6 gate. If all pages in all batches render correctly, the
build passes, no test regressions occur, and no console errors appear on any
transferred page, mark GO and update the active-phase marker to Phase 7.
Otherwise stop with NO-GO and document the specific blockers.
```

---

## Phase 7 Prompt — Pre-Merge Validation

```text
Act as the migration execution agent for the TowLoans project transfer. Execute
only Phase 7 using:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-go-no-go.md
- plans/project-transfer/project-transfer-rollback-plan.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md

Before doing any work, read those files. Confirm that Phase 6's gate is GO (all
batches complete) and Phase 7 is the only active phase.

Perform only work allowed in Phase 7:

1. Run full destination test suite.
2. Run next build — clean build with zero warnings (or only pre-existing
   warnings).
3. Run full lint.
4. Browser verification: visit every transferred page — confirm render.
5. Browser verification: visit every pre-existing destination page — confirm no
   regression.
6. Browser verification: test pre-approval drawer from at least 3 different entry
   points.
7. Browser verification: test navigation between transferred and existing pages.
8. Browser verification: test error and loading states (if possible to trigger).
9. Review project-transfer-go-no-go.md — answer every question.
10. Review project-transfer-rollback-plan.md — confirm readiness.
11. Confirm branch hygiene (DC-02).
12. Record all results in the execution log.

Do not merge the branch. Do not begin rollback preparation beyond review.

Update the Phase 7 checklist in project-transfer-phase-gates.md and record a
full evidence entry in project-transfer-execution-log.md in the same batch.

Evaluate the Phase 7 gate. If all go/no-go items are resolved, build/lint/tests
pass, every transferred page is verified in the browser, no regressions exist on
existing destination pages, and the rollback plan is reviewed and ready, mark GO
and update the active-phase marker to Phase 8. Otherwise stop with NO-GO and
document the specific blockers.
```

---

## Phase 8 Prompt — Merge Decision and Rollback Readiness

```text
Act as the migration execution agent for the TowLoans project transfer. Execute
only Phase 8 using:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-go-no-go.md
- plans/project-transfer/project-transfer-rollback-plan.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md

Before doing any work, read those files. Confirm that Phase 7's gate is GO and
Phase 8 is the only active phase.

Perform only work allowed in Phase 8:

1. Final review of execution log — confirm all phases have GO decisions.
2. Confirm rollback plan is actionable (know exactly what to do if merge causes
   issues).
3. Merge migration branch to destination default branch.
4. Run post-merge build and deploy (if applicable).
5. Monitor for errors/regressions post-merge.
6. Record merge commit SHA and post-merge status in the execution log.

Update the Phase 8 checklist in project-transfer-phase-gates.md and record a
full evidence entry in project-transfer-execution-log.md in the same batch.

Evaluate the Phase 8 gate. If post-merge build passes, post-merge deployment is
successful (if applicable), and no critical errors appear in the first monitoring
window, mark COMPLETE. If critical errors appear, initiate rollback per
project-transfer-rollback-plan.md, record the rollback in the execution log, and
mark ROLLBACK.
```

---

## Optional General Kickoff Prompt

```text
Act as the migration execution agent for the TowLoans project transfer. Read:

- plans/project-transfer/project-transfer-spec.md
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md
- plans/project-transfer/project-transfer-phase-prompts.md

Do not choose a phase implicitly. First identify the currently authorized phase
from the phase-gates file, confirm it matches the execution log, mark only that
phase as active, and state the exact gate criteria you must satisfy before you can
stop. Then execute only that phase, update the phase gate checklist and execution
log in the same batch, and stop with either GO or NO-GO for that phase. Do not
advance phases automatically.
```

---

## Final Review Prompt

```text
Act as a migration auditor. Your job is to verify — not execute — that the
TowLoans project transfer is structurally complete.

Read:
- plans/project-transfer/project-transfer-phase-gates.md
- plans/project-transfer/project-transfer-execution-log.md
- plans/project-transfer/project-transfer-go-no-go.md

Then verify:

1. Every Phase 0 through Phase 8 checklist item is checked.
2. The Active Phase section shows "Migration Complete" or equivalent.
3. The execution log has dated evidence entries for every phase.
4. The go/no-go checklist is fully answered with evidence references.
5. The merge commit SHA is recorded.
6. Post-merge build and deployment status are recorded.
7. No open NO-GO blockers remain in the execution log.

Report PASS or FAIL for each check with a one-line explanation for any FAIL.
If all checks pass, declare the migration COMPLETE.
```
