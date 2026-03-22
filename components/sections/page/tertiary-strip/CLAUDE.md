# tertiary-strip

Dark transition strip of outline CTA cards rendered between page sections.

## Usage

```tsx
import { TertiaryActionsStrip } from "@/components/sections/page/tertiary-strip";

<TertiaryActionsStrip config={config.tertiaryStrip} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `TertiaryStripConfig` | Strip configuration with array of action objects |

## Config Shape — `TertiaryStripConfig`

| Field | Type | Description |
|---|---|---|
| `actions` | `TertiaryStripAction[]` | Action cards to render in the strip |

### `TertiaryStripAction`

| Field | Type | Description |
|---|---|---|
| `eyebrow` | `string` | Small label above the action text |
| `label` | `string` | Primary action text |
| `href` | `string` | Navigation target |
| `drawerTitle` | `string?` | Optional drawer title override via `data-drawer-title` |

## Visual Style

- Dark background (`bg-[#101820]`) matching the brand marquee
- Uses `outline-dark` RippleCtaLink variant (white text, `border-white/15` cards)
- Eyebrow text: `text-white/60`
- Label text: `text-white`

## Server/Client Boundary

- `TertiaryActionsStrip.tsx` — server component (RippleCtaLink handles client interaction internally)

## Dependencies

- `RippleCtaLink` from `@/components/ui/ripple-cta-link`
- `lucide-react` for ArrowRight icon
- Local config types from `config.ts`
