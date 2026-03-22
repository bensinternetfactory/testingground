# Rollback Financing Page Refactor — Dev Log

## What we did

Refactored the `/rollback-financing` page from a generic shared layout into rollback-specific content. The page previously reused three shared sections — `ProgramCards`, `TrustBridge`, and `EquipmentDealsSection` — that were the same across rollback, wrecker, and rotator pages. We replaced all three with purpose-built sections that speak directly to rollback shoppers arriving from search, ads, or internal links.

The shared `EquipmentFinancingPageShell` was evolved, not forked. Rollback moved to a route-local config model, and the shared shell/hero contracts were later cleaned up so the rollback page follows the homepage’s thin-route, section-owned content pattern without regressing wrecker or rotator behavior.

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

### `app/rollback-financing/config.ts`
- Route-local rollback config now owns rollback-specific copy, metadata, section ordering, and section config imports so content is edited beside the route/sections instead of inside a shared cross-route config file

### `app/_shared/equipment-financing/page-config-types.ts`
- Introduced a thinner shared page contract for equipment pages
- Hero rendering now uses an explicit union (`framed`, `framed-outline`, `primary-only`) instead of a rollback-only boolean flag

### `app/_shared/equipment-financing/shared-config.ts`
- Extracted shared equipment helpers and shared footnotes into a reusable module

### `app/_shared/equipment-financing/equipment-page-config.tsx`
- Reduced to shared wrecker/rotator page config only
- Rollback-specific section content no longer lives here

### `app/_shared/equipment-financing/EquipmentFinancingPageShell.tsx`
- Converted the shell into an orchestration layer that renders explicit hero variants plus section components
- Replaced inline footnotes / closing CTA / related links markup with dedicated section components and config-driven rendering

## Files created

### `components/sections/page/tertiary-strip/`
- `TertiaryActionsStrip.tsx` — Server component. Thin `bg-gray-50` strip with `RippleCtaLink variant="outline"` cards in a responsive `sm:grid-cols-2` grid. Each card has an eyebrow label, action text, ArrowRight icon, and drawer integration via `drawerTitle`. Extracted from the hero to give these secondary conversion paths their own visual weight.
- `config.ts` — Local section config + rollback strip content
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/financing-offers-split/`
- `FinancingOffersSplit.tsx` — Server component. Two prominent halves (Zero Down Rollback Financing | No Payments for Up to 180 Days) in a hero-style split layout. Desktop uses `grid md:grid-cols-[1fr_1px_1fr]` with a `bg-gray-200` vertical divider column. Mobile stacks with a horizontal `border-t`. Each half renders an icon, headline, and body copy. Informational only, no CTAs. Replaced the generic ProgramCards with rollback-specific value props.
- `config.ts` — Local section config + rollback offer copy
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/purchase-source-stack/`
- `PurchaseSourceStack.tsx` — Client component. Animated card carousel showing 4 financing sources (Authorized Retailers, Facebook Marketplace, Ritchie Brothers, Private Sellers) with mock listing cards styled like marketplace results. Uses `useSyncExternalStore` for `prefers-reduced-motion` detection. Auto-rotates every ~4.5s, pauses on hover/focus or via explicit pause/play control, supports swipe on mobile and prev/next buttons on desktop, and exposes larger dot controls with `aria-pressed` state. Reduced motion renders a static list. Stacking visual: active card at full opacity, behind-1 at `scale(0.95) translateY(8px)`, behind-2 at `scale(0.90) translateY(16px)`. Hook icon above the headline. Replaced EquipmentDealsSection.
- `config.ts` — Local section config + rollback source cards
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/term-length-slider/`
- `TermLengthSlider.tsx` — Client component. Interactive `<input type="range">` slider mapping truck model year to maximum financing term. Range: 2000 to `currentYear + 1` (programmatic, always adds the next year). 44px touch target on the slider thumb is styled for WebKit and Firefox. `aria-valuetext` announces both year and term. Result displayed in a bordered container (e.g. "72 months / maximum term length"). Placeholder lookup table: 2000–2009 → 36mo, 2010–2014 → 48mo, 2015–2018 → 60mo, 2019–2022 → 72mo, 2023+ → 84mo.
- `config.ts` — Local section config + rollback term table
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/purchase-and-terms/`
- `PurchaseAndTermsSection.tsx` — Server component wrapping PurchaseSourceStack (left) and TermLengthSlider (right). Same divider pattern as FinancingOffersSplit: desktop uses `grid lg:grid-cols-[1fr_1px_1fr]` with `self-stretch bg-gray-200` for a full-height vertical divider, mobile stacks with a horizontal `border-t`. White background, `py-20 md:py-28`. Per-column headlines, no shared section header.
- `config.ts` — Local wrapper config that composes the purchase-stack and term-slider section configs
- `index.ts` — Barrel export
- `CLAUDE.md` — Component docs

### `components/sections/page/financing-footnotes/`
- Extracted shared equipment footnotes into a dedicated section component + config type so the shell no longer inlines authored copy

### `components/sections/page/equipment-closing-cta/`
- Extracted the dark closing CTA into a dedicated section component + config type

### `components/sections/page/related-links-strip/`
- Extracted related links into a dedicated section component + config type

### `components/sections/heroes/hero-convert-framed/`
- `HeroConvertFramedPrimaryOnly.tsx` — Explicit rollback hero variant with no tertiary content inside the hero
- `HeroConvertFramedOutline.tsx` — Explicit wrecker/rotator hero variant with outline tertiary cards
- `HeroConvertFramed.tsx` — Reduced to the text-link tertiary variant instead of multiplexing link vs outline behavior behind a single config shape

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

