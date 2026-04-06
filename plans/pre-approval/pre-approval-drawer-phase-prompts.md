# Pre-Approval Drawer Phase Prompts

## Purpose

These are copy-paste kickoff prompts for Claude or Codex to execute the pre-approval drawer migration one phase at a time.

Use these with:

- `plans/pre-approval-drawer-migration-spec.md`
- `plans/pre-approval-drawer-verification-matrix.md`
- `plans/pre-approval-drawer-phase-gates.md`
- `plans/pre-approval-drawer-execution-log.md`

Universal rules for every phase:

- mark only the active phase in `plans/pre-approval-drawer-phase-gates.md`
- do only the work allowed in that phase
- treat the verification matrix as authoritative
- update the execution log in the same batch as the implementation work
- do not advance to the next phase unless the current phase gate is fully satisfied
- if any required check fails or evidence is missing, stop with a `NO-GO`
- if resuming a previously started phase, read the execution log first to identify what was already completed, what evidence exists, and what remains before continuing

## Phase 0 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 0 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-production-api.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md
- components/ui/pre-approval-drawer/CLAUDE.md

Before editing code, read those files. Mark only Phase 0 as active. Perform only work allowed in Phase 0. Do not modify implementation code in Phase 0 — only tests and test helpers. Establish and verify the baseline behavior, including same-page hash open, direct-load hash open, continue URL shape, hero truck-type handoff, route-sync reopen/reset behavior, and focus/close behavior. Run the required checks, record dated evidence with matrix IDs in the execution log, update the phase gate checklist, and do not advance to Phase 1 unless the Phase 0 gate is fully satisfied. If any required verification is missing or any regression appears, stop and report NO-GO.
```

## Phase 1 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 1 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-production-api.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md

Before editing code, confirm Phase 0 is complete and Phase 1 is the only active phase. Perform only work allowed in Phase 1. Introduce the canonical feature-owned modules under features/pre-approval without changing live behavior or forcing consumer cutover. Verify route helpers, server-safe boundaries, alias resolution for @/features/pre-approval/*, and the compatibility plan for legacy deep-import and CSS paths. Run the required checks, record dated evidence with matrix IDs in the execution log, update the phase gate checklist, and do not advance to Phase 2 unless the Phase 1 gate is fully satisfied. If any required verification is missing or any regression appears, stop and report NO-GO.
```

## Phase 2 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 2 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-production-api.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md

Before editing code, confirm Phase 1 is complete and Phase 2 is the only active phase. Perform only work allowed in Phase 2. Add the compatibility parser and session normalizer so legacy attributes, new production attributes, direct-hash opens, and route-hash opens all normalize into the canonical trigger contract. Preserve legacy behavior, enforce new-schema precedence, and use the required compatibility-origin policy for non-click opens. Run the required checks, record dated evidence with matrix IDs in the execution log, update the phase gate checklist, and do not advance to Phase 3 unless the Phase 2 gate is fully satisfied. If any required verification is missing or any regression appears, stop and report NO-GO.
```

## Phase 3 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 3 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-production-api.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md

Before editing code, confirm Phase 2 is complete and Phase 3 is the only active phase. Perform only work allowed in Phase 3. Wrap the existing runtime in the new root contract while preserving the current user-visible drawer behavior. Add session IDs, event emission, error isolation, and explicit close-reason wiring for backdrop, escape, close-button, drag-dismiss, route-change, and programmatic closes. Verify session replacement semantics, failure isolation, touch behavior during mount/scroll-lock handoff, and unchanged continue behavior. Run the required checks, record dated evidence with matrix IDs in the execution log, update the phase gate checklist, and do not advance to Phase 4 unless the Phase 3 gate is fully satisfied. If any required verification is missing or any regression appears, stop and report NO-GO.
```

## Phase 4 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 4 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-production-api.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md

Before editing code, confirm Phase 3 is complete and Phase 4 is the only active phase. Perform only work allowed in Phase 4. Convert the legacy pre-approval drawer surface into a compatibility facade while preserving import stability. Keep legacy named exports, deep-import module paths, and legacy CSS import paths working until consumers are migrated. Run the required checks, record dated evidence with matrix IDs in the execution log, update the phase gate checklist, and do not advance to Phase 5 unless the Phase 4 gate is fully satisfied. If any required verification is missing or any regression appears, stop and report NO-GO.
```

## Phase 5 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 5 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-production-api.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md

Before editing code, confirm Phase 4 is complete and Phase 5 is the only active phase. Perform only work allowed in Phase 5. Migrate callers incrementally in controlled batches. Follow the priority order from the migration spec: shared CTA primitives, nav/footer helpers, route-only consumers such as HeroInput, hero configs and tile-selection helpers, then other marketing configs. Execute one batch at a time. Verify and record evidence for each batch before starting the next. Do not combine batches. Do not remove compatibility paths early. After each batch, run the required checks, record dated evidence with matrix IDs in the execution log, update the phase gate checklist, and do not advance to Phase 6 unless the Phase 5 gate is fully satisfied. If any required verification is missing or any regression appears, stop and report NO-GO.
```

