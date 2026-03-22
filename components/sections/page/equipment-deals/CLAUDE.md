# equipment-deals

Reusable server component section for commercial equipment pages. Renders a concise "What We Finance" grid with a heading, short intro, and 3-5 deal cards.

## Props
- `config`: `EquipmentDealsSectionConfig`
  - `eyebrow?`: optional small label above the heading
  - `heading`: section headline
  - `intro?`: short supporting copy
  - `items`: array of deal cards with `title` and `description`

## Usage
```tsx
import { EquipmentDealsSection } from "@/components/sections/page/equipment-deals";
```

## Boundaries
- Server component only
- Pure presentational component, no client state or effects
