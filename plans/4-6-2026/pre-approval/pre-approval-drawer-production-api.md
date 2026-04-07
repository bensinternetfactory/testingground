# Pre-Approval Drawer Production API

## Summary

This document defines the production-grade API for the pre-approval drawer across all marketing pages. The drawer is not a generic UI primitive. It is a revenue-critical funnel entrypoint whose contract must stay stable across CTA variants, layouts, analytics integrations, and future implementation refactors.

The API is designed around these rules:

- Every `(marketing)` page can mount and use the drawer.
- Every continue action must pass `amount`.
- A CTA may optionally pass `truckType`.
- Every CTA trigger must provide stable analytics identity: `pageId`, `sectionId`, and `ctaId`.
- Analytics support is built into the feature contract, but external analytics wiring is optional.
- The public API must be hard to misuse and must not require section authors to know query param names, drawer internals, or analytics vendor details.

## Design Principles

- Small public API, explicit ownership.
- Server-safe CTA wiring separate from client-only drawer runtime.
- Analytics context, drawer presentation, and route handoff are separate concerns.
- One root mount for the feature in marketing layout.
- One route contract for `/pre-approval`.
- Implementation details may evolve without changing the public contract.
- Drawer failures must not take down the page beneath it.

## Naming Conventions

The public TypeScript API should use one naming system consistently:

- `PascalCase` for types, interfaces, unions, and React components
- `camelCase` for functions, hooks, and exported values
- `SCREAMING_SNAKE_CASE` only for env vars
- `kebab-case` only for external string values such as route segments and DOM attributes

That means public exported values such as paths, hashes, and numeric defaults should use `camelCase`, not `SCREAMING_SNAKE_CASE`.

## Public Modules

The target API is split into three public surfaces plus one internal implementation boundary.

### 1. Feature contract

Target module:

```ts
@/features/pre-approval/contract
```

This module owns the canonical types shared by CTAs, drawer session state, analytics, and route handoff.

### 2. Route contract

Target module:

```ts
@/features/pre-approval/routes
```

This module owns `/pre-approval` URL construction and parsing. No section, CTA, or drawer component may manually construct pre-approval query strings.

### 3. Server-safe drawer integration

Target module:

```ts
@/features/pre-approval/drawer/server
```

This module is safe for section configs and server components. It exposes CTA href helpers and attribute builders only.

### 4. Client drawer runtime

Target module:

```ts
@/features/pre-approval/drawer/client
```

This module owns the mounted drawer runtime: session state, hash interception, route sync, focus management, scroll lock, content rendering, and event emission.

## Feature Contract

### Canonical Types

```ts
export type PreApprovalTruckType =
  | "rollback"
  | "wrecker"
  | "heavy-wrecker"
  | "rotator";

export type PreApprovalPlacement =
  | "hero"
  | "section"
  | "sticky-nav"
  | "footer"
  | "inline";

export interface PreApprovalOrigin {
  pageId: string;
  sectionId: string;
  ctaId: string;
  placement: PreApprovalPlacement;
}

export interface PreApprovalTrigger {
  origin: PreApprovalOrigin;
  drawer?: {
    title?: string;
  };
  handoff?: {
    truckType?: PreApprovalTruckType;
  };
}

export interface PreApprovalSession {
  sessionId: string;
  isOpen: boolean;
  amount: number;
  title: string;
  origin: PreApprovalOrigin;
  truckType?: PreApprovalTruckType;
  openedAt: number;
}
```

### Contract Separation

The trigger model separates three responsibilities:

- `origin`: analytics identity and trigger provenance
- `drawer`: presentation overrides for the drawer UI
- `handoff`: business data that affects the destination route

This separation is mandatory. A single ambiguous field like `source` must not be reused to mean analytics context, placement, and route behavior at the same time.

### Required Identity Rules

Every trigger must provide:

- `pageId`
- `sectionId`
- `ctaId`
- `placement`

These IDs must follow these rules:

