# brand-marquee

Dark ribbon with infinite-scroll white logos, per-logo sizing, and opacity control.

## Usage

```tsx
import { BrandMarquee } from "@/components/sections/page/brand-marquee";

<BrandMarquee />
```

No props — the component reads `BRAND_LOGOS` from `config.ts` internally.

## Config Shape — `BrandLogo`

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Brand name (used as `alt` text) |
| `src` | `string` | Image path (relative to `public/`) |
| `width` | `number` | Desktop bounding-box width (px) |
| `height?` | `number` | Desktop bounding-box height (px); default `66` |
| `opacity?` | `number` | 0–1, default `1`; fine-tune visual weight at white |
| `native?` | `boolean` | `true` = SVG is already white, skip CSS filter |

## Visual Treatment

- Dark background (`#101820`) with tight padding (`py-6 md:py-8`)
- Most logos rendered white via `brightness-0 invert` CSS filter
- Multi-color logos (Peterbilt, International) use pre-made white SVG variants (`*-white.svg`) with `native: true` to skip the filter — the filter destroys internal detail on multi-color SVGs
- Per-logo `opacity` for fine-tuning visual weight

## Per-Logo Sizing

Each logo box receives CSS custom properties from its config entry:

- `--logo-w` / `--logo-h` — desktop dimensions
- `--logo-w-mobile` / `--logo-h-mobile` — mobile dimensions (75% of desktop)

The `.logo-box` rule in `brand-marquee.css` uses the mobile vars by default and switches to desktop vars at `min-width: 768px`.

## Animation

- `marquee-scroll` keyframe translates the track by `-50%` for seamless looping (two copies of the logo group)
- `IntersectionObserver` adds `.marquee-animate` only when the section is in viewport (play/pause)
- Hover pauses the animation (`animation-play-state: paused`)
- `prefers-reduced-motion: reduce` disables animation entirely

## Server/Client Boundary

- `BrandMarquee.tsx` — `"use client"` (requires `IntersectionObserver`, `useState`, `useEffect`)
- `config.ts` — server-safe data (can be imported anywhere)

## Dependencies

- `next/image` — responsive logo rendering with `fill` + `object-contain`
- `brand-marquee.css` — keyframes, `.logo-box` responsive sizing, reduced-motion media query
