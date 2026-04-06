# Pre-Approval Drawer Execution Log

## Purpose

This is the evidence ledger for the migration.

Use this file to record:

- what phase or batch was executed
- what changed
- what was verified
- what evidence exists
- whether the gate is passed, blocked, or failed

Rules:

- Update this file in the same batch as implementation work.
- Cite verification-matrix IDs for every entry.
- If something was not verified, say so explicitly.
- Do not mark a phase complete without corresponding evidence.

## Status Legend

- `PASS`: required evidence collected and gate satisfied
- `BLOCKED`: cannot proceed because a precondition or required verification is missing
- `FAIL`: regression or gate failure found
- `PARTIAL`: work completed but verification or evidence is incomplete

## Entry Template

Copy this section for each implementation batch or verification run.

### Entry

- Date:
- Agent:
- Phase:
- Batch / scope:
- Status:

Changes made:

- 

Verification matrix IDs covered:

- 

Commands run:

- 

Automated verification results:

- 

Browser verification results:

- Route:
- Viewport:
- Trigger path:
- Observed behavior:

Evidence summary:

- 

Gate decision:

- `GO` or `NO-GO`

Blockers / regressions:

- 

Next required action:

- 

## Log Entries

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 10`
- Batch / scope: Delete the final dead legacy directory, replace stale drawer docs with the feature-owned architecture doc, and record final completion evidence
- Status: `PASS`

Changes made:

- Deleted the four remaining dead files under the legacy directory: [`components/ui/pre-approval-drawer/DrawerProvider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerProvider.tsx), [`components/ui/pre-approval-drawer/MarketingDrawerProvider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/MarketingDrawerProvider.tsx), [`components/ui/pre-approval-drawer/index.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/index.ts), and [`components/ui/pre-approval-drawer/CLAUDE.md`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/CLAUDE.md), then removed the empty `components/ui/pre-approval-drawer/` directory.
- Added [`features/pre-approval/CLAUDE.md`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/CLAUDE.md) documenting the final module table, supported public API, usage pattern, server/client boundaries, and consolidated test coverage.
- Updated [`components/sections/heroes/hero-gallery/CLAUDE.md`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/CLAUDE.md) to reference the canonical feature-owned drawer server module instead of the deleted legacy barrel path.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) and this execution log with the Phase 10 evidence, final gate result, and migration completion criteria status.

Verification matrix IDs covered:

- `PA-INV-28`
- `PA-INV-29`
- `PA-INV-30`
- `PA-INV-31`
- `PA-INV-32`
- `PA-INV-33`

Commands run:

- `rg -n "Phase 9|Phase 10|Migration Completion Criteria|GO|NO-GO" plans/pre-approval-drawer-phase-gates.md`
- `grep -rn "from.*@/components/ui" features/pre-approval/`
- `find components/ui/pre-approval-drawer -maxdepth 2 -type f | sort`
- `rg "components/ui/pre-approval-drawer" --glob '**/CLAUDE.md'`
- `find features/pre-approval -maxdepth 3 -type f | sort`
- `find features/pre-approval/__tests__ -maxdepth 1 -type f | sort`
- `rmdir components/ui/pre-approval-drawer/__tests__ components/ui/pre-approval-drawer`
- `grep -r "components/ui/pre-approval-drawer" app components features lib`
- `grep -rn "export.*from" features/pre-approval/ --include='*.ts' --include='*.tsx' --exclude-dir=__tests__`
- `ls features/pre-approval/*.ts features/pre-approval/drawer/*.{ts,tsx}`
- `npm run lint`
- `npm test -- features/pre-approval`
- `npm run build`

Automated verification results:

- Start-of-phase preconditions were satisfied: Phase 9 was already fully checked in [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md), and the required broad-scope search `grep -rn "from.*@/components/ui" features/pre-approval/` returned zero results before any source edits.
- `PA-INV-28`: `grep -r "components/ui/pre-approval-drawer" app components features lib` returned zero results after the deletion, and `npm run build` passed, confirming no production import of the deleted legacy barrel or directory remains.
- `PA-INV-29`: `grep -rn "from.*@/components/ui" features/pre-approval/` returned zero results both before and after the Phase 10 edits, confirming the feature-owned code no longer depends on any `components/ui/` module.
- `PA-INV-30`: `find components/ui/pre-approval-drawer -maxdepth 2 -type f | sort` showed only the four expected dead files before deletion, `rmdir components/ui/pre-approval-drawer/__tests__ components/ui/pre-approval-drawer` succeeded, and the post-delete filesystem no longer contains the directory.
- `PA-INV-31`: [`features/pre-approval/CLAUDE.md`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/CLAUDE.md) now exists and matches the actual filesystem layout under [`features/pre-approval/`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval), including the public API, runtime internals, and consolidated test suite.
- `PA-INV-32`: `grep -rn "export.*from" features/pre-approval/ --include='*.ts' --include='*.tsx' --exclude-dir=__tests__` returned zero results. Manual review of [`features/pre-approval/contract.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/contract.ts), [`features/pre-approval/routes.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/routes.ts), [`features/pre-approval/selection.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/selection.ts), [`features/pre-approval/drawer/server.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/server.ts), and [`features/pre-approval/drawer/client.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/client.tsx) confirmed they contain canonical logic and contracts, not alias mappings or compatibility wrappers.
- `PA-INV-33`: `ls features/pre-approval/*.ts features/pre-approval/drawer/*.{ts,tsx}` returned exactly `features/pre-approval/contract.ts`, `features/pre-approval/routes.ts`, `features/pre-approval/selection.ts`, `features/pre-approval/drawer/server.ts`, and `features/pre-approval/drawer/client.tsx`, with the expected `runtime/` and `ui/` subdirectories still present separately.
- `find features/pre-approval/__tests__ -maxdepth 1 -type f | sort` showed the consolidated feature-owned suite: `AmountSlider.test.tsx`, `DrawerContext.test.tsx`, `DrawerHashListener.test.tsx`, `PreApprovalDrawerView.test.tsx`, `RouteResetListener.test.tsx`, `drawer-root-error-boundary.test.tsx`, `drawer-root.test.tsx`, `drawer-runtime.test.ts`, `public-api.test.ts`, `scroll-lock.test.ts`, and `selection.test.ts`.
- `npm test -- features/pre-approval` passed: 11 files, 83 tests, 0 failures. Vitest emitted the same pre-existing `happy-dom` `fetch("http://localhost:3000/...")` network warning observed in Phase 9, but the suite completed successfully.
- `npm run lint` exited `0` with the same pre-existing 23 warnings in [`features/pre-approval/__tests__/AmountSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/AmountSlider.test.tsx) and [`features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx); no new lint errors were introduced.
- `npm run build` passed with a successful Next.js production build after the legacy directory removal and documentation finalization.
- `rg "components/ui/pre-approval-drawer" --glob '**/CLAUDE.md'` returned zero results after the doc update, confirming the stale external CLAUDE reference was removed.

Browser verification results:

- Route: not applicable
- Viewport: not applicable
- Trigger path: not applicable
- Observed behavior: not applicable for Phase 10; this phase was limited to deletion and documentation finalization, and the governing Phase 10 checklist requires the automated verification battery rather than an additional browser pass.

Evidence summary:

- The legacy compatibility surface at `components/ui/pre-approval-drawer/` has been fully removed, and the repository now resolves production pre-approval drawer imports only through `@/features/pre-approval/*`.
- The final public surface is constrained to `contract.ts`, `routes.ts`, `selection.ts`, `drawer/server.ts`, and `drawer/client.tsx`, with zero re-export barrels and zero compatibility wrappers remaining under `features/pre-approval/`.
- The new feature-owned CLAUDE document matches the actual architecture and the consolidated test suite under `features/pre-approval/__tests__/`, satisfying the Phase 10 documentation and completion requirements.

Gate decision:

- `GO`

Blockers / regressions:

- None. No dangling imports, build failures, failing feature tests, alias wrappers, or undocumented public API remain after Phase 10.

Next required action:

- None. Phase 10 is complete, the migration completion criteria are satisfied, and no further pre-approval drawer migration phase remains open.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 9`
- Batch / scope: Move the remaining drawer UI files and legacy drawer tests into `features/pre-approval`, repair all affected imports and mocks, and verify the consolidated feature-owned suite plus live drawer behavior
- Status: `PASS`

Changes made:

- Moved [`components/ui/pre-approval-drawer/PreApprovalDrawer.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/PreApprovalDrawer.tsx) to [`features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx) and renamed the exported component to `PreApprovalDrawerView`.
- Moved [`components/ui/pre-approval-drawer/AmountSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/AmountSlider.tsx) to [`features/pre-approval/drawer/ui/AmountSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/ui/AmountSlider.tsx).
- Moved the six legacy drawer test files from [`components/ui/pre-approval-drawer/__tests__/`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__) into [`features/pre-approval/__tests__/`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__), including renaming [`components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx) to [`features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx).
- Updated [`features/pre-approval/drawer/client.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/client.tsx) and [`components/ui/pre-approval-drawer/DrawerProvider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerProvider.tsx) to import the moved feature-owned UI component from the new canonical path.
- Updated the moved tests and the existing drawer-root tests at [`features/pre-approval/__tests__/drawer-root.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root.test.tsx) and [`features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx) so all imports and `vi.mock` paths now target canonical modules under `@/features/pre-approval/`.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) and this execution log with the Phase 9 evidence and gate result.

Verification matrix IDs covered:

- `PA-INV-29`
- `PA-INV-27`
- `PA-INV-01`
- `PA-INV-02`
- `PA-INV-05`
- `PA-INV-06`
- `PA-INV-07`

Commands run:

- `rg -n "@/components/ui/pre-approval-drawer" features/pre-approval --glob '!**/__tests__/**'`
- `grep -rn "from.*@/components/ui" features/pre-approval/`
- `ls features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx features/pre-approval/drawer/ui/AmountSlider.tsx`
- `find features/pre-approval/__tests__ -maxdepth 1 -type f | sort`
- `npm test -- features/pre-approval`
- `npm run lint`
- `npm run build`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser eval "document.querySelector('a[href=\"#get-pre-approved\"]').click()"`
- `agent-browser click @e62` plus repeated `agent-browser press ArrowRight`
- `agent-browser click @e59`
- `agent-browser set device "iPhone 14"`
- `agent-browser open http://127.0.0.1:3001/rollback-financing#get-pre-approved`
- `agent-browser eval "const el=Array.from(document.querySelectorAll('[aria-hidden=\"true\"]')).find((node)=>node.className === 'fixed inset-0 z-[200] bg-black/35'); el && el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));"`
- `agent-browser click @e37`

Automated verification results:

- `PA-INV-29`: `grep -rn "from.*@/components/ui" features/pre-approval/` returned zero results, confirming no feature-owned file still imports from `components/ui/`.
- `PA-INV-27`: `npm run build` passed after the UI and test moves, confirming the canonical `@/features/pre-approval/*` modules still resolve cleanly in the production build.
- The moved UI files exist at [`features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx) and [`features/pre-approval/drawer/ui/AmountSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/ui/AmountSlider.tsx), and `find features/pre-approval/__tests__ -maxdepth 1 -type f | sort` showed the consolidated feature-owned suite includes all moved legacy tests.
- `npm test -- features/pre-approval` passed: 11 files, 83 tests, 0 failures. Vitest emitted the same pre-existing `happy-dom` `fetch("http://localhost:3000/...")` warning during hash-open tests, but the run completed successfully.
- `npm run lint` exited `0` with the same 23 pre-existing test warnings now reported from [`features/pre-approval/__tests__/AmountSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/AmountSlider.test.tsx) and [`features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx); no new lint errors were introduced.
- `rg -n "@/components/ui/pre-approval-drawer" features/pre-approval --glob '!**/__tests__/**'` returned zero matches, confirming the Phase 8 temporary feature-to-legacy UI import exception was fully removed in Phase 9.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop `1440x900`
- Trigger path: same-page hash CTA triggered in-browser with `document.querySelector('a[href="#get-pre-approved"]').click()`
- Observed behavior: `PA-INV-01` and `PA-INV-06` satisfied. The drawer opened on the same page, focus moved into the dialog, the URL stayed on `/rollback-financing` after the hash was consumed, the slider responded to keyboard adjustment, and continue navigation went immediately to `/pre-approval?amount=315000` with no visible visual regression.
- Route: `/rollback-financing#get-pre-approved`
- Viewport: mobile `iPhone 14`
- Trigger path: direct-load hash URL
- Observed behavior: `PA-INV-02` satisfied. The drawer opened on initial load, the hash-open cleaned back to `/rollback-financing`, and the mobile sheet rendered correctly.
- Route: `/rollback-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: backdrop-close after direct-load hash open
- Observed behavior: `PA-INV-07` satisfied. Dispatching a click on the mobile backdrop closed the sheet and returned the page to its underlying content with no stuck overlay.
- Route: `/rollback-financing#get-pre-approved`
- Viewport: mobile `iPhone 14`
- Trigger path: direct-load hash open followed by continue CTA
- Observed behavior: `PA-INV-05` satisfied. Tapping Continue navigated immediately to `/pre-approval?amount=100000`, indicating the mobile continue path still unlocks and hands off without waiting on an exit animation.

Evidence summary:

- The remaining visible drawer UI now lives under `features/pre-approval/drawer/ui/`, and the legacy test directory is empty because all remaining UI/runtime tests were consolidated under `features/pre-approval/__tests__/`.
- The Phase 8 temporary exception is gone: there are no remaining feature-owned imports from `components/ui/`, and the drawer-root tests now mock the canonical feature UI path.
- The consolidated feature test suite, lint, production build, desktop validation, and mobile validation all passed after the move, with no missing moved files and no visible regression observed during the browser checks.

Gate decision:

- `GO`

Blockers / regressions:

- None. The only noteworthy noise was the existing Vitest `happy-dom` network warning against `localhost:3000`, which did not cause any test failure and predates this phase.

Next required action:

- Stop here. Phase 9 is complete and recorded; do not begin Phase 10 until a separate batch starts.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 8`
- Batch / scope: Move the four runtime modules into `features/pre-approval/drawer/runtime`, repair the directly affected import graph, and verify the temporary Phase 8 legacy-view exception
- Status: `PASS`

Changes made:

- Moved the runtime modules from [`components/ui/pre-approval-drawer/DrawerContext.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerContext.tsx), [`components/ui/pre-approval-drawer/DrawerHashListener.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerHashListener.tsx), [`components/ui/pre-approval-drawer/RouteResetListener.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/RouteResetListener.tsx), and [`components/ui/pre-approval-drawer/scroll-lock.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/scroll-lock.ts) to [`features/pre-approval/drawer/runtime/context.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/context.tsx), [`features/pre-approval/drawer/runtime/hash-listener.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/hash-listener.tsx), [`features/pre-approval/drawer/runtime/route-sync.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/route-sync.tsx), and [`features/pre-approval/drawer/runtime/scroll-lock.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/scroll-lock.ts).
- Updated [`features/pre-approval/drawer/client.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/client.tsx) to import the moved runtime modules from the new feature-owned runtime paths while intentionally leaving `PreApprovalDrawer` on the legacy UI path for Phase 9.
- Repointed the retained legacy UI shell in [`components/ui/pre-approval-drawer/PreApprovalDrawer.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/PreApprovalDrawer.tsx), [`components/ui/pre-approval-drawer/DrawerProvider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerProvider.tsx), and [`components/ui/pre-approval-drawer/index.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/index.ts) to the moved runtime so the Phase 9-deferred UI continues compiling.
- Updated the runtime-related mocks in [`features/pre-approval/__tests__/drawer-root.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root.test.tsx) and [`features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx), and updated the retained legacy runtime test imports in [`components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx), [`components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), [`components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx), [`components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx), and [`components/ui/pre-approval-drawer/__tests__/scroll-lock.test.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/scroll-lock.test.ts) so the Phase 8 runtime suite still resolves after the move.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) and this execution log with the Phase 8 evidence and gate result.

