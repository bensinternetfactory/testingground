# pre-approval-drawer

Bottom sheet (mobile) / centered modal (desktop) for selecting a financing amount before navigating to the pre-approval flow.

## Architecture

The drawer is split into focused modules with clear responsibilities:

| File | Boundary | Responsibility |
|---|---|---|
| `config.ts` | Server-safe | Constants (`DRAWER_HASH`, `SLIDER_*`, `PRE_APPROVAL_PATH`), URL builders |
| `triggers.ts` | Server-safe | Session creation, data attribute encode/decode, hero truck mappings |
| `DrawerContext.tsx` | `"use client"` | `DrawerStateProvider` (context + state), `useDrawer()` hook |
| `DrawerHashListener.tsx` | `"use client"` | Click interception on `#get-pre-approved` anchors, hashchange listener |
| `DrawerProvider.tsx` | `"use client"` | Composition shell: wires state + hash listener + drawer render |
| `MarketingDrawerProvider.tsx` | `"use client"` | Wraps `DrawerProvider` + `RouteResetListener` for marketing layout |
| `RouteResetListener.tsx` | `"use client"` | Watches `usePathname()`, opens/resets drawer on route changes |
| `PreApprovalDrawer.tsx` | `"use client"` | Drawer UI: portal, desktop modal / mobile sheet, a11y, animations |
| `AmountSlider.tsx` | `"use client"` | Range input with currency formatting |
| `scroll-lock.ts` | Client-only | Imperative body scroll lock (position:fixed technique for iOS Safari) |
| `index.ts` | Barrel | Re-exports all public API |

## Usage

```tsx
// Marketing layout — includes route-sync behavior
import { MarketingDrawerProvider } from "@/components/ui/pre-approval-drawer";

<MarketingDrawerProvider>
  <main>{/* sections with hash-based CTAs */}</main>
</MarketingDrawerProvider>
```

For non-marketing contexts (no route-sync needed), use `DrawerProvider` directly.

## How CTAs Open the Drawer

1. **Click interception:** `DrawerHashListener` listens on `document` (capture phase) for clicks on same-page anchors with `href="#get-pre-approved"`. It calls `event.preventDefault()` and opens the drawer, parsing `data-drawer-*` attributes for trigger metadata.
2. **Hash change:** If the URL hash changes to `#get-pre-approved` (e.g., via `RippleCtaLink` client nav), the `hashchange` listener opens the drawer.
3. **Direct URL:** On mount, `DrawerHashListener` checks if `window.location.hash === DRAWER_HASH` and opens immediately.
4. **Route navigation:** `RouteResetListener` watches `usePathname()`. Navigating to a page with the drawer hash opens a fresh session; navigating without it calls `reset()`.

Hash is cleared via `history.replaceState` so back button goes to the previous page, not the hash.

**Modifier key bypass:** Meta, ctrl, shift, alt clicks, right-clicks, `target="_blank"`, `download` attributes, cross-origin links, and different-pathname links are all ignored by the click interceptor.

## Exports

| Export | Type | Description |
|---|---|---|
| `MarketingDrawerProvider` | Component | Full provider with route-sync (use in marketing layout) |
| `DrawerProvider` | Component | State + hash listener + drawer render (no route-sync) |
| `useDrawer()` | Hook | `{ isOpen, title, amount, source, heroTruckType, open, close, reset, setAmount }` |
| `DRAWER_HASH` | `string` | `"#get-pre-approved"` |
| `SLIDER_MIN/MAX/STEP/DEFAULT` | `number` | `20000 / 500000 / 5000 / 100000` |
| `buildPreApprovalHref` | Function | Builds `/pre-approval?amount=...` URL |
| `buildDrawerContinueHref` | Function | Builds continue URL with optional `trucktype` param |
| `resolveDrawerTriggerHref` | Function | Returns `DRAWER_HASH` for marketing routes, fallback otherwise |
| `buildDrawerTriggerDataAttributes` | Function | Encodes trigger payload as `data-drawer-*` HTML attributes |
| `resolveSelectionDrawerTrigger` | Function | Maps hero drawer configs to trigger payloads |
| Hero constants | Objects | `ROLLBACK_HERO_DRAWER`, `ROTATOR_HERO_DRAWER`, etc. |

