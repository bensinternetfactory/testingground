# hero-convert-framed

Framed Selector Deck variant of the conversion hero — tiles + CTA wrapped in a contained card with visible labels and larger icons.

## Usage

```tsx
import { HeroConvertFramed } from "@/components/sections/heroes/hero-convert-framed";
import type { HeroConvertConfig } from "@/components/sections/heroes/hero-convert-geico";

<HeroConvertFramed config={heroConfig} />
```

## Props — `HeroConvertFramed`

| Prop | Type | Description |
|---|---|---|
| `config` | `HeroConvertConfig` | Same config shape as `hero-convert-geico` (reuses its types) |

## Differences from `hero-convert-geico`

- Tile selector wrapped in a `rounded-3xl` card frame with border and shadow
- Tile labels are visible (not sr-only)
- Tiles are taller with more padding (`p-4 sm:p-6`, `min-h-[5.5rem] sm:min-h-32`)
- Grid stacks to single column on mobile (`grid-cols-1 sm:grid-cols-2`)
- Left column has more breathing room (`gap-5 sm:gap-6 lg:gap-8`)

## Server/Client Boundary

- `HeroConvertFramed.tsx` — server component (no "use client")
- `FramedTileSelector.tsx` — client component ("use client") — handles interactive tile selection
- `FramedSelectionTile.tsx` — rendered inside FramedTileSelector's client boundary

## Dependencies

- Reuses `HeroConvertConfig` and `SelectionTileData` types from `hero-convert-geico/config.ts`
- `RippleCtaLink`, `DRAWER_HASH` from shared UI
- `framer-motion`, `web-haptics` for tile interactions
