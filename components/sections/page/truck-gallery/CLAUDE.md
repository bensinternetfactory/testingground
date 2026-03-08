# truck-gallery

Mobile-only mosaic gallery of tow truck photos. Acts as a visual break between Equipment Cards (`#F5F5F5`) and Programs (white). Hidden at `md` (768px+).

## Usage

```tsx
import {
  TruckGallery,
  TRUCK_GALLERY_CONFIG,
  TRUCK_GALLERY_CONFIG_ALT,
} from "@/components/sections/page/truck-gallery";

<TruckGallery config={TRUCK_GALLERY_CONFIG} />
<TruckGallery config={TRUCK_GALLERY_CONFIG_ALT} layoutVariant="hero-right" />
```

## Props — `TruckGallery`

| Prop | Type | Description |
|---|---|---|
| `config` | `TruckGalleryConfig` | Full config object (see `config.ts` for shape) |
| `layoutVariant` | `"hero-left" \| "hero-right"` | Controls where the large hero image appears. Default: `"hero-left"` |
| `sectionId` | `string` | Section id for unique in-page semantics. Default: `"truck-gallery"` |
| `ariaLabel` | `string` | Landmark label for screen readers. Default: `"Tow truck photo gallery"` |

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

No client boundary needed — the component is entirely static with no interactivity.