## Viewport Behavior

- **Mobile (<768px):** iOS-style bottom sheet with drag-to-dismiss, spring animation, and no explicit close button. Drag gesture is blocked when content is scrolled or when touching the slider.
- **Desktop (768px+):** Centered modal (max-width 480px) with scale transition, close button in top-right corner.

## Close Mechanisms

| Trigger | Animation | Notes |
|---|---|---|
| Backdrop click | Yes (exit animation) | |
| Escape key | Yes (exit animation) | Stops propagation |
| Close button (desktop) | Yes (exit animation) | |
| Drag dismiss (mobile) | Yes (sheet slides down) | Velocity ≥500px/s or distance ≥100px/25% |
| Continue button | **No animation** | Calls `unlockBodyScroll()` directly, then navigates |
| Route change | Via `reset()` | AnimatePresence handles exit |

## Scroll Lock

Imperative module (`scroll-lock.ts`) using `position: fixed + top: -scrollY` — the only technique that reliably blocks iOS Safari touch scrolling.

- `lockBodyScroll(scrollable)` — called synchronously from `open()`, **before** setState, so the lock is in place before React paints. Sets body fixed, compensates scrollbar width via `padding-right` and `--scrollbar-gutter` CSS variable, pins `[data-freeze-on-lock]` elements at viewport positions, adds non-passive touchmove handler.
- `unlockBodyScroll()` — restores all styles, calls `window.scrollTo()` to restore position, removes touchmove handler. Called from:
  - `AnimatePresence.onExitComplete` (normal close — after exit animation)
  - `handleContinue` (before navigation — no animation)
  - Unmount effect in `PreApprovalDrawer` (safety net)
- `updateScrollableRef(el)` — updates the element that touchmove allows. Called after drawer content mounts.

## Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` → title `<h2>`, `aria-describedby` → description `<p>`
- Focus trap: Tab/Shift+Tab cycle within dialog focusable elements
- Focus moves to dialog on open (via `requestAnimationFrame`)
- Focus restored to previously-active element on close
- Escape key closes dialog
- Slider: `aria-label="Estimated financing amount"`, `aria-valuetext` with formatted currency

## Reduced Motion

When `prefers-reduced-motion` is active:
- All spring/scale/slide animations replaced with instant opacity transitions (`duration: 0`)
- Drag-to-dismiss disabled on mobile sheet
- Slider and all interactive behavior unchanged

## Test Coverage

69 tests across 7 files in `__tests__/`:

| File | Tests | Coverage |
|---|---|---|
| `triggers.test.ts` | 8 | URL builders, session creation, data attributes, hero mappings |
| `scroll-lock.test.ts` | 14 | Lock/unlock styles, idempotency, touchmove, frozen elements, scrollbar compensation |
| `AmountSlider.test.tsx` | 5 | Currency formatting, onChange, aria attributes, max value |
| `DrawerContext.test.tsx` | 8 | State transitions, lockBodyScroll timing, provider error |
| `DrawerHashListener.test.tsx` | 15 | Hash detection, click interception, modifier/right-click bypasses |
| `RouteResetListener.test.tsx` | 3 | Pathname change → reset or open |
| `PreApprovalDrawer.test.tsx` | 16 | Dialog a11y, portal, close mechanisms, focus trap, navigation |

Run: `npm test -- components/ui/pre-approval-drawer`

## Dependencies

- `framer-motion` — AnimatePresence, motion, useDragControls, useReducedMotion
- `react-dom` — createPortal
- `next/navigation` — useRouter, usePathname
- `@/lib/press-feedback` — PressFeedbackRipple, usePressFeedback (Continue button)
