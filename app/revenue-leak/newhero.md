# Plan: A/B Test Hero — GEICO Quote-Start Pattern

## Context

The current revenue-leak page uses a rotating image arc hero (`HeroSection`). We need a second hero variant for A/B testing that mirrors GEICO's "quote start" pattern: a two-column layout with headline + equipment type selector tiles on the left, and a hero truck image on the right. This hero drives equipment-type selection as a micro-commitment before CTA click.

create a new hero component to test out.
---

## New Files (3)

### 1. `components/sections/revenue-leak/hero-quote-start-config.ts` (~60 lines)

Config data file following the exact pattern of `hero-config.ts`. Contains:
- `headline`: "Tow Truck Financing Built for Your Business"
- `bodyCopy`: "See what you may qualify for\u2026" *(use proper ellipsis character, not three dots)*
- `tiles`: 6 equipment types (Flatbed/Rollback, Wrecker/Heavy-Duty, Wheel-Lift, Carrier/Multi-Car, Repo/Snatch Truck, Fleet Expansion/Upfit) — each with `id`, `label`, and inline SVG `iconPath`
- `cta`: { label: "Check Your Options", href: "#pre-approve" }
- `tertiaryLinks`: "Continue Your Saved Application" + "Talk to a Specialist"
- `viewAllLink`: "View All Equipment Types"
- `microcopy`: "Checking won't affect your credit score."
- `disclaimer`: "Subject to credit review..."
- `heroImage`: static import of `truck-1.jpg` (blur placeholder + CLS prevention)
- `heroImageAlt`: "Flatbed tow truck ready for financing" *(descriptive alt text — not decorative)*
- TypeScript interface `HeroQuoteStartConfig` exported for the component (include `heroImageAlt: string`)

### 2. `components/sections/revenue-leak/EquipmentTile.tsx` (~50 lines)

Selectable tile button for equipment type selection:
- Wrap in `React.memo` to skip re-renders on unselected tiles
- `<button>` element (not `<a>`) with `aria-pressed` for selection state
- Add `style={{ touchAction: "manipulation" }}` to eliminate 300ms tap delay on mobile
- Props: `id`, `label`, `iconPath`, `selected`, `onSelect`
- Default: `shadow-[inset_0_0_0_1px_#E9E9E9]` (RM inset border pattern)
- Selected: `shadow-[inset_0_0_0_2px_#111111]` + `bg-[#F5F5F5]`
- Hover: use `transition-shadow duration-200` (NOT `transition` or `transition-all`) + `hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]`
- Icon in a tinted circle (`bg-[#FBF0F6]`) + label
- Focus: `focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2`
- Uses `cn` from `@/lib/utils` for conditional classes

```tsx
import { memo } from "react";

export const EquipmentTile = memo(function EquipmentTile({
  id, label, iconPath, selected, onSelect,
}: EquipmentTileProps) {
  return (
    <button
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      style={{ touchAction: "manipulation" }}
      className={cn(
        "transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2",
        "hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
        selected
          ? "shadow-[inset_0_0_0_2px_#111111] bg-[#F5F5F5]"
          : "shadow-[inset_0_0_0_1px_#E9E9E9]"
      )}
    >
      {/* icon circle + label */}
    </button>
  );
});
```

### 3. `components/sections/revenue-leak/HeroQuoteStart.tsx` — SERVER Component (~100 lines)

**No `"use client"`** — this is a server component that renders static content and delegates interactivity to `TileSelector`.

- **Layout**: `grid grid-cols-1 lg:grid-cols-2 gap-12` inside `max-w-7xl`

**Left column** (top to bottom):
1. H1 headline — `text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-medium` + `style={{ textWrap: "balance" }}` to prevent widows
2. Body copy — `text-lg text-[#545454]`
3. `<TileSelector>` client island (see file 3b below) — receives only `tiles`, `cta`, `viewAllLink`
4. Microcopy — `text-sm text-[#545454]`
5. Tertiary links — underlined text links in a row
6. Legal disclaimer — `text-xs text-[#999]`

