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

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 3
- Batch / scope: Migrate the homepage hero primary CTA caller in [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) to canonical CTA surfaces
- Status: PASS

Changes made:

- Confirmed Phase 2 is closed and treated this work as a single Phase 3 hero batch with no other caller batch mixed into the implementation.
- Migrated the exact caller file [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) so the mobile primary hero CTA now renders through canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) and [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces instead of `RippleCtaLink`.
- Kept the untouched hero tertiary links in [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) on the compatibility wrapper, preserving the controlled-batch boundary for the rest of the hero inventory.
- Added a server-safe `PreApprovalEntry` handoff in [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) so the migrated caller reuses the canonical pre-approval entry contract instead of emitting drawer attributes directly.
- Expanded [homepagePreApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx) to assert the migrated homepage hero CTA still renders without nested anchors while keeping its canonical pre-approval attributes.
- Updated [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/CLAUDE.md) to document that the mobile primary CTA is now canonical while hero tertiary links remain compatibility-backed during the migration.

Verification matrix IDs covered:

- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `git status --short`
- `sed -n '1,220p' components/sections/heroes/hero-gallery/config.ts`
- `sed -n '1,220p' app/'(marketing)'/page.tsx`
- `sed -n '1,220p' components/sections/heroes/hero-gallery/CLAUDE.md`
- `git diff -- components/sections/heroes/hero-gallery/HeroGallery.tsx app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx components/sections/heroes/hero-gallery/CLAUDE.md`
- `npm test -- app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx`
- `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-gallery/HeroGallery.tsx`
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-gallery/HeroGallery.tsx features/cta`
- `npm test -- features/cta/__tests__/public-api.test.tsx lib/__tests__/press-feedback.test.tsx app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `lsof -nP -iTCP:3002 -sTCP:LISTEN`
- `lsof -nP -iTCP:3003 -sTCP:LISTEN`
- `lsof -nP -iTCP:3004 -sTCP:LISTEN`
- `lsof -nP -iTCP:3005 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const heroHeading = document.querySelector('#hero h1')?.textContent?.trim() ?? null; const mobileCta = document.querySelector('a[data-pre-approval-origin-section-id=\"hero-mobile-primary\"]'); const mobileContainer = mobileCta?.parentElement ?? null; return { heroHeading, nestedAnchors: document.querySelectorAll('a a').length, mobileCta: mobileCta ? { href: mobileCta.getAttribute('href'), text: mobileCta.textContent?.trim(), hiddenByViewport: mobileContainer ? getComputedStyle(mobileContainer).display === 'none' : null, pageId: mobileCta.getAttribute('data-pre-approval-origin-page-id'), sectionId: mobileCta.getAttribute('data-pre-approval-origin-section-id'), ctaId: mobileCta.getAttribute('data-pre-approval-origin-cta-id') } : null }; })()"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const mobileCta = document.querySelector('a[data-pre-approval-origin-section-id=\"hero-mobile-primary\"]'); if (!mobileCta) return null; mobileCta.scrollIntoView({ block: 'center' }); mobileCta.click(); return { href: mobileCta.getAttribute('href'), text: mobileCta.textContent?.trim() }; })()"`
- `agent-browser wait 500`
- `agent-browser eval "({ href: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), drawerHeading: Array.from(document.querySelectorAll('h2,h3')).find((el) => el.textContent?.includes('Get Pre-Approved'))?.textContent ?? null })"`
- `agent-browser close`

Automated verification results:

- `app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx`: 3 tests passed. The migrated homepage hero CTA still emits the canonical pre-approval trigger attributes, and the new assertion confirmed the rendered homepage CTA tree contains no nested anchors.
- `features/cta/__tests__/public-api.test.tsx`: 2 tests passed, confirming the canonical [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) and [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces still render through the canonical CTA runtime after the caller cutover.
- `lib/__tests__/press-feedback.test.tsx`: 5 tests passed, re-proving commit-on-click press handling, swipe-cancel protection, duplicate-commit suppression, reduced-motion semantics, and haptics isolation for the shared CTA runtime that the migrated hero caller now uses.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-gallery/HeroGallery.tsx` returned one canonical `LeadCta` call site, one canonical `CtaLink` fallback, and the unchanged `RippleCtaLink` tertiary-link usage, proving the batch migrated only the intended hero primary caller.
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-gallery/HeroGallery.tsx features/cta` returned no matches, confirming the migrated hero caller does not manually construct pre-approval query strings or trigger attributes.

Browser verification results:

- Route: `/`
- Viewport: desktop `1440x900`
- Trigger path: homepage hero mobile primary CTA DOM inspection at desktop viewport
- Observed behavior: the homepage rendered with hero heading `Fast & Easy Tow Truck Financing`; the migrated hero CTA still existed in the DOM with `href="#get-pre-approved"` and canonical `home / hero-mobile-primary / hero-mobile-primary` origin attributes; its mobile container was hidden at the desktop breakpoint, and `document.querySelectorAll('a a').length` remained `0`.

- Route: `/`
- Viewport: mobile `iPhone 14`
- Trigger path: homepage hero mobile primary CTA `Get Pre-Approved`
- Observed behavior: tapping the real anchor with `data-pre-approval-origin-section-id="hero-mobile-primary"` kept the user on `/` and exposed the pre-approval drawer continue action (`continueVisible: true`), confirming the migrated canonical hero CTA still commits the live lead-entry path on mobile.

Evidence summary:

- `CTA-INV-16`: the exact query `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-gallery/HeroGallery.tsx` and code review of [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) show that only the homepage hero mobile primary CTA moved to canonical CTA surfaces, while untouched tertiary links remain on the compatibility wrapper.
- `CTA-INV-17`: the exact query `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-gallery/HeroGallery.tsx features/cta` returned no matches, and [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) now passes a `PreApprovalEntry` object into [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) instead of emitting attributes itself.
- `CTA-INV-04`: [homepagePreApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx) and the mobile browser pass both confirmed the migrated hero CTA still emits the canonical pre-approval trigger schema for `pageId="home"` and `sectionId="hero-mobile-primary"`.
- `CTA-INV-05`: [press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/__tests__/press-feedback.test.tsx) revalidated the shared press subsystem, and live mobile browser activation of the migrated hero CTA opened the drawer without navigation regression.
- Untouched callers continue working through the compatibility layer: in this batch, the hero tertiary links in [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) were intentionally left on `RippleCtaLink`, and no sticky-nav or non-hero lead-entry caller was migrated.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Keep Phase 3 open and start a separate hero-only follow-up batch for the next revenue-critical hero CTA caller. Do not move to sticky-nav until the intended hero caller subset is explicitly recorded as complete.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 3
- Batch / scope: Migrate the reusable `HeroLeadGen` primary CTA caller in [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx) to canonical CTA surfaces
- Status: PASS

Changes made:

- Confirmed Phase 2 remains closed and kept this work to one Phase 3 hero batch only.
- Migrated the exact caller file [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx) so its primary CTA now renders through canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) and [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces instead of `RippleCtaLink`.
- Added a server-safe `PreApprovalEntry` handoff in [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx) so the migrated caller reuses the canonical pre-approval entry contract.
- Expanded [HeroLeadGen.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx) to assert that the migrated caller still renders with no nested anchors while preserving canonical trigger attributes.
- Updated [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/CLAUDE.md) to document the canonical CTA ownership boundary for this hero.

Verification matrix IDs covered:

- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `sed -n '1,220p' components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`
- `sed -n '1,220p' components/sections/heroes/hero-lead-gen/config.ts`
- `sed -n '1,220p' components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx`
- `sed -n '1,220p' components/sections/heroes/hero-lead-gen/CLAUDE.md`
- `sed -n '1,220p' app/'(marketing)'/'(financing)'/rotator-financing/config.ts`
- `sed -n '140,210p' app/'(marketing)'/'(programs)'/fleet-financing/config.ts`
- `git diff -- components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx components/sections/heroes/hero-lead-gen/CLAUDE.md`
- `npm test -- components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx features/cta/__tests__/public-api.test.tsx lib/__tests__/press-feedback.test.tsx`
- `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx features/cta`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `lsof -nP -iTCP:3002 -sTCP:LISTEN`
- `lsof -nP -iTCP:3003 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rotator-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"hero-primary\"][data-pre-approval-origin-page-id=\"rotator-financing\"]'); return { heading: document.querySelector('#hero h1')?.textContent?.trim() ?? null, nestedAnchors: document.querySelectorAll('a a').length, cta: link ? { href: link.getAttribute('href'), text: link.textContent?.trim(), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id'), truckType: link.getAttribute('data-pre-approval-handoff-truck-type') } : null }; })()"`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"hero-primary\"][data-pre-approval-origin-page-id=\"rotator-financing\"]'); if (!link) return null; link.scrollIntoView({ block: 'center' }); link.click(); return { href: link.getAttribute('href'), text: link.textContent?.trim() }; })()"`
- `agent-browser wait 500`
- `agent-browser eval "({ href: window.location.href, continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')) })"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/fleet-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"hero-primary\"][data-pre-approval-origin-page-id=\"fleet-financing\"]'); return { heading: document.querySelector('#hero h1')?.textContent?.trim() ?? null, nestedAnchors: document.querySelectorAll('a a').length, cta: link ? { href: link.getAttribute('href'), text: link.textContent?.trim(), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id') } : null }; })()"`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"hero-primary\"][data-pre-approval-origin-page-id=\"fleet-financing\"]'); if (!link) return null; link.scrollIntoView({ block: 'center' }); link.click(); return { href: link.getAttribute('href'), text: link.textContent?.trim() }; })()"`
- `agent-browser wait 500`
- `agent-browser eval "({ href: window.location.href, continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')) })"`
- `agent-browser close`

Automated verification results:

- `components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx`: 1 test passed, confirming the migrated caller still emits canonical pre-approval trigger attributes and now renders without nested anchors.
- `features/cta/__tests__/public-api.test.tsx`: 2 tests passed, confirming the canonical CTA surfaces still render through the canonical runtime after this caller cutover.
- `lib/__tests__/press-feedback.test.tsx`: 5 tests passed, re-proving the shared press subsystem used by the migrated hero CTA.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx` returned only canonical CTA surface imports and call sites, confirming the wrapper is no longer used by this caller.
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx features/cta` returned no matches, confirming the migrated hero caller does not manually construct pre-approval query strings or trigger attributes.

Browser verification results:

- Route: `/rotator-financing`
- Viewport: desktop `1440x900`
- Trigger path: hero primary CTA `Get Pre-Approved`
- Observed behavior: the hero rendered with heading `Rotator Financing for Heavy Recovery.`; the live CTA rendered as a single anchor with `href="#get-pre-approved"`, canonical `rotator-financing / hero-primary / hero-main-cta` origin attributes, and `data-pre-approval-handoff-truck-type="rotator"`; `document.querySelectorAll('a a').length` remained `0`; clicking the CTA kept the user on the same route and opened the pre-approval drawer with both `closeVisible: true` and `continueVisible: true`.

- Route: `/fleet-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: hero primary CTA `Get Pre-Approved`
- Observed behavior: the hero rendered with heading `You've Built the Operation. Now Scale the Fleet.`; the live CTA rendered as a single anchor with canonical `fleet-financing / hero-primary / hero-main-cta` origin attributes and no nested anchors; tapping it kept the user on `/fleet-financing` and exposed the pre-approval continue action (`continueVisible: true`).

Evidence summary:

- `CTA-INV-16`: the exact query `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx` and code review of [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx) show that this caller now uses only canonical CTA surfaces.
- `CTA-INV-17`: the exact query `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx features/cta` returned no matches, and [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx) now passes a `PreApprovalEntry` object into [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx).
- `CTA-INV-04`: [HeroLeadGen.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx) plus browser checks on `/rotator-financing` and `/fleet-financing` confirmed the migrated hero CTA still emits the canonical pre-approval trigger schema.
- `CTA-INV-05`: [press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/__tests__/press-feedback.test.tsx) revalidated commit-on-click semantics, and live desktop/mobile activation of the migrated hero CTA opened the drawer without navigation regression.
- Untouched hero callers continue through their prior paths: this batch migrated only [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx); `HeroShowcase`, `TileSelector`, `FramedTileSelector`, and hero tertiary-link surfaces were not changed in this batch.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Keep Phase 3 open and start the next hero-only batch for either [TileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/TileSelector.tsx), [FramedTileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx), or [HeroShowcase.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-showcase-rm/HeroShowcase.tsx). Do not move to sticky-nav yet.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 3
- Batch / scope: Migrate the shared framed-hero primary CTA caller in [FramedTileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx) to canonical CTA surfaces
- Status: PASS

Changes made:

- Confirmed Phase 2 remains closed, kept Phase 3 active, and limited the implementation to one hero caller batch only.
- Migrated the exact caller file [FramedTileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx) from `RippleCtaLink` to canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) and [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces.
- Preserved the compatibility behavior boundary by keeping the CTA disabled until a tile is selected, then handing the resolved pre-approval trigger to a canonical `PreApprovalEntry`.
- Preserved the legacy analytics section identity by passing the caller `section` through the canonical analytics adapter instead of deleting that behavior during this batch.
- Left untouched compatibility callers in place, including the outline tertiary action cards in [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx).
- Updated [FramedTileSelector.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx), [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/CLAUDE.md), [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md), and this execution log in the same batch.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-03`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `git branch --show-current`
- `sed -n '1,240p' plans/ctabutton/cta-button-phase-gates.md`
- `sed -n '1,260p' plans/ctabutton/cta-button-execution-log.md`
- `sed -n '1,260p' plans/ctabutton/checklist.md`
- `git status --short`
- `ps -ef | rg 'next dev|npm run dev|agent-browser|chrome-146|playwright'`
- `git diff -- components/sections/heroes/hero-gallery/HeroGallery.tsx components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx plans/ctabutton/cta-button-execution-log.md plans/ctabutton/cta-button-phase-gates.md app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx components/sections/heroes/hero-lead-gen/__tests__/HeroLeadGen.test.tsx`
- `sed -n '1,240p' components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`
- `sed -n '1,240p' components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx`
- `sed -n '1,260p' components/sections/heroes/hero-convert-framed/CLAUDE.md`
- `sed -n '1,260p' features/cta/client.tsx`
- `sed -n '1,260p' features/cta/lead-entry.ts`
- `sed -n '1,260p' features/pre-approval/selection.ts`
- `sed -n '1,260p' app/'(marketing)'/'(financing)'/used-tow-truck-financing/config.ts`
- `git diff -- components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx components/sections/heroes/hero-convert-framed/CLAUDE.md`
- `npm test -- components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx features/cta/__tests__/public-api.test.tsx lib/__tests__/press-feedback.test.tsx`
- `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx features/cta`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `lsof -nP -iTCP:3002 -sTCP:LISTEN`
- `lsof -nP -iTCP:3003 -sTCP:LISTEN`
- `lsof -nP -iTCP:3004 -sTCP:LISTEN`
- `lsof -nP -iTCP:3005 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/used-tow-truck-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const ctaButton = Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Get Pre-Approved')); return { heading: document.querySelector('#hero h1')?.textContent?.trim() ?? null, nestedAnchors: document.querySelectorAll('a a').length, disabledCta: ctaButton ? { text: ctaButton.textContent?.trim(), disabled: ctaButton.hasAttribute('disabled'), pageId: ctaButton.getAttribute('data-pre-approval-origin-page-id') } : null }; })()"`
- `agent-browser eval "(() => { const hero = document.querySelector('#hero'); const tile = Array.from(hero?.querySelectorAll('button') ?? []).find((el) => el.textContent?.includes('Rotator')); if (!tile || !hero) return null; tile.click(); const link = Array.from(hero.querySelectorAll('a')).find((el) => el.textContent?.includes('Get Pre-Approved')); return link ? { text: link.textContent?.trim(), href: link.getAttribute('href'), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id'), truckType: link.getAttribute('data-pre-approval-handoff-truck-type'), nestedAnchors: hero.querySelectorAll('a a').length } : null; })()"`
- `agent-browser eval "(() => { const hero = document.querySelector('#hero'); const link = Array.from(hero?.querySelectorAll('a') ?? []).find((el) => el.textContent?.includes('Get Pre-Approved')); if (!link) return null; link.click(); return { clicked: true, href: link.getAttribute('href') }; })()"`
- `agent-browser wait 500`
- `agent-browser eval "({ href: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), drawerHeading: Array.from(document.querySelectorAll('h2,h3')).find((el) => el.textContent?.includes('Get Pre-Approved'))?.textContent ?? null })"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/used-tow-truck-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const hero = document.querySelector('#hero'); const ctaButton = Array.from(hero?.querySelectorAll('button') ?? []).find((el) => el.textContent?.includes('Get Pre-Approved')); return { heading: hero?.querySelector('h1')?.textContent?.trim() ?? null, disabledCta: ctaButton ? { text: ctaButton.textContent?.trim(), disabled: ctaButton.hasAttribute('disabled') } : null, nestedAnchors: hero?.querySelectorAll('a a').length ?? null }; })()"`
- `agent-browser eval "(() => { const hero = document.querySelector('#hero'); const tile = Array.from(hero?.querySelectorAll('button') ?? []).find((el) => el.textContent?.includes('Heavy Wrecker')); if (!tile || !hero) return null; tile.click(); const link = Array.from(hero.querySelectorAll('a')).find((el) => el.textContent?.includes('Get Pre-Approved')); if (!link) return { tileClicked: true, link: null }; link.click(); return { tileClicked: true, link: { href: link.getAttribute('href'), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id'), truckType: link.getAttribute('data-pre-approval-handoff-truck-type') } }; })()"`
- `agent-browser eval "(() => { const hero = document.querySelector('#hero'); return { buttons: Array.from(hero?.querySelectorAll('button') ?? []).map((el) => ({ text: el.textContent?.trim(), disabled: el.hasAttribute('disabled') })), anchors: Array.from(hero?.querySelectorAll('a') ?? []).map((el) => ({ text: el.textContent?.trim(), href: el.getAttribute('href'), sectionId: el.getAttribute('data-pre-approval-origin-section-id') })) }; })()"`
- `agent-browser eval "(() => { const hero = document.querySelector('#hero'); const link = Array.from(hero?.querySelectorAll('a') ?? []).find((el) => el.textContent?.includes('Get Pre-Approved')); if (!link) return null; const attrs = { href: link.getAttribute('href'), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id'), truckType: link.getAttribute('data-pre-approval-handoff-truck-type') }; link.click(); return attrs; })()"`
- `agent-browser wait 500`
- `agent-browser eval "({ href: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), nestedAnchors: document.querySelector('#hero')?.querySelectorAll('a a').length ?? null })"`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link\";$' components app`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link/RippleCtaLink\";$' components app`

Automated verification results:

- `components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx`: 1 test passed, confirming the migrated caller preserves the disabled pre-selection button path, renders without nested anchors after selection, and still emits canonical pre-approval trigger attributes.
- `features/cta/__tests__/public-api.test.tsx`: 2 tests passed, confirming the canonical CTA surfaces still render through the canonical runtime after this caller cutover.
- `lib/__tests__/press-feedback.test.tsx`: 5 tests passed, re-proving commit-on-click press handling, touch-drift cancel protection, duplicate-commit suppression, reduced-motion semantics, and haptics isolation for the shared CTA runtime used by the migrated hero caller.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx` returned only canonical CTA surface imports and call sites, confirming the wrapper is no longer used by this caller.
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx features/cta` returned no matches, confirming the migrated caller does not manually construct pre-approval query strings or trigger attributes.
- Inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): the live wrapper-import boundary is now 16 production consumers total, with 14 barrel imports and 2 deep imports, and `HeroLeadGen.tsx` is no longer listed as a wrapper-only `children` override site.

Browser verification results:

- Route: `/used-tow-truck-financing`
- Viewport: desktop `1440x900`
- Trigger path: framed hero CTA before selection, then select `Rotator`, then activate `Get Pre-Approved`
- Observed behavior: the hero rendered with heading `Finance Any Used Tow Truck. Any Age. Any Mileage. Any Seller.`; before selection the hero CTA rendered as a disabled button with no `data-pre-approval-origin-page-id`; after selecting `Rotator`, the CTA became a single anchor with `href="#get-pre-approved"`, canonical `used-tow-truck-financing / hero-primary / hero-main-cta` origin attributes, `data-pre-approval-handoff-truck-type="rotator"`, and no nested anchors; activating it kept the user on `/used-tow-truck-financing` and opened the pre-approval drawer with both `closeVisible: true` and `continueVisible: true`.

- Route: `/used-tow-truck-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: framed hero CTA before selection, then select `Heavy Wrecker`, then activate `Get Pre-Approved`
- Observed behavior: before selection the hero CTA rendered as a disabled button and `document.querySelector('#hero')?.querySelectorAll('a a').length` remained `0`; after selecting `Heavy Wrecker`, the hero CTA rendered as a single anchor with canonical `used-tow-truck-financing / hero-primary / hero-main-cta` origin attributes and `data-pre-approval-handoff-truck-type="heavy-wrecker"`; activating it kept the user on `/used-tow-truck-financing` and exposed the drawer continue action (`continueVisible: true`) without any broad caller regression.

Evidence summary:

- `CTA-INV-16`: the exact query `rg -n "LeadCta|CtaLink|RippleCtaLink" components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx` plus code review of [FramedTileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx) show that this shared framed-hero caller now uses only canonical CTA surfaces.
- `CTA-INV-17`: the exact query `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx features/cta` returned no matches, and [FramedTileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx) now passes a canonical `PreApprovalEntry` object into [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) only after a tile selection exists.
- `CTA-INV-01` and `CTA-INV-03`: [FramedTileSelector.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/FramedTileSelector.test.tsx) plus desktop/mobile browser checks confirmed the disabled compatibility path still renders as a non-interactive button before selection and the enabled internal CTA renders as a single anchor with no nested-anchor regression.
- `CTA-INV-04`: the targeted caller test plus desktop/mobile browser checks confirmed the migrated hero CTA still emits the canonical pre-approval trigger schema, including the resolved truck-type handoff on selection.
- `CTA-INV-05`: [press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/__tests__/press-feedback.test.tsx) revalidated shared commit-on-click semantics, and live desktop/mobile activation of the migrated hero CTA opened the drawer without navigation regression.
- Untouched callers remain on the compatibility layer where intended: [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx) still owns the wrapper-backed tertiary action cards, and no sticky-nav or general lead-entry caller was migrated in this batch.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Keep Phase 3 open and start the next hero-only caller batch, most likely [TileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/TileSelector.tsx) or [HeroShowcase.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-showcase-rm/HeroShowcase.tsx). Do not move to sticky-nav or lead-entry batches yet.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 3
- Batch / scope: Migrate the sticky-nav primary CTA callers in [NavHeaderActions.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx) and [NavMobileOverlay.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx) to canonical CTA surfaces
- Status: PASS

Changes made:

- Confirmed Phase 2 remains closed, kept Phase 3 active, and limited implementation to the sticky-nav caller class only.
- Replaced the desktop sticky-nav primary CTA in [NavHeaderActions.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx) with canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx), reusing a canonical `PreApprovalEntry` instead of building trigger attributes inline.
- Replaced the mobile overlay sticky-nav primary CTA in [NavMobileOverlay.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx) with canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx), removing the wrapper dependency from the overlay CTA.
- Applied a follow-up visibility fix in [NavHeaderActions.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx) after mobile validation revealed the desktop `Apply Now` CTA was still visible on narrow viewports; the canonical CTA now forces `!hidden` on mobile and `md:!inline-flex` at desktop widths.
- Expanded [preApprovalCta.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx) to assert the migrated desktop and mobile sticky-nav CTAs render without nested anchors while preserving canonical trigger metadata.
- Updated [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/CLAUDE.md), [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md), and this execution log in the same batch.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `git status --short`
- `ps -ef | rg 'next dev|npm run dev|agent-browser|chrome-146|playwright|npm start'`
- `rg -n "HeroShowcase" app components | sed -n '1,220p'`
- `rg -n "hero:\\s*\\{|kind:\\s*\\\"(lead-gen|tile-right|primary-only|framed-outline)\\\"|HeroConvertFramed|HeroLeadGen|HeroShowcase" 'app/(marketing)'`
- `rg -n "HeroConvert\\b" app components | sed -n '1,260p'`
- `sed -n '1,260p' components/sections/nav/sticky-nav-rm/CLAUDE.md`
- `sed -n '1,260p' components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx`
- `sed -n '260,420p' components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx`
- `sed -n '1,260p' components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx`
- `git diff -- components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx components/sections/nav/sticky-nav-rm/CLAUDE.md`
- `npm test -- components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx features/cta/__tests__/public-api.test.tsx lib/__tests__/press-feedback.test.tsx`
- `rg -n "LeadCta|CtaLink|RippleCtaLink|buildPreApprovalTriggerAttributes" components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx`
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx features/cta`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `lsof -nP -iTCP:3002 -sTCP:LISTEN`
- `lsof -nP -iTCP:3003 -sTCP:LISTEN`
- `lsof -nP -iTCP:3004 -sTCP:LISTEN`
- `lsof -nP -iTCP:3005 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"sticky-nav-primary\"]'); return { heading: document.querySelector('#hero h1')?.textContent?.trim() ?? null, nestedAnchors: document.querySelectorAll('a a').length, cta: link ? { href: link.getAttribute('href'), text: link.textContent?.trim(), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id') } : null }; })()"`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"sticky-nav-primary\"]'); if (!link) return null; link.click(); return { href: link.getAttribute('href'), text: link.textContent?.trim() }; })()"`
- `agent-browser wait 500`
- `agent-browser eval "({ href: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), drawerHeading: Array.from(document.querySelectorAll('h2,h3')).find((el) => el.textContent?.includes('Get Pre-Approved'))?.textContent ?? null })"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const button = document.querySelector('button[aria-label=\"Open menu\"]'); return { heading: document.querySelector('#hero h1')?.textContent?.trim() ?? null, menuButton: button ? { expanded: button.getAttribute('aria-expanded'), controls: button.getAttribute('aria-controls') } : null }; })()"`
- `agent-browser eval "(() => { const button = document.querySelector('button[aria-label=\"Open menu\"]'); if (!button) return null; button.click(); return { opened: true, nestedAnchors: document.querySelectorAll('a a').length }; })()"`
- `agent-browser wait 300`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"sticky-nav-mobile-overlay\"]'); const menu = document.querySelector('[role=\"dialog\"][aria-label=\"Navigation menu\"]'); return { menuVisible: Boolean(menu), cta: link ? { href: link.getAttribute('href'), text: link.textContent?.trim(), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id') } : null, nestedAnchors: document.querySelectorAll('a a').length }; })()"`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"sticky-nav-mobile-overlay\"]'); if (!link) return null; link.click(); return { href: link.getAttribute('href'), text: link.textContent?.trim() }; })()"`
- `agent-browser wait 500`
- `agent-browser eval "({ href: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), menuVisible: Boolean(document.querySelector('[role=\"dialog\"][aria-label=\"Navigation menu\"]')) })"`
- `agent-browser eval "(() => { const continueButton = Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval')); const overlay = document.querySelector('[role=\"dialog\"][aria-label=\"Navigation menu\"]'); return { continueVisibleInLayout: continueButton ? continueButton.getBoundingClientRect().width > 0 && continueButton.getBoundingClientRect().height > 0 : false, continueText: continueButton?.textContent?.trim() ?? null, overlayDisplay: overlay ? getComputedStyle(overlay).display : null, overlayZIndex: overlay ? getComputedStyle(overlay).zIndex : null }; })()"`
- `npm test -- components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx features/cta/__tests__/public-api.test.tsx lib/__tests__/press-feedback.test.tsx`
- `npm run lint`
- `npm run build`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const link = document.querySelector('a[data-pre-approval-origin-section-id=\"sticky-nav-primary\"]'); return { desktopVisible: link ? getComputedStyle(link).display !== 'none' && link.getBoundingClientRect().width > 0 : false, text: link?.textContent?.trim() ?? null, href: link?.getAttribute('href') ?? null }; })()"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const desktopLink = document.querySelector('a[data-pre-approval-origin-section-id=\"sticky-nav-primary\"]'); const menuButton = document.querySelector('button[aria-label=\"Open menu\"]'); return { desktopVisible: desktopLink ? getComputedStyle(desktopLink).display !== 'none' && desktopLink.getBoundingClientRect().width > 0 && desktopLink.getBoundingClientRect().height > 0 : false, desktopText: desktopLink?.textContent?.trim() ?? null, menuVisible: menuButton ? getComputedStyle(menuButton).display !== 'none' && menuButton.getBoundingClientRect().width > 0 : false }; })()"`

Automated verification results:

- `components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx`: 5 tests passed, confirming the desktop and mobile sticky-nav CTAs still emit canonical trigger attributes and now render without nested anchors.
- `features/cta/__tests__/public-api.test.tsx`: 2 tests passed, confirming the canonical CTA public surfaces still render through the canonical runtime after the sticky-nav cutover.
- `lib/__tests__/press-feedback.test.tsx`: 5 tests passed, re-proving commit-on-click press handling, touch-drift cancel protection, duplicate-commit suppression, reduced-motion semantics, and haptics isolation for the shared CTA runtime used by the migrated sticky-nav callers.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- The follow-up sticky-nav visibility fix re-passed the same targeted test command plus `npm run lint` and `npm run build` without introducing new warnings or errors.
- `rg -n "LeadCta|CtaLink|RippleCtaLink|buildPreApprovalTriggerAttributes" components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx` returned only `LeadCta` imports and call sites, confirming both sticky-nav primary CTA callers now use canonical CTA surfaces with no remaining wrapper or inline trigger-builder usage.
- `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx features/cta` returned no matches, confirming the migrated sticky-nav callers do not manually construct pre-approval query strings or trigger attributes.
- Live inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): the wrapper-import boundary is now 15 production consumers total (13 barrel imports, 2 deep imports), and the direct `buildPreApprovalTriggerAttributes()` list is down to 5 production surfaces.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop `1440x900`
- Trigger path: sticky-nav header CTA `Apply Now`
- Observed behavior: the live page rendered with hero heading `Need Rollback Financing?`; the sticky-nav CTA rendered as a single anchor with `href="#get-pre-approved"`, canonical `rollback-financing / sticky-nav-primary / sticky-nav-apply-now` origin attributes, and `document.querySelectorAll('a a').length === 0`; clicking it kept the user on `/rollback-financing` and exposed the pre-approval continue action (`continueVisible: true`).

- Route: `/rollback-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: open sticky-nav menu, then activate overlay CTA `Get Pre-Approved`
- Observed behavior: after the visibility fix, the desktop `Apply Now` CTA no longer rendered in the mobile nav chrome before the menu opened (`desktopVisible: false`) while the hamburger trigger remained visible (`menuVisible: true`); opening the menu still exposed a single canonical overlay CTA with `rollback-financing / sticky-nav-mobile-overlay / sticky-nav-mobile-get-pre-approved` origin attributes and no nested anchors, and activating it kept the user on `/rollback-financing`, left the overlay mounted, and exposed a visible `Continue to Pre-Approval` action (`continueVisible: true`, `continueVisibleInLayout: true`), matching the existing overlay interaction shape rather than introducing a redesign.

