# CTA Migration Checklist

This file replaces the current review loop with a single code-anchored `NO-GO` checklist. Do not advance the CTA migration until every item below has named proof in code or in a passing test.

## Live Boundary

- `RippleCtaLink` has 13 production consumers today: 12 barrel imports and 1 deep import.
- Deep imports still live in `components/sections/page/mini-roi/MiniROI.tsx`.
- Direct `usePressFeedback` consumers outside the wrapper: `components/sections/nav/sticky-nav-rm/NavPressable.tsx`, `app/(marketing)/(programs)/_components/ProgramNavCardLink.tsx`, `features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx`.
- Direct `buildPreApprovalTriggerAttributes()` surfaces outside the wrapper: `app/(marketing)/(programs)/_components/ProgramNavCardLink.tsx`, `components/sections/heroes/hero-showcase-rm/HeroShowcase.tsx`, `components/sections/heroes/hero-convert-geico/HeroConvert.tsx`, `components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx`.
- Route-based pre-approval entry outside the wrapper: `components/sections/heroes/hero-gallery/HeroInput.tsx`.
- Wrapper-only children overrides still live in `components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx`, `components/sections/heroes/hero-gallery/HeroGallery.tsx`, and `components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx`.
- `cardId` is still carried by wrapper consumers in `components/sections/page/program-cards/ProgramCards.tsx`, `components/sections/page/equipment-cards/EquipmentCards.tsx`, and `components/sections/page/resource-hub/ResourceHub.tsx`.

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
