# CTA Button Production API

## Summary

This document defines the production-grade API for the CTA button system across marketing and lead-funnel surfaces. The CTA system is not a decorative button primitive. It is a revenue-critical interaction boundary that must preserve correct navigation semantics, touch-first press behavior, stable analytics identity, and safe composition with the pre-approval flow.

The API is designed around these rules:

- Touch is the primary interaction modality.
- Core CTA behavior must remain correct even if motion is reduced, haptics disappear, or analytics sinks are absent.
- Internal navigation, external navigation, lead-entry, and non-navigation actions are separate contracts.
- Server-safe CTA declaration is separate from client-only interaction runtime.
- Pending UI is allowed only for explicitly async button actions.
- Disabled CTA semantics are explicit and intentional.
- `RippleCtaLink` is a compatibility surface during migration, not the long-term canonical public name.

Execution note:

- this document defines the target production API only
- phased rollout, verification gates, and evidence logging live in:
  - `plans/ctabutton/cta-button-migration-spec.md`
  - `plans/ctabutton/cta-button-verification-matrix.md`
- `plans/ctabutton/cta-button-phase-gates.md`
- `plans/ctabutton/cta-button-execution-log.md`

## System Mission

The CTA system exists to do four jobs reliably:

1. Present a primary action with clear affordance.
2. Convert user intent into exactly one committed action.
3. Preserve semantic navigation and accessibility.
4. Carry stable analytics and funnel-entry identity without leaking implementation details into every caller.

Ripple, haptics, and tap animation are support systems around intent confirmation. They are not the product contract.

## Design Principles

- Small public API, explicit ownership.
- Intent-first names, not animation-first names.
- Contract-level behavior is defined independently of Framer Motion details.
- Touch-down feedback starts immediately; commit happens exactly once.
- Navigation semantics remain correct for links versus buttons.
- Analytics support is part of the contract, but analytics wiring is optional.
- Haptics are reinforcement only and must never be required for correctness.
- Pre-approval composition reuses the existing pre-approval production API instead of redefining it.
- Migration must be incremental. No flag-day rewrite is required.

## Naming Conventions

The public TypeScript API should use one naming system consistently:

- `PascalCase` for types, interfaces, unions, and React components
- `camelCase` for functions, hooks, and exported values
- `SCREAMING_SNAKE_CASE` only for env vars
- `kebab-case` only for route segments, DOM attributes, and other external string values

The public API should use names that describe business intent or semantic role:

- `CtaLink` for navigation CTAs
- `CtaButton` for non-navigation CTAs
- `LeadCta` for revenue-critical lead-entry CTAs
- `CtaOrigin` for stable identity
- `PreApprovalEntry` for pre-approval composition
- `CtaInteractionConfig` for press behavior configuration

The public API must not use animation effects as primary names. `RippleCtaLink` may remain as a compatibility export during migration, but it is not the canonical production surface.

## Public Modules / Public Surfaces

The target API is split into four public surfaces plus one internal implementation boundary.

### 1. Feature contract

Target module:

```ts
@/features/cta/contract
```

This module owns canonical types shared by CTA rendering, analytics identity, interaction rules, and lead-entry composition. It is safe to import from server components, route config files, and section config files.

### 2. Client CTA runtime

Target module:

```ts
@/features/cta/client
```

This module owns the canonical client-facing React components:

- `CtaLink`
- `CtaButton`
- `LeadCta`

It also owns client-only event wiring, press-state runtime, and optional analytics observers.

### 3. Lead-entry composition

Target module:

```ts
@/features/cta/lead-entry
```

This module owns intent-level lead-entry types such as `PreApprovalEntry`. It composes with the existing pre-approval feature contract and must not duplicate pre-approval route or attribute builders.

### 4. Compatibility wrapper

Transitional module:

```ts
@/components/ui/ripple-cta-link
```

This module exists only to preserve broad existing call sites while the codebase migrates to the canonical API. It may delegate internally to `CtaLink` or `LeadCta`, but it must not remain the long-term ownership boundary.