## Phase 6 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 6 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-production-api.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md

Before editing code, confirm Phase 5 is complete and Phase 6 is the only active phase. Perform only work allowed in Phase 6. Remove legacy semantics and compatibility paths only after search confirms there are no remaining legacy authoring consumers, no remaining deep imports of the legacy config/triggers modules, and no remaining imports of the legacy CSS path. Complete route-contract parity work, including min/max clamping if still outstanding. Run the final automated and browser verification, record dated evidence with matrix IDs and search results in the execution log, update the phase gate checklist, and declare GO only if the Phase 6 gate is fully satisfied. If any required verification is missing or any regression appears, stop and report NO-GO.
```

## Phase 7 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 7 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md
- app/(marketing)/(programs)/rollback-financing/config.ts
- app/(marketing)/(programs)/wrecker-financing/config.ts
- app/(marketing)/(programs)/rotator-financing/config.ts
- app/(marketing)/(programs)/used-tow-truck-financing/config.ts
- features/pre-approval/__tests__/public-api.test.ts

Before editing code, read those files and confirm all of the following:
- Phase 6 is complete.
- The 2026-04-06 architectural review is recorded in the execution log.
- Phase 7 is the only active phase in plans/pre-approval-drawer-phase-gates.md.

Allowed work in Phase 7 only:
- rewrite the 4 financing config imports away from the legacy barrel
- remove or rewrite barrel-parity assertions in features/pre-approval/__tests__/public-api.test.ts
- update only the phase gates and execution log entries required by this phase

Do not move runtime files, UI files, or tests in this phase. Do not delete the legacy directory in this phase.

Eliminate all remaining barrel consumers of @/components/ui/pre-approval-drawer:

1. Rewrite the 4 financing config files (rollback-financing/config.ts, wrecker-financing/config.ts, rotator-financing/config.ts, used-tow-truck-financing/config.ts) to import preApprovalEntryHash from @/features/pre-approval/drawer/server instead of DRAWER_HASH from the barrel. Note: these imports are multi-line — do not rely on single-line grep patterns to verify.

2. Remove or rewrite barrel-parity assertions in features/pre-approval/__tests__/public-api.test.ts so the test suite no longer requires the barrel to exist.

3. Verify with: rg -n "from.*@/components/ui/pre-approval-drawer[\"';]" app/ components/sections/ features/ --glob '!**/__tests__/**' — must return zero results. Test-only references in legacy test files under components/ui/pre-approval-drawer/__tests__/ are acceptable because those tests move in Phase 9.

Run npm run lint and npm run build. Record dated evidence with matrix IDs (PA-INV-28, PA-INV-27) in the execution log, update the phase gate checklist, and stop with NO-GO if any production barrel import remains, lint/build fails, or evidence is incomplete. Do not advance to Phase 8 unless the Phase 7 gate is fully satisfied.
```

## Phase 8 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 8 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md
- features/pre-approval/drawer/client.tsx
- components/ui/pre-approval-drawer/DrawerContext.tsx
- components/ui/pre-approval-drawer/DrawerHashListener.tsx
- components/ui/pre-approval-drawer/RouteResetListener.tsx
- components/ui/pre-approval-drawer/scroll-lock.ts
- features/pre-approval/__tests__/drawer-root.test.tsx
- features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx

Before editing code, confirm all of the following:
- Phase 7 is complete.
- Phase 8 is the only active phase in plans/pre-approval-drawer-phase-gates.md.
- The legacy UI view file PreApprovalDrawer.tsx is still intentionally unmoved and deferred to Phase 9.

Move the 4 runtime files from components/ui/pre-approval-drawer/ into features/pre-approval/drawer/runtime/:
- DrawerContext.tsx → runtime/context.tsx
- DrawerHashListener.tsx → runtime/hash-listener.tsx
- RouteResetListener.tsx → runtime/route-sync.tsx
- scroll-lock.ts → runtime/scroll-lock.ts

Allowed work in Phase 8 only:
- move the 4 runtime files listed above
- update import paths directly caused by those moves
- update runtime-related mocks in the two feature root tests
- update only the phase gates and execution log entries required by this phase

Do not move PreApprovalDrawer.tsx, AmountSlider.tsx, or any test files out of components/ui/pre-approval-drawer/__tests__/ in this phase.

