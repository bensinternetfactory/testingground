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
