# hero-convert-framed

Framed Selector Deck variant of the conversion hero — tiles + CTA wrapped in a contained card with visible labels and larger icons.

## Usage

```tsx
import { HeroConvertFramed } from "@/components/sections/heroes/hero-convert-framed";
import type { HeroConvertFramedConfig } from "@/components/sections/heroes/hero-convert-framed";

<HeroConvertFramed config={heroConfig} />
```

## Props — `HeroConvertFramed`

| Prop | Type | Description |
|---|---|---|
| `config` | `HeroConvertFramedConfig` | Framed-hero config with local rollback-specific fields for gallery, footnotes, and structured tertiary actions |

## Optional Config Fields

| Field | Type | Description |
|---|---|---|
| `tertiaryVariant` | `"link" \| "outline"` | When `"outline"`, renders tertiary links as outline CTA cards |
| `footnoteMarkers` | `Record<string, string>` | Maps body copy substrings to superscript markers (e.g. `{ "30 seconds": "¹" }`) |
| `tertiaryActions` | `[HeroTertiaryAction, HeroTertiaryAction]` | Explicit two-card tertiary action model used by rollback financing |
| `galleryImages` | `HeroGalleryImage[]` | Optional desktop gallery images shown beside the hero body |
| `microcopy` | `string?` | When omitted, no microcopy `<p>` is rendered (no DOM node) |
| `disclaimer` | `string?` | When omitted, no disclaimer `<p>` is rendered (no DOM node) |

## Differences from `hero-convert-geico`

- Tile selector wrapped in a `rounded-3xl` card frame with border and shadow
- Tile labels are visible (not sr-only)
- Tiles are taller with more padding (`p-4 sm:p-6`, `min-h-[5.5rem] sm:min-h-32`)
- Grid stacks to single column on mobile (`grid-cols-1 sm:grid-cols-2`)
- Left column has more breathing room (`gap-5 sm:gap-6 lg:gap-8`)
- Uses primitive tile icon metadata (`iconSrc`, `iconWidth`, `iconHeight`) instead of JSX-in-config
- Supports outline tertiary CTA cards with explicit `tertiaryActions`
- Supports desktop gallery images and footnote markers as framed-hero-only fields

## Server/Client Boundary

- `HeroConvertFramed.tsx` — server component (no "use client")
- `FramedTileSelector.tsx` — client component ("use client") — handles interactive tile selection
- `FramedSelectionTile.tsx` — rendered inside FramedTileSelector's client boundary

## Dependencies

- Reuses the shared base hero fields from `hero-convert-geico/config.ts` but owns its rollback-specific extension type locally
- `RippleCtaLink`, `DRAWER_HASH` from shared UI
- `next/image` for primitive tile and gallery assets