### 5. Internal implementation boundary

Target module:

```ts
@/features/cta/internal
```

This module owns non-public rendering details:

- Framer Motion usage
- pressed-state tokens
- ripple rendering
- haptics adapter integration
- pointer and keyboard event normalization
- compatibility prop translation

No caller outside the CTA feature should depend on this boundary.

## Server/Client Boundary Contract

The CTA system has two distinct layers.

### Server-safe declaration layer

The server-safe layer consists of plain data contracts from `@/features/cta/contract` and `@/features/cta/lead-entry`.

Rules:

- Server-safe CTA declarations must be serializable.
- Server-safe declarations must not require client hooks, callback props, or browser APIs.
- Server-safe declarations may define identity, copy, appearance tokens, navigation intent, and lead-entry intent.
- Pre-approval declarations must reuse `PreApprovalTrigger` from the existing pre-approval feature contract.

### Client runtime layer

The client runtime layer consists of React components and client-only callbacks from `@/features/cta/client`.

Rules:

- `onAnalyticsEvent` is client-only.
- press-state handling is client-only.
- motion rendering is client-only.
- haptics integration is client-only.
- server modules must not import Framer Motion, haptics packages, or CTA runtime internals.

### Boundary requirement

The same CTA declaration must remain valid whether the runtime eventually renders:

- a static accessible element
- a motion-enhanced element
- a haptics-enhanced element

The declaration is the contract. Motion and haptics are optional runtime enrichments.

## Canonical Types

```ts
import type { ReactNode } from "react";
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";

export type CtaPlacement =
  | "hero"
  | "section"
  | "sticky-nav"
  | "footer"
  | "inline"
  | "card";

export interface CtaOrigin {
  pageId: string;
  sectionId: string;
  ctaId: string;
  placement: CtaPlacement;
}

export interface CtaCopy {
  label: string;
  ariaLabel?: string;
}

export type CtaTone = "primary" | "secondary" | "inverse";
export type CtaSize = "sm" | "md" | "lg";
export type CtaAlignment = "center" | "between";

export interface CtaAppearance {
  tone?: CtaTone;
  size?: CtaSize;
  align?: CtaAlignment;
  fullWidth?: boolean;
  className?: string;
}

export type CtaModality = "touch" | "mouse" | "keyboard";

export type CtaIntent = "navigate" | "lead-entry" | "action";

export type CtaCancelReason =
  | "pointer-cancel"
  | "scroll-cancel"
  | "drift-cancel"
  | "blur-cancel"
  | "disabled";

export interface CtaInteractionConfig {
  pressRetentionPx?: number;
  cancelOnScroll?: boolean;
  reducedMotion?: "system" | "always" | "never";
  haptics?: "auto" | "off";
}

export type CtaNavigation =
  | {
      kind: "internal";
      href: string;
      prefetch?: boolean;
      replace?: boolean;
      scroll?: boolean;
    }
  | {
      kind: "external";
      href: string;
      target?: "_self" | "_blank";
      rel?: string;
    };

export interface PreApprovalEntry {
  kind: "pre-approval";
  trigger: PreApprovalTrigger;
}

export interface CtaRenderSlots {
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

export interface CtaBaseModel {
  origin: CtaOrigin;
  copy: CtaCopy;
  appearance?: CtaAppearance;
  interaction?: CtaInteractionConfig;
  disabled?: boolean;
}

export interface CtaLinkModel extends CtaBaseModel {
  navigation: CtaNavigation;
}

export type CtaButtonAction =
  | {
      kind: "sync";
      onPress(context: {
        origin: CtaOrigin;
        modality: CtaModality;
      }): void;
    }
  | {
      kind: "async";
      pendingLabel: string;
      onPress(context: {
        origin: CtaOrigin;
        modality: CtaModality;
      }): Promise<void>;
    };

export interface CtaButtonModel extends CtaBaseModel {
  type?: "button" | "submit";
  action: CtaButtonAction;
}

export interface LeadCtaModel {
  copy: CtaCopy;
  appearance?: CtaAppearance;
  interaction?: CtaInteractionConfig;
  disabled?: boolean;
  entry: PreApprovalEntry;
}

export type CtaAnalyticsEvent =
  | {
      type: "cta_press_started";
      origin: CtaOrigin;
      intent: CtaIntent;
      modality: CtaModality;
      timestamp: number;
    }
  | {
      type: "cta_press_canceled";
      origin: CtaOrigin;
      intent: CtaIntent;
      modality: CtaModality;
      reason: CtaCancelReason;
      timestamp: number;
    }
  | {
      type: "cta_committed";
      origin: CtaOrigin;
      intent: CtaIntent;
      modality: CtaModality;
      href?: string;
      timestamp: number;
    };

export type CtaAnalyticsObserver = (
  event: CtaAnalyticsEvent,
) => void;

export interface CtaLinkProps extends CtaLinkModel, CtaRenderSlots {
  onAnalyticsEvent?: CtaAnalyticsObserver;
}

export interface CtaButtonProps extends CtaButtonModel, CtaRenderSlots {
  onAnalyticsEvent?: CtaAnalyticsObserver;
}

export interface LeadCtaProps extends LeadCtaModel, CtaRenderSlots {
  onAnalyticsEvent?: CtaAnalyticsObserver;
}

export function CtaLink(props: CtaLinkProps): JSX.Element;
export function CtaButton(props: CtaButtonProps): JSX.Element;
export function LeadCta(props: LeadCtaProps): JSX.Element;
```

