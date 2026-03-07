# Homepage Revision Spec: Shared Ripple CTA with Haptics

## Objective
Create a reusable CTA link component that preserves anchor SEO semantics while unifying interaction quality (ripple, tap feedback, haptics) across:
- `HowItWorks`
- `EquipmentCards`
- `ProgramCards`

The component should feel native-like on touch devices without regressing accessibility, performance, or server/client boundaries.

## Final Decisions (Interview Confirmed)
- Add a tap-vs-swipe movement threshold in horizontal mobile card rails.
- Keep haptics enabled even when reduced motion is enabled; reduce haptic intensity under reduced motion.
- Keep keyboard accessibility fully intact (`Enter`/`Space` activation behavior preserved).
- Use route-priority prefetching (not blanket prefetch for all links).
- Add explicit interaction performance acceptance criteria.
- Define analytics schema now; analytics must be fire-and-forget and must not block navigation.
- Use best-practice shared API design and tokenized styling.
- Placeholder links are allowed; mark them explicitly in config.
- Cap to one active ripple per CTA instance.
- Require no-JS baseline anchor behavior.
- Keep server-rendered sections and isolate client interactivity to CTA child component.
- Add double-tap guard to prevent accidental duplicate activation.
- Handle external URLs with native anchor policy and no Next prefetch.
- Add subtle desktop-only icon nudge on hover/focus.
- Do not implement low-power-specific behavior unless there is measured jank.
- Ban blocking async work in CTA handlers.
- Document visual states in component docs now; Storybook installation is out of current implementation scope.
- Expose size variants now (`sm`, `md`, `lg`).
- Include contrast/accessibility regression checks for card CTA conversion.

## Scope
### In Scope
- Shared `RippleCtaLink` component in `components/ui/ripple-cta-link/`
- Replace CTA usage in:
  - `components/sections/page/how-it-works/HowItWorks.tsx`
  - `components/sections/page/equipment-cards/EquipmentCards.tsx`
  - `components/sections/page/program-cards/ProgramCards.tsx`
- Remove legacy `how-it-works/RippleButton.tsx`
- Update local `CLAUDE.md` docs for affected component directories

### Out of Scope
- Full site-wide CTA migration
- Analytics vendor integration (event contract only in this phase)
- Storybook setup/installation
- Link destination rewiring for placeholders

## SEO and Semantics Requirements
- CTAs must render as real anchors with crawlable `href`.
- Do not replace navigation with `button + router.push`.
- No UA-based content divergence.
- No hydration-dependent functional requirement for navigation.
- Placeholder destinations are allowed, but must be explicitly marked in config for QA/analytics awareness.

## Architecture
- Shared component: `RippleCtaLink` (`"use client"`).
- Parent section and card list components remain Server Components.
- Card content/config remains server-rendered; only CTA interaction is client-side.
- Keep existing content schemas (`linkHref`, `linkText`) and add optional placeholder metadata.

## Component Contract
Planned props for `RippleCtaLink`:
- `href: string`
- `label: string`
- `icon?: ReactNode`
- `iconPosition?: "start" | "end"` (default `"end"`)
- `size?: "sm" | "md" | "lg"` (default `"md"`)
- `className?: string`
- `prefetch?: boolean` (internal links only)
- `isPlaceholder?: boolean` (analytics/QA annotation only; still navigates)
- `onAnalyticsEvent?: (payload) => void` (fire-and-forget hook)

Implementation notes:
- Keep `children` support deferred unless a concrete use case requires it.
- Preserve `next/link` for internal URLs and native `<a>` behavior for external URLs.

## Interaction Behavior
- Tap spring: same baseline as current HowItWorks (`scale: 0.96`).
- Ripple: green tone (`bg-[#22C55E]/20`) matching reference.
- Ripple cap: max 1 active ripple per CTA instance.
- Double-tap guard: ignore duplicate activation for ~250ms after first tap.
- Swipe guard: in horizontal scroll containers, only trigger tap effects when movement stays under threshold.
- Reduced motion:
  - Disable ripple and spring animation.
  - Keep haptics enabled at lower intensity.
