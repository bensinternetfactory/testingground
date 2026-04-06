# Pre-Approval Drawer Cleanup Log

Progress log for the cleanup work tracked in `plans/pre-approval-drawer-code-review.md`.

---

## Roadmap Step 1: Fix render-phase portal creation (Issue #1)

**Status:** Done
**Commit:** `c80b17d` — "Fix render-phase portal creation in pre-approval drawer"
**What changed:** Moved portal root creation out of the render phase. The root `<div id="pre-approval-drawer-root">` is now placed in `app/layout.tsx` as static markup. `PreApprovalDrawer.tsx` queries it with `usePortalRoot()` and returns null during SSR. No render-phase DOM mutation, no leaked nodes.

---

## Roadmap Step 2: Separate drawer state from trigger orchestration (Issue #2)

**Status:** Done (pending commit)
**What changed:** Split the monolithic `DrawerContext.tsx` (173 lines) into three focused files:

- **`DrawerContext.tsx`** — slimmed to pure state provider (`DrawerStateProvider` + `useDrawer()`). Removed hash listener, helper functions, and drawer rendering. No logic changes to state management or scroll-lock timing.
- **`DrawerHashListener.tsx`** (new) — extracted `DrawerHashListener` component plus its `clearDrawerHash` and `isDrawerTarget` helpers. Same `useEffectEvent` pattern, same click/hashchange listeners.
- **`DrawerProvider.tsx`** (new) — thin composition shell that wires `DrawerStateProvider` + `DrawerHashListener` + `PreApprovalDrawer`. Uses an inner component (`DrawerProviderInner`) to bridge the context boundary.

Updated import paths in `index.ts` and `MarketingDrawerProvider.tsx`. No consumer API changes — `DrawerProvider`, `useDrawer()`, and all barrel exports remain identical.

**Verification:** tsc clean, eslint clean, trigger tests pass, production build succeeds. Browser-validated on desktop (open/close from top and mid-scroll, backdrop close, Escape close) and mobile viewport (bottom sheet open from mid-scroll, scroll lock/restore correct).

---

## Finding #3: Replace key={pathname} with explicit route-sync logic

**Status:** Done (pending commit)
**What changed:** Removed the `key={pathname}` forced remount from `MarketingDrawerProvider` and replaced it with explicit lifecycle logic:

- **`DrawerContext.tsx`** — added `reset()` action that returns all session state to defaults (`getClosedDrawerSession`). Exposed in `DrawerActions` interface and `useDrawer()` hook.
- **`RouteResetListener.tsx`** (new) — watches `usePathname()` via a ref-based previous-value pattern. On route change: calls `open()` if destination has `#get-pre-approved` hash, otherwise calls `reset()` to close and clear session state.
- **`MarketingDrawerProvider.tsx`** — removed `key={pathname}` and `usePathname()`. Now renders a `MarketingRouteSync` bridge component inside `DrawerProvider` that wires `RouteResetListener` to the drawer context.
- **`PreApprovalDrawer.tsx`** — updated safety-net comment to reflect new design (comment-only).

**Behavior improvement:** The drawer now exits with a smooth animation on route change instead of being instantly destroyed by the forced remount.

**Verification:** tsc clean, eslint clean, trigger tests pass, production build succeeds. Browser-validated: open+navigate closes drawer and unlocks scroll, direct URL with hash opens drawer, session state resets after navigation, no stuck scroll lock.

---

## Roadmap Step 3: Normalize slider API and scroll-lock ownership (Issues #4, #5)

**Status:** Next up
