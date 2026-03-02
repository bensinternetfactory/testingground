# how-it-works

Three-step process section with numbered cards and a CTA link. Used to explain the financing flow. Mobile displays a card-style accordion; desktop shows a static 3-column grid.

## Usage

```tsx
import { HowItWorks, HOW_IT_WORKS_CONFIG } from "@/components/sections/page/how-it-works";

<HowItWorks config={HOW_IT_WORKS_CONFIG} />
```

## Props — `HowItWorks`

| Prop | Type | Description |
|---|---|---|
| `config` | `HowItWorksConfig` | Full config object (see `config.ts` for shape) |

## Props — `HowItWorksAccordion`

| Prop | Type | Description |
|---|---|---|
| `steps` | `HowItWorksStep[]` | Array of process steps |

## Config Shape — `HowItWorksConfig`

| Field | Type | Description |
|---|---|---|
| `headline` | `string` | Section heading |
| `steps` | `HowItWorksStep[]` | Array of process steps |
| `cta` | `{ label: string; href: string }` | CTA link below the steps |

## Config Shape — `HowItWorksStep`

| Field | Type | Description |
|---|---|---|
| `number` | `string` | Step label (e.g., "Step 01") |
| `title` | `string` | Step heading |
| `description` | `string` | Step body text |

## Props — `RippleButton`

| Prop | Type | Description |
|---|---|---|
| `children` | `ReactNode` | Button label and icon passed as children |
| `href` | `string` | Navigation target — renders as a `next/link` `<Link>` |

## Server/Client Boundary

- `HowItWorks.tsx` — server component (no `"use client"`)
- `HowItWorksAccordion.tsx` — **client component** (`"use client"`) for Framer Motion accordion on mobile; dynamically imported via `next/dynamic` for code-splitting into a separate chunk
- `RippleButton.tsx` — **client component** (`"use client"`) for ripple animation + `next/link` navigation; statically imported (used on all viewports)
- `config.ts` — server-safe data (can be imported anywhere)

Desktop grid is server-rendered. The accordion is client-only (lazy-loaded on mobile). `RippleButton` is always hydrated.

## Mobile Accordion Behavior

- **Breakpoint**: visible below `md` (768px), hidden at `md` and above
- **Toggle**: single-open (opening one closes the other)
- **Default state**: all collapsed
- **Animation**: Framer Motion `height: "auto"` with `AnimatePresence`; respects `prefers-reduced-motion` via `useReducedMotion()` (instant transitions when enabled)
- **Tap feedback**: `motion.button` with `whileTap={{ scale: 0.97 }}` — skipped when reduced motion is preferred
- **Touch**: `touch-action-manipulation` on buttons to eliminate 300ms delay
- **Accessibility**: `aria-expanded`, native `<button>`, `focus-visible` ring with matching `rounded-xl`, `<ol>`/`<li>` semantics
- **Badge contrast**: `bg-[#15803D]` (green-700) with white text (~4.6:1 ratio, WCAG AA compliant)

## RippleButton

- Renders as a `next/link` `<Link>` (client-side navigation) via `motion.create(Link)`
- Dark pill CTA matching hero button style (`bg-[#111111]`, `rounded-full`, `px-6 py-4`, white text)
- Stroke arrow icon inline after label (no circle wrapper)
- Hover: subtle opacity fade (`hover:bg-[#111111]/90`)
- Touch-point ripple effect using Framer Motion `motion.span` emanating from click/tap coordinates
- `whileTap={{ scale: 0.96 }}` for press feedback — skipped when reduced motion is preferred
- Ripple animation skipped entirely when reduced motion is preferred
- `touch-action-manipulation` to eliminate 300ms delay
- Focus ring: `focus-visible:ring-2` with `focus-visible:rounded-full` matching pill shape
- Ripple spans are `pointer-events-none` and `aria-hidden`

## SEO

- `HowTo` JSON-LD structured data generated from `config.steps` at build time (server component, zero client JS)
- `scroll-mt-20` on section for correct anchor scroll offset under sticky nav

## Dependencies

- `framer-motion` (v12+)
- `next/link`
- `next/dynamic`

## Vercel React Best Practices

- `rendering-hoist-jsx` — `ArrowIcon` is hoisted at module level (avoids re-creation)
- `server-serialization` — desktop grid is a pure server component, no client JS shipped
- `rendering-svg-precision` — arrow and chevron SVGs use integer coordinates
- `bundle-dynamic-import` — accordion is lazy-loaded via `next/dynamic` (separate chunk)
- CTA uses `RippleButton` (client component) rendered from server parent — valid RSC pattern
