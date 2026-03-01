# truck-gallery

Mobile-only mosaic gallery of tow truck photos. Acts as a visual break between Equipment Cards (`#F5F5F5`) and Programs (white). Hidden at `md` (768px+).

## Usage

```tsx
import { TruckGallery, TRUCK_GALLERY_CONFIG } from "@/components/sections/page/truck-gallery";

<TruckGallery config={TRUCK_GALLERY_CONFIG} />
```

## Props — `TruckGallery`

| Prop | Type | Description |
|---|---|---|
| `config` | `TruckGalleryConfig` | Full config object (see `config.ts` for shape) |

## Config Shape — `TruckGalleryConfig`

| Field | Type | Description |
|---|---|---|
| `hero` | `TruckGalleryImage` | Large left image (row-span-2) |
| `grid` | `[TruckGalleryImage, TruckGalleryImage, TruckGalleryImage, TruckGalleryImage]` | 4 smaller grid images |

## Config Shape — `TruckGalleryImage`

| Field | Type | Description |
|---|---|---|
| `src` | `string` | Image path (relative to `public/`) |
| `alt` | `string` | Alt text for accessibility |

## Layout

```
+-------------------------+------------+------------+
|                         |  grid[0]   |  grid[1]   |
|       hero (~50%)       +------------+------------+
|                         |  grid[2]   |  grid[3]   |
+-------------------------+------------+------------+
```

- 3-column CSS Grid: `grid-cols-[50fr_25fr_25fr]`, 2 rows
- `aspect-[5/3]` on the container
- Hero image: `row-span-2` (full height of left column)
- All images: `fill` + `object-cover`, no gaps, no rounded corners

## Server/Client Boundary

- `TruckGallery.tsx` — server component (no `"use client"`)
- `config.ts` — server-safe data (can be imported anywhere)

No client boundary needed — the component is entirely static with no interactivity.
