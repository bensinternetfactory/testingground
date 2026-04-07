# closing-cta

Reusable homepage closing CTA section with benefit tiles, branded SVG icons, and a responsive primary CTA that now uses canonical CTA surfaces.

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
| `primaryCta` | `{ label, shortLabel, href, preApprovalTrigger? }` | CTA link config with responsive label and optional canonical pre-approval trigger |
| `contactBlock` | `{ phone: { label, href }, supportText }` | Optional phone/hours block |

## Config Shape — `ClosingCtaBenefit`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Stable slug ID |
| `label` | `string` | Benefit heading text |
| `icon` | `ClosingCtaBenefitIcon` | Branded SVG asset reference; decorative icons should use `{ decorative: true }` instead of authored alt text |

## Primary CTA Behavior

- A single canonical CTA renders in all viewports
- At `sm` (640px) and above: shows `primaryCta.label` (full text)
- Below `sm`: shows `primaryCta.shortLabel` (compact text)
- When `primaryCta.preApprovalTrigger` is present, the section renders `LeadCta`; otherwise it falls back to `CtaLink`
- The CTA preserves the legacy analytics section identity with `legacySection: "closing-cta"`

## Server/Client Boundary

- `ClosingCta.tsx` — server component (no `"use client"`)
- CTA uses canonical `LeadCta` / `CtaLink` from `@/features/cta/client` (client components)
- Icons are `next/image` with static SVG assets — no client JS

## Dependencies

- `next/image`
- `@/features/cta/client`