**Right column** (desktop only):
- `next/image` with `placeholder="blur"`, `priority`, `rounded-3xl`
- `sizes="(min-width: 1024px) 50vw, 0px"` — prevents large image download on mobile where it's hidden
- `alt={config.heroImageAlt}` — descriptive alt text from config
- Hidden on mobile/tablet via `hidden lg:block`

```tsx
// HeroQuoteStart.tsx (Server Component — no "use client")
import Image from "next/image";
import { TileSelector } from "./TileSelector";
import type { HeroQuoteStartConfig } from "./hero-quote-start-config";

export function HeroQuoteStart({ config }: { config: HeroQuoteStartConfig }) {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <div>
          <h1 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-medium"
              style={{ textWrap: "balance" }}>
            {config.headline}
          </h1>
          <p className="text-lg text-[#545454]">{config.bodyCopy}</p>

          {/* Only interactive part crosses the RSC boundary */}
          <TileSelector
            tiles={config.tiles}
            cta={config.cta}
            viewAllLink={config.viewAllLink}
          />

          <p className="text-sm text-[#545454]">{config.microcopy}</p>
          {/* tertiary links, disclaimer — static server HTML */}
        </div>
        <div className="hidden lg:block">
          <Image
            src={config.heroImage}
            alt={config.heroImageAlt}
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 50vw, 0px"
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
```

### 3b. `components/sections/revenue-leak/TileSelector.tsx` — CLIENT Component (~60 lines)

`"use client"` — thin client island that owns tile selection state. Only `tiles`, `cta`, and `viewAllLink` cross the RSC boundary (no heavy image data serialized).

- **State**: `selectedTile` (string | null) — must initialize as `null` (not from URL/localStorage) to preserve hydration safety
- **CTA href**: appends `?equipment={selectedTile}` when a tile is selected
- **aria-live region**: announces tile selection to screen readers

```tsx
"use client";
import { useState } from "react";
import { EquipmentTile } from "./EquipmentTile";

export function TileSelector({ tiles, cta, viewAllLink }) {
  // Initial value MUST be null (not read from URL/localStorage) to avoid hydration mismatch
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const href = selectedTile
    ? `${cta.href}?equipment=${selectedTile}`
    : cta.href;

  return (
    <>
      <div role="group" aria-label="Equipment types" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <EquipmentTile
            key={tile.id}
            {...tile}
            selected={selectedTile === tile.id}
            onSelect={setSelectedTile}
          />
        ))}
      </div>

      {/* Screen reader announcement for tile selection */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {selectedTile
          ? `${selectedTile} selected. The Check Your Options button will include this equipment type.`
          : ""}
      </div>

      {/* View all link */}
      <a href="#" className="underline">{viewAllLink}</a>

      {/* Primary CTA */}
      <a href={href} className="block w-full sm:w-auto rounded-full bg-[#111111] text-white text-center px-8 py-4">
        {cta.label}
      </a>
    </>
  );
}
```

---

## Modified Files (2)

### 4. `components/sections/revenue-leak/index.ts` — add 2 export lines
```
export { HeroQuoteStart } from "./HeroQuoteStart";
export { TileSelector } from "./TileSelector";
```

### 5. `app/revenue-leak/page.tsx` — swap hero
- Import `HeroQuoteStart` **directly from its source file** (not through barrel) to avoid bloating other barrel consumers with the client boundary:
  ```tsx
  import { HeroQuoteStart } from "@/components/sections/revenue-leak/HeroQuoteStart";
  import { HERO_QUOTE_START_CONFIG } from "@/components/sections/revenue-leak/hero-quote-start-config";
  ```
- Replace `<HeroSection>` block (lines 36-41) with `<HeroQuoteStart config={HERO_QUOTE_START_CONFIG} />`
- Remove unused imports (`HERO_CONFIG`, `HeroTile`, `HeroSection`)
- Keep all other sections unchanged

---

## Key Patterns Reused

