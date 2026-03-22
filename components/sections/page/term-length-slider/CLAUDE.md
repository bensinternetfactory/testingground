# term-length-slider

Interactive range slider mapping truck model year to maximum financing term length.

## Usage

```tsx
import { TermLengthSlider } from "@/components/sections/page/term-length-slider";

<TermLengthSlider config={config.purchaseAndTerms.termSlider} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `TermSliderConfig` | Slider configuration with lookup table and copy |

## Config Shape — `TermSliderConfig`

| Field | Type | Description |
|---|---|---|
| `headline` | `string` | Column headline |
| `subheading` | `string` | Secondary headline |
| `body` | `string` | Supporting paragraph |
| `iconSrc` | `string` | Path to icon asset |
| `iconAlt` | `string` | Icon alt text |
| `defaultYear` | `number` | Initial slider position |
| `lookupTable` | `TermLookupEntry[]` | Year-to-term mapping |

### `TermLookupEntry`

| Field | Type | Description |
|---|---|---|
| `minYear` | `number` | Start of year range |
| `maxYear` | `number` | End of year range |
| `maxTermMonths` | `number` | Maximum term in months |

## Behavior

- Slider range: 2000 to `currentYear + 1` (programmatic)
- `aria-valuetext` announces both year and term
- 44px touch target on the slider thumb in WebKit and Firefox
- Result displays in a bordered container

## Server/Client Boundary

- `TermLengthSlider.tsx` — client component (`"use client"`)

## Dependencies

- `next/image` for icon
- Local config types from `config.ts`