Evidence summary:

- The live-route audit that preceded this batch showed `HeroConvert` and `HeroShowcase` are not currently routed through `app/(marketing)`, while the existing routed hero callers are the already-recorded `HeroGallery`, `HeroLeadGen`, and framed hero variants. That kept the move to sticky-nav within the Phase 3 revenue-critical boundary.
- `CTA-INV-16`: the exact query `rg -n "LeadCta|CtaLink|RippleCtaLink|buildPreApprovalTriggerAttributes" components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx` plus code review of [NavHeaderActions.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx) and [NavMobileOverlay.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx) show that the sticky-nav primary CTA callers now use canonical CTA surfaces only.
- `CTA-INV-17`: the exact query `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'URLSearchParams|data-pre-approval-|data-drawer-' components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx features/cta` returned no matches, and both sticky-nav callers now pass canonical `PreApprovalEntry` objects into [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx).
- `CTA-INV-01`: [preApprovalCta.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/__tests__/preApprovalCta.test.tsx) plus browser checks confirmed the migrated sticky-nav CTAs render as single anchors with no nested-anchor regression.
- `CTA-INV-04`: the targeted sticky-nav test and desktop/mobile browser checks confirmed the migrated sticky-nav callers still emit the canonical pre-approval trigger schema for both desktop and mobile origin IDs.
- `CTA-INV-05`: [press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/__tests__/press-feedback.test.tsx) revalidated the shared press subsystem, and the live sticky-nav CTA activations opened the pre-approval flow without navigation regression.
- The post-batch regression check confirmed the desktop sticky-nav CTA is visible at desktop width (`desktopVisible: true`) but hidden on mobile (`desktopVisible: false` on `iPhone 14`), eliminating the duplicate `Apply Now` pill reported during mobile validation.
- Untouched lead-entry callers remain on their existing compatibility or direct-builder paths for now; this batch did not migrate any closing CTA, tertiary-strip, or program block caller.

