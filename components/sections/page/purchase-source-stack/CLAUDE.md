# purchase-source-stack

Animated card carousel showing financing sources with mock listing cards and depth-stacked rotation.

## Usage

```tsx
import { PurchaseSourceStack } from "@/components/sections/page/purchase-source-stack";

<PurchaseSourceStack config={config.purchaseAndTerms.purchaseStack} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `PurchaseSourceStackConfig` | Stack configuration with headline, body, cards, and rotation interval |

## Config Shape — `PurchaseSourceStackConfig`

| Field | Type | Description |
|---|---|---|
| `headline` | `string` | Column headline |
| `body` | `string` | Supporting paragraph |
| `cards` | `PurchaseSourceCard[]` | Array of source cards |
| `rotationIntervalMs` | `number` | Auto-rotation interval in ms |

### `PurchaseSourceCard`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique card identifier |
| `sourceName` | `string` | Source name (e.g. "Authorized Retailers") |
| `sourceSubtitle` | `string` | Subtitle text |
| `iconSrc` | `string` | Path to source icon |
| `iconAlt` | `string` | Icon alt text |
| `badgeLabel` | `string` | Badge text (e.g. "For Sale") |
| `sampleListing` | `string` | Sample truck listing description |
| `samplePrice` | `string` | Sample price string |

## Accessibility

- `aria-roledescription="carousel"` on container
- `role="group"` with `aria-roledescription="slide"` per card
- `aria-live="polite"` on controls region
- Keyboard navigation: ArrowLeft/ArrowRight
- Pause on hover/focus
- `prefers-reduced-motion: reduce` renders static list

## Server/Client Boundary

- `PurchaseSourceStack.tsx` — client component (`"use client"`)

## Dependencies

- `next/image` for source icons
- `lucide-react` for ChevronLeft/ChevronRight
- Type imports from `equipment-page-config`