- Keyboard:
  - Preserve semantic keyboard activation.
  - No haptic on keyboard activation.
  - Optional center-origin visual press effect if motion is allowed.
- Desktop enhancement: subtle icon nudge on hover/focus.

## Haptics
- Use `useWebHaptics` from `web-haptics/react`.
- Pattern baseline: subtle single pulse.
- Must degrade gracefully on unsupported devices.
- Never block navigation on haptic execution.

## External vs Internal Link Rules
- Internal links:
  - Use `next/link`.
  - Apply route-priority `prefetch` strategy.
- External links:
  - Use native `<a>`.
  - Apply `target`/`rel` policy as needed.
  - Disable Next prefetch behavior.

## Analytics Contract (Phase 1)
Define payload shape now (implementation can be no-op until provider exists):
- `component`: `"RippleCtaLink"`
- `section`: `"how-it-works" | "equipment-cards" | "program-cards" | string`
- `cardId?: string`
- `href: string`
- `label: string`
- `isPlaceholder: boolean`
- `inputModality`: `"touch" | "mouse" | "keyboard"`
- `timestamp: number`

Rules:
- Fire-and-forget only.
- No `await` in click handlers.
- Navigation must never wait for analytics.

## Visual and Accessibility Requirements
- Convert EquipmentCards and ProgramCards CTAs from inline text links to full-width pill CTAs.
- Maintain or improve contrast for all states: default, hover, focus, active, disabled-like placeholder state if styled.
- Preserve visible focus indicators.
- Ensure mobile and desktop parity in content and destination semantics.
- Document states in `CLAUDE.md` (default/hover/focus/active/reduced-motion).

## Performance Requirements
- Keep client boundary minimal and local to CTA.
- No expensive async logic in event handlers.
- Interaction work should stay under a single frame budget on mid-tier mobile in practical testing.
- Do not add low-power-mode feature branches unless performance profiling shows need.

## File Plan
### Create
- `components/ui/ripple-cta-link/RippleCtaLink.tsx`
- `components/ui/ripple-cta-link/index.ts`
- `components/ui/ripple-cta-link/CLAUDE.md`

### Modify
- `components/sections/page/how-it-works/HowItWorks.tsx`
- `components/sections/page/how-it-works/CLAUDE.md`
- `components/sections/page/equipment-cards/EquipmentCards.tsx`
- `components/sections/page/equipment-cards/CLAUDE.md`
- `components/sections/page/program-cards/ProgramCards.tsx`
- `components/sections/page/program-cards/CLAUDE.md` (if present)
- `components/sections/page/equipment-cards/config.ts` and `program-cards/config.ts` only if adding `isPlaceholder` metadata

### Delete
- `components/sections/page/how-it-works/RippleButton.tsx`

## Verification
Run:
```bash
npm run lint
npm run build
```

Manual checks on `/`:
- All three sections use shared CTA behavior.
- Anchors render with real `href` values.
- Card rail swipe does not accidentally trigger CTA effects/navigation.
- Rapid double taps do not trigger duplicate activation.
- Reduced-motion behavior: no ripple/spring, lower-intensity haptic, navigation unaffected.
- Keyboard navigation and activation remain fully functional.
- Desktop icon nudge appears on hover/focus and does not affect layout.
- Placeholder links behave as expected and are annotated for tracking.
- Contrast/focus states pass accessibility expectations.

## Acceptance Criteria
- Shared CTA component used by HowItWorks, EquipmentCards, and ProgramCards.
- `web-haptics` integration is explicit and non-blocking.
- SEO-safe anchor semantics preserved.
- Server/client boundary remains minimal and intentional.
- Performance and accessibility guardrails above are met.
- Lint and build pass.
