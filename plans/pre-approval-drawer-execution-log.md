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