Boundary note:

- `CtaBaseModel`, `CtaLinkModel`, `CtaButtonModel`, `LeadCtaModel`, and `PreApprovalEntry` are the server-safe declaration contracts.
- `CtaRenderSlots`, `CtaLinkProps`, `CtaButtonProps`, and `LeadCtaProps` are client runtime surfaces because they may carry React render slots and callbacks.
- `LeadCta` identity is derived from `entry.trigger.origin`; it must not accept a second top-level `origin`.

## Appearance Contract

Appearance is a compact token set. It must not become a dumping ground for one-off styling modes.

Rules:

- `tone` is the canonical appearance selector. Do not expose public names tied to a specific effect or implementation.
- `size` controls hit area and spacing. It is part of usability, not just decoration.
- `align` controls content distribution, replacing ad hoc `justify` naming.
- `fullWidth` is allowed because width behavior is a common CTA layout requirement.
- `className` is an escape hatch for integration with existing section styles, not a substitute for adding unsupported public variants.
- `className` must not remove required hit-area sizing, focus-visible treatment, pressed-state visibility, or disabled-state treatment.

Recommended tone mapping from current usage:

- current `filled` maps to `tone: "primary"`
- current `outline` maps to `tone: "secondary"`
- current `outline-dark` maps to `tone: "inverse"`

Recommended alignment mapping from current usage:

- current `justify="center"` maps to `align: "center"`
- current `justify="between"` maps to `align: "between"`

The public API should not expose ripple color, tap spring values, or motion durations as caller-owned knobs.

## Content Contract

The canonical content contract is intentionally narrow.

Rules:

- `copy.label` is required.
- `copy.label` is the canonical visible action label.
- `copy.ariaLabel` is optional and only for cases where the accessible name must differ from the visible label.
- Icons are optional render slots, not identity.
- Analytics identity must never be derived from label text.

Recommended behavior:

- Canonical CTA declarations should use `copy.label` and optional icon slots.
- Arbitrary `children` content is compatibility-only and should remain on the migration wrapper, not the long-term production API.

Rationale:

- plain copy is server-safe
- plain copy keeps analytics and accessibility predictable
- plain copy avoids turning the CTA API into a generic content container

## Navigation Contract

Navigation is explicit. The CTA system must not infer core behavior from `href` string shape alone.

### Internal navigation

Internal navigation uses:

```ts
{
  kind: "internal";
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
}
```

Rules:

