# CTA Button Phase Gates

## Purpose

This is the operational runbook for executing the CTA migration.

Rules:

- Work only one active phase at a time.
- Do not start a later phase until the current phase exit checklist is complete.
- Update this file and `plans/ctabutton/cta-button-execution-log.md` in the same batch as the implementation work.
- If a required item cannot be checked, stop and record the blocker.
- Use `plans/ctabutton/checklist.md` as the live migration boundary when counts, callers, or protected surfaces are in question.

## Active Phase

- [ ] `Phase 0` active
- [ ] `Phase 1` active
- [ ] `Phase 2` active
- [ ] `Phase 3` active
- [ ] `Phase 4` active
- [ ] `Phase 5` active
- [ ] `Phase 6` active

Exactly one phase should be marked active while work is in progress.
When no phase work is in progress, every checkbox in this section should be unchecked.

## Phase 0: Freeze Current CTA Behavior

Preconditions:

- [x] Current `RippleCtaLink` behavior is treated as baseline.
- [x] Current production CTA flows can be reproduced locally.

Execution checklist:

- [x] `plans/ctabutton/checklist.md` matches the live CTA inventory.
- [x] Baseline tests exist for internal hash-link CTA behavior.
- [x] Baseline tests exist for external navigation CTA behavior.
- [x] Baseline tests exist for disabled CTA rendering.
- [x] Baseline tests exist for pre-approval trigger attribute emission.
- [x] Baseline tests exist for analytics identity when `children` override visible copy.
- [x] Baseline tests exist for touch or pointer cancel behavior.
- [x] Baseline tests exist for duplicate-commit prevention.
- [x] Baseline tests exist for reduced-motion press behavior.
- [x] Desktop browser validation completed.
- [x] Mobile browser validation completed.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with evidence for `CTA-INV-02` `CTA-INV-03` `CTA-INV-04` `CTA-INV-05` `CTA-INV-06` `CTA-INV-07` `CTA-INV-08` `CTA-INV-09`.

Go / no-go gate:

- [x] Go: baseline CTA invariants have evidence.
- [x] No-go conditions checked: no missing evidence, no unverified lead-entry path, no unverified press-cancel path, no false press-on-down baseline.

## Phase 1: Introduce Canonical Feature Modules

Preconditions:

- [ ] Phase 0 gate passed.

Execution checklist:

- [ ] `features/cta/contract.ts` added or updated.
- [ ] `features/cta/lead-entry.ts` added or updated.
- [ ] `features/cta/client.tsx` added or updated.
- [ ] No broad production caller cutover was required in this phase.
- [ ] Server-safe boundary verification completed.
- [ ] Pre-approval contract reuse verification completed.
- [ ] Shared press-feedback compatibility plan recorded.
- [ ] Direct `usePressFeedback` consumers outside the wrapper remain verified.
- [ ] Direct pre-approval trigger builders outside the wrapper remain verified.
- [ ] `@/features/cta/*` resolution verified.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated with evidence for `CTA-INV-12` `CTA-INV-13` `CTA-INV-14` `CTA-INV-17` `CTA-INV-18` `CTA-INV-25` `CTA-INV-26`.

Go / no-go gate:

- [ ] Go: canonical modules compile and legacy CTA behavior is unchanged.
- [ ] No-go conditions checked: no forced caller migration, no broken deep imports, no accidental pre-approval contract fork, no broken adjacent consumers.

## Phase 2: Convert `RippleCtaLink` into a Compatibility Facade

Preconditions:

- [ ] Phase 1 gate passed.

Execution checklist:

- [ ] `RippleCtaLink` delegates to canonical CTA runtime instead of owning the canonical behavior.
- [ ] `next/link` `legacyBehavior` removed.
- [ ] `next/link` `passHref` removed.
- [ ] Disabled compatibility behavior preserved.
- [ ] Pre-approval trigger attribute emission preserved.
- [ ] Legacy analytics payload compatibility preserved.
- [ ] Analytics failure isolation verified.
- [ ] Haptics failure isolation verified.
- [ ] Browser validation completed for affected CTA paths.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated with evidence for `CTA-INV-01` `CTA-INV-03` `CTA-INV-04` `CTA-INV-10` `CTA-INV-11` `CTA-INV-15` `CTA-INV-19` and relevant baseline invariants.

