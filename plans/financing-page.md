# Financing Pages — Component Overview

> 30,000-foot view of every component rendered on the rollback, wrecker, rotator, and used tow truck financing pages, listed in compilation/render order.

---

## Layout Stack (wraps all four pages)

| Order | Component | Server / Client | Location |
|-------|-----------|----------------|----------|
| 1 | `RootLayout` | Server | `app/layout.tsx` |
| 2 | `DrawerProvider` | **Client** | `components/ui/pre-approval-drawer/DrawerContext.tsx` |
| 3 | `MarketingLayout` | Server (pass-through) | `app/(marketing)/layout.tsx` |
| 4 | `FinancingLayout` | Server (pass-through) | `app/(marketing)/(financing)/layout.tsx` |

---

## Page Entry Points

Each page is a thin server component that passes a config object into the shared shell.

| Page | Component | Location |
|------|-----------|----------|
| Rollback | `RollbackFinancingPage` | `app/(marketing)/(financing)/rollback-financing/page.tsx` |
| Wrecker | `WreckerFinancingPage` | `app/(marketing)/(financing)/wrecker-financing/page.tsx` |
| Rotator | `RotatorFinancingPage` | `app/(marketing)/(financing)/rotator-financing/page.tsx` |
| Used Tow Truck | `UsedTowTruckFinancingPage` | `app/(marketing)/(financing)/used-tow-truck-financing/page.tsx` |

All four are **server components**. Each renders:
```tsx
<EquipmentFinancingPageShell config={pageConfig} />
```

Config files:
- `app/(marketing)/(financing)/rollback-financing/config.ts`
- `app/(marketing)/(financing)/wrecker-financing/config.ts`
- `app/(marketing)/(financing)/rotator-financing/config.ts`
- `app/(marketing)/(financing)/used-tow-truck-financing/config.ts`

---

## EquipmentFinancingPageShell — Render Order

**Server component** — `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx`

Below is the exact top-to-bottom render order. Sections marked **(optional)** are conditionally rendered based on the page config. The rightmost columns show which pages enable each section.

| # | Component | Server / Client | Rollback | Wrecker | Rotator | Used Tow Truck |
|---|-----------|----------------|----------|---------|---------|----------------|
| 1 | Skip link (`<a>`) | Server (HTML) | Y | Y | Y | Y |
| 2 | **`StickyNav`** | Server | Y | Y | Y | Y |
| 3 | **Hero** (variant per page) | Server | Y | Y | Y | Y |
| 4 | **`TertiaryActionsStrip`** (optional) | Server | Y | Y | Y | Y |
| 5 | **`FinancingOffersSplit`** (optional, primary) | Server | Y | Y | Y | Y |
| 6 | **`ProgramCards`** (optional) | Server | -- | -- | -- | -- |
| 7 | **`BrandMarquee`** | **Client** | Y | Y | Y | Y |
| 8 | **`FinancingOffersSplit`** (optional, secondary) | Server | -- | -- | -- | Y |
| 9 | **`PurchaseAndTermsSection`** (optional, primary) | Server | Y | Y | Y | -- |
| 10 | **`TertiaryActionsStrip`** (optional, secondary) | Server | Y | Y | Y | -- |
| 11 | **`ContentImageSplit`** (optional) | Server | Y | Y | Y | Y |
| 12 | **`TrustBridge`** (optional) | Server | -- | -- | -- | -- |
| 13 | **`PurchaseAndTermsSection`** (optional, secondary) | Server | -- | -- | -- | Y |
| 14 | **`EquipmentDealsSection`** (optional) | Server | -- | -- | -- | -- |
| 15 | **`FaqSection`** | Server | Y | Y | Y | Y |
| 16 | **`FinancingFootnotes`** | Server | Y | Y | Y | Y |
| 17 | **`EquipmentClosingCta`** | Server | Y | Y | Y | Y |
| 18 | **`RelatedLinksStrip`** | Server | Y | Y | Y | Y |
| 19 | **`JsonLd`** (FAQ schema) | Server | Y | Y | Y | Y |
| 20 | **`JsonLd`** (Financial product schema) | Server | Y | Y | Y | Y |
| 21 | **`JsonLd`** (Breadcrumb schema) | Server | Y | Y | Y | Y |
| 22 | **`Footer`** | Server | Y | Y | Y | Y |

---

## Hero Variants by Page

| Page | Hero Kind | Component | Server / Client |
|------|-----------|-----------|----------------|
| Rollback | `primary-only` | `HeroConvertFramedPrimaryOnly` | Server |
| Wrecker | `primary-only` | `HeroConvertFramedPrimaryOnly` | Server |
| Rotator | `lead-gen` | `HeroLeadGen` | Server |
| Used Tow Truck | `tile-right` | `HeroConvertFramedTileRight` | Server |

All hero variants are server components but contain client islands:

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `HeroConvertFramedPrimaryOnly` | Server | `components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly.tsx` |
| `HeroConvertFramedTileRight` | Server | `components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight.tsx` |
| `HeroConvertFramed` | Server | `components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx` |
| `HeroConvertFramedOutline` | Server | `components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx` |
| `HeroLeadGen` | Server | `components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx` |
| -- `TrustBadge` | Server | `components/sections/heroes/hero-lead-gen/TrustBadge.tsx` |
| -- `FramedTileSelector` | **Client** | `components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx` |
| ---- `FramedSelectionTile` | **Client** | `components/sections/heroes/hero-convert-framed/FramedSelectionTile.tsx` |
| -- `HeroGallery` | **Client** | `components/sections/heroes/hero-convert-framed/HeroGallery.tsx` |

