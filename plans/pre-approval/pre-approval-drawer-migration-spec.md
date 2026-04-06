# Pre-Approval Drawer Migration Spec

## Purpose

This spec translates `plans/pre-approval-drawer-production-api.md` into an implementation plan that preserves the current working drawer with zero visual regressions and zero CTA-flow regressions while we migrate to the production API.

This is an architecture migration, not a product redesign.

## Inputs Reviewed

- `plans/pre-approval-drawer-production-api.md`
- `plans/pre-approval-drawer-verification-matrix.md`
- `plans/pre-approval-drawer-phase-gates.md`
- `plans/pre-approval-drawer-execution-log.md`
- `components/ui/pre-approval-drawer/CLAUDE.md`
- `components/ui/pre-approval-drawer/*`
- `app/(marketing)/layout.tsx`
- Requested skills:
  - `next-best-practices`
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`

## What We Need To Do Next

1. Introduce the new feature-owned API under `features/pre-approval/` without replacing the current UI runtime yet.
2. Add a compatibility parser so both legacy `data-drawer-*` triggers and new production trigger attributes normalize into one canonical trigger shape.
3. Move route-building ownership into a dedicated feature route contract and make both the drawer runtime and direct `/pre-approval` callers use it.
4. Wrap the current drawer runtime in a new root/provider contract that can emit analytics-safe events and own session identity.
5. Keep the existing `components/ui/pre-approval-drawer` entrypoint as a compatibility facade until all consumers are migrated.
6. Migrate CTA configs and helper usage incrementally, then remove the legacy surface only after parity is proven.

## Execution Artifacts

This document is the governing spec. Execute the migration through these companion artifacts:

- `plans/pre-approval-drawer-verification-matrix.md`
  - requirement-to-test traceability
- `plans/pre-approval-drawer-phase-gates.md`
  - active phase checklist and go/no-go gates
- `plans/pre-approval-drawer-execution-log.md`
  - dated evidence ledger for each implementation batch

Execution rule:

- no phase advances until the phase gate is checked off and supporting evidence is recorded in the execution log

## Architecture Decisions

### 1. Feature-owned filesystem

The production plan is correct to move this out of a generic UI namespace. This drawer is a funnel feature, not a reusable primitive.

Target structure:

```text
features/
  pre-approval/
    contract.ts
    routes.ts
    analytics.ts
    drawer/
      server.ts
      client.ts
      runtime/
        context.tsx
        parser.ts
        session.ts
        events.ts
        hash-listener.tsx
        route-sync.tsx
        error-boundary.tsx
      ui/
        PreApprovalDrawerView.tsx
        AmountSlider.tsx
        amount-slider.css
```

Compatibility layer during migration:

```text
components/ui/pre-approval-drawer/
  index.ts
  config.ts
  triggers.ts
  amount-slider.css
