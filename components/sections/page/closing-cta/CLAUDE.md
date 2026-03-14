# closing-cta

Reusable closing CTA section with benefit tiles, branded SVG icons, and a responsive primary CTA link.

## Usage

```tsx
import { ClosingCta, CLOSING_CTA_CONFIG } from "@/components/sections/page/closing-cta";

<ClosingCta config={CLOSING_CTA_CONFIG} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `ClosingCtaConfig` | Full config object (see `config.ts` for shape) |

## Config Shape — `ClosingCtaConfig`

| Field | Type | Description |
|---|---|---|
| `headline` | `string` | Section heading |
| `benefits` | `[ClosingCtaBenefit, ...ClosingCtaBenefit[]]` | Non-empty array of benefit tiles |
| `primaryCta` | `{ label, shortLabel, href }` | CTA link with responsive label |
| `contactBlock` | `{ phone: { label, href }, supportText }` | Optional phone/hours block |

## Config Shape — `ClosingCtaBenefit`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Stable slug ID |
| `label` | `string` | Benefit heading text |
| `icon` | `ClosingCtaBenefitIcon` | Branded SVG asset reference; decorative icons should use `{ decorative: true }` instead of authored alt text |

## Mobile CTA Behavior

- A single `RippleCtaLink` renders in all viewports
- At `sm` (640px) and above: shows `primaryCta.label` (full text)
- Below `sm`: shows `primaryCta.shortLabel` (compact text)

## Server/Client Boundary

- `ClosingCta.tsx` — server component (no `"use client"`)
- CTA uses shared `RippleCtaLink` from `@/components/ui/ripple-cta-link/RippleCtaLink` (client component)
- Icons are `next/image` with static SVG assets — no client JS

## Dependencies

- `next/image`
- `@/components/ui/ripple-cta-link`
