# CTA Migration Checklist

This file replaces the current review loop with a single code-anchored `NO-GO` checklist. Do not advance the CTA migration until every item below has named proof in code or in a passing test.

## Live Boundary

- `RippleCtaLink` has 0 production consumers today: 0 barrel imports and 0 deep imports.
- No production deep imports of `RippleCtaLink` remain.
- Direct `usePressFeedback` consumers outside the wrapper: `components/sections/nav/sticky-nav-rm/NavPressable.tsx`, `app/(marketing)/(programs)/_components/ProgramNavCardLink.tsx`, `features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx`.
- Direct `buildPreApprovalTriggerAttributes()` surfaces outside the wrapper: `app/(marketing)/(programs)/_components/ProgramNavCardLink.tsx`, `components/sections/heroes/hero-showcase-rm/HeroShowcase.tsx`, `components/sections/heroes/hero-convert-geico/HeroConvert.tsx`, `components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx`.
- Route-based pre-approval entry outside the wrapper: `components/sections/heroes/hero-gallery/HeroInput.tsx`.
- No checklist-tracked compatibility-only children overrides remain.
- Remaining production `children` render-slot callers are explicitly justified non-wrapper layouts in `components/sections/heroes/hero-gallery/HeroGallery.tsx`, `components/sections/page/closing-cta/ClosingCta.tsx`, and `components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx`.
- No production `legacyCardId` usage remains.
- Legacy analytics payload support is isolated to `components/ui/ripple-cta-link/RippleCtaLink.tsx` and wrapper tests as of `2026-04-06`; remove it in Phase 6 with wrapper deletion.

## No-Go Blockers

- Baseline tests must prove the current press lifecycle is `commit-on-click`, not `press-on-down`.
  Proof: `lib/__tests__/press-feedback.test.tsx`
- Baseline tests must prove swipe cancel, duplicate-click suppression, and reduced-motion behavior.
  Proof: `lib/__tests__/press-feedback.test.tsx`
- Baseline tests must prove wrapper behavior for internal hash links, disabled rendering, external links, and analytics payload identity.
  Proof: `components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx`
- Do not change `lib/press-feedback.tsx` ownership until the three non-wrapper consumers above still pass targeted verification.
  Proof: targeted tests for nav, program card, and drawer surfaces
- Do not change the pre-approval composition contract until the four direct trigger surfaces and the route-based entry above are rechecked.
  Proof: targeted tests or browser verification on at least one representative per class
- Do not delete the wrapper until every deep import, children override, and `cardId` site has an explicit replacement path and evidence.
  Proof: migration log entry per site, not just `rg` output
- Do not lock a new canonical CTA API before code exists for it.
  Proof: the first migrated caller compiles against the real implementation, not only against plan docs
- No CTA surface may be marked as migrated until real mobile tap proof (Tier 3) exists for that CTA class. DOM `.click()` is commit-plumbing proof only, not touch-first acceptance. The touch implementation must reuse the existing `usePressFeedback` + motion pressed-state pattern from `lib/press-feedback.tsx`, the same system already active on the drawer continue button (`PreApprovalDrawerView.tsx:486`).
  Proof: execution-log entry with interaction source = "real tap" per affected CTA class (`CTA-INV-29`)
- Haptics adapter lifecycle must be verified for commit trigger, cancel suppression, and failure isolation before any CTA class is considered complete. Haptics must use the existing `web-haptics` integration in `usePressFeedback`, not ad hoc per-caller wiring.
  Proof: automated test with `web-haptics` mock showing call sequence per interaction outcome (`CTA-INV-31` `CTA-INV-32`)
- Every browser validation entry in the execution log must declare its interaction source: "real tap" (Tier 3), "real click" (Tier 2), or "programmatic DOM click" (Tier 1). Entries lacking this declaration are not valid evidence.
  Proof: execution-log audit (`CTA-INV-33`)

## Execution Order

1. Keep this checklist current with the live inventory.
2. Land baseline tests before touching CTA runtime behavior.
3. Migrate one caller class at a time.
4. Re-run targeted verification after each batch.
5. Delete compatibility exports only after the closure table is complete.

## Regeneration Commands

- Wrapper import inventory: `rg -n --glob '!**/*.md' '^import .*RippleCtaLink.*@/components/ui/ripple-cta-link' components app`
- Direct press-feedback consumers: `rg -n 'usePressFeedback<' components app features`
- Direct trigger surfaces: `rg -n 'buildPreApprovalTriggerAttributes\\(' components app`
- Route-based pre-approval entry: `rg -n --glob '!**/*.test.ts' --glob '!**/*.test.tsx' 'buildPreApprovalHref\\(' components app`
- Legacy cardId inventory: `rg -n 'legacyCardId' components app --glob '!**/*.md'`
- Canonical CTA child-content inventory: `rg -n '</(CtaLink|LeadCta)>' components app --glob '!**/*.md'`
