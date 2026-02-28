# hero-lead-gen

Lead-generation hero with headline, subheadline, CTA button, optional phone link, trust badges, and hero image.

## Usage

```tsx
import { HeroLeadGen, HERO_LEAD_GEN_CONFIG } from "@/components/sections/heroes/hero-lead-gen";

<HeroLeadGen config={HERO_LEAD_GEN_CONFIG} />
```

## Props — `HeroLeadGen`

| Prop | Type | Description |
|---|---|---|
| `config` | `HeroLeadGenConfig` | Full config object (see below or `config.ts`) |

### `HeroLeadGenConfig`

| Property | Type | Required | Description |
|---|---|---|---|
| `headline` | `string` | yes | Primary heading text |
| `subheadline` | `string` | yes | Supporting text below headline |
| `cta` | `{ label, href }` | yes | Primary call-to-action button |
| `phone` | `{ display, href }` | no | Optional phone number link below CTA |
| `trustBadges` | `TrustBadgeData[]` | yes | Array of trust badges shown below CTA |
| `heroImage` | `string` | yes | Path to hero image |
| `heroImageAlt` | `string` | yes | Alt text for hero image |

## Props — `TrustBadge`

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Badge display text |
| `icon` | `ReactNode?` | Optional custom icon (defaults to green checkmark SVG) |

## Server/Client Boundary

All files are server components — no "use client" boundary is needed.

- `HeroLeadGen.tsx` — server component
- `TrustBadge.tsx` — server component
- `config.ts` — server-safe data (can be imported anywhere)

## Dependencies

- `next/image` — used for the hero image