| Pattern | Source | Reuse |
|---------|--------|-------|
| `cn()` utility | `lib/utils.ts` | Conditional tile classes |
| Inset border shadows | RM style guide §5, §6 | Tile default/selected states |
| Pill buttons | RM style guide §6 | Primary CTA |
| Static image import | `hero-config.ts` | Hero image with blur placeholder |
| Config + component split | `hero-config.ts` / `HeroSection.tsx` | Same pattern, new variant |
| `"use client"` + useState | `HeroSection.tsx`, `GuideBuilder.tsx` | Tile selection interactivity (pushed down to `TileSelector` client island) |
| Server/client split | `StickyNav.tsx` / `NavClient.tsx` | Same wrapper pattern — server renders static content, client handles interactivity |
| Inline SVG icon paths | `NavClient.tsx`, `FinancingCards.tsx` | Equipment tile icons |

---

## Design Decisions

- **No equipment cost input** — spec marks it optional; omitting reduces complexity and keeps focus on the tile micro-commitment pattern
- **No framer-motion** — this hero has no animated phrases or rotating elements, so no motion dependency needed
- **Tiles are buttons, not links** — they control selection state, not navigation; CTA handles navigation
- **Image hidden on mobile** — matches GEICO's pattern; mobile gets a stacked single-column with content only. Use CSS `hidden lg:block` (NOT JS conditional rendering) to avoid hydration mismatches
- **Server/client split** — `HeroQuoteStart` is a server component; only `TileSelector` is `"use client"`. This avoids serializing the heavy `StaticImageData` blur URL across the RSC boundary and keeps headline, body, image, microcopy, and disclaimer as zero-JS server HTML
- **Direct imports over barrel** — page imports `HeroQuoteStart` directly from its source file to avoid bloating every barrel consumer with the client boundary
- **Tile selection is ephemeral** — `selectedTile` initializes as `null` via `useState`, not read from URL. If deep-link support is needed for marketing campaigns, sync to URL via `window.history.replaceState` (see "Future Considerations" below)

---

## Verification

1. `npm run dev` — load `/revenue-leak`, confirm the new hero renders
2. Visual check: two-column layout on desktop, single column on mobile
3. Click tiles: verify selection styling toggles, only one selected at a time
4. Click CTA with tile selected: confirm URL includes `?equipment=` param
5. Click CTA with no tile: confirm it still navigates to `#pre-approve`
6. Keyboard nav: Tab through tiles, verify focus rings, Enter/Space selects
7. Screen reader: verify `aria-live` region announces tile selection
8. Reduced motion: enable `prefers-reduced-motion: reduce` and confirm tile hover transitions are disabled
9. Mobile: confirm hero image is NOT downloaded (check Network tab — `sizes="0px"` should select smallest srcset)
10. `npm run build` — confirm no TypeScript or build errors
11. `npm run lint` — confirm no lint violations

---

## New File Count (Revised)

Original plan: 3 new files + 2 modified. After audit: **4 new files** + 2 modified + 1 CSS update.

| # | File | Type |
|---|------|------|
| 1 | `hero-quote-start-config.ts` | New (config) |
| 2 | `EquipmentTile.tsx` | New (client component) |
| 3 | `HeroQuoteStart.tsx` | New (server component) |
| 3b | `TileSelector.tsx` | New (client island) |
| 4 | `index.ts` | Modified (add exports) |
| 5 | `page.tsx` | Modified (swap hero, direct imports) |
| 6 | `globals.css` | Modified (add `[aria-pressed]` to reduced-motion rule) |

---

## CSS Update Required

