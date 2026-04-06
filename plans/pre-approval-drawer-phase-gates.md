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
- [ ] `Phase 1` active
- [ ] `Phase 2` active
- [ ] `Phase 3` active
- [ ] `Phase 4` active
- [ ] `Phase 5` active
- [ ] `Phase 6` active
- [ ] `Phase 7` active
- [ ] `Phase 8` active
- [ ] `Phase 9` active
- [ ] `Phase 10` active

Exactly one phase should be marked active while work is in progress.
When no phase work is in progress, every checkbox in this section should be unchecked.

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
- [x] `features/pre-approval/drawer/client.tsx` added or updated.
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

- [x] Phase 1 gate passed.

Execution checklist:

- [x] Legacy trigger schema normalization verified.
- [x] New trigger schema normalization verified.
- [x] Mixed-schema precedence verified.
- [x] Legacy hero `truckType` mapping verified.
- [x] Compatibility defaults constrained to the legacy-only path.
- [x] Direct-hash compatibility origin verified.
- [x] Route-hash compatibility origin verified.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Browser check completed for legacy CTA path if user-facing behavior changed.
- [x] Execution log updated with evidence for `PA-INV-09` `PA-INV-10` `PA-INV-11` `PA-INV-21` and relevant baseline invariants.

Go / no-go gate:

- [x] Go: one canonical normalization path exists and dual-schema coexistence is proven.
- [x] No-go conditions checked: no legacy support removed, no caller forced to migrate, no analytics IDs inferred from label text.

## Phase 3: Wrap the Existing Runtime in the New Root Contract

Preconditions:

- [x] Phase 2 gate passed.

Execution checklist:

- [x] Fresh `sessionId` generation verified.
- [x] Replacement-open semantics verified.
- [x] Default close reason verified.
- [x] Backdrop close reason verified.
- [x] Escape close reason verified.
- [x] Close-button reason verified.
- [x] Drag-dismiss reason verified.
- [x] Route-change reason verified.
- [x] Event payload shape verified.
- [x] `onEvent` failure isolation verified.
- [x] Runtime error isolation verified.
- [x] Touch interaction checked during mount/scroll-lock handoff.
- [x] Continue behavior verified on desktop.
- [x] Continue behavior verified on mobile.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with evidence for `PA-INV-12` `PA-INV-13` `PA-INV-14` `PA-INV-15` `PA-INV-16` `PA-INV-25`.

Go / no-go gate:

- [x] Go: runtime contract changed without visible UX regression.
- [x] No-go conditions checked: no mount-location drift, no animated-close regression, no focus/motion regression.

## Phase 4: Convert the Compatibility Facade

Preconditions:

- [x] Phase 3 gate passed.

Execution checklist:

- [x] Legacy export names still compile.
- [x] Legacy deep-import module paths still compile.
- [x] Legacy CSS import path still resolves.
- [x] Facade points to the intended feature-owned surface.
- [x] Browser validation completed for affected CTA paths.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with evidence for `PA-INV-17` `PA-INV-22` `PA-INV-23` and any affected user-facing invariants.

Go / no-go gate:

- [x] Go: compatibility facade is in place and import stability is preserved.
- [x] No-go conditions checked: no forced consumer rewrites, no facade-time runtime regression.

## Phase 5: Migrate Callers Incrementally

Batch note:

