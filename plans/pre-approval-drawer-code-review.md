# Pre-Approval Drawer Code Review

Scope: `components/ui/pre-approval-drawer`

Review lenses:
- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `framer-motion-animator`

Validation snapshot:
- `npx eslint components/ui/pre-approval-drawer` passes
- `npm test -- components/ui/pre-approval-drawer/__tests__/triggers.test.ts` passes
- Existing automated coverage is limited to trigger/helper utilities and does not cover rendered drawer behavior

## Findings

### ~~1. High: `PreApprovalDrawer` mutates the DOM during render and never cleans up its portal node~~ ✅ (c80b17d)
- Lens: React/Next
- File: `components/ui/pre-approval-drawer/PreApprovalDrawer.tsx:80-95`
- What I found: `usePortalRoot()` reads from `document`, creates a new `div`, and appends it to `document.body` during render. The node is never removed on unmount.
- Why it matters: this makes render impure, which is exactly the kind of work React expects to happen in an effect or in pre-existing DOM structure. It is harder to reason about in Strict Mode, introduces lifecycle surprises, and leaks a portal root if the provider is mounted and unmounted repeatedly.
- Recommended improvement: move portal-root creation and cleanup into an effect-based hook or provide a stable portal mount point higher in the app shell.

### ~~2. High: the provider is doing state, orchestration, event interception, and rendering in one place~~ ✅ (76e19a2)
- Lens: Composition
- File: `components/ui/pre-approval-drawer/DrawerContext.tsx:79-170`
- What I found: `DrawerProvider` owns session state, body-scroll locking, global hash/click listeners, and the actual `PreApprovalDrawer` render. `DrawerHashListener` is embedded inside the same provider contract.
- Why it matters: this is the monolithic shape the composition skill warns against. It hides behavior behind one provider, makes the drawer difficult to reuse outside the marketing layout, and couples UI structure to a specific trigger mechanism.
- Recommended improvement: split the module into a smaller state provider plus explicit trigger/listener/render pieces, or expose a compound API such as `Drawer.Provider`, `Drawer.TriggerListener`, and `Drawer.Content`.

### ~~3. Medium: route changes are handled by forced remounts instead of explicit lifecycle logic~~ ✅
- Lens: Composition / React
- File: `components/ui/pre-approval-drawer/MarketingDrawerProvider.tsx:7-14`
- What I found: `MarketingDrawerProvider` uses `key={pathname}` to remount the entire drawer provider on every pathname change.
- Why it matters: forced remounting works as a reset mechanism, but it is a blunt instrument. It resets all provider-local state, ties cleanup behavior to React remount semantics, and makes the provider harder to evolve if more state or side effects are added later.
- Recommended improvement: keep the provider stable and respond to pathname changes with explicit close/reset logic inside the provider or a dedicated route-sync layer.

### 4. Medium: `AmountSlider` mixes controlled and uncontrolled behavior
- Lens: React
- File: `components/ui/pre-approval-drawer/AmountSlider.tsx:16-34`
- What I found: the slider accepts `value` and `onChange`, but still writes to local state on every change even when `value` is controlled by the parent.
- Why it matters: this creates two sources of truth, makes the component contract harder to reason about, and can cause confusion if a future caller partially controls the slider or adds async state updates.
- Recommended improvement: make the component explicitly controlled, or split it into controlled/uncontrolled variants through a `useControllableState` style helper.

### 5. Medium: scroll locking is implemented as a singleton with global mutable module state
- Lens: React / Composition
- File: `components/ui/pre-approval-drawer/scroll-lock.ts:15-183`
- What I found: scroll locking uses module-level flags, saved styles, a mutable scrollable element ref, and a global `[data-freeze-on-lock]` query.
- Why it matters: this is fragile if another modal, drawer, or overlay adopts the same helper. There is no reference counting, no ownership model, and no isolation between concurrent locks. The global selector also creates cross-component coupling that is not visible from the public API.
- Recommended improvement: move scroll-lock ownership behind an overlay manager or a scoped lock API that can support nesting, cleanup guarantees, and explicit freeze targets.

### 6. Medium: the context value is broad and couples all consumers to all session changes
- Lens: Composition / React
- File: `components/ui/pre-approval-drawer/DrawerContext.tsx:34-57`, `components/ui/pre-approval-drawer/DrawerContext.tsx:156-163`
- What I found: one context publishes the entire state object plus all actions, and `useDrawer()` returns all of it as a single bundle.
- Why it matters: every context consumer is now subscribed to amount changes, open/close changes, title changes, and hero-truck metadata whether it needs them or not. The problem is small today, but the provider already sits high in the marketing tree and the slider changes state frequently.
- Recommended improvement: split read/write concerns or expose narrower hooks for trigger-only consumers versus drawer-content consumers.