Verification matrix IDs covered:

- `PA-INV-34`
- `PA-INV-27`
- `PA-INV-18`

Commands run:

- `rg -n "@/components/ui/pre-approval-drawer" features/pre-approval --glob '!**/__tests__/**'`
- `rg -n "drawer/runtime|components/ui/pre-approval-drawer" features/pre-approval/contract.ts features/pre-approval/routes.ts features/pre-approval/drawer/server.ts`
- `npm test -- 'components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx' 'components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx' 'components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx' 'components/ui/pre-approval-drawer/__tests__/scroll-lock.test.ts' 'features/pre-approval/__tests__/drawer-root.test.tsx' 'features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx'`
- `npm run lint`
- `npm run build`

Automated verification results:

- `PA-INV-34`: `rg -n "@/components/ui/pre-approval-drawer" features/pre-approval --glob '!**/__tests__/**'` returned exactly one match: `features/pre-approval/drawer/client.tsx` importing `PreApprovalDrawer` from the legacy UI path. No other feature-owned non-test file imports from `@/components/ui/pre-approval-drawer`.
- `PA-INV-18`: `rg -n "drawer/runtime|components/ui/pre-approval-drawer" features/pre-approval/contract.ts features/pre-approval/routes.ts features/pre-approval/drawer/server.ts` returned no matches, and `npm run build` passed, confirming the server-safe modules still do not import client-only runtime code.
- Targeted runtime and drawer-root suites passed: 6 files, 48 tests, 0 failures.
- `npm run lint` exited `0` with the same pre-existing 23 warnings in [`components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx) and [`components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx); no new Phase 8 lint errors were introduced.
- `PA-INV-27`: `npm run build` passed with a successful Next.js production build after the runtime files moved under `features/pre-approval/drawer/runtime/`.

Browser verification results:

- Route: not applicable
- Viewport: not applicable
- Trigger path: not applicable
- Observed behavior: not applicable

Evidence summary:

- The four runtime modules now live under `features/pre-approval/drawer/runtime/`, while the only remaining Phase 8 feature-to-legacy dependency is the intentional `PreApprovalDrawer` view import in `features/pre-approval/drawer/client.tsx`.
- The retained legacy UI shell and retained runtime tests were updated only where the file move directly broke import paths; no Phase 9 UI relocation was performed.
- The runtime and drawer-root suite passed after the move. Vitest emitted a `happy-dom` `fetch("http://localhost:3000/rollback-financing#get-pre-approved")` network warning during the run, but the suite completed successfully with all targeted tests passing.
- The server-safe feature modules remain free of client-runtime imports, lint remained clean apart from the existing warnings, and the production build completed successfully.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Stop here. Phase 8 is complete and recorded; do not begin Phase 9 until a separate batch starts.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 7`
- Batch / scope: Eliminate the remaining production barrel consumers in financing configs and remove barrel-parity requirements from the feature public API test
- Status: `PASS`

Changes made:

- Rewrote the four remaining financing config consumers at [`app/(marketing)/(financing)/rollback-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/rollback-financing/config.ts), [`app/(marketing)/(financing)/wrecker-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/wrecker-financing/config.ts), [`app/(marketing)/(financing)/rotator-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/rotator-financing/config.ts), and [`app/(marketing)/(financing)/used-tow-truck-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/used-tow-truck-financing/config.ts) to use `preApprovalEntryHash` from `@/features/pre-approval/drawer/server` and removed their `DRAWER_HASH` barrel imports.
- Removed the legacy barrel import and barrel-parity assertions from [`features/pre-approval/__tests__/public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) so the feature suite no longer requires `@/components/ui/pre-approval-drawer` to exist.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) and this execution log with the Phase 7 evidence and gate result.

Verification matrix IDs covered:

- `PA-INV-28`
- `PA-INV-27`

Commands run:

- `rg -n "from.*@/components/ui/pre-approval-drawer[\"';]" app/ components/sections/ features/ --glob '!**/__tests__/**'`
- `npm run lint`
- `npm run build`

Automated verification results:

- `PA-INV-28`: `rg -n "from.*@/components/ui/pre-approval-drawer[\"';]" app/ components/sections/ features/ --glob '!**/__tests__/**'` returned zero results, confirming there are no remaining production imports from the legacy barrel in the searched directories.
- `PA-INV-27`: `npm run build` passed with a successful Next.js production build, including `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, and `/used-tow-truck-financing`.
- `npm run lint` exited `0` with the same pre-existing `23` warnings in [`components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx) and [`components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx); no new Phase 7 lint errors were introduced.

Browser verification results:

- Route: not applicable
- Viewport: not applicable
- Trigger path: not applicable
- Observed behavior: not applicable

Evidence summary:

- The only remaining production barrel consumers identified by the 2026-04-06 architectural review were the four financing configs, and all four now point directly at the canonical server-safe `preApprovalEntryHash` export.
- The feature-owned public API test no longer imports or asserts parity with the legacy barrel, so Phase 7 no longer depends on barrel existence for test coverage.
- The exact Phase 7 search returned zero production matches, lint completed without errors, and the production build completed successfully.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Stop here. Phase 7 is complete and recorded; do not begin Phase 8 until a separate batch starts and marks it active.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: Pre-flight documentation review
- Batch / scope: Review and reconcile the Phase 7 through Final Review markdown docs before migration execution begins
- Status: `PASS`

Changes made:

- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md), [`plans/pre-approval-drawer-verification-matrix.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-verification-matrix.md), and [`plans/pre-approval-drawer-phase-prompts.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-prompts.md) for Phase 7 through Finish consistency only. No product code changed.
- Resolved the Phase 8 temporary-exception mismatch by making the `PreApprovalDrawer` import the only explicitly allowed `features/pre-approval -> components/ui/pre-approval-drawer` dependency during Phase 8 and moving the zero-`components/ui` invariant to Phase 9 onward.
- Corrected the final-review requirement so completed migration state means all Phase 0 through Phase 10 sections are complete while every checkbox in the `Active Phase` section is unchecked.
- Corrected the remaining `client.tsxx` typos to `client.tsx`.
- Added explicit final-phase checks for the consolidated `features/pre-approval/__tests__/` suite, `npm test -- features/pre-approval`, and manual public-API review so every completion criterion is directly auditable.

Verification matrix IDs covered:

- None. This was a documentation-only readiness review, not migration execution.

Commands run:

- `sed -n '1,260p' plans/pre-approval-drawer-phase-gates.md`
- `sed -n '260,420p' plans/pre-approval-drawer-phase-gates.md`
- `sed -n '1,260p' plans/pre-approval-drawer-verification-matrix.md`
- `sed -n '1,260p' plans/pre-approval-drawer-execution-log.md`
- `sed -n '1,320p' plans/pre-approval-drawer-phase-prompts.md`
- `rg -n "client\\.tsxx|client\\.tsx" plans/pre-approval-drawer-phase-gates.md plans/pre-approval-drawer-verification-matrix.md plans/pre-approval-drawer-execution-log.md plans/pre-approval-drawer-phase-prompts.md`

Automated verification results:

- Not applicable. No application code, tests, or migration steps were executed in this review batch.

Browser verification results:

- Route: not applicable
- Viewport: not applicable
- Trigger path: not applicable
- Observed behavior: not applicable

Evidence summary:

- The phase gates, verification matrix, and execution prompts now agree on the Phase 8 temporary exception, the Phase 9 zero-`components/ui` invariant, and the final review state for the `Active Phase` section.
- The final completion criteria are now paired with explicit checks for feature-suite existence, feature-suite pass/fail, and manual confirmation that the public API files are canonical rather than compatibility wrappers.

Gate decision:

- `GO` for documentation readiness only

Blockers / regressions:

- None identified in the documentation set after the edits above.

Next required action:

- Begin Phase 7 execution using the updated Phase 7 prompt and gate definitions.

### Entry

- Date: 2026-04-06
- Agent: Claude Opus 4.6 + Codex (independent review)
- Phase: Post-Phase 6 architectural review
- Batch / scope: Principal-engineer-level review of the post-Phase-6 architecture to determine whether the migration is structurally complete
- Status: `BLOCKED` — migration declared complete but architecture is half-migrated

Findings:

- **Bidirectional dependency.** `features/pre-approval/drawer/client.tsx` imports 4 concrete runtime modules from `components/ui/pre-approval-drawer/` (DrawerHashListener, DrawerContext, PreApprovalDrawer, RouteResetListener). Meanwhile, `components/ui/pre-approval-drawer/DrawerContext.tsx` imports from `features/pre-approval/` (contract, server, session). This creates a mutual dependency between what are supposed to be different ownership layers.
- **Split ownership.** The feature directory owns types, constants, route helpers, parser, session factory, selection resolution, CSS, and thin client wrappers. The old UI directory owns all concrete runtime and UI: context provider, hash listener, route sync, scroll lock, drawer view, amount slider, and all their tests. Neither directory is self-contained.
- **Duplicate public APIs.** The barrel `index.ts` re-exports from the feature directory under legacy alias names (`DRAWER_HASH`, `SLIDER_MIN`, `resolveDrawerTriggerHref`, etc.) alongside the canonical exports. Consumers can import the same capability from two different paths.
- **Remaining barrel consumers.** 4 financing config files still import `DRAWER_HASH` from `@/components/ui/pre-approval-drawer`: `rollback-financing/config.ts`, `wrecker-financing/config.ts`, `rotator-financing/config.ts`, `used-tow-truck-financing/config.ts`.
- **Stale documentation.** `components/ui/pre-approval-drawer/CLAUDE.md` documents deleted files (`config.ts`, `triggers.ts`), deleted attribute schemas (`data-drawer-*`), and deprecated usage patterns (`MarketingDrawerProvider`). The architecture table does not match the actual filesystem.
- **Dead code.** `MarketingDrawerProvider` is a one-line wrapper that the layout bypasses. `DrawerProvider` has zero consumers.
- **Test fragility.** `public-api.test.ts` asserts barrel-parity invariants (`DRAWER_HASH === preApprovalEntryHash`) that make the barrel harder to delete. Tests are split across two directories testing overlapping concerns.
- **Net assessment.** The current state is less organized than the pre-migration state. Before, ownership was in the wrong place but self-contained. Now, the abstractions are better but the system is harder to reason about because the runtime, API, docs, and tests do not agree on where the feature lives.

Conclusion:

- The migration spec's target architecture (§1, lines 56–76) envisioned `features/pre-approval/drawer/runtime/` and `features/pre-approval/drawer/ui/` containing all runtime and UI files. Only `runtime/parser.ts` and `runtime/session.ts` were actually moved there. The remaining 6 runtime/UI files were never relocated.
- Phase 6 was declared complete, but the Phase 6 gate requirement "public surface matches the intended production API with no regression" is satisfied only at the API contract level, not at the filesystem/ownership level.
- Phases 7–10 have been added to `plans/pre-approval-drawer-phase-gates.md` to complete the structural migration.

Verification matrix IDs affected:

- No matrix IDs are regressed. This is an architectural finding, not a behavioral regression.

Gate decision:

- `NO-GO` for declaring migration complete. Phases 7–10 required.

Next required action:

- Begin Phase 7: eliminate the 4 remaining barrel consumers by rewriting their imports to canonical paths.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 6`
- Batch / scope: Final Phase 6 verification-only closeout from the recorded partial cleanup checkpoint: rerun the impacted suite after the `RouteResetListener` fix, rerun removal searches, complete desktop/mobile browser validation, and decide the gate
- Status: `PASS`

Changes made:

- No production code changed in this batch. Continued from commit `47b94c1` and verified the already-landed canonical-only runtime, route clamping, shared caller cleanup, and deleted deep-import/CSS shims without redoing that cleanup.
- Updated [`plans/pre-approval-drawer-execution-log.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-execution-log.md) and [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) with the final Phase 6 evidence, exact removal-search results, browser observations, and gate decision.

Verification matrix IDs covered:

- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`
- `PA-INV-21`
- `PA-INV-23`
- `PA-INV-24`
- `PA-INV-26`

Commands run:

- `npm test -- 'features/pre-approval/__tests__/public-api.test.ts' 'features/pre-approval/__tests__/drawer-runtime.test.ts' 'components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx' 'components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx' 'components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx' 'components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx' 'components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx' 'components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx' 'components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx' 'components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx' 'components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx' 'components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx' 'app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx' 'app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx' 'components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx' 'components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx'`
- `npm run lint`
- `npm run build`
- `rg -n "data-drawer-|DrawerTriggerPayload|DrawerSelectionTrigger|buildDrawerContinueHref|resolveSelectionDrawerTrigger|buildDrawerTriggerDataAttributes|parseDrawerTriggerDataAttributes|heroTruckType" components features app --glob '!**/__tests__/**' --glob '!**/CLAUDE.md'`
- `rg -n "@/components/ui/pre-approval-drawer/config|@/components/ui/pre-approval-drawer/triggers" components features app`
- `rg -n "@/components/ui/pre-approval-drawer/amount-slider\\.css|components/ui/pre-approval-drawer/amount-slider\\.css|\\.\\/amount-slider\\.css" components features app --glob '!**/__tests__/**' --glob '!**/CLAUDE.md'`
- `curl -I http://127.0.0.1:3001/rollback-financing`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 1024`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser snapshot -i`
- `agent-browser click @e38`
- `agent-browser click @e14`
- `agent-browser click @e59`
- `agent-browser get url`
- `agent-browser set viewport 390 844 2 && agent-browser open http://127.0.0.1:3001/rollback-financing#get-pre-approved && agent-browser wait 1000 && agent-browser snapshot -i`
- `agent-browser click @e37 && agent-browser wait 500 && agent-browser get url`

Automated verification results:

- `PA-INV-09`, `PA-INV-10`, `PA-INV-11`, and `PA-INV-21`: the full post-fix impacted rerun passed `16` files and `80` tests with exit code `0`, closing the earlier stale `RouteResetListener` expectation gap.
- The impacted rerun emitted a non-failing `happy-dom` fetch error while exercising `http://localhost:3000/rollback-financing#get-pre-approved`, but Vitest completed green with no failing assertions or files.
- `npm run lint` passed again with the same pre-existing `23` unused-variable warnings in [`components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx) and [`components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx); no Phase 6 errors were introduced.
- `PA-INV-17`: `npm run build` passed, confirming the Phase 6 canonical-only runtime surface and removed compatibility files still compile in production.
- `PA-INV-09`, `PA-INV-23`, and `PA-INV-24`: `rg -n "data-drawer-|DrawerTriggerPayload|DrawerSelectionTrigger|buildDrawerContinueHref|resolveSelectionDrawerTrigger|buildDrawerTriggerDataAttributes|parseDrawerTriggerDataAttributes|heroTruckType" components features app --glob '!**/__tests__/**' --glob '!**/CLAUDE.md'` returned no matches.
- `PA-INV-24`: `rg -n "@/components/ui/pre-approval-drawer/config|@/components/ui/pre-approval-drawer/triggers" components features app` returned no matches.
- `PA-INV-23`: `rg -n "@/components/ui/pre-approval-drawer/amount-slider\\.css|components/ui/pre-approval-drawer/amount-slider\\.css|\\.\\/amount-slider\\.css" components features app --glob '!**/__tests__/**' --glob '!**/CLAUDE.md'` returned no matches.

Browser verification results:

- Route: `http://127.0.0.1:3001/rollback-financing`
- Viewport: desktop `1440x1024`; mobile `390x844 @ 2x`
- Trigger path: desktop used the canonical hero CTA after selecting `Light-Duty Rollback`; mobile used direct hash-open via `http://127.0.0.1:3001/rollback-financing#get-pre-approved`
- Observed behavior: the existing `3001` server was gone, so I started a new dev server on `3001`. On desktop, selecting `Light-Duty Rollback` enabled the canonical `Get Pre-Approved` CTA, clicking it opened the drawer with heading `Estimate how much financing you need.`, and `Continue to Pre-Approval` navigated to `http://127.0.0.1:3001/pre-approval?amount=100000&trucktype=rollback`. On mobile, the hash-open route loaded with the same drawer already open and `Continue to Pre-Approval` navigated to `http://127.0.0.1:3001/pre-approval?amount=100000`.

Evidence summary:

- The Phase 6 cleanup from commit `47b94c1` remains intact and verified: no production legacy authoring/API usage, no deep imports of deleted `config.ts` / `triggers.ts`, and no legacy CSS path imports remain.
- The full impacted post-fix suite, lint, and build are now complete from this checkpoint, eliminating the earlier evidence gap.
- Browser validation is complete for both required passes: desktop confirms the canonical CTA still opens the drawer and carries the selected truck type into the `/pre-approval?...` URL, and mobile confirms direct hash-open still works and continues into the canonical route.

Gate decision:

- `GO`

Blockers / regressions:

- None. The only interruption was that the previous `3001` dev server was no longer running, so I started a fresh local dev server before browser validation.

Next required action:

- Stop Phase 6 work here. The removal phase is fully verified and closed unless a new regression is reported.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 6`
- Batch / scope: Partial Phase 6 stopping point only: remove shared production compatibility authoring, delete legacy deep-import/CSS facades, land route clamping, and stop before final browser validation / final gate
- Status: `PARTIAL`

Changes made:

- Updated the Phase 6 runtime surface in [`features/pre-approval/routes.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/routes.ts), [`features/pre-approval/drawer/runtime/parser.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/parser.ts), and [`features/pre-approval/drawer/runtime/session.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/session.ts) so route amounts clamp to the contract min/max, the parser accepts canonical production/hash inputs only, and session state no longer carries legacy `source` / `heroTruckType` semantics.
- Updated the mounted drawer runtime in [`components/ui/pre-approval-drawer/DrawerContext.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerContext.tsx), [`components/ui/pre-approval-drawer/DrawerHashListener.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerHashListener.tsx), [`components/ui/pre-approval-drawer/PreApprovalDrawer.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/PreApprovalDrawer.tsx), [`components/ui/pre-approval-drawer/RouteResetListener.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/RouteResetListener.tsx), and [`components/ui/pre-approval-drawer/AmountSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/AmountSlider.tsx) to consume the feature-owned canonical modules directly, continue with `buildPreApprovalHref({ amount, truckType })`, and import the feature-owned slider stylesheet.
- Removed legacy authoring from the shared CTA surfaces and shared/default configs in [`components/ui/ripple-cta-link/RippleCtaLink.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx), [`components/sections/heroes/hero-gallery/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/config.ts), [`components/sections/heroes/hero-gallery/HeroGallery.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx), [`components/sections/heroes/hero-convert-geico/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/config.ts), [`components/sections/heroes/hero-convert-geico/TileSelector.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/TileSelector.tsx), [`components/sections/heroes/hero-convert-geico/HeroConvert.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/HeroConvert.tsx), [`components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx), [`components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx), [`components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx), [`components/sections/page/tertiary-strip/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/config.ts), [`components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx), [`components/sections/page/closing-cta/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/config.ts), [`components/sections/page/closing-cta/ClosingCta.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx), [`components/sections/page/how-it-works/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/how-it-works/config.ts), [`components/sections/page/how-it-works/HowItWorks.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/how-it-works/HowItWorks.tsx), [`components/sections/page/equipment-closing-cta/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/config.ts), [`components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx), [`components/sections/heroes/hero-showcase-rm/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-showcase-rm/config.ts), and [`components/sections/heroes/hero-showcase-rm/HeroShowcase.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-showcase-rm/HeroShowcase.tsx).
- Removed the legacy deep-import and CSS compatibility files [`components/ui/pre-approval-drawer/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/config.ts), [`components/ui/pre-approval-drawer/triggers.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/triggers.ts), and [`components/ui/pre-approval-drawer/amount-slider.css`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/amount-slider.css), and rewired the surviving public aliases through [`components/ui/pre-approval-drawer/index.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/index.ts).
- Updated the directly impacted tests in [`features/pre-approval/__tests__/public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts), [`features/pre-approval/__tests__/drawer-runtime.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-runtime.test.ts), [`components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx), [`components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), [`components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx), [`components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx), [`components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx), [`components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx), [`components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx), [`components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx), [`components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx), and [`components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx); deleted the obsolete legacy-helper suite [`components/ui/pre-approval-drawer/__tests__/triggers.test.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/triggers.test.ts).

Verification matrix IDs covered:

- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`
- `PA-INV-21`
- `PA-INV-23`
- `PA-INV-24`
- `PA-INV-26`

Commands run:

- `git diff -- features/pre-approval/routes.ts features/pre-approval/drawer/runtime/parser.ts features/pre-approval/drawer/runtime/session.ts components/ui/pre-approval-drawer/DrawerHashListener.tsx components/ui/pre-approval-drawer/DrawerContext.tsx components/ui/pre-approval-drawer/PreApprovalDrawer.tsx components/ui/pre-approval-drawer/AmountSlider.tsx components/ui/ripple-cta-link/RippleCtaLink.tsx components/sections/heroes/hero-lead-gen/config.ts components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`
- `rg -n "drawer\\??:|drawer:|drawerTitle|DRAWER_HASH|preApprovalSelectionTrigger|preApprovalTrigger" 'app/(marketing)' components/sections --glob 'config.ts' --glob '!**/__tests__/**'`
- `rg -n "resolveSelectionDrawerTrigger|buildDrawerTriggerDataAttributes|buildDrawerContinueHref|parseDrawerTriggerDataAttributes|createDrawerSession|getClosedDrawerSession|DrawerTriggerPayload|DrawerSelectionTrigger|DrawerSessionState|drawer=|drawerTitle=|data-drawer-" components features app --glob '!**/__tests__/**'`
- `rg -n "@/components/ui/pre-approval-drawer/config|@/components/ui/pre-approval-drawer/triggers" components features app`
- `rg -n "data-drawer-|DrawerTriggerPayload|DrawerSelectionTrigger|buildDrawerContinueHref|resolveSelectionDrawerTrigger|buildDrawerTriggerDataAttributes|parseDrawerTriggerDataAttributes|heroTruckType" components features app --glob '!**/__tests__/**' --glob '!**/CLAUDE.md'`
- `rg -n "./amount-slider.css|@/components/ui/pre-approval-drawer/amount-slider.css|@/features/pre-approval/amount-slider.css" components features app --glob '!**/__tests__/**' --glob '!**/CLAUDE.md'`
- `npm run lint`
- `npm test -- 'features/pre-approval/__tests__/public-api.test.ts' 'features/pre-approval/__tests__/drawer-runtime.test.ts' 'components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx' 'components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx' 'components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx' 'components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx' 'components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx' 'components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx' 'components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx' 'components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx' 'components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx' 'components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx' 'app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx' 'app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx' 'components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx' 'components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx'`
- `npm test -- 'components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx'`
- `npm run build`

Automated verification results:

- `npm run lint` passed with only the existing unused-variable warnings in the pre-approval drawer motion-mock tests; no new Phase 6 lint errors were introduced.
- `PA-INV-26`: [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) now verifies min/max amount clamping in `normalizePreApprovalAmount()`, `buildPreApprovalHref()`, and `parsePreApprovalSearchParams()`, covering below-min and above-max values.
- `PA-INV-09`, `PA-INV-10`, `PA-INV-11`, and `PA-INV-21`: the targeted Phase 6 run passed `15` files and `79` tests before one stale expectation failed in [`RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx) after the session-origin cleanup changed the closed default `pageId` back to `unknown-page`.
- Updated that stale expectation in [`RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx), then reran the file and it passed `6` tests. I did not rerun the full impacted suite after that fix because this batch is intentionally stopping early.
- `PA-INV-17`: `npm run build` passed after the cleanup, confirming the canonical-only runtime surface, removed deep-import files, and removed CSS shim compile successfully together.
- `PA-INV-24`: `rg -n "@/components/ui/pre-approval-drawer/config|@/components/ui/pre-approval-drawer/triggers" components features app` returned no matches, confirming the legacy deep-import paths are no longer referenced.
- `PA-INV-09`, `PA-INV-23`, and `PA-INV-24`: `rg -n "data-drawer-|DrawerTriggerPayload|DrawerSelectionTrigger|buildDrawerContinueHref|resolveSelectionDrawerTrigger|buildDrawerTriggerDataAttributes|parseDrawerTriggerDataAttributes|heroTruckType" components features app --glob '!**/__tests__/**' --glob '!**/CLAUDE.md'` returned no matches, confirming the production code no longer depends on the removed legacy authoring APIs.
- `PA-INV-23`: `rg -n "./amount-slider.css|@/components/ui/pre-approval-drawer/amount-slider.css|@/features/pre-approval/amount-slider.css" components features app --glob '!**/__tests__/**' --glob '!**/CLAUDE.md'` now matches only the feature-owned stylesheet import in [`AmountSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/AmountSlider.tsx) and [`TermLengthSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/term-length-slider/TermLengthSlider.tsx); the legacy CSS path is gone.

Browser verification results:

- Route: not yet rerun for this partial Phase 6 stopping point
- Viewport: not yet rerun
- Trigger path: existing dev server remains available on `http://127.0.0.1:3001`
- Observed behavior: no new desktop/mobile Phase 6 browser evidence recorded in this batch

Evidence summary:

- This is a controlled Phase 6 stopping point, not a phase close. The shared production compatibility authoring has been removed, the legacy deep-import/CSS shims have been deleted, the route contract now clamps amount inputs, and the canonical barrel surface still compiles.
- The removal searches are clean for production code: no production `data-drawer-*` emission, no `DrawerTriggerPayload` / `DrawerSelectionTrigger` authoring, no deep imports of the deleted `config.ts` / `triggers.ts`, and no remaining imports of the deleted legacy CSS path.
- Automated verification is partially complete: lint and build are green, route clamping is covered, and the directly impacted suite was mostly green before a single stale expectation was fixed locally. The consolidated impacted-suite rerun and the required desktop/mobile browser validation are still pending.

Gate decision:

- `NO-GO`

Blockers / regressions:

- No active implementation blocker. The phase remains `NO-GO` only because the full post-fix impacted-suite rerun and the required desktop/mobile browser validation were intentionally deferred at this stopping point.

Next required action:

- Resume Phase 6 from this checkpoint only: rerun the full impacted automated suite after the `RouteResetListener` expectation fix, complete desktop and mobile browser validation against the running dev server on port `3001`, then update the Phase 6 checklist and decide `GO` / `NO-GO` from that final evidence.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 5`
- Batch / scope: Final Phase 5 batch only: verify route/page config migration callers, remaining shared renderers, and preserved compatibility paths without starting Phase 6 cleanup
- Status: `PASS`

Changes made:

- Added focused Phase 5 caller coverage in [`app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx) for the migrated homepage shared config authors in [`components/sections/heroes/hero-gallery/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/config.ts), [`components/sections/page/how-it-works/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/how-it-works/config.ts), and [`components/sections/page/closing-cta/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/config.ts).
- Added focused renderer and caller coverage in [`app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx) for the migrated program-page hero/sidebar/inline CTA authors plus the still-shared promo-panel and bottom-link renderer plumbing.
- Added financing and program closing-surface coverage in [`components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx) and [`components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx) to verify canonical trigger emission for the final route/page-config batch, including truck-type handoff on program closing tiles.
- Added shared-surface fallback coverage in [`components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx) and [`components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx) so the canonical tertiary-link wiring and preserved legacy drawer fallback remain covered while those shared hero surfaces stay compatibility-capable.
- Kept the implementation surface unchanged beyond these tests; no compatibility removal, legacy-prop deletion, or Phase 6 cleanup was attempted.

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-02`
- `PA-INV-03`
- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`
- `PA-INV-21`
- `PA-INV-24`

Commands run:

- `npm test -- app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx features/pre-approval/__tests__/public-api.test.ts`
- `rg -n "DRAWER_HASH|drawer:" app/'(marketing)' components/sections --glob 'config.ts' --glob '!**/__tests__/**'`
- `rg -n "preApprovalTrigger|preApprovalEntryHash" app/'(marketing)' components/sections --glob 'config.ts' --glob '!**/__tests__/**'`
- `rg -n "drawer:" app/'(marketing)'/'(programs)' app/'(marketing)'/'(financing)' components/sections/heroes components/sections/page --glob 'config.ts' --glob '!**/__tests__/**'`
- `rg -n "DRAWER_HASH" app/'(marketing)'/'(programs)' app/'(marketing)'/'(financing)' components/sections/heroes components/sections/page --glob 'config.ts' --glob '!**/__tests__/**'`
- `npm run lint`
- `npm run build`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rotator-financing`
- `agent-browser eval '(() => { const link = document.querySelector("a[data-pre-approval-origin-section-id=\"tertiary-strip-primary\"]"); if (!(link instanceof HTMLAnchorElement)) return { found: false }; const payload = { href: link.getAttribute("href"), dataset: { ...link.dataset }, text: link.textContent?.trim() ?? null }; link.click(); return { found: true, payload }; })()'`
- `agent-browser wait 500`
- `agent-browser eval '(() => { const dialog = document.querySelector("[role=\"dialog\"]"); const continueButton = Array.from(document.querySelectorAll("button")).find((el) => /continue/i.test(el.textContent ?? "")); return { dialogOpen: Boolean(dialog), dialogText: dialog?.textContent?.slice(0, 120) ?? null, continueLabel: continueButton?.textContent?.trim() ?? null }; })()'`
- `agent-browser eval '(() => { const button = Array.from(document.querySelectorAll("button")).find((el) => /continue to pre-approval/i.test(el.textContent ?? "")); if (!(button instanceof HTMLButtonElement)) return { clicked: false }; button.click(); return { clicked: true }; })()'`
- `agent-browser wait 500`
- `agent-browser get url`
- `agent-browser set device "iPhone 14"`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser eval '(() => { const link = Array.from(document.querySelectorAll("a")).find((el) => /What.s my buying power\?/i.test(el.textContent ?? "")); if (!(link instanceof HTMLAnchorElement)) return { found: false }; const payload = { href: link.getAttribute("href"), dataset: { ...link.dataset }, text: link.textContent?.trim() ?? null }; link.click(); return { found: true, payload }; })()'`
- `agent-browser wait 500`
- `agent-browser eval '(() => { const dialog = document.querySelector("[role=\"dialog\"]"); return { dialogOpen: Boolean(dialog), dialogText: dialog?.textContent?.slice(0, 120) ?? null }; })()'`
- `agent-browser eval '(() => { const button = Array.from(document.querySelectorAll("button")).find((el) => /continue to pre-approval/i.test(el.textContent ?? "")); if (!(button instanceof HTMLButtonElement)) return { clicked: false }; button.click(); return { clicked: true }; })()'`
- `agent-browser wait 500`
- `agent-browser get url`
- `agent-browser open http://127.0.0.1:3001/deferred-payment-tow-truck-financing`
- `agent-browser eval '(() => { const link = document.querySelector("a[aria-label=\"Get pre-approved for a rotator\"]"); if (!(link instanceof HTMLAnchorElement)) return { found: false }; const payload = { href: link.getAttribute("href"), dataset: { ...link.dataset }, text: link.textContent?.trim() ?? null }; link.click(); return { found: true, payload }; })()'`
- `agent-browser wait 500`
- `agent-browser eval '(() => { const dialog = document.querySelector("[role=\"dialog\"]"); return { dialogOpen: Boolean(dialog), dialogText: dialog?.textContent?.slice(0, 120) ?? null }; })()'`
- `agent-browser eval '(() => { const button = Array.from(document.querySelectorAll("button")).find((el) => /continue to pre-approval/i.test(el.textContent ?? "")); if (!(button instanceof HTMLButtonElement)) return { clicked: false }; button.click(); return { clicked: true }; })()'`
- `agent-browser wait 500`
- `agent-browser get url`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing#get-pre-approved`
- `agent-browser wait 500`
- `agent-browser eval '(() => { const dialog = document.querySelector("[role=\"dialog\"]"); const continueButton = Array.from(document.querySelectorAll("button")).find((el) => /continue/i.test(el.textContent ?? "")); return { dialogOpen: Boolean(dialog), dialogText: dialog?.textContent?.slice(0, 120) ?? null, continueLabel: continueButton?.textContent?.trim() ?? null, currentHash: window.location.hash }; })()'`
- `agent-browser eval '(() => { const button = Array.from(document.querySelectorAll("button")).find((el) => /continue to pre-approval/i.test(el.textContent ?? "")); if (!(button instanceof HTMLButtonElement)) return { clicked: false }; button.click(); return { clicked: true }; })()'`
- `agent-browser wait 500`
- `agent-browser get url`

