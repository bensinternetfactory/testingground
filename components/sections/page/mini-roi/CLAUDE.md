# mini-roi

Interactive mini ROI calculator that shows how many tows cover a monthly truck payment, with drag slider, editable tow rate, editable payment, and weak-state handling.

## Usage

```tsx
import { MiniROI, MINI_ROI_CONFIG } from "@/components/sections/page/mini-roi";

<MiniROI config={MINI_ROI_CONFIG} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `MiniROIConfig` | Headline, slider bounds, assumptions, CTA, disclaimer |

## Config Shape — `MiniROIConfig`

| Field | Type | Description |
|---|---|---|
| `headline` | `{ base: string; accent: string }` | Section heading |
| `subheadline` | `string` | Text below heading |
| `slider` | `{ label, min, max, step, defaultValue }` | Slider config (default: min=30, max=500, step=10) |
| `assumptions` | `{ towsPerDay, daysPerMonth }` | Used by `miniRoiCalc` |
| `cta` | `{ label: string; basePath: string }` | CTA button text and destination path |
| `disclaimer` | `string` | Fine print below card |

## Value Semantics

- Typed tow-rate value is authoritative for ROI math and CTA query params.
- Slider remains bounded to configured min/max for drag, keyboard, fill, and ARIA semantics.
- If typed tow-rate is outside slider range, UI keeps typed value while slider reflects nearest bound.

## Math Model (`calc.ts`)

```
monthlyCalls = towsPerDay × daysPerMonth
monthlyRevenue = revenuePerTow × monthlyCalls
breakevenTows = ceil(monthlyPayment / revenuePerTow)  // Infinity when ≤ 0
monthlyProfit = monthlyRevenue − monthlyPayment
annualProfit = monthlyProfit × 12
isWeak = breakevenTows > monthlyCalls || revenuePerTow ≤ 0
```

Pure function with tests in `__tests__/calc.test.ts`.

## Sub-Components

| Component | File | Description |
|---|---|---|
| `TowRateField` | `TowRateField.tsx` | Tap-to-edit tow rate. Min $1, no upper bound. |
| `PaymentField` | `PaymentField.tsx` | Tap-to-edit monthly payment. Clamped to $30–$5,000. |

## Custom Slider

Framer Motion `drag="x"` thumb on a track div.

- Snaps to `step` increments
- Keyboard: Arrow keys, Home, End
- Accessibility: `role="slider"`, valid `aria-valuenow/min/max/valuetext`
- Honors reduced motion preference for slider/tap animations

## CTA Query Handoff

- Current mode: `?rev={value}&pmt={manualPmt}&known=true`

## Server / Client Boundary

- `MiniROI.tsx` — **client** (`"use client"`) for slider and inline interactions
- `TowRateField.tsx` — **client** (`"use client"`) for inline edit state
- `PaymentField.tsx` — **client** (`"use client"`) for inline edit state
- `config.ts` — server-safe data
- `calc.ts` — server-safe pure function
- `currency.ts` / `math.ts` — shared utilities

## Dependencies

| Dependency | Type |
|---|---|
| `framer-motion` | `motion`, `useMotionValue`, `useReducedMotion` |
| `RippleCtaLink` | Primary CTA button-link |
