# mini-roi

Interactive mini ROI calculator — shows how few tows cover a monthly truck payment, with custom drag slider, tappable tow rate, editable payment, and weak-state handling.

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
| `subheadline` | `string` | Descriptive text below heading |
| `slider` | `{ label, min, max, step, defaultValue }` | Slider config (min=30, max=500, step=10) |
| `assumptions` | `{ towsPerDay, daysPerMonth }` | Used by `miniRoiCalc` (3 × 22 = 66 calls) |
| `cta` | `{ label: string; basePath: string }` | CTA button text and calculator path |
| `disclaimer` | `string` | Fine print below card |

## Math Model (`calc.ts`)

```
monthlyCalls = towsPerDay × daysPerMonth
monthlyRevenue = revenuePerTow × monthlyCalls
breakevenTows = ceil(monthlyPayment / revenuePerTow)  // Infinity when ≤ 0
monthlyProfit = monthlyRevenue − monthlyPayment
annualProfit = monthlyProfit × 12
isWeak = breakevenTows > monthlyCalls || revenuePerTow ≤ 0
```

No external calculator dependencies. Pure function, tested in `__tests__/calc.test.ts`.

## Sub-Components

| Component | File | Description |
|---|---|---|
| `TowRateField` | `TowRateField.tsx` | Tap-to-edit field for tow rate. No upper bound. Decimals OK. Min $1. |
| `PaymentField` | `PaymentField.tsx` | Tap-to-edit for payment. Form-wrapped for iOS Done key. Clamp $30–$5,000. |

## Custom Slider

Framer Motion `drag="x"` thumb on a track div. Features:
- Snaps to `$step` increments, haptic feedback per step via `web-haptics`
- `whileTap={{ scale: 1.3 }}` with spring animation
- Keyboard: Arrow keys ±$step
- Accessibility: `role="slider"`, `aria-valuenow/min/max/valuetext`
- When tow rate is typed > slider max ($500), slider stays at max, typed value is authoritative

## CTA Query Handoff

- Manual mode: `?rev={value}&pmt={manualPmt}&known=true`
- Estimated mode: `?rev={value}`

## Server / Client Boundary

- `MiniROI.tsx` — **client** (`"use client"`) for slider state, drag, haptics
- `TowRateField.tsx` — **client** (`"use client"`) for inline edit state
- `PaymentField.tsx` — **client** (`"use client"`) for inline edit state
- `config.ts` — server-safe data
- `calc.ts` — server-safe pure function

## Dependencies

| Dependency | Type |
|---|---|
| `framer-motion` | `motion`, `useMotionValue`, `useReducedMotion` for custom slider |
| `web-haptics` | Haptic feedback on slider step changes |
| `RippleCtaLink` | Primary CTA button-link |