Gate decision:

- `GO`

Blockers / regressions:

- None. The mobile sticky-nav overlay remains mounted after CTA activation, but the continue action is visibly present and this behavior already existed before the canonical CTA cutover.

Next required action:

- Keep Phase 3 open and start one live lead-entry caller batch. The highest-signal next candidate is [EquipmentClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx), which is routed across financing pages and already has targeted pre-approval caller coverage.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 3
- Batch / scope: Migrate the routed `equipment-closing-cta` lead-entry caller class in [EquipmentClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx) and [EquipmentClosingCtaTrucks.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx) to canonical CTA surfaces
- Status: PASS

Changes made:

- Confirmed Phase 2 remains closed, kept Phase 3 as the only active phase, inspected the dirty worktree before editing, and verified there was no active dev server on port `3001` before starting this batch.
- Migrated the financing-page closing CTA in [EquipmentClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx) from the compatibility wrapper to canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) and [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces, preserving the existing pill styling and lead-entry behavior.
- Migrated the program-page closing tile grid in [EquipmentClosingCtaTrucks.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx) from direct trigger-attribute construction to canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) and [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces, preserving the existing card layout, hover treatment, and truck-type handoff behavior.
- Updated [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/CLAUDE.md) to document the canonical CTA ownership boundary for both server components.
- Updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md), and this execution log in the same batch.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `sed -n '1,220p' plans/ctabutton/cta-button-phase-gates.md`
- `git status --short`
- `git diff --stat`
- `lsof -nP -iTCP -sTCP:LISTEN`
- `ps -ef | rg 'agent-browser|chrome|chromium|playwright|next dev|npm run dev|node .*next'`
- `sed -n '1,260p' plans/ctabutton/cta-button-migration-spec.md`
- `sed -n '1,260p' plans/ctabutton/cta-button-verification-matrix.md`
- `sed -n '1,260p' plans/ctabutton/checklist.md`
- `sed -n '1,260p' plans/ctabutton/cta-button-execution-log.md`
- `sed -n '1,240p' components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx`
- `sed -n '1,240p' components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx`
- `sed -n '1,240p' components/sections/page/equipment-closing-cta/CLAUDE.md`
- `sed -n '1,260p' components/sections/page/equipment-closing-cta/config.ts`
- `sed -n '1,260p' components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx`
- `sed -n '1,260p' features/cta/client.tsx`
- `sed -n '1,260p' features/cta/lead-entry.ts`
- `sed -n '1,260p' features/cta/contract.ts`
- `sed -n '1,220p' features/cta/__tests__/public-api.test.tsx`
- `sed -n '1,220p' components/sections/heroes/hero-lead-gen/CLAUDE.md`
- `sed -n '1,220p' components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`
- `sed -n '1,220p' components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx`
- `sed -n '1,260p' components/ui/ripple-cta-link/RippleCtaLink.tsx`
- `sed -n '1,220p' app/'(marketing)'/'(financing)'/rollback-financing/config.ts`
- `sed -n '470,560p' app/'(marketing)'/'(programs)'/deferred-payment-tow-truck-financing/config.ts`
- `git branch --show-current`
- `npm test -- components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx features/cta/__tests__/public-api.test.tsx lib/__tests__/press-feedback.test.tsx`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const section = Array.from(document.querySelectorAll('section')).find((el) => el.textContent?.includes('Get your rollback payment in 30 seconds.')); if (!section) return { error: 'closing section missing' }; section.scrollIntoView({ block: 'center' }); const link = Array.from(section.querySelectorAll('a')).find((el) => el.textContent?.includes('Get Pre-Approved')); return link ? { href: link.getAttribute('href'), version: link.getAttribute('data-pre-approval-version'), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id'), placement: link.getAttribute('data-pre-approval-origin-placement') } : { error: 'closing CTA missing' }; })()"`
- `agent-browser eval "(() => { const section = Array.from(document.querySelectorAll('section')).find((el) => el.textContent?.includes('Get your rollback payment in 30 seconds.')); const link = section ? Array.from(section.querySelectorAll('a')).find((el) => el.textContent?.includes('Get Pre-Approved')) : null; if (!link) return { clicked: false }; link.click(); return { clicked: true }; })()"`
- `agent-browser wait 500`
- `agent-browser eval "(() => ({ url: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))) }))()"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/deferred-payment-tow-truck-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const section = Array.from(document.querySelectorAll('section')).find((el) => el.textContent?.includes('LET THE TRUCK START EARNING.')); if (!section) return { error: 'closing section missing' }; section.scrollIntoView({ block: 'center' }); const link = Array.from(section.querySelectorAll('a')).find((el) => el.getAttribute('aria-label')?.includes('rollback')); return link ? { href: link.getAttribute('href'), version: link.getAttribute('data-pre-approval-version'), pageId: link.getAttribute('data-pre-approval-origin-page-id'), sectionId: link.getAttribute('data-pre-approval-origin-section-id'), ctaId: link.getAttribute('data-pre-approval-origin-cta-id'), placement: link.getAttribute('data-pre-approval-origin-placement'), truckType: link.getAttribute('data-pre-approval-handoff-truck-type') } : { error: 'rollback tile missing' }; })()"`
- `agent-browser eval "(() => { const section = Array.from(document.querySelectorAll('section')).find((el) => el.textContent?.includes('LET THE TRUCK START EARNING.')); const link = section ? Array.from(section.querySelectorAll('a')).find((el) => el.getAttribute('aria-label')?.includes('rollback')) : null; if (!link) return { clicked: false }; link.click(); return { clicked: true }; })()"`
- `agent-browser wait 500`
- `agent-browser eval "(() => ({ url: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))) }))()"`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n 'buildPreApprovalTriggerAttributes\\(' components app`
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' components/sections/page/equipment-closing-cta`

Automated verification results:

- `components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx`: 2 tests passed, confirming the migrated closing CTA caller class still emits canonical trigger attributes for both the financing-page primary CTA and the program-page truck tiles.
- `features/cta/__tests__/public-api.test.tsx`: 2 tests passed, confirming the canonical [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) and [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces continue rendering through the canonical CTA runtime after the caller cutover.
- `lib/__tests__/press-feedback.test.tsx`: 5 tests passed, re-proving commit-on-click press behavior, drift-cancel protection, duplicate-commit suppression, reduced-motion semantics, and haptics isolation for the shared runtime now used by the migrated closing CTA callers.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app` now returns 14 production wrapper consumers total: 12 barrel imports and 2 deep imports.
- `rg -n 'buildPreApprovalTriggerAttributes\\(' components app` now returns 4 direct trigger-builder surfaces outside the wrapper.
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' components/sections/page/equipment-closing-cta` returned no matches, confirming the migrated caller class now uses canonical CTA surfaces only and no longer constructs trigger attributes inline.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop `1440x900`
- Trigger path: closing section primary CTA `Get Pre-Approved`
- Observed behavior: the closing CTA rendered with `href="#get-pre-approved"` and canonical `rollback-financing / closing-cta-primary / closing-cta-primary / footer` trigger attributes; activating it kept the user on `/rollback-financing` and exposed both the drawer close control and the `Continue to Pre-Approval` action.

- Route: `/deferred-payment-tow-truck-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: closing section rollback tile CTA
- Observed behavior: the rollback tile rendered with `href="#get-pre-approved"`, canonical `deferred-payment-tow-truck-financing / closing-cta-tiles / closing-tile-rollback / footer` trigger attributes, and `data-pre-approval-handoff-truck-type="rollback"`; activating it kept the user on `/deferred-payment-tow-truck-financing` and exposed the `Continue to Pre-Approval` action on mobile, matching the existing flow shape without redesign.

Evidence summary:

- `CTA-INV-16`: code review plus the exact query `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' components/sections/page/equipment-closing-cta` show that [EquipmentClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx) and [EquipmentClosingCtaTrucks.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx) now use only canonical CTA surfaces.
- `CTA-INV-17`: the exact query `rg -n 'buildPreApprovalTriggerAttributes\\(' components app` dropped the direct trigger-builder inventory to 4 remaining production surfaces, and the migrated `equipment-closing-cta` caller class no longer constructs pre-approval attributes inline.
- `CTA-INV-01`: [public-api.test.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/__tests__/public-api.test.tsx) revalidated single-anchor internal CTA rendering through the canonical runtime, which is the runtime now used by the migrated caller class.
- `CTA-INV-04`: [preApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-closing-cta/__tests__/preApprovalCallers.test.tsx) plus desktop/mobile browser validation confirmed the migrated closing CTA callers still emit the canonical pre-approval trigger schema and truck-type handoff values.
- `CTA-INV-05`: [press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/__tests__/press-feedback.test.tsx) revalidated the shared commit-on-click press subsystem, and both live route checks successfully opened the drawer flow from the migrated closing CTA surfaces.
- Inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): the wrapper-import boundary is now 14 production consumers total, and the direct trigger-builder inventory is down to 4 production surfaces.
- Untouched callers remain working on their current paths: this batch did not touch homepage [ClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx), tertiary strips, sidebar/program blocks, card callers, or other lead-entry surfaces outside `equipment-closing-cta`.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Keep Phase 3 open. The remaining lead-entry caller called out for a later Phase 3 batch is homepage [ClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx); do not mix that work into this completed `equipment-closing-cta` batch.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 3
- Batch / scope: Migrate the final homepage lead-entry caller batch in [ClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx) to canonical CTA surfaces and close Phase 3
- Status: PASS

Changes made:

- Reconfirmed before editing that Phase 2 remained closed, Phase 3 was the only active phase, the prior Phase 3 caller batches stayed untouched, the worktree already contained protected migration edits, and no dev server was listening on the non-`3000` validation ports.
- Migrated the exact caller file [ClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx) off the deep `RippleCtaLink` import onto canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) / [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces, preserving the existing `lg` pill sizing, responsive short/full label split, and legacy analytics section identity.
- Kept the migration mechanically scoped to the homepage closing section only; no tertiary strips, sidebar/program blocks, cards, mini-ROI, or any other remaining wrapper callers were touched in this batch.
- Updated [homepagePreApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx) so the homepage closing CTA coverage now also asserts the canonical single-anchor DOM shape.
- Updated [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/CLAUDE.md), [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md), and this execution log in the same batch.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `git status --short`
- `git branch --show-current`
- `sed -n '1,240p' plans/ctabutton/cta-button-phase-gates.md`
- `sed -n '1,260p' plans/ctabutton/checklist.md`
- `ps -ef | rg 'next dev|npm run dev|npm start|agent-browser|chrome-146|playwright'`
- `sed -n '1,260p' plans/ctabutton/cta-button-execution-log.md`
- `git diff --stat`
- `git diff -- components/sections/page/closing-cta/ClosingCta.tsx app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx plans/ctabutton/checklist.md plans/ctabutton/cta-button-phase-gates.md plans/ctabutton/cta-button-execution-log.md`
- `sed -n '1,260p' components/sections/page/closing-cta/ClosingCta.tsx`
- `sed -n '1,260p' app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx`
- `sed -n '1,260p' plans/ctabutton/cta-button-migration-spec.md`
- `sed -n '1,260p' plans/ctabutton/cta-button-verification-matrix.md`
- `sed -n '1,260p' components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx`
- `sed -n '1,320p' components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx`
- `sed -n '1,260p' features/cta/client.tsx`
- `sed -n '1,260p' features/cta/lead-entry.ts`
- `sed -n '1,260p' components/sections/page/closing-cta/config.ts`
- `rg -n "ClosingCta" app components`
- `sed -n '1,220p' components/sections/page/closing-cta/CLAUDE.md`
- `rg -n "RippleCtaLink|buildPreApprovalTriggerAttributes|children override|children" components/sections/page/closing-cta components/ui/ripple-cta-link features/cta`
- `rg -n "<LeadCta|<CtaLink|shortLabel|sm:hidden|hidden sm:inline" components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx components/sections/heroes/hero-gallery/HeroGallery.tsx components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`
- `sed -n '1,260p' components/ui/ripple-cta-link/RippleCtaLink.tsx`
- `npm test -- app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx features/cta/__tests__/public-api.test.tsx lib/__tests__/press-feedback.test.tsx`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `lsof -nP -iTCP:3002 -sTCP:LISTEN`
- `lsof -nP -iTCP:3003 -sTCP:LISTEN`
- `lsof -nP -iTCP:3004 -sTCP:LISTEN`
- `lsof -nP -iTCP:3005 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const cta = document.querySelector('[data-pre-approval-origin-section-id=\"closing-cta-primary\"]'); if (!cta) return null; cta.scrollIntoView({ block: 'center' }); return { title: document.title, href: cta.getAttribute('href'), text: cta.textContent?.trim(), pageId: cta.getAttribute('data-pre-approval-origin-page-id'), sectionId: cta.getAttribute('data-pre-approval-origin-section-id'), ctaId: cta.getAttribute('data-pre-approval-origin-cta-id'), placement: cta.getAttribute('data-pre-approval-origin-placement') }; })()"`
- `agent-browser snapshot -i`
- `agent-browser click @e37`
- `agent-browser wait 500`
- `agent-browser eval "(() => ({ url: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), drawerTitle: Array.from(document.querySelectorAll('h2,h3')).find((el) => el.textContent?.includes('Ready to Add Revenue') || el.textContent?.includes('How much'))?.textContent ?? null }))()"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const cta = document.querySelector('[data-pre-approval-origin-section-id=\"closing-cta-primary\"]'); if (!cta) return null; cta.scrollIntoView({ block: 'center' }); return { href: cta.getAttribute('href'), text: cta.textContent?.trim(), pageId: cta.getAttribute('data-pre-approval-origin-page-id'), sectionId: cta.getAttribute('data-pre-approval-origin-section-id'), ctaId: cta.getAttribute('data-pre-approval-origin-cta-id'), placement: cta.getAttribute('data-pre-approval-origin-placement') }; })()"`
- `agent-browser snapshot -i`
- `agent-browser click @e28`
- `agent-browser wait 500`
- `agent-browser eval "(() => ({ url: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))), drawerTitle: Array.from(document.querySelectorAll('h2,h3')).find((el) => el.textContent?.includes('Ready to Add Revenue') || el.textContent?.includes('How much'))?.textContent ?? null }))()"`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link/RippleCtaLink' components app`
- `rg -n 'buildPreApprovalTriggerAttributes\\(' components app`
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' components/sections/page/closing-cta`

Automated verification results:

- `app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx`: 3 tests passed, including the updated homepage closing CTA assertion that the migrated caller still renders with canonical pre-approval attributes and no nested-anchor regression.
- `features/cta/__tests__/public-api.test.tsx`: 2 tests passed, revalidating single-anchor canonical CTA rendering through the same runtime now used by the migrated homepage caller.
- `lib/__tests__/press-feedback.test.tsx`: 5 tests passed, re-proving commit-on-click press behavior, drift-cancel protection, duplicate-commit suppression, reduced-motion semantics, and haptics isolation for the shared runtime used by the migrated caller.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app` now returns 13 production wrapper consumers total: 12 barrel imports and 1 deep import.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link/RippleCtaLink' components app` now returns only [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx), confirming the homepage closing CTA deep import is gone.
- `rg -n 'buildPreApprovalTriggerAttributes\\(' components app` still returns the same 4 direct trigger-builder surfaces outside the wrapper.
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' components/sections/page/closing-cta` returned no matches, confirming the migrated caller uses canonical CTA surfaces only and no longer constructs trigger attributes inline.

Browser verification results:

- Route: `/`
- Viewport: desktop `1440x900`
- Trigger path: homepage closing section primary CTA `Get Pre-Approved — It Takes 30 Seconds`
- Observed behavior: the closing CTA rendered with `href="#get-pre-approved"` and canonical `home / closing-cta-primary / closing-cta-primary / footer` trigger attributes; activating it kept the user on `http://127.0.0.1:3001/`, opened the drawer on the homepage, and exposed both the drawer close control and the `Continue to Pre-Approval` action.

- Route: `/`
- Viewport: mobile `iPhone 14`
- Trigger path: homepage closing section primary CTA after mobile scroll into the final CTA block
- Observed behavior: the same CTA rendered with canonical `home / closing-cta-primary / closing-cta-primary / footer` trigger attributes on the mobile route; activating it kept the user on `http://127.0.0.1:3001/`, exposed the `Ready to Add Revenue to Your Fleet?` drawer heading and the `Continue to Pre-Approval` action, and preserved the existing mobile flow shape without redesign.

Evidence summary:

- `CTA-INV-16`: code review plus the exact query `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' components/sections/page/closing-cta` show that [ClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx) now uses only canonical CTA surfaces.
- `CTA-INV-17`: the exact query `rg -n 'buildPreApprovalTriggerAttributes\\(' components app` stayed at 4 remaining direct trigger-builder surfaces, and the homepage closing section no longer constructs pre-approval attributes inline.
- `CTA-INV-01`: [homepagePreApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx) plus [public-api.test.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/__tests__/public-api.test.tsx) confirm the migrated homepage caller renders as a single internal anchor without the nested-anchor regression.
- `CTA-INV-04`: the homepage closing CTA test and both live route checks confirmed that the migrated caller still emits the canonical pre-approval trigger schema for the homepage footer origin.
- `CTA-INV-05`: [press-feedback.test.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/__tests__/press-feedback.test.tsx) revalidated the shared commit-on-click press subsystem, and the desktop/mobile homepage interactions both opened the drawer flow from the migrated closing CTA surface.
- Inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): the wrapper boundary is now 13 production consumers total, the only remaining deep import is [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx), and homepage [ClosingCta.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/closing-cta/ClosingCta.tsx) is no longer part of the wrapper-only children-override inventory.
- This batch closes the final remaining Phase 3 homepage lead-entry caller without touching later-phase callers or deleting any wrapper surface by assumption.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Phase 3 is closed. Keep later phases unopened in this turn; if migration work resumes, start a separate Phase 4 batch from the updated inventory with no phase marked active until that work begins.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 4
- Batch / scope: Migrate the shared program-page section CTA callers in [SidebarCta.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/SidebarCta.tsx), [InlineCtaBlock.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/blocks/InlineCtaBlock.tsx), [PromoPanelBlock.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/blocks/PromoPanelBlock.tsx), and [RelatedProgramsBlock.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/blocks/RelatedProgramsBlock.tsx)
- Status: PASS