- Batch-level `GO` / `NO-GO` decisions are recorded in [`plans/pre-approval-drawer-execution-log.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-execution-log.md).
- The unchecked items below remain intentionally open until their later Phase 5 caller batches are executed.
- Do not mark the Phase 5 go/no-go gate complete until every planned Phase 5 caller batch is verified.

Preconditions:

- [x] Phase 4 gate passed.

Execution checklist:

- [x] Only one planned caller batch migrated at a time.
- [x] Migrated callers recorded in the execution log.
- [x] `RippleCtaLink` migration status recorded.
- [x] Nav/footer helper migration status recorded.
- [x] Route-only consumer migration status recorded.
- [x] Hero preset migration status recorded.
- [x] Tile-selection helper migration status recorded.
- [x] Shared CSS consumer migration status recorded.
- [x] Route/page config migration status recorded.
- [x] Browser validation completed for each changed caller batch.
- [x] `npm run lint` passed after each batch.
- [x] `npm run build` passed after each batch.
- [x] Execution log updated with matrix IDs covered by the batch.

Go / no-go gate:

- [x] Go: migrated callers use the canonical contract and untouched callers still work.
- [x] No-go conditions checked: no broad uncontrolled migration, no early compatibility removal, no mixed-in redesign work, no unmigrated route-only/deep-import/CSS consumers assumed away.

## Phase 6: Remove Legacy Semantics

Preconditions:

- [x] Phase 5 gate passed.
- [x] Search confirms no remaining production callers depend on legacy authoring APIs.
- [x] Search confirms no remaining deep imports of legacy `config.ts` or `triggers.ts`.
- [x] Search confirms no remaining imports of the legacy CSS path.

Execution checklist:

- [x] Legacy `source === "hero"` business rule removed.
- [x] Legacy `DrawerTriggerPayload` authoring type removed.
- [x] Legacy `data-drawer-*` primary emission removed.
- [x] Compatibility layer deletion or shrink plan recorded.
- [x] Legacy deep-import compatibility files removed or intentionally retained with a dated follow-up.
- [x] Legacy CSS compatibility path removed or intentionally retained with a dated follow-up.
- [x] Route-contract clamping implemented and verified.
- [x] Final automated regression checks passed.
- [x] Final desktop browser validation passed.
- [x] Final mobile browser validation passed.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Execution log updated with final evidence and removal search results.

Go / no-go gate:

- [x] Go: public surface matches the intended production API with no regression.
- [x] No-go conditions checked: no remaining legacy consumers, no evidence gaps, no removal by assumption.

## Phase 7: Eliminate Legacy Barrel Consumers

Preconditions:

- [ ] Phase 6 gate passed (already satisfied).
- [ ] Architectural review completed and findings recorded in execution log.

Execution checklist:

- [ ] All financing config files (`rollback-financing/config.ts`, `wrecker-financing/config.ts`, `rotator-financing/config.ts`, `used-tow-truck-financing/config.ts`) rewritten to import `preApprovalEntryHash` from `@/features/pre-approval/drawer/server` instead of `DRAWER_HASH` from the barrel.
- [ ] `features/pre-approval/__tests__/public-api.test.ts` barrel-parity assertions removed or rewritten to test canonical paths only.
- [ ] `rg -n "from.*@/components/ui/pre-approval-drawer[\"';]" app/ components/sections/ features/ --glob '!**/__tests__/**'` returns zero results (barrel import search — uses the `from` clause, not `DRAWER_HASH`, because imports are multi-line). Test-only references in legacy test files are acceptable if those tests will move in Phase 9.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Execution log updated.

Go / no-go gate:

- [ ] Go: the barrel has zero production consumers and can be deleted without breaking any import.
- [ ] No-go conditions checked: no remaining production barrel imports, no build failure.

## Phase 8: Move Runtime Files into Feature Directory

Preconditions:

- [ ] Phase 7 gate passed.

Execution checklist:

- [ ] `DrawerContext.tsx` moved to `features/pre-approval/drawer/runtime/context.tsx`.
- [ ] `DrawerHashListener.tsx` moved to `features/pre-approval/drawer/runtime/hash-listener.tsx`.
- [ ] `RouteResetListener.tsx` moved to `features/pre-approval/drawer/runtime/route-sync.tsx`.
- [ ] `scroll-lock.ts` moved to `features/pre-approval/drawer/runtime/scroll-lock.ts`.
- [ ] `features/pre-approval/drawer/client.tsx` imports updated to reference the moved runtime modules while intentionally leaving the temporary `PreApprovalDrawer` import on the legacy UI path for Phase 9.
- [ ] Moved runtime files' internal imports updated (e.g., `scroll-lock` import in context).
- [ ] `rg -n "@/components/ui/pre-approval-drawer" features/pre-approval --glob '!**/__tests__/**'` returns exactly one allowed match: `features/pre-approval/drawer/client.tsx` importing `PreApprovalDrawer` from the legacy UI path pending Phase 9. No other feature-owned file imports from the legacy UI directory.
- [ ] `vi.mock` paths in `features/pre-approval/__tests__/drawer-root.test.tsx` and `features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx` updated from `@/components/ui/pre-approval-drawer/*` to the new `@/features/pre-approval/drawer/runtime/*` paths. These existing feature tests mock the runtime modules being moved in this phase.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] Targeted test suite passed (runtime and drawer-root tests).
- [ ] Execution log updated.

Go / no-go gate:

- [ ] Go: all runtime files live under `features/pre-approval/drawer/runtime/` and build cleanly.
- [ ] No-go conditions checked: no circular imports, no broken test, and no remaining feature-to-legacy UI dependency other than the temporary `PreApprovalDrawer` import explicitly deferred to Phase 9.

## Phase 9: Move UI Files and Tests

Preconditions:

- [ ] Phase 8 gate passed.

Execution checklist:

- [ ] `PreApprovalDrawer.tsx` moved to `features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx`.
- [ ] `AmountSlider.tsx` moved to `features/pre-approval/drawer/ui/AmountSlider.tsx`.
- [ ] All test files from `components/ui/pre-approval-drawer/__tests__/` moved to `features/pre-approval/__tests__/`.
- [ ] Import paths in moved test files updated to reference canonical locations.
- [ ] Import paths in moved UI files updated (e.g., `scroll-lock` import in drawer view, CSS import in AmountSlider).
- [ ] Runtime files updated to import from new UI paths where needed.
- [ ] `grep -rn "from.*@/components/ui" features/pre-approval/` returns zero results.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] `npm test -- features/pre-approval` passed (all moved tests green from the consolidated feature-owned suite).
- [ ] Browser validation on desktop: same-page hash open, amount adjust, continue navigation.
- [ ] Browser validation on mobile: direct-load hash open, close behavior, continue navigation.
- [ ] Execution log updated with test, browser, and search evidence.

Go / no-go gate:

- [ ] Go: all UI and test files live under `features/pre-approval/` and the consolidated feature suite plus browser validation pass.
- [ ] No-go conditions checked: no visual regression, no test failure, no missing file.

## Phase 10: Delete Legacy Directory and Finalize Documentation

Preconditions:

- [ ] Phase 9 gate passed.

Execution checklist:

- [ ] `components/ui/pre-approval-drawer/DrawerProvider.tsx` deleted (dead code — zero consumers).
- [ ] `components/ui/pre-approval-drawer/MarketingDrawerProvider.tsx` deleted (dead wrapper — layout imports `PreApprovalDrawerRoot` directly).
- [ ] `components/ui/pre-approval-drawer/index.ts` deleted.
- [ ] `components/ui/pre-approval-drawer/CLAUDE.md` deleted.
- [ ] `components/ui/pre-approval-drawer/` directory fully removed.
- [ ] External `CLAUDE.md` files referencing the old barrel path updated (known: `components/sections/heroes/hero-gallery/CLAUDE.md` references `@/components/ui/pre-approval-drawer`). Run `rg "components/ui/pre-approval-drawer" --glob '**/CLAUDE.md'` to find all.
- [ ] New `features/pre-approval/CLAUDE.md` written documenting the final architecture: module table, public API, usage snippet, server/client boundaries, test coverage.
- [ ] `find features/pre-approval/__tests__ -maxdepth 1 -type f | sort` confirms the consolidated feature test suite exists under `features/pre-approval/__tests__/`.
- [ ] `npm run lint` passed.
- [ ] `npm run build` passed.
- [ ] `npm test -- features/pre-approval` passed.
- [ ] `grep -r "components/ui/pre-approval-drawer" app components features lib` returns zero results.
- [ ] `grep -rn "from.*@/components/ui" features/pre-approval/` returns zero results (broad scope — catches any `components/ui/` dependency, not just `pre-approval-drawer`).
- [ ] `grep -rn "export.*from" features/pre-approval/ --include='*.ts' --include='*.tsx' --exclude-dir=__tests__` returns zero re-export barrels.
- [ ] Manual review confirms `features/pre-approval/contract.ts`, `features/pre-approval/routes.ts`, `features/pre-approval/selection.ts`, `features/pre-approval/drawer/server.ts`, and `features/pre-approval/drawer/client.tsx` are canonical modules, not alias mappings or compatibility wrappers.
- [ ] `ls features/pre-approval/*.ts features/pre-approval/drawer/*.{ts,tsx}` matches exactly: `contract.ts`, `routes.ts`, `selection.ts`, `drawer/server.ts`, `drawer/client.tsx` (plus expected `runtime/` and `ui/` subdirectory files).
- [ ] Execution log updated with final evidence.

Go / no-go gate:

- [ ] Go: `components/ui/pre-approval-drawer/` does not exist. Every import resolves to `@/features/pre-approval/`. Documentation matches the actual architecture.
- [ ] No-go conditions checked: no dangling imports, no build failure, no undocumented public API.

## Migration Completion Criteria

When Phase 10 is complete, all of the following must be true:

- [ ] `components/ui/pre-approval-drawer/` does not exist.
- [ ] Every production import of pre-approval drawer functionality resolves to `@/features/pre-approval/`.
- [ ] No file under `features/pre-approval/` imports from `components/ui/`.
- [ ] There are zero re-export barrels, zero alias mappings, zero compatibility wrappers.
- [ ] The public API is exactly: `contract.ts`, `routes.ts`, `selection.ts`, `drawer/server.ts`, `drawer/client.tsx`.
- [ ] One `CLAUDE.md` at `features/pre-approval/` documents the actual architecture.
- [ ] One consolidated test suite under `features/pre-approval/__tests__/` covers the feature.
- [ ] `npm test -- features/pre-approval`, `npm run lint`, and `npm run build` pass.

## Blockers

Record unresolved blockers here before attempting to advance a phase.

- Phase 6 was declared complete on 2026-04-06. An architectural review on 2026-04-06 found that the migration is structurally incomplete: runtime/UI files remain in `components/ui/pre-approval-drawer/`, creating a bidirectional dependency between the two directories. Phases 7–10 address this. See the 2026-04-06 architectural review entry in the execution log for full findings.
