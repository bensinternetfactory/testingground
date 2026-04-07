# equipment-closing-cta

Dark closing CTA section used on equipment financing routes.

## Usage

```tsx
import { EquipmentClosingCta } from "@/components/sections/page/equipment-closing-cta";

<EquipmentClosingCta config={config.closingCta} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `EquipmentClosingCtaConfig` | Headline, body, CTA, and optional contact block |

## Server/Client Boundary

- `EquipmentClosingCta.tsx` — server component that wires the primary closing CTA to canonical `LeadCta` / `CtaLink`
- `EquipmentClosingCtaTrucks.tsx` — server component that wires each closing tile to canonical `LeadCta` / `CtaLink`
- `config.ts` — server-safe data (can be imported anywhere)

## Dependencies

- `next/image` — closing icon and truck tile artwork
- `@/features/cta/client` — canonical closing CTA surfaces