Changes made:

- Confirmed before editing that Phase 3 was already closed in the execution log, then marked Phase 4 as the only active phase in [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md) without opening any later phase.
- Migrated [SidebarCta.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/SidebarCta.tsx), [InlineCtaBlock.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/blocks/InlineCtaBlock.tsx), and [PromoPanelBlock.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/blocks/PromoPanelBlock.tsx) from the compatibility wrapper to canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) / [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces while preserving authored styling, legacy section analytics identity, and the existing pre-approval triggers.
- Migrated [RelatedProgramsBlock.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/blocks/RelatedProgramsBlock.tsx) from the compatibility wrapper to canonical [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx), preserving the outline card CTA styling and normal internal-navigation behavior.
- Expanded [preApprovalConfigRenderers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx) so the shared renderer proof now covers the migrated normal-link path and reasserts single-anchor DOM shape on the migrated pre-approval callers.
- Updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md), and this execution log in the same batch. [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx) was not touched in this batch.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-04`
- `CTA-INV-12`
- `CTA-INV-13`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `npm test -- app/'(marketing)'/'(programs)'/_components/__tests__/preApprovalConfigRenderers.test.tsx`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `lsof -nP -iTCP:3002 -sTCP:LISTEN`
- `lsof -nP -iTCP:3003 -sTCP:LISTEN`
- `lsof -nP -iTCP:3004 -sTCP:LISTEN`
- `lsof -nP -iTCP:3005 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/fleet-financing`
- `agent-browser wait --load networkidle`
- `agent-browser snapshot -i`
- `agent-browser eval "(() => Array.from(document.querySelectorAll('a')).filter((el) => el.textContent?.trim() === 'Get Pre-Approved' && el.getBoundingClientRect().height > 0).map((el) => ({ href: el.getAttribute('href'), section: el.getAttribute('data-pre-approval-origin-section-id'), cta: el.getAttribute('data-pre-approval-origin-cta-id') })))()"`
- `agent-browser eval "(() => Array.from(document.querySelectorAll('a')).filter((el) => el.textContent?.trim() === 'See details' && el.getBoundingClientRect().height > 0).map((el) => ({ href: el.getAttribute('href'), hasPreApproval: el.hasAttribute('data-pre-approval-version') })))()"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/fleet-financing`
- `agent-browser wait --load networkidle`
- `agent-browser snapshot -i`
- `agent-browser eval "(() => ({ preApproval: Array.from(document.querySelectorAll('a')).filter((el) => el.textContent?.trim() === 'Get Pre-Approved' && el.getBoundingClientRect().height > 0).map((el) => ({ href: el.getAttribute('href'), section: el.getAttribute('data-pre-approval-origin-section-id') })), related: Array.from(document.querySelectorAll('a')).filter((el) => el.textContent?.trim() === 'See details' && el.getBoundingClientRect().height > 0).map((el) => ({ href: el.getAttribute('href'), hasPreApproval: el.hasAttribute('data-pre-approval-version') })) }))()"`
- `npm run lint`
- `npm run build`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app`
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' app/'(marketing)'/'(programs)'/_components`

