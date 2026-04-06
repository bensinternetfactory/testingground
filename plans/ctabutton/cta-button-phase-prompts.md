# CTA Button Phase Prompts

## Purpose

These are copy-paste kickoff prompts for Claude or Codex to execute the CTA migration one phase at a time.

Use these with:

- `plans/ctabutton/cta-button-migration-spec.md`
- `plans/ctabutton/cta-button-production-api.md`
- `plans/ctabutton/cta-button-verification-matrix.md`
- `plans/ctabutton/cta-button-phase-gates.md`
- `plans/ctabutton/cta-button-execution-log.md`
- `plans/ctabutton/checklist.md`
- `components/ui/ripple-cta-link/CLAUDE.md`

Universal rules for every phase:

- read the execution log first if the phase was previously started
- do not execute migration phase work on `main`; use a dedicated CTA migration feature branch
- mark only the active phase in `plans/ctabutton/cta-button-phase-gates.md`
- do only the work allowed in that phase
- treat the verification matrix as authoritative
- treat `plans/ctabutton/checklist.md` as the live migration boundary when callers, deep imports, direct press-feedback consumers, direct trigger builders, `children` override sites, or `cardId` sites are in question
- update `plans/ctabutton/cta-button-phase-gates.md` and `plans/ctabutton/cta-button-execution-log.md` in the same batch as the implementation or verification work
- do not advance to the next phase unless the current phase gate is fully satisfied
- if any required check fails, browser evidence is missing, or any inventory question is unresolved, stop with `NO-GO`
- for user-facing phases, run browser validation against a non-`3000` `npm run dev` server, keep the same server running while validating desktop and mobile, and record route, viewport, trigger path, and observed result in the execution log
- record exact commands, matrix IDs, and search queries in the execution log; do not mark a box complete without matching evidence

## Final Overview Prompt

```text
Act as the pre-start review agent for the CTA button migration. Do not execute any migration phase yet. Do not mark any phase active. Do not edit production CTA code. Use only:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-production-api.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md
- plans/ctabutton/cta-button-phase-prompts.md
- components/ui/ripple-cta-link/CLAUDE.md

Before anything else, check the current git branch and worktree status. Confirm whether a dedicated CTA migration feature branch already exists and whether the current worktree is suitable to start from. Do not switch branches or edit files in this overview step unless explicitly asked.

Produce one final overview that answers:
- what this migration is doing and not doing
- which production surfaces are currently known to be affected
- which risks or unknowns still exist in the inventory
- which phase is authorized to start next
- what exact gate evidence is still missing before that phase can be closed
- what branch Phase 0 should start on, with a clear instruction that Phase 0 must not run on `main`
- what the first execution batch should be once the branch is confirmed

Call out any `NO-GO` blockers clearly. If the docs, inventory, or worktree state are not clean enough to begin, say so directly. End with a short readiness decision: `READY TO START PHASE 0` or `NO-GO`.
```

## Phase 0 Prompt

```text
Act as the migration execution agent for the CTA button migration. Execute only Phase 0 using:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-production-api.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md
- components/ui/ripple-cta-link/CLAUDE.md

Before editing code, confirm you are on the dedicated CTA migration feature branch for this work and not on `main`. If the dedicated branch does not exist yet, create it or switch to it before Phase 0 work starts, then record the branch name in the execution log. After branch verification, read those files and confirm Phase 0 is the only active phase. Perform only work allowed in Phase 0. Do not change CTA runtime behavior in Phase 0. Limit work to inventory reconciliation, baseline tests, test helpers, and browser validation needed to freeze the live behavior.

Establish and verify the current CTA baseline, including:
- internal hash-link CTA behavior
- external navigation CTA behavior
- disabled CTA rendering
- canonical pre-approval trigger attribute emission
- analytics identity when `children` overrides visible copy
- press lifecycle semantics: touch-down alone does not commit, click commits, drift cancel prevents commit, duplicate commit is suppressed, and reduced motion stays semantically correct
- keyboard activation semantics for representative link and button paths

Run the required checks, including desktop and mobile browser validation on representative user-facing CTA paths. Record dated evidence with matrix IDs `CTA-INV-02` `CTA-INV-03` `CTA-INV-04` `CTA-INV-05` `CTA-INV-06` `CTA-INV-07` `CTA-INV-08` `CTA-INV-09` in the execution log, including the verified branch name used for the batch. Update the Phase 0 checklist in plans/ctabutton/cta-button-phase-gates.md in the same batch. Do not advance to Phase 1 unless the Phase 0 gate is fully satisfied. If any required verification is missing, especially browser evidence for keyboard activation or press-cancel behavior, or if the work is not on the dedicated feature branch, stop and report `NO-GO`.
```

## Phase 1 Prompt