---

## Section Components — Detail

### `StickyNav`
Server component with client islands for interactivity.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `StickyNav` | Server | `components/sections/nav/sticky-nav-rm/StickyNav.tsx` |
| -- `NavClient` | **Client** | `components/sections/nav/sticky-nav-rm/NavClient.tsx` |
| ---- `NavHeaderActions` | **Client** | `components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx` |
| ---- `NavMobileOverlay` | **Client** | `components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx` |
| -- `NavDesktopMenu` | **Client** | `components/sections/nav/sticky-nav-rm/NavDesktopMenu.tsx` |
| -- `NavItemVisual` | Server | `components/sections/nav/sticky-nav-rm/NavItemVisual.tsx` |
| -- `NavPressable` | **Client** | `components/sections/nav/sticky-nav-rm/NavPressable.tsx` |

### `TertiaryActionsStrip`
Server component. Uses `RippleCtaLink` (client) for each action button.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `TertiaryActionsStrip` | Server | `components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx` |
| -- `RippleCtaLink` | **Client** | `components/ui/ripple-cta-link/RippleCtaLink.tsx` |

### `FinancingOffersSplit`
Server component. Contains a client countdown chip.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `FinancingOffersSplit` | Server | `components/sections/page/financing-offers-split/FinancingOffersSplit.tsx` |
| -- `CountdownChip` | **Client** | `components/sections/page/financing-offers-split/CountdownChip.tsx` |

### `ProgramCards`
Server component with client CTA links.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `ProgramCards` | Server | `components/sections/page/program-cards/ProgramCards.tsx` |
| -- `RippleCtaLink` | **Client** | `components/ui/ripple-cta-link/RippleCtaLink.tsx` |

### `BrandMarquee`
Fully client component (IntersectionObserver for auto-play).

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `BrandMarquee` | **Client** | `components/sections/page/brand-marquee/BrandMarquee.tsx` |

### `PurchaseAndTermsSection`
Server component with two client sub-components.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `PurchaseAndTermsSection` | Server | `components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx` |
| -- `PurchaseSourceGrid` | **Client** | `components/sections/page/purchase-source-grid/PurchaseSourceGrid.tsx` |
| -- `TermLengthSlider` | **Client** | `components/sections/page/term-length-slider/TermLengthSlider.tsx` |

### `ContentImageSplit`
Fully server component.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `ContentImageSplit` | Server | `components/sections/page/content-image-split/ContentImageSplit.tsx` |

### `TrustBridge`
Fully server component.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `TrustBridge` | Server | `components/sections/page/trust-bridge/TrustBridge.tsx` |

### `EquipmentDealsSection`
Fully server component.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `EquipmentDealsSection` | Server | `components/sections/page/equipment-deals/EquipmentDealsSection.tsx` |

### `FaqSection`
Server component wrapping a client accordion.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `FaqSection` | Server | `components/sections/page/faq/FaqSection.tsx` |
| -- `FAQ` | **Client** | `components/sections/page/faq/FAQ.tsx` |

### `FinancingFootnotes`
Fully server component.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `FinancingFootnotes` | Server | `components/sections/page/financing-footnotes/FinancingFootnotes.tsx` |

### `EquipmentClosingCta`
Server component with client CTA.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `EquipmentClosingCta` | Server | `components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx` |
| -- `RippleCtaLink` | **Client** | `components/ui/ripple-cta-link/RippleCtaLink.tsx` |

### `RelatedLinksStrip`
Fully server component.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `RelatedLinksStrip` | Server | `components/sections/page/related-links-strip/RelatedLinksStrip.tsx` |

### `JsonLd`
Fully server component (renders `<script type="application/ld+json">`).

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `JsonLd` | Server | `components/shared/JsonLd.tsx` |

### `Footer`
Fully server component.

| Component | Server / Client | Location |
|-----------|----------------|----------|
| `Footer` | Server | `components/sections/page/footer/Footer.tsx` |

---

## Client Component Summary

Only these components ship JavaScript to the browser:

| Client Component | Location |
|-----------------|----------|
| `DrawerProvider` | `components/ui/pre-approval-drawer/DrawerContext.tsx` |
| `NavClient` | `components/sections/nav/sticky-nav-rm/NavClient.tsx` |
| `NavHeaderActions` | `components/sections/nav/sticky-nav-rm/NavHeaderActions.tsx` |
| `NavMobileOverlay` | `components/sections/nav/sticky-nav-rm/NavMobileOverlay.tsx` |
| `NavDesktopMenu` | `components/sections/nav/sticky-nav-rm/NavDesktopMenu.tsx` |
| `NavPressable` | `components/sections/nav/sticky-nav-rm/NavPressable.tsx` |
| `FramedTileSelector` | `components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx` |
| `FramedSelectionTile` | `components/sections/heroes/hero-convert-framed/FramedSelectionTile.tsx` |
| `HeroGallery` | `components/sections/heroes/hero-convert-framed/HeroGallery.tsx` |
| `RippleCtaLink` | `components/ui/ripple-cta-link/RippleCtaLink.tsx` |
| `CountdownChip` | `components/sections/page/financing-offers-split/CountdownChip.tsx` |
| `BrandMarquee` | `components/sections/page/brand-marquee/BrandMarquee.tsx` |
| `PurchaseSourceGrid` | `components/sections/page/purchase-source-grid/PurchaseSourceGrid.tsx` |
| `TermLengthSlider` | `components/sections/page/term-length-slider/TermLengthSlider.tsx` |
| `FAQ` | `components/sections/page/faq/FAQ.tsx` |

Everything else is a server component.