After moving, update all import paths:
1. features/pre-approval/drawer/client.tsx — update only the imports for DrawerContext, DrawerHashListener, and RouteResetListener to the new runtime/ paths. Leave the temporary PreApprovalDrawer import on the legacy UI path for Phase 9.
2. Internal imports within the moved files (for example the scroll-lock import in context).
3. Only the vi.mock paths for modules moved in this phase inside features/pre-approval/__tests__/drawer-root.test.tsx and features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx. Leave any PreApprovalDrawer mock on the old path until Phase 9.

Verify all of the following:
- rg -n "@/components/ui/pre-approval-drawer" features/pre-approval --glob '!**/__tests__/**' returns exactly one match: features/pre-approval/drawer/client.tsx importing PreApprovalDrawer from the legacy UI path.
- npm run lint passes.
- npm run build passes.
- the targeted runtime and drawer-root test suite passes.

Record dated evidence with matrix IDs (PA-INV-34, PA-INV-27, PA-INV-18) in the execution log, update the phase gate checklist, and stop with NO-GO if any additional feature-to-legacy UI import remains, a moved-file import path is wrong, a test fails, or evidence is incomplete. Do not advance to Phase 9 unless the Phase 8 gate is fully satisfied.
```

## Phase 9 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 9 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md
- features/pre-approval/drawer/client.tsx
- components/ui/pre-approval-drawer/PreApprovalDrawer.tsx
- components/ui/pre-approval-drawer/AmountSlider.tsx
- components/ui/pre-approval-drawer/__tests__/
- features/pre-approval/__tests__/drawer-root.test.tsx
- features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx

Before editing code, confirm all of the following:
- Phase 8 is complete.
- Phase 9 is the only active phase in plans/pre-approval-drawer-phase-gates.md.
- Phase 8 left exactly one allowed feature-to-legacy UI import: the temporary PreApprovalDrawer import in features/pre-approval/drawer/client.tsx.

Move the UI files and all remaining tests:
1. PreApprovalDrawer.tsx → features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx
2. AmountSlider.tsx → features/pre-approval/drawer/ui/AmountSlider.tsx
3. All test files from components/ui/pre-approval-drawer/__tests__/ → features/pre-approval/__tests__/

Allowed work in Phase 9 only:
- move the 2 UI files and the remaining legacy test files into features/pre-approval/
- update imports and mocks required by those moves
- update only the phase gates and execution log entries required by this phase

Do not delete the legacy directory or finalize CLAUDE.md documentation in this phase.

After moving, update all import paths:
- Import paths in moved test files to reference canonical locations under features/pre-approval/.
- Import paths in moved UI files (e.g., scroll-lock import in the drawer view, CSS import in AmountSlider).
- Any runtime file that imports from the moved UI files (e.g., if context references PreApprovalDrawer).
- Any remaining vi.mock paths in drawer-root tests that still pointed at the old PreApprovalDrawer location.

This phase requires browser validation because it moves the visible UI components:
- Desktop: same-page hash open, amount slider adjust, continue navigation.
- Mobile: direct-load hash open, close behavior, continue navigation.

Verify all of the following:
- grep -rn "from.*@/components/ui" features/pre-approval/ returns zero results.
- npm run lint passes.
- npm run build passes.
- npm test -- features/pre-approval passes.
- desktop and mobile browser validation produce the expected open, close, slider, and continue behavior.

Record dated evidence with matrix IDs (PA-INV-29, PA-INV-27, PA-INV-01, PA-INV-02, PA-INV-05, PA-INV-06, PA-INV-07) in the execution log including browser validation notes (route, viewport, trigger path, observed result). Update the phase gate checklist and stop with NO-GO if any feature-owned import still points to components/ui, any visual regression appears, any test fails, or any moved file is missing. Do not advance to Phase 10 unless the Phase 9 gate is fully satisfied.
```

## Phase 10 Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Execute only Phase 10 using:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md
- components/ui/pre-approval-drawer/
- features/pre-approval/contract.ts
- features/pre-approval/routes.ts
- features/pre-approval/selection.ts
- features/pre-approval/drawer/server.ts
- features/pre-approval/drawer/client.tsx
- components/sections/heroes/hero-gallery/CLAUDE.md

Before editing code, confirm all of the following:
- Phase 9 is complete.
- Phase 10 is the only active phase in plans/pre-approval-drawer-phase-gates.md.
- grep -rn "from.*@/components/ui" features/pre-approval/ already returns zero results at the start of the phase.