Automated verification results:

- The targeted Phase 5 route/page-config suite passed `10` test files and `43` tests. The run emitted the same existing happy-dom `localhost:3000` fetch noise during [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), but all assertions passed and no test failed.
- `PA-INV-10`: the new caller tests in [`homepagePreApprovalCallers.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx), [`preApprovalConfigRenderers.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx), [`preApprovalCallers.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx), and [`preApprovalCallers.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx) verify that the homepage shared config callers, the final program-page config callers, and the final financing-page config callers now emit canonical `data-pre-approval-*` attributes from the authored `preApprovalTrigger` contract.
- `PA-INV-09`: [`HeroConvertTertiaryLinks.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx) and [`HeroConvertTertiaryLinks.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx) confirm the untouched legacy `drawer` fallback remains available on shared hero tertiary-link surfaces while canonical trigger wiring is preferred where authored.
- `PA-INV-11`: rerunning [`RippleCtaLink.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx) and [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) reconfirmed that the canonical schema wins whenever both canonical and legacy compatibility props are present.
- `PA-INV-21`: rerunning [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx) kept direct-hash compatibility-origin coverage in the suite while the batch validated untouched compatibility behavior around the migrated callers.
- `PA-INV-24`: the residual search queries show the final Phase 5 route/page-config batch no longer depends on legacy route-page authoring semantics. `rg -n "DRAWER_HASH" ... --glob 'config.ts'` now matches only intentionally retained earlier-batch hero selection/default compatibility configs in [`components/sections/heroes/hero-lead-gen/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/config.ts), [`components/sections/heroes/hero-convert-geico/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/config.ts), and the earlier-batch financing hero selection configs in [`app/(marketing)/(financing)/rollback-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/rollback-financing/config.ts), [`app/(marketing)/(financing)/wrecker-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/wrecker-financing/config.ts), [`app/(marketing)/(financing)/rotator-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/rotator-financing/config.ts), and [`app/(marketing)/(financing)/used-tow-truck-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/used-tow-truck-financing/config.ts); none of the newly migrated homepage/program/financing route-page callers from this final batch remain on `DRAWER_HASH`.
- `PA-INV-24`: `rg -n "drawer:" ... --glob 'config.ts'` now matches only canonical trigger-construction helpers that populate `trigger.drawer.title` inside the migrated config factories; it does not show any remaining legacy route-page caller authoring via `drawer: { ... }` payloads in the final-batch configs.
- `npm run lint`: completed with the same existing unused-variable warnings in the legacy pre-approval drawer motion-mock tests; no new Phase 5 final-batch lint errors or warnings were introduced.
- `PA-INV-17`: `npm run build` passed, confirming the final caller migration batch and preserved compatibility surfaces still compile cleanly.

Browser verification results:

- Route: `/rotator-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: click the canonical financing tertiary-strip CTA emitted from the final route-config batch (`Already have a rotator in mind? I found a truck and need financing`), then Continue
- Observed behavior: the link exposed canonical `data-pre-approval-*` attributes with `pageId="rotator-financing"`, `sectionId="tertiary-strip-primary"`, `ctaId="found-truck-cta"`, and the legacy title override `How much is the rotator you found?`; clicking it opened the drawer on-page with that title, and Continue navigated immediately to `http://127.0.0.1:3001/pre-approval?amount=100000`.

- Route: `/`
- Viewport: mobile (`iPhone 14`)
- Trigger path: click the canonical homepage tertiary link `What’s my buying power?`, then Continue
- Observed behavior: the link exposed canonical homepage trigger metadata with `pageId="home"`, `sectionId="hero-tertiary-links"`, `ctaId="hero-tertiary-buying-power"`, and drawer title `Estimate your buying power`; the drawer opened correctly on mobile with that title, and Continue navigated to `http://127.0.0.1:3001/pre-approval?amount=100000`.

- Route: `/deferred-payment-tow-truck-financing`
- Viewport: mobile (`iPhone 14`)
- Trigger path: click the canonical program closing tile `Rotator`, then Continue
- Observed behavior: the closing tile exposed canonical `data-pre-approval-*` attributes with `pageId="deferred-payment-tow-truck-financing"`, `sectionId="closing-cta-tiles"`, `ctaId="closing-tile-rotator"`, and `trucktype=rotator`; the drawer opened with the default title, and Continue navigated to `http://127.0.0.1:3001/pre-approval?amount=100000&trucktype=rotator`.

- Route: `/rollback-financing#get-pre-approved`
- Viewport: desktop (`1440x900`)
- Trigger path: direct-load hash open for the untouched compatibility path, then Continue
- Observed behavior: the drawer opened on first load with the default title `Estimate how much financing you need.`, the hash normalized away after the sheet opened, and Continue navigated to `http://127.0.0.1:3001/pre-approval?amount=100000`.

Evidence summary:

- The final Phase 5 route/page-config batch is now verified end to end: targeted caller tests passed, residual searches show the migrated callers no longer rely on legacy authoring semantics, `npm run lint` and `npm run build` are green, and desktop/mobile browser validation covered canonical homepage, program-page, and financing-page flows plus an untouched compatibility path.
- The preserved compatibility surfaces still behave as intended: canonical triggers are emitted for the migrated callers, legacy `drawer` fallback remains available on the shared hero surfaces that still expose it, and direct-hash entry continues to work without requiring a `/pre-approval` page implementation in this standalone marketing repo.
- No Phase 6 cleanup was mixed into this batch. Compatibility props, deep imports, and legacy runtime support remain intentionally preserved pending the separate removal phase.
- With earlier Phase 5 batches already recorded as `PASS`, this final route/page-config batch closes the remaining Phase 5 checklist item. `Phase 5` overall is `GO`.

Gate decision:

- `GO`

Blockers / regressions:

- None for the final `Phase 5` batch.

Next required action:

- Stop with `Phase 5` complete and do not start `Phase 6` until explicitly instructed.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 5`
- Batch / scope: Batch 6 only: migrate the shared term-length-slider CSS consumer to a feature-owned amount-slider stylesheet while preserving the legacy drawer CSS path as a compatibility shim
- Status: `PASS`

Changes made:

- Added the feature-owned shared slider stylesheet [`features/pre-approval/amount-slider.css`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/amount-slider.css) and moved the canonical shared slider rules there without changing the visual values or thumb sizing.
- Updated the authorized shared external consumer [`components/sections/page/term-length-slider/TermLengthSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/term-length-slider/TermLengthSlider.tsx) to import the feature-owned stylesheet instead of the legacy drawer path.
- Preserved the legacy CSS compatibility path by converting [`components/ui/pre-approval-drawer/amount-slider.css`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/amount-slider.css) into a shim that re-imports the feature-owned stylesheet, leaving the untouched drawer slider consumer on its existing `./amount-slider.css` import.
- Added focused coverage in [`components/sections/page/term-length-slider/__tests__/TermLengthSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/term-length-slider/__tests__/TermLengthSlider.test.tsx) for the shared slider class usage and model-year-to-term interaction, and updated the local dependency note in [`components/sections/page/term-length-slider/CLAUDE.md`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/term-length-slider/CLAUDE.md).

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-09`
- `PA-INV-17`
- `PA-INV-23`

Commands run:

- `npm test -- components/sections/page/term-length-slider/__tests__/TermLengthSlider.test.tsx components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx`
- `rg -n "@/components/ui/pre-approval-drawer/amount-slider.css|@/features/pre-approval/amount-slider.css|\./amount-slider.css" components app features --glob '!**/__tests__/**'`
- `npm run lint`
- `npm run build`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser eval '(() => { const slider = document.querySelector("input[aria-label=\"Select truck model year\"]"); if (!(slider instanceof HTMLInputElement)) return { found: false }; const result = Array.from(document.querySelectorAll("p")).find((el) => /months$/.test(el.textContent?.trim() ?? "")); return { found: true, value: slider.value, ariaValueText: slider.getAttribute("aria-valuetext"), className: slider.className, resultText: result?.textContent?.trim() ?? null }; })()'`
- `agent-browser set viewport 390 844`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser eval '(() => { const slider = document.querySelector("input[aria-label=\"Select truck model year\"]"); if (!(slider instanceof HTMLInputElement)) return { found: false }; const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set; setValue?.call(slider, "2018"); slider.dispatchEvent(new Event("input", { bubbles: true })); slider.dispatchEvent(new Event("change", { bubbles: true })); const result = Array.from(document.querySelectorAll("p")).find((el) => /months$/.test(el.textContent?.trim() ?? "")); return { found: true, value: slider.value, ariaValueText: slider.getAttribute("aria-valuetext"), resultText: result?.textContent?.trim() ?? null, className: slider.className }; })()'`
- `agent-browser eval '(() => { const link = Array.from(document.querySelectorAll("a")).find((el) => el.textContent?.includes("I found a truck and need financing")); if (!(link instanceof HTMLAnchorElement)) return { clicked: false }; link.click(); return { clicked: true, dataset: { ...link.dataset } }; })()'`
- `agent-browser wait 500`
- `agent-browser wait --text "How much is the rollback you found?"`
- `agent-browser eval '(() => { const slider = document.querySelector("input[name=\"estimated-financing-amount\"]"); return { dialogOpen: Boolean(document.querySelector("[role=dialog]")), sliderClass: slider instanceof HTMLInputElement ? slider.className : null, sliderAriaValueText: slider instanceof HTMLInputElement ? slider.getAttribute("aria-valuetext") : null }; })()'`

Automated verification results:

- The new focused [`TermLengthSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/term-length-slider/__tests__/TermLengthSlider.test.tsx) passed `1` test verifying the shared `slider-thumb` class remains on the rendered control and that changing the model year updates the announced term length from `60 months` to `72 months` in the component logic.
- [`AmountSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx) passed `5` tests after the legacy CSS file became a shim, confirming the untouched drawer slider still renders, formats currency, and exposes the expected accessibility attributes through the compatibility import path.
- `PA-INV-23`: `rg -n "@/components/ui/pre-approval-drawer/amount-slider.css|@/features/pre-approval/amount-slider.css|\./amount-slider.css" components app features --glob '!**/__tests__/**'` shows the shared term-length-slider caller now imports the feature-owned stylesheet while [`AmountSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/AmountSlider.tsx) remains on `./amount-slider.css`, proving the legacy CSS path is still present for untouched consumers.
- `npm run lint` completed with the same pre-existing unused-variable warnings in the pre-approval drawer motion-mock tests; no new shared-CSS batch warnings or errors were introduced.
- `PA-INV-17`: `npm run build` passed, confirming the migrated external consumer and the untouched legacy drawer import both compile.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: load the purchase-and-terms section and inspect the term-length slider before interaction
- Observed behavior: the term-length slider rendered on the page with the shared `slider-thumb` class, initial `aria-valuetext` of `2021 model year, up to 72 month term`, and visible result text `72 months`, confirming the migrated feature-owned stylesheet path applies on the live page.

- Route: `/rollback-financing`
- Viewport: mobile (`390x844`)
- Trigger path: change the term-length slider year to `2018`, then click the untouched legacy CTA `I found a truck and need financing`
- Observed behavior: the term-length slider updated live to `2018 model year, up to 60 month term` and `60 months`, then the untouched legacy CTA still opened the drawer with the expected legacy title `How much is the rollback you found?`; inside the open drawer, the amount slider remained present with the shared `slider-thumb` class and `aria-valuetext="$100,000"` through the compatibility CSS import path.

Evidence summary:

- This batch stayed within the authorized shared CSS scope: it migrated only the external shared stylesheet consumer to a feature-owned target and preserved the legacy drawer stylesheet path as a compatibility shim for untouched imports.
- No route/page config work, CTA contract migration, compatibility removal, or Phase 6 cleanup was mixed into this batch.
- The browser pass covered both sides of the compatibility requirement: the migrated shared page slider works from the new feature-owned stylesheet, and the untouched legacy drawer slider still works from the preserved legacy CSS import path.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Move to the final allowed Phase 5 batch only: route/page config migration. Do not start Phase 6 cleanup or remove the legacy CSS compatibility path.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 5`
- Batch / scope: Batch 5 only: migrate the rollback, wrecker, and used-truck tile-selection hero callers to a feature-owned, server-safe canonical trigger helper while preserving the legacy tile-selection compatibility path
- Status: `PASS`

Changes made:

- Added the feature-owned server-safe tile-selection helper [`features/pre-approval/selection.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/selection.ts) with canonical hero trigger constants for rollback, wrecker, rotator, and used-tow-truck flows plus the shared `resolvePreApprovalSelectionTrigger()` resolution path.
- Added focused helper coverage in [`features/pre-approval/__tests__/selection.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/selection.test.ts) for the rollback, wrecker, and used-truck canonical truck-type mappings.
- Updated the legacy compatibility facade in [`components/ui/pre-approval-drawer/triggers.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/triggers.ts) so the old `resolveSelectionDrawerTrigger()` and exported hero constants stay available while reusing the feature-owned truck-type resolution rules.
- Updated [`components/sections/heroes/hero-convert-geico/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/config.ts), [`components/sections/heroes/hero-convert-geico/TileSelector.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/TileSelector.tsx), [`components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx), and [`components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight.tsx) so shared tile-selector callers can author `preApprovalSelectionTrigger`, prefer the canonical feature path, and still fall back to the legacy `drawer` path for untouched callers.
- Migrated only the authorized hero configs to the canonical feature helper: [`app/(marketing)/(financing)/rollback-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/rollback-financing/config.ts), [`app/(marketing)/(financing)/wrecker-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/wrecker-financing/config.ts), and [`app/(marketing)/(financing)/used-tow-truck-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/used-tow-truck-financing/config.ts).
- Added focused selector coverage in [`components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx) and [`components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx) for both canonical migrated callers and preserved legacy compatibility callers.

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-03`
- `PA-INV-04`
- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`

Commands run:

- `rg -n "preApprovalSelectionTrigger|ROLLBACK_HERO_DRAWER|WRECKER_HERO_DRAWER|USED_TOW_TRUCK_HERO_DRAWER|resolveSelectionDrawerTrigger|resolvePreApprovalSelectionTrigger" app components features --glob '!**/__tests__/**' --glob '!**/*test*'`
- `npm test -- features/pre-approval/__tests__/selection.test.ts components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx components/ui/pre-approval-drawer/__tests__/triggers.test.ts components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx features/pre-approval/__tests__/public-api.test.ts`
- `npm run lint`
- `npm run build`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser click @e38`
- `agent-browser eval '(() => { const link = document.querySelector("#hero a[href=\"#get-pre-approved\"]"); if (!(link instanceof HTMLAnchorElement)) return null; return { href: link.getAttribute("href"), dataset: { ...link.dataset } }; })()'`
- `agent-browser click @e14`
- `agent-browser click @e59`
- `agent-browser open http://127.0.0.1:3001/wrecker-financing`
- `agent-browser click @e40`
- `agent-browser eval '(() => { const link = document.querySelector("#hero a[href=\"#get-pre-approved\"]"); if (!(link instanceof HTMLAnchorElement)) return null; return { href: link.getAttribute("href"), dataset: { ...link.dataset } }; })()'`
- `agent-browser click @e14`
- `agent-browser click @e60`
- `agent-browser set device "iPhone 14"`
- `agent-browser open http://127.0.0.1:3001/used-tow-truck-financing`
- `agent-browser click @e44`
- `agent-browser eval '(() => { const link = document.querySelector("#hero a[href=\"#get-pre-approved\"]"); if (!(link instanceof HTMLAnchorElement)) return null; return { href: link.getAttribute("href"), dataset: { ...link.dataset } }; })()'`
- `agent-browser click @e12`
- `agent-browser click @e42`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser click @e15`
- `agent-browser click @e59`

Automated verification results:

- `PA-INV-04` and `PA-INV-10`: [`selection.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/selection.test.ts) passed `2` tests verifying the canonical rollback, wrecker, and used-truck tile-selection truck-type mappings and the shared feature-owned truck-type resolver behavior.
- `PA-INV-10`: [`TileSelector.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx) and [`FramedTileSelector.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx) passed `4` tests verifying that migrated tile-selector callers now emit canonical `data-pre-approval-*` attributes with the resolved hero truck type.
- `PA-INV-09`: the same selector test files also verify the preserved legacy fallback path, showing untouched callers still emit `data-drawer-*` attributes through the compatibility helper when they continue to author `drawer`.
- `PA-INV-09`, `PA-INV-10`, and `PA-INV-11`: rerunning [`RippleCtaLink.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx), [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts), and [`triggers.test.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/triggers.test.ts) passed `34` additional tests, confirming legacy trigger parsing still works, canonical trigger attributes still work, the new schema still wins when both schemas are present, and the compatibility facade remains aligned with the feature-owned contracts. The same existing happy-dom `localhost:3000` fetch noise appeared during the direct-hash suite, but no assertion failed.
- `PA-INV-17`: `npm run build` passed after the tile-selection caller cutover, confirming the compatibility facade and untouched callers still compile while later Phase 5 batches remain pending.
- `rg -n "preApprovalSelectionTrigger|ROLLBACK_HERO_DRAWER|WRECKER_HERO_DRAWER|USED_TOW_TRUCK_HERO_DRAWER|resolveSelectionDrawerTrigger|resolvePreApprovalSelectionTrigger" app components features --glob '!**/__tests__/**' --glob '!**/*test*'` shows only the three authorized hero configs now author `preApprovalSelectionTrigger`, while the shared selectors retain the legacy `resolveSelectionDrawerTrigger()` fallback and the compatibility module still exports the legacy tile-selection constants for untouched callers.
- `npm run lint`: passed with the same pre-existing unused-variable warnings in the pre-approval drawer motion-mock tests; no new tile-selection batch lint issues were introduced.
- `npm run build`: passed.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: select `Light-Duty Rollback`, inspect the hero CTA DOM attributes, open the drawer, then Continue
- Observed behavior: the hero CTA becomes an in-page link with canonical `data-pre-approval-*` attributes including `data-pre-approval-origin-page-id="rollback-financing"` and `data-pre-approval-handoff-truck-type="rollback"`, the drawer opens with the default title `Estimate how much financing you need.`, and Continue navigates to `http://127.0.0.1:3001/pre-approval?amount=100000&trucktype=rollback`.

- Route: `/wrecker-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: select `Heavy Wrecker`, inspect the hero CTA DOM attributes, open the drawer, then Continue
- Observed behavior: the hero CTA emits canonical `data-pre-approval-*` attributes with `data-pre-approval-origin-page-id="wrecker-financing"` and `data-pre-approval-handoff-truck-type="heavy-wrecker"`, the drawer opens with the default title, and Continue navigates to `http://127.0.0.1:3001/pre-approval?amount=100000&trucktype=heavy-wrecker`.

- Route: `/used-tow-truck-financing`
- Viewport: mobile (`iPhone 14`)
- Trigger path: select `Rotator`, inspect the hero CTA DOM attributes, open the drawer, then Continue
- Observed behavior: the hero CTA emits canonical `data-pre-approval-*` attributes with `data-pre-approval-origin-page-id="used-tow-truck-financing"` and `data-pre-approval-handoff-truck-type="rotator"`, the drawer opens correctly on mobile, and Continue navigates to `http://127.0.0.1:3001/pre-approval?amount=100000&trucktype=rotator`.

- Route: `/rollback-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: click the untouched tertiary CTA `I found a truck and need financing`, confirm the drawer title, then Continue
- Observed behavior: the untouched compatibility caller still opens the drawer with the legacy title `How much is the rollback you found?`, and Continue navigates to the legacy amount-only handoff `http://127.0.0.1:3001/pre-approval?amount=100000`.

Evidence summary:

- This batch stayed within the allowed Phase 5 tile-selection scope: only the rollback, wrecker, and used-truck hero callers were migrated to the canonical feature-owned helper, with no shared CSS changes, route/page-config migration, compatibility removal, or Phase 6 cleanup mixed in.
- Tile-selection trigger resolution now has a feature-owned, server-safe canonical surface in [`selection.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/selection.ts), and the shared tile-selector components prefer that canonical path while still preserving the legacy fallback for untouched callers.
- Mixed old/new callers still coexist after the batch: the authorized hero flows now emit canonical production trigger attributes and preserve exact truck-type handoff, while untouched legacy callers continue to open and continue through the compatibility path.

Gate decision:

- `GO`

Blockers / regressions:

- None. Browser automation required escalated execution for `agent-browser` because its socket directory lives under `~/.agent-browser`, but the validation completed successfully once run outside the sandbox.

Next required action:

- Move to the next allowed Phase 5 caller batch only: shared CSS consumer migration. Do not start route/page-config work, compatibility removal, or Phase 6 cleanup until the shared CSS batch reaches its own `GO` gate.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 5`
- Batch / scope: Batch 4 only: migrate the fixed hero-preset caller path for the rotator lead-gen hero to the canonical trigger contract, and repair the shared CTA primitive when browser validation exposed dropped canonical data attributes
- Status: `PASS`

Changes made:

- Updated [`components/sections/heroes/hero-lead-gen/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/config.ts) so lead-gen hero CTAs can author `preApprovalTrigger` while retaining the legacy `drawer` compatibility prop.
- Updated [`components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx) to prefer the canonical `preApprovalTrigger` path when rendering the hero CTA and keep the legacy drawer path intact for untouched callers.
- Updated [`app/(marketing)/(financing)/rotator-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/rotator-financing/config.ts) so the rotator hero CTA now authors an explicit canonical `PreApprovalTrigger` with stable hero origin IDs and `handoff.truckType = "rotator"` instead of relying on the legacy preset constant.
- Added focused hero-preset coverage in [`HeroLeadGen.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx) for canonical hero attribute emission and the preserved legacy compatibility path.
- Updated [`components/ui/ripple-cta-link/RippleCtaLink.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) to render internal links through `next/link` with a real `<a>` child so the canonical `data-pre-approval-*` and legacy `data-drawer-*` attributes reach the DOM in the browser. This regression fix was required after the initial Batch 4 browser run showed the rotator hero CTA opened via bare hash fallback and lost its truck-type handoff.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) to record the completed hero-preset batch while leaving the tile-selection helper, shared-CSS, and route/page-config batches open.

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-03`
- `PA-INV-04`
- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`

Commands run:

- `npm test -- components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx features/pre-approval/__tests__/public-api.test.ts components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`
- `rg -n "ROTATOR_HERO_DRAWER|preApprovalTrigger|DrawerSelectionTrigger|resolveSelectionDrawerTrigger" app components --glob '!**/*test*'`
- `npm run lint`
- `npm run build`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rotator-financing`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === 'Get Pre-Approved'); if (!(link instanceof HTMLAnchorElement)) return null; return { href: link.getAttribute('href'), dataset: { ...link.dataset } }; })()"`
- `agent-browser click @e14`
- `agent-browser wait --text "Estimate how much financing you need."`
- `agent-browser click @e59`
- `agent-browser get url`
- `agent-browser open http://127.0.0.1:3001/rotator-financing`
- `agent-browser click @e15`
- `agent-browser wait --text "How much is the rotator you found?"`
- `agent-browser click @e59`
- `agent-browser get url`

