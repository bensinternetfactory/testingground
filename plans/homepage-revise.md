# Homepage Revision Plan: Reusable Ripple CTA + Web Haptics (Planning Only)

## Summary
Create a reusable CTA link component that is a **button-styled link** (anchor semantics, button appearance) and uses the **same ripple interaction pattern** as the current `HowItWorks` CTA, explicitly using the `web-haptics` package (`useWebHaptics` from `web-haptics/react`).

Apply this reusable CTA to homepage `EquipmentCards` and `ProgramCards` while preserving SEO-safe anchor behavior.

## Goals
- Keep SEO protected:
  - CTA navigation remains real anchor links (`next/link` with crawlable `href`), styled and behaved as primary buttons.
  - No JS-only routing for primary CTA actions.
  - No content parity differences between mobile and desktop that would look like cloaking.
- Keep UX consistent:
  - Same ripple + tap feedback behavior as `HowItWorks` CTA.
  - Shared CTA style system used across mobile and desktop.
- Keep performance controlled:
  - Minimize client boundary size.
  - Keep card content server-rendered where possible.

## Scope
### In scope
- Homepage route (`/`) card CTA behavior for:
  - `EquipmentCards`
  - `ProgramCards`
- Reusable CTA component extraction and usage plan.
- Explicit `web-haptics` package usage in plan.

### Out of scope
- Full-site migration of every button in one pass.
- Visual redesign of section layouts/copy.
- New analytics stack.

## Architecture Decisions
- Use a reusable CTA component (working name: `RippleCtaLink`) as the primary interaction primitive for CTA button-links.
- Preserve server/client boundaries:
  - Section structure + card content stay server-rendered.
  - CTA interaction element is a small client component.
- Keep existing config contracts (`linkHref`, `linkText`) to avoid unnecessary schema churn.

## Implementation Plan
1. Introduce reusable CTA component in shared UI layer.
2. Port the current `HowItWorks` ripple/tap behavior into this shared component.
3. Ensure haptic trigger uses `useWebHaptics` from `web-haptics/react` with subtle single-pulse default.
4. Update `HowItWorks` CTA to use the shared component (or wrap it) so behavior remains exact-match baseline.
5. Replace `EquipmentCards` and `ProgramCards` CTA links with the shared **button-link** component.
6. Keep link destinations, visible CTA text, and internal linking semantics unchanged.
7. Verify reduced-motion behavior and unsupported-haptics fallback no-op behavior.

## Public Interfaces / Type Changes
- New shared CTA props (planned):
  - `href: string`
  - `children: ReactNode`
  - `className?: string`
  - `hapticPattern?: { duration: number }[]` (default subtle pulse)
- No changes to:
  - route structure
  - page metadata
  - section config shapes (`EquipmentCardData`, `ProgramCardData`)

## SEO Guardrails (Must Not Regress)
- CTA remains crawlable anchor output while presenting as a button UI control.
- No conversion of CTA into `button + router.push`.
- No UA-based content differences; only interaction enhancement on touch-capable devices.
- Keep all current internal href targets and anchor text intent intact.

## UX/Haptics Rules
- Ripple effect should match current `HowItWorks` CTA interaction style.
- Use `web-haptics` package explicitly for tactile feedback.
- Haptics should be subtle and non-blocking.
- Respect `prefers-reduced-motion` for animation behavior.
- Desktop behavior remains fully functional; haptics no-op when unsupported.

## Verification Plan
- Run:
  - `npm run lint`
  - `npm run build`
- Manual checks on `/`:
  - `EquipmentCards` and `ProgramCards` CTAs navigate correctly.
  - Ripple/tap effect matches `HowItWorks` CTA.
  - Mobile touch devices trigger haptics (best-effort via `web-haptics`).
  - Desktop devices function normally without tactile dependency.
  - View DOM/inspect output confirms real anchor links with expected `href`s.
- Regression checks:
  - Existing CTA copy and destinations unchanged.
  - No layout break at mobile and desktop breakpoints.

## Acceptance Criteria
- Shared CTA component exists and is used by `HowItWorks`, `EquipmentCards`, and `ProgramCards` CTA button-links.
- `web-haptics` package is explicitly used for CTA tactile feedback.
- SEO guardrails above are satisfied.
- Lint and build pass.

## Assumptions
- `web-haptics` remains installed and available in the project.
- Current ripple behavior in `HowItWorks` is accepted as the reference interaction.
- First implementation phase targets homepage CTA consistency; broader app migration can be phase 2.
