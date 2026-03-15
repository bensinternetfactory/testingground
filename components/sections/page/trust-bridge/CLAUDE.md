# trust-bridge

Minimal 4-step process section with green number badges. Text-only — no descriptions, no CTA.

## Usage

```tsx
import { TrustBridge, TRUST_BRIDGE_CONFIG } from "@/components/sections/page/trust-bridge";

<TrustBridge config={TRUST_BRIDGE_CONFIG} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `TrustBridgeConfig` | Full config object (see `config.ts` for shape) |

## Config Shape — `TrustBridgeConfig`

| Field | Type | Description |
|---|---|---|
| `kicker` | `string` | Eyebrow text above headline |
| `headline` | `string` | Section heading |
| `steps` | `TrustBridgeStep[]` | Array of step items |

## Config Shape — `TrustBridgeStep`

| Field | Type | Description |
|---|---|---|
| `number` | `string` | Step number displayed in badge |
| `title` | `string` | Step title text |

## Server/Client Boundary

- `TrustBridge.tsx` — server component (no `"use client"`)
- No client-side interactivity; pure server-rendered list

## Dependencies

None (no external imports beyond config types).