Automated verification results:

- `app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx`: 6 tests passed, including the new `RelatedProgramsBlock` proof and the single-anchor DOM assertions on the migrated shared renderer callers.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app` now returns 9 production wrapper consumers total: 8 barrel imports and 1 deep import.
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app` still returns only [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx), so the deep-import boundary is unchanged and still explicitly tracked.
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' app/'(marketing)'/'(programs)'/_components` now returns only [ProgramNavCardLink.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/ProgramNavCardLink.tsx), confirming the migrated shared renderer files no longer depend on the wrapper or manual trigger-attribute construction.

Browser verification results:

- Route: `/fleet-financing`
- Viewport: desktop `1440x900`
- Trigger path: shared program-page section CTA assertions for the inline/sidebar pre-approval links and related-program card links
- Observed behavior: the route rendered the migrated shared CTA callers, the visible `Get Pre-Approved` links exposed canonical `hero-primary`, `growth-inline-cta`, `opportunity-inline-cta`, and `sidebar-cta` origin attributes with `href="#get-pre-approved"`, and the visible `See details` card links exposed normal internal hrefs with no `data-pre-approval-version` attribute.

- Route: `/fleet-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: shared program-page section CTA assertions for the inline pre-approval links and related-program card links
- Observed behavior: the mobile route rendered the migrated shared CTA callers, the visible `Get Pre-Approved` links exposed canonical `hero-primary`, `growth-inline-cta`, and `opportunity-inline-cta` origin attributes with `href="#get-pre-approved"`, and the visible `See details` card links still rendered as normal internal links with no pre-approval data attributes.

Evidence summary:

- `CTA-INV-16`: code review plus the exact query `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' app/'(marketing)'/'(programs)'/_components` show that the migrated shared renderer files now use only canonical CTA surfaces; the only remaining direct trigger-builder in that directory is the already-tracked [ProgramNavCardLink.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/ProgramNavCardLink.tsx).
- `CTA-INV-17`: the migrated shared renderer files no longer manually construct pre-approval trigger attributes, and the authoritative remaining direct trigger-surface inventory is unchanged from the live checklist.
- `CTA-INV-01`: [preApprovalConfigRenderers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(programs)/_components/__tests__/preApprovalConfigRenderers.test.tsx) now asserts single-anchor DOM shape on the migrated pre-approval callers and the canonical normal-link path for related-program cards.
- `CTA-INV-04`: the shared renderer test plus desktop/mobile route assertions confirm the migrated pre-approval callers still emit canonical trigger attributes from the authored config instead of reconstructing them inline.
- `CTA-INV-12` and `CTA-INV-13`: `npm run build` passed, and the post-batch searches recorded the remaining wrapper and deep-import boundaries without deleting the compatibility layer.
- Inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): the wrapper boundary is now 9 production consumers total, and [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx) remains the only deep import.
- This batch did not touch [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx), so the shared-runtime ownership decision remains unchanged and no adjacent-surface re-verification was required in this batch.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Keep Phase 4 active and migrate one remaining caller class at a time. The next safe batch is the homepage shared section/card callers or the financing tertiary-strip/hero tertiary callers, but do not mix both scopes into the same implementation batch.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 4
- Batch / scope: Migrate the remaining homepage non-card section callers in [HowItWorks.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/how-it-works/HowItWorks.tsx) and the mobile tertiary CTA list in [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx)
- Status: PASS

