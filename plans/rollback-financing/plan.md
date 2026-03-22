# Rollback Financing Refactor Prompt

## Objective
Refactor and polish the `/rollback-financing` page so it more clearly serves shoppers looking for rollback financing. The page should speak to users coming from Google, ads, or other parts of the site and make the financing options feel specific to rollback buyers.

## Current Page Structure
The page currently includes these sections, in order:

1. `StickyNav`
   Fixed header navigation.
2. `HeroConvertFramed`
   H1, supporting copy, tile selector, primary CTA, and image gallery.
3. Tertiary Actions
   Two guided-path cards currently embedded inside the hero:
   - "I found a truck and need financing"
   - "What's my buying power?"
4. `ProgramCards`
   Reusable financing program cards.
5. `BrandMarquee`
   Scrolling logo ribbon.
6. `TrustBridge`
   "How it works" process section.
7. `EquipmentDealsSection`
   Deal-type cards.
8. `FaqSection`
9. Footnotes
10. Closing CTA
11. Related Links
12. `Footer`

## Required Changes

### 1. Extract the tertiary actions into their own reusable section
- Remove the tertiary action cards from inside the hero.
- Turn them into their own reusable component/section directly below the hero.
- The section should feel like a thin transition strip.
- Visually, it can borrow the rhythm of the brand marquee, but it does not need a dark background.
- It should blend naturally into the page rather than read like a separate heavy block.

### 2. Replace the current program cards section
- Remove the reusable `ProgramCards` section from this page.
- Replace it with a new 2-column grid focused on rollback-specific financing offers.
- The two columns should communicate:
  - Zero Down Rollback Financing
  - Limited Time: No Payments for Up to 180 Days on the Next Rollback Purchase
- The `BrandMarquee` should appear immediately below this new 2-column section.

### 3. Remove the "How It Works" section
- Remove `TrustBridge` from this page.

### 4. Replace the equipment deals area with a new 2-column section below the brand marquee
- Add a new 2-column section after `BrandMarquee`.

- Left column theme: Purchase a rollback from anyone
  It should communicate that financing can work for rollbacks purchased from:
  - Authorized retailers
  - Facebook Marketplace
  - Auctions
  - Any end user / private seller
  The visual idea is stacked cards that rotate or cycle through these purchase sources.

- Right column theme: Longer terms = smaller payments
  Add a small interactive element, such as an input or slider, where the user enters/selects the truck year and sees how long the truck can be financed for.

### 5. Keep the lower page mostly intact
- Everything below this new section can remain as-is unless small polish changes are needed for consistency.
- Remove `EquipmentDealsSection`, since its purpose will now be covered by the new "purchase from anyone" content.

## Suggested Implementation Steps

### Step 1
Audit the current `/rollback-financing` page structure and identify where the hero tertiary actions, `ProgramCards`, `TrustBridge`, and `EquipmentDealsSection` are wired in.

### Step 2
Extract the hero tertiary actions into a dedicated reusable section/component and place it directly below the hero.

### Step 3
Remove `ProgramCards` and replace it with a rollback-specific 2-column financing offer section.

### Step 4
Move `BrandMarquee` so it sits directly below the new financing offer section.

### Step 5
Remove the `TrustBridge` / "How It Works" section entirely.

### Step 6
Remove `EquipmentDealsSection` and replace it with a new 2-column section:
- Left: rotating/stacked source cards for where the rollback can be purchased
- Right: truck-year input/slider that reveals available financing term length

### Step 7
Leave the remaining lower-page sections in place, then do a visual pass to make sure spacing, transitions, and section order feel intentional and cohesive.

---

## Dev Log — 2026-03-22

### Summary

Refactored the `/rollback-financing` page from a generic shared layout (ProgramCards + TrustBridge + EquipmentDealsSection) into rollback-specific content sections. The shared `EquipmentFinancingPageShell` was evolved — not forked — so wrecker and rotator pages continue to work unchanged.

### What changed and why

#### 1. Evolved config types to support optional sections

**File:** `app/_shared/equipment-financing/equipment-page-config.tsx`