- Internal navigation renders through `next/link`.
- The final interactive DOM node must not rely on `legacyBehavior` or `passHref`.
- Internal navigation must not render a nested `<a>` inside `Link`.
- Internal navigation may carry feature attributes such as pre-approval trigger attributes.
- Internal `href` must be an app-relative path beginning with `/`.
- Internal `href` must not contain a scheme or protocol-relative prefix such as `http://`, `https://`, `mailto:`, `tel:`, or `//`.

### External navigation

External navigation uses:

```ts
{
  kind: "external";
  href: string;
  target?: "_self" | "_blank";
  rel?: string;
}
```

Rules:

- External navigation renders as a native `<a>`.
- When `target="_blank"`, the runtime must enforce safe `rel` tokens by preserving or adding `noopener noreferrer`.
- External navigation must not be routed through `next/link`.

### Non-navigation actions

Non-navigation actions must not impersonate links.

Rules:

- Use `CtaButton` for submit, open-local-ui, or other non-navigation actions.
- Buttons do not accept `navigation`.
- Links do not accept `action`.

This separation is mandatory.

## Interaction Contract

The interaction contract defines the semantics of press, cancel, and commit independently of animation.

System invariant: all canonical CTA surfaces — `CtaLink`, `LeadCta`, `CtaButton`, and any compatibility-backed CTA still in service — are subject to this interaction contract, the touch-first behavioral contract, the pressed-state visual contract, and the haptics contract. No CTA variant is exempt.

Rules:

- Press feedback starts immediately on touch-down or mouse-down.
- Keyboard activation follows native semantics: Enter activates links; Enter and Space activate buttons.
- A CTA may move from `idle` to `pressed`, `canceled`, or `committed`, but commit may occur exactly once per interaction.
- Cancel and commit are mutually exclusive terminal outcomes for a single press.
- Scroll, pointer cancel, or pointer drift beyond retention distance cancels touch press before commit.
- Press logic must guard against duplicate commit from mixed touch and click event sequences.
- The first active interaction owns the CTA until it reaches a terminal state.
- Additional touches, mouse presses, or keyboard activations that arrive while a press is already armed or pending must be ignored.

Recommended defaults:

- `pressRetentionPx`: `10`
- `cancelOnScroll`: `true`
- `reducedMotion`: `"system"`
- `haptics`: `"auto"`

The interaction system should be modeled as event-driven handler logic, not effect-choreographed state recovery.

## Touch-First Behavioral Contract

Touch is the primary modality for this system.

Required behavior:

- A touch press enters visible pressed state immediately on touch-down.
- A touch press may cancel before commit when the pointer drifts or when scrolling intent is detected.
- A canceled touch press must not navigate, submit, or fire a commit event.
- A successful touch press commits once and only once.
- Tap confirmation must not depend on hover.
- Touch behavior must remain correct even when reduced motion is enabled.

Desktop remains important, but desktop behavior must follow the touch-first model rather than defining the model.

Desktop-specific requirements:

- Mouse-down must produce visible pressed-state feedback.
- Releasing the mouse after leaving the press target must not commit.
- Hover polish is optional. Pressed-state feedback is required.
- Mixed-modality sequences triggered by one physical touch interaction must still commit at most once.

## Pressed-State Visual Contract

Pressed-state feedback is part of the product contract, not just a stylistic enhancement.

Required behavior:

- Pressed feedback begins immediately on touch-down and mouse-down.
- The pressed state must be visible in both mobile and desktop contexts.
- The pressed state must remain visible while the press is still armed.
- Cancel removes the pressed state.
- Commit may transition from pressed state into release or navigation, but it must not show a second independent press cycle.

Pressed-state feedback must not rely on opacity fade alone.

At least one non-opacity signal is required:

- scale change
- background or surface change
- border or ring change
- shadow or inset treatment
- content offset

Opacity may reinforce the state, but opacity alone is insufficient.

## Motion Contract

Framer Motion belongs to the rendering layer, not the business-logic ownership layer.

Rules:

- Motion may render ripple, tap compression, and release transitions.
- Motion must not own navigation decisions, analytics dispatch, or commit deduplication.
- Reduced-motion behavior is first-class and must preserve semantic correctness.
- Reduced-motion mode may remove ripple travel and tap animation, but it must keep static pressed-state visibility.
- Motion tokens such as spring constants and ripple duration are internal details unless a specific product requirement forces them public.

If motion is unavailable or disabled, the CTA must still render and behave correctly as a semantic link or button.

## Haptics Contract

Haptics are optional reinforcement only.

Required behavior:

- The public CTA API must not depend on a specific haptics package or vendor runtime.
- Haptics must sit behind an adapter or equivalent internal interface.
- Haptics default to optional auto-detection behavior.
- Haptics may be disabled per CTA via `interaction.haptics: "off"`.
- Haptics failure, absence, deprecation, or inconsistent browser support must not block pressed state, navigation, button action, analytics, or pre-approval entry.

Recommended internal interface:

```ts
export interface CtaHapticsAdapter {
  pulse(kind: "press-start" | "commit", options?: {
    reducedMotion: boolean;
  }): void;
}
```

This interface is an internal boundary. It is not required for callers to use the public CTA surfaces.

## Analytics Contract

Analytics support is part of the contract, but analytics wiring is optional.

### Identity rules

Every canonical CTA surface must provide stable origin identity:

- `pageId`
- `sectionId`
- `ctaId`
- `placement`

These values must follow these rules:

- they are implementation identifiers, not UI copy
- they are stable across copy refreshes
- they are slug-like
- they must not be inferred from the label

### Event delivery rules

- `onAnalyticsEvent` is optional.
- Missing `onAnalyticsEvent` must not change CTA behavior.
- A throwing analytics observer must not block navigation, button action, lead entry, or pressed-state cleanup.
- The CTA feature must not import a vendor SDK directly.

### Event guarantees

The public analytics contract supports three event phases:

- press started
- press canceled
- committed

This is sufficient for release-grade CTA observability without forcing sink wiring onto the critical path.

Timestamp rule:

- `timestamp` uses `Date.now()` semantics: integer milliseconds since the Unix epoch.

## Pending UI Policy

Pending UI is not a generic CTA feature. It is allowed only for explicitly async button actions.

Rules:

- `CtaLink` never shows pending UI.
- `LeadCta` never shows pending UI.
- Generic navigation does not become pending simply because analytics or haptics work is happening.
- `CtaButton` may show pending UI only when `action.kind === "async"`.
- Async button actions must define `pendingLabel`.
- Pending state must disable repeat commit while the async action is in flight.
- For button actions, commit means the CTA accepted the interaction and invoked exactly one `onPress` call. It does not mean the async work succeeded.
- If a sync action throws, the CTA must clear pressed or pending UI before surfacing the failure to caller-owned error handling.
- If an async action rejects, the CTA must clear pending UI and return to idle so the user can retry.
- Async action timeout, abort, and retry policy belong to the action owner, not the CTA primitive.

Examples:

- Good: async submit CTA that disables itself and shows pending text while awaiting a request
- Good: client-only CTA that opens a modal immediately with no pending state
- Bad: internal marketing link that becomes pending before navigation
- Bad: pre-approval entry CTA that blocks immediate handoff behind a spinner

## Accessibility Contract

Accessibility is part of the CTA contract.

Required behavior:

- Links remain links.
- Buttons remain buttons.
- Keyboard activation follows native semantics for the rendered element.
- Focus-visible treatment is required.
- Accessible name is provided by `copy.label` unless `copy.ariaLabel` overrides it.
- Reduced-motion behavior must remain usable and perceivable.

## Hydration Contract

Hydration must preserve the semantic and accessible contract that the server rendered.

Rules:

- The hydrated CTA must keep the same semantic element type as the server-rendered CTA.
- Hydration must not introduce a transient duplicate label, incorrect disabled state, or pre-pressed visual flash.

### Disabled semantics

Disabled CTA semantics are explicit.

Rules:

