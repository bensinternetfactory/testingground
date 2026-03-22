# tertiary-strip

Thin transition strip of outline CTA cards extracted from the hero section.

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

## Server/Client Boundary

- `TertiaryActionsStrip.tsx` — server component (RippleCtaLink handles client interaction internally)

## Dependencies

- `RippleCtaLink` from `@/components/ui/ripple-cta-link`
- `lucide-react` for ArrowRight icon
- Type imports from `equipment-page-config`
