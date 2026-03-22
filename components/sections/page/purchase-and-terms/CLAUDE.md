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

- `md:grid-cols-[1fr_1px_1fr]` with vertical divider inside `max-w-7xl`
- White background, inner column padding `py-10 md:py-16` (matches `FinancingOffersSplit`)
- Mobile (`<md`): stacked with horizontal `border-t` divider
- Desktop (`md+`): side-by-side with full-height vertical divider
- Per-column headlines only (no shared section header)

## Server/Client Boundary

- `PurchaseAndTermsSection.tsx` — server component wrapping two client children

## Dependencies

- `PurchaseSourceStack` from `@/components/sections/page/purchase-source-stack`
- `TermLengthSlider` from `@/components/sections/page/term-length-slider`
- Local config types from `config.ts`
