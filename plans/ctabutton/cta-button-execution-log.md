# CTA Button Execution Log

## Purpose

This is the evidence ledger for the CTA migration.

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
- Branch: `cta-button-migration`
- Phase: Phase 0
- Batch / scope: Branch recovery, inventory reconciliation, baseline keyboard proof, full Phase 0 verification closeout
- Status: PASS

Changes made:

- Preserved the CTA migration docs/tests/log batch in focused commit `5a9f8d2` (`Add CTA migration Phase 0 baseline evidence`) without including unrelated files, then created and switched to the dedicated execution branch `cta-button-migration`.
- Added keyboard-baseline coverage to `app/(marketing)/(programs)/_components/__tests__/ProgramNavCardLink.test.tsx` for representative link activation and to `features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx` for representative button-path activation.
- Reconciled `plans/ctabutton/checklist.md` regeneration commands so the live inventory queries exclude the doc false-positive and the hero input test false-positive.
- Updated `plans/ctabutton/cta-button-phase-gates.md` and this execution log in the same Phase 0 batch.

Verification matrix IDs covered:

- `CTA-INV-02`
- `CTA-INV-03`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-06`
- `CTA-INV-07`
- `CTA-INV-08`
- `CTA-INV-09`

Commands run:

- `git branch --show-current`
- `git status --short --branch`
- `git add app/'(marketing)'/'(programs)'/_components/__tests__/ProgramNavCardLink.test.tsx components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx lib/__tests__/press-feedback.test.tsx plans/ctabutton`
- `git commit -m "Add CTA migration Phase 0 baseline evidence"`
- `git switch -c cta-button-migration`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n 'usePressFeedback<' components app features`
- `rg -n 'buildPreApprovalTriggerAttributes\\(' components app`
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'buildPreApprovalHref\\(' components app`
- `npm test -- lib/__tests__/press-feedback.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/ProgramNavCardLink.test.tsx features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `lsof -nP -iTCP:3002 -sTCP:LISTEN`
- `lsof -nP -iTCP:3003 -sTCP:LISTEN`
- `lsof -nP -iTCP:3004 -sTCP:LISTEN`
- `lsof -nP -iTCP:3005 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900 && agent-browser open http://127.0.0.1:3001/rollback-financing && agent-browser wait --load networkidle && agent-browser snapshot -i`
- `agent-browser click @e12 && agent-browser wait 400 && agent-browser snapshot -i`
- `agent-browser click @e57 && agent-browser wait 300 && agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a[href=\"#get-pre-approved\"]')).find((el) => el.textContent?.includes('Apply Now') && el.getBoundingClientRect().height > 0); if (!link) return null; const rect = link.getBoundingClientRect(); return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) }; })()"`
- `agent-browser mouse move 1264 36 && agent-browser mouse down && agent-browser mouse move 900 120 && agent-browser mouse up && agent-browser wait 300 && agent-browser get url && agent-browser snapshot -i`
- `agent-browser set viewport 1440 900 && agent-browser open http://127.0.0.1:3001/rollback-financing && agent-browser wait --load networkidle && agent-browser eval "Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Light-Duty Rollback'))?.click(); 'selected';" && agent-browser wait 300 && agent-browser eval "Array.from(document.querySelectorAll('a[href=\"#get-pre-approved\"]')).find((el) => el.getBoundingClientRect().height > 0 && el.textContent?.includes('Get Pre-Approved'))?.focus(); 'focused';" && agent-browser press Enter && agent-browser wait 400 && agent-browser eval "({ url: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))) })"`
- `agent-browser eval "Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))?.focus(); 'focused-button';" && agent-browser press Space && agent-browser wait 500 && agent-browser get url`
- `agent-browser set device 'iPhone 14' && agent-browser open http://127.0.0.1:3001/rollback-financing && agent-browser wait --load networkidle && agent-browser snapshot -i`
- `agent-browser click @e36 && agent-browser wait 300 && agent-browser snapshot -i`
- `agent-browser click @e12 && agent-browser wait 400 && agent-browser snapshot -i`

Automated verification results:

- Inventory reconciliation matched the checklist live boundary after filtering docs/tests: 18 production `RippleCtaLink` consumers (16 barrel imports, 2 deep imports), 3 direct non-wrapper `usePressFeedback` consumers, 6 direct non-wrapper trigger builders, and 1 route-based pre-approval entry.
- `npm test -- ...` passed: `lib/__tests__/press-feedback.test.tsx` (4), `components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx` (5), `components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx` (3), `app/(marketing)/(programs)/_components/__tests__/ProgramNavCardLink.test.tsx` (3), `features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx` (5), `components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx` (5).
- `CTA-INV-07` now has explicit automated proof for representative link and button keyboard activation without changing runtime behavior.
- `npm run lint` exited successfully with 23 pre-existing warnings limited to `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed and generated the full static route set successfully.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop `1440x900`
- Trigger path: sticky-nav `Apply Now` normal click
- Observed behavior: drawer opened on the same route; `Close` and `Continue to Pre-Approval` were visible.

- Route: `/rollback-financing`
- Viewport: desktop `1440x900`
- Trigger path: sticky-nav `Apply Now` pointer press then drag away before release
- Observed behavior: route stayed `http://127.0.0.1:3001/rollback-financing`; no drawer opened; press-cancel behavior prevented commit.

- Route: `/rollback-financing`
- Viewport: desktop `1440x900`
- Trigger path: hero `Get Pre-Approved` keyboard `Enter` after selecting `Light-Duty Rollback`
- Observed behavior: drawer opened on the same route; `Close` and `Continue to Pre-Approval` were visible, confirming representative link keyboard activation.

- Route: `/rollback-financing` -> `/pre-approval?amount=100000&trucktype=rollback`
- Viewport: desktop `1440x900`
- Trigger path: drawer `Continue to Pre-Approval` keyboard `Space`
- Observed behavior: navigation committed once to `http://127.0.0.1:3001/pre-approval?amount=100000&trucktype=rollback`, confirming representative button keyboard activation.

- Route: `/rollback-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: hero `Get Pre-Approved` before truck selection
- Observed behavior: rendered as a disabled button, preserving the non-interactive compatibility path.

- Route: `/rollback-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: hero `Get Pre-Approved` tap after selecting `Light-Duty Rollback`
- Observed behavior: drawer opened and exposed `Continue to Pre-Approval`, confirming the mobile hero normal-commit path.

Evidence summary:

- Phase 0 did not run on `main`; execution ran on `cta-button-migration` after preserving the existing CTA docs/tests/log work in `5a9f8d2`.
- The prior Phase 1 log entry remains partial additive evidence only; this entry re-established the required ordering and closed the Phase 0 matrix with full lint/build and browser evidence.
- Baseline CTA behavior is now frozen with recorded proof for external links, disabled rendering, canonical pre-approval attributes, click-commit semantics, cancel behavior, keyboard semantics, duplicate-commit protection, and reduced-motion correctness.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Phase 0 is closed. If work resumes, start a separate Phase 1 batch on `cta-button-migration`, mark only `Phase 1` active, and limit scope to the smallest `features/cta/*` introduction without migrating production callers.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: Phase 1
- Batch / scope: Targeted adjacent-surface proof for direct press-feedback consumers and one representative direct trigger-builder
- Status: PARTIAL

Changes made:

- Added `components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx` to prove the live `NavPressable` button path still uses `commit-on-click`, respects swipe cancel, and remains semantically correct under reduced motion.
- Added `app/(marketing)/(programs)/_components/__tests__/ProgramNavCardLink.test.tsx` to prove `ProgramNavCardLink` preserves shared press behavior and the canonical `data-pre-approval-*` schema on the live component.
- Added `features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx` so the drawer continue-button path is exercised against the real `usePressFeedback` contract instead of the existing stubbed drawer test setup.
- Expanded `components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx` so `NavHeaderActions` rechecks a representative direct trigger-builder surface with optional canonical attributes and confirms legacy `data-drawer-*` attrs stay absent.

Verification matrix IDs covered:

- `CTA-INV-25`
- `CTA-INV-26`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-06`
- `CTA-INV-08`
- `CTA-INV-09`

Commands run:

- `npm test -- components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/ProgramNavCardLink.test.tsx features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx`
- `npm run lint -- components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/ProgramNavCardLink.test.tsx features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx`

Automated verification results:

- `components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx`: 3 tests passed.
- `app/(marketing)/(programs)/_components/__tests__/ProgramNavCardLink.test.tsx`: 2 tests passed.
- `features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx`: 4 tests passed.
- `components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx`: 5 tests passed.
- Targeted lint on all touched test files passed.

Browser verification results:

- Route: not run
- Viewport: not run
- Trigger path: not run
- Observed behavior: not verified in this batch

Evidence summary:

- `NavPressable` now has live-contract proof for click commit, touch-drift cancel, and reduced-motion correctness without changing production code.
- `ProgramNavCardLink` now has live-contract proof that its press behavior still commits on click and that it emits canonical pre-approval trigger attributes, including optional drawer and handoff fields.
- `PreApprovalDrawerView` now has live-contract proof that the continue button commits on click, cancels on touch drift, suppresses duplicate quick commits, and stays semantically correct under reduced motion.
- `NavHeaderActions` now has representative proof that a direct `buildPreApprovalTriggerAttributes()` surface still emits only the canonical `data-pre-approval-*` schema.

Gate decision:

- `NO-GO`

Blockers / regressions:

- Automated coverage for `CTA-INV-25` and `CTA-INV-26` is now in place, but representative browser validation is still missing for the user-facing press path evidence.
- `CTA-INV-07` browser validation from the baseline freeze remains unrecorded.
- This batch did not introduce or verify the canonical `features/cta/*` implementation, so the first caller migration is still not ready to start.

Next required action:

- Run representative desktop and mobile browser validation for the protected CTA press paths and record the evidence.
- After that evidence exists, start the smallest scoped canonical CTA implementation batch without migrating callers broadly.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: Phase 0
- Batch / scope: Baseline proof and planning collapse
- Status: BLOCKED

Changes made:

- Added `plans/ctabutton/checklist.md` as the live CTA migration boundary.
- Added baseline tests for `lib/press-feedback.tsx` in `lib/__tests__/press-feedback.test.tsx`.
- Expanded `components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx` to cover external links, disabled rendering, hash-link attributes, and analytics identity with `children` overrides.

Verification matrix IDs covered:

- `CTA-INV-02`
- `CTA-INV-03`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-06`
- `CTA-INV-08`
- `CTA-INV-09`
- `CTA-INV-19`

Commands run:

- `npm test -- lib/__tests__/press-feedback.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx`
- `npm run lint -- lib/__tests__/press-feedback.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx`
- `rg -n '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n 'usePressFeedback<' components app features`
- `rg -n 'buildPreApprovalTriggerAttributes\\(' components app`
- `rg -n 'buildPreApprovalHref\\(' components app`

Automated verification results:

- `lib/__tests__/press-feedback.test.tsx`: 4 tests passed.
- `components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx`: 5 tests passed.
- Targeted lint on both test files passed.
- Live inventory reconciled to 18 production `RippleCtaLink` consumers, 3 direct `usePressFeedback` consumers outside the wrapper, 6 direct trigger-attribute builders outside the wrapper, and 1 route-based pre-approval entry.

Browser verification results:

- Route: not run
- Viewport: not run
- Trigger path: not run
- Observed behavior: not verified in this batch

Evidence summary:

- The current press baseline is `commit-on-click`, not `press-on-down`.
- Wrapper deletion is not ready because deep imports, `children` override sites, and `cardId` sites are still live.
- Adjacent protected surfaces outside the wrapper do not yet have targeted proof.

Gate decision:

- `NO-GO`

Blockers / regressions:

- `CTA-INV-07` not yet proven with targeted browser validation.
- `CTA-INV-25` not yet proven for `NavPressable`, `ProgramNavCardLink`, and `PreApprovalDrawerView`.
- `CTA-INV-26` not yet proven for direct trigger-attribute builders outside the wrapper.

Next required action:

- Add targeted tests for adjacent protected surfaces.
- Then migrate exactly one caller class or introduce the smallest necessary `features/cta/` implementation.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: Phase 1
- Batch / scope: Minimal canonical `features/cta/*` entrypoints plus Phase 1 verification closeout
- Status: COMPLETE

Changes made:

- Added [contract.ts](/Users/benfranzoso/Documents/Projects/copy/features/cta/contract.ts), [lead-entry.ts](/Users/benfranzoso/Documents/Projects/copy/features/cta/lead-entry.ts), and [client.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) as the smallest canonical CTA feature surfaces without moving production callers onto them yet.
- Added [public-api.test.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/__tests__/public-api.test.tsx) to import the new `@/features/cta/*` aliases directly and prove the lead-entry helpers still reuse the existing pre-approval builders.
- Left [index.ts](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/index.ts) and [RippleCtaLink.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) in place so the existing barrel and deep-import compatibility paths continue compiling unchanged.
- Recorded the shared press-feedback compatibility plan for this phase as “no ownership move in Phase 1”: the new CTA client surface wraps the existing wrapper runtime, and [press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx) remains the shared subsystem for direct non-wrapper consumers.
- Updated [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md) and this execution log in the same Phase 1 batch.

Verification matrix IDs covered:

- `CTA-INV-12`
- `CTA-INV-13`
- `CTA-INV-14`
- `CTA-INV-17`
- `CTA-INV-18`
- `CTA-INV-25`
- `CTA-INV-26`

Commands run:

- `npm test -- features/cta/__tests__/public-api.test.tsx components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/ProgramNavCardLink.test.tsx features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/preApprovalConfigRenderers.test.tsx components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx`
- `npm run lint -- features/cta/contract.ts features/cta/lead-entry.ts features/cta/client.tsx features/cta/__tests__/public-api.test.tsx components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/ProgramNavCardLink.test.tsx features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/preApprovalConfigRenderers.test.tsx components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx`
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link' components app`
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app`
- `rg -n 'usePressFeedback<' components app features`
- `rg -n 'buildPreApprovalTriggerAttributes\\(' components app`
- `rg -n --glob '!**/*.md' 'URLSearchParams|data-pre-approval-|#get-pre-approved|data-drawer-' features/cta components/ui/ripple-cta-link -g '!**/*.test.ts' -g '!**/*.test.tsx'`
- `npm run build`
- `PORT=3005 npm run dev`
- `agent-browser open http://127.0.0.1:3005/rollback-financing#get-pre-approved && agent-browser wait --load networkidle && agent-browser snapshot -i`
- `agent-browser click @e59 && agent-browser wait --load networkidle && agent-browser get url`
- `agent-browser open http://127.0.0.1:3005/fleet-financing && agent-browser wait --load networkidle && agent-browser snapshot -i`
- `agent-browser open http://127.0.0.1:3005/fleet-financing#get-pre-approved && agent-browser wait 500 && agent-browser snapshot -i`
- `agent-browser set device "iPhone 14" && agent-browser open http://127.0.0.1:3005/rollback-financing && agent-browser wait --load networkidle && agent-browser snapshot -i`
- `agent-browser click @e10 && agent-browser wait 300 && agent-browser snapshot -i`

