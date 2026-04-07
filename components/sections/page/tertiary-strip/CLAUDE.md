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
| `preApprovalTrigger` | `PreApprovalTrigger?` | Optional canonical pre-approval trigger data used to emit `data-pre-approval-*` attributes |

## Visual Style

- Dark background (`bg-[#101820]`) matching the brand marquee
- Uses canonical `LeadCta` / `CtaLink` surfaces with the inverse tone (white text, `border-white/15` cards)
- Eyebrow text: `text-white/60`
- Label text: `text-white`

## Server/Client Boundary

- `TertiaryActionsStrip.tsx` — server component that delegates CTA interaction to canonical `LeadCta` / `CtaLink` surfaces from `@/features/cta/client`

## Dependencies

- `@/features/cta/client`
- `lucide-react` for ArrowRight icon
- Local config types from `config.ts`
