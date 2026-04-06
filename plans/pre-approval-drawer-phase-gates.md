# Pre-Approval Drawer Phase Gates

## Purpose

This is the operational runbook for executing the migration.

Rules:

- Work only one active phase at a time.
- Do not start a later phase until the current phase exit checklist is complete.
- Update this file and `plans/pre-approval-drawer-execution-log.md` in the same batch as the implementation work.
- If a required item cannot be checked, stop and record the blocker.

## Active Phase

- [ ] `Phase 0` active
- [x] `Phase 1` active
- [ ] `Phase 2` active
- [ ] `Phase 3` active
- [ ] `Phase 4` active
- [ ] `Phase 5` active
- [ ] `Phase 6` active

Exactly one phase should be marked active while work is in progress.

## Phase 0: Freeze Behavior

Preconditions:

- [x] Current drawer behavior is treated as baseline.
- [x] Current CTA flows can be reproduced locally.

Execution checklist:

- [x] Baseline tests exist for same-page hash open.
- [x] Baseline tests exist for direct-load hash open.
- [x] Baseline tests exist for continue URL shape.
- [x] Baseline tests exist for hero truck-type handoff.
- [x] Baseline tests exist for route-sync reopen/reset behavior.
- [x] Baseline tests exist for focus and close interactions.
- [x] Desktop browser validation completed.
- [x] Mobile browser validation completed.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with evidence for `PA-INV-01` `PA-INV-02` `PA-INV-03` `PA-INV-04` `PA-INV-05` `PA-INV-06` `PA-INV-07` `PA-INV-08`.

Go / no-go gate:

- [x] Go: all baseline invariants have evidence.
- [x] No-go conditions checked: no missing evidence, no known regressions, no unverified core flow.

## Phase 1: Introduce Canonical Feature Modules

Preconditions:

- [x] Phase 0 gate passed.

Execution checklist:

- [x] `features/pre-approval/contract.ts` added or updated.
- [x] `features/pre-approval/routes.ts` added or updated.
- [x] `features/pre-approval/drawer/server.ts` added or updated.
- [x] `features/pre-approval/drawer/client.ts` added or updated.
- [x] No consumer cutover was required in this phase.
- [x] Route helper verification completed.
- [x] Server-safe boundary verification completed.
- [x] `@/features/pre-approval/*` resolution verified.
- [x] Legacy deep-import compatibility plan recorded.
- [x] Legacy CSS compatibility plan recorded.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with evidence for `PA-INV-17` `PA-INV-18` `PA-INV-19` `PA-INV-22` `PA-INV-23` `PA-INV-27`.

Go / no-go gate:

- [x] Go: canonical modules compile and legacy behavior is unchanged.
- [x] No-go conditions checked: no runtime swap, no slider behavior change, no consumer breakage, no unresolved deep-import or CSS-path breakage.

## Phase 2: Add Compatibility Parser and Session Normalizer

Preconditions:

- [ ] Phase 1 gate passed.

Execution checklist:

- [ ] Legacy trigger schema normalization verified.
- [ ] New trigger schema normalization verified.
- [ ] Mixed-schema precedence verified.
- [ ] Legacy hero `truckType` mapping verified.
- [ ] Compatibility defaults constrained to the legacy-only path.
- [ ] Direct-hash compatibility origin verified.
- [ ] Route-hash compatibility origin verified.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Browser check completed for legacy CTA path if user-facing behavior changed.
- [ ] Execution log updated with evidence for `PA-INV-09` `PA-INV-10` `PA-INV-11` `PA-INV-21` and relevant baseline invariants.

Go / no-go gate:

- [ ] Go: one canonical normalization path exists and dual-schema coexistence is proven.
- [ ] No-go conditions checked: no legacy support removed, no caller forced to migrate, no analytics IDs inferred from label text.

## Phase 3: Wrap the Existing Runtime in the New Root Contract

Preconditions:

- [ ] Phase 2 gate passed.

Execution checklist:

- [ ] Fresh `sessionId` generation verified.
- [ ] Replacement-open semantics verified.
- [ ] Default close reason verified.
- [ ] Backdrop close reason verified.
- [ ] Escape close reason verified.
- [ ] Close-button reason verified.
- [ ] Drag-dismiss reason verified.
- [ ] Route-change reason verified.
- [ ] Event payload shape verified.
- [ ] `onEvent` failure isolation verified.
- [ ] Runtime error isolation verified.
- [ ] Touch interaction checked during mount/scroll-lock handoff.
- [ ] Continue behavior verified on desktop.
- [ ] Continue behavior verified on mobile.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated with evidence for `PA-INV-12` `PA-INV-13` `PA-INV-14` `PA-INV-15` `PA-INV-16` `PA-INV-25`.

Go / no-go gate:

- [ ] Go: runtime contract changed without visible UX regression.
- [ ] No-go conditions checked: no mount-location drift, no animated-close regression, no focus/motion regression.

## Phase 4: Convert the Compatibility Facade

Preconditions:

- [ ] Phase 3 gate passed.

Execution checklist:

- [ ] Legacy export names still compile.
- [ ] Legacy deep-import module paths still compile.
- [ ] Legacy CSS import path still resolves.
- [ ] Facade points to the intended feature-owned surface.
- [ ] Browser validation completed for affected CTA paths.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated with evidence for `PA-INV-17` `PA-INV-22` `PA-INV-23` and any affected user-facing invariants.

Go / no-go gate:

- [ ] Go: compatibility facade is in place and import stability is preserved.
- [ ] No-go conditions checked: no forced consumer rewrites, no facade-time runtime regression.

## Phase 5: Migrate Callers Incrementally

Preconditions:

- [ ] Phase 4 gate passed.

Execution checklist:

- [ ] Only one planned caller batch migrated at a time.
- [ ] Migrated callers recorded in the execution log.
- [ ] `RippleCtaLink` migration status recorded.
- [ ] Nav/footer helper migration status recorded.
- [ ] Route-only consumer migration status recorded.
- [ ] Hero preset migration status recorded.
- [ ] Tile-selection helper migration status recorded.
- [ ] Shared CSS consumer migration status recorded.
- [ ] Route/page config migration status recorded.
- [ ] Browser validation completed for each changed caller batch.
- [ ] `npm run lint` passed after each batch.
- [ ] `npm run build` passed after each batch.
- [ ] Execution log updated with matrix IDs covered by the batch.

Go / no-go gate:

- [ ] Go: migrated callers use the canonical contract and untouched callers still work.
- [ ] No-go conditions checked: no broad uncontrolled migration, no early compatibility removal, no mixed-in redesign work, no unmigrated route-only/deep-import/CSS consumers assumed away.

## Phase 6: Remove Legacy Semantics

Preconditions:

- [ ] Phase 5 gate passed.
- [ ] Search confirms no remaining production callers depend on legacy authoring APIs.
- [ ] Search confirms no remaining deep imports of legacy `config.ts` or `triggers.ts`.
- [ ] Search confirms no remaining imports of the legacy CSS path.

Execution checklist:

- [ ] Legacy `source === "hero"` business rule removed.
- [ ] Legacy `DrawerTriggerPayload` authoring type removed.
- [ ] Legacy `data-drawer-*` primary emission removed.
- [ ] Compatibility layer deletion or shrink plan recorded.
- [ ] Legacy deep-import compatibility files removed or intentionally retained with a dated follow-up.
- [ ] Legacy CSS compatibility path removed or intentionally retained with a dated follow-up.
- [ ] Route-contract clamping implemented and verified.
- [ ] Final automated regression checks passed.
- [ ] Final desktop browser validation passed.
- [ ] Final mobile browser validation passed.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated with final evidence and removal search results.

Go / no-go gate:

- [ ] Go: public surface matches the intended production API with no regression.
- [ ] No-go conditions checked: no remaining legacy consumers, no evidence gaps, no removal by assumption.

## Blockers

Record unresolved blockers here before attempting to advance a phase.

- None recorded.
