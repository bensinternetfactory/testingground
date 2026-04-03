# content-image-split

Two-column section with persuasive copy on the left and a truck image on the right. Provides a visual content break between dense financing sections.

## Usage

```tsx
import { ContentImageSplit } from "@/components/sections/page/content-image-split";

<ContentImageSplit config={config.contentImageSplit} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `ContentImageSplitConfig` | Section content and image |

## Config Shape — `ContentImageSplitConfig`

| Field | Type | Description |
|---|---|---|
| `eyebrow` | `string` | Green uppercase kicker (e.g. "ROLLBACK FINANCING") |
| `headline` | `string` | Section heading |
| `body` | `string` | 2-3 sentence paragraph |
| `imageSrc` | `StaticImageData` | Next.js static image import |
| `imageAlt` | `string` | Image alt text |

## Layout

- Light gray background (`bg-[#F5F5F5]`)
- Desktop: 2-col grid (~55/45 content/image), vertically centered
- Mobile: stacked — content first, image below
- Image uses `aspect-[4/3]` with rounded corners and `object-cover`

## Server/Client Boundary

- `ContentImageSplit.tsx` — server component (no `"use client"`)

## Dependencies

- `next/image` for optimized image rendering
- Local config types from `config.ts`
