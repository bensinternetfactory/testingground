# financing-offers-split

Hero-style split section showing two prominent financing offer halves with vertical/horizontal divider.

## Usage

```tsx
import { FinancingOffersSplit } from "@/components/sections/page/financing-offers-split";

<FinancingOffersSplit config={config.financingOffers} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `FinancingOffersSplitConfig` | Left and right offer half configurations |

## Config Shape — `FinancingOffersSplitConfig`

| Field | Type | Description |
|---|---|---|
| `left` | `FinancingOfferHalf` | Left/top offer content |
| `right` | `FinancingOfferHalf` | Right/bottom offer content |

### `FinancingOfferHalf`

| Field | Type | Description |
|---|---|---|
| `headline` | `string` | Large offer headline |
| `body` | `string` | Supporting body copy |
| `iconSrc` | `string` | Path to icon asset |
| `iconAlt` | `string` | Icon alt text |
| `iconWidth` | `number` | Icon width in pixels |
| `iconHeight` | `number` | Icon height in pixels |
| `countdown?` | `CountdownConfig` | Optional countdown chip (top-right of offer) |
| `learnMoreLink?` | `LearnMoreLink` | Optional text-style link at bottom of offer |

### `CountdownConfig`

| Field | Type | Description |
|---|---|---|
| `anchorDate` | `string` | ISO date string for countdown start |
| `initialWindowDays` | `number` | Days in the initial countdown window |
| `autoReset` | `boolean` | If true, restart in 30-day cycles after expiry |

### `LearnMoreLink`

| Field | Type | Description |
|---|---|---|
| `text` | `string` | Link text |
| `href` | `string` | Navigation destination |

## Server/Client Boundary

- `FinancingOffersSplit.tsx` — server component (shell + layout)
- `CountdownChip.tsx` — client component (`"use client"`, computes days remaining)

## Dependencies

- `next/image` for icon rendering
- `next/link` for learn-more link
- `lucide-react` for ArrowRight icon
- Local config types from `config.ts`
