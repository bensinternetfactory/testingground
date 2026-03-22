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

## Server/Client Boundary

- `FinancingOffersSplit.tsx` — server component (no interactivity)

## Dependencies

- `next/image` for icon rendering
- Local config types from `config.ts`