Automated verification results:

- `features/cta/__tests__/public-api.test.tsx`: 2 tests passed.
- `components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx`: 3 tests passed.
- `app/(marketing)/(programs)/_components/__tests__/ProgramNavCardLink.test.tsx`: 3 tests passed.
- `features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx`: 5 tests passed.
- `components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx`: 5 tests passed.
- `app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx`: 3 tests passed.
- `app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx`: 5 tests passed.
- `components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx`: 2 tests passed.
- `components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx`: 1 test passed.
- `components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx`: 2 tests passed.
- Targeted lint on the new CTA modules and all Phase 1 proof files passed.
- `npm run build` passed with the canonical `@/features/cta/*` modules present.

Browser verification results:

- Route: `http://127.0.0.1:3005/rollback-financing#get-pre-approved`
- Viewport: desktop default
- Trigger path: direct hash entry into the marketing rollback page, then click `Continue to Pre-Approval`
- Observed behavior: the pre-approval drawer rendered on load with `Continue to Pre-Approval`, and clicking it navigated to `http://127.0.0.1:3005/pre-approval?amount=100000`

- Route: `http://127.0.0.1:3005/fleet-financing`
- Viewport: desktop default
- Trigger path: load the fleet program page, verify the `ProgramNavCardLink` card row renders, then deep-link `#get-pre-approved`
- Observed behavior: the program page rendered its four pre-approval card links (`rollback`, `wrecker`, `heavy wrecker`, `rotator`), and `http://127.0.0.1:3005/fleet-financing#get-pre-approved` opened the same pre-approval drawer with the continue button visible

