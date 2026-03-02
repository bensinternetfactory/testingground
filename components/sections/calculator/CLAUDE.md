# calculator

Tow Truck ROI & Cash Flow Calculator — interactive decision engine that shows whether a truck will cash flow.

## Usage

```tsx
import { Calculator } from "@/components/sections/calculator/Calculator";

<Suspense>
  <Calculator />
</Suspense>
```

Wrap in `<Suspense>` because the component reads `useSearchParams()`.

## Files

| File | Purpose |
|---|---|
| `Calculator.tsx` | `"use client"` — all state, URL sync, 4 input sections, results dashboard |
| `calculator-data.ts` | Defaults, TypeScript types, calculation helpers (payment, APR, derived metrics) |

## Server / Client Boundary

- **Server:** `app/tow-truck-calculator/page.tsx` renders metadata, SEO intro, `<Calculator />`, disclaimer
- **Client:** `Calculator.tsx` owns all interactive state via `useState`

## Key Behaviors

- All inputs sync to URL query params for shareability (non-default values only)
- Results update live as inputs change (no submit button)
- Color thresholds: green (>$1k/mo), yellow ($1–$1k), red (≤$0)
- Contextual conversion CTA changes based on payment source and APR
- Mobile: sticky bottom bar with net cash flow + expandable full results overlay

## Dependencies

| Dependency | Type |
|---|---|
| `framer-motion` | Collapse/expand animations |
| `next/navigation` | `useSearchParams`, `useRouter`, `usePathname` for URL state |
