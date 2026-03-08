# truck-gallery

Mobile-only mosaic gallery of tow truck photos. Acts as a visual break between Equipment Cards (`#F5F5F5`) and Programs (white). Hidden at `md` (768px+).

## Usage

```tsx
import {
  TruckGalleryHeroLeft,
  TruckGalleryHeroRight,
  TRUCK_GALLERY_CONFIG,
  TRUCK_GALLERY_CONFIG_ALT,
} from "@/components/sections/page/truck-gallery";

<TruckGalleryHeroLeft config={TRUCK_GALLERY_CONFIG} sectionId="truck-gallery-top" />
<TruckGalleryHeroRight config={TRUCK_GALLERY_CONFIG_ALT} sectionId="truck-gallery-after-miniroi" />
```

## Props — `TruckGallery`

| Prop | Type | Description |
|---|---|---|
| `config` | `TruckGalleryConfig` | Full config object (see `config.ts` for shape) |
| `layoutVariant` | `"hero-left" \| "hero-right"` | Controls where the large hero image appears. Default: `"hero-left"` |
| `sectionId` | `string` | Optional section id for in-page semantics. No default id is injected. |
| `decorative` | `boolean` | If `true`, section is hidden from assistive tech and all image alt text is forced to empty. Default: `false` |
| `ariaLabel` | `string` | Landmark label for contentful mode (`decorative={false}` only). |
| `heroLoading` | `"lazy" \| "eager"` | Loading strategy for the hero image. Default: `"lazy"` |

## Variant Wrappers

| Component | Defaults |
|---|---|
| `TruckGalleryHeroLeft` | `layoutVariant="hero-left"`, `decorative={true}`, `sectionId="truck-gallery-hero-left"` |
| `TruckGalleryHeroRight` | `layoutVariant="hero-right"`, `decorative={true}`, `sectionId="truck-gallery-hero-right"` |

## Config Shape — `TruckGalleryConfig`

| Field | Type | Description |
|---|---|---|
| `hero` | `TruckGalleryImage` | Large feature image (left or right based on `layoutVariant`) |
| `grid` | `[TruckGalleryImage, TruckGalleryImage, TruckGalleryImage, TruckGalleryImage]` | 4 smaller grid images |

## Config Shape — `TruckGalleryImage`

| Field | Type | Description |
|---|---|---|
| `src` | `string` | Image path (relative to `public/`) |
| `alt` | `string` | Alt text for accessibility |

## Layout Variants

```
+-------------------------+------------+------------+
|                         |  grid[0]   |  grid[1]   |
|       hero (~50%)       +------------+------------+
|                         |  grid[2]   |  grid[3]   |
+-------------------------+------------+------------+
```

- `hero-left`: `grid-cols-[50fr_25fr_25fr]`
- `hero-right`: `grid-cols-[25fr_25fr_50fr]`
- 2 rows with the hero spanning both rows
- `aspect-[5/3]` on the container
- Hero image: `row-span-2`, placed left or right by variant
- All images: `fill` + `object-cover`, no gaps, no rounded corners

## Server/Client Boundary

- `TruckGallery.tsx` — server component (no `"use client"`)
- `config.ts` — server-safe data (can be imported anywhere)
- `utils.ts` — runtime guards (safe normalization for grid data)

No client boundary needed — the component is entirely static with no interactivity.
