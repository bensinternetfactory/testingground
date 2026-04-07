# hero-convert-framed

Framed Selector Deck hero family for equipment financing pages. This folder now exposes explicit tertiary variants instead of switching between card/link modes inside one shared config.

## Usage

```tsx
import {
  HeroConvertFramed,
  HeroConvertFramedOutline,
  HeroConvertFramedPrimaryOnly,
  HeroConvertFramedTileRight,
} from "@/components/sections/heroes/hero-convert-framed";
```

## Variants

| Component | Use for |
|---|---|
| `HeroConvertFramed` | Text-link tertiary variant |
| `HeroConvertFramedOutline` | Outline-card tertiary variant |
| `HeroConvertFramedPrimaryOnly` | No-tertiary rollback hero variant |
| `HeroConvertFramedTileRight` | Headline/body left, framed 2x2 tile selector right (no image/gallery) |

## Differences from `hero-convert-geico`

- Tile selector wrapped in a `rounded-3xl` card frame with border and shadow
- Tile labels are visible (not sr-only)
- Tiles are taller with more padding (`p-4 sm:p-6`, `min-h-[5.5rem] sm:min-h-32`)
- Grid stacks to single column on mobile (`grid-cols-1 sm:grid-cols-2`) unless `gridCols="fixed-2"` is passed (always 2 cols)
- Left column has more breathing room (`gap-5 sm:gap-6 lg:gap-8`)
- Uses primitive tile icon metadata (`iconSrc`, `iconWidth`, `iconHeight`) instead of JSX-in-config
- All variants support desktop gallery images and footnote markers
- Outline tertiary cards live in `HeroConvertFramedOutline.tsx`
- Primary-only rollback hero lives in `HeroConvertFramedPrimaryOnly.tsx`

## Server/Client Boundary

- `HeroConvertFramed.tsx` — server component
- `HeroConvertFramedOutline.tsx` — server component
- `HeroConvertFramedPrimaryOnly.tsx` — server component
- `HeroConvertFramedTileRight.tsx` — server component
- `FramedTileSelector.tsx` — client component ("use client") — handles interactive tile selection and now renders its primary CTA through canonical `LeadCta` / `CtaLink` surfaces
- `FramedSelectionTile.tsx` — rendered inside FramedTileSelector's client boundary

## Dependencies

- Reuses the shared base hero fields from `hero-convert-geico/config.ts`
- `HeroConvertFramedOutline.tsx` now renders its tertiary cards through canonical `LeadCta` / `CtaLink` surfaces while preserving the existing custom children layout
- `FramedTileSelector.tsx` preserves the disabled pre-selection button path, then upgrades to canonical pre-approval CTA attributes once a tile is selected
- `next/image` for primitive tile and gallery assets