- Route: `http://127.0.0.1:3005/rollback-financing`
- Viewport: `iPhone 14`
- Trigger path: click the `Open menu` control in the mobile header
- Observed behavior: the `NavPressable` menu trigger toggled to `Close menu` and opened the mobile overlay with the navigation links and `Get Pre-Approved` CTA visible

Evidence summary:

- `CTA-INV-12`: the compatibility barrel import path still has 18 production consumers, and the full build passed with those imports intact.
- `CTA-INV-13`: the deep import path still has 2 production consumers in [ClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx) and [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx), and the full build passed with both in place.
- `CTA-INV-14`: [contract.ts](/Users/benfranzoso/Documents/Projects/copy/features/cta/contract.ts), [lead-entry.ts](/Users/benfranzoso/Documents/Projects/copy/features/cta/lead-entry.ts), and [client.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) resolved through the `@/*` alias in tests and in the production build.
- `CTA-INV-17`: `rg -n --glob '!**/*.md' 'URLSearchParams|data-pre-approval-|#get-pre-approved|data-drawer-' features/cta components/ui/ripple-cta-link -g '!**/*.test.ts' -g '!**/*.test.tsx'` returned no matches, and the new CTA lead-entry code reuses `buildPreApprovalEntryHref()` and `buildPreApprovalTriggerAttributes()` instead of constructing hashes, query strings, or trigger attributes manually.
- `CTA-INV-18`: `rg -n 'usePressFeedback<' components app features` still shows only the wrapper plus the three protected non-wrapper consumers, and their targeted tests plus the full build all passed.
- `CTA-INV-25`: targeted automated tests passed for [NavPressable.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx), [ProgramNavCardLink.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/__tests__/ProgramNavCardLink.test.tsx), and [PreApprovalDrawerView.press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx); browser validation confirmed the mobile menu pressable path and the desktop drawer-continue path still behave on live routes.
- `CTA-INV-26`: `rg -n 'buildPreApprovalTriggerAttributes\\(' components app` still resolves to the canonical builder surfaces only, targeted automated tests passed for sticky-nav, program, homepage, program-renderer, equipment-closing, and hero tertiary-link callers, and code review confirmed the remaining direct builder surfaces in [HeroShowcase.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-showcase-rm/HeroShowcase.tsx), [HeroConvert.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/HeroConvert.tsx), [HeroConvertFramed.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx), and [EquipmentClosingCtaTrucks.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx) still call `buildPreApprovalTriggerAttributes()` directly.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Phase 1 is closed. Do not start Phase 2 in this batch.
- If work resumes, begin a separate Phase 2 batch that converts the wrapper into a compatibility facade without deleting the legacy import paths yet.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Phase: Phase 2
- Batch / scope: Convert `RippleCtaLink` into a canonical-runtime compatibility facade and verify Phase 2 invariants
- Status: PASS

Changes made:

- Moved the live CTA interaction/rendering ownership into [client.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) so canonical `CtaLink` now owns the single-anchor internal link, external link, disabled button, ripple, analytics, and pre-approval trigger behavior.
- Converted [RippleCtaLink.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) into a compatibility facade that maps legacy props (`label`, `variant`, `justify`, `section`, `cardId`, `children`, `preApprovalTrigger`) onto the canonical CTA runtime without changing the wrapper import paths.
- Removed `next/link` `legacyBehavior` and `passHref` from the wrapper path by rendering the internal CTA as a single `next/link` anchor through the canonical runtime.
- Added fire-and-forget isolation for legacy analytics observers in [client.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) and for haptics in [press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx) so failures do not block CTA commit handling.
- Expanded [RippleCtaLink.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx), [public-api.test.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/__tests__/public-api.test.tsx), and [press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/__tests__/press-feedback.test.tsx) for the Phase 2 facade invariants, single-anchor DOM shape, analytics isolation, and haptics isolation.
- Fixed [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx) to encode the calculator `known` query flag as the calculator’s canonical boolean value (`1` instead of `true`) so the live compatibility-facade CTA preserves the intended “I know my payment” mode during client navigation.
- Added [MiniROI.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/__tests__/MiniROI.test.tsx) to lock the homepage wrapper CTA href to the canonical calculator query encoding.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-03`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-06`
- `CTA-INV-08`
- `CTA-INV-09`
- `CTA-INV-10`
- `CTA-INV-11`
- `CTA-INV-15`
- `CTA-INV-19`
- `CTA-INV-25`
- `CTA-INV-26`

Commands run:

- `npm test -- lib/__tests__/press-feedback.test.tsx components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx features/cta/__tests__/public-api.test.tsx components/sections/nav/sticky-nav-rm/__tests__/NavPressable.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/ProgramNavCardLink.test.tsx features/pre-approval/__tests__/PreApprovalDrawerView.press-feedback.test.tsx components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx app/'(marketing)'/'(programs)'/_components/__tests__/preApprovalConfigRenderers.test.tsx components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx components/sections/heroes/hero-convert-geico/__tests__/HeroConvertTertiaryLinks.test.tsx components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx components/sections/page/mini-roi/__tests__/MiniROI.test.tsx`
- `npm run lint`
- `npm run build`
- `rg -n "legacyBehavior|passHref" components/ui/ripple-cta-link features/cta`
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'https?://' components/sections app/'(marketing)'`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900 && agent-browser open http://127.0.0.1:3001 && agent-browser wait --load networkidle && agent-browser eval "(() => { const calculatorLink = Array.from(document.querySelectorAll('a[href^=\"/tow-truck-calculator\"]')).find((el) => el.textContent?.includes('Build Your Full Profit Plan')); const preApprovalLink = Array.from(document.querySelectorAll('a[href=\"#get-pre-approved\"]')).find((el) => el.textContent?.includes('It Takes 30')); return { calculator: calculatorLink ? { href: calculatorLink.getAttribute('href'), text: calculatorLink.textContent?.trim() } : null, preApproval: preApprovalLink ? { href: preApprovalLink.getAttribute('href'), text: preApprovalLink.textContent?.trim() } : null, nestedAnchors: document.querySelectorAll('a a').length }; })()"`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a[href^=\"/tow-truck-calculator\"]')).find((el) => el.textContent?.includes('Build Your Full Profit Plan')); if (!link) return null; link.scrollIntoView({ block: 'center' }); link.click(); return { href: link.getAttribute('href') }; })()" && agent-browser wait --load networkidle && agent-browser eval "({ href: window.location.href, pathname: window.location.pathname, search: window.location.search, knowsPaymentChecked: document.querySelector('#knows-payment')?.getAttribute('aria-checked') === 'true' })"`
- `agent-browser open 'http://127.0.0.1:3001/tow-truck-calculator?rev=200&pmt=1200&known=1' && agent-browser wait --load networkidle && agent-browser eval "({ href: window.location.href, pathname: window.location.pathname, search: window.location.search, knowsPaymentChecked: document.querySelector('#knows-payment')?.getAttribute('aria-checked') === 'true' })"`
- `agent-browser open http://127.0.0.1:3001 && agent-browser wait --load networkidle && agent-browser snapshot -i`
- `agent-browser fill @e91 260 && agent-browser click @e52 && agent-browser fill @e92 1450 && agent-browser press Enter && agent-browser eval "(() => { const link = document.querySelector('a[href^=\"/tow-truck-calculator\"]'); return link ? { href: link.getAttribute('href'), text: link.textContent?.trim() } : null; })()"`
- `agent-browser click @e53 && agent-browser wait --load networkidle && agent-browser eval "({ href: window.location.href, pathname: window.location.pathname, search: window.location.search, knowsPaymentChecked: document.querySelector('#knows-payment')?.getAttribute('aria-checked') === 'true' })"`
- `agent-browser set viewport 1440 900 && agent-browser open http://127.0.0.1:3001 && agent-browser wait --load networkidle && agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a[href=\"#get-pre-approved\"]')).find((el) => el.textContent?.includes('It Takes 30')); if (!link) return null; link.scrollIntoView({ block: 'center' }); link.click(); return { href: link.getAttribute('href'), text: link.textContent?.trim() }; })()" && agent-browser wait 500 && agent-browser eval "({ href: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))) })"`
- `agent-browser set device 'iPhone 14' && agent-browser open http://127.0.0.1:3001 && agent-browser wait --load networkidle && agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a[href^=\"/tow-truck-calculator\"]')).find((el) => el.textContent?.includes('Build Your Full Profit Plan')); if (!link) return null; link.scrollIntoView({ block: 'center' }); link.click(); return { href: link.getAttribute('href'), text: link.textContent?.trim() }; })()" && agent-browser wait --load networkidle && agent-browser eval "({ href: window.location.href, pathname: window.location.pathname, search: window.location.search, knowsPaymentChecked: document.querySelector('#knows-payment')?.getAttribute('aria-checked') === 'true' })"`
- `agent-browser set device 'iPhone 14' && agent-browser open http://127.0.0.1:3001 && agent-browser wait --load networkidle && agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a[href=\"#get-pre-approved\"]')).find((el) => el.textContent?.includes('It Takes 30')); if (!link) return null; link.scrollIntoView({ block: 'center' }); link.click(); return { href: link.getAttribute('href'), text: link.textContent?.trim() }; })()" && agent-browser wait 500 && agent-browser eval "({ href: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))) })"`

Automated verification results:

- `lib/__tests__/press-feedback.test.tsx`: 5 tests passed, including the new haptics failure isolation case (`CTA-INV-10`) while preserving commit-on-click, swipe cancel, duplicate-commit suppression, and reduced-motion behavior.
- `components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx`: 7 tests passed, including the new single-anchor internal DOM assertion (`CTA-INV-01`) and analytics failure isolation (`CTA-INV-11`) while preserving disabled rendering, canonical pre-approval attributes, and legacy analytics payload identity (`CTA-INV-03`, `CTA-INV-04`, `CTA-INV-19`).
- `features/cta/__tests__/public-api.test.tsx`: 2 tests passed, confirming the canonical `CtaLink` and `LeadCta` surfaces render through the canonical runtime and stay free of nested anchors.
- `components/sections/page/mini-roi/__tests__/MiniROI.test.tsx`: 1 test passed, freezing the homepage compatibility-facade CTA on the calculator’s canonical boolean query encoding.
- The full targeted CTA verification suite passed: 13 files, 44 tests total, including the protected adjacent surfaces for direct `usePressFeedback` consumers and direct trigger builders (`CTA-INV-25`, `CTA-INV-26`).
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed after restoring the deep-path compatibility type export.
- `rg -n "legacyBehavior|passHref" components/ui/ripple-cta-link features/cta` returned no matches.
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'https?://' components/sections app/'(marketing)'` returned only schema metadata URLs and SVG namespaces; no production `RippleCtaLink` caller with an `http(s)` destination exists in the current inventory, so there is no representative external compatibility-facade browser path to exercise in Phase 2.

Browser verification results:

- Route: `/`
- Viewport: desktop `1440x900`
- Trigger path: `MiniROI` internal CTA `Build Your Full Profit Plan` through the compatibility facade with default homepage values
- Observed behavior: the live CTA anchor rendered `href="/tow-truck-calculator?rev=200&pmt=1200&known=1"` with `document.querySelectorAll('a a').length === 0`; clicking it navigated to `/tow-truck-calculator?known=1` with the calculator’s `I know my payment` toggle checked. The destination canonicalized away default `rev` and `pmt` values but preserved the intended state.

- Route: `/` -> `/tow-truck-calculator?known=1&pmt=1450&rev=260`
- Viewport: desktop `1440x900`
- Trigger path: `MiniROI` internal CTA after editing revenue-per-tow to `260` and monthly payment to `1450`
- Observed behavior: the live wrapper CTA updated to `href="/tow-truck-calculator?rev=260&pmt=1450&known=1"` and browser activation preserved the non-default calculator state on the destination route with `knowsPaymentChecked: true`.

- Route: `/tow-truck-calculator?rev=200&pmt=1200&known=1`
- Viewport: desktop `1440x900`
- Trigger path: direct open of the same calculator href for discrepancy comparison
- Observed behavior: direct open preserved the full search string, confirming the remaining difference after CTA activation is destination-page canonicalization of default values rather than a lost-state regression in the compatibility facade.

- Route: `/`
- Viewport: desktop `1440x900`
- Trigger path: closing-section pre-approval CTA `Get Pre-Approved — It Takes 30 Seconds` through the compatibility facade
- Observed behavior: after scrolling the live wrapper link into view and invoking a DOM click on the real anchor, the pre-approval drawer opened on the same route and exposed `Continue to Pre-Approval`.

- Route: `/`
- Viewport: mobile `iPhone 14`
- Trigger path: `MiniROI` internal CTA `Build Your Full Profit Plan` through the compatibility facade with default homepage values
- Observed behavior: tapping the live CTA navigated to `/tow-truck-calculator?known=1` and the calculator stayed in `I know my payment` mode, matching the desktop preserved-state result.

- Route: `/`
- Viewport: mobile `iPhone 14`
- Trigger path: closing-section pre-approval CTA `Get Pre-Approved — It Takes 30 Seconds` through the compatibility facade
- Observed behavior: activating the live mobile CTA kept the user on the same route and exposed the pre-approval continue action (`continueVisible: true`), confirming the wrapper still composes with the drawer entry path on mobile.

Evidence summary:

- `CTA-INV-01`: automated proof exists in [RippleCtaLink.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx) and [public-api.test.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/__tests__/public-api.test.tsx); the live DOM also showed a single anchor with no nested anchors and no `legacyBehavior`/`passHref` remnants.
- `CTA-INV-03`, `CTA-INV-04`, `CTA-INV-15`, and `CTA-INV-19` remain covered by the wrapper tests plus code review of [RippleCtaLink.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) delegating directly to [client.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx).
- `CTA-INV-10` and `CTA-INV-11` now have explicit automated failure-isolation proof in [press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/__tests__/press-feedback.test.tsx) and [RippleCtaLink.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx).
- `CTA-INV-25` and `CTA-INV-26` were rechecked because Phase 2 touched the shared press-feedback subsystem and the wrapper-to-pre-approval composition path.
- The prior homepage discrepancy was caused by [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx) emitting `known=true` while the calculator runtime only recognizes canonical boolean query values (`known=1` / `known=0`). After correcting the wrapper CTA href, browser activation preserves the calculator mode on desktop and mobile, and non-default calculator values survive client navigation through the compatibility facade.
- The remaining difference between CTA activation (`?known=1` for default values) and direct open (`?rev=200&pmt=1200&known=1`) is explained by the calculator destination canonicalizing default-valued params away during client navigation; this is not a lost-state regression because the destination state and non-default-value preservation both verify correctly.
- No live production `RippleCtaLink` caller with an `http(s)` destination exists in the current inventory. Phase 2 therefore has no representative external compatibility-facade browser path to exercise, and the absence is proven by code search rather than by omission.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Phase 2 is closed. Do not start Phase 3 in this batch; if migration work resumes, open a separate Phase 3 batch and limit it to one revenue-critical caller group at a time.