Automated verification results:

- `PA-INV-10` and `PA-INV-04`: [`HeroLeadGen.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx) passed `2` tests verifying that the rotator hero CTA emits canonical production attributes with `data-pre-approval-handoff-truck-type="rotator"` and that the legacy `drawer` compatibility path remains available for untouched lead-gen callers.
- `PA-INV-09`, `PA-INV-10`, and `PA-INV-11`: the targeted rerun of [`RippleCtaLink.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx), [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts), and [`PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx) passed `44` tests across `4` files, confirming canonical parsing still works, legacy compatibility still works, schema precedence remains intact, and the drawer continue path still preserves hero truck-type handoff. The same existing happy-dom `localhost:3000` fetch noise appeared during the direct-hash suite, but no assertion failed.
- `PA-INV-17`: `npm run build` passed after the hero-preset cutover and the shared CTA fix, confirming the remaining compatibility surface and untouched later-batch callers still compile.
- `rg -n "ROTATOR_HERO_DRAWER|preApprovalTrigger|DrawerSelectionTrigger|resolveSelectionDrawerTrigger" app components --glob '!**/*test*'` shows [`rotator-financing/config.ts`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/rotator-financing/config.ts) now uses `preApprovalTrigger`, while the remaining `DrawerSelectionTrigger` / `resolveSelectionDrawerTrigger` usages are isolated to later tile-selection batches.
- `npm run lint`: passed with the same pre-existing unused-variable warnings in the pre-approval drawer motion-mock tests; no new hero-preset batch lint issues were introduced.
- `npm run build`: passed.

Browser verification results:

- Route: `/rotator-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: click the hero CTA `Get Pre-Approved`, wait for the drawer, then Continue
- Observed behavior: after the shared CTA fix, the rendered hero CTA exposes canonical `data-pre-approval-*` attributes in the DOM, the drawer opens with the default title `Estimate how much financing you need.`, and Continue navigates to `http://127.0.0.1:3001/pre-approval?amount=100000&trucktype=rotator`.

- Route: `/rotator-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: click the untouched legacy tertiary CTA `Already have a rotator in mind? I found a truck and need financing`, confirm the drawer title, then Continue
- Observed behavior: the untouched compatibility caller still opens the drawer with the title `How much is the rotator you found?`, and Continue navigates immediately to `http://127.0.0.1:3001/pre-approval?amount=100000`.

Evidence summary:

- This batch stayed within the allowed fixed hero-preset scope: the only authored caller migrated was the rotator lead-gen hero path, and the tile-selection helper consumers for rollback, wrecker, and used-truck heroes were intentionally left on their existing compatibility path for the next Phase 5 batch.
- The initial browser run exposed a real regression in the shared internal CTA rendering path: canonical data attributes authored through `RippleCtaLink` were not reaching the DOM, so the drawer fell back to a plain hash open and lost the truck-type handoff. Repairing [`RippleCtaLink.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) was strictly required by that discovered regression and did not broaden the batch beyond the necessary fix.
- Mixed old/new callers still coexist after the fix: the rotator hero CTA now uses the canonical production trigger contract end-to-end, while the untouched legacy tertiary CTA on the same page still opens and continues through the compatibility path.

Gate decision:

- `GO`

Blockers / regressions:

- None after the shared CTA fix. The dropped-DOM-attributes regression discovered during the first browser pass was corrected within this batch and reverified to green before the gate decision.

Next required action:

- Move to the next allowed Phase 5 caller batch only: tile-selection helper migration. Do not start the shared CSS consumer batch, route/page config batch, compatibility removal, or Phase 6 work until the tile-selection helper batch reaches its own `GO` gate.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 5`
- Batch / scope: Batch 3 only: migrate the route-only hero-gallery consumer to the canonical feature route contract and verify untouched drawer callers still work through compatibility
- Status: `PASS`

Changes made:

- Updated [`HeroInput.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroInput.tsx) so the desktop route-only submit path imports `buildPreApprovalHref()` directly from [`@/features/pre-approval/routes`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/routes.ts) instead of the legacy drawer facade.
- Added focused route-only coverage in [`HeroInput.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/__tests__/HeroInput.test.tsx) for canonical href navigation, `onSubmit` precedence, and the empty-amount no-op behavior.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) to record the completed Phase 5 route-only consumer batch while leaving later hero-preset, tile-selection, shared-CSS, and route/page-config batches open.

Verification matrix IDs covered:

- `PA-INV-03`
- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`
- `PA-INV-24`

Commands run:

- `npm test -- components/sections/heroes/hero-gallery/__tests__/HeroInput.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx features/pre-approval/__tests__/public-api.test.ts`
- `npm run lint`
- `npm run build`
- `rg -n "buildPreApprovalHref|@/components/ui/pre-approval-drawer|@/features/pre-approval/routes" components/sections/heroes app components --glob '!**/*test*'`
- `lsof -nP -iTCP -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001`
- `agent-browser fill @e39 155000`
- `agent-browser eval "document.getElementById('hero-amount')?.value"`
- `agent-browser click @e40`
- `agent-browser get url`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser click @e15`
- `agent-browser wait --text "How much is the rollback you found?"`
- `agent-browser click @e59`
- `agent-browser get url`

Automated verification results:

- `PA-INV-24`: [`HeroInput.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/__tests__/HeroInput.test.tsx) passed `3` tests covering route-only submit navigation through the canonical route builder, `onSubmit` precedence over navigation, and the empty-input no-op path.
- `PA-INV-09`, `PA-INV-10`, and `PA-INV-11`: the targeted rerun of [`RippleCtaLink.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx), [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), and [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) passed `26` tests across `3` files, confirming the canonical and legacy trigger schemas still coexist and untouched drawer callers remain supported. The same existing happy-dom `localhost:3000` fetch noise appeared during the direct-hash suite, but no assertion failed.
- `PA-INV-17`: `npm run build` passed after the route-only consumer cutover, confirming the compatibility facade and remaining untouched callers still compile while later Phase 5 batches remain pending.
- `PA-INV-24`: `rg -n "buildPreApprovalHref|@/components/ui/pre-approval-drawer|@/features/pre-approval/routes" components/sections/heroes app components --glob '!**/*test*'` shows [`HeroInput.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroInput.tsx) now imports from the feature route contract, while the remaining legacy imports are concentrated in later hero-preset, tile-selection, shared-CSS, and route/page-config consumers that are intentionally deferred to later Phase 5 batches.
- `npm run lint`: passed with the same pre-existing unused-variable warnings in the pre-approval drawer motion-mock tests; no new route-only batch lint issues were introduced.
- `npm run build`: passed.

Browser verification results:

- Route: `/`
- Viewport: desktop (`1440x900`)
- Trigger path: enter raw digits `155000` into the hero-gallery amount field and click `Get Pre-Approved`
- Observed behavior: the controlled input formatted to `$155,000`, and submission navigated directly to `http://127.0.0.1:3001/pre-approval?amount=155000`. The destination route remains intentionally absent in this repo, so the URL handoff rather than page content is the required assertion for this batch.

- Route: `/rollback-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: click the untouched legacy CTA `Already have a truck in mind? I found a truck and need financing`, confirm the drawer title, then Continue
- Observed behavior: the untouched compatibility caller still opened the drawer with the title `How much is the rollback you found?`, and Continue navigated immediately to `http://127.0.0.1:3001/pre-approval?amount=100000`.

Evidence summary:

- This batch stayed within the allowed Phase 5 route-only scope: only the direct route consumer [`HeroInput.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroInput.tsx) and its focused regression test changed, with no hero preset, tile-selection, shared-CSS, compatibility-removal, or later config migration mixed in.
- The route-only desktop hero input now depends on the canonical feature route contract directly, which satisfies the named Phase 5 migration requirement for [`HeroInput.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroInput.tsx).
- Mixed old/new callers still coexist after the batch: the route-only hero input uses the feature route contract directly, while untouched legacy drawer CTAs still open and continue through the compatibility path.

Gate decision:

- `GO`

Blockers / regressions:

- None. An initial browser automation attempt that filled the input with a preformatted currency string produced `amount=0`; rerunning with raw digit entry verified the controlled input value and the canonical `amount=155000` handoff, so no product regression remains for this batch.

Next required action:

- Move to the next allowed Phase 5 caller batch only: hero preset migration. Do not start the tile-selection helper, shared CSS consumer, route/page config, compatibility removal, or Phase 6 work until the hero preset batch reaches its own `GO` gate.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 5`
- Batch / scope: Batch 2 only: migrate the shared sticky-nav CTA helper path to the canonical pre-approval trigger contract, confirm no production footer CTA helper exists to migrate in this batch, and keep untouched callers on the compatibility path
- Status: `PASS`

Changes made:

- Added the sticky-nav helper [`preApprovalCta.ts`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/preApprovalCta.ts) to build the same same-page-or-fallback href via the feature-owned server helper and to author explicit canonical `PreApprovalTrigger` origins for the desktop `Apply Now` CTA and the mobile overlay `Get Pre-Approved` CTA.
- Updated [`NavClient.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavClient.tsx) to stop deep-importing `resolveDrawerTriggerHref()` from the legacy drawer compatibility module and instead pass Batch 2 sticky-nav trigger metadata into the nav CTA renderers.
- Updated [`NavHeaderActions.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx) to emit canonical `data-pre-approval-*` attributes for the desktop sticky-nav CTA while keeping the existing CTA label, href behavior, and UI intact.
- Updated [`NavMobileOverlay.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx) so the mobile sticky-nav CTA uses `RippleCtaLink`'s canonical `preApprovalTrigger` path instead of relying on the legacy compatibility-only authoring contract.
- Added focused nav coverage in [`preApprovalCta.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx) for href/origin generation plus the rendered desktop and mobile sticky-nav CTA attributes.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) to record the completed Batch 2 nav/footer helper checklist item while leaving later Phase 5 caller batches inactive.

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-03`
- `PA-INV-05`
- `PA-INV-07`
- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`
- `PA-INV-18`
- `PA-INV-22`

Commands run:

- `npm test -- components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx features/pre-approval/__tests__/public-api.test.ts`
- `npm run lint`
- `npm run build`
- `rg -n "@/components/ui/pre-approval-drawer/config|resolveDrawerTriggerHref" components app`
- `rg -n "Get Pre-Approved|Apply Now|pre-approval|DRAWER_HASH|resolveDrawerTriggerHref" components/sections/page/footer components/sections/nav/sticky-nav-rm`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser click @e12`
- `agent-browser click @e57`
- `agent-browser click @e59`
- `agent-browser set device "iPhone 14"`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser click @e10`
- `agent-browser click @e9`
- `agent-browser click @e15`

Automated verification results:

- `PA-INV-10`: [`preApprovalCta.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx) passed `4` tests covering sticky-nav href generation, fallback behavior when no pathname is available, desktop canonical attribute emission, and mobile overlay canonical attribute emission.
- `PA-INV-09`, `PA-INV-10`, and `PA-INV-11`: the targeted rerun of [`RippleCtaLink.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx), [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), and [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) passed `26` tests across `3` files, confirming the legacy compatibility schema still works, the canonical schema still works, and canonical precedence remains intact. The same existing happy-dom `localhost:3000` fetch noise appeared during the direct-hash suite, but no assertion failed.
- `PA-INV-17`: `npm run build` passed after the sticky-nav migration, confirming the remaining legacy compatibility modules still compile while later Phase 5 batches remain untouched.
- `PA-INV-18`: code review plus the green build confirmed the new sticky-nav helper imports only the server-safe feature surface (`@/features/pre-approval/drawer/server` and the canonical contract type) and does not pull client-only drawer runtime code into the authored helper path.
- `PA-INV-22`: `rg -n "@/components/ui/pre-approval-drawer/config|resolveDrawerTriggerHref" components app` no longer found a production consumer in [`NavClient.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavClient.tsx); remaining references are the compatibility module itself, its tests, docs, and the barrel export, which is the expected state before later removal.
- `npm run lint`: passed with the same pre-existing unused-variable warnings in the pre-approval drawer motion-mock tests; no new Batch 2 lint issues were introduced.
- `npm run build`: passed.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: click sticky-nav `Apply Now`, confirm the drawer opens, close with the drawer close button, reopen, then Continue
- Observed behavior: the sticky-nav CTA opened the drawer on the same page with the default title `Estimate how much financing you need.`, the close button dismissed the drawer while the URL stayed `http://127.0.0.1:3001/rollback-financing`, and Continue navigated immediately to `http://127.0.0.1:3001/pre-approval?amount=100000`.

- Route: `/rollback-financing`
- Viewport: mobile (`iPhone 14` emulator)
- Trigger path: open the sticky-nav menu, tap the overlay CTA `Get Pre-Approved`, then Continue
- Observed behavior: the mobile sticky-nav CTA opened the mounted drawer on the same route with the default title `Estimate how much financing you need.`, and Continue navigated immediately to `http://127.0.0.1:3001/pre-approval?amount=100000`.

- Route: `/rollback-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: click the untouched legacy caller `Already have a truck in mind? I found a truck and need financing`, then Continue
- Observed behavior: the untouched compatibility caller still opened the drawer on the same page with the custom title `How much is the rollback you found?`, and Continue navigated immediately to `http://127.0.0.1:3001/pre-approval?amount=100000`.

Evidence summary:

- Batch 2 stayed within the allowed Phase 5 scope: only the shared sticky-nav CTA helper chain changed, no footer CTA helper existed in production scope to migrate, and no route-only, hero-preset, tile-selection, shared CSS, or compatibility-removal work was mixed in.
- The sticky-nav desktop and mobile CTA paths now author canonical production trigger metadata while preserving the same hash-entry behavior and the same `/pre-approval?amount=...` continue handoff.
- Mixed old/new callers still coexist: the migrated sticky-nav CTAs use the canonical trigger schema, and the untouched legacy rollback CTA still opens and continues through the compatibility path on the same page.

Gate decision:

- `GO`

Blockers / regressions:

- `PA-INV-24` remains `not verified` in this batch because the route-only consumer batch has not started yet.
- The shared footer component has no production pre-approval CTA helper to migrate; the footer search for this batch returned nav-only matches, so no footer code change was needed.

Next required action:

- Stop after Batch 2. Do not start the Phase 5 route-only consumer batch, hero preset batch, tile-selection helper batch, shared CSS batch, or other marketing config batch until explicitly instructed.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 5`
- Batch / scope: Batch 1 only: migrate the shared CTA primitive [`RippleCtaLink.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) to prefer the canonical pre-approval trigger contract while preserving legacy compatibility props
- Status: `PASS`

