# hero-convert-geico

Split-layout conversion hero with selectable equipment tiles, CTA, and hero image.

## Usage

```tsx
import { HeroConvert, HERO_CONVERT_CONFIG } from "@/components/sections/heroes/hero-convert-geico";
import { RollbackIcon } from "@/app/truckicons/RollbackIcon";

// Icons are injected at the page level — the component is icon-agnostic
const config = {
  ...HERO_CONVERT_CONFIG,
  tiles: HERO_CONVERT_CONFIG.tiles.map((tile) => ({
    ...tile,
    icon: TILE_ICONS[tile.id],
  })),
};

<HeroConvert config={config} />
```

## Props — `HeroConvert`

| Prop | Type | Description |
|---|---|---|
| `config` | `HeroConvertConfig` | Full config object (see `config.ts` for shape) |

## Props — `SelectionTile`

| Prop | Type | Description |
|---|---|---|
| `id` | `string` | Unique tile identifier |
| `label` | `string` | Accessible label announced to assistive tech |
| `icon` | `ReactNode?` | Optional icon (decoupled — passed by consumer) |
| `selected` | `boolean` | Whether this tile is active |
| `onSelect` | `(id: string) => void` | Selection callback |

## Icon Decoupling Pattern

Icons are **not** imported inside this component. Instead, the consumer page:
1. Imports icon components (e.g., from `@/app/truckicons/`)
2. Creates a map: `{ rollback: <RollbackIcon className="w-20" />, ... }`
3. Spreads icons onto the config tiles before passing to `<HeroConvert>`

This keeps the hero component portable across projects without coupling to specific icon sets.

## Config Notes

- `viewAllLink` is optional; omit it to remove the hero-local utility link
- `tertiaryLinks` supports additional inline links below the main CTA
- `selectionPrompt` and `selectionRequiredMessage` control the visible truck-selection guidance around the interactive tiles
- `tiles` can be any length; the current UI renders them in a two-column grid

## Server/Client Boundary

- `HeroConvert.tsx` — server component (no "use client")
- `TileSelector.tsx` — client component ("use client") — handles interactive tile selection and now renders its primary CTA through canonical `LeadCta` / `CtaLink` surfaces while preserving the disabled pre-selection path
- `SelectionTile.tsx` — rendered inside TileSelector's client boundary
- `config.ts` — server-safe data (can be imported anywhere)

The RSC boundary is crossed at `<TileSelector>` inside `HeroConvert`.
