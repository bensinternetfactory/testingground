# proof-block

Config-driven comparison table that highlights TowLoans' differentiators against typical lenders.

## Usage

```tsx
import { ProofBlock, PROOF_BLOCK_CONFIG } from "@/components/sections/page/proof-block";

<ProofBlock config={PROOF_BLOCK_CONFIG} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `ProofBlockConfig` | Full config object (see `config.ts` for shape) |

## Config Shape — `ProofBlockConfig`

| Field | Type | Description |
|---|---|---|
| `kicker` | `string` | Eyebrow text above headline |
| `headline` | `string` | Section heading |
| `columns` | `[string, string]` | Column header labels |
| `rows` | `ProofBlockRow[]` | Feature comparison rows |

## Config Shape — `ProofBlockRow`

| Field | Type | Description |
|---|---|---|
| `feature` | `string` | Feature name |
| `towloans` | `boolean` | Whether TowLoans offers this |
| `competitors` | `boolean` | Whether most lenders offer this |

## Server/Client Boundary

- `ProofBlock.tsx` — server component (no `"use client"`)
- No client-side interactivity; pure server-rendered HTML table

## Dependencies

None (no external imports beyond config types).
