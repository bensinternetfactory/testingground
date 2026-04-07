# how-it-works

Three-step process section with numbered cards and a CTA link. Used to explain the financing flow. Mobile displays a card-style accordion; desktop shows a static 3-column grid.

## Usage

```tsx
import { HowItWorks, HOW_IT_WORKS_CONFIG } from "@/components/sections/page/how-it-works";

<HowItWorks config={HOW_IT_WORKS_CONFIG} />
```

## Props -- `HowItWorks`

| Prop | Type | Description |
|---|---|---|
| `config` | `HowItWorksConfig` | Full config object (see `config.ts` for shape) |

## Props -- `HowItWorksAccordion`

| Prop | Type | Description |
|---|---|---|
| `steps` | `HowItWorksStep[]` | Array of process steps |

## Config Shape -- `HowItWorksConfig`

| Field | Type | Description |
|---|---|---|
| `headline` | `string` | Section heading |
| `steps` | `HowItWorksStep[]` | Array of process steps |
| `cta` | `{ label: string; href: string }` | CTA link below the steps |

## Config Shape -- `HowItWorksStep`

| Field | Type | Description |
|---|---|---|
| `number` | `string` | Step label (e.g., "Step 01") |
| `title` | `string` | Step heading |
| `description` | `string` | Step body text |

## Server/Client Boundary

- `HowItWorks.tsx` -- server component (no `"use client"`)
- `HowItWorksAccordion.tsx` -- **client component** (`"use client"`) for Framer Motion accordion on mobile; dynamically imported via `next/dynamic` for code-splitting into a separate chunk
- CTA uses canonical `LeadCta` / `CtaLink` surfaces from `@/features/cta/client`
- `config.ts` -- server-safe data (can be imported anywhere)

Desktop grid is server-rendered. The accordion is client-only (lazy-loaded on mobile). CTA is always hydrated.

## Mobile Accordion Behavior

- **Breakpoint**: visible below `md` (768px), hidden at `md` and above
- **Toggle**: single-open (opening one closes the other)
- **Default state**: all collapsed
- **Animation**: Framer Motion `height: "auto"` with `AnimatePresence`; respects `prefers-reduced-motion` via `useReducedMotion()` (instant transitions when enabled)
- **Tap feedback**: `motion.button` with `whileTap={{ scale: 0.97 }}` -- skipped when reduced motion is preferred
- **Touch**: `touch-action-manipulation` on buttons to eliminate 300ms delay
- **Accessibility**: `aria-expanded`, native `<button>`, `focus-visible` ring with matching `rounded-xl`, `<ol>`/`<li>` semantics
- **Badge contrast**: `bg-[#15803D]` (green-700) with white text (~4.6:1 ratio, WCAG AA compliant)

## CTA

Uses canonical `LeadCta` / `CtaLink` surfaces from `@/features/cta/client`. Pre-approval trigger attributes still come from the authored config, and the canonical CTA runtime continues to provide ripple, haptics isolation, duplicate-commit protection, swipe cancel, and reduced-motion handling.

## SEO

- `HowTo` JSON-LD structured data generated from `config.steps` at build time (server component, zero client JS)
- `scroll-mt-20` on section for correct anchor scroll offset under sticky nav
- CTA renders as a real `<a>` with crawlable `href`

## Dependencies

- `framer-motion` (v12+)
- `next/link`
- `next/dynamic`
- `@/features/cta/client`
