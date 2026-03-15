# equipment-cards

Grid of equipment category cards with icons, descriptions, and CTA button-links. Used to showcase financing options by truck type.

## Usage

```tsx
import { EquipmentCards, EQUIPMENT_CARDS_CONFIG } from "@/components/sections/page/equipment-cards";

<EquipmentCards config={EQUIPMENT_CARDS_CONFIG} />
```

## Props -- `EquipmentCards`

| Prop | Type | Description |
|---|---|---|
| `config` | `EquipmentCardsConfig` | Full config object (see `config.ts` for shape) |

## Config Shape -- `EquipmentCardData`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique card identifier |
| `title` | `string` | Card heading |
| `description` | `string` | Short description text |
| `iconId` | union | Icon token resolved by the section |
| `iconClassName` | `string?` | Optional extra classes on the icon wrapper |
| `linkText` | `string` | CTA link label |
| `linkHref` | `string` | CTA link destination |

## Icon Resolution

Icons are resolved inside the section from `iconId`, so the author-facing config
stays serializable and page components do not need to rewrite card data.

## Server/Client Boundary

- `EquipmentCards.tsx` -- server component (no `"use client"`)
- Card content and layout are server-rendered
- CTA uses shared `RippleCtaLink` from `@/components/ui/ripple-cta-link` (client component) -- only the CTA interaction is client-side
- `config.ts` -- server-safe data (can be imported anywhere)

## CTA

Card CTAs are full-width pill buttons using shared `RippleCtaLink` (`size="sm"`). See `components/ui/ripple-cta-link/CLAUDE.md` for interaction details.

## Dependencies

- `@/components/ui/ripple-cta-link`
