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

## System Interaction Invariants

These invariants apply to every phase from Phase 2 onward. No phase may pass if any are violated.

- All canonical CTA surfaces (`CtaLink`, `LeadCta`, `CtaButton`, and any compatibility-backed CTA still in service) must use the existing `usePressFeedback` + motion pressed-state pattern from `lib/press-feedback.tsx`, the same system already active on the drawer continue button in `PreApprovalDrawerView.tsx:486`.
- No CTA surface may be accepted based only on DOM `.click()` proof for touch-first behavior. Tier 1 (automated `touchstart`/`pointerdown` tests) and Tier 2 (agent-browser at mobile viewport) are required before any phase gate closes. Tier 3 (real device tap by human) is required before the CTA class is marked accepted.
- Every CTA class changed in a phase must have Tier 1 + Tier 2 evidence before the phase gate closes. Entries with only Tier 1 + Tier 2 are `code-verified, pending device acceptance`.
- Haptics adapter lifecycle must be verified for every CTA class — commit-phase trigger via `web-haptics`, cancel suppression, and `try/catch` failure isolation matching `lib/press-feedback.tsx:118`.
- Browser validation entries must declare interaction source per `CTA-INV-33`.
- See `CTA-INV-28` through `CTA-INV-33` in the verification matrix for the full requirement definitions and evidence standards.

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

- [x] Phase 0 gate passed.

Execution checklist:

- [x] `features/cta/contract.ts` added or updated.
- [x] `features/cta/lead-entry.ts` added or updated.
- [x] `features/cta/client.tsx` added or updated.
- [x] No broad production caller cutover was required in this phase.
- [x] Server-safe boundary verification completed.
- [x] Pre-approval contract reuse verification completed.
- [x] Shared press-feedback compatibility plan recorded.
- [x] Direct `usePressFeedback` consumers outside the wrapper remain verified.
- [x] Direct pre-approval trigger builders outside the wrapper remain verified.
- [x] `@/features/cta/*` resolution verified.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with evidence for `CTA-INV-12` `CTA-INV-13` `CTA-INV-14` `CTA-INV-17` `CTA-INV-18` `CTA-INV-25` `CTA-INV-26`.

Go / no-go gate:

- [x] Go: canonical modules compile and legacy CTA behavior is unchanged.
- [x] No-go conditions checked: no forced caller migration, no broken deep imports, no accidental pre-approval contract fork, no broken adjacent consumers.

## Phase 2: Convert `RippleCtaLink` into a Compatibility Facade

Preconditions:

- [x] Phase 1 gate passed.

Execution checklist:

- [x] `RippleCtaLink` delegates to canonical CTA runtime instead of owning the canonical behavior.
- [x] `next/link` `legacyBehavior` removed.
- [x] `next/link` `passHref` removed.
- [x] Disabled compatibility behavior preserved.
- [x] Pre-approval trigger attribute emission preserved.
- [x] Legacy analytics payload compatibility preserved.
- [x] Analytics failure isolation verified.
- [x] Haptics failure isolation verified.
- [x] Live inventory search confirmed there is no production `RippleCtaLink` caller with an `http(s)` destination; external browser validation is not applicable in this phase.
- [x] Browser validation completed for affected CTA paths.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with evidence for `CTA-INV-01` `CTA-INV-03` `CTA-INV-04` `CTA-INV-10` `CTA-INV-11` `CTA-INV-15` `CTA-INV-19` and relevant baseline invariants.

Go / no-go gate:

- [x] Go: the compatibility facade points at canonical logic and preserves caller behavior.
- [x] No-go conditions checked: no lost pre-approval attributes, no duplicate commit regression, no analytics-blocked navigation, no haptics-coupled commit path.

## Phase 3: Migrate Revenue-Critical Callers First

Preconditions:

- [x] Phase 2 gate passed.

Execution checklist:

- [x] Only one revenue-critical caller batch migrated at a time.
- [x] Migrated callers recorded in the execution log.
- [x] Hero CTA migration status recorded (`2026-04-06`: [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) mobile primary CTA migrated to canonical CTA surfaces while hero tertiary links remained on the compatibility wrapper; [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx) primary CTA migrated to canonical CTA surfaces; [FramedTileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx) shared framed-hero primary CTA migrated to canonical CTA surfaces while [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx) tertiary action cards remained on the compatibility wrapper).
- [x] Sticky-nav CTA migration status recorded (`2026-04-06`: [NavHeaderActions.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx) desktop primary CTA migrated to canonical `LeadCta`, and [NavMobileOverlay.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx) mobile overlay primary CTA migrated to canonical `LeadCta`).
- [x] Lead-entry CTA migration status recorded (`2026-04-06`: [EquipmentClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx) financing-page closing CTA migrated to canonical `LeadCta` / `CtaLink` surfaces, [EquipmentClosingCtaTrucks.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx) program-page closing tiles migrated to canonical `LeadCta` / `CtaLink` surfaces, and the final homepage lead-entry caller [ClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx) now renders through canonical `LeadCta` / `CtaLink` surfaces with the existing responsive copy preserved).
- [x] Browser validation completed for each changed caller batch.
- [x] `npm run lint` passed after each batch.
- [x] `npm run build` passed after each batch.
- [x] Execution log updated with matrix IDs covered by each batch.

Go / no-go gate:

- [x] Go: revenue-critical callers use canonical CTA surfaces and untouched callers still work.
- [x] No-go conditions checked: no broad uncontrolled migration, no wrapper deletion by assumption, no mixed redesign work.

## Phase 4: Migrate Remaining Callers and Retire Shared Compatibility Usage

Preconditions:

- [x] Phase 3 gate passed.

Execution checklist:

- [x] Remaining section CTA callers migrated in controlled batches.
- [x] Card CTA callers using legacy `cardId` usage migrated or compatibility-tracked.
- [x] Deep import callers migrated.
- [x] Shared `lib/press-feedback.tsx` ownership decision implemented and verified if touched.
- [x] New CTA work uses canonical feature modules only.
- [x] Browser validation completed for each changed caller batch.
- [x] `npm run lint` passed after each batch.
- [x] `npm run build` passed after each batch.
- [x] Execution log updated with matrix IDs covered by each batch.

Go / no-go gate:

- [x] Go: remaining production callers are either canonicalized or explicitly tracked for final cleanup.
- [x] No-go conditions checked: no untracked wrapper-only prop dependence, no broken non-CTA press-feedback consumers.

## Phase 5: Remove Wrapper-Only Semantics

Preconditions:

- [x] Phase 4 gate passed.
- [x] Search confirms no new production work is landing on the compatibility wrapper.

Execution checklist:

- [x] Wrapper-only prop names removed from production callers.
- [x] Legacy analytics payload dependence removed or intentionally isolated with a dated follow-up.
- [x] Compatibility-only `children` patterns removed from production callers where not explicitly justified.
- [x] Search confirms no remaining production imports of the wrapper barrel.
- [x] Search confirms no remaining production deep imports of `RippleCtaLink`.
- [x] Closure evidence exists for every deep import, `children` override, and `cardId` site from `plans/ctabutton/checklist.md`.
- [x] Final user-facing regression checks passed for affected routes.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with search results and final evidence for the phase.

Go / no-go gate:

- [x] Go: wrapper-only semantics are gone from production usage and the legacy directory is ready for deletion.
- [x] No-go conditions checked: no remaining production wrapper imports, no remaining wrapper-only prop dependence, no evidence gaps, no missing closure table entries.

## Phase 6: Delete the Legacy Wrapper and Finalize the Public API

Preconditions:

- [x] Phase 5 gate passed.
- [x] Search confirms no remaining production consumers of `components/ui/ripple-cta-link`.

Execution checklist:

- [ ] `components/ui/ripple-cta-link/` deleted.
- [ ] Final CTA public API inventory reviewed against the production API document.
- [ ] CTA feature documentation updated to match the final filesystem.
- [ ] Final search-based removal checks passed.
- [ ] Touch-first verification complete for every canonical CTA class: Tier 1 + Tier 2 evidence exists and Tier 3 (real device tap) entries recorded in execution log (`CTA-INV-28` `CTA-INV-29` `CTA-INV-30`).
- [ ] Haptics lifecycle verified for every canonical CTA class: commit trigger, cancel suppression, failure isolation (`CTA-INV-31` `CTA-INV-32`).
- [ ] Every browser validation entry in the execution log declares interaction source (`CTA-INV-33`).
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated with final evidence and removal search results.

Go / no-go gate:

- [ ] Go: the public CTA surface is fully feature-owned, touch-first on all surfaces, and no legacy wrapper remains.
- [ ] No-go conditions checked: no residual production imports, no stale docs, no final build regression, no CTA class missing Tier 3 touch evidence, no CTA class missing haptics lifecycle proof.
