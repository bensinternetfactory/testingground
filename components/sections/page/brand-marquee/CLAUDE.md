# brand-marquee

Infinite-scroll logo strip with per-logo sizing and filter control.

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
| `height?` | `number` | Desktop bounding-box height (px); default `44` |
| `filter?` | `"black"` | Default is `grayscale`; `"black"` applies `brightness-0` |

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
