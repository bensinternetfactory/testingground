# pre-approval-drawer

Bottom sheet (mobile) / centered modal (desktop) for selecting a financing amount before pre-approval.

## Usage

```tsx
import { DrawerProvider } from "@/components/ui/pre-approval-drawer";

// Wrap page content — server components pass through as children
<DrawerProvider>
  <main>{/* sections with hash-based CTAs */}</main>
</DrawerProvider>
```

Any link with `href="#get-pre-approved"` (the `DRAWER_HASH` constant) opens the drawer via the built-in `DrawerHashListener`.

## Exports

| Export | Type | Description |
|---|---|---|
| `DrawerProvider` | Component | Context provider + hash listener + renders drawer |
| `useDrawer()` | Hook | `{ isOpen, open, close }` — client components only |
| `PreApprovalDrawer` | Component | Drawer UI (rendered by provider, not used directly) |
| `AmountSlider` | Component | Range slider with currency formatting |
| `DRAWER_HASH` | `string` | `"#get-pre-approved"` |
| `SLIDER_MIN/MAX/STEP/DEFAULT` | `number` | Slider config constants |

## How CTAs Open the Drawer

1. `TileSelector` CTA: `cta.href="#get-pre-approved"` → `buildSelectedHref()` produces `?equipment=light-duty#get-pre-approved` → native `hashchange` → `DrawerHashListener` calls `open()`
2. `RippleCtaLink`: hash-only href renders as `MotionLink` → client nav triggers `hashchange`
3. Direct URL: `/rollback-financing#get-pre-approved` → `DrawerHashListener` checks hash on mount

Hash is cleared via `history.replaceState` so back button goes to previous page.

## Viewport Behavior

- **Mobile (<md):** iOS-style bottom sheet with drag-to-dismiss, spring animation
- **Desktop (md+):** Centered modal (max-width 480px) with scale transition, close button

## Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-label="Pre-approval amount"`
- Focus trap (Tab/Shift+Tab cycle within dialog)
- Escape key closes
- Focus restored to trigger element on close
- Body scroll locked while open
- Slider: 44px thumb, `aria-label`, `aria-valuetext`

## Reduced Motion

- Spring/drag animations skipped — instant opacity transitions
- Slider and all interactive behavior unchanged

## Server/Client Boundary

- `DrawerContext.tsx` — `"use client"` (context, state, hash listener)
- `PreApprovalDrawer.tsx` — `"use client"` (portal, animations, drag)
- `AmountSlider.tsx` — `"use client"` (range input state)
- `config.ts` — server-safe constants

## Dependencies

- `framer-motion` (AnimatePresence, motion, useReducedMotion)
- `react-dom` (createPortal)