Changes made:

- Migrated [HowItWorks.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/how-it-works/HowItWorks.tsx) from the compatibility wrapper to canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) / [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces, preserving the existing arrow-icon CTA presentation and legacy section analytics identity.
- Migrated the remaining mobile tertiary CTA links in [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx) off the compatibility wrapper onto canonical CTA surfaces while preserving the existing custom child content, `prefetch={false}`, and canonical pre-approval trigger attributes from config.
- Updated [homepagePreApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx) so the `HowItWorks` proof also asserts the single-anchor DOM shape, and updated the local [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/how-it-works/CLAUDE.md) and [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/CLAUDE.md) notes to reflect canonical CTA ownership.
- Updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md) and this execution log in the same batch. [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx) was not touched in this batch.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-04`
- `CTA-INV-12`
- `CTA-INV-13`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `npm test -- app/'(marketing)'/__tests__/homepagePreApprovalCallers.test.tsx`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const cta = document.querySelector('[data-pre-approval-origin-section-id=\"how-it-works-primary\"]'); if (!(cta instanceof HTMLAnchorElement)) return null; cta.scrollIntoView({ block: 'center' }); return { href: cta.getAttribute('href'), pageId: cta.getAttribute('data-pre-approval-origin-page-id'), sectionId: cta.getAttribute('data-pre-approval-origin-section-id'), ctaId: cta.getAttribute('data-pre-approval-origin-cta-id'), placement: cta.getAttribute('data-pre-approval-origin-placement'), text: cta.textContent?.trim() }; })()"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => Array.from(document.querySelectorAll('a')).filter((el) => el.getAttribute('data-pre-approval-origin-section-id') === 'hero-tertiary-links' && el.getBoundingClientRect().height > 0).map((el) => ({ href: el.getAttribute('href'), pageId: el.getAttribute('data-pre-approval-origin-page-id'), sectionId: el.getAttribute('data-pre-approval-origin-section-id'), ctaId: el.getAttribute('data-pre-approval-origin-cta-id'), placement: el.getAttribute('data-pre-approval-origin-placement'), title: el.getAttribute('data-pre-approval-drawer-title'), text: el.textContent?.trim() })))()"`
- `npm run build`
- `npm run lint`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app`
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/page/how-it-works components/sections/heroes/hero-gallery`

Automated verification results:

- `app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx`: 3 tests passed, including the updated single-anchor DOM proof for the migrated `HowItWorks` caller and the existing canonical trigger-attribute proofs for both homepage surfaces.
- `npm run build` passed.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app` now returns 7 production wrapper consumers total: 6 barrel imports and 1 deep import.
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app` still returns only [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx).
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/page/how-it-works components/sections/heroes/hero-gallery` returned no matches, confirming the migrated homepage section callers now use canonical CTA surfaces only and no longer construct trigger attributes inline.

Browser verification results:

- Route: `/`
- Viewport: desktop `1440x900`
- Trigger path: homepage `HowItWorks` primary CTA assertion
- Observed behavior: the migrated CTA rendered with `href="#get-pre-approved"` and canonical `home / how-it-works-primary / how-it-works-primary / section` trigger attributes, preserving the existing `See Your Payment` presentation on the live homepage route.

- Route: `/`
- Viewport: mobile `iPhone 14`
- Trigger path: homepage hero mobile tertiary CTA list assertion
- Observed behavior: the two migrated hero tertiary CTA links rendered with canonical `home / hero-tertiary-links / hero-tertiary-found-truck` and `home / hero-tertiary-links / hero-tertiary-buying-power` trigger attributes, preserved their authored drawer titles, and remained visible as the mobile-only tertiary list under the primary hero CTA.

Evidence summary:

- `CTA-INV-16`: code review plus the exact query `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/page/how-it-works components/sections/heroes/hero-gallery` show that both migrated homepage section callers now use only canonical CTA surfaces.
- `CTA-INV-17`: neither migrated homepage section caller constructs pre-approval trigger attributes inline; both continue to consume the authored config through canonical CTA composition.
- `CTA-INV-01`: [homepagePreApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepagePreApprovalCallers.test.tsx) now asserts the single-anchor DOM shape for the migrated `HowItWorks` CTA, and the `HeroGallery` assertions continue to prove the mobile tertiary links render through canonical link markup on the homepage route.
- `CTA-INV-04`: the homepage test plus desktop/mobile route assertions confirm that the migrated `HowItWorks` and `HeroGallery` callers still emit the canonical pre-approval trigger schema from config.
- `CTA-INV-12` and `CTA-INV-13`: `npm run build` passed, and the wrapper/deep-import inventory searches were refreshed without deleting the compatibility layer.
- Inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): the wrapper boundary is now 7 production consumers total, and the wrapper-only children-override inventory no longer includes homepage [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroGallery.tsx).
- This batch did not touch [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx), so the shared-runtime ownership decision remains unchanged and adjacent non-wrapper press-feedback consumers did not require re-verification here.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Keep Phase 4 active and move to one remaining caller class only. The next isolated scopes are either the financing tertiary-strip/hero tertiary callers or the homepage card/deep-import callers.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 4
- Batch / scope: Migrate the financing-page tertiary-strip caller class in [TertiaryActionsStrip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx)
- Status: PASS

Changes made:

- Migrated [TertiaryActionsStrip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx) from the compatibility wrapper to canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) / [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces, preserving the inverse-outline card styling, legacy section analytics identity, and the existing compatibility-only child-content layout.
- Updated [preApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx) so both representative tertiary-strip proofs now also assert the single-anchor DOM shape after the caller cutover.
- Updated local [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/CLAUDE.md), [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), and this execution log in the same batch. [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx) was not touched.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-04`
- `CTA-INV-12`
- `CTA-INV-13`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `npm test -- components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => Array.from(document.querySelectorAll('a')).filter((el) => el.getAttribute('data-pre-approval-origin-section-id') === 'tertiary-strip-primary' && el.getBoundingClientRect().height > 0).map((el) => ({ href: el.getAttribute('href'), pageId: el.getAttribute('data-pre-approval-origin-page-id'), sectionId: el.getAttribute('data-pre-approval-origin-section-id'), ctaId: el.getAttribute('data-pre-approval-origin-cta-id'), placement: el.getAttribute('data-pre-approval-origin-placement'), title: el.getAttribute('data-pre-approval-drawer-title'), text: el.textContent?.trim() })))()"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/rotator-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => Array.from(document.querySelectorAll('a')).filter((el) => el.getAttribute('data-pre-approval-origin-section-id') === 'purchase-terms-tertiary-strip' && el.getBoundingClientRect().height > 0).map((el) => ({ href: el.getAttribute('href'), pageId: el.getAttribute('data-pre-approval-origin-page-id'), sectionId: el.getAttribute('data-pre-approval-origin-section-id'), ctaId: el.getAttribute('data-pre-approval-origin-cta-id'), placement: el.getAttribute('data-pre-approval-origin-placement'), title: el.getAttribute('data-pre-approval-drawer-title'), text: el.textContent?.trim() })))()"`
- `npm run lint`
- `npm run build`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/page/tertiary-strip`

Automated verification results:

- `components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx`: 2 tests passed, confirming the migrated tertiary-strip caller class still emits canonical trigger attributes for both the rollback and rotator financing surfaces and now renders without nested-anchor regressions.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app` now returns 6 production wrapper consumers total: 5 barrel imports and 1 deep import.
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/page/tertiary-strip` returned no matches, confirming the migrated tertiary-strip caller now uses canonical CTA surfaces only and no longer constructs trigger attributes inline.

Browser verification results:

- Route: `/rollback-financing`
- Viewport: desktop `1440x900`
- Trigger path: financing tertiary-strip primary CTA assertion
- Observed behavior: the migrated tertiary-strip CTA rendered with `href="#get-pre-approved"` and canonical `rollback-financing / tertiary-strip-primary / found-truck-cta / section` trigger attributes, preserving the authored drawer title and the two-line tertiary card text content.

- Route: `/rotator-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: purchase-and-terms tertiary-strip CTA assertions
- Observed behavior: both migrated tertiary-strip CTAs rendered with canonical `rotator-financing / purchase-terms-tertiary-strip / operator-to-operator-cta` and `rotator-financing / purchase-terms-tertiary-strip / truck-year-qualifier-cta` trigger attributes, preserved the shared drawer title, and remained visible as the mobile tertiary strip cards.

Evidence summary:

- `CTA-INV-16`: code review plus the exact query `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/page/tertiary-strip` show that the tertiary-strip caller class now uses canonical CTA surfaces only.
- `CTA-INV-17`: the tertiary-strip caller no longer constructs pre-approval trigger attributes inline; it now consumes the authored config through canonical CTA composition.
- `CTA-INV-01`: [preApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx) now asserts the single-anchor DOM shape for both representative financing tertiary-strip routes.
- `CTA-INV-04`: the targeted test plus desktop/mobile route assertions confirm that the migrated tertiary-strip caller still emits the canonical pre-approval trigger schema.
- `CTA-INV-12` and `CTA-INV-13`: `npm run build` passed, and the wrapper inventory search was refreshed without deleting the compatibility layer.
- Inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): the wrapper boundary is now 6 production consumers total, and the compatibility-only child-content inventory still explicitly tracks [TertiaryActionsStrip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx) for Phase 5 cleanup.
- This batch did not touch [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx), so the shared-runtime ownership decision remains unchanged and adjacent non-wrapper consumers did not require re-verification.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Keep Phase 4 active and migrate one remaining caller class only. The remaining isolated scopes are the financing hero callers (`TileSelector` and `HeroConvertFramedOutline`) and the homepage card/deep-import callers.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 4
- Batch / scope: Migrate the unrouted financing hero tertiary callers in [TileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/TileSelector.tsx) and [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx)
- Status: PASS

Changes made:

- Migrated [TileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/TileSelector.tsx) from the compatibility wrapper to canonical [LeadCta](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) / [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) surfaces, preserving the disabled pre-selection path, legacy `rollback-hero` analytics identity, and canonical selection-driven pre-approval trigger wiring.
- Migrated the outline-card tertiary actions in [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx) from the compatibility wrapper to canonical CTA surfaces while preserving the existing custom child-content layout, secondary-outline appearance, and `hero` analytics identity.
- Updated [TileSelector.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx) and [HeroConvertTertiaryLinks.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx) so both hero proofs now also assert the single-anchor DOM shape after the caller cutover.
- Updated local [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/CLAUDE.md), [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/CLAUDE.md), [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), and this execution log in the same batch. [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx) was not touched.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-04`
- `CTA-INV-12`
- `CTA-INV-13`
- `CTA-INV-16`
- `CTA-INV-17`

Commands run:

- `npm test -- components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx`
- `npm run lint`
- `npm run build`
- `rg -n 'kind: "framed-outline"' app/'(marketing)'/'(financing)'`
- `rg -n 'HeroConvertFramedOutline|HeroConvert|TileSelector' app/'(marketing)'`
- `rg -n 'TileSelector' app/'(marketing)'`
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/heroes/hero-convert-geico components/sections/heroes/hero-convert-framed`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`

Automated verification results:

- `components/sections/heroes/hero-convert-geico/__tests__/TileSelector.test.tsx` and `components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx`: 3 tests passed, confirming both migrated hero callers still emit canonical trigger attributes where applicable and now render without nested-anchor regressions.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n 'kind: "framed-outline"' app/'(marketing)'/'(financing)'` returned only [page-config-types.ts](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/page-config-types.ts), so there is no live financing page config currently routing the outline hero variant.
- `rg -n 'HeroConvertFramedOutline|HeroConvert|TileSelector' app/'(marketing)'` returned only shell and type references for `HeroConvertFramedOutline` under [EquipmentFinancingPageShell.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx) and [page-config-types.ts](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/page-config-types.ts); it did not show a live `TileSelector` route.
- `rg -n 'TileSelector' app/'(marketing)'` returned no matches, confirming the geico hero selector is not routed through `app/(marketing)` today.
- `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/heroes/hero-convert-geico components/sections/heroes/hero-convert-framed` now returns only [HeroConvert.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/HeroConvert.tsx) and [HeroConvertFramed.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx), confirming the migrated hero callers no longer depend on the wrapper or inline trigger-attribute construction.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app` now returns 4 production wrapper consumers total: 3 barrel imports and 1 deep import.

Browser verification results:

- Route: not applicable
- Viewport: not applicable
- Trigger path: no live `app/(marketing)` route currently renders `TileSelector.tsx` or a `kind: "framed-outline"` hero config
- Observed behavior: browser validation was intentionally skipped because the route-audit commands above show these callers are presently unrouted; no live page existed on the running dev server to exercise this batch without fabricating a non-production harness route

Evidence summary:

- `CTA-INV-16`: code review plus the exact query `rg -n 'RippleCtaLink|buildPreApprovalTriggerAttributes\\(' --glob '!**/*.md' components/sections/heroes/hero-convert-geico components/sections/heroes/hero-convert-framed` show that [TileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/TileSelector.tsx) and [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx) now use canonical CTA surfaces only.
- `CTA-INV-17`: the migrated hero callers no longer construct pre-approval trigger attributes inline; the only remaining direct trigger-builder surfaces in those directories are the already-tracked routed hero shells [HeroConvert.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-geico/HeroConvert.tsx) and [HeroConvertFramed.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx).
- `CTA-INV-01`: the updated hero tests now assert single-anchor DOM shape for both migrated callers.
- `CTA-INV-04`: the targeted tests confirm the migrated hero callers still emit canonical pre-approval trigger attributes when configured for the lead-entry path.
- `CTA-INV-12` and `CTA-INV-13`: `npm run build` passed, the route audit showed the callers are currently unrouted, and the wrapper inventory was refreshed without deleting the compatibility layer.
- Inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): the wrapper boundary is now 4 production consumers total, [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx) remains the only deep import, and [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx) remains explicitly tracked only for its compatibility-style children override.
- This batch did not touch [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx), so the shared-runtime ownership decision remains unchanged and adjacent non-wrapper consumers did not require re-verification here.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Keep Phase 4 active and move to one remaining caller class only: the homepage card/deep-import callers in [ProgramCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/ProgramCards.tsx), [EquipmentCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-cards/EquipmentCards.tsx), [ResourceHub.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/resource-hub/ResourceHub.tsx), and [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx).

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 4
- Batch / scope: Migrate the remaining homepage card and deep-import callers in [ProgramCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/ProgramCards.tsx), [EquipmentCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-cards/EquipmentCards.tsx), [ResourceHub.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/resource-hub/ResourceHub.tsx), and [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx)
- Status: PASS

Changes made:

- Migrated [ProgramCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/ProgramCards.tsx), [EquipmentCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-cards/EquipmentCards.tsx), and [ResourceHub.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/resource-hub/ResourceHub.tsx) from the compatibility wrapper to canonical [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx), preserving each section's historical analytics identity and carrying forward the legacy per-card analytics IDs through `analytics.legacyCardId`.
- Migrated [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx) off the last remaining deep import onto canonical [CtaLink](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx), preserving the existing calculator href construction and `mini-roi` analytics identity.
- Added [homepageCardCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepageCardCallers.test.tsx) for the homepage card sections and expanded [MiniROI.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/__tests__/MiniROI.test.tsx) so the migrated callers now assert single-anchor DOM shape, normal internal hrefs, and absence of pre-approval trigger attributes.
- Updated local [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/CLAUDE.md), [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-cards/CLAUDE.md), [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/resource-hub/CLAUDE.md), [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/CLAUDE.md), [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md), and this execution log in the same batch. [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx) was not touched.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-12`
- `CTA-INV-13`
- `CTA-INV-16`

Commands run:

- `npm test -- app/'(marketing)'/__tests__/homepageCardCallers.test.tsx components/sections/page/mini-roi/__tests__/MiniROI.test.tsx`
- `npm run lint`
- `npm run build`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app`
- `rg -n 'RippleCtaLink|legacyCardId' --glob '!**/*.md' components/sections/page/program-cards components/sections/page/equipment-cards components/sections/page/resource-hub components/sections/page/mini-roi`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const byText = (text) => Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === text); const summarize = (text) => { const el = byText(text); if (!(el instanceof HTMLAnchorElement)) return null; return { text, href: el.getAttribute('href'), hasPreApproval: el.hasAttribute('data-pre-approval-version') }; }; return { rollback: summarize('See Rollback Financing'), zeroDown: summarize('See Zero Down'), guide: summarize('Read the Guide'), miniRoi: summarize('Build Your Full Profit Plan') }; })()"`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === 'See Rollback Financing'); if (!(link instanceof HTMLAnchorElement)) return 'missing'; link.click(); return 'clicked'; })()"`
- `agent-browser get url`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === 'Build Your Full Profit Plan'); if (!(link instanceof HTMLAnchorElement)) return null; link.scrollIntoView({ block: 'center' }); return { href: link.getAttribute('href'), hasPreApproval: link.hasAttribute('data-pre-approval-version'), text: link.textContent?.trim() }; })()"`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === 'See Zero Down'); if (!(link instanceof HTMLAnchorElement)) return null; link.scrollIntoView({ block: 'center' }); return { href: link.getAttribute('href'), hasPreApproval: link.hasAttribute('data-pre-approval-version') }; })()"`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === 'See Zero Down'); if (!(link instanceof HTMLAnchorElement)) return 'missing'; link.click(); return 'clicked'; })()"`
- `agent-browser get url`

Automated verification results:

- `app/(marketing)/__tests__/homepageCardCallers.test.tsx` and `components/sections/page/mini-roi/__tests__/MiniROI.test.tsx`: 4 tests passed, confirming the migrated homepage card/deep-import callers render without nested-anchor regressions, preserve the expected internal hrefs, and do not emit pre-approval trigger attributes.
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app` returned no matches, confirming there are no remaining production wrapper-barrel imports.
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app` returned no matches, confirming the last deep import has been removed.
- `rg -n 'RippleCtaLink|legacyCardId' --glob '!**/*.md' components/sections/page/program-cards components/sections/page/equipment-cards components/sections/page/resource-hub components/sections/page/mini-roi` returned only the three canonical `legacyCardId` compatibility mappings in [ProgramCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/ProgramCards.tsx), [EquipmentCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-cards/EquipmentCards.tsx), and [ResourceHub.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/resource-hub/ResourceHub.tsx); there are no remaining wrapper references in this caller class.

Browser verification results:

- Route: `/`
- Viewport: desktop `1440x900`
- Trigger path: homepage card CTA assertions plus click-through on `See Rollback Financing`
- Observed behavior: the homepage rendered the migrated `ProgramCards`, `EquipmentCards`, `ResourceHub`, and `MiniROI` links with normal internal hrefs and no `data-pre-approval-version` attribute, and clicking `See Rollback Financing` navigated to `http://127.0.0.1:3001/rollback-financing`.

- Route: `/`
- Viewport: mobile `iPhone 14`
- Trigger path: `MiniROI` CTA href assertion plus click-through on `See Zero Down`
- Observed behavior: the mobile homepage rendered `Build Your Full Profit Plan` with href `/tow-truck-calculator?rev=200&pmt=1200&known=1` and no pre-approval attributes, and clicking `See Zero Down` navigated to `http://127.0.0.1:3001/zero-down-tow-truck-financing`.

Evidence summary:

- `CTA-INV-16`: code review plus the exact query `rg -n 'RippleCtaLink|legacyCardId' --glob '!**/*.md' components/sections/page/program-cards components/sections/page/equipment-cards components/sections/page/resource-hub components/sections/page/mini-roi` show that this caller class now uses canonical CTA surfaces only while intentionally preserving the tracked legacy card analytics compatibility.
- `CTA-INV-01`: [homepageCardCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepageCardCallers.test.tsx) and [MiniROI.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/__tests__/MiniROI.test.tsx) now assert single-anchor DOM shape for all four migrated homepage callers.
- `CTA-INV-12` and `CTA-INV-13`: `npm run build` passed, the wrapper inventory searches returned no production imports, and the final Phase 4 caller class compiles against canonical CTA modules without deleting the wrapper.
- Inventory regeneration updated [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md): there are now 0 production wrapper consumers, no production deep imports remain, the compatibility-only children overrides are still explicitly tracked in [TertiaryActionsStrip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx) and [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx), and the three historical `cardId` sites are now tracked as canonical analytics-compatibility callers instead of wrapper consumers.
- This batch did not touch [lib/press-feedback.tsx](/Users/benfranzoso/Documents/Projects/copy/lib/press-feedback.tsx), and the phase exit checks still found no broken adjacent non-wrapper press-feedback consumers.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Safe stop in Phase 4 only. Do not advance to Phase 5 yet; any next turn must start from the updated checklist/log state and explicitly review the remaining compatibility-only children overrides and wrapper-retirement evidence before opening later-phase work.

### Entry

- Date: 2026-04-06
- Agent: Codex
- Branch: `cta-button-migration`
- Phase: Phase 5
- Batch / scope: Remove remaining wrapper-only production semantics, close the checklist boundary, and record final closure evidence
- Status: PASS

Changes made:

- Added canonical `copy.eyebrow` support in [contract.ts](/Users/benfranzoso/Documents/Projects/copy/features/cta/contract.ts) and [client.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/client.tsx) so stacked CTA copy no longer requires arbitrary compatibility-style children overrides for the remaining production callers.
- Removed the checklist-tracked production `children` overrides from [TertiaryActionsStrip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx) and [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx) by moving those callers to explicit `copy.eyebrow` / `copy.label` usage.
- Removed the remaining production `legacyCardId` compatibility mappings from [ProgramCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/ProgramCards.tsx), [EquipmentCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-cards/EquipmentCards.tsx), and [ResourceHub.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/resource-hub/ResourceHub.tsx).
- Updated [public-api.test.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/__tests__/public-api.test.tsx), [checklist.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/checklist.md), [cta-button-phase-gates.md](/Users/benfranzoso/Documents/Projects/copy/plans/ctabutton/cta-button-phase-gates.md), this execution log, and the affected local `CLAUDE.md` files in the same batch.

Verification matrix IDs covered:

- `CTA-INV-01`
- `CTA-INV-04`
- `CTA-INV-05`
- `CTA-INV-16`
- `CTA-INV-20`
- `CTA-INV-21`
- `CTA-INV-22`
- `CTA-INV-27`

Commands run:

- `git status --short --branch`
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app`
- `rg -n 'legacyCardId' components app --glob '!**/*.md'`
- `rg -n '</(CtaLink|LeadCta)>' components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx`
- `rg -n '</(CtaLink|LeadCta)>' components/sections/heroes/hero-gallery/HeroGallery.tsx components/sections/page/closing-cta/ClosingCta.tsx components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx`
- `rg -n 'onAnalyticsEvent=' components app features --glob '!**/*.md'`
- `rg -n 'kind:\\s*"framed-outline"' 'app/(marketing)/(financing)'`
- `npm test -- features/cta/__tests__/public-api.test.tsx components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx app/'(marketing)'/__tests__/homepageCardCallers.test.tsx components/sections/page/mini-roi/__tests__/MiniROI.test.tsx`
- `npm run lint`
- `npm run build`
- `lsof -nP -iTCP:3001 -sTCP:LISTEN`
- `lsof -nP -iTCP:3002 -sTCP:LISTEN`
- `lsof -nP -iTCP:3003 -sTCP:LISTEN`
- `lsof -nP -iTCP:3004 -sTCP:LISTEN`
- `lsof -nP -iTCP:3005 -sTCP:LISTEN`
- `PORT=3001 npm run dev`
- `agent-browser set viewport 1440 900`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const find = (text) => Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === text); const read = (text) => { const el = find(text); if (!(el instanceof HTMLAnchorElement)) return null; return { text, href: el.getAttribute('href'), preApproval: el.hasAttribute('data-pre-approval-version') }; }; return { rollback: read('See Rollback Financing'), zeroDown: read('See Zero Down'), guide: read('Read the Guide'), miniRoi: read('Build Your Full Profit Plan') }; })()"`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === 'See Rollback Financing'); if (!(link instanceof HTMLAnchorElement)) return 'missing'; link.click(); return 'clicked'; })()"`
- `agent-browser get url`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.includes('I found a truck and need financing')); if (!(link instanceof HTMLAnchorElement)) return null; link.scrollIntoView({ block: 'center' }); return { text: link.textContent?.replace(/\\s+/g, ' ').trim(), href: link.getAttribute('href'), version: link.getAttribute('data-pre-approval-version'), pageId: link.getAttribute('data-pre-approval-origin-page-id') }; })()"`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.includes('I found a truck and need financing')); if (!(link instanceof HTMLAnchorElement)) return 'missing'; link.click(); return 'clicked'; })()"`
- `agent-browser wait 400`
- `agent-browser eval "(() => ({ url: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))) }))()"`
- `agent-browser set device 'iPhone 14'`
- `agent-browser open http://127.0.0.1:3001/`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === 'Build Your Full Profit Plan'); if (!(link instanceof HTMLAnchorElement)) return null; link.scrollIntoView({ block: 'center' }); return { href: link.getAttribute('href'), preApproval: link.hasAttribute('data-pre-approval-version'), text: link.textContent?.trim() }; })()"`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.trim() === 'Build Your Full Profit Plan'); if (!(link instanceof HTMLAnchorElement)) return 'missing'; link.click(); return 'clicked'; })()"`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const values = Array.from(document.querySelectorAll('input')).map((el) => ({ aria: el.getAttribute('aria-label'), value: el.value })); return { url: window.location.href, values }; })()"`
- `agent-browser open http://127.0.0.1:3001/rollback-financing`
- `agent-browser wait --load networkidle`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.includes('I found a truck and need financing')); if (!(link instanceof HTMLAnchorElement)) return null; link.scrollIntoView({ block: 'center' }); return { text: link.textContent?.replace(/\\s+/g, ' ').trim(), href: link.getAttribute('href'), version: link.getAttribute('data-pre-approval-version') }; })()"`
- `agent-browser eval "(() => { const link = Array.from(document.querySelectorAll('a')).find((el) => el.textContent?.includes('I found a truck and need financing')); if (!(link instanceof HTMLAnchorElement)) return 'missing'; link.click(); return 'clicked'; })()"`
- `agent-browser wait 400`
- `agent-browser eval "(() => ({ url: window.location.href, closeVisible: Boolean(document.querySelector('[aria-label=\"Close\"]')), continueVisible: Boolean(Array.from(document.querySelectorAll('button')).find((el) => el.textContent?.includes('Continue to Pre-Approval'))) }))()"`

Automated verification results:

- `npm test -- ...` passed: [public-api.test.tsx](/Users/benfranzoso/Documents/Projects/copy/features/cta/__tests__/public-api.test.tsx) (2), [preApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx) (2), [HeroConvertTertiaryLinks.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx) (2), [homepageCardCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/__tests__/homepageCardCallers.test.tsx) (3), and [MiniROI.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/__tests__/MiniROI.test.tsx) (1).
- `npm run lint` passed with the same 23 pre-existing warnings in `features/pre-approval/__tests__/AmountSlider.test.tsx` and `features/pre-approval/__tests__/PreApprovalDrawerView.test.tsx`; no lint errors occurred.
- `npm run build` passed and generated the full static route set successfully.
- `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app` returned no matches.
- `rg -n --glob '!**/*.md' '@/components/ui/ripple-cta-link/RippleCtaLink' components app` returned no matches.
- `rg -n 'legacyCardId' components app --glob '!**/*.md'` returned only [RippleCtaLink.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx), confirming there are no production `legacyCardId` callers left.
- `rg -n '</(CtaLink|LeadCta)>' components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx` returned no matches, confirming both checklist-tracked compatibility-only children override sites are closed.
- `rg -n '</(CtaLink|LeadCta)>' components/sections/heroes/hero-gallery/HeroGallery.tsx components/sections/page/closing-cta/ClosingCta.tsx components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx` returned only those three files, which remain explicitly justified render-slot callers rather than wrapper-compatibility carryovers.
- `rg -n 'onAnalyticsEvent=' components app features --glob '!**/*.md'` returned only [RippleCtaLink.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) and wrapper tests, isolating the legacy analytics payload path to the compatibility boundary.
- `rg -n 'kind:\\s*"framed-outline"' 'app/(marketing)/(financing)'` returned only [page-config-types.ts](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/page-config-types.ts), confirming there is no current routed financing page using `HeroConvertFramedOutline`.

Browser verification results:

- Route: `/`
- Viewport: desktop `1440x900`
- Trigger path: homepage card/ROI CTA attribute assertions plus click-through on `See Rollback Financing`
- Observed behavior: the homepage rendered `See Rollback Financing`, `See Zero Down`, `Read the Guide`, and `Build Your Full Profit Plan` with normal internal hrefs and no `data-pre-approval-version` attribute; clicking `See Rollback Financing` navigated to `http://127.0.0.1:3001/rollback-financing`.

- Route: `/rollback-financing`
- Viewport: desktop `1440x900`
- Trigger path: tertiary-strip `I found a truck and need financing`
- Observed behavior: the tertiary-strip CTA rendered the stacked eyebrow+label copy as `Already have a truck in mind?I found a truck and need financing`, preserved canonical `data-pre-approval-*` attributes, and click opened the pre-approval drawer with `Continue to Pre-Approval` visible on the same route.

- Route: `/`
- Viewport: mobile `iPhone 14`
- Trigger path: `MiniROI` CTA `Build Your Full Profit Plan`
- Observed behavior: the CTA rendered with href `/tow-truck-calculator?rev=200&pmt=1200&known=1` and no pre-approval attributes; tapping it navigated to the calculator route with `known=1`, and the loaded form state still reflected the default homepage ROI values (`pmt=1200`, `rev=200`).

- Route: `/rollback-financing`
- Viewport: mobile `iPhone 14`
- Trigger path: tertiary-strip `I found a truck and need financing`
- Observed behavior: the mobile tertiary-strip CTA still rendered the stacked eyebrow+label copy and tapping it opened the pre-approval drawer with `Continue to Pre-Approval` visible on the same route.

Evidence summary:

- Phase 4 closure was re-confirmed before editing: the preceding Phase 4 entry already ended in `GO`, the active checklist boundary already showed zero production wrapper consumers, and the exact import searches above still returned no wrapper barrel or deep-import matches. Phase 5 was therefore the only valid active phase for this batch.
- Closure table:
  - Deep import: [MiniROI.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/MiniROI.tsx) was removed in the final Phase 4 caller batch; the Phase 5 deep-import search returned no matches, and [MiniROI.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/mini-roi/__tests__/MiniROI.test.tsx) plus homepage browser validation confirm the canonical caller still behaves correctly.
  - Children override: [TertiaryActionsStrip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx) now uses canonical `copy.eyebrow` / `copy.label`; the tracked-children search returned no matches, [preApprovalCallers.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/tertiary-strip/__tests__/preApprovalCallers.test.tsx) passed, and desktop/mobile `/rollback-financing` browser checks passed.
  - Children override: [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx) now uses canonical `copy.eyebrow` / `copy.label`; the tracked-children search returned no matches and [HeroConvertTertiaryLinks.test.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/__tests__/HeroConvertTertiaryLinks.test.tsx) passed. No live financing page currently sets `kind: "framed-outline"`, so there was no routed browser surface to recheck.
  - `cardId` site: [ProgramCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/ProgramCards.tsx) no longer passes `legacyCardId`; homepage tests and browser validation still pass.
  - `cardId` site: [EquipmentCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/equipment-cards/EquipmentCards.tsx) no longer passes `legacyCardId`; homepage tests and browser validation still pass.
  - `cardId` site: [ResourceHub.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/resource-hub/ResourceHub.tsx) no longer passes `legacyCardId`; homepage tests and browser validation still pass.
- Dated follow-up (`2026-04-06`): legacy analytics payload support (`onAnalyticsEvent`, `buildLegacyAnalyticsPayload`, and `legacySection` wiring) remains isolated to [RippleCtaLink.tsx](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/RippleCtaLink.tsx) and wrapper tests. Remove that compatibility path in the Phase 6 wrapper-deletion batch rather than broadening Phase 5 into a public API redesign.

Gate decision:

- `GO`

Blockers / regressions:

- None.

Next required action:

- Safe stop after Phase 5. Do not start Phase 6 unless the next batch is explicitly scoped to deleting `components/ui/ripple-cta-link/` and finalizing the public CTA API.
