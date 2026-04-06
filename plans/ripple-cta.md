Act as a migration execution agent for the `RippleCtaLink` deprecation fix.

  Objective:
  Remove deprecated `next/link` `legacyBehavior` usage from `components/ui/ripple-cta-link/RippleCtaLink.tsx` without changing product behavior, CTA semantics, analytics behavior, pre-approval trigger
  behavior, motion behavior, keyboard behavior, or rendered accessibility semantics.

  Operate with the same engineering discipline used in:
  - `plans/pre-approval/pre-approval-drawer-migration-spec.md`
  - `plans/pre-approval/pre-approval-drawer-phase-gates.md`
  - `plans/pre-approval/pre-approval-drawer-verification-matrix.md`
  - `plans/pre-approval/pre-approval-drawer-execution-log.md`

  This is an architecture compatibility fix, not a redesign.

  Before editing code, confirm:
  - `rg -n "legacyBehavior|passHref" components app features lib` shows the actual blast radius.
  - `RippleCtaLink.tsx` is the only production use of `legacyBehavior`.
  - All current callers of `RippleCtaLink` are identified.
  - The fix can preserve the current internal-link, external-link, disabled, analytics, ripple, and pre-approval trigger paths.

  Execution constraints:
  - Do not redesign CTA visuals.
  - Do not change external-link behavior.
  - Do not change `preApprovalTrigger` attribute emission.
  - Do not change analytics payload shape or firing path.
  - Do not change disabled rendering semantics unless required by correctness.
  - Do not introduce broad caller rewrites unless strictly necessary.
  - Prefer the smallest safe Next.js 16-compliant internal-link migration.

  Required behavior to preserve:
  - Internal links still navigate through Next.js `Link`.
  - External links still render with `target="_blank"` and `rel="noopener noreferrer"`.
  - Press feedback and tap animation still render correctly.
  - Keyboard activation still works.
  - `aria-label`, className, and prefetch still flow correctly.
  - Drawer trigger attributes still appear on rendered internal CTA DOM nodes.
  - No nested `<a>` under `Link`.
  - No console deprecation warning remains.

  Verification battery:
  - `npm run lint`
  - `npm run build`
  - targeted tests for `RippleCtaLink`
  - targeted tests or assertions for any affected caller using pre-approval trigger attributes
  - browser validation on a non-3000 dev server for at least one internal CTA and one external CTA
  - confirm the deprecation warning no longer appears in the affected route

  Evidence to record in the same style as the pre-approval migration docs:
  - exact search queries used
  - exact files changed
  - exact tests run
  - internal CTA route checked and observed behavior
  - external CTA route checked and observed behavior
  - whether `data-pre-approval-*` attributes are still present where expected
  - GO / NO-GO decision

  No-go conditions:
  - any behavior change in CTA navigation
  - loss of analytics firing
  - loss of press feedback
  - loss of pre-approval trigger attributes
  - accessibility regression
  - deprecation warning still present

  What I would improve beyond the fix
  Yes, but only in a controlled second step. I would not mix these into the deprecation patch unless the implementation forces it.

  1. Freeze the contract with tests around RippleCtaLink.
     Right now the component is doing too many jobs for a primitive. Before or alongside the migration, I’d want explicit tests for:

  - internal link renders correctly
  - external link renders correctly
  - disabled path renders correctly
  - analytics fires exactly once with the right modality
  - pre-approval trigger attributes are present on internal CTA DOM output

  2. Make the rendered-element contract explicit.
     This component currently behaves as:

  - button when disabled
  - a for external links
  - Link + anchor semantics for internal links

  That is acceptable, but it should be documented as a controlled contract, because consumers may implicitly depend on anchor semantics.

  3. Separate “pressable surface” from “navigation strategy” if the component keeps growing.
     The pre-approval plans were correct about keeping contracts clean and boundaries explicit. The same principle applies here. If this component keeps accumulating behavior, the safer architecture
     is:

  - one shared presentational/press-feedback surface
  - one internal navigation wrapper
  - one external navigation wrapper

  That reduces the chance that a future framework migration breaks three behaviors at once.

  4. Add a verification ledger for UI primitives that carry business-critical behavior.
     Your pre-approval planning was strong because it required:

  - phase gates
  - matrixed invariants
  - explicit GO/NO-GO
  - evidence logging

  For a navigation primitive used in hero CTAs, that same discipline is justified. Not a giant migration plan, but at least:

  - frozen invariants
  - blast-radius search
  - targeted verification checklist
  - explicit rollback condition

  My engineering recommendation
  Do this in two layers:

  - Layer 1: eliminate legacyBehavior with the smallest possible compliant implementation.
  - Layer 2: only if needed, harden RippleCtaLink into a better-defined primitive with tests and clearer internal/external boundaries.

  In aerospace terms: first remove the known noncompliant interface without altering flight characteristics. Then, in a separate certified change, improve the subsystem architecture.