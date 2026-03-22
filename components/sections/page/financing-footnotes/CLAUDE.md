# financing-footnotes

Shared footnote strip for equipment financing pages.

## Usage

```tsx
import { FinancingFootnotes } from "@/components/sections/page/financing-footnotes";

<FinancingFootnotes config={config.footnotes} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `FinancingFootnotesConfig` | Ordered list of footnotes to render |

## Config Shape — `FinancingFootnotesConfig`

| Field | Type | Description |
|---|---|---|
| `items` | `FinancingFootnoteItem[]` | Footnotes rendered in order |

### `FinancingFootnoteItem`

| Field | Type | Description |
|---|---|---|
| `marker` | `string` | Superscript marker value |
| `text` | `string` | Footnote copy |

## Server/Client Boundary

- `FinancingFootnotes.tsx` — server component