Both pages still render their original sections (ProgramCards, TrustBridge, EquipmentDealsSection) because those config fields remain populated. Their hero wiring was later migrated onto the explicit `framed-outline` hero variant, but that cleanup was structural rather than behavioral. Verified in browser with no wrecker/rotator regressions.

## Verification

- `npm run build` — clean, all 7 routes generate
- `npm run lint` — 0 errors (1 pre-existing warning in `PreApprovalDrawer.tsx`, unrelated)
- Browser validation on port 3005: correct section order, drawer opens from tertiary strip, carousel rotates and pauses, slider shows correct terms, wrecker/rotator unchanged

## Follow-up fix — 2026-03-22 14:33 EDT

A sitewide regression surfaced after the rollback refactor work: `RippleCtaLink` interactions still navigated correctly, but the touch layer had degraded. The visible ripple feedback felt wrong, haptics were no longer firing, and the hardened touch handling that protected against swipe misfires and rapid double taps had been lost in the shared CTA primitive.

### Root cause

The issue was not rollback-page-specific. It came from the shared `components/ui/ripple-cta-link/RippleCtaLink.tsx` implementation, which had been simplified during recent CTA API work. That simplification preserved the newer props (`children`, `variant`, `justify`, `disabled`, `drawerTitle`) but dropped the previous interaction logic built around `framer-motion`, `useReducedMotion`, `web-haptics`, swipe suppression, double-tap guarding, and keyboard-specific ripple behavior. Because `RippleCtaLink` is reused sitewide, the regression affected CTAs across the site.

### Fix applied

- Restored `framer-motion` press feedback and animated ripple behavior while preserving the newer CTA API surface
- Restored `web-haptics` activation on pointer/touch input with reduced intensity under reduced-motion preferences
- Restored touch swipe guarding so dragging across a CTA does not trigger activation
- Restored double-tap protection to suppress duplicate rapid activations
- Restored keyboard `Enter` handling so keyboard activation still produces centered ripple feedback
- Kept current drawer/hash integration intact, including `data-drawer-title` passthrough for drawer-opening CTA variants
- Updated `components/ui/ripple-cta-link/CLAUDE.md` so the component docs match the actual interaction contract again

### Verification for follow-up fix

- `npm run build` — clean
- `npm run lint` — no errors; same pre-existing warning in `PreApprovalDrawer.tsx`
- Browser validation on port 3005: `/rollback-financing` rendered correctly and a filled `Get Pre-Approved` CTA still opened the pre-approval drawer after the interaction-layer restore

## Follow-up fix — 2026-03-22

The post-review cleanup addressed the remaining architecture and accessibility gaps from the rollback refactor so the page now matches the homepage’s thin-route, section-config editing model and the interactive controls are defensible under review.

### Root cause

- Rollback-owned content was still too centralized in the shared equipment page config instead of living beside the route and section folders
- The shared framed hero had shed the rollback-only boolean, but it still multiplexed tertiary link mode vs outline-card mode inside one component
- The purchase-source carousel still had undersized dot targets for touch users
- The rollback dev log was describing an older boolean-based implementation that no longer matched the code

### Fix applied

- Moved rollback page ownership into `app/rollback-financing/config.ts` and section-local `config.ts` files for the new rollback sections
- Added `app/_shared/equipment-financing/page-config-types.ts` and `shared-config.ts` so the shared shell stays an orchestration layer and shared helpers stay separate from rollback-authored content
- Replaced inline shell footnotes, closing CTA, and related links with dedicated section components/config types
- Split the framed hero into explicit variants:
  - `HeroConvertFramed.tsx` for text-link tertiary content
  - `HeroConvertFramedOutline.tsx` for outline tertiary cards
  - `HeroConvertFramedPrimaryOnly.tsx` for rollback’s no-tertiary-in-hero variant
- Increased the carousel dot targets to full button-sized hit areas while keeping the visible dot styling compact
- Updated `FramedTileSelector.tsx` so shared hero CTA analytics use a generic equipment-hero section value instead of hard-coded rollback-specific metadata
- Updated component docs and this rollback log so the documented implementation matches the code again

### Verification

- `npm run lint` — passes with the same pre-existing `PreApprovalDrawer.tsx` warning only
- `npm run build` — clean
- Browser validation on port 3005:
  - `/rollback-financing` desktop and mobile render correctly
  - rollback hero tertiary actions remain in the strip, not inside the hero
  - hero CTA and tertiary strip CTA open the pre-approval drawer
  - carousel renders with pause/play control and enlarged dot controls
  - `/wrecker-financing` still renders its in-hero tertiary cards and legacy section stack correctly
  - `/rotator-financing` remained clean in the earlier regression pass before the hero-variant cleanup, and the explicit hero split preserved that behavior contract
- Final live re-check on port 3005 after the analytics cleanup:
  - `/rollback-financing` still enables the hero CTA after truck selection
  - the enabled hero CTA still opens the pre-approval drawer
  - `npm run lint` and `npm run build` still pass after the selector change

### Independent code review

- Passed a fresh Codex re-review using:
  - `.agents/skills/vercel-composition-patterns/SKILL.md`
  - `.agents/skills/vercel-react-best-practices/SKILL.md`
- Final review result: no remaining implementation findings after the shared hero analytics cleanup
- Final reviewer caveat: the last independent live check re-verified `/rollback-financing` on port 3005, but did not repeat a fresh mobile browser pass in that final micro-review

## Open items

- Replace placeholder source icons with real branded assets
- Term lookup table values are placeholder — real rules TBD
- Copy on all new sections is draft and may be revised