```

That folder should become a compatibility surface, not just a barrel facade.

Rules during migration:

- `index.ts` may re-export from `@/features/pre-approval/*`.
- existing deep-import paths such as `@/components/ui/pre-approval-drawer/config` and `@/components/ui/pre-approval-drawer/triggers` must keep compiling until the last consumer is migrated.
- non-JS dependencies such as `amount-slider.css` must either remain at the legacy path during migration or be replaced by a compatibility stub that preserves the import path.
- do not delete legacy path files until repository search proves there are no remaining consumers.

### 2. Server-safe and client-only boundaries stay separate

From `next-best-practices`, we should not blur server-safe helpers and client runtime code.

- `contract.ts`, `routes.ts`, and `drawer/server.ts` must be safe to import from server components and config files.
- The mounted runtime stays in client-only files.
- No section config should need to import a client hook or know query param names.

### 3. Provider contract over monolithic props

From `vercel-composition-patterns`, we should keep state behind a provider contract instead of growing boolean props or ad hoc helper variants.

The runtime context should explicitly separate:

- `state`
- `actions`
- `meta`

That gives us a stable session model for UI, listeners, analytics emission, and exceptional programmatic opens.

### 4. Preserve current UI while swapping contracts underneath

From `vercel-react-best-practices`, the safest migration path is to preserve the existing drawer rendering, focus behavior, motion behavior, and route handoff while changing data ownership around it.

The current `PreApprovalDrawer.tsx` should be treated as the visual baseline for phase 1.

## Current State vs Production Plan

Already in place:

- Same-page hash open behavior
- Route-sync behavior in marketing layout
- Drawer UI, focus trap, reduced motion, drag-dismiss, and immediate continue navigation
- Server-safe route helper for `/pre-approval`
- Existing data attribute encoding for CTA-triggered opens

Missing or incomplete:

- Canonical `PreApprovalTrigger` contract with `origin`, `drawer`, and `handoff`
- Stable `sessionId`
- Analytics-safe event contract
- Explicit close reasons
- Dual-schema parser for legacy and new trigger attributes
- Feature-owned filesystem under `features/pre-approval`
- Error isolation boundary around the runtime

Additional migration-sensitive consumers that must be preserved or explicitly relocated:

- direct hash and route-hash opens that currently provide no trigger payload
- deep imports from legacy `config.ts` and `triggers.ts`
- shared CSS import of `amount-slider.css` outside the drawer directory
- route-only consumers such as [`HeroInput.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroInput.tsx)
- tile-selection trigger resolution helpers used by hero selectors

## Pre-Resolved Decisions

These items are resolved up front so implementation does not stall mid-phase.

### 1. Origin policy for non-click opens

Hash-based opens and route-hash opens cannot rely on click-intercepted trigger metadata because there may be no originating anchor event.

Decision:

- `PreApprovalTrigger.origin` remains required.
- direct hash opens and route-hash opens use a compatibility origin generated by the runtime.
- compatibility origin values may derive `pageId` from `window.location.pathname`.
- compatibility origin values must never derive identity from mutable label text.

Recommended compatibility origin shape:

```ts
{
  pageId: derivePreApprovalPageId(window.location.pathname),
  sectionId: "hash-entry",
  ctaId: "direct-url",
  placement: "inline",
}
```

Fallback if pathname cannot be resolved:

```ts
{
  pageId: "unknown-page",
  sectionId: "hash-entry",
  ctaId: "direct-url",
  placement: "inline",
}
```

This is a compatibility path only. Authored triggers must still provide explicit origin.

### 2. Deep-import compatibility policy

There are existing consumers that bypass the barrel:

- [`NavClient.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/nav/sticky-nav-rm/NavClient.tsx)
- drawer test files that deep-import `config.ts` and `triggers.ts`

Decision:

- the migration must preserve deep-import compatibility until those consumers are moved.
- phase 4 cannot rely on `index.ts` alone.
- legacy `config.ts` and `triggers.ts` should remain as compatibility modules that re-export or wrap the new feature-owned modules until phase 6 removal.

### 3. Shared CSS compatibility policy

There is an external CSS consumer:

- [`TermLengthSlider.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/term-length-slider/TermLengthSlider.tsx)

Decision:

- `amount-slider.css` cannot be moved without a compatibility plan.
- during migration, keep the legacy CSS import path working.
- acceptable implementation options:
  - keep the file at the old path until all consumers migrate
  - replace the old file with a compatibility import shim
  - extract the shared slider CSS to a stable shared location and update all consumers in a controlled caller-migration batch

### 4. Tile-selection resolution ownership

`DrawerSelectionTrigger` and `resolveSelectionDrawerTrigger()` are not drawer-runtime concerns. They are authored CTA-resolution concerns used by hero selectors before the drawer opens.

Decision:

- keep tile-selection resolution as a server-safe or config-safe helper during migration.
- migrate it to a named helper under the feature-owned surface rather than deleting it without replacement.
- acceptable target names include:
  - `resolvePreApprovalSelectionTrigger`
  - `resolvePreApprovalTileSelection`

This helper must remain available until tile-based hero callers are migrated.

### 5. Route-only consumer policy

Not every current consumer is a drawer consumer.

Decision:

- route-only callers must be tracked separately from drawer-trigger callers.
- [`HeroInput.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroInput.tsx) is explicitly a route-contract migration item.
- phase 5 must include a route-consumer batch, not just CTA-trigger batches.

### 6. Close-reason wiring policy

Close reasons are part of the production contract and cannot be added as an afterthought.

Decision:

- phase 3 must explicitly thread reason-aware close actions through every close path.
- required close-path mappings:
  - backdrop click -> `backdrop`
  - escape key -> `escape`
  - close button -> `close-button`
  - drag dismiss -> `drag-dismiss`
  - route reset/route change -> `route-change`
  - external `close()` with no reason -> `programmatic`

The runtime implementation is allowed to refactor hooks or event handlers as needed, but this mapping is not optional.

### 7. Amount clamping policy

Current normalization strips non-digits and falls back to the default amount, but does not clamp to min/max.

Decision:

- phase 1 preserves current normalization to avoid behavior drift during contract introduction.
- a later dedicated step must add route-contract clamping to match the production API.
- clamping belongs to route-contract completion, not the baseline-freeze phase.

## Debugging Policy

Debug logging is worth adding for the migration, but it should be gated and non-contractual.

Rules:

- No always-on `console.log` calls in the public runtime.
- Debug output must be opt-in and dev-oriented.
- Debug logging must never be required for correct runtime behavior.
- Debug logging must be safe to remove after rollout stabilization.

Recommended mechanism:

- Add a feature-local debug utility under `features/pre-approval/`.
- Gate logs behind a flag such as `NEXT_PUBLIC_PRE_APPROVAL_DEBUG=1`.
- Prefix messages consistently, for example `[pre-approval]`.

High-value debug events:

- trigger parse result
- legacy-vs-new schema resolution
- normalized trigger/session payload
- session replacement while already open
- continue href generation
- API request/response summary
- close reason
- runtime error boundary catches
- analytics observer failures

Recommended API shape:

```ts
debugPreApproval("trigger.normalized", payload);
debugPreApproval("session.opened", payload);
debugPreApproval("continue.href", { href });
```

This should stay an internal implementation detail, not part of the public feature contract.

## Public API Naming Direction

The current production API plan is structurally right, but some names can better match intent if we want the contract to feel less UI-centric and more funnel-centric.

The main naming rule should be:

- use `PreApproval` for the feature domain
- use `Entry` or `Launch` for trigger/opening concerns
- use `Handoff` for `/pre-approval` route transfer concerns
- reserve `Drawer` for the mounted UI runtime only

That avoids leaking implementation details into modules that are really about route ownership or trigger semantics.

## Recommended Naming Conventions

### 1. Module names

Recommended:

- `@/features/pre-approval/contract`
- `@/features/pre-approval/routes`
- `@/features/pre-approval/entry/server`
- `@/features/pre-approval/entry/client`

Alternative if we want to keep the runtime explicitly UI-scoped:

- `@/features/pre-approval/drawer/server`
- `@/features/pre-approval/drawer/client`

Recommendation:

- Keep `drawer/*` if we want continuity with the existing implementation.
- Use `entry/*` if we want the API to stay stable even if the UI stops being a drawer later.

Given the zero-regression migration and existing codebase, I recommend:

- `routes`
- `contract`
- `drawer/server`
- `drawer/client`

Then keep the internal naming more intent-driven inside those modules.

### 2. Trigger/open naming

Recommended public names:

- `PreApprovalTrigger`
- `PreApprovalOrigin`
- `PreApprovalSession`
- `useOpenPreApproval`
- `usePreApprovalSession`

Current plan name:

- `PreApprovalTrigger`

Recommendation:

- Prefer `PreApprovalTrigger` if we are willing to make the API less UI-specific.
- Keep `PreApprovalTrigger` if we want maximum explicitness during migration.

For this codebase, I would use:

- `PreApprovalTrigger` as the canonical contract type
- `PreApprovalDrawerRoot` as the mounted runtime component

That split keeps the business contract free of the UI implementation while still naming the runtime honestly.

### 3. Hash/href naming

`preApprovalEntryHash` is better than a drawer-specific constant name because it does not over-specify the UI shape.

Better options:

- `preApprovalEntryHash`
- `preApprovalTriggerHash`
- `preApprovalLaunchHash`

Recommendation:

- `preApprovalEntryHash`

Why:

- it communicates that the hash enters the funnel interaction
- it does not assume the UI must always be a drawer
- it still reads clearly in route and CTA helpers

Related helpers:

- `buildPreApprovalEntryHref(pathname)`
- `buildPreApprovalTriggerAttributes(trigger)`

If we keep `drawer/server` as the module name, these names still work well.

### 4. Route/handoff naming

Recommended:

- `PreApprovalHandoffParams`
- `buildPreApprovalHref`
- `parsePreApprovalSearchParams`

Optional rename if we want more intent:

- `buildPreApprovalHandoffHref`

Recommendation:

- keep `buildPreApprovalHref`

Reason:

- shorter
- already familiar in the codebase
- still accurate as long as the params type is named `PreApprovalHandoffParams`

### 5. Event naming

Current plan event names are acceptable:

- `drawer_opened`
- `amount_changed`
- `drawer_continued`
- `drawer_closed`

If we want to align them with domain intent instead of UI only:

- `pre_approval_opened`
- `pre_approval_amount_changed`
- `pre_approval_continued`
- `pre_approval_closed`

Recommendation:

- use domain-prefixed event names for analytics payloads
- keep UI-specific close reasons internally where useful

That reduces ambiguity once other funnel steps start emitting events too.

### 6. Close reason naming

Current close reasons are good because they are interaction-specific:

- `backdrop`
- `escape`
- `close-button`
- `drag-dismiss`
- `route-change`
- `programmatic`

I would keep these as-is.

## Final Naming Recommendation

If we optimize for stable long-term intent, the public API should look closer to this:

```ts
// feature contract
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

// routes
export const preApprovalPath = "/pre-approval";
export const preApprovalEntryHash = "#get-pre-approved";

export interface PreApprovalHandoffParams {
  amount: number;
  truckType?: PreApprovalTruckType;
}

export function buildPreApprovalHref(
  params: PreApprovalHandoffParams,
): string;

// server-safe CTA integration
export function buildPreApprovalEntryHref(
  pathname: string | null,
): string;

export function buildPreApprovalTriggerAttributes(
  trigger: PreApprovalTrigger,
): Record<string, string>;

// client runtime
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

Recommendation summary:

- Use `PreApprovalTrigger` for the contract type.
- Use `preApprovalEntryHash` for the hash constant.
- Keep `PreApprovalDrawerRoot` for the actual mounted UI runtime.
- Keep `buildPreApprovalHref` for route construction.
- Use `buildPreApprovalTriggerAttributes` for declarative CTA attributes.

## Zero-Regression Rules

These rules are mandatory for the migration:

1. No visual changes to the drawer in phase 1.
2. No changes to focus behavior, close behavior, or continue behavior in phase 1.
3. Existing hash-based CTAs must keep opening the drawer on the same page.
4. Existing hero truck-type behavior must keep appending `trucktype` exactly as it does today.
5. Existing imports from `@/components/ui/pre-approval-drawer` must keep compiling during migration.
6. Existing routes must not need to change all CTA wiring in one pass.

These are not preferences. They are safety invariants.

If any invariant is violated in a phase:

- stop the phase immediately
- revert or isolate the offending change
- restore the last known-good state
- do not advance until the invariant is re-proven

## Systems Engineering Gate Policy

This migration should be run as a gated system change, not a loose refactor.

Mandatory gate rules:

1. No phase starts until its predecessor exit criteria are satisfied.
2. No legacy behavior is removed until replacement behavior is verified under both automated and browser checks.
3. No phase may mix contract migration with product behavior changes.
4. Every requirement that can regress must have a named verification step.
5. Every gate must produce evidence, not just engineer judgment.
6. If evidence is missing or ambiguous, the phase is not complete.

Required evidence classes:

- static verification:
  - `npm run lint`
  - `npm run build`
- automated behavior verification:
  - targeted tests for helpers, parsing, runtime state, and compatibility behavior
- browser verification:
  - desktop validation on a non-`3000` dev server
  - mobile validation on the same running server
- compatibility verification:
  - legacy trigger path
  - new trigger path
  - mixed-schema precedence path

## Safety-Critical Invariants and Traceability

The authoritative invariant list is `plans/pre-approval-drawer-verification-matrix.md` (`PA-INV-01` through `PA-INV-27`). The table below is a high-level summary for quick review and does not replace the matrix.

The migration is complete only if every applicable matrix invariant remains true throughout.

| Invariant | Minimum verification |
| --- | --- |
| Same-page hash CTA opens the drawer | automated test plus browser validation |
| Continue URL shape is unchanged for legacy flows | automated test plus browser validation |
| Hero truck-type handoff remains exact | automated test |
| Continue still unlocks scroll and navigates immediately | browser validation |
| Focus open/close behavior remains intact | automated test plus browser validation |
| Route-sync reopen/reset behavior remains intact | automated test |
| New schema and legacy schema both work | automated test |
| New schema wins when both schemas are present | automated test |
| A new `sessionId` is generated for every open | automated test |
| `onEvent` failures do not break UX | automated test |
| Runtime failures do not break page shell | automated test |
| Existing `@/components/ui/pre-approval-drawer` imports continue to compile until cutover | `npm run build` |

Additional invariants added during spec review:

| Invariant | Minimum verification |
| --- | --- |
| Direct-load hash open works | automated test plus browser validation |
| Direct-hash and route-hash opens produce a valid compatibility origin | automated test |
| Legacy deep-import module paths continue to compile until removal | `npm run build` and targeted search |
| Legacy CSS import paths continue to resolve until removal | `npm run build` and targeted search |
| Route-only consumers use the feature route contract before legacy removal | targeted search, code review, and `npm run build` |
| Close-reason mapping is correct for all interaction types | automated test and browser validation |
| Route-contract clamping to min/max is added before final parity signoff | automated test |
| `@/features/pre-approval/*` resolves cleanly with existing alias/tooling | `npm run build` |

## Important Scope Correction

The production API doc proposes new slider constants:

- `MAX = 3_000_000`
- `STEP = 10_000`

The current production drawer uses:

- `MAX = 500_000`
- `STEP = 5_000`

Changing those values would be a product and UI behavior change. It is out of scope for the zero-regression migration. For this migration, the new feature contract should preserve the current live values unless product explicitly approves a separate behavior change.

## Migration Phases

## Phase 0: Freeze Behavior

Before moving code, treat the current implementation as the reference behavior.

Objective:

- establish the current drawer as the certified baseline
- prevent accidental behavior drift during the contract migration

Inputs / preconditions:

- current drawer behavior is still the reference implementation
- current CTA flows are reproducible locally

Changes allowed:

- tests
- test helpers
- non-contractual debug instrumentation if gated and removable

Changes explicitly forbidden:

- visual changes
- route behavior changes
- trigger payload changes
- session model changes
- public API changes

Actions:

- Keep the current drawer UI markup and interactions unchanged.
- Add or update tests that lock in:
  - same-page hash opens
  - direct-load hash opens
  - continue navigation shape
  - hero truck-type handoff
  - route-sync reopen/reset behavior
  - focus and escape/backdrop close behavior

Verification checklist:

- baseline tests exist for each zero-regression rule
- direct-load hash open is explicitly covered
- `npm run lint` passes
- `npm run build` passes
- browser validation confirms:
  - same-page hash open works
  - direct-load hash open works
  - continue navigates immediately
  - close interactions still work on desktop and mobile

Evidence required:

- passing test names or files that map to each invariant
- successful `lint` and `build`
- browser validation notes for desktop and mobile

Exit criteria:

- every listed baseline behavior is covered by a verification step
- no code-path behavior has changed from production baseline
- the team can detect regression before beginning structural migration

Rollback plan:

- remove any incomplete baseline-test additions that destabilize CI
- do not proceed to phase 1 until baseline coverage is restored

## Phase 1: Introduce Canonical Feature Modules

Create the feature contract without changing current consumers yet.

Objective:

- establish the new feature-owned ownership boundary without changing live behavior

Inputs / preconditions:

- phase 0 exit criteria are satisfied
- baseline regression suite is passing

Changes allowed:

- new files under `features/pre-approval/`
- contract types
- route helpers
- server-safe trigger attribute helpers

Changes explicitly forbidden:

- replacing the mounted drawer runtime
- changing current consumer imports
- changing slider behavior
- changing continue behavior
- changing drawer rendering

Additional structural requirement:

- verify that `@/features/pre-approval/*` resolves cleanly under the existing `@/*` alias and build tooling

Files to add:

- `features/pre-approval/contract.ts`
- `features/pre-approval/routes.ts`
- `features/pre-approval/drawer/server.ts`
- `features/pre-approval/drawer/client.ts`

Deliverables:

- Canonical trigger/session/event types
- Route helpers:
  - `buildPreApprovalHref`
  - `parsePreApprovalSearchParams`
- Server-safe drawer helpers:
  - `preApprovalEntryHash`
  - `buildPreApprovalEntryHref`
  - `buildPreApprovalTriggerAttributes`
- compatibility-preserving module plan for:
  - legacy `config.ts`
  - legacy `triggers.ts`
  - legacy `amount-slider.css`

Notes:

- `buildPreApprovalHref` should preserve current amount normalization behavior in phase 1.
- `buildPreApprovalTriggerAttributes` should emit the new production attribute schema.
- do not add route-contract clamping in this phase unless there is an explicit product signoff to change live behavior now.

Verification checklist:

- new route helpers serialize and parse correctly
- new trigger attribute builder emits the intended schema
- server-safe modules do not import client-only runtime code
- `@/features/pre-approval/*` resolves and builds correctly
- legacy imports and runtime behavior remain unchanged
- `npm run lint` passes
- `npm run build` passes

Evidence required:

- unit coverage for contract and route helpers
- proof that build still succeeds with legacy import surface intact
- proof that deep-import compatibility paths are still available or intentionally stubbed for later migration
- diff review showing no consumer cutover in this phase

Exit criteria:

- canonical modules exist and compile
- no existing caller is required to adopt them yet
- zero-regression invariants remain green

Rollback plan:

- remove or isolate the new feature modules
- leave legacy runtime and legacy helpers untouched
- re-run baseline verification before retry

## Phase 2: Add Compatibility Parser and Session Normalizer

Build a parser layer that understands both schemas:

- legacy:
  - `data-drawer-title`
  - `data-drawer-source`
  - `data-drawer-truck-type`
- new:
  - production trigger attributes emitted by `buildPreApprovalTriggerAttributes`

Rules:

- Both normalize into `PreApprovalTrigger`.
- If both schemas are present, new attributes win.
- Legacy hero semantics map into:
  - `origin`: compatibility defaults
  - `drawer.title`
  - `handoff.truckType`
- direct hash opens and route-hash opens also normalize into `PreApprovalTrigger` through a compatibility-origin path

Compatibility default policy:

- We should not invent fake analytics IDs from label text.
- For legacy triggers, derive `pageId` from `window.location.pathname` when possible.
- If pathname cannot be resolved, fall back to explicit compatibility IDs such as:
  - `pageId: "unknown-page"`
  - `sectionId: "legacy-section"`
  - `ctaId: "legacy-cta"`
  - `placement: "inline"`

Those defaults are acceptable only inside the compatibility path and must not become the long-term authoring model.

Non-click origin policy:

- initial page load with the drawer hash must open with a compatibility origin
- route transitions with the drawer hash must open with a compatibility origin
- these opens must not violate the required `origin` contract

Objective:

- make legacy and new trigger schemas coexist safely behind one canonical parser

Inputs / preconditions:

- phase 1 exit criteria are satisfied
- canonical contract types and helpers are stable enough to normalize into

Changes allowed:

- parser and normalization logic
- compatibility defaults for legacy-only paths
- test fixtures for mixed-schema inputs

Changes explicitly forbidden:

- deleting legacy trigger support
- forcing callers to migrate in this phase
- inferring analytics identity from label text
- changing drawer UI or route UX

Verification checklist:

- legacy attributes normalize correctly
- new production attributes normalize correctly
- when both schemas are present, new schema wins
- legacy hero semantics still map to `truckType` exactly as today
- compatibility defaults are used only in the legacy path
- direct hash opens normalize into a trigger with a compatibility origin
- route-hash opens normalize into a trigger with a compatibility origin
- `npm run lint` passes
- `npm run build` passes

Evidence required:

- parser test matrix for:
  - legacy only
  - new only
  - mixed with precedence
  - direct hash open without anchor metadata
  - route-hash open without anchor metadata
  - malformed or partial legacy data
- proof that current legacy CTAs still open and continue correctly

Exit criteria:

- one canonical normalization path exists
- dual-schema coexistence is proven
- no legacy CTA flow has regressed

Rollback plan:

- disable the compatibility parser integration point
- restore legacy-only parsing behavior
- retain the new canonical types for later retry

## Phase 3: Wrap the Existing Runtime in the New Root Contract

Implement `PreApprovalDrawerRoot` as the public client boundary while reusing the current internals where possible.

Objective:

- replace the public runtime contract without changing the user-visible drawer behavior

Inputs / preconditions:

- phase 2 exit criteria are satisfied
- compatibility parsing is verified

Changes allowed:

- root/provider contract
- session creation and replacement logic
- event emission
- error isolation
- close-reason tracking

Changes explicitly forbidden:

- visual redesign
- changing the mounted route location
- changing continue into animated-close-then-navigate
- changing focus/motion semantics

Responsibilities to add:

- create a `sessionId` per open
- normalize trigger input
- emit lifecycle events
- track close reasons
- isolate `onEvent` failures
- isolate runtime failures with an error boundary
- thread explicit close reasons through all close paths

Keep unchanged:

- mounted location in `app/(marketing)/layout.tsx`
- visual drawer rendering
- continue behavior:
  - unlock scroll immediately
  - navigate immediately
  - do not animate closed first

Required close-path mapping:

- backdrop click -> `backdrop`
- escape key -> `escape`
- close button -> `close-button`
- drag dismiss -> `drag-dismiss`
- route reset / route change -> `route-change`
- external `close()` without a supplied reason -> `programmatic`

Verification checklist:

- every open generates a fresh `sessionId`
- replacement opens discard prior session state and create a new session
- `close()` default reason is `"programmatic"`
- backdrop close emits `backdrop`
- escape close emits `escape`
- close button emits `close-button`
- drag dismiss emits `drag-dismiss`
- route-driven reset emits `route-change`
- lifecycle events emit the required payload shape
- `onEvent` exceptions do not break drawer UX
- runtime render failures do not break the marketing page shell
- continue behavior remains immediate
- touch interaction still works acceptably during the mount-to-scrollable-ref handoff window
- desktop and mobile browser validation pass
- `npm run lint` passes
- `npm run build` passes

Evidence required:

- runtime tests covering session lifecycle and failure isolation
- browser notes confirming no visual or interaction regressions
- evidence that layout mounting location remains unchanged
- explicit verification notes for close-reason mapping by interaction type

Exit criteria:

- `PreApprovalDrawerRoot` is production-capable behind the existing UX baseline
- eventing and error isolation are proven without changing CTA outcomes
- zero-regression invariants remain green

Rollback plan:

- switch the public mount back to the legacy provider/runtime path
- keep feature contracts and parser code if they are not the fault source
- re-run baseline browser validation after rollback

## Phase 4: Convert the Compatibility Facade

Update `components/ui/pre-approval-drawer/index.ts` to re-export from the feature modules.

Objective:

- preserve source compatibility while redirecting public imports to the new ownership boundary

Inputs / preconditions:

- phase 3 exit criteria are satisfied
- the new root and helper surfaces are stable

Changes allowed:

- barrel and facade rewiring
- wrappers for legacy export names
- compatibility wrappers for legacy deep-import modules
- compatibility handling for legacy CSS import paths

Changes explicitly forbidden:

- deleting legacy named exports in this phase
- forcing consumer rewrites in this phase
- changing runtime behavior while altering the facade
- deleting legacy `config.ts`, `triggers.ts`, or `amount-slider.css` paths before consumers are migrated

During this phase, preserve existing named exports where needed:

- `MarketingDrawerProvider`
- `buildPreApprovalHref`
- `resolveDrawerTriggerHref`
- `buildDrawerTriggerDataAttributes`
- hero drawer presets

Implementation rule:

- Old exports can become wrappers around the new contract.
- No existing consumer should break at this step.

Verification checklist:

- all existing imports still compile
- legacy deep imports still compile
- legacy CSS import path still resolves
- facade exports resolve to the new implementation surface where intended
- browser behavior is unchanged
- `npm run lint` passes
- `npm run build` passes

Evidence required:

- build success with no consumer changes required
- targeted checks for any legacy wrappers
- search results for remaining deep-import and CSS-path consumers

Exit criteria:

- compatibility facade is in place
- import stability is preserved
- no consumer is blocked from incremental migration

Rollback plan:

- restore the previous barrel exports
- keep the feature modules intact for a later cutover
- verify build and baseline behavior again

## Phase 5: Migrate Callers Incrementally

Migrate authored CTA/config usage from legacy trigger payloads to the new trigger contract.

Objective:

- move callers from compatibility semantics to canonical feature semantics in controlled batches

Inputs / preconditions:

- phase 4 exit criteria are satisfied
- compatibility facade still protects untouched consumers

Changes allowed:

- caller migrations in the prescribed priority order
- direct imports from `@/features/pre-approval/routes`
- conversion of CTA attribute builders to the new trigger contract

Changes explicitly forbidden:

- broad unsequenced migration across the codebase
- deleting compatibility behavior before all callers are moved
- mixing caller migration with product copy or UI redesign

Priority order:

1. Shared CTA primitives such as `RippleCtaLink`
2. Shared nav/footer CTA helpers
3. Route-only consumers such as [`HeroInput.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroInput.tsx)
4. Hero configs using truck-type presets and tile-selection helpers
5. Other marketing section configs

Specific caller updates:

- `RippleCtaLink` should prefer the new trigger shape and attributes.
- `RippleCtaLink.drawerTitle` cannot survive as a standalone authoring path unless the component can produce a valid `origin`; either remove it or convert it into a compatibility-only prop with explicit deprecation.
- Direct route callers like [`HeroInput.tsx`](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-gallery/HeroInput.tsx) should import from `@/features/pre-approval/routes` instead of the legacy drawer barrel.
- Tile-based hero callers must migrate to the new selection-resolution helper before legacy trigger types are removed.
- External consumers of `amount-slider.css` must migrate to the stable CSS path or remain on the compatibility path until cutover.
- Marketing layout should mount `PreApprovalDrawerRoot` instead of `MarketingDrawerProvider` once the facade is ready.

Verification checklist:

- after each migration batch:
  - targeted tests pass
  - `npm run lint` passes
  - `npm run build` passes
  - browser validation covers the changed CTA paths
- migrated callers emit the new schema
- untouched callers still function through the compatibility path
- route-only consumers use the route contract directly
- deep-import and CSS-path consumers are either migrated or still explicitly supported

Evidence required:

- per-batch migration notes listing migrated callers
- per-batch browser validation against affected routes
- confirmation that mixed old/new callers coexist

Exit criteria:

- all intended callers use the canonical contract
- no remaining production caller depends on legacy authoring semantics
- compatibility path still exists only for safe final removal

Rollback plan:

- revert the most recent migration batch only
- keep previously verified batches intact
- do not proceed to the next batch until the failed batch is corrected

## Phase 6: Remove Legacy Semantics

Only after all callers have moved:

Objective:

- retire temporary compatibility code only after parity is fully proven

Inputs / preconditions:

- phase 5 exit criteria are satisfied
- code search confirms no production callers still depend on legacy authoring APIs
- the full regression suite and browser checks are green

Changes allowed:

- deletion of legacy authoring types and helpers
- removal of legacy trigger attribute emission
- shrinking or deleting the compatibility facade
- completion of route-contract parity work such as min/max clamping if still outstanding

Changes explicitly forbidden:

- removing legacy semantics on assumption
- deleting compatibility code before confirming zero remaining consumers
- introducing unrelated cleanup in the same change

- remove `source === "hero"` as the business rule that decides `truckType`
- remove legacy `DrawerTriggerPayload` as an authoring type
- remove legacy `data-drawer-*` emission from the primary helpers
- shrink the compatibility layer to a temporary alias or delete it
- remove legacy deep-import compatibility files only after search proves there are no remaining imports
- remove legacy CSS compatibility path only after search proves there are no remaining imports
- add route-contract clamping if it was deferred earlier in the migration

Verification checklist:

- repository search confirms no remaining production callers use legacy types or helpers
- route-contract clamping behavior is verified against min and max boundaries
- all acceptance criteria from the production API doc pass
- full automated regression suite passes
- desktop and mobile browser validation pass on representative routes
- `npm run lint` passes
- `npm run build` passes

Evidence required:

- search results showing removal completeness
- final regression run summary
- final browser validation notes

Exit criteria:

- legacy semantics are removed with no functional regression
- the public surface matches the intended production API
- the compatibility layer is either deleted or reduced to a harmless alias with a planned removal date

Rollback plan:

- restore the removed legacy layer from the immediately previous known-good commit
- re-enable coexistence mode
- reopen the gap analysis before another removal attempt

## Recommended File Ownership

Public, stable:

- `features/pre-approval/contract.ts`
- `features/pre-approval/routes.ts`
- `features/pre-approval/drawer/server.ts`
- `features/pre-approval/drawer/client.ts`

Internal:

- everything under `features/pre-approval/drawer/runtime/`
- everything under `features/pre-approval/drawer/ui/`

This keeps section authors on the server-safe surface and prevents them from coupling to runtime internals.

## Testing Requirements

Minimum migration coverage:

1. Legacy trigger attributes still open the drawer and preserve current continue URLs.
2. New trigger attributes open the same drawer and produce the same visible UI.
3. When both schemas exist, new schema wins.
4. Every open creates a new `sessionId`.
5. `onEvent` failures do not break the drawer.
6. Runtime render failures do not break the page shell.
7. Existing imports through `@/components/ui/pre-approval-drawer` still work during migration.

Additional mandatory coverage:

8. Same-page hash loads open the drawer on initial page load.
9. Route changes with the drawer hash reopen with a fresh session.
10. Route changes without the drawer hash reset session state cleanly.
11. Continue still unlocks scroll before navigation.
12. Focus is moved on open and restored on close.
13. Escape, backdrop, and close-button paths report correct close reasons.
14. Legacy hero behavior still appends `trucktype` exactly as before.
15. Direct-load hash opens produce a valid compatibility origin.
16. Route-hash opens produce a valid compatibility origin.
17. Legacy deep-import module paths continue to compile until explicit removal.
18. Legacy CSS import paths continue to resolve until explicit removal.
19. Route-only consumers use the feature route contract before legacy route helpers are removed.
20. Route-contract clamping is added in a dedicated parity-completion step before the migration is declared fully complete.

Validation commands:

- `npm run lint`
- `npm run build`
- relevant Vitest coverage for drawer helpers/runtime
- browser validation against a non-`3000` dev port once code changes start

Required browser validation matrix for user-facing phases:

- desktop:
  - open from a same-page CTA
  - adjust amount
  - continue into `/pre-approval`
  - close with at least one non-continue interaction
- mobile:
  - open from a same-page CTA
  - verify drawer presentation and close behavior
  - verify continue behavior on the changed route

Required test-evidence rule:

- every PR or implementation batch must state which invariants were exercised and how
- if a behavior was not verified, the phase is incomplete

## Recommended Implementation Order

1. Add feature contract and routes.
2. Add compatibility parser.
3. Introduce `PreApprovalDrawerRoot` around current runtime.
4. Convert legacy barrel into a facade.
5. Migrate `RippleCtaLink` and other shared CTA callers.
6. Migrate route-only consumers and hero selection helpers.
7. Add route-contract clamping as a dedicated parity step.
8. Remove legacy authoring types and compatibility files only after parity is proven.

## Go/No-Go Summary

Go criteria for each phase:

- predecessor phase exit criteria satisfied
- automated checks green
- browser checks green where required
- no zero-regression invariant violated
- evidence captured

No-go criteria for each phase:

- any failed invariant
- any unverified required behavior
- any mixed-in product behavior change
- any missing rollback path
- any ambiguity about remaining legacy consumers before removal

## Decision

Yes, the next artifact should be a migration spec, and it should explicitly optimize for zero breaking changes and zero visual changes.

The safest implementation path is not a rewrite. It is a phased contract migration that:

- keeps the current drawer UI and behavior as the baseline
- introduces `features/pre-approval` as the stable ownership boundary
- uses a dual-schema compatibility layer
- migrates callers incrementally behind a facade
- advances only through explicit verification gates with evidence and rollback posture