- They are stable implementation IDs, not user-facing copy.
- They are slug-like strings.
- They must not be derived from mutable label text.
- Copy refreshes must not require changing IDs.

Examples:

- Good: `pageId: "rollback-financing"`
- Good: `sectionId: "hero-primary"`
- Good: `ctaId: "hero-main-cta"`
- Bad: `ctaId: "Get Pre-Approved"`

### Session Defaults

Calling `open(trigger)` with the smallest valid trigger must produce a fully-defined session.

Default open behavior:

- `origin` is copied from the trigger and is required.
- `title` defaults to the canonical drawer title.
- `truckType` defaults to `undefined`.
- `amount` defaults to the canonical slider default.
- `isOpen` is `true`.
- `sessionId` is freshly generated.
- `openedAt` is set at open time.

Suggested constants:

```ts
export const preApprovalDefaultAmount = 100_000;
export const preApprovalMinAmount = 20_000;
export const preApprovalMaxAmount = 3_000_000;
export const preApprovalAmountStep = 10_000;
export const preApprovalDefaultTitle =
  "Estimate how much financing you need.";
```

## Route Contract

### Public API

```ts
export const preApprovalPath = "/pre-approval";

export interface PreApprovalHandoffParams {
  amount: number;
  truckType?: PreApprovalTruckType;
}

export function buildPreApprovalHref(
  params: PreApprovalHandoffParams,
): string;

export function parsePreApprovalSearchParams(
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
): PreApprovalHandoffParams;
```

### Route Rules

- `amount` is always serialized into the destination URL.
- `truckType` is serialized only when provided.
- `buildPreApprovalHref()` clamps `amount` to the supported min/max range.
- `/pre-approval` must still parse and revalidate query params independently.
- No caller may manually build `/pre-approval?amount=...`.

### Amount Policy

The route contract must normalize invalid amount input in a predictable way:

- Non-numeric shape is normalized to a number before serialization.
- Values below the minimum clamp to the minimum.
- Values above the maximum clamp to the maximum.
- The destination page still performs its own parsing and validation.

Rationale:

- The drawer itself controls amount selection and should stay in range by construction.
- The route builder should be resilient to bad caller input.
- The destination page remains the final authority for user-visible validation.

### Examples

```ts
buildPreApprovalHref({ amount: 155_000 });
// "/pre-approval?amount=155000"

buildPreApprovalHref({ amount: 155_000, truckType: "wrecker" });
// "/pre-approval?amount=155000&trucktype=wrecker"

buildPreApprovalHref({ amount: 1 });
// "/pre-approval?amount=20000"
```

## Server-Safe Drawer Integration

### Public API

```ts
export const preApprovalEntryHash = "#get-pre-approved";

export function buildPreApprovalEntryHref(
  pathname: string | null,
): string;

export function buildPreApprovalTriggerAttributes(
  trigger: PreApprovalTrigger,
): Record<string, string>;
```

### Responsibilities

This surface exists for:

- section config files
- server components
- reusable CTA helpers

This surface must not expose client-only state or hooks.

### Behavioral Rules

- Declarative CTA integration is the default path.
- A section declares trigger intent, not route params.
- A section may include `truckType` or omit it.
- A section must always provide `origin`.
- The helper must emit a complete, normalized trigger payload for the client runtime to consume.

### Declarative Examples

CTA with truck type:

```ts
const trigger = {
  origin: {
    pageId: "rollback-financing",
    sectionId: "hero",
    ctaId: "hero-primary",
    placement: "hero",
  },
  drawer: {
    title: "How much financing do you need?",
  },
  handoff: {
    truckType: "rollback",
  },
} satisfies PreApprovalTrigger;
```

CTA without truck type:

```ts
const trigger = {
  origin: {
    pageId: "private-party-tow-truck-financing",
    sectionId: "faq",
    ctaId: "faq-inline",
    placement: "inline",
  },
} satisfies PreApprovalTrigger;
```

## Client Drawer Runtime

### Public API

