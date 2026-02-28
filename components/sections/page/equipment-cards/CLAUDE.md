# equipment-cards

Grid of equipment category cards with icons, descriptions, and links. Used to showcase financing options by truck type.

## Usage

```tsx
import { EquipmentCards, EQUIPMENT_CARDS_CONFIG } from "@/components/sections/page/equipment-cards";
import Image from "next/image";

// Icons are injected at the page level — the component is icon-agnostic
const CARD_ICONS: Record<string, React.ReactNode> = {
  rollback: <Image src="/truck-icons/rollback.svg" alt="Rollback" width={150} height={43} className="h-6 w-auto" />,
  // ...
};

const config = {
  ...EQUIPMENT_CARDS_CONFIG,
  cards: EQUIPMENT_CARDS_CONFIG.cards.map((card) => ({
    ...card,
    icon: CARD_ICONS[card.id],
  })),
};

<EquipmentCards config={config} />
```

## Props — `EquipmentCards`

| Prop | Type | Description |
|---|---|---|
| `config` | `EquipmentCardsConfig` | Full config object (see `config.ts` for shape) |

## Config Shape — `EquipmentCardData`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique card identifier (used for icon injection) |
| `title` | `string` | Card heading |
| `description` | `string` | Short description text |
| `icon` | `ReactNode` | Icon element (decoupled — passed by consumer) |
| `iconClassName` | `string?` | Optional extra classes on the icon wrapper |
| `linkText` | `string` | CTA link label |
| `linkHref` | `string` | CTA link destination |

## Icon Decoupling Pattern

Icons are **not** imported inside this component. Instead, the consumer page:
1. Imports icon components (e.g., `next/image` with SVGs from `public/brand-assets/`)
2. Creates a map: `{ rollback: <Image ... />, wrecker: <Image ... /> }`
3. Spreads icons onto the config cards before passing to `<EquipmentCards>`

This keeps the component portable without coupling to specific icon sets.

## Server/Client Boundary

- `EquipmentCards.tsx` — server component (no `"use client"`)
- `config.ts` — server-safe data (can be imported anywhere)

No client boundary needed — the component is entirely static with no interactivity.

## Vercel React Best Practices

- `rendering-hoist-jsx` — `ArrowIcon` is hoisted at module level (avoids re-creation)
- `server-serialization` — pure server component, no client JS shipped
- `rendering-svg-precision` — arrow SVG uses integer coordinates