Add tile buttons to the existing `prefers-reduced-motion` rule in `app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .arc-thumbnail,
  .arc-thumbnail-inner,
  .hamburger-bar,
  .mobile-overlay,
  .accordion-content,
  [data-slot="navigation-menu-viewport"],
  [data-slot="navigation-menu-content"],
  /* HeroQuoteStart equipment tiles */
  [aria-pressed] {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Future Considerations

- **URL-synced tile selection**: If marketing needs deep-links to pre-selected equipment types (e.g., `/revenue-leak?equipment=flatbed`), add `window.history.replaceState` on tile selection. This was flagged by the audit but deferred since the A/B test may intentionally avoid URL pollution before CTA click.
- **Error boundary**: No `app/revenue-leak/error.tsx` exists for this route segment. Consider adding one for graceful error recovery (pre-existing gap, not introduced by this plan).

---

## Legend Manager — Unified Audit Report

### Overview

All three legends ran against this plan: NextLegend (Next.js conventions, 11 categories), ReactLegend (React performance, 8 categories), and WebLegend (web interface guidelines, 13 categories). The plan was architecturally sound — it reused established codebase patterns, made good semantic choices, and avoided unnecessary dependencies. The audit surfaced 4 Critical, 3 Major, and 6 Minor findings. **All findings have been applied to the plan above.**

### Critical (Applied)

- [x] **RSC Boundary / Serialization / Re-renders** — Split `HeroQuoteStart` into server wrapper + `TileSelector` client island. *Flagged by: next-legend, react-legend*
- [x] **Missing `aria-live` for tile selection** — Added live region in `TileSelector`. *Flagged by: web-legend*
- [x] **Missing hero image alt text** — Added `heroImageAlt` field to config interface. *Flagged by: next-legend, web-legend*
- [x] **Barrel file import bloat** — Changed to direct imports in `page.tsx`. *Flagged by: react-legend*

### Major (Applied)

- [x] **Image `sizes` + `priority` on hidden image** — Changed to `sizes="(min-width: 1024px) 50vw, 0px"`. *Flagged by: next-legend, web-legend*
- [x] **`prefers-reduced-motion` for tile transitions** — Added `[aria-pressed]` to globals.css rule + use `transition-shadow` specifically. *Flagged by: web-legend*
- [x] **URL state persistence** — Documented as intentional deferral for A/B test; added to Future Considerations. *Flagged by: web-legend*

### Minor (Applied)

- [x] **`React.memo` on `EquipmentTile`** — Applied in component spec. *Flagged by: react-legend*
- [x] **Hydration safety comment** — Added to `TileSelector` state initialization. *Flagged by: next-legend*
- [x] **Proper ellipsis `\u2026`** — Fixed in config body copy. *Flagged by: web-legend*
- [x] **`text-wrap: balance` on H1** — Added to headline spec. *Flagged by: web-legend*
- [x] **`touch-action: manipulation`** — Added to `EquipmentTile` buttons. *Flagged by: web-legend*
- [x] **No `error.tsx` boundary** — Documented in Future Considerations (pre-existing). *Flagged by: next-legend*

### Passing

- [x] Async Patterns (next-legend): No async APIs, no `params`/`searchParams` concerns
- [x] Data Patterns (next-legend): Static config, no fetching, correct config/component split
- [x] Error Handling (next-legend): No redirect/notFound/server actions introduced
- [x] Hydration Safety (next-legend + react-legend + web-legend): `useState(null)` is deterministic
- [x] File Conventions (next-legend): Correct placement, barrel export, no naming conflicts
- [x] Font & Script (next-legend): No new fonts or scripts
- [x] No New Dependencies (react-legend): No framer-motion, no third-party libs
- [x] Waterfall Prevention (react-legend): No async, no Suspense, no sequential fetches
- [x] JS Performance (react-legend): 6-item static array, no costly operations
- [x] Focus States (web-legend): `focus-visible:ring-2` with offset, matching codebase pattern
- [x] Semantics (web-legend): `<button>` for state, `<a>` for navigation
- [x] Content Handling (web-legend): Fixed tile count, short labels, grid handles flow
- [x] Dark Mode (web-legend): No theming concerns introduced
- [x] Anti-Patterns (web-legend): No `user-scalable=no`, no `div onClick`, no `outline-none`

### Combined Score (Post-Fix)

| Legend | Score | Max |
|---|---|---|
| NextLegend | 11 | 11 |
| ReactLegend | 8 | 8 |
| WebLegend | 13 | 13 |
| **Combined** | **32** | **32** |