```ts
export type PreApprovalCloseReason =
  | "backdrop"
  | "escape"
  | "close-button"
  | "drag-dismiss"
  | "route-change"
  | "programmatic";

export type PreApprovalEvent =
  | {
      type: "drawer_opened";
      sessionId: string;
      origin: PreApprovalOrigin;
      amount: number;
      title: string;
      truckType?: PreApprovalTruckType;
    }
  | {
      type: "amount_changed";
      sessionId: string;
      origin: PreApprovalOrigin;
      amount: number;
      truckType?: PreApprovalTruckType;
    }
  | {
      type: "drawer_continued";
      sessionId: string;
      origin: PreApprovalOrigin;
      amount: number;
      href: string;
      truckType?: PreApprovalTruckType;
    }
  | {
      type: "drawer_closed";
      sessionId: string;
      origin: PreApprovalOrigin;
      amount: number;
      reason: PreApprovalCloseReason;
      truckType?: PreApprovalTruckType;
    };

export function PreApprovalDrawerRoot(props: {
  children: React.ReactNode;
  onEvent?: (event: PreApprovalEvent) => void;
}): JSX.Element;

export function useOpenPreApproval(): (
  trigger: PreApprovalTrigger,
) => void;

export function usePreApprovalSession(): {
  isOpen: boolean;
  amount: number;
  title: string;
  origin: PreApprovalOrigin | null;
  truckType?: PreApprovalTruckType;
  setAmount(amount: number): void;
  close(reason?: PreApprovalCloseReason): void;
};
```

### Root Responsibilities

`PreApprovalDrawerRoot` is the only public mount point for the feature in marketing layout. It owns:

- session state
- trigger parsing and normalization
- hash interception
- route reset behavior
- drawer rendering
- focus management
- reduced-motion behavior
- scroll lock
- analytics event emission
- runtime error isolation

The root exists to keep the public API small while preserving strong internal ownership boundaries.

### Imperative Open Rules

`useOpenPreApproval()` is allowed for exceptional client-side flows. It is not the primary integration path for normal marketing sections.

Rules:

- It takes the exact same `PreApprovalTrigger` contract used by declarative CTAs.
- It must not accept a looser or alternate payload shape.
- It is subject to the same session replacement rules as declarative opens.

### Close Rules

`close(reason?)` has explicit semantics:

- If `reason` is omitted, default to `"programmatic"`.
- If a system behavior closes the drawer, the runtime supplies the correct reason internally.
- External callers must never need to infer or rewrite internal close reasons.

## Analytics Contract

### Event Delivery

Analytics integration must be optional at runtime.

Rules:

- `onEvent` is an optional observer callback.
- If `onEvent` is not provided, drawer UX is unchanged.
- If `onEvent` throws, the drawer must continue to work.
- The drawer must not import or depend on any analytics vendor SDK.

This allows analytics support to exist in the API from day one without making analytics wiring a production launch dependency.

### Event Guarantees

Every emitted event must include stable identity:

- `pageId`
- `sectionId`
- `ctaId`
- `placement`
- `sessionId`

This applies even if external analytics is not yet wired.

## Behavioral Contract

### Mounting

The drawer root is mounted once in marketing layout.

Target usage:

```tsx
<PreApprovalDrawerRoot>{children}</PreApprovalDrawerRoot>
```

This contract is guaranteed only within the subtree where the root is mounted.

### Open Behavior

- Same-page hash links open the drawer.
- Direct loads with the drawer hash open the drawer.
- Programmatic open uses the same normalized session model.
- Calling `open()` while already open replaces the current session entirely.
- A new `sessionId` is generated for every open, including replacement opens.

### Route Sync

- Route changes with the drawer hash open a fresh session.
- Route changes without the drawer hash reset the drawer session.
- Route-sync closes report reason `"route-change"` when applicable.

### Continue Behavior

Continue has a deliberate UX contract:

- It does not run the close animation.
- It unlocks body scroll immediately.
- It navigates immediately to the built handoff URL.

