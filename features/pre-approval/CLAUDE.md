# pre-approval

Feature-owned pre-approval drawer and handoff contract. This is the canonical integration surface for marketing CTA triggers, drawer runtime mounting, and `/pre-approval` route construction.

## Module Table

| Path | Boundary | Purpose |
|---|---|---|
| `contract.ts` | server-safe | Shared types, event contracts, and amount/title constants |
| `routes.ts` | server-safe | Canonical `/pre-approval` href builder and search-param parser |
| `selection.ts` | server-safe | Tile-selection helpers that resolve authored triggers into canonical handoff payloads |
| `drawer/server.ts` | server-safe | Hash-entry constant plus DOM-safe trigger attribute builders for CTA links |
| `drawer/client.tsx` | client | Drawer root mount, runtime error boundary, and client hooks |
| `drawer/runtime/context.tsx` | client | Session state, event emission, and open/close/reset actions |
| `drawer/runtime/parser.ts` | client | Legacy and production trigger-attribute parsing into the canonical trigger contract |
| `drawer/runtime/hash-listener.tsx` | client | Same-page and direct-hash drawer entry handling |
| `drawer/runtime/route-sync.tsx` | client | Route-change reset behavior for the mounted drawer runtime |
| `drawer/runtime/session.ts` | client | Session ID creation and compatibility-origin defaults |
| `drawer/runtime/scroll-lock.ts` | client | Body scroll locking for the drawer overlay |
| `drawer/ui/PreApprovalDrawerView.tsx` | client | Rendered drawer sheet/dialog and continue handoff behavior |
| `drawer/ui/AmountSlider.tsx` | client | Amount slider UI used by the drawer view |
| `amount-slider.css` | shared CSS | Slider styling consumed by the feature-owned amount slider |

## Public API

Only these modules are intended as public imports:

| Import path | Exports |
|---|---|
| `@/features/pre-approval/contract` | `PreApprovalTrigger`, `PreApprovalEvent`, amount constants, related contract types |
| `@/features/pre-approval/routes` | `buildPreApprovalHref`, `normalizePreApprovalAmount`, `parsePreApprovalSearchParams`, `preApprovalPath` |
| `@/features/pre-approval/selection` | `resolvePreApprovalSelectionTrigger`, `resolvePreApprovalSelectionTruckType`, authored hero trigger configs |
| `@/features/pre-approval/drawer/server` | `preApprovalEntryHash`, `buildPreApprovalEntryHref`, `buildPreApprovalTriggerAttributes`, `preApprovalFallbackEntryHref` |
| `@/features/pre-approval/drawer/client` | `PreApprovalDrawerRoot`, `useOpenPreApproval`, `usePreApprovalSession` |

Do not import from `drawer/runtime/*` or `drawer/ui/*` outside this feature unless a migration plan explicitly adds a new public surface.

## Usage

```tsx
import { PreApprovalDrawerRoot } from "@/features/pre-approval/drawer/client";
import {
  buildPreApprovalTriggerAttributes,
  preApprovalEntryHash,
} from "@/features/pre-approval/drawer/server";

const trigger = {
  origin: {
    pageId: "rollback-financing",
    sectionId: "hero-primary",
    ctaId: "hero-main-cta",
    placement: "hero",
  },
  handoff: {
    truckType: "rollback",
  },
};

<PreApprovalDrawerRoot>
  <a href={preApprovalEntryHash} {...buildPreApprovalTriggerAttributes(trigger)}>
    Get pre-approved
  </a>
</PreApprovalDrawerRoot>;
```

Use `buildPreApprovalHref()` from `routes.ts` for direct `/pre-approval` navigation and `resolvePreApprovalSelectionTrigger()` from `selection.ts` for tile-driven CTA payloads.

## Server/Client Boundaries

- Server-safe modules: `contract.ts`, `routes.ts`, `selection.ts`, and `drawer/server.ts`. These can be imported from route configs, server components, and shared CTA config builders.
- Client entrypoint: `drawer/client.tsx`. This is the only intended mount point for the runtime and hooks.
- Client internals: `drawer/runtime/*` and `drawer/ui/*`. These own browser listeners, session state, DOM parsing, focus/scroll behavior, and drawer rendering.

## Test Coverage

The consolidated suite lives in `features/pre-approval/__tests__/`:

- `public-api.test.ts` covers the public server-safe API contracts.
- `selection.test.ts` covers authored selection-trigger resolution.
- `drawer-runtime.test.ts`, `drawer-root.test.tsx`, and `drawer-root-error-boundary.test.tsx` cover runtime state, hooks, and boundary behavior.
- `DrawerHashListener.test.tsx`, `RouteResetListener.test.tsx`, and `DrawerContext.test.tsx` cover the runtime listeners and state provider.
- `PreApprovalDrawerView.test.tsx`, `AmountSlider.test.tsx`, and `scroll-lock.test.ts` cover the feature-owned UI and interaction behavior.

Phase-completion verification for this feature requires `npm test -- features/pre-approval`, `npm run lint`, and `npm run build`.