Changes made:

- Updated [`RippleCtaLink.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) to accept `preApprovalTrigger?: PreApprovalTrigger`, emit `data-pre-approval-*` attributes via the feature-owned server helper when that prop is provided, and keep `drawer` / `drawerTitle` as compatibility-only legacy authoring paths.
- Added focused primitive coverage in [`RippleCtaLink.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx) for canonical attribute emission, legacy fallback emission, and canonical-over-legacy precedence.
- Updated the shared CTA docs in [`components/ui/ripple-cta-link/CLAUDE.md`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/CLAUDE.md) so the canonical trigger contract is the preferred authoring path for future caller batches.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) so `Phase 5` is the only active phase, the Phase 4 precondition is checked, and only the checklist items completed in this batch are marked.

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-03`
- `PA-INV-05`
- `PA-INV-07`
- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`

Commands run:

- `npm test -- components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx`
- `npm test -- components/ui/pre-approval-drawer/__tests__/triggers.test.ts components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx features/pre-approval/__tests__/public-api.test.ts`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser click @e15`
- `agent-browser click @e57`
- `agent-browser click @e59`
- `agent-browser set device "iPhone 14"`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser click @e12`
- `agent-browser eval "Array.from(document.querySelectorAll('button')).map((button) => ({text: button.textContent?.trim(), aria: button.getAttribute('aria-label')})).filter((button) => (button.text || '').includes('Continue') || (button.text || '').includes('Close') || (button.aria || '').includes('Close'))"`
- `agent-browser eval "(() => { const dialog = document.querySelector('[role=dialog]'); const backdrop = dialog?.previousElementSibling; if (!(backdrop instanceof HTMLElement)) return 'missing-backdrop'; backdrop.click(); return 'clicked-backdrop'; })()"`
- `agent-browser eval "(() => { const continueButton = Array.from(document.querySelectorAll('button')).find((button) => button.textContent?.includes('Continue to Pre-Approval')); if (!(continueButton instanceof HTMLElement)) return 'missing-continue'; continueButton.click(); return 'clicked-continue'; })()"`

Automated verification results:

- `PA-INV-09`, `PA-INV-10`, and `PA-INV-11`: [`RippleCtaLink.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx) passed `4` tests covering legacy `data-drawer-*` emission, canonical `data-pre-approval-*` emission, and precedence when both authoring paths are present.
- Compatibility coverage remained green in [`triggers.test.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/triggers.test.ts), [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), and [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts); the targeted run passed `30` tests across `3` files. The same existing happy-dom `localhost:3000` fetch noise appeared during the direct-hash suite, but no assertion failed.
- `PA-INV-17`: `npm run build` passed, confirming the primitive change did not break the existing compatibility facade or untouched callers.
- `npm run lint`: passed with the same pre-existing test-only unused-variable warnings in the pre-approval drawer motion mocks; no new Phase 5 lint errors were introduced in this batch.
- `npm run build`: passed.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop (`1440x900`)
- Trigger path: click the same-page CTA `Already have a truck in mind? I found a truck and need financing`, close with the drawer close button, reopen, then Continue
- Observed behavior: the same-page CTA opened the drawer with the title `How much is the rollback you found?`, the close button dismissed the drawer without changing the route, and Continue navigated immediately to `http://127.0.0.1:3001/pre-approval?amount=100000`.

- Route: `/`
- Viewport: mobile (`iPhone 14` emulator)
- Trigger path: tap the homepage hero CTA `Get Pre-Approved`
- Observed behavior: the same-page CTA opened the mobile drawer on `http://127.0.0.1:3001/` and rendered the expected title `Estimate how much financing you need.` with the mounted amount slider.

- Route: shared `RippleCtaLink` caller routes across the current marketing pages
- Viewport: mobile physical phone
- Trigger path: user manual validation of same-page CTA open, close, and Continue flows
- Observed behavior: user-reported manual validation confirmed the mobile close interaction works as intended on phone hardware, all tested routes opened correctly, and Continue used the correct URL params.

Evidence summary:

- The shared CTA primitive now supports the canonical production trigger contract without forcing any caller rewrites; untouched `drawer` and `drawerTitle` callers remain on the compatibility path, which keeps this batch within the allowed Phase 5 scope.
- Desktop browser validation proved that existing `RippleCtaLink` callers still open, close, and continue through the unchanged drawer/runtime path after the primitive change.
- Mobile verification for this batch is now satisfied by combined evidence: the emulator run confirmed same-page open/render behavior, and the user’s physical-phone validation confirmed close behavior and Continue behavior with correct URL params on the affected caller routes.

Gate decision:

- `GO`

Blockers / regressions:

- `PA-INV-24` is `not verified` in this batch because the route-only consumer batch has not started. Nav/footer helpers, route-only callers, hero presets, tile-selection helpers, shared CSS consumers, and other marketing configs remain intentionally untouched.

Next required action:

- Start Batch 2 only when instructed: migrate the nav/footer helper callers without touching the route-only, hero-preset, tile-selection, shared CSS, or other marketing-config batches yet.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 4`
- Batch / scope: Convert the legacy pre-approval drawer surface into a compatibility facade over the feature-owned route and entry contracts while preserving legacy exports, deep imports, and CSS paths
- Status: `PASS`

Changes made:

- Rewired the legacy config facade in [`components/ui/pre-approval-drawer/config.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/config.ts) so the legacy constant names and route/hash helpers now alias the feature-owned contract in [`features/pre-approval/contract.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/contract.ts), [`features/pre-approval/routes.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/routes.ts), and [`features/pre-approval/drawer/server.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/server.ts).
- Updated the legacy barrel in [`components/ui/pre-approval-drawer/index.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/index.ts) to preserve existing named exports while also exposing the feature-owned `PreApprovalDrawerRoot`, client hooks, server-safe entry helpers, and canonical contract types through the compatibility surface.
- Added explicit Phase 4 facade coverage in [`features/pre-approval/__tests__/public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) to verify that legacy config aliases and barrel re-exports stay aligned with the feature-owned route and entry modules.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) to make `Phase 4` the only active phase, record the completed checklist items, and leave `Phase 5` inactive.

Verification matrix IDs covered:

- `PA-INV-17`
- `PA-INV-22`
- `PA-INV-23`
- `PA-INV-02`
- `PA-INV-03`
- `PA-INV-05`

Commands run:

- `npm test -- features/pre-approval/__tests__/public-api.test.ts features/pre-approval/__tests__/drawer-runtime.test.ts components/ui/pre-approval-drawer/__tests__/triggers.test.ts components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx`
- `npm run lint`
- `npm run build`
- `rg -n "@/components/ui/pre-approval-drawer/(config|triggers)" app components`
- `rg -n "@/components/ui/pre-approval-drawer/amount-slider\.css" app components`
- `lsof -nP -iTCP -sTCP:LISTEN`
- `PORT=3005 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3005/`
- `agent-browser wait --load networkidle`
- `agent-browser snapshot -i`
- `agent-browser fill @e39 "250000"`
- `agent-browser click @e40`
- `agent-browser get url`
- `agent-browser set device "iPhone 14"`
- `agent-browser open http://127.0.0.1:3005/rollback-financing#get-pre-approved`
- `agent-browser wait 500`
- `agent-browser snapshot -i`
- `agent-browser get url`
- `agent-browser click @e37`
- `agent-browser wait 500`
- `agent-browser get url`

Automated verification results:

- `PA-INV-17`: `npm run build` passed with no caller rewrites, confirming existing imports through the legacy drawer surface still compile after the facade rewiring.
- `PA-INV-22`: `rg -n "@/components/ui/pre-approval-drawer/(config|triggers)" app components` found the live deep-import consumer at [`NavClient.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavClient.tsx) plus legacy test imports; `npm run build` passed with those imports untouched.
- `PA-INV-23`: `rg -n "@/components/ui/pre-approval-drawer/amount-slider\.css" app components` found the shared CSS consumer at [`TermLengthSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/term-length-slider/TermLengthSlider.tsx); `npm run build` passed with the legacy CSS path unchanged.
- Targeted compatibility coverage passed in [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts), proving the legacy config constants, `resolveDrawerTriggerHref()`, `buildPreApprovalHref()`, and the barrel-level production entry helpers all resolve to the intended feature-owned modules.
- Targeted runtime/baseline coverage remained green in [`drawer-runtime.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-runtime.test.ts), [`triggers.test.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/triggers.test.ts), [`PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx), and [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx); the targeted run passed `54` tests across `5` files. The same pre-existing happy-dom `localhost:3000` fetch noise appeared during the direct-hash suite, but no assertion failed.
- `npm run lint`: passed with the same existing test-only unused-variable warnings in the motion mocks; no new Phase 4 lint errors were introduced.
- `npm run build`: passed.

Browser verification results:

- Route: `/`
- Viewport: desktop (`1440x900`)
- Trigger path: submit the homepage hero amount form (`HeroInput`) with `250000`
- Observed behavior: the route-only consumer that still imports `buildPreApprovalHref` from the legacy barrel navigated to `http://127.0.0.1:3005/pre-approval?amount=250000`, confirming the compatibility facade preserved the legacy route-construction behavior.

- Route: `/rollback-financing#get-pre-approved`
- Viewport: mobile (`iPhone 14`)
- Trigger path: direct-load hash open, verify the mounted drawer, then tap Continue
- Observed behavior: the drawer opened on initial load with the title `Estimate how much financing you need.`, the URL normalized immediately to `http://127.0.0.1:3005/rollback-financing`, and Continue navigated immediately to `http://127.0.0.1:3005/pre-approval?amount=100000` without an intermediate close step.

Evidence summary:

- Phase 3 was already complete before this batch: the Phase 3 checklist and gate were fully checked in [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md), and the prior `2026-04-06` Phase 3 execution-log entry recorded `PASS` with matching matrix evidence.
- The legacy facade now points at the feature-owned route and entry contracts where the public API already matches, while the untouched deep-import modules and legacy CSS path remain in place for import stability.
- Live consumers still relying on `config.ts` and `amount-slider.css` continued to compile unchanged, and the desktop/mobile browser passes did not show a facade-time runtime regression on the affected paths exercised in this batch.

Gate decision:

- `GO`

Blockers / regressions:

- None for `Phase 4`.

Next required action:

- Stop after `Phase 4`. Do not start `Phase 5` until explicitly instructed, even though the Phase 4 gate is now satisfied.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 3`
- Batch / scope: Wrap the existing drawer runtime in the feature-owned root contract with session identity, event emission, close reasons, and failure isolation while preserving the live UX
- Status: `PASS`

Changes made:

- Added the feature-owned runtime root in [`features/pre-approval/drawer/client.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/client.tsx) with `PreApprovalDrawerRoot`, `useOpenPreApproval()`, `usePreApprovalSession()`, internal runtime composition, and an error boundary that isolates drawer runtime failures from the page shell.
- Extended the runtime session model in [`features/pre-approval/drawer/runtime/session.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/session.ts) to generate a fresh `sessionId` and `openedAt` for every open.
- Updated [`components/ui/pre-approval-drawer/DrawerContext.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerContext.tsx) to own the new session lifecycle, emit `drawer_opened` / `amount_changed` / `drawer_continued` / `drawer_closed` events, isolate `onEvent` failures, and preserve the existing visible drawer state transitions.
- Threaded explicit close reasons through the existing UI/runtime paths in [`components/ui/pre-approval-drawer/PreApprovalDrawer.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/PreApprovalDrawer.tsx) and [`components/ui/pre-approval-drawer/RouteResetListener.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/RouteResetListener.tsx) for backdrop, escape, close button, drag dismiss, route change, and programmatic closes.
- Kept the mount location unchanged in [`app/(marketing)/layout.tsx`](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/layout.tsx) while swapping that location to the new root contract, and converted [`components/ui/pre-approval-drawer/MarketingDrawerProvider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/MarketingDrawerProvider.tsx) into a compatibility wrapper over the same root.
- Added Phase 3 coverage in [`features/pre-approval/__tests__/drawer-root.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root.test.tsx), [`features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx), [`components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx), and [`components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx).
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) to make `Phase 3` the only active phase, mark the Phase 2 precondition satisfied, and record the Phase 3 checklist and gate outcome.

Verification matrix IDs covered:

- `PA-INV-12`
- `PA-INV-13`
- `PA-INV-14`
- `PA-INV-15`
- `PA-INV-16`
- `PA-INV-25`
- `PA-INV-01`
- `PA-INV-02`
- `PA-INV-03`
- `PA-INV-05`
- `PA-INV-07`

Commands run:

- `npm test -- features/pre-approval/__tests__/drawer-root.test.tsx features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx features/pre-approval/__tests__/drawer-runtime.test.ts components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP -sTCP:LISTEN`
- `PORT=3005 npm run dev`
- `agent-browser open http://127.0.0.1:3005/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser snapshot -i`
- `agent-browser click @e15`
- `agent-browser wait 500`
- `agent-browser snapshot -i`
- `agent-browser get url`
- `agent-browser click @e57`
- `agent-browser wait 500`
- `agent-browser snapshot -i`
- `agent-browser click @e59`
- `agent-browser wait 500`
- `agent-browser get url`
- `agent-browser set device "iPhone 14"`
- `agent-browser open http://127.0.0.1:3005/rollback-financing#get-pre-approved`
- `agent-browser wait 500`
- `agent-browser snapshot -i`
- `agent-browser get url`
- `agent-browser click @e57`
- `agent-browser snapshot -i`
- `agent-browser click @e37`
- `agent-browser wait 500`
- `agent-browser get url`

Automated verification results:

- `PA-INV-12` and `PA-INV-13`: [`drawer-root.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root.test.tsx) verifies every open emits a fresh `sessionId` and that opening while already open replaces the session instead of merging prior state.
- `PA-INV-14`: [`drawer-root.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root.test.tsx) verifies `close()` without an explicit reason emits `drawer_closed` with `reason: "programmatic"` and preserves the same session identity for the close event.
- `PA-INV-15`: [`drawer-root.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root.test.tsx) verifies a throwing `onEvent` handler is caught and logged while the session still opens and amount changes still apply.
- `PA-INV-16`: [`drawer-root-error-boundary.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root-error-boundary.test.tsx) verifies a thrown drawer runtime error does not unmount the marketing page shell beneath the root.
- `PA-INV-25`: [`PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx) verifies backdrop, escape, close-button, and drag-dismiss close reasons; [`RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx) verifies route-sync reset emits `reason: "route-change"`.
- Event payload shape: [`drawer-root.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-root.test.tsx) verifies the emitted `drawer_opened`, `amount_changed`, and `drawer_closed` payloads include the documented identity and session fields.
- Baseline invariants remained green in the same targeted run: [`PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx) still verifies the amount-only continue href and immediate scroll unlock, and [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx) plus [`RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx) remained green.
- Targeted suite result: `7` test files passed, `58` tests passed. The run emitted the same existing happy-dom `localhost:3000` fetch noise from the legacy direct-hash suite, but no assertion failed.
- `npm run lint`: passed with the same pre-existing unused-variable warnings in the test motion mocks; no new Phase 3 lint errors were introduced.
- `npm run build`: passed.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop
- Trigger path: click the same-page legacy CTA `Already have a truck in mind? I found a truck and need financing`, verify the drawer state, close with the desktop close button, reopen, then Continue
- Observed behavior: the drawer opened on the same page with the title `How much is the rollback you found?`, the current URL stayed `http://127.0.0.1:3005/rollback-financing`, the close button dismissed the drawer cleanly, and Continue navigated immediately to `http://127.0.0.1:3005/pre-approval?amount=100000` without an intermediate close step.

- Route: `/rollback-financing#get-pre-approved`
- Viewport: mobile (`iPhone 14`)
- Trigger path: direct-load hash open, confirm the normalized URL, tap the mounted amount slider, then Continue
- Observed behavior: the drawer opened on first load with the default title `Estimate how much financing you need.`, the URL normalized immediately to `http://127.0.0.1:3005/rollback-financing`, tapping the slider in the mounted mobile sheet changed the amount from `100000` to `260000` during the scroll-lock handoff window, and Continue navigated immediately to `http://127.0.0.1:3005/pre-approval?amount=260000`.

Evidence summary:

- The public runtime contract is now rooted at `PreApprovalDrawerRoot`, but the drawer still mounts once in the marketing layout and still renders the same modal/sheet UI in the same place.
- Every open now receives a stable session identity, replacement opens discard prior session state, all required close paths emit explicit reasons, and the continue path remains immediate.
- `onEvent` failures and internal runtime render failures are both isolated, and the desktop/mobile browser passes did not show a visible UX regression.

Gate decision:

- `GO`

Blockers / regressions:

- None for `Phase 3`.

Next required action:

- Stop after `Phase 3`. Do not start `Phase 4` until explicitly instructed.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 2` follow-up / baseline decision
- Batch / scope: Close the commit-triage loop by deciding whether the drawer-critical recent history is an actual blocker
- Status: `PASS`

Changes made:

- Updated [`plans/pre-approval-drawer-commit-triage.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-commit-triage.md) to bless the identified drawer-critical commits as the current baseline instead of leaving them as an open-ended blocker.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) to clear the blocker section now that the baseline decision is explicit.

Verification matrix IDs covered:

- None newly verified in this batch

Commands run:

- none beyond the prior commit-triage inspection already recorded

Automated verification results:

- No automated verification was rerun in this batch because no production code changed.
- The decision is based on repository state already established in the prior triage entry: the blocker-set commits are all already present in `main`, and there is no pending `origin/main` backlog to integrate first.

Browser verification results:

- Route: not verified
- Viewport: not verified
- Trigger path: not verified
- Observed behavior: browser validation was not rerun because this batch changed only migration-planning documents.

Evidence summary:

- The repository does not have a separate 50-commit upstream integration task blocking the migration.
- The drawer-critical commit set is now explicitly blessed as the current baseline.
- Commit triage is no longer an active blocker, though the migration remains parked at `Phase 2` until the next explicit phase batch begins.

Gate decision:

- `GO`

Blockers / regressions:

- None introduced in this batch.

Next required action:

- Keep `Phase 2` as the active phase until the next explicit implementation batch; do not start `Phase 3` automatically.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 2` follow-up / pre-`Phase 3` triage
- Batch / scope: Audit the recent commit history, identify the migration-sensitive baseline set, and record whether `Phase 3` is allowed to start
- Status: `BLOCKED`

Changes made:

- Added the commit-triage artifact [`plans/pre-approval-drawer-commit-triage.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-commit-triage.md) to classify the recent history into `Phase 3` blockers, `Phase 5` caller-migration dependencies, and non-blocking docs/process commits.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) to record the unresolved blocker explicitly instead of leaving the blocker section empty.

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-02`
- `PA-INV-03`
- `PA-INV-04`
- `PA-INV-05`
- `PA-INV-06`
- `PA-INV-07`
- `PA-INV-08`
- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-17`
- `PA-INV-18`
- `PA-INV-21`
- `PA-INV-25`

Commands run:

- `git branch --show-current`
- `git status -sb`
- `git rev-parse --abbrev-ref --symbolic-full-name @{upstream}`
- `git rev-list --left-right --count HEAD...@{upstream}`
- `git log --oneline -n 50`
- `git log --oneline -n 50 -- components/ui/pre-approval-drawer features/pre-approval components/ui/ripple-cta-link components/sections/nav/sticky-nav-rm components/sections/heroes app`
- `git show --stat --oneline a6d010b ce98c89 83fd815 76e19a2 c80b17d 8d1af81 f21d214 89f4445 c64ddd1 917e19b 55c3e5a 1624084 0a58157`
- `git show --name-only --format='%h %s' a6d010b ce98c89 83fd815 76e19a2 c80b17d 8d1af81 f21d214 89f4445 c64ddd1 917e19b 55c3e5a 1624084 0a58157`
- `rg -n "Phase 3|Blockers|commit|backlog|origin/main|Phase 2 gate passed" plans/pre-approval-drawer-phase-gates.md plans/pre-approval-drawer-execution-log.md plans/pre-approval-drawer-migration-spec.md`

Automated verification results:

- No matrix invariant was re-executed in this batch. This was a commit-triage and blocker-recording pass only.
- The triage established that the practical blocker is not a remote merge queue from `origin/main`; the repository was `ahead 1` and `behind 0` at triage time.
- The triage identified a smaller drawer-baseline blocker set of `13` commits that materially affect runtime ownership, trigger entry semantics, route sync, scroll lock, portal mounting, or shared CTA emission.
- All matrix IDs listed above remain `not re-verified` in this batch and must continue to rely on the latest recorded passing evidence until reconciliation changes any of those baseline files.

Browser verification results:

- Route: not verified
- Viewport: not verified
- Trigger path: not verified
- Observed behavior: browser validation was not rerun in this batch because no runtime or caller behavior was changed; this batch only recorded blocker status.

Evidence summary:

- `Phase 2` remains the active migration phase.
- `Phase 3` is `NO-GO` until the blocker-set commits in [`plans/pre-approval-drawer-commit-triage.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-commit-triage.md) are explicitly accepted as the current baseline or reconciled.
- The blocker has been made concrete and auditable instead of being discussed informally.

Gate decision:

- `NO-GO`

Blockers / regressions:

- Unresolved baseline reconciliation across the drawer-critical commit set documented in [`plans/pre-approval-drawer-commit-triage.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-commit-triage.md).

Next required action:

- Reconcile or explicitly bless the blocker-set commits as baseline before attempting `Phase 3`.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 2`
- Batch / scope: Add the compatibility parser and session normalizer, then verify dual-schema normalization and compatibility-origin behavior without forcing caller migration
- Status: `PASS`

Changes made:

- Added the feature-owned parser in [`features/pre-approval/drawer/runtime/parser.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/parser.ts) to normalize legacy `data-drawer-*`, production `data-pre-approval-*`, direct-hash opens, and route-hash opens into the canonical `PreApprovalTrigger` contract with production-schema precedence.
- Added the feature-owned session normalizer in [`features/pre-approval/drawer/runtime/session.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/runtime/session.ts) so the legacy drawer runtime can consume canonical triggers while preserving legacy `source` and hero `truckType` behavior.
- Rewired the legacy runtime entrypoints in [`components/ui/pre-approval-drawer/DrawerHashListener.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerHashListener.tsx), [`components/ui/pre-approval-drawer/RouteResetListener.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/RouteResetListener.tsx), [`components/ui/pre-approval-drawer/DrawerContext.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/DrawerContext.tsx), [`components/ui/pre-approval-drawer/triggers.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/triggers.ts), and [`components/ui/pre-approval-drawer/PreApprovalDrawer.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/PreApprovalDrawer.tsx) to use the new canonical normalization path without changing the live drawer UI or forcing caller changes.
- Added Phase 2 coverage in [`features/pre-approval/__tests__/drawer-runtime.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-runtime.test.ts), [`components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx), [`components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx), and [`components/ui/pre-approval-drawer/__tests__/triggers.test.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/triggers.test.ts) for legacy-only, production-only, mixed-schema precedence, hero handoff exactness, and direct/route hash compatibility origins.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) so `Phase 2` is the only active phase, the Phase 1 precondition is checked, and the Phase 2 checklist/gate outcome is recorded without advancing to `Phase 3`.

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-02`
- `PA-INV-03`
- `PA-INV-04`
- `PA-INV-09`
- `PA-INV-10`
- `PA-INV-11`
- `PA-INV-21`

Commands run:

- `npm test -- features/pre-approval components/ui/pre-approval-drawer`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP -sTCP:LISTEN`
- `PORT=3005 npm run dev`
- `agent-browser open http://127.0.0.1:3005/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser snapshot -i`
- `agent-browser click @e15`
- `agent-browser snapshot -i`
- `agent-browser get url`
- `agent-browser click @e59`
- `agent-browser get url`
- `agent-browser set device "iPhone 14"`
- `agent-browser open http://127.0.0.1:3005/rollback-financing#get-pre-approved`
- `agent-browser wait 500`
- `agent-browser snapshot -i`
- `agent-browser click @e37 && agent-browser get url`

Automated verification results:

- `PA-INV-09`: [`drawer-runtime.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-runtime.test.ts) verifies legacy `data-drawer-*` attributes normalize into the canonical `PreApprovalTrigger` shape with compatibility defaults, and [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx) proves the live click-intercept path passes the normalized legacy payload into the runtime.
- `PA-INV-10`: [`drawer-runtime.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-runtime.test.ts) verifies the new production trigger attributes normalize into the canonical contract, and [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx) proves the live click-intercept path accepts the production schema.
- `PA-INV-11`: [`drawer-runtime.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-runtime.test.ts) and [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx) both verify that when both schemas are present, the production schema wins and the legacy attributes are ignored.
- `PA-INV-04`: [`drawer-runtime.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-runtime.test.ts) verifies the legacy hero `truckType` handoff still maps exactly to `/pre-approval?amount=155000&trucktype=heavy-wrecker`.
- `PA-INV-21`: [`drawer-runtime.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/drawer-runtime.test.ts) verifies the direct-hash compatibility-origin helper, [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx) verifies initial-load and hashchange opens use `pageId` from pathname plus `sectionId: "hash-entry"` / `ctaId: "direct-url"`, and [`RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx) verifies route-hash reopen uses the same compatibility-origin policy.
- `PA-INV-03`: the desktop browser pass confirmed the legacy CTA path still continued to `http://127.0.0.1:3005/pre-approval?amount=100000`, and the mobile direct-hash pass confirmed the amount-only continue URL remained `http://127.0.0.1:3005/pre-approval?amount=100000`.
- `PA-INV-01`: the desktop browser pass confirmed the same-page legacy CTA on `/rollback-financing` opened the drawer without leaving the page and normalized the route back to `/rollback-financing`.
- `PA-INV-02`: the mobile browser pass confirmed loading `/rollback-financing#get-pre-approved` opened the drawer on first load with the default title.
- Targeted suite result: `9` test files passed, `83` tests passed. The run emitted existing happy-dom `localhost:3000` fetch noise during the legacy drawer suite, but all assertions passed and no test failed.
- `npm run lint`: passed with the same existing unused-variable warnings in the legacy test motion mocks; no new Phase 2 lint errors remain.
- `npm run build`: passed.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop
- Trigger path: click the same-page legacy CTA `Already have a truck in mind? I found a truck and need financing`, then Continue
- Observed behavior: the drawer opened on the same page, the drawer title rendered as `How much is the rollback you found?`, the current URL normalized to `/rollback-financing`, and Continue navigated to `/pre-approval?amount=100000`.

- Route: `/rollback-financing#get-pre-approved`
- Viewport: mobile (`iPhone 14`)
- Trigger path: direct-load hash open, then Continue
- Observed behavior: the drawer opened on first load with the default title `Estimate how much financing you need.`, the amount slider rendered, and Continue navigated to `/pre-approval?amount=100000`.

Evidence summary:

- Phase 1 is already recorded as `PASS`, and the runbook now marks `Phase 2` as the only active phase for this batch.
- One canonical normalization path now handles legacy attributes, production attributes, direct-hash opens, and route-hash opens while keeping the legacy runtime surface and UI behavior intact.
- Production-schema precedence is proven, legacy hero handoff behavior is unchanged, and non-click opens use the required compatibility-origin policy without inferring analytics IDs from label text.
- No caller migration, runtime contract cutover, or Phase 3 event/session semantics were introduced in this batch.

Gate decision:

- `GO`

Blockers / regressions:

- None for `Phase 2`.

Next required action:

- Stop after `Phase 2`. Do not start `Phase 3` until explicitly instructed.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 1`
- Batch / scope: Introduce canonical feature-owned modules under `features/pre-approval` without rewiring the live legacy drawer surface
- Status: `PASS`

Changes made:

- Added the canonical contract in [`features/pre-approval/contract.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/contract.ts) with feature-owned trigger, origin, session, close-reason, event, and current slider/default constants.
- Added feature-owned route helpers in [`features/pre-approval/routes.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/routes.ts) for href building, search-param parsing, and current normalization behavior without introducing the later clamping change.
- Added server-safe entry helpers in [`features/pre-approval/drawer/server.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/server.ts) for the canonical entry hash/href and new production trigger-attribute schema.
- Added the client entry module in [`features/pre-approval/drawer/client.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/client.ts) as an additive compatibility wrapper over the existing mounted runtime, with no layout cutover and no behavior swap in this phase.
- Added targeted Phase 1 coverage in [`features/pre-approval/__tests__/public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) to lock the current slider constants, route helpers, entry helpers, and production trigger-attribute schema behind `@/features/pre-approval/*` imports.
- Updated [`plans/pre-approval-drawer-phase-gates.md`](/Users/benfranzoso/Documents/Projects/copy/plans/pre-approval-drawer-phase-gates.md) to make `Phase 1` the only active phase, mark the Phase 0 precondition satisfied, and record the Phase 1 checklist/gate outcome.

Verification matrix IDs covered:

- `PA-INV-17`
- `PA-INV-18`
- `PA-INV-19`
- `PA-INV-22`
- `PA-INV-23`
- `PA-INV-27`

Commands run:

- `npm test -- features/pre-approval components/ui/pre-approval-drawer`
- `npm run lint`
- `npm run build`
- `rg -n "@/components/ui/pre-approval-drawer/(config|triggers)" app components`
- `rg -n "@/components/ui/pre-approval-drawer/amount-slider\.css" app components`
- `rg -n '"use client"|DrawerProvider|DrawerContext|MarketingDrawerProvider|PreApprovalDrawer' features/pre-approval/contract.ts features/pre-approval/routes.ts features/pre-approval/drawer/server.ts`
- `git status --short -- features/pre-approval plans/pre-approval-drawer-phase-gates.md`

Automated verification results:

- `PA-INV-19`: [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) verifies `preApprovalMinAmount === 20000`, `preApprovalMaxAmount === 500000`, `preApprovalAmountStep === 5000`, and `preApprovalDefaultAmount === 100000`, preserving the current live slider contract during Phase 1.
- `PA-INV-27`: [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) imports the new modules through `@/features/pre-approval/*`, and `npm run build` passed, confirming alias/tooling resolution.
- Route helper verification: [`public-api.test.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/public-api.test.ts) covers amount normalization, href building, search-param parsing, and entry-hash fallback behavior while preserving the current non-clamping semantics required for Phase 1.
- `PA-INV-18`: the server-safe boundary review query against [`features/pre-approval/contract.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/contract.ts), [`features/pre-approval/routes.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/routes.ts), and [`features/pre-approval/drawer/server.ts`](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/drawer/server.ts) returned no matches for client-only markers or legacy runtime imports, and `npm run build` passed.
- `PA-INV-17`: `npm run build` passed with the existing legacy barrel imports untouched.
- `PA-INV-22`: `rg -n "@/components/ui/pre-approval-drawer/(config|triggers)" app components` found the still-live deep-import consumers at [`components/sections/nav/sticky-nav-rm/NavClient.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavClient.tsx), plus the legacy test imports in [`components/ui/pre-approval-drawer/__tests__/triggers.test.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/triggers.test.ts). Compatibility plan: keep legacy `config.ts` and `triggers.ts` in place unchanged through Phase 4 facade conversion and Phase 5 caller migration; no consumer cutover occurred in Phase 1.
- `PA-INV-23`: `rg -n "@/components/ui/pre-approval-drawer/amount-slider\.css" app components` found the shared CSS consumer at [`components/sections/page/term-length-slider/TermLengthSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/term-length-slider/TermLengthSlider.tsx). Compatibility plan: keep the legacy CSS path intact for this phase and defer any CSS-path migration to the controlled caller batch where `TermLengthSlider` is updated.
- Targeted suite result: `8` test files passed, `76` tests passed.
- `npm run lint`: passed with the same existing unused-variable warnings in the legacy drawer test mocks that were already present in Phase 0; no new Phase 1 lint errors remain.
- `npm run build`: passed.
- Diff review for this batch stayed additive to `features/pre-approval/*`, the new feature test, and the migration planning artifacts; no production consumer file was rewired to the new feature surface in Phase 1.

Browser verification results:

- Route: not required for `Phase 1`
- Viewport: not required for `Phase 1`
- Trigger path: not required for `Phase 1`
- Observed behavior: not verified because this phase was restricted to additive feature-owned modules with no live runtime swap or user-facing change.

Evidence summary:

- Phase 0 was already recorded as `PASS`, and this batch updated the runbook so `Phase 1` is the only active phase.
- The canonical feature-owned modules now exist under `@/features/pre-approval/*`, compile cleanly, and preserve the current route/helper behavior needed for a no-cutover Phase 1.
- Legacy deep-import and CSS consumers are explicitly identified and covered by a compatibility-retention plan rather than assumption-based removal.
- No runtime swap, consumer cutover, or slider-behavior change was introduced in this phase.

Gate decision:

- `GO`

Blockers / regressions:

- None for `Phase 1`.

Next required action:

- Stop after `Phase 1`. Do not start `Phase 2` until explicitly instructed.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: `Phase 0`
- Batch / scope: Freeze baseline behavior with tests-only coverage and required verification
- Status: `PASS`

Changes made:

- Added baseline UI assertions in [`components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx) for the exact standard continue href and the exact hero truck-type handoff href.
- Added route-sync baseline assertions in [`components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx) to prove pathname changes reopen a fresh session with defaults and reset closed state when the hash is absent.
- Kept Phase 0 changes limited to tests/helpers and test-only lint cleanup in [`components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/AmountSlider.test.tsx), [`components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerContext.test.tsx), and [`components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx).

Verification matrix IDs covered:

- `PA-INV-01`
- `PA-INV-02`
- `PA-INV-03`
- `PA-INV-04`
- `PA-INV-05`
- `PA-INV-06`
- `PA-INV-07`
- `PA-INV-08`

Commands run:

- `npm test -- components/ui/pre-approval-drawer`
- `npm run lint`
- `npm run build`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser click @e15`
- `agent-browser eval 'JSON.stringify({tag: document.activeElement?.tagName, role: document.activeElement?.getAttribute("role"), ariaLabel: document.activeElement?.getAttribute("aria-label"), text: document.activeElement?.textContent?.trim()})'`
- `agent-browser click @e57`
- `agent-browser open http://127.0.0.1:3001/rollback-financing#get-pre-approved`
- `agent-browser click @e59`
- `agent-browser open http://127.0.0.1:3001/wrecker-financing`
- `agent-browser click @e40`
- `agent-browser click @e14`
- `agent-browser click @e60`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/rollback-financing#get-pre-approved`
- `agent-browser click @e37`

Automated verification results:

- `PA-INV-01` and `PA-INV-02`: [`DrawerHashListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/DrawerHashListener.test.tsx) covers same-page hash interception, parsed trigger payload passthrough, and direct-load hash open with hash clearing.
- `PA-INV-03` and `PA-INV-04`: [`triggers.test.ts`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/triggers.test.ts) covers amount-only continue URLs and hero-only `trucktype` propagation; [`PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx) now asserts `/pre-approval?amount=155000` and `/pre-approval?amount=155000&trucktype=heavy-wrecker` from the rendered drawer.
- `PA-INV-06` and `PA-INV-07`: [`PreApprovalDrawer.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/PreApprovalDrawer.test.tsx) verifies focus moves to the dialog, focus restores to the opener, and backdrop, escape, and close-button dismissal remain functional.
- `PA-INV-08`: [`RouteResetListener.test.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/ui/pre-approval-drawer/__tests__/RouteResetListener.test.tsx) verifies pathname changes with the hash reopen a fresh default session and pathname changes without the hash reset to the closed defaults.
- Targeted drawer suite result: `72 passed`.
- `npm run lint`: passed with warnings only from unused destructured mock props in existing test mocks.
- `npm run build`: passed.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop
- Trigger path: click same-page tertiary CTA `Already have a truck in mind? I found a truck and need financing`
- Observed behavior: drawer opened without leaving the page, the URL remained `/rollback-financing`, focus moved to the dialog, and clicking the desktop close button restored focus to the originating CTA.

- Route: `/rollback-financing#get-pre-approved`
- Viewport: desktop
- Trigger path: direct-load hash open
- Observed behavior: drawer opened on first load, the URL normalized to `/rollback-financing`, the default title `Estimate how much financing you need.` rendered, and Continue navigated immediately to `/pre-approval?amount=100000` with `document.body.style.position === ""` and `document.body.style.overflow === ""` after navigation.

- Route: `/wrecker-financing`
- Viewport: desktop
- Trigger path: select `Heavy Wrecker`, then click the hero `Get Pre-Approved` CTA and Continue
- Observed behavior: the hero CTA enabled after selection, the drawer opened, and Continue navigated to `/pre-approval?amount=100000&trucktype=heavy-wrecker`.

- Route: `/rollback-financing#get-pre-approved`
- Viewport: mobile (`iPhone 14`)
- Trigger path: direct-load hash open, then Continue
- Observed behavior: the mobile sheet rendered with the default title, the URL normalized to `/rollback-financing`, and Continue navigated immediately to `/pre-approval?amount=100000` with scroll-lock styles cleared on `document.body`.

Evidence summary:

- Phase 0 baseline invariants have both automated and browser evidence where required.
- The `/pre-approval` destination route is intentionally absent in this standalone marketing repo and is expected to be supplied by the host app; this was clarified during the run and is not being treated as a Phase 0 regression.
- No implementation runtime files were changed in this phase.

Gate decision:

- `GO`

Blockers / regressions:

- None for `Phase 0`.

Next required action:

- Stop here with only `Phase 0` active and do not begin `Phase 1` until explicitly instructed.