This must remain explicit in the contract. Future implementations must not change continue into "animate closed, then navigate" unless product requirements change.

### Accessibility and Motion

The drawer contract includes:

- focus movement on open
- focus restoration on close
- keyboard escape close
- modal semantics
- reduced-motion behavior
- mobile and desktop interaction parity appropriate to each form factor

These are contract-level behaviors, not incidental implementation details.

## Error Isolation

The drawer must be failure-isolated from the page content beneath it.

Required behavior:

- Drawer runtime failures must not break the marketing page shell or the page body.
- `PreApprovalDrawerRoot` must provide an error boundary around its internal runtime or equivalent built-in isolation.
- Analytics callback failures must also be isolated.

The page must remain usable even if the drawer runtime fails.

## Session Lifecycle Rules

### Session ID Strategy

Session identity is per-open, not per-page:

- Every open generates a new `sessionId`.
- Closing and reopening creates a new session.
- Replacing an already-open session also creates a new `sessionId`.

Recommended implementation:

```ts
crypto.randomUUID()
```

### Concurrent Open Rule

If `open()` is called while the drawer is already open:

- The current session is discarded.
- A new session is created from the new trigger.
- Defaults are reapplied unless the new trigger overrides them.
- A new `drawer_opened` event is emitted for the new session.

This is not a merge operation and not a no-op.

## Migration Plan

### Migration Goals

The migration must move the feature from the current mixed barrel and mixed trigger semantics to the new production API without breaking same-page CTA behavior.

### Coexistence Strategy

Old and new trigger schemas may coexist during migration.

Required rules:

- The trigger parser must understand both the legacy drawer attributes and the new production attributes.
- Both schemas must normalize into `PreApprovalTrigger`.
- When both schemas are present, the new schema takes precedence.

Optional implementation aid:

```ts
data-pre-approval-version="2"
```

Schema versioning is optional but recommended if it simplifies rollout safety.

### Migration Targets

The migration should:

- replace legacy source-based trigger semantics with `origin`, `drawer`, and `handoff`
- replace legacy trigger types with `PreApprovalTrigger`
- move route serialization ownership into `@/features/pre-approval/routes`
- replace the current public provider surface with `PreApprovalDrawerRoot`
- remove the mixed public barrel as the long-term integration surface

### Compatibility Requirement

Existing same-page CTA behavior must remain intact during migration. Migration is allowed to be incremental as long as the listener/parser layer keeps old and new triggers compatible.

## Misuse Prevention Rules

The public API must explicitly avoid these failure modes:

- `truckType` must not be tied to placement or hero-specific logic
- analytics identity must not be inferred from label text
- sections must not construct query strings manually
- server-safe helpers must not pull in client-only runtime code
- product-specific presets must not be exported as drawer package primitives
- analytics vendor SDKs must not be imported inside the drawer feature

## Acceptance Criteria

Implementation is complete only when these scenarios pass:

1. A declarative CTA without `truckType` opens the drawer and continues with `amount` only.
2. A declarative CTA with `truckType` opens the drawer and continues with `amount` plus `trucktype`.
3. A programmatic open uses the same trigger contract and emits the same event shape.
4. Opening with a minimal trigger creates a session with documented defaults.
5. Opening while already open replaces the session and generates a new `sessionId`.
6. `close()` without a reason records `"programmatic"`.
7. Continue skips close animation and unlocks scroll before navigation.
8. Route changes with the drawer hash reopen cleanly.
9. Route changes without the drawer hash reset cleanly.
10. Missing `onEvent` does not change UX.
11. A throwing `onEvent` handler does not break the drawer or the page.
12. Legacy and new trigger schemas can coexist during migration and normalize correctly.
13. No public integration surface requires callers to know query param names.
14. No server-safe integration surface requires importing client-only code.

## Final Notes

This API is intentionally opinionated. It optimizes for reliability, analytics readiness, and clean ownership boundaries over generic flexibility. The goal is a stable funnel contract that remains understandable and safe even as the drawer implementation evolves.