- A disabled CTA renders as a semantic disabled `<button type="button" disabled>`.
- A disabled CTA does not render as a disabled-looking anchor.
- A disabled CTA does not expose active navigation or action semantics.
- The disabled semantic choice is intentional and applies even when the enabled version would normally be a link.

Rationale:

- anchors do not support native disabled semantics
- a semantic disabled button is clearer for assistive technology and keyboard behavior
- this preserves one accessible disabled model across link-like and button-like CTA variants

If product requirements ever need a non-interactive but still discoverable destination, that is a different component contract and must not be smuggled into the CTA API as a fake disabled link.

## Performance Contract

The CTA feature must stay lightweight.

Required behavior:

- Server-safe declaration modules remain free of client runtime dependencies.
- Motion and haptics work occur only in the client runtime.
- A single CTA instance must not maintain more active ripple objects than needed for the current interaction.
- Analytics dispatch must be fire-and-forget.
- Press behavior must not depend on expensive layout polling or long-lived global listeners.

Recommended implementation constraints:

- at most one active ripple per CTA instance
- no provider required for normal CTA rendering
- optional haptics package isolated behind a client-only adapter boundary
- compatibility wrapper delegates to canonical runtime instead of duplicating interaction code

## Failure Containment

The CTA system must contain non-critical failures.

Required behavior:

- Analytics failures cannot block CTA behavior.
- Haptics failures cannot block CTA behavior.
- Reduced-motion mode cannot block CTA behavior.
- Motion disablement cannot block CTA behavior.
- Lead-entry composition failures must not corrupt unrelated CTA variants.
- Primary action failures must not leave the CTA stuck in pressed or pending UI.

Recommended containment model:

- swallow analytics observer exceptions after optional logging
- swallow haptics adapter exceptions
- fall back to static pressed-state styling if motion rendering is unavailable

The only failure that should stop commit is a genuine disabled or canceled interaction state.

## Composition With Pre-Approval Contract

The CTA system composes with pre-approval. It does not redefine pre-approval.

### Composition model

```ts
import type { PreApprovalTrigger } from "@/features/pre-approval/contract";

export interface PreApprovalEntry {
  kind: "pre-approval";
  trigger: PreApprovalTrigger;
}
```

### Rules

- `LeadCta` is the canonical CTA surface for pre-approval entry.
- `PreApprovalEntry.trigger` must use the existing `PreApprovalTrigger` contract.
- `entry.trigger.origin` is the canonical origin for `LeadCta` analytics identity and pre-approval handoff.
- CTA code must reuse the existing pre-approval route and attribute builders.
- CTA code must not manually construct pre-approval query strings.
- CTA code must not redefine pre-approval hash names, trigger attribute names, or route parsing rules.
- If a server-rendered non-CTA component needs raw pre-approval href or attributes, it should import from the pre-approval feature directly.

### Example

```tsx
const entry = {
  kind: "pre-approval",
  trigger: {
    origin: {
      pageId: "rollback-financing",
      sectionId: "hero-primary",
      ctaId: "hero-main-cta",
      placement: "hero",
    },
    drawer: {
      title: "How much financing do you need?",
    },
    handoff: {
      truckType: "rollback",
    },
  },
} satisfies PreApprovalEntry;

<LeadCta
  copy={{ label: "Get pre-approved" }}
  entry={entry}
/>
```

## Misuse Prevention Rules

The public API must explicitly prevent these failure modes:

- callers must not pass a bare `href` string and rely on runtime guessing for internal versus external navigation
- callers must not pass an absolute URL or protocol-relative URL as `kind: "internal"` navigation
- callers must not use `CtaButton` for navigation
- callers must not use `CtaLink` for non-navigation actions
- callers must not attach pending UI to link or lead-entry variants
- callers must not derive analytics identity from label text
- callers must not supply a second `origin` to `LeadCta`; `entry.trigger.origin` is authoritative
- callers must not depend on ripple or haptics to confirm press state
- callers must not import internal motion or haptics utilities directly
- callers must not redefine pre-approval trigger attributes in CTA code
- callers must not treat `RippleCtaLink` as the long-term canonical API
- callers must not reintroduce `next/link` `legacyBehavior` or nested anchor rendering
- callers must not expose disabled-looking anchors as the CTA disabled model
- callers must not use `className` to suppress required focus, pressed, hit-area, or disabled treatments

