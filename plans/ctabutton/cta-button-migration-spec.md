# CTA Button Migration Spec

## Purpose

This spec translates the CTA architecture documents into an execution plan that preserves current revenue-critical CTA behavior while migrating from `components/ui/ripple-cta-link` to a canonical feature-owned CTA system.

This is a systems migration, not a visual redesign.

## Inputs Reviewed

- `plans/ctabutton/cta-button-production-api.md`
- `plans/pre-approval/pre-approval-drawer-migration-spec.md`
- `plans/pre-approval/pre-approval-drawer-verification-matrix.md`
- `plans/pre-approval/pre-approval-drawer-phase-gates.md`
- `plans/pre-approval/pre-approval-drawer-execution-log.md`
- `plans/ctabutton/checklist.md`
- `components/ui/ripple-cta-link/CLAUDE.md`
- `components/ui/ripple-cta-link/*`
- `lib/press-feedback.tsx`
- current `RippleCtaLink` production callers under `app/` and `components/`

## What We Need To Do Next

1. Keep `plans/ctabutton/checklist.md` as the live migration boundary and regenerate it when the inventory changes.
2. Freeze current CTA behavior as the baseline using code-backed tests, including external navigation, disabled rendering, pre-approval trigger emission, touch-first press lifecycle per the production API (immediate pressed-state on touch-down, cancel on drift/scroll, exactly-once commit, haptics adapter integration via the existing `usePressFeedback` + `web-haptics` system in `lib/press-feedback.tsx`), and reduced-motion behavior.
3. Add adjacent-surface verification for direct `usePressFeedback` consumers and direct pre-approval trigger builders before changing shared ownership.
4. Introduce the smallest useful `features/cta/` implementation only when the first migrated caller needs it.
5. Migrate one caller class at a time and re-run targeted verification after each batch.
6. Delete the legacy CTA wrapper only after every deep import, wrapper-only `children` override, and `cardId` site has explicit closure evidence.

## Execution Artifacts

This document is the governing spec. Execute the migration through these companion artifacts:

- `plans/ctabutton/cta-button-verification-matrix.md`
  - requirement-to-test traceability
- `plans/ctabutton/cta-button-phase-gates.md`
  - active phase checklist and go/no-go gates
- `plans/ctabutton/cta-button-execution-log.md`
  - dated evidence ledger for each implementation batch
- `plans/ctabutton/checklist.md`
  - current live boundary and pre-migration blocker list

Execution rule:

- no phase advances until the phase gate is checked off and supporting evidence is recorded in the execution log
- use `plans/ctabutton/cta-button-phase-prompts.md` when handing the work to an execution agent so phase scope, hardstops, and evidence requirements stay consistent

## Architecture Decisions

### 1. Feature-owned filesystem

The CTA system is no longer a single generic UI component. It is a feature with explicit contracts, compatibility boundaries, and runtime behavior.

Target structure:

```text
features/
  cta/
    contract.ts
    lead-entry.ts
    client.tsx
    internal/
      interaction/
        controller.ts
        haptics.ts
        motion.ts
      render/
        CtaSurface.tsx
        CtaLabel.tsx
        CtaIcon.tsx
        PressFeedback.tsx
      compatibility/
        ripple-cta-link.ts
```

Compatibility layer during migration:

```text
components/ui/ripple-cta-link/
  index.ts
  RippleCtaLink.tsx
```

Rules during migration:

- `components/ui/ripple-cta-link/index.ts` may re-export from `@/features/cta/*`.
- existing deep import paths such as `@/components/ui/ripple-cta-link/RippleCtaLink` must keep compiling until the last production consumer is migrated.
- do not delete the legacy path until repository search proves there are no remaining production consumers.

### 2. Server-safe and client-only boundaries stay separate

- `contract.ts` and `lead-entry.ts` must be safe to import from server components, config files, and section config files.
- `client.tsx` owns the canonical client-facing React surfaces.
- `internal/*` owns motion, pointer, keyboard, ripple, and haptics runtime details.
- section config and route config files must not import client-only CTA runtime modules.

### 3. Pre-approval composition must reuse the existing feature contract

The CTA migration must compose with the existing pre-approval production API rather than re-defining it.

- `LeadCta` must use `PreApprovalTrigger` from `@/features/pre-approval/contract`.
- CTA code must reuse the existing pre-approval attribute builder.
- CTA code must not manually construct pre-approval query strings, hash names, or trigger data attributes.

### 4. Press semantics are a subsystem, not styling

Current press behavior is partly shared through `lib/press-feedback.tsx` and partly duplicated in feature-specific callers. The drawer continue button (`PreApprovalDrawerView.tsx:486`) already demonstrates the correct touch-first pattern: `usePressFeedback` + `<motion.button>` with `whileTap` for immediate pressed-state feedback, haptics via `web-haptics`, and swipe cancel via `SWIPE_THRESHOLD`.

Decision:

- touch-first interaction, press, cancel, commit, duplicate-commit prevention, reduced-motion behavior, and haptics isolation are first-class migration concerns
- all canonical CTA surfaces must reuse the existing `usePressFeedback` + motion pressed-state pattern — do not build a new interaction system
- rendering and analytics must not own business commit semantics
- any relocation of `lib/press-feedback.tsx` must preserve current shared consumers until they are intentionally migrated
- haptics must flow through the existing `web-haptics` adapter in `usePressFeedback`, not ad hoc per-caller wiring

### 5. Preserve current visuals while promoting touch-first interaction

The migration baseline is the current rendered CTA behavior:

- dark and outline pill visuals
- click-commit press feedback with ripple or haptics firing from click handling
- disabled-as-button rendering
- internal versus external navigation behavior
- pre-approval attribute emission on internal lead-entry CTAs

The migration target adds the touch-first behavioral contract defined in the production API. This is not a redesign — it is a behavioral promotion:

- all CTA surfaces must show immediate pressed-state feedback on touch-down and mouse-down, using the same `usePressFeedback` + `whileTap` motion pattern already working on the drawer continue button
- the current internal `<Link>` path in `features/cta/client.tsx:250` lacks `whileTap` — this must be resolved so all CTA surfaces have uniform pressed-state feedback
- haptics must flow through the existing `web-haptics` integration, not new per-caller wiring
- the migration does not authorize visual redesign work mixed into the same batches

## Current State vs Target

Already in place:

- `RippleCtaLink` supports internal navigation, external navigation, disabled rendering, analytics callback emission, ripple feedback, and pre-approval trigger attributes
- `lib/press-feedback.tsx` centralizes ripple spawning, touch-swipe cancel, keyboard modality tracking, reduced-motion detection, and haptics triggering
- current production callers already provide some stable business context through `preApprovalTrigger`
- baseline tests now cover current wrapper and shared press-feedback behavior in `components/ui/ripple-cta-link/__tests__/RippleCtaLink.test.tsx` and `lib/__tests__/press-feedback.test.tsx`

Missing or incomplete:

- canonical feature-owned CTA modules under `features/cta/`
- explicit `CtaLink`, `CtaButton`, and `LeadCta` public surfaces
- explicit `CtaOrigin` contract instead of legacy `section` and `cardId`
- compatibility adapter for legacy analytics payloads
- removal of `next/link` `legacyBehavior` and `passHref`
- final search-based removal plan for `RippleCtaLink`
- touch-first interaction lifecycle where pressed state begins on touch-down for all CTA surfaces (the `usePressFeedback` system exists and is active on the drawer continue button, but the canonical CTA internal `<Link>` path lacks the `whileTap` motion integration)
- uniform haptics integration across all CTA surfaces through the existing `web-haptics` adapter in `usePressFeedback` (currently wired but not verified to three-tier evidence standard)

Migration-sensitive consumers that must be preserved or explicitly migrated:

- hero CTA callers
- sticky-nav and mobile overlay CTA callers
- section-level inline, promo, sidebar, and tertiary CTA callers
- card-based CTA callers using `cardId`
- pre-approval entry CTA callers using `preApprovalTrigger`
- direct deep imports of `@/components/ui/ripple-cta-link/RippleCtaLink`
- non-CTA consumers of `lib/press-feedback.tsx` such as nav pressables and other press-feedback surfaces

Current live boundary summary:

- 18 production `RippleCtaLink` consumers: 16 barrel imports and 2 deep imports
- 3 direct `usePressFeedback` consumers outside the wrapper
- 6 direct `buildPreApprovalTriggerAttributes()` surfaces outside the wrapper
- 1 route-based pre-approval entry outside the wrapper
- 5 wrapper-only `children` override sites
- 3 `cardId` wrapper sites

## Pre-Resolved Decisions

### 1. The API docs are not the phase runbook

Decision:

- `cta-button-production-api.md` is the single CTA architecture and contract source of truth
- phase checklists, verification requirements, and execution evidence live only in the migration spec, verification matrix, phase gates, and execution log

### 2. Legacy analytics identity remains compatibility-only

Current callers still depend on legacy fields such as `section` and `cardId`.

Decision:

- canonical CTA APIs require `CtaOrigin`
- the compatibility wrapper may translate `section` and `cardId` into a legacy analytics adapter during migration
- label text must never become analytics identity

### 3. Wrapper-only content flexibility remains temporary

Current `RippleCtaLink` accepts `children` as an override for `label`.

Decision:

- canonical CTA contracts use explicit copy plus render slots
- arbitrary `children` support remains compatibility-only until callers are migrated
- final removal requires proof that production callers no longer depend on wrapper-only content patterns

### 4. Shared press-feedback ownership cannot be changed by assumption

`lib/press-feedback.tsx` is used outside the CTA wrapper.

Decision:

- relocating or replacing this helper requires a dedicated verification batch
- CTA migration phases may wrap or reuse the helper first
- do not delete or narrow the helper until non-CTA consumers are accounted for

### 5. Caller migration must be staged by blast radius

Decision:

- migrate one caller batch at a time
- prioritize revenue-critical lead-entry callers first
- do not combine broad caller rewrites with interaction-runtime rewrites in the same batch
