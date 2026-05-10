# benefits-tiles

Chewy-style "made easy" panel: small heading on the top-left and a row of four light-green rounded-square tiles, each with a centered Lucide icon and an anchor-text label below.

## Usage

```tsx
import { BenefitsTiles } from "./_components/benefits-tiles/BenefitsTiles";

<BenefitsTiles />
```

## Props

| Prop | Type | Description |
|---|---|---|
| _none_ | — | No props yet; the four tile entries are hardcoded in-file (`TILES`) until labels and links stabilize. |

## Layout

- Outer `SectionShell` is white so the green tiles read as accents on the page.
- Heading: `text-xl md:text-2xl`, top-left, with `--t-ink` text color matching the heading style in `WhyTowLoans`.
- Grid: `grid-cols-2` on mobile (2×2) and `md:grid-cols-4` on tablet+.
- Each tile: `aspect-square` `rounded-2xl` light-green panel (`bg-[#dcfce7]`) with a centered Lucide icon (`h-12 w-12 md:h-16 md:w-16`, color `--t-blue-ink`).
- Anchor label sits below the panel, centered, `--t-ink`. Hover darkens the tile (`#bbf7d0`) and underlines the label.
- All `href` values are placeholders (`#`) until destinations are wired up.

## Server/Client Boundary

- `BenefitsTiles.tsx` — server component (no `"use client"`).

## Dependencies

- `../primitives/SectionShell` — handles the `2xl` containment rule.
- `lucide-react` — icons (`SlidersHorizontal`, `Headset`, `BadgePercent`, `Handshake`); same import pattern as `WhyTowLoans.tsx`.
- Color tokens `--t-blue-ink` and `--t-ink` from `app/test/_styles/palette.css`; light-green `#dcfce7` matches `PromoStrip`.