## Acceptance Criteria

Implementation is complete only when these scenarios pass:

1. `CtaLink` internal navigation renders correct `next/link` semantics without `legacyBehavior`, without `passHref`, and without a nested anchor.
2. `CtaLink` rejects invalid internal `href` shapes and renders external navigation as a native `<a>` with enforced safe `_blank` rel behavior.
3. `CtaButton` handles sync actions without exposing link semantics.
4. `CtaButton` async actions may enter pending state, cannot commit twice while pending, and clear pending state after rejection.
5. `LeadCta` reuses the existing pre-approval production API and emits the expected pre-approval trigger attributes.
6. Every canonical CTA surface requires stable `CtaOrigin` identity, and `LeadCta` derives it from `entry.trigger.origin`.
7. Press feedback starts in the same animation frame as touch-down or mouse-down.
8. Touch drift or scroll can cancel press before commit.
9. Overlapping or mixed-modality inputs still result in at most one commit for one interaction.
10. Reduced-motion mode preserves semantic correctness and visible pressed-state feedback.
11. Pressed-state feedback is visible on desktop and does not rely on opacity fade alone.
12. Haptics are optional, adapter-backed, and cannot block commit.
13. Analytics observers are optional and cannot block commit.
14. Generic navigation CTAs do not show pending UI.
15. Disabled CTA rendering is semantic, accessible, and intentional.
16. Hydration preserves semantic element type, accessible name, and disabled state without a visible flash of incorrect CTA state.
17. The compatibility path allows broad existing `RippleCtaLink` usage to migrate incrementally without a flag-day rewrite.

## Migration Posture

The migration must acknowledge the current state of the codebase:

- `RippleCtaLink` is broadly used.
- it currently owns internal link, external link, disabled, analytics, ripple, and pre-approval trigger behavior
- it currently carries a `next/link` `legacyBehavior` and `passHref` concern
- migration must be incremental; no flag-day rewrite is acceptable
- new implementation phases, gates, and removal rules are governed by the companion CTA migration planning documents

## Final Notes

This API is intentionally opinionated. It prioritizes touch correctness, semantic safety, analytics readiness, and controlled ownership boundaries over generalized flexibility. The goal is a stable CTA system that remains understandable under revenue pressure, supports pre-approval composition cleanly, and can absorb implementation churn in motion or haptics without regressing core conversion behavior.

## Recommended Canonical Public API

```ts
import type {
  CtaLinkProps,
  CtaButtonProps,
  LeadCtaProps,
  PreApprovalEntry,
  CtaOrigin,
  CtaInteractionConfig,
} from "@/features/cta/contract";

export { CtaLink, CtaButton, LeadCta } from "@/features/cta/client";
export type {
  CtaLinkProps,
  CtaButtonProps,
  LeadCtaProps,
  PreApprovalEntry,
  CtaOrigin,
  CtaInteractionConfig,
} from "@/features/cta/contract";
```

## Release Scope Recommendation

### What must ship now

- canonical `CtaLink`, `CtaButton`, and `LeadCta` surfaces
- explicit internal versus external navigation contract
- explicit touch-first press, cancel, and commit semantics
- visible pressed-state feedback on touch and desktop
- reduced-motion correctness
- adapter-backed optional haptics behavior
- optional non-blocking analytics observer support
- explicit disabled CTA semantics
- pre-approval composition that reuses the existing pre-approval production API
- `RippleCtaLink` compatibility-wrapper migration path
- removal of `legacyBehavior` and `passHref` from the compatibility path

### What can wait until after release

- full migration of all legacy call sites to canonical surfaces
- removal of the `RippleCtaLink` export
- stricter cleanup of compatibility-only analytics payload shapes
- broader visual polish work beyond the required pressed-state contract
- any expanded analytics sink integrations beyond the observer contract
