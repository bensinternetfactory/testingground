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
