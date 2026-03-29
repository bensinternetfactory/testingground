# hero-gallery

Centered-text hero with currency input field and two staggered rows of tow truck photos that fade into the next section.

## Usage

```tsx
import { HeroGallery, HERO_GALLERY_CONFIG } from "@/components/sections/heroes/hero-gallery";

<HeroGallery config={HERO_GALLERY_CONFIG} />
```

## Props — `HeroGallery`

| Prop | Type | Description |
|---|---|---|
| `config` | `HeroGalleryConfig` | Full config object (see `config.ts`) |

### `HeroGalleryConfig`

| Property | Type | Required | Description |
|---|---|---|---|
| `headline` | `string` | yes | Primary heading text (centered) |
| `subheadline` | `string` | yes | Supporting text below headline |
| `inputPlaceholder` | `string` | yes | Placeholder for the desktop currency input |
| `ctaLabel` | `string` | yes | Label for the input's submit button |
| `mobileCta` | `{ label, href }` | yes | Mobile-only CTA button (replaces input) |
| `images.row1` | `string[]` | yes | First row of truck image paths |
| `images.row2` | `string[]` | yes | Second row of truck image paths (offset) |

## Server/Client Boundary

- `HeroGallery.tsx` — server component (layout, images, text)
- `HeroInput.tsx` — **client component** (`"use client"`) for interactive currency input
- `config.ts` — server-safe data

## Dependencies

- `next/image` — truck gallery images
- `@/components/ui/ripple-cta-link` — mobile CTA button