Delete the legacy directory and finalize documentation:
1. Delete the 4 remaining dead files: DrawerProvider.tsx (zero consumers), MarketingDrawerProvider.tsx (dead wrapper — layout imports PreApprovalDrawerRoot directly), index.ts (barrel — zero consumers after Phase 7), CLAUDE.md.
2. Remove the components/ui/pre-approval-drawer/ directory entirely.
3. Update external CLAUDE.md files that reference the old barrel path. Known: components/sections/heroes/hero-gallery/CLAUDE.md. Run rg "components/ui/pre-approval-drawer" --glob '**/CLAUDE.md' to find all.
4. Write features/pre-approval/CLAUDE.md documenting the final architecture: module table, public API, usage snippet, server/client boundaries, test coverage.

Allowed work in Phase 10 only:
- delete the remaining legacy directory files
- update CLAUDE.md documentation to match the final feature-owned architecture
- update only the phase gates and execution log entries required by this phase

Do not reintroduce compatibility exports, new wrappers, or product-behavior changes in this phase.

Run the full verification battery:
- npm run lint, npm run build, and npm test -- features/pre-approval.
- grep -r "components/ui/pre-approval-drawer" app components features lib — must return zero.
- grep -rn "from.*@/components/ui" features/pre-approval/ — must return zero (broad scope).
- grep -rn "export.*from" features/pre-approval/ --include='*.ts' --include='*.tsx' --exclude-dir=__tests__ — must return zero re-export barrels.
- find features/pre-approval/__tests__ -maxdepth 1 -type f | sort — must show the consolidated feature-owned suite.
- Read features/pre-approval/contract.ts, routes.ts, selection.ts, drawer/server.ts, and drawer/client.tsx and confirm they are canonical modules, not alias mappings or compatibility wrappers.
- ls features/pre-approval/*.ts features/pre-approval/drawer/*.{ts,tsx} — must match exactly: contract.ts, routes.ts, selection.ts, drawer/server.ts, drawer/client.tsx (plus expected runtime/ and ui/ subdirectory files).

Record dated evidence with matrix IDs (PA-INV-28, PA-INV-29, PA-INV-30, PA-INV-31, PA-INV-32, PA-INV-33) in the execution log. Update the phase gate checklist AND the Migration Completion Criteria checklist. Declare GO only if every completion criterion is satisfied. If any dangling import, build failure, failing feature suite, alias wrapper, or undocumented public API remains, stop and report NO-GO.
```

## Final Review Prompt

```text
Act as a migration auditor. Your job is to verify — not execute — that the pre-approval drawer migration is structurally complete.

Read:
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-execution-log.md
- features/pre-approval/CLAUDE.md

Then verify each of the 8 Migration Completion Criteria against the actual codebase:

1. Confirm components/ui/pre-approval-drawer/ does not exist.
2. Run grep -r "components/ui/pre-approval-drawer" app components features lib and confirm zero results.
3. Run grep -rn "from.*@/components/ui" features/pre-approval/ and confirm zero results.
4. Run grep -rn "export.*from" features/pre-approval/ --include='*.ts' --include='*.tsx' --exclude-dir=__tests__ and confirm only direct exports remain. Then read features/pre-approval/contract.ts, routes.ts, selection.ts, drawer/server.ts, and drawer/client.tsx to confirm they are canonical modules, not alias mappings or compatibility wrappers.
5. Run ls features/pre-approval/*.ts features/pre-approval/drawer/*.{ts,tsx} and confirm the public API matches exactly: contract.ts, routes.ts, selection.ts, drawer/server.ts, drawer/client.tsx.
6. Read features/pre-approval/CLAUDE.md and confirm it documents the actual architecture (module table matches the filesystem).
7. Run find features/pre-approval/__tests__ -maxdepth 1 -type f | sort and confirm the consolidated feature-owned suite exists there. Then run npm test -- features/pre-approval and confirm the suite passes.
8. Run npm run lint and npm run build and confirm both pass.

Also verify:
- Every checklist item under Phase 0 through Phase 10 is checked.
- Every checkbox under the Active Phase section is unchecked.
- The execution log has dated evidence entries for every phase with matrix IDs.
- The verification matrix has no unverified invariants for any completed phase.

Report PASS or FAIL for each check with a one-line explanation for any FAIL. If all checks pass, declare the migration COMPLETE.
```

## Optional General Kickoff Prompt

```text
Act as the migration execution agent for the pre-approval drawer. Read:
- plans/pre-approval-drawer-migration-spec.md
- plans/pre-approval-drawer-verification-matrix.md
- plans/pre-approval-drawer-phase-gates.md
- plans/pre-approval-drawer-execution-log.md
- plans/pre-approval-drawer-phase-prompts.md

Do not choose a phase implicitly. First identify the currently authorized phase from the phase-gates file, mark only that phase as active, and state the exact gate criteria you must satisfy before you can stop. Then execute only that phase, update the checklist and execution log in the same batch, and stop with either GO or NO-GO for that phase. Do not advance phases automatically.
```