Made `programs`, `trustBridge`, and `dealsSection` optional (`?`) on `EquipmentFinancingPageConfig` so rollback can omit them while wrecker/rotator still provide them. Added new optional fields and their type interfaces:

- `TertiaryStripConfig` — actions array with eyebrow, label, href, drawerTitle
- `FinancingOffersSplitConfig` — left/right halves with headline, body, icon metadata
- `PurchaseSourceStackConfig` — headline, body, icon, cards array, rotation interval
- `TermSliderConfig` — headline, subheading, body, icon, defaultYear, lookupTable
- `PurchaseAndTermsConfig` — parent wrapper combining purchaseStack + termSlider
- `PurchaseSourceCard` — id, sourceName, sourceSubtitle, icon, badge, sample listing/price
- `TermLookupEntry` — minYear, maxYear, maxTermMonths

Also updated `rollbackFinancingPageConfig` to:
- Set `showTertiaryInHero: false` on the hero config
- Omit `programs`, `trustBridge`, `dealsSection` (removed from rollback)
- Add `tertiaryStrip` config (moved data from hero's `tertiaryActions`)
- Add `financingOffers` config with Zero Down and 180-Day Deferment halves using existing brand icons
- Add `purchaseAndTerms` config with 4 source cards (Authorized Retailers, Facebook Marketplace, Ritchie Brothers, Private Sellers) and term slider lookup table

#### 2. Updated shell to conditional rendering

**File:** `app/_shared/equipment-financing/EquipmentFinancingPageShell.tsx`

Imported the three new section components and updated the render order to:
```
HeroConvertFramed
{tertiaryStrip && <TertiaryActionsStrip />}
{financingOffers && <FinancingOffersSplit />}
{programs && <ProgramCards />}          ← wrecker/rotator still hit this
<BrandMarquee />
{purchaseAndTerms && <PurchaseAndTermsSection />}
{trustBridge && <TrustBridge />}        ← wrecker/rotator still hit this
{dealsSection && <EquipmentDealsSection />}  ← wrecker/rotator still hit this
<FaqSection />
...footnotes, closing CTA, related links, footer (unchanged)
```

All existing sections are gated with `config.X ? <Component /> : null` so the shell remains a single shared component.

#### 3. Added `showTertiaryInHero` gate to HeroConvertFramed

**File:** `components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx`

Added `showTertiaryInHero?: boolean` (default `true`) to `HeroConvertFramedConfig`. Gated both the mobile tertiary block (inside the left column) and the desktop tertiary block (below the gallery) on `showTertiaryInHero !== false`. This lets rollback suppress tertiary actions in the hero (moved to strip below) while wrecker/rotator keep them in-hero by default.

#### 4. Created TertiaryActionsStrip component

**New dir:** `components/sections/page/tertiary-strip/`
**Files created:**
- `TertiaryActionsStrip.tsx` — server component, `bg-gray-50` strip with `RippleCtaLink variant="outline"` cards in a `sm:grid-cols-2` grid. Eyebrow + label stacked inside each card, ArrowRight icon, drawer integration via `drawerTitle` prop.
- `index.ts` — barrel export
- `CLAUDE.md` — component docs

Why: The tertiary actions were buried inside the hero. Extracting them into a visible strip below the hero gives them more prominence as secondary conversion paths and makes the hero simpler.

#### 5. Created FinancingOffersSplit component

**New dir:** `components/sections/page/financing-offers-split/`
**Files created:**
- `FinancingOffersSplit.tsx` — server component, hero-style split layout. Mobile: stacked halves separated by `border-t`. Desktop: `grid md:grid-cols-[1fr_1px_1fr]` with a `bg-gray-200` center column as vertical divider. Each half renders an icon, large headline, and body copy. No CTAs — informational only.
- `index.ts` — barrel export
- `CLAUDE.md` — component docs

Why: Replaced generic ProgramCards with two prominent rollback-specific value props (Zero Down, 180-Day Deferment) that directly address what rollback shoppers care about.

#### 6. Created PurchaseSourceStack component

**New dir:** `components/sections/page/purchase-source-stack/`
**Files created:**
- `PurchaseSourceStack.tsx` — client component (`"use client"`). Animated card carousel with depth-stacked rotation. Features:
  - `useSyncExternalStore` for `prefers-reduced-motion` (avoids the lint error from `setState` in `useEffect`)
  - ~4.5s auto-rotation, pauses on hover/focus
  - Swipe support on mobile, prev/next buttons on desktop
  - Full a11y: `aria-roledescription="carousel"`, `role="group"` per slide, `aria-live="polite"`, keyboard ArrowLeft/ArrowRight
  - `prefers-reduced-motion: reduce` renders a static card list instead of animating
  - Stacking visual: active card full opacity, behind-1 at `scale(0.95) translateY(8px)`, behind-2 at `scale(0.90) translateY(16px)`
  - Hook icon rendered above the headline
- `index.ts` — barrel export
- `CLAUDE.md` — component docs

Why: Replaced EquipmentDealsSection with a more engaging visual that shows operators can finance from any source (dealers, FBMP, auctions, private sellers), with mock listing cards that feel like real marketplace results.

#### 7. Created TermLengthSlider component

**New dir:** `components/sections/page/term-length-slider/`
**Files created:**
- `TermLengthSlider.tsx` — client component (`"use client"`). Interactive `<input type="range">` slider mapping model year to max financing term. Range: 2000 to `currentYear + 1` (programmatic). 44px touch target on thumb. `aria-valuetext` announces both year and term. Result display in a bordered container showing e.g. "72 months / maximum term length".
- `index.ts` — barrel export
- `CLAUDE.md` — component docs

Lookup table (placeholder data):
- 2000–2009 → 36 months
- 2010–2014 → 48 months
- 2015–2018 → 60 months
- 2019–2022 → 72 months
- 2023+ → 84 months

Why: Gives visitors an interactive way to see what financing terms are available for any model year, replacing the static deal-type content.

#### 8. Created PurchaseAndTermsSection wrapper

**New dir:** `components/sections/page/purchase-and-terms/`
**Files created:**
- `PurchaseAndTermsSection.tsx` — server component wrapping PurchaseSourceStack (left) and TermLengthSlider (right). Uses the same divider pattern as FinancingOffersSplit: mobile stacks with `border-t`, desktop uses `grid lg:grid-cols-[1fr_1px_1fr]` with `self-stretch bg-gray-200` center column for a full-height vertical divider. White bg, `py-20 md:py-28`.
- `index.ts` — barrel export
- `CLAUDE.md` — component docs

Why: Wraps the two interactive columns into a single section with consistent divider treatment matching the financing offers split above.

#### 9. Created placeholder source icon SVGs

**New dir:** `public/brand-assets/source-icons/`
**Files created:**
- `placeholder-dealer.svg` — house/storefront shape
- `placeholder-fbmp.svg` — person/profile shape
- `placeholder-auction.svg` — gavel/scale shape
- `placeholder-private.svg` — lock/handshake shape

Simple geometric placeholder icons for the purchase source cards. Will be replaced with real brand assets.

### New page section order (rollback)

```
Hero (tertiary actions hidden)
Tertiary Actions Strip
Financing Offers Split (Zero Down | 180-Day Deferment)
Brand Marquee
Purchase & Terms (Source Carousel | Term Slider)
FAQ
Footnotes
Closing CTA
Related Links
Footer
```

### Wrecker/Rotator — no regressions

Both pages still render with their original sections (ProgramCards, TrustBridge, EquipmentDealsSection) because those fields remain populated in their configs and the shell gates rendering on presence.

### Headline iterations

During review, the purchase/terms column headlines were revised:
- Purchase column: "Finance from any source" → **"Buy from anyone. We'll finance it."**
- Term column: "Term Length by Model Year" → **"Older truck? Still financeable."**

### Build & lint

- `npm run build` — clean, all 7 routes generate successfully
- `npm run lint` — 0 errors (1 pre-existing warning in `PreApprovalDrawer.tsx`, not related to this work)
- Browser validation on port 3005 confirmed correct section order, carousel rendering, slider interaction, drawer integration, and no wrecker/rotator regressions