Go / no-go gate:

- [ ] Go: the compatibility facade points at canonical logic and preserves caller behavior.
- [ ] No-go conditions checked: no lost pre-approval attributes, no duplicate commit regression, no analytics-blocked navigation, no haptics-coupled commit path.

## Phase 3: Migrate Revenue-Critical Callers First

Preconditions:

- [ ] Phase 2 gate passed.

Execution checklist:

- [ ] Only one revenue-critical caller batch migrated at a time.
- [ ] Migrated callers recorded in the execution log.
- [ ] Hero CTA migration status recorded.
- [ ] Sticky-nav CTA migration status recorded.
- [ ] Lead-entry CTA migration status recorded.
- [ ] Browser validation completed for each changed caller batch.
- [ ] `npm run lint` passed after each batch.
- [ ] `npm run build` passed after each batch.
- [ ] Execution log updated with matrix IDs covered by each batch.

Go / no-go gate:

- [ ] Go: revenue-critical callers use canonical CTA surfaces and untouched callers still work.
- [ ] No-go conditions checked: no broad uncontrolled migration, no wrapper deletion by assumption, no mixed redesign work.

## Phase 4: Migrate Remaining Callers and Retire Shared Compatibility Usage

Preconditions:

- [ ] Phase 3 gate passed.

Execution checklist:

- [ ] Remaining section CTA callers migrated in controlled batches.
- [ ] Card CTA callers using legacy `cardId` usage migrated or compatibility-tracked.
- [ ] Deep import callers migrated.
- [ ] Shared `lib/press-feedback.tsx` ownership decision implemented and verified if touched.
- [ ] New CTA work uses canonical feature modules only.
- [ ] Browser validation completed for each changed caller batch.
- [ ] `npm run lint` passed after each batch.
- [ ] `npm run build` passed after each batch.
- [ ] Execution log updated with matrix IDs covered by each batch.

Go / no-go gate:

- [ ] Go: remaining production callers are either canonicalized or explicitly tracked for final cleanup.
- [ ] No-go conditions checked: no untracked wrapper-only prop dependence, no broken non-CTA press-feedback consumers.

## Phase 5: Remove Wrapper-Only Semantics

Preconditions:

- [ ] Phase 4 gate passed.
- [ ] Search confirms no new production work is landing on the compatibility wrapper.

Execution checklist:

- [ ] Wrapper-only prop names removed from production callers.
- [ ] Legacy analytics payload dependence removed or intentionally isolated with a dated follow-up.
- [ ] Compatibility-only `children` patterns removed from production callers where not explicitly justified.
- [ ] Search confirms no remaining production imports of the wrapper barrel.
- [ ] Search confirms no remaining production deep imports of `RippleCtaLink`.
- [ ] Closure evidence exists for every deep import, `children` override, and `cardId` site from `plans/ctabutton/checklist.md`.
- [ ] Final user-facing regression checks passed for affected routes.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated with search results and final evidence for the phase.

Go / no-go gate:

- [ ] Go: wrapper-only semantics are gone from production usage and the legacy directory is ready for deletion.
- [ ] No-go conditions checked: no remaining production wrapper imports, no remaining wrapper-only prop dependence, no evidence gaps, no missing closure table entries.

## Phase 6: Delete the Legacy Wrapper and Finalize the Public API

Preconditions:

- [ ] Phase 5 gate passed.
- [ ] Search confirms no remaining production consumers of `components/ui/ripple-cta-link`.

Execution checklist:

- [ ] `components/ui/ripple-cta-link/` deleted.
- [ ] Final CTA public API inventory reviewed against the production API document.
- [ ] CTA feature documentation updated to match the final filesystem.
- [ ] Final search-based removal checks passed.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated with final evidence and removal search results.

Go / no-go gate:

- [ ] Go: the public CTA surface is fully feature-owned and no legacy wrapper remains.
- [ ] No-go conditions checked: no residual production imports, no stale docs, no final build regression.
