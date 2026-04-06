# Pre-Approval Drawer Verification Matrix

## Purpose

This document maps migration requirements to concrete verification steps and evidence.

Use it with:

- `plans/pre-approval-drawer-migration-spec.md`
- `plans/pre-approval-drawer-phase-gates.md`
- `plans/pre-approval-drawer-execution-log.md`

No phase is complete until each applicable requirement below has evidence recorded in the execution log.

## Requirement Matrix

| ID | Requirement | Minimum verification | Evidence to record |
| --- | --- | --- | --- |
| `PA-INV-01` | Same-page hash CTA opens the drawer | automated test and browser validation | test name/file, route checked, browser notes |
| `PA-INV-02` | Direct load with drawer hash opens the drawer | automated test and browser validation | test name/file, route checked, browser notes |
| `PA-INV-03` | Continue URL shape is unchanged for legacy flows | automated test and browser validation | expected href, observed href, route checked |
| `PA-INV-04` | Hero truck-type handoff remains exact | automated test | fixture or route, expected `trucktype`, observed result |
| `PA-INV-05` | Continue unlocks scroll and navigates immediately | browser validation | route, action performed, observed behavior |
| `PA-INV-06` | Focus moves on open and restores on close | automated test and browser validation | test name/file, browser notes |
| `PA-INV-07` | Escape, backdrop, and close-button flows still work | automated test and browser validation | close path checked, observed behavior |
| `PA-INV-08` | Route-sync reopen/reset behavior remains intact | automated test | test name/file, observed session/reset behavior |
| `PA-INV-09` | Legacy trigger schema still works | automated test and browser validation when user-facing | test name/file, route checked |
| `PA-INV-10` | New trigger schema works | automated test and browser validation when user-facing | test name/file, route checked |
| `PA-INV-11` | New schema wins when both schemas are present | automated test | precedence test name/file |
| `PA-INV-12` | Every open creates a new `sessionId` | automated test | test name/file |
| `PA-INV-13` | Opening while already open replaces the session | automated test | test name/file |
| `PA-INV-14` | `close()` without reason records `"programmatic"` | automated test | test name/file |
| `PA-INV-15` | `onEvent` failures do not break drawer UX | automated test | test name/file, exception path covered |
| `PA-INV-16` | Runtime render failures do not break the page shell | automated test | test name/file, failure mode covered |
| `PA-INV-17` | Existing `@/components/ui/pre-approval-drawer` imports still compile until cutover | `npm run build` | build result and affected consumers |
| `PA-INV-18` | Server-safe helpers do not import client-only runtime code | code review and `npm run build` | files checked, build result |
| `PA-INV-19` | Current slider max and step are unchanged during migration | automated test or helper test when touched | values verified, file/test reference |
| `PA-INV-20` | No manual `/pre-approval` query-string construction remains after route migration | targeted search and `npm run build` | search query and results |
| `PA-INV-21` | Direct-hash and route-hash opens produce a valid compatibility origin | automated test | test name/file, expected origin shape |
| `PA-INV-22` | Legacy deep-import module paths continue to compile until removal | `npm run build` and targeted search | build result, search query, remaining consumers |
| `PA-INV-23` | Legacy CSS import paths continue to resolve until removal | `npm run build` and targeted search | build result, search query, remaining consumers |
| `PA-INV-24` | Route-only consumers use the feature route contract before legacy route helpers are removed | targeted search, code review, and `npm run build` | consumer list, imports changed, build result |
| `PA-INV-25` | Close-reason mapping is correct for backdrop, escape, close button, drag-dismiss, and route change | automated test and browser validation for representative paths | test name/file, interaction notes |
| `PA-INV-26` | Route-contract clamping to min/max is added before final parity signoff | automated test | test name/file, clamp cases covered |
| `PA-INV-27` | `@/features/pre-approval/*` resolves cleanly with the existing alias/tooling | `npm run build` | build result, modules verified |

## Phase Applicability

| Phase | Matrix IDs that must be satisfied before exit |
| --- | --- |
| `Phase 0` | `PA-INV-01` `PA-INV-02` `PA-INV-03` `PA-INV-04` `PA-INV-05` `PA-INV-06` `PA-INV-07` `PA-INV-08` |
| `Phase 1` | `PA-INV-17` `PA-INV-18` `PA-INV-19` `PA-INV-22` `PA-INV-23` `PA-INV-27` |
| `Phase 2` | `PA-INV-09` `PA-INV-10` `PA-INV-11` `PA-INV-04` `PA-INV-21` |
| `Phase 3` | `PA-INV-12` `PA-INV-13` `PA-INV-14` `PA-INV-15` `PA-INV-16` `PA-INV-25` plus any still-applicable baseline invariants |
| `Phase 4` | `PA-INV-17` `PA-INV-22` `PA-INV-23` plus any user-facing invariants affected by facade rewiring |
| `Phase 5` | applicable caller-path checks from `PA-INV-01` through `PA-INV-25`, including `PA-INV-24`, for each migrated batch |
| `Phase 6` | all applicable IDs, with emphasis on `PA-INV-20` through `PA-INV-26` and final search-based removal checks |

## Standard Verification Commands

- `npm run lint`
- `npm run build`
- targeted test command for the affected feature area
- browser validation on a non-`3000` dev server for user-facing phases

## Evidence Rules

- Every execution-log entry must cite the matrix IDs it covered.
- If a requirement was not exercised, record it as `not verified` and do not mark the phase complete.
- Browser validation notes must include route, viewport class, trigger path, and observed result.
- Search-based verification must include the exact query used and whether matches remain.
