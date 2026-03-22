# Rollback Financing Page Refactor — Dev Log

## What we did

Refactored the `/rollback-financing` page from a generic shared layout into rollback-specific content. The page previously reused three shared sections — `ProgramCards`, `TrustBridge`, and `EquipmentDealsSection` — that were the same across rollback, wrecker, and rotator pages. We replaced all three with purpose-built sections that speak directly to rollback shoppers arriving from search, ads, or internal links.

The shared `EquipmentFinancingPageShell` was evolved, not forked. Wrecker and rotator pages are completely unchanged.

## Why we did it

The generic sections didn't say anything rollback-specific. A shopper landing on `/rollback-financing` from Google saw the same program cards and deal types as every other equipment page. The new sections address what rollback buyers actually care about: zero-down options, payment deferment, where they can buy from, and what terms are available for the model year they're looking at.

## Section order before → after

**Before:**
```
Hero (with tertiary actions inside)
ProgramCards
BrandMarquee
TrustBridge ("How It Works")
EquipmentDealsSection
FAQ → Footnotes → Closing CTA → Related Links → Footer
```

**After:**
```
Hero (tertiary actions removed)
Tertiary Actions Strip          ← new
Financing Offers Split          ← new (replaces ProgramCards)
BrandMarquee                    ← moved up
Purchase & Terms Section        ← new (replaces TrustBridge + EquipmentDealsSection)
FAQ → Footnotes → Closing CTA → Related Links → Footer
```

## Files modified

### `app/_shared/equipment-financing/equipment-page-config.tsx`
- Made `programs`, `trustBridge`, `dealsSection` optional on the `EquipmentFinancingPageConfig` interface so rollback can omit them while wrecker/rotator still provide them
- Added new type interfaces: `TertiaryStripConfig`, `FinancingOffersSplitConfig`, `PurchaseSourceStackConfig`, `PurchaseSourceCard`, `TermSliderConfig`, `TermLookupEntry`, `PurchaseAndTermsConfig`
- Updated `rollbackFinancingPageConfig`: set `showTertiaryInHero: false`, removed the three old section configs, added `tertiaryStrip`, `financingOffers`, and `purchaseAndTerms` with all rollback-specific data (4 source cards, term lookup table, copy, icon paths)

### `app/_shared/equipment-financing/EquipmentFinancingPageShell.tsx`
- Imported the three new section components
- Wrapped existing sections (`ProgramCards`, `TrustBridge`, `EquipmentDealsSection`) in conditional rendering so they only appear when their config field is present
- Inserted `TertiaryActionsStrip`, `FinancingOffersSplit`, and `PurchaseAndTermsSection` at the correct positions in the render order, also conditionally gated

### `components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx`
- Added `showTertiaryInHero?: boolean` (defaults to `true`) to `HeroConvertFramedConfig`
- Gated the mobile tertiary block and the desktop tertiary block on `showTertiaryInHero !== false`
- Rollback sets this to `false` (tertiary actions moved to strip); wrecker/rotator keep the default `true` behavior

## Files created

### `components/sections/page/tertiary-strip/`
- `TertiaryActionsStrip.tsx` — Server component. Thin `bg-gray-50` strip with `RippleCtaLink variant="outline"` cards in a responsive `sm:grid-cols-2` grid. Each card has an eyebrow label, action text, ArrowRight icon, and drawer integration via `drawerTitle`. Extracted from the hero to give these secondary conversion paths their own visual weight.
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/financing-offers-split/`
- `FinancingOffersSplit.tsx` — Server component. Two prominent halves (Zero Down Rollback Financing | No Payments for Up to 180 Days) in a hero-style split layout. Desktop uses `grid md:grid-cols-[1fr_1px_1fr]` with a `bg-gray-200` vertical divider column. Mobile stacks with a horizontal `border-t`. Each half renders an icon, headline, and body copy. Informational only, no CTAs. Replaced the generic ProgramCards with rollback-specific value props.
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/purchase-source-stack/`
- `PurchaseSourceStack.tsx` — Client component. Animated card carousel showing 4 financing sources (Authorized Retailers, Facebook Marketplace, Ritchie Brothers, Private Sellers) with mock listing cards styled like marketplace results. Uses `useSyncExternalStore` for `prefers-reduced-motion` detection. Auto-rotates every ~4.5s, pauses on hover/focus, supports swipe on mobile and prev/next buttons on desktop. Full a11y: `aria-roledescription="carousel"`, `role="group"` per slide, `aria-live="polite"`, keyboard ArrowLeft/ArrowRight. Reduced motion renders a static list. Stacking visual: active card at full opacity, behind-1 at `scale(0.95) translateY(8px)`, behind-2 at `scale(0.90) translateY(16px)`. Hook icon above the headline. Replaced EquipmentDealsSection.
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/term-length-slider/`
- `TermLengthSlider.tsx` — Client component. Interactive `<input type="range">` slider mapping truck model year to maximum financing term. Range: 2000 to `currentYear + 1` (programmatic, always adds the next year). 44px touch target on slider thumb. `aria-valuetext` announces both year and term. Result displayed in a bordered container (e.g. "72 months / maximum term length"). Placeholder lookup table: 2000–2009 → 36mo, 2010–2014 → 48mo, 2015–2018 → 60mo, 2019–2022 → 72mo, 2023+ → 84mo.
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/purchase-and-terms/`
- `PurchaseAndTermsSection.tsx` — Server component wrapping PurchaseSourceStack (left) and TermLengthSlider (right). Same divider pattern as FinancingOffersSplit: desktop uses `grid lg:grid-cols-[1fr_1px_1fr]` with `self-stretch bg-gray-200` for a full-height vertical divider, mobile stacks with a horizontal `border-t`. White background, `py-20 md:py-28`. Per-column headlines, no shared section header.
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `public/brand-assets/source-icons/`
- `placeholder-dealer.svg` — House/storefront geometric placeholder
- `placeholder-fbmp.svg` — Person/profile geometric placeholder
- `placeholder-auction.svg` — Gavel/scale geometric placeholder
- `placeholder-private.svg` — Lock geometric placeholder

Simple geometric SVGs standing in for real source icons. Will be replaced with branded assets.

## Headline iterations

During review, the purchase/terms column headlines were revised for punch:
- Purchase column: "Finance from any source" → **"Buy from anyone. We'll finance it."**
- Term column: "Term Length by Model Year" → **"Older truck? Still financeable."**

## Wrecker & rotator — no regressions

Both pages still render their original sections (ProgramCards, TrustBridge, EquipmentDealsSection) because those config fields remain populated. The shell gates every section on config presence, so adding new optional fields to the interface had zero impact on existing pages. Verified in browser.

## Verification

- `npm run build` — clean, all 7 routes generate
- `npm run lint` — 0 errors (1 pre-existing warning in `PreApprovalDrawer.tsx`, unrelated)
- Browser validation on port 3005: correct section order, drawer opens from tertiary strip, carousel rotates and pauses, slider shows correct terms, wrecker/rotator unchanged

## Open items

- Replace placeholder source icons with real branded assets
- Term lookup table values are placeholder — real rules TBD
- Copy on all new sections is draft and may be revised
