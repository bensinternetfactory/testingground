# program-cards

Grid of financing program cards with icons, descriptions, and CTA button-links. Used to showcase specialized financing programs.

## Usage

```tsx
import { ProgramCards, PROGRAM_CARDS_CONFIG } from "@/components/sections/page/program-cards";

<ProgramCards config={PROGRAM_CARDS_CONFIG} />
```

## Props -- `ProgramCards`

| Prop | Type | Description |
|---|---|---|
| `config` | `ProgramCardsConfig` | Full config object (see `config.ts` for shape) |

## Config Shape -- `ProgramCardData`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique card identifier |
| `title` | `string` | Card heading |
| `description` | `string` | Short description text |
| `iconId` | union | Icon token resolved by the section |
| `iconClassName` | `string?` | Optional extra classes on the icon wrapper |
| `linkText` | `string` | CTA link label |
| `linkHref` | `string` | CTA link destination |

## Server/Client Boundary

- `ProgramCards.tsx` -- server component (no `"use client"`)
- Card content and layout are server-rendered
- CTA uses shared `RippleCtaLink` from `@/components/ui/ripple-cta-link` (client component) -- only the CTA interaction is client-side
- `config.ts` -- server-safe data (can be imported anywhere)

## CTA

Card CTAs are full-width pill buttons using shared `RippleCtaLink` (`size="sm"`). See `components/ui/ripple-cta-link/CLAUDE.md` for interaction details.

## Dependencies

- `@/components/ui/ripple-cta-link`
