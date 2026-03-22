# purchase-and-terms

Server component wrapper composing PurchaseSourceStack and TermLengthSlider into a two-column layout.

## Usage

```tsx
import { PurchaseAndTermsSection } from "@/components/sections/page/purchase-and-terms";

<PurchaseAndTermsSection config={config.purchaseAndTerms} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `PurchaseAndTermsConfig` | Combined config for both child components |

## Config Shape — `PurchaseAndTermsConfig`

| Field | Type | Description |
|---|---|---|
| `purchaseStack` | `PurchaseSourceStackConfig` | Config for the purchase source carousel |
| `termSlider` | `TermSliderConfig` | Config for the term length slider |

## Layout

- `grid gap-16 lg:grid-cols-2 lg:gap-12` inside `max-w-7xl`
- White background, `py-20 md:py-28`
- Mobile: left column (purchase stack) on top
- Per-column headlines only (no shared section header)

## Server/Client Boundary

- `PurchaseAndTermsSection.tsx` — server component wrapping two client children

## Dependencies

- `PurchaseSourceStack` from `@/components/sections/page/purchase-source-stack`
- `TermLengthSlider` from `@/components/sections/page/term-length-slider`
- Local config types from `config.ts`
