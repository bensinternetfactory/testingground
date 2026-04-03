# Financing Review Plan With Strict Step Control

## Purpose

Run the financing audit as a controlled multi-pass review so each pass is small, resumable, and evidence-backed.

This plan exists to prevent:

- one-shot audits that skim broad areas
- step leakage across batch boundaries
- losing continuity between passes
- re-reading the entire codebase every time

## Required Audit Sources

Every audit substep must explicitly apply these four sources:

- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `next-best-practices`
- repo-local conventions from `AGENTS.md` and relevant `CLAUDE.md` files

These are mandatory for every substep report and for the final report.

## Canonical Control Files

These files are the workflow state for the audit:

- `plans/todo.md`
- `plans/reviews/financing-review-rubric.md`
- `plans/reviews/financing-review-scope.md`
- `plans/reviews/financing-findings-ledger.md`
- `plans/reviews/financing-status.md`

Rules:

- `financing-review-rubric.md` is the stable review standard
- `financing-review-scope.md` is the stable scope contract
- `financing-findings-ledger.md` is the canonical normalized findings store
- `financing-status.md` is the canonical execution state
- step reports are evidence artifacts, not the source of truth for workflow state

## Preflight For Every Pass

Before doing any audit work, every pass must do this in order:

1. Run `npm run review:financing:validate` — stop and fix errors before continuing.
2. Run `npm run review:financing:next` — this prints the target step and all required context:
   - **Outputs**: the artifact files this step must produce
   - **Skills**: audit skills to invoke (e.g., `/vercel-composition-patterns`) before starting analysis
   - **CLAUDE.md**: component-level CLAUDE.md files to read for this step's audited components
   - **Browser validation**: whether browser testing is required or not
