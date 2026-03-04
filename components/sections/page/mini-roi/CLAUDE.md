# mini-roi

Interactive single-slider mini ROI calculator that shows how few tows cover a monthly truck payment.

## Usage

```tsx
import { MiniROI, MINI_ROI_CONFIG } from "@/components/sections/page/mini-roi";

<MiniROI config={MINI_ROI_CONFIG} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `MiniROIConfig` | Headline, slider bounds, financial assumptions, CTA, disclaimer |

## Config Shape — `MiniROIConfig`

| Field | Type | Description |
|---|---|---|
| `headline` | `{ base: string; accent: string }` | Section heading split for green accent |
| `subheadline` | `string` | Descriptive text below the heading |
| `slider` | `{ label, min, max, step, defaultValue }` | Range input config |
| `assumptions` | `{ purchasePrice, downPayment, interestRate, termMonths, towsPerDay, daysPerMonth }` | Financial defaults merged with `DEFAULTS` |
| `cta` | `{ label: string; basePath: string }` | CTA button text and calculator path |
| `disclaimer` | `string` | Fine print below card |

## Server / Client Boundary

- `MiniROI.tsx` — **client component** (`"use client"`) for slider state
- `config.ts` — server-safe data (can be imported anywhere)

## Dependencies

| Dependency | Type |
|---|---|
| `calculator-data.ts` | `computeResults`, `DEFAULTS`, `CalculatorInputs` |
| `next/link` | CTA links to full calculator with `?rev=` param |
