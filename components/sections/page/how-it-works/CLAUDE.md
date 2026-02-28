# how-it-works

Three-step process section with numbered cards and a CTA link. Used to explain the financing flow.

## Usage

```tsx
import { HowItWorks, HOW_IT_WORKS_CONFIG } from "@/components/sections/page/how-it-works";

<HowItWorks config={HOW_IT_WORKS_CONFIG} />
```

## Props — `HowItWorks`

| Prop | Type | Description |
|---|---|---|
| `config` | `HowItWorksConfig` | Full config object (see `config.ts` for shape) |

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

## Server/Client Boundary

- `HowItWorks.tsx` — server component (no `"use client"`)
- `config.ts` — server-safe data (can be imported anywhere)

No client boundary needed — the component is entirely static with no interactivity.

## Vercel React Best Practices

- `rendering-hoist-jsx` — `ArrowIcon` is hoisted at module level (avoids re-creation)
- `server-serialization` — pure server component, no client JS shipped
- `rendering-svg-precision` — arrow SVG uses integer coordinates
- Internal links use `next/link` `Link` for client-side navigation and prefetching
