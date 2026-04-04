# Financing Review Scope

## Purpose

This document is the stable scope contract for the financing audit. It locks the
rendered route scope, dormant shared scope, and boundary-review scope so later
steps do not drift.

## Audited Routes

The audit covers only these financing routes:

- `/rollback-financing`
- `/wrecker-financing`
- `/rotator-financing`
- `/used-tow-truck-financing`

## Rendered In Current Financing Routes

The following files are in rendered scope based on `plans/financing-page.md`.

### Route Entries And Route Config

- `app/(marketing)/(financing)/rollback-financing/page.tsx`
- `app/(marketing)/(financing)/rollback-financing/config.ts`
- `app/(marketing)/(financing)/wrecker-financing/page.tsx`
- `app/(marketing)/(financing)/wrecker-financing/config.ts`
- `app/(marketing)/(financing)/rotator-financing/page.tsx`
- `app/(marketing)/(financing)/rotator-financing/config.ts`
- `app/(marketing)/(financing)/used-tow-truck-financing/page.tsx`
- `app/(marketing)/(financing)/used-tow-truck-financing/config.ts`

### Financing Shell And Shared Financing Contracts

- `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx`
- `app/(marketing)/(financing)/_components/shared-config.ts`
- `app/(marketing)/(financing)/_components/page-config-types.ts`

### Rendered Shared And Section Dependencies

- `components/shared/JsonLd.tsx`
- `components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx`
- `components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx`
- `components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly.tsx`
- `components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight.tsx`
- `components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`
- `components/sections/heroes/hero-convert-framed/FramedSelectionTile.tsx`
- `components/sections/heroes/hero-convert-framed/HeroGallery.tsx`
- `components/sections/heroes/hero-convert-framed/index.ts`
- `components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`
- `components/sections/heroes/hero-lead-gen/TrustBadge.tsx`
- `components/sections/heroes/hero-lead-gen/config.ts`
- `components/sections/heroes/hero-lead-gen/index.ts`
- `components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx`
- `components/sections/page/tertiary-strip/config.ts`
- `components/sections/page/tertiary-strip/index.ts`
- `components/sections/page/financing-offers-split/FinancingOffersSplit.tsx`
- `components/sections/page/financing-offers-split/CountdownChip.tsx`
- `components/sections/page/financing-offers-split/config.ts`
- `components/sections/page/financing-offers-split/index.ts`
- `components/sections/page/brand-marquee/BrandMarquee.tsx`
- `components/sections/page/brand-marquee/config.ts`
- `components/sections/page/brand-marquee/index.ts`
- `components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx`
- `components/sections/page/purchase-and-terms/config.ts`
- `components/sections/page/purchase-and-terms/index.ts`
- `components/sections/page/purchase-source-grid/PurchaseSourceGrid.tsx`
- `components/sections/page/purchase-source-grid/config.ts`
- `components/sections/page/purchase-source-grid/index.ts`
- `components/sections/page/term-length-slider/TermLengthSlider.tsx`
- `components/sections/page/term-length-slider/config.ts`
- `components/sections/page/term-length-slider/index.ts`
- `components/sections/page/content-image-split/ContentImageSplit.tsx`
- `components/sections/page/content-image-split/config.ts`
- `components/sections/page/content-image-split/index.ts`
- `components/sections/page/faq/FaqSection.tsx`
- `components/sections/page/faq/FAQ.tsx`
- `components/sections/page/faq/config.ts`
- `components/sections/page/faq/index.ts`
- `components/sections/page/financing-footnotes/FinancingFootnotes.tsx`
- `components/sections/page/financing-footnotes/config.ts`
- `components/sections/page/financing-footnotes/index.ts`
- `components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx`
- `components/sections/page/equipment-closing-cta/config.ts`
- `components/sections/page/equipment-closing-cta/index.ts`
- `components/sections/page/related-links-strip/RelatedLinksStrip.tsx`
- `components/sections/page/related-links-strip/config.ts`
- `components/sections/page/related-links-strip/index.ts`
- `components/ui/ripple-cta-link/RippleCtaLink.tsx`
- `components/ui/ripple-cta-link/index.ts`

## Boundary Dependencies In Scope

These files are reviewed only for financing-route impact unless a later finding
proves deeper escalation is necessary:

- `app/layout.tsx`
- `app/(marketing)/layout.tsx`
- `app/(marketing)/(financing)/layout.tsx`
- `components/ui/pre-approval-drawer/config.ts`
- `components/ui/pre-approval-drawer/DrawerContext.tsx`
- `components/ui/pre-approval-drawer/PreApprovalDrawer.tsx`
- `components/sections/nav/sticky-nav-rm/StickyNav.tsx`
- `components/sections/nav/sticky-nav-rm/NavClient.tsx`
- `components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx`
- `components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx`
- `components/sections/nav/sticky-nav-rm/NavDesktopMenu.tsx`
- `components/sections/nav/sticky-nav-rm/NavItemVisual.tsx`
- `components/sections/nav/sticky-nav-rm/NavPressable.tsx`
- `components/sections/nav/sticky-nav-rm/nav-data.ts`
- `components/sections/nav/sticky-nav-rm/nav-icons.tsx`
- `components/sections/nav/sticky-nav-rm/useEscapeKey.ts`
- `components/sections/nav/sticky-nav-rm/useMobileNavState.ts`
- `components/sections/nav/sticky-nav-rm/useScrollLock.ts`
- `components/sections/nav/sticky-nav-rm/index.ts`
- `components/sections/page/footer/Footer.tsx`
- `components/sections/page/footer/config.ts`
- `components/sections/page/footer/index.ts`

Boundary-review rule:

- report financing-page risk
- do not turn these files into deep refactor scope unless the finding requires
  explicit escalation
- mark such findings as `boundary-only` unless proven otherwise

## Dormant Or Not Currently Rendered

These shared sections exist in the financing shell but are not currently
rendered on the four audited routes:

- `components/sections/page/program-cards/*`
- `components/sections/page/trust-bridge/*`
- `components/sections/page/equipment-deals/*`

Dormant-scope rule:

- do not deep-audit route behavior for these sections
- review only for shared API coupling, latent contract risk, or financing-shell
  architectural impact
- Step 4c and Step 5d are the only planned places where they may be discussed in
  more detail

## Out Of Scope

Unless a later finding proves direct coupling to the four audited routes, the
following are out of scope:

- homepage-only sections
- program pages outside the four financing routes
- resources pages
- brand system pages
- internal brand route
- unrelated shared UI not referenced by rendered financing scope or boundary
  scope

## Review Sources Locked For Later Steps

Later substeps must apply these sources every time:

- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `next-best-practices`
- root `AGENTS.md`
- step-specific local `CLAUDE.md` files named by the harness

For route-level work in financing routes, also preserve the ownership rule from
`app/(marketing)/AGENTS.md`: route files own route composition and metadata,
while reusable internals belong to their section or config modules.

## Step 1 Notes

- Accessibility: Step 1 is a scope-definition pass, so no route behavior was
  tested.
- Responsive behavior: Step 1 does not make viewport claims; later steps must.
- Core Web Vitals risk: Step 1 only defines audit coverage; it does not change
  runtime code.
- Repo convention compliance: scope names and file paths follow the current repo
  layout and harness contracts.