### ~~7. Medium: behavioral test coverage stops at pure helper functions~~ ✅
- Lens: React / Motion
- File: `components/ui/pre-approval-drawer/__tests__/triggers.test.ts:1-165`
- What I found: the only tests exercise URL and trigger helpers. There are no tests for actual rendered drawer behavior.
- Why it matters: the riskiest parts of this module are behavioral: focus trapping, escape close, backdrop close, hash-trigger opening, route-reset behavior, scroll-lock cleanup, reduced-motion branches, and mobile drag dismissal. None of that is currently protected.
- Recommended improvement: add component-level tests for keyboard and hash flows plus one browser-level check for mobile drag and scroll-lock behavior.

### 8. Low: import hygiene is weak because the barrel mixes server-safe values with client-only APIs
- Lens: React/Next
- File: `components/ui/pre-approval-drawer/index.ts:1-29`
- Supporting usage: `app/(marketing)/layout.tsx:1-8`
- What I found: the barrel re-exports client-only modules (`DrawerProvider`, `useDrawer`) alongside server-safe constants (`DRAWER_HASH`, URL builders). Several server-side config files import from the barrel.
- Why it matters: local barrels are not as expensive as third-party barrels, but this one blurs the server/client boundary and makes accidental import pollution more likely as the module grows.
- Recommended improvement: keep server-safe exports in a server-safe entrypoint and expose client APIs from a separate import path.

### 9. Low: currency formatting work is recreated on every slider update
- Lens: React
- File: `components/ui/pre-approval-drawer/AmountSlider.tsx:7-14`
- What I found: `formatCurrency()` constructs a new `Intl.NumberFormat` every time it runs, including while the range input is dragged.
- Why it matters: this is a small hot-path inefficiency rather than a correctness problem, but slider movement is one of the highest-frequency update paths in the component.
- Recommended improvement: hoist the formatter to module scope and keep `formatCurrency()` as a thin wrapper.

### 10. Low: motion architecture is good today, but desktop/mobile variants are duplicated rather than centralized
- Lens: Motion
- File: `components/ui/pre-approval-drawer/PreApprovalDrawer.tsx:39-58`, `components/ui/pre-approval-drawer/PreApprovalDrawer.tsx:315-463`
- What I found: the drawer uses transform/opacity-based motion and respects reduced motion, but the frame logic duplicates animation branching across separate desktop and mobile implementations.
- Why it matters: this is not a bug. It becomes a maintenance problem if more motion states are added, because timing, accessibility, and exit behavior will need to stay aligned across two branches.
- Recommended improvement: extract a shared motion config layer or common frame primitive if the interaction model expands.

## Open Questions / Assumptions

- I treated this as a best-practices review, not a bug-fix request. Some findings are architectural risks rather than current user-visible defects.
- I kept the review scoped to `components/ui/pre-approval-drawer` and only referenced adjacent files when they directly affected the drawer’s public API or lifecycle.
- I assumed the current `framer-motion` approach is intentional and did not treat “not using Radix Dialog” as a finding by itself.

## Strengths Already Present

- Reduced-motion handling is deliberate. The drawer branches motion behavior through `useReducedMotion()` instead of just disabling one animation.
- The motion primitives mostly animate transform and opacity, which is the right default for performant sheet/modal transitions.
- `DrawerHashListener` uses `useEffectEvent`, which avoids stale closure problems in the global event handlers.
- The trigger and URL-building utilities are well typed and have passing tests around their current mapping logic.
- The slider has a large thumb target, descriptive `aria-valuetext`, and clear visible value feedback.

## Recommended Improvement Roadmap

- [x] **1. Fix the render-phase portal creation first.** It is the clearest lifecycle violation and the easiest high-impact cleanup. *(completed: c80b17d)*
- [x] **2. Separate drawer state from trigger orchestration.** That will make the provider easier to test, reuse, and reason about. *(completed: pending commit)*
- [ ] **3. Normalize the slider API and scroll-lock ownership** before adding more overlay behavior.
- [x] **4. Add behavioral tests** for open/close/focus/hash/mobile interactions before expanding the drawer feature set further. *(completed: pending commit — 61 new tests across 6 files)*

keep logs in this file
[text](pre-approval-drawer-cleanup-log.md)