```text
Act as the migration execution agent for the CTA button migration. Execute only Phase 1 using:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-production-api.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md

Before editing code, confirm Phase 0 is complete and Phase 1 is the only active phase. Perform only work allowed in Phase 1. Introduce the smallest canonical feature-owned modules under `features/cta/` needed to start the migration without broad caller cutover.

Required outcomes for this phase:
- add or update `features/cta/contract.ts`
- add or update `features/cta/lead-entry.ts`
- add or update `features/cta/client.tsx`
- keep existing `@/components/ui/ripple-cta-link` barrel and deep imports compiling
- verify `@/features/cta/*` alias resolution
- preserve reuse of the existing pre-approval contract and attribute builders
- verify no CTA code manually constructs pre-approval query strings or trigger attributes
- preserve adjacent surfaces outside the wrapper, especially direct `usePressFeedback` consumers and direct pre-approval trigger builders

Do not migrate production callers broadly in this phase. Do not fork the pre-approval contract. Run the required checks, record dated evidence with matrix IDs `CTA-INV-12` `CTA-INV-13` `CTA-INV-14` `CTA-INV-17` `CTA-INV-18` `CTA-INV-25` `CTA-INV-26` in the execution log, and update the Phase 1 checklist in plans/ctabutton/cta-button-phase-gates.md in the same batch. Do not advance to Phase 2 unless the Phase 1 gate is fully satisfied. If any adjacent consumer breaks, any import path stops compiling, or any evidence is missing, stop and report `NO-GO`.
```

## Phase 2 Prompt

```text
Act as the migration execution agent for the CTA button migration. Execute only Phase 2 using:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-production-api.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md

Before editing code, confirm Phase 1 is complete and Phase 2 is the only active phase. Perform only work allowed in Phase 2. Convert `components/ui/ripple-cta-link/RippleCtaLink.tsx` into a compatibility facade that delegates to canonical CTA logic without changing caller-visible behavior.

Required outcomes for this phase:
- `RippleCtaLink` delegates to the canonical CTA runtime
- `next/link` `legacyBehavior` is removed
- `next/link` `passHref` is removed
- disabled compatibility behavior is preserved
- canonical pre-approval trigger attribute emission is preserved
- legacy analytics payload compatibility is preserved
- analytics failures do not block commit or navigation
- haptics failures do not block commit

This phase requires browser validation for affected user-facing CTA paths on desktop and mobile. Verify representative internal, external, and pre-approval CTA flows through the compatibility facade. Run the required checks, record dated evidence with matrix IDs `CTA-INV-01` `CTA-INV-03` `CTA-INV-04` `CTA-INV-10` `CTA-INV-11` `CTA-INV-15` `CTA-INV-19` plus any affected baseline invariants in the execution log, and update the Phase 2 checklist in plans/ctabutton/cta-button-phase-gates.md in the same batch. Do not advance to Phase 3 unless the Phase 2 gate is fully satisfied. If any behavior regression appears, any browser evidence is missing, or any compatibility mapping is unverified, stop and report `NO-GO`.
```

## Phase 3 Prompt

```text
Act as the migration execution agent for the CTA button migration. Execute only Phase 3 using:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md

Before editing code, confirm Phase 2 is complete and Phase 3 is the only active phase. Perform only work allowed in Phase 3. Migrate revenue-critical CTA callers first, in controlled batches, using the canonical CTA surfaces.

Hardstops for this phase:
- migrate only one caller batch at a time
- record the exact migrated caller files in the execution log
- keep untouched callers working through the compatibility layer
- do not mix redesign work, unrelated refactors, or wrapper deletion into this phase

Priority order for batches:
1. hero CTA callers
2. sticky-nav CTA callers
3. lead-entry CTA callers

After each batch, run the required targeted tests, `npm run lint`, `npm run build`, and desktop/mobile browser validation for the changed caller path. Record which matrix IDs were covered by that batch, update the Phase 3 checklist in plans/ctabutton/cta-button-phase-gates.md, and stop with `NO-GO` if any batch lacks browser evidence, introduces broad uncontrolled migration, or leaves the execution log without dated closure notes.
```

## Phase 4 Prompt

```text
Act as the migration execution agent for the CTA button migration. Execute only Phase 4 using:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md

Before editing code, confirm Phase 3 is complete and Phase 4 is the only active phase. Perform only work allowed in Phase 4. Migrate the remaining CTA callers in controlled batches and retire shared compatibility usage only where evidence exists.

Required outcomes for this phase:
- remaining section CTA callers migrated in controlled batches
- card CTA callers using legacy `cardId` either migrated or explicitly compatibility-tracked
- deep import callers migrated
- shared `lib/press-feedback.tsx` ownership decision implemented and verified if touched
- all new CTA work uses canonical feature modules only

Hardstops for this phase:
- keep one caller batch at a time
- do not delete the wrapper yet
- do not assume non-CTA `usePressFeedback` consumers are safe without verification
- if `lib/press-feedback.tsx` changes, rerun the adjacent-surface proof and browser validation for representative non-wrapper paths

Run the required checks after each batch, including desktop/mobile browser validation for the changed route, and record the exact matrix IDs, commands, and affected files in the execution log. Update the Phase 4 checklist in plans/ctabutton/cta-button-phase-gates.md in the same batch. Do not advance to Phase 5 unless the Phase 4 gate is fully satisfied. If any caller still depends on wrapper-only behavior without being tracked, any deep import remains unaccounted for, or any adjacent press-feedback consumer is unverified after shared-runtime changes, stop and report `NO-GO`.
```

## Phase 5 Prompt

```text
Act as the migration execution agent for the CTA button migration. Execute only Phase 5 using:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md

Before editing code, confirm Phase 4 is complete, search already shows no new production work landing on the compatibility wrapper, and Phase 5 is the only active phase. Perform only work allowed in Phase 5. Remove wrapper-only semantics from production callers and prove that every tracked wrapper dependency has explicit closure evidence.

Required outcomes for this phase:
- wrapper-only prop names removed from production callers
- legacy analytics payload dependence removed or intentionally isolated with a dated follow-up
- compatibility-only `children` patterns removed from production callers unless explicitly justified
- search confirms no remaining production imports of `@/components/ui/ripple-cta-link`
- search confirms no remaining production deep imports of `@/components/ui/ripple-cta-link/RippleCtaLink`
- closure evidence exists for every deep import, `children` override, and `cardId` site from `plans/ctabutton/checklist.md`

This phase requires final user-facing regression checks for affected routes. Run the required searches, tests, `npm run lint`, `npm run build`, and browser validation. Record the exact search queries and results in the execution log along with matrix IDs `CTA-INV-16` `CTA-INV-20` `CTA-INV-21` `CTA-INV-22` `CTA-INV-27` and any affected baseline invariants. Update the Phase 5 checklist in plans/ctabutton/cta-button-phase-gates.md in the same batch. Do not advance to Phase 6 unless the Phase 5 gate is fully satisfied. If any wrapper import remains, any checklist site lacks closure evidence, or any regression check is missing, stop and report `NO-GO`.
```

## Phase 6 Prompt

```text
Act as the migration execution agent for the CTA button migration. Execute only Phase 6 using:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-production-api.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md

Before editing code, confirm Phase 5 is complete, search already shows no remaining production consumers of `components/ui/ripple-cta-link`, and Phase 6 is the only active phase. Perform only work allowed in Phase 6. Delete the legacy wrapper and finalize the public CTA API.

Required outcomes for this phase:
- `components/ui/ripple-cta-link/` is deleted
- the final CTA public API inventory matches `plans/ctabutton/cta-button-production-api.md`
- CTA feature documentation matches the final filesystem
- final search-based removal checks pass

Run the final verification battery:
- `npm run lint`
- `npm run build`
- targeted removal searches for barrel imports and deep imports
- filesystem checks proving the legacy directory is gone
- manual review of the final public CTA modules against the production API document

Record dated evidence with matrix IDs `CTA-INV-21` `CTA-INV-22` `CTA-INV-23` `CTA-INV-24` and final removal-search results in the execution log. Update the Phase 6 checklist in plans/ctabutton/cta-button-phase-gates.md in the same batch. Declare `GO` only if the public CTA surface is fully feature-owned, the legacy directory is gone, the docs match the code, and all final checks pass. If any residual import, stale doc, or build failure remains, stop and report `NO-GO`.
```

## Final Merge-Back Prompt

```text
Act as the release and merge agent for the CTA button migration. Your job is to verify completion on the working branch and merge it back into `main` only if every gate is already closed cleanly.

Read:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-production-api.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md
- plans/ctabutton/cta-button-phase-prompts.md

Before merging, verify all of the following:
- every Phase 0 through Phase 6 checklist item is checked
- every checkbox under the Active Phase section is unchecked
- the execution log contains dated evidence for every completed phase with matrix IDs, commands, browser notes where required, and search results where required
- the execution log has no open `NO-GO` blocker that would invalidate final completion
- required browser evidence exists for every user-facing phase that demanded it
- `npm run lint` passes
- `npm run build` passes
- search confirms no remaining production imports of `@/components/ui/ripple-cta-link`
- search confirms no remaining production deep imports of `@/components/ui/ripple-cta-link/RippleCtaLink`
- filesystem check confirms `components/ui/ripple-cta-link/` does not exist
- the final CTA public API and documentation match the production API document

If any verification fails or any evidence is missing, stop and report `NO-GO`. Do not merge by assumption.

If every verification passes:
1. confirm the working tree is clean
2. switch to `main`
3. merge the completed CTA migration branch back into `main`
4. stop and report the merge result with the exact verification commands and searches used

Do not rewrite history, do not discard uncommitted changes, and do not merge if the branch still depends on undocumented follow-up work for required gate criteria.
```

## Optional General Kickoff Prompt

```text
Act as the migration execution agent for the CTA button migration. Read:
- plans/ctabutton/cta-button-migration-spec.md
- plans/ctabutton/cta-button-verification-matrix.md
- plans/ctabutton/cta-button-phase-gates.md
- plans/ctabutton/cta-button-execution-log.md
- plans/ctabutton/checklist.md
- plans/ctabutton/cta-button-phase-prompts.md

Do not choose a phase implicitly. First identify the currently authorized phase from the phase-gates file, mark only that phase as active, and state the exact gate criteria and matrix IDs that must be satisfied before you can stop. Then execute only that phase, update the phase gate checklist and execution log in the same batch, and stop with either `GO` or `NO-GO` for that phase. Do not advance phases automatically.
```
