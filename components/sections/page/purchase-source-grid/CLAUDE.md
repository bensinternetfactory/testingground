# purchase-source-grid

Static vertical checklist showing financing purchase sources with green checkmark icons.

## Usage

```tsx
import { PurchaseSourceGrid } from "@/components/sections/page/purchase-source-grid";

<PurchaseSourceGrid config={config.purchaseAndTerms.purchaseStack} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `PurchaseSourceGridConfig` | Grid configuration with headline, body, and icon |

## Config Shape -- `PurchaseSourceGridConfig`

| Field | Type | Description |
|---|---|---|
| `headline` | `string` | Column headline |
| `body` | `string` | Supporting paragraph |
| `iconSrc` | `string` | Path to icon asset above headline |
| `iconAlt` | `string` | Icon alt text |

## Grid Items

Grid items are a shared constant (`PURCHASE_SOURCE_GRID_ITEMS`) exported from `config.ts`.
They are identical on all pages and not part of per-page config.

| Source | Descriptor |
|---|---|
| Dealerships | Any franchise or independent dealer |
| Private Sellers | Direct owner-to-owner |
| Auctions | eBay, Ritchie Brothers |
| Online Classifieds | Facebook Marketplace, Craigslist |

## Server/Client Boundary

- `PurchaseSourceGrid.tsx` -- client component (`"use client"`) for future-proofing

## Dependencies

- `next/image` for icon
- Local config types and shared constant from `config.ts`
