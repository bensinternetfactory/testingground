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

- `EquipmentClosingCta.tsx` — server component (`RippleCtaLink` handles client interaction internally)
