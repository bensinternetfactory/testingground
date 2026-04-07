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
- CTA uses canonical `CtaLink` from `@/features/cta/client` with preserved legacy section/card analytics -- only the CTA interaction is client-side
- `config.ts` -- server-safe data (can be imported anywhere)

## CTA

Card CTAs are full-width pill buttons using canonical `CtaLink` (`size="sm"`) while preserving the historical `program-cards` section analytics identity and each card's legacy `cardId`.

## Dependencies

- `@/features/cta/client`