3. Read `plans/reviews/financing-status.md` — confirm the current target matches the `next` output.
4. Invoke the skills listed by the `next` output.
5. Read the component CLAUDE.md files listed by the `next` output.
6. Announce exactly one target in this format: `Executing Step X only`.
7. Load only the source files allowed for that substep (listed under the step's **Files** section below).
8. Refuse to cross into any later substep, even if time remains.

If a pass does not explicitly lock one substep before analysis begins, the pass is invalid.

If the harness output and the status file disagree, the pass must stop and fix the workflow state before auditing anything.

## Hard Stop Rule

One pass equals one substep.

A compliant pass may do only this:

- complete the current substep
- write that substep's markdown output to disk
- update `plans/reviews/financing-findings-ledger.md` if required
- update `plans/reviews/financing-status.md`
- stop

A pass is invalid if it:

- produces outputs for more than one substep
- gathers findings for a later substep
- updates status for a substep it did not complete
- starts revalidation or consolidation early

If a pass is invalid, resume from the earliest incomplete valid substep.

## Status File Contract

`plans/reviews/financing-status.md` must contain:

- current phase
- current target substep
- last completed substep
- next substep
- pass status: `not-started`, `in-progress`, `completed`, `blocked`, or `invalid`
- output artifact for the current substep
- ledger updated: `yes` or `no`
- notes

Every completed substep must immediately update the status file before stopping.

The next fresh pass must use the updated status file through the harness before doing any new analysis.

## Scope Control

Scope is defined by `plans/financing-page.md` and must distinguish rendered components from dormant shared components.

### Rendered In Current Financing Routes

Per the current route matrix, these are in rendered scope:

- route entry pages
- route config files
- financing shell and shared config/type helpers
- `JsonLd`
- drawer contract files needed to validate financing CTA behavior
- hero families used by the four financing routes
- `TertiaryActionsStrip`
- `FinancingOffersSplit`
- `BrandMarquee`
- `PurchaseAndTermsSection`
- `PurchaseSourceGrid`
- `TermLengthSlider`
- `ContentImageSplit`
- `FaqSection`
- `FinancingFootnotes`
- `EquipmentClosingCta`
- `RelatedLinksStrip`
- boundary dependencies: nav, drawer, footer, root layout wrappers

### Dormant Or Not Currently Rendered

These exist in the shared system but are not currently rendered on the four audited financing routes unless the scope document proves otherwise:

- `ProgramCards`
- `TrustBridge`
- `EquipmentDealsSection`

Rules for dormant components:

- do not deep-audit them as if they were route-visible sections
- review them only for boundary impact, shared API coupling, or latent contract risk
- if they become materially relevant during Step 1 scope locking, mark that explicitly in `financing-review-scope.md`
- otherwise treat them as out of deep route-behavior scope

## Required Lenses For Every Substep

Every substep must explicitly check:

- accessibility
- responsive behavior
- Core Web Vitals risk
- repo convention compliance

These are not optional and must be written into each report, even when the result is "no issue found."

## Evidence Requirements

Every finding must include:

- exact file references with line numbers where possible
- affected route list
- whether the issue is local or systemic
- why the issue belongs to the cited skill or convention source
- a concrete fix direction

Every report must also include:

- files reviewed
- conventions reviewed
- routes validated
- explicit `No findings` sections for areas that were checked and passed

## Runtime Validation Rule

Static code reading is not enough for interactive or presentation-sensitive substeps.

Browser validation is required for any substep that makes claims about:

- keyboard behavior
- pointer or touch behavior
- focus behavior
- responsive layout
- hydration or flicker
- CLS, INP, or LCP risk visible in the browser

Minimum browser evidence for those substeps:

- run against a local server on port `3005`
- validate at one mobile viewport and one desktop viewport
- open at least one affected financing route
- perform at least one relevant interaction for the audited area
- record evidence notes in the substep report

Substeps that are purely route/config/schema/typing reviews may omit browser validation, but must say why.

## Execution Context Rules

To keep context bounded, each pass may load only:

- `plans/todo.md`
- `plans/reviews/financing-review-rubric.md`
- `plans/reviews/financing-review-scope.md`
- `plans/reviews/financing-findings-ledger.md`
- `plans/reviews/financing-status.md`
- the files for the current substep
- only the relevant local `CLAUDE.md` and `AGENTS.md` files for the current substep

Do not reload prior step reports unless:

- the ledger suggests a duplicate
- the status file notes ambiguity
- a systemic pattern changes severity or blast radius
- the revalidation step requires it

The harness commands are part of the allowed execution context for every pass:

- `npm run review:financing:validate`
- `npm run review:financing:next`
- `npm run review:financing:prompt` only when generating a handoff prompt for a fresh agent

## Review Rubric Requirements

`plans/reviews/financing-review-rubric.md` must define:

- severity levels
- finding template
- evidence expectations
- rule-family mapping by skill
- repo-convention checklist
- when to mark a finding as systemic
- when to mark a finding as boundary-only
- browser validation rules by substep type

## Findings Ledger Requirements

`plans/reviews/financing-findings-ledger.md` must be the normalized source for final consolidation.

Each ledger entry must include:

- finding ID
- status: `open`, `accepted`, `duplicate`, `deferred`, `resolved-in-analysis`, or `blocked`
- severity
- source skill or convention
- rule ID or rule area
- pattern tag
- affected components
- affected routes
- shared dependency impact
- first-seen substep
- latest-reviewed substep
- summary
- fix direction
- evidence pointer to the step report

## Step Sequence

### Step 1: Lock rubric, scope, and workflow state

Outputs:

- `plans/reviews/financing-review-rubric.md`
- `plans/reviews/financing-review-scope.md`
- `plans/reviews/financing-findings-ledger.md`
- `plans/reviews/financing-status.md`

Work:

- confirm exact files from `plans/financing-page.md`
- classify rendered scope vs dormant shared components
- confirm boundary dependencies: nav, drawer, footer, and layout wrappers
- mark boundary-reviewed dependencies as out of deep refactor scope unless escalation is warranted
- define finding IDs and ledger normalization rules
- define the status file format and completion rules
- define all substeps below as the only valid execution sequence

Hard stop:

- stop after the four control files are written
- do not begin Step 2a

### Step 2a: Audit route entries and route metadata contracts

Files:

- `app/(marketing)/(financing)/rollback-financing/page.tsx`
- `app/(marketing)/(financing)/wrecker-financing/page.tsx`
- `app/(marketing)/(financing)/rotator-financing/page.tsx`
- `app/(marketing)/(financing)/used-tow-truck-financing/page.tsx`
- financing route metadata exported from those files, if any
- the four route `config.ts` files only as needed to validate page entry ownership

Focus:

- page ownership
- metadata ownership
- route-to-config handoff quality
- consistency across the four financing routes

Output:

- `plans/reviews/financing-step-02a-route-entries.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 2b: Audit shell, shared config, and config type contracts

Files:

- `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx`
- `app/(marketing)/(financing)/_components/shared-config.ts`
- `app/(marketing)/(financing)/_components/page-config-types.ts`
- the four financing `config.ts` files

Focus:

- runtime config contract vs declared types
- config builder consistency
- explicit variant architecture
- serialization and shell-level server/client boundaries

Output:

- `plans/reviews/financing-step-02b-shell-config.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 2c: Audit JSON-LD, drawer CTA contract, and boundary wrappers

Files:

- `components/shared/JsonLd.tsx`
- `components/ui/pre-approval-drawer/config.ts`
- `components/ui/pre-approval-drawer/DrawerContext.tsx`
- `components/ui/pre-approval-drawer/PreApprovalDrawer.tsx` only if needed for contract verification
- `app/layout.tsx`
- `app/(marketing)/layout.tsx`
- `app/(marketing)/(financing)/layout.tsx`
- financing shell and config files only as needed to verify CTA and schema integration

Focus:

- schema/script handling
- CTA-to-drawer contract
- same-page drawer invocation behavior
- boundary wrapper side effects
- metadata and schema parity across financing routes

Output:

- `plans/reviews/financing-step-02c-schema-drawer.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 3a: Audit framed hero server wrappers and variant design

Files:

- `components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx`
- `components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx`
- `components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly.tsx`
- `components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight.tsx`
- `components/sections/heroes/hero-convert-framed/index.ts`
- local hero `CLAUDE.md`

Focus:

- variant architecture
- API clarity
- server/client boundary placement
- LCP and image treatment at the wrapper level

Output:

- `plans/reviews/financing-step-03a-hero-wrappers.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 3b: Audit framed hero interactive islands and shared CTA primitive

Files:

- `components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`
- `components/sections/heroes/hero-convert-framed/FramedSelectionTile.tsx`
- `components/sections/heroes/hero-convert-framed/HeroGallery.tsx`
- `components/ui/ripple-cta-link/RippleCtaLink.tsx`
- `components/ui/ripple-cta-link/index.ts`
- relevant `CLAUDE.md` files

Focus:

- keyboard and touch behavior
- hydration and rerender risk
- CTA primitive correctness
- CLS and INP risk in hero interactions

Output:

- `plans/reviews/financing-step-03b-hero-interactions.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 3c: Audit lead-gen hero path

Files:

- `components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`
- `components/sections/heroes/hero-lead-gen/TrustBadge.tsx`
- `components/sections/heroes/hero-lead-gen/config.ts`
- `components/sections/heroes/hero-lead-gen/index.ts`
- local hero `CLAUDE.md`

Focus:

- route-specific hero architecture for rotator financing
- semantic structure
- image/content balance
- responsive and accessibility behavior

Output:

- `plans/reviews/financing-step-03c-hero-lead-gen.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 4a: Audit tertiary strip and financing offers split

Files:

- `components/sections/page/tertiary-strip/*`
- `components/sections/page/financing-offers-split/*`
- relevant `CLAUDE.md` files

Focus:

- CTA usage patterns
- timer and motion behavior
- semantics and responsive rendering
- observer, effect, and client-island risks

Output:

- `plans/reviews/financing-step-04a-strip-offers.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 4b: Audit brand marquee

Files:

- `components/sections/page/brand-marquee/*`
- local `CLAUDE.md`

Focus:

- client-only boundary justification
- motion and observer behavior
- reduced-motion handling
- responsive overflow and CLS risk

Output:

- `plans/reviews/financing-step-04b-brand-marquee.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 4c: Boundary review dormant mid-page shared sections

Files:

- `components/sections/page/program-cards/*`

Focus:

- shared API coupling to financing shell or config
- whether dormant sections create contract or architectural risk for financing pages
- no route-behavior deep audit unless scope was explicitly expanded in Step 1

Output:

- `plans/reviews/financing-step-04c-dormant-mid-sections.md`

Hard stop:

- write the report
- update ledger only if financing-relevant risk exists
- update status
- stop

### Step 5a: Audit purchase-and-terms server wrapper

Files:

- `components/sections/page/purchase-and-terms/*`
- local `CLAUDE.md`

Focus:

- wrapper composition
- prop shaping for child islands
- semantic structure
- section containment rules

Output:

- `plans/reviews/financing-step-05a-purchase-wrapper.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 5b: Audit purchase-source-grid and term-length-slider client islands

Files:

- `components/sections/page/purchase-source-grid/*`
- `components/sections/page/term-length-slider/*`
- relevant `CLAUDE.md` files

Focus:

- interactive control accessibility
- serialized prop weight
- rerender and state patterns
- touch behavior and responsive ergonomics

Output:

- `plans/reviews/financing-step-05b-purchase-interactions.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 5c: Audit content-image-split

Files:

- `components/sections/page/content-image-split/*`
- local `CLAUDE.md`

Focus:

- semantic content exposure
- image usage
- responsive layout stability
- server-component suitability

Output:

- `plans/reviews/financing-step-05c-content-image-split.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 5d: Boundary review dormant lower-middle shared sections

Files:

- `components/sections/page/trust-bridge/*`
- `components/sections/page/equipment-deals/*`

Focus:

- shared API coupling
- latent financing-shell risk
- no route-behavior deep audit unless scope was explicitly expanded in Step 1

Output:

- `plans/reviews/financing-step-05d-dormant-lower-sections.md`

Hard stop:

- write the report
- update ledger only if financing-relevant risk exists
- update status
- stop

### Step 6a: Audit FAQ section

Files:

- `components/sections/page/faq/*`
- local `CLAUDE.md`

Focus:

- accordion behavior
- keyboard and focus handling
- schema-content alignment implications
- hydration and performance risks

Output:

- `plans/reviews/financing-step-06a-faq.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 6b: Audit footnotes and related links

Files:

- `components/sections/page/financing-footnotes/*`
- `components/sections/page/related-links-strip/*`
- relevant `CLAUDE.md` files

Focus:

- crawlability
- internal linking semantics
- content clarity and route relevance
- responsive density and tap targets

Output:

- `plans/reviews/financing-step-06b-footnotes-links.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 6c: Audit closing CTA

Files:

- `components/sections/page/equipment-closing-cta/*`
- `components/ui/ripple-cta-link/*` only as needed for closing CTA behavior
- relevant `CLAUDE.md` files

Focus:

- CTA semantics
- drawer or route transition behavior
- focus order near page end
- mobile tap-target quality

Output:

- `plans/reviews/financing-step-06c-closing-cta.md`

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 7: Revalidate systemic findings and reconcile ledger

Output:

- `plans/reviews/financing-step-07-revalidation.md`

Work:

- revisit only findings that appear duplicated, systemic, or severity-sensitive
- confirm whether repeated issues share one root cause or multiple fixes
- adjust blast radius where shared dependencies are involved
- reconcile all ledger statuses before final consolidation

Hard stop:

- write the report
- update ledger
- update status
- stop

### Step 8: Consolidate the final master report

Output:

- `plans/reviews/financing-review-final.md`

Required sections:

1. Executive summary
2. Critical issues
3. Findings by severity
4. Cross-cutting patterns
5. Ordered remediation roadmap

Consolidation rules:

- use `plans/reviews/financing-findings-ledger.md` as the primary source
- group by systemic pattern, not just file
- preserve origin substep and source skill
- separate foundational issues from localized cleanup
- lock final severity only after Step 7 reconciliation

Hard stop:

- write the final report
- update status
- stop

## Finding Format

Every checkpoint and the final report must use this format:

- Severity
- Skill source
- Rule ID or rule area
- Pattern tag
- Affected component(s)
- Affected route(s)
- Shared dependency impact, if any
- Problem
- Why it matters
- Fix direction
- Blocks / Blocked-By, if relevant
- Evidence / repro notes

## Assumptions

- no code changes happen during this workflow
- each pass is allowed to write only its own artifact plus ledger/status updates
- dormant shared sections are not treated as first-class route sections unless Step 1 explicitly expands scope
