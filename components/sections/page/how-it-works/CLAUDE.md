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

## Server/Client Boundary

- `HowItWorks.tsx` — server component (no `"use client"`)
- `HowItWorksAccordion.tsx` — **client component** (`"use client"`) for Framer Motion accordion on mobile, also exports `RippleButton`
- `config.ts` — server-safe data (can be imported anywhere)

Both layouts are rendered in the DOM. CSS `hidden`/`md:hidden` toggles visibility — no hydration mismatch, no `useMediaQuery`.

## Mobile Accordion Behavior

- **Breakpoint**: visible below `md` (768px), hidden at `md` and above
- **Toggle**: single-open (opening one closes the other)
- **Default state**: all collapsed
- **Animation**: Framer Motion `height: "auto"` with `AnimatePresence`; respects `prefers-reduced-motion`
- **Tap feedback**: `motion.button` with `whileTap={{ scale: 0.98 }}` on accordion triggers for press-in feel
- **Accessibility**: `aria-expanded`, native `<button>`, `focus-visible` ring, `<ol>`/`<li>` semantics

## RippleButton

- Dark pill CTA matching hero button style (`bg-[#111111]`, `rounded-full`, `px-6 py-4`, white text)
- Stroke arrow icon inline after label (no circle wrapper)
- Hover: subtle opacity fade (`hover:bg-[#111111]/90`)
- Touch-point ripple effect using Framer Motion `motion.span` emanating from click/tap coordinates
- `whileTap={{ scale: 0.96 }}` for press feedback
- Ripple spans are `pointer-events-none` and `aria-hidden`

## Dependencies

- `framer-motion` (v12+)

## Vercel React Best Practices

- `rendering-hoist-jsx` — `ArrowIcon` is hoisted at module level (avoids re-creation)
- `server-serialization` — desktop grid is a pure server component, no client JS shipped
- `rendering-svg-precision` — arrow and chevron SVGs use integer coordinates
- CTA uses `RippleButton` (client component) rendered from server parent — valid RSC pattern
