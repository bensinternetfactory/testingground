# Financing Review Final

## Consolidation Context

- Executed step: `Step 8` only
- Primary source: `plans/reviews/financing-findings-ledger.md`
- Supporting control files: `plans/reviews/financing-review-rubric.md`, `plans/reviews/financing-review-scope.md`, and `plans/reviews/financing-status.md`
- Required review sources applied for consolidation:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from root `AGENTS.md` and route-ownership guidance in `app/(marketing)/AGENTS.md`
- Browser validation: not required for Step 8 per `npm run review:financing:next`
- Audited routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`

## Executive Summary

This Step 8 consolidation closes the financing audit workflow by normalizing the
Step 7 ledger state into one remediation-oriented report. The canonical ledger
holds `19` open findings across the four audited financing routes: `1`
high-severity finding, `14` medium-severity findings, and `4` low-severity
findings.

The highest-priority defect is `FIN-a11y-017`, where financing disclosure text
falls below readable contrast thresholds on every audited route. Most of the
remaining risk clusters into four systemic families that Step 7 already locked:
shell ownership and drawer contracts, hero-family architecture and runtime
behavior, duplicated serialization and hydration work, and route-surface
accessibility. The ledger does not contain exact duplicates, so each finding
below remains a distinct remediation target even when several share the same
delivery track.

## Critical Issues

### FIN-a11y-017

- Severity: `S1-high`
- Skill source: repo accessibility conventions
- Rule ID or rule area: `accessibility; content clarity`
- Pattern tag: `footnote-disclosures-low-contrast`
- Affected component(s): FinancingFootnotes
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The shared footnote renderer controls disclosure
  styling across every audited financing route.
- Problem: `FinancingFootnotes` renders disclosure copy as `text-xs` in
  `#999999` on `bg-gray-50`, dropping the contrast ratio to about `2.73:1` for
  important financing disclosures.
- Why it matters: The shared footnote renderer controls disclosure styling
  across every audited financing route, so the current treatment weakens legally
  and commercially important content everywhere the financing pages render it.
- Fix direction: Increase disclosure contrast, raise the text size, and keep the
  footnote treatment readable at mobile widths.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-06b-footnotes-links.md`;
  first seen in `Step 6b` and revalidated in `Step 7`.

## Findings By Severity

### S1-high

### FIN-a11y-017

- Severity: `S1-high`
- Skill source: repo accessibility conventions
- Rule ID or rule area: `accessibility; content clarity`
- Pattern tag: `footnote-disclosures-low-contrast`
- Affected component(s): FinancingFootnotes
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The shared footnote renderer controls disclosure
  styling across every audited financing route.
- Problem: `FinancingFootnotes` renders disclosure copy as `text-xs` in
  `#999999` on `bg-gray-50`, dropping the contrast ratio to about `2.73:1` for
  important financing disclosures.
- Why it matters: The shared footnote renderer controls disclosure styling
  across every audited financing route.
- Fix direction: Increase disclosure contrast, raise the text size, and keep the
  footnote treatment readable at mobile widths.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-06b-footnotes-links.md`;
  first seen in `Step 6b` and revalidated in `Step 7`.

### S2-medium

### FIN-metadata-001

- Severity: `S2-medium`
- Skill source: next-best-practices metadata; repo route-ownership conventions
- Rule ID or rule area: `metadata`
- Pattern tag: `route-metadata-in-page-config`
- Affected component(s): rollbackFinancingPageConfig,
  wreckerFinancingPageConfig, rotatorFinancingPageConfig,
  usedTowTruckFinancingPageConfig, EquipmentFinancingPageConfig
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: Shared financing page config owns a Next.js
  `Metadata` field for every audited route.
- Problem: All four financing routes still centralize route metadata inside
  shared financing config, and the base config type continues to require that
  ownership pattern.
- Why it matters: Shared financing page config owns a Next.js `Metadata` field
  for every audited route.
- Fix direction: Move metadata exports into each `page.tsx` route file and
  remove the `metadata` field from `EquipmentFinancingPageConfig` after route
  ownership is restored.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-02b-shell-config.md`;
  first seen in `Step 2a` and revalidated in `Step 7`.

### FIN-architecture-002

- Severity: `S2-medium`
- Skill source: vercel-composition-patterns; financing scope contract
- Rule ID or rule area: `patterns-explicit-variants`
- Pattern tag: `dormant-sections-in-base-shell-contract`
- Affected component(s): EquipmentFinancingPageShell, EquipmentFinancingPageConfig,
  ProgramCards, SHARED_TRUST_BRIDGE_CONFIG, buildEquipmentPrograms
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The base financing shell and config type still
  carry dormant section branches for every audited route.
- Problem: Dormant section families remain first-class options in the base
  financing shell contract even though none of the four rendered route configs
  use them, and Step 4c reconfirmed that the `programs` slot plus
  `buildEquipmentPrograms` helper still sit in the shared financing contract
  without financing-route call sites.
- Why it matters: The base financing shell and config type still carry dormant
  section branches for every audited route.
- Fix direction: Remove dormant sections from the base shell/config contract or
  move them into an explicit extended variant that only routes using those
  sections can adopt.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-04c-dormant-mid-sections.md`;
  first seen in `Step 2b` and revalidated in `Step 7`.

### FIN-bundle-004

- Severity: `S2-medium`
- Skill source: vercel-react-best-practices; next-best-practices
- Rule ID or rule area: `bundle-conditional`
- Pattern tag: `root-layout-drawer-provider`
- Affected component(s): RootLayout, DrawerProvider, DrawerHashListener,
  PreApprovalDrawer
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The root app shell mounts the financing drawer
  client boundary for every route in the app instead of scoping it to the
  financing segment that needs same-page drawer CTAs.
- Problem: The pre-approval drawer provider lives in `app/layout.tsx`, so all
  routes inherit the drawer portal, router dependency, and global click/hash
  listeners even though the marketing and financing segment layouts are
  otherwise pass-through wrappers.
- Why it matters: The root app shell mounts the financing drawer client boundary
  for every route in the app instead of scoping it to the financing segment that
  needs same-page drawer CTAs.
- Fix direction: Move `DrawerProvider` into a financing-only layout wrapper so
  only routes that use the drawer load its client code and listeners.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-02c-schema-drawer.md`;
  first seen in `Step 2c` and revalidated in `Step 7`.

### FIN-cta-005

- Severity: `S2-medium`
- Skill source: repo CTA contract conventions; pre-approval-drawer CLAUDE
- Rule ID or rule area: `drawer CTA contract`
- Pattern tag: `drawer-enabled-route-drift`
- Affected component(s): resolveDrawerTriggerHref, NavClient,
  usedTowTruckFinancingPageConfig
- Affected route(s): /used-tow-truck-financing
- Shared dependency impact: The shared nav CTA helper hard-codes which
  financing routes can stay on-page, so omitted financing routes fall back to
  `/rollback-financing#get-pre-approved` even when their own page already
  exposes drawer CTAs.
- Problem: The used-truck financing route still uses `DRAWER_HASH` in its hero
  and closing CTA, but the sticky-nav CTA helper excludes that pathname and
  routes users to the rollback page instead of opening the same-page drawer.
- Why it matters: The shared nav CTA helper hard-codes which financing routes
  can stay on-page, so omitted financing routes fall back to
  `/rollback-financing#get-pre-approved` even when their own page already
  exposes drawer CTAs.
- Fix direction: Derive drawer eligibility from route ownership or add
  `/used-tow-truck-financing` to the drawer-enabled path list so all audited
  financing routes honor the same contract.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-02c-schema-drawer.md`;
  first seen in `Step 2c` and revalidated in `Step 7`.

### FIN-architecture-006

- Severity: `S2-medium`
- Skill source: vercel-composition-patterns; repo component-ownership
  conventions
- Rule ID or rule area: `patterns-explicit-variants`
- Pattern tag: `variant-contract-owned-by-sibling-family`
- Affected component(s): HeroConvertFramed, HeroConvertFramedOutline,
  HeroConvertFramedPrimaryOnly
- Affected route(s): /rollback-financing, /wrecker-financing,
  /used-tow-truck-financing
- Shared dependency impact: The framed hero family still derives its public
  wrapper contract from the sibling `hero-convert-geico` config type.
- Problem: The three main framed wrappers use explicit variant entry points, but
  they still inherit most of their public config surface from `HeroConvertConfig`
  in another hero family.
- Why it matters: The framed hero family still derives its public wrapper
  contract from the sibling `hero-convert-geico` config type.
- Fix direction: Extract a locally owned framed-hero base config and let each
  wrapper variant extend that local contract instead of the sibling family type.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-03a-hero-wrappers.md`;
  first seen in `Step 3a` and revalidated in `Step 7`.

### FIN-patterns-007

- Severity: `S2-medium`
- Skill source: vercel-composition-patterns; vercel-react-best-practices
- Rule ID or rule area: `architecture-compound-components; rendering-conditional-render`
- Pattern tag: `wrapper-shell-duplication`
- Affected component(s): HeroConvertFramed, HeroConvertFramedOutline,
  HeroConvertFramedPrimaryOnly, HeroConvertFramedTileRight
- Affected route(s): /rollback-financing, /wrecker-financing,
  /used-tow-truck-financing
- Shared dependency impact: Every framed hero variant duplicates the same
  server wrapper shell, footnote helper, and large parts of the responsive
  media layout.
- Problem: The family uses explicit variant files, but shared shell behavior is
  still copied across four wrappers, which raises drift risk for responsive and
  image-treatment changes.
- Why it matters: Every framed hero variant duplicates the same server wrapper
  shell, footnote helper, and large parts of the responsive media layout.
- Fix direction: Extract shared server-only building blocks for the outer shell,
  footnote rendering, and media slots so variants only own the regions that
  actually differ.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-03a-hero-wrappers.md`;
  first seen in `Step 3a` and revalidated in `Step 7`.

### FIN-a11y-008

- Severity: `S2-medium`
- Skill source: repo accessibility conventions; hero-convert-framed local
  contract
- Rule ID or rule area: `accessibility; keyboard behavior`
- Pattern tag: `single-select-buttons-without-radiogroup`
- Affected component(s): FramedTileSelector, FramedSelectionTile
- Affected route(s): /rollback-financing, /wrecker-financing,
  /used-tow-truck-financing
- Shared dependency impact: Every framed hero route that uses the shared
  selector inherits the same single-select keyboard model.
- Problem: The hero selector is a required single-choice picker, but it is
  exposed as a generic button group with `aria-pressed` buttons instead of
  radio-group semantics and arrow-key navigation.
- Why it matters: Every framed hero route that uses the shared selector
  inherits the same single-select keyboard model.
- Fix direction: Convert the selector to a true single-select control with
  radio semantics and directional keyboard support while keeping the current
  visual styling.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-03b-hero-interactions.md`;
  first seen in `Step 3b` and revalidated in `Step 7`.

### FIN-image-009

- Severity: `S2-medium`
- Skill source: next-best-practices; vercel-react-best-practices
- Rule ID or rule area: `image optimization; rendering performance`
- Pattern tag: `hero-gallery-lazy-lcp`
- Affected component(s): HeroGallery
- Affected route(s): /wrecker-financing
- Shared dependency impact: Any financing route that opts into `HeroGallery`
  inherits the same hero-image loading behavior.
- Problem: The desktop hero gallery image remains on Next.js lazy loading
  because `HeroGallery` does not prioritize the initially visible hero asset.
- Why it matters: Any financing route that opts into `HeroGallery` inherits the
  same hero-image loading behavior.
- Fix direction: Prioritize or preload the first gallery image on routes where
  the gallery occupies the hero media slot.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-03b-hero-interactions.md`;
  first seen in `Step 3b` and revalidated in `Step 7`.

### FIN-hydration-011

- Severity: `S2-medium`
- Skill source: next-best-practices; vercel-react-best-practices
- Rule ID or rule area: `hydration errors; client boundary`
- Pattern tag: `countdown-client-date-hydration-drift`
- Affected component(s): CountdownChip, FinancingOffersSplit,
  ROLLBACK_FINANCING_OFFERS_SPLIT_CONFIG
- Affected route(s): /rollback-financing
- Shared dependency impact: The shared countdown primitive can ship stale or
  mismatched time-sensitive offer copy anywhere another financing offer half
  opts into `countdown`.
- Problem: The rollback offer-expiry chip derives visible day text from
  render-time `Date` values inside a client component, so prerender and
  hydration can disagree and the label never resyncs after mount.
- Why it matters: The shared countdown primitive can ship stale or mismatched
  time-sensitive offer copy anywhere another financing offer half opts into
  `countdown`.
- Fix direction: Compute remaining-day copy from a single UTC-normalized
  server-side date source and pass it as serialized data, or render the chip
  only after mount with explicit hydration handling if it must stay client-only.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-04a-strip-offers.md`;
  first seen in `Step 4a` and revalidated in `Step 7`.

### FIN-a11y-012

- Severity: `S2-medium`
- Skill source: repo accessibility conventions; brand-marquee local contract
- Rule ID or rule area: `accessibility; semantic content`
- Pattern tag: `brand-list-hidden-from-at`
- Affected component(s): BrandMarquee, BRAND_LOGOS
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The shared financing marquee hides its specific
  manufacturer list from assistive technology everywhere the audited routes
  render it.
- Problem: The marquee gives each logo a meaningful alt string but hides both
  scrolling tracks with `aria-hidden`, so screen readers only receive the
  generic heading and never the actual financed brands.
- Why it matters: The shared financing marquee hides its specific manufacturer
  list from assistive technology everywhere the audited routes render it.
- Fix direction: Hide only the duplicated animation track from assistive
  technology and expose one accessible manufacturer list or equivalent text
  alternative.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-04b-brand-marquee.md`;
  first seen in `Step 4b` and revalidated in `Step 7`.

### FIN-bundle-013

- Severity: `S2-medium`
- Skill source: vercel-react-best-practices; next-best-practices;
  purchase-and-terms local contract
- Rule ID or rule area: `bundle-conditional; RSC boundaries`
- Pattern tag: `responsive-wrapper-duplicates-client-islands`
- Affected component(s): PurchaseAndTermsSection, PurchaseSourceGrid,
  TermLengthSlider
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The shared purchase-and-terms wrapper duplicates
  both client island mounts for responsive layout changes, so routes that render
  this section pay for two serialized and hydrated copies of the same child
  payloads.
- Problem: `PurchaseAndTermsSection` renders separate mobile and desktop
  branches and mounts the same `PurchaseSourceGrid` and `TermLengthSlider`
  config payloads inside both, which turns a layout-only breakpoint change into
  duplicate client work.
- Why it matters: The shared purchase-and-terms wrapper duplicates both client
  island mounts for responsive layout changes, so routes that render this
  section pay for two serialized and hydrated copies of the same child payloads.
- Fix direction: Keep one instance of each child island and move the responsive
  stacking versus column layout into a single server wrapper with
  breakpoint-controlled grid and divider styling.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-05a-purchase-wrapper.md`;
  first seen in `Step 5a` and revalidated in `Step 7`.

### FIN-schema-016

- Severity: `S2-medium`
- Skill source: next-best-practices; vercel-react-best-practices; faq local
  contract
- Rule ID or rule area: `metadata; server-serialization`
- Pattern tag: `faq-answer-dual-source-drift`
- Affected component(s): FAQ, FaqSection, buildFaqSchema, FaqItemData
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The shared FAQ contract duplicates every answer
  into separate schema and UI fields, so all audited financing routes inherit
  both drift risk and redundant serialized answer payloads.
- Problem: `FaqItemData` still stores both `answerText` and `answerContent`,
  `buildFaqSchema` emits only `answerText`, and the client accordion renders
  only `answerContent`, so parity depends on manual synchronization.
- Why it matters: The shared FAQ contract duplicates every answer into separate
  schema and UI fields, so all audited financing routes inherit both drift risk
  and redundant serialized answer payloads.
- Fix direction: Define one canonical answer source and derive the schema-safe
  plain text or rendered rich content from that single representation.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-06a-faq.md`;
  first seen in `Step 6a` and revalidated in `Step 7`.

### FIN-a11y-018

- Severity: `S2-medium`
- Skill source: repo accessibility conventions
- Rule ID or rule area: `accessibility; internal linking semantics`
- Pattern tag: `related-links-missing-nav-list-target-sizing`
- Affected component(s): RelatedLinksStrip
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The shared related-links renderer defines the
  end-of-page internal-link treatment on every audited financing route.
- Problem: `RelatedLinksStrip` groups related links visually but renders them in
  a generic flex container with no navigation label, no list semantics, and
  text-sized tap targets.
- Why it matters: The shared related-links renderer defines the end-of-page
  internal-link treatment on every audited financing route.
- Fix direction: Render the strip as a labeled navigation/list structure and
  give each link touch-friendly sizing.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-06b-footnotes-links.md`;
  first seen in `Step 6b` and revalidated in `Step 7`.

### FIN-a11y-019

- Severity: `S2-medium`
- Skill source: repo accessibility conventions
- Rule ID or rule area: `accessibility; mobile tap-target quality`
- Pattern tag: `closing-cta-inline-phone-target-too-small`
- Affected component(s): EquipmentClosingCta
- Affected route(s): /rollback-financing (runtime-observed); any financing
  route that renders contactBlock
- Shared dependency impact: The shared closing-CTA component defines the
  fallback phone treatment everywhere a route opts into `contactBlock`.
- Problem: The fallback phone contact in `EquipmentClosingCta` stays a small
  inline text link with no padding or minimum target size, which makes the
  page-end contact action difficult to tap on mobile.
- Why it matters: The shared closing-CTA component defines the fallback phone
  treatment everywhere a route opts into `contactBlock`.
- Fix direction: Promote the phone fallback to a padded secondary CTA treatment
  or stacked contact row with minimum hit-area sizing.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-06c-closing-cta.md`;
  first seen in `Step 6c` and revalidated in `Step 7`.

### S3-low

### FIN-config-003

- Severity: `S3-low`
- Skill source: repo config-ownership conventions
- Rule ID or rule area: `config builder consistency`
- Pattern tag: `faq-builder-double-invocation`
- Affected component(s): buildFaqSection, rollbackFinancingPageConfig,
  wreckerFinancingPageConfig, rotatorFinancingPageConfig,
  usedTowTruckFinancingPageConfig
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: Every financing route rebuilds the FAQ payload more
  than once before the shell renders both FAQ UI and JSON-LD.
- Problem: The financing configs do not hold one authoritative FAQ payload per
  route: three routes call the shared builder twice, and the used-truck route
  assembles the section and schema separately.
- Why it matters: Every financing route rebuilds the FAQ payload more than once
  before the shell renders both FAQ UI and JSON-LD.
- Fix direction: Build the FAQ payload once per route and derive both
  `faqSection` and `faqSchema` from that single value, using a shared helper
  when ordering rules differ.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-02b-shell-config.md`;
  first seen in `Step 2b` and revalidated in `Step 7`.

### FIN-a11y-010

- Severity: `S3-low`
- Skill source: repo accessibility conventions
- Rule ID or rule area: `accessibility; semantic structure`
- Pattern tag: `trust-badge-group-without-list-semantics`
- Affected component(s): HeroLeadGen, TrustBadge
- Affected route(s): /rotator-financing
- Shared dependency impact: Any route that reuses `HeroLeadGen` inherits the
  same trust-badge markup and decorative icon behavior.
- Problem: The lead-gen hero renders its trust badges as generic `div`
  containers and leaves the fallback checkmark SVG undecorated, so assistive
  technology does not get list semantics and may announce redundant icon
  graphics.
- Why it matters: Any route that reuses `HeroLeadGen` inherits the same
  trust-badge markup and decorative icon behavior.
- Fix direction: Render the trust-badge cluster as a semantic list, update
  `TrustBadge` to output a list item, and mark the fallback check icon as
  decorative.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-03c-hero-lead-gen.md`;
  first seen in `Step 3c` and revalidated in `Step 7`.

### FIN-bundle-014

- Severity: `S3-low`
- Skill source: vercel-react-best-practices; next-best-practices;
  purchase-source-grid local contract
- Rule ID or rule area: `bundle-conditional; RSC boundaries`
- Pattern tag: `static-checklist-marked-client`
- Affected component(s): PurchaseSourceGrid
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: Every audited financing route hydrates the
  purchase-source checklist as client code even though the component only
  renders static markup and shared constant list data.
- Problem: `PurchaseSourceGrid` is still marked `"use client"` even though it
  has no state, effects, browser APIs, or interactive affordances and its
  checklist items are identical shared constants.
- Why it matters: Every audited financing route hydrates the purchase-source
  checklist as client code even though the component only renders static markup
  and shared constant list data.
- Fix direction: Remove the client directive and keep the checklist as a server
  component until it gains real browser-only behavior.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-05b-purchase-interactions.md`;
  first seen in `Step 5b` and revalidated in `Step 7`.

### FIN-image-015

- Severity: `S3-low`
- Skill source: next-best-practices; vercel-react-best-practices;
  content-image-split local contract
- Rule ID or rule area: `image optimization; rendering performance`
- Pattern tag: `constrained-image-slot-overstates-sizes`
- Affected component(s): ContentImageSplit
- Affected route(s): /rollback-financing, /wrecker-financing,
  /rotator-financing, /used-tow-truck-financing
- Shared dependency impact: The shared content-image split can fetch larger
  image candidates than its constrained slot actually needs on every audited
  financing route.
- Problem: `ContentImageSplit` uses a `fill` image inside a max-width
  `1fr / 0.8fr` grid, but the shared `sizes` hint still advertises `100vw` on
  mobile and `45vw` on desktop, which overstates the real rendered slot once
  container padding and the max-width cap apply.
- Why it matters: The shared content-image split can fetch larger image
  candidates than its constrained slot actually needs on every audited
  financing route.
- Fix direction: Replace the `sizes` hint with a breakpoint-aware value derived
  from the actual capped slot width instead of raw viewport width.
- Blocks / Blocked-By: None recorded in the canonical ledger.
- Evidence / repro notes: See `plans/reviews/financing-step-05c-content-image-split.md`;
  first seen in `Step 5c` and revalidated in `Step 7`.

## Cross-Cutting Patterns

### Shell ownership and drawer contracts

- `FIN-metadata-001`, `FIN-bundle-004`, and `FIN-cta-005` show that route
  ownership is still leaking into shared financing and root-shell layers.
- The same pattern makes route metadata harder to reason about, loads
  financing-only drawer client code on unrelated routes, and breaks same-page
  CTA expectations on `/used-tow-truck-financing`.
- This family maps primarily to `next-best-practices` route and RSC ownership
  rules plus repo route-ownership conventions.

### Hero-family architecture and runtime behavior

- `FIN-architecture-006`, `FIN-patterns-007`, `FIN-a11y-008`, and
  `FIN-image-009` all originate in shared hero-family contracts rather than
  isolated route content.
- The current family mixes explicit variants with sibling-owned types,
  duplicated wrapper structure, non-radio selector semantics, and
  under-prioritized hero media.
- This family maps primarily to `vercel-composition-patterns`, with performance
  and image follow-through from `vercel-react-best-practices` and
  `next-best-practices`.

### Shared serialization and rendering efficiency

- `FIN-config-003`, `FIN-hydration-011`, `FIN-bundle-013`, `FIN-bundle-014`,
  and `FIN-schema-016` show repeated duplication of data preparation, client
  boundaries, or responsive mounts.
- The common failure mode is paying more than once for the same content:
  duplicated FAQ builders, duplicated child island mounts, redundant answer
  representations, and time-sensitive client rendering that can drift at
  hydration.
- This family maps primarily to `vercel-react-best-practices`
  server-serialization, bundle, and hydration guidance, with supporting
  `next-best-practices` RSC and metadata rules.

### Route-surface accessibility and semantic clarity

- `FIN-a11y-010`, `FIN-a11y-012`, `FIN-a11y-017`, `FIN-a11y-018`, and
  `FIN-a11y-019` indicate that several shared financing sections still rely on
  visually correct but semantically weak markup.
- The issues span trust-badge semantics, hidden marquee content, unreadable
  disclosures, unlabeled related-link groupings, and undersized mobile CTA
  targets.
- This family maps primarily to repo accessibility conventions and local section
  contracts, with downstream conversion and crawlability impact across all four
  audited routes.

## Ordered Remediation Roadmap

### 1. Fix the shared accessibility floor first

- Address the route-wide readability and tap-target issues before layout or
  architecture refactors so every financing route clears the most visible
  user-impact defects.
- Includes `FIN-a11y-017`, `FIN-a11y-018`, `FIN-a11y-019`, `FIN-a11y-012`,
  `FIN-a11y-008`, and `FIN-a11y-010`.

### 2. Restore route and shell ownership boundaries

- Move route metadata back into route files, scope the drawer provider to
  financing layouts, and align drawer CTA eligibility with route ownership.
- Includes `FIN-metadata-001`, `FIN-bundle-004`, and `FIN-cta-005`.

### 3. Reduce shared contract drift in the hero family

- Localize framed-hero contracts, extract duplicated wrapper structure, and fix
  the hero media and interaction defects that are currently carried by shared
  variants.
- Includes `FIN-architecture-006`, `FIN-patterns-007`, `FIN-image-009`, and
  `FIN-a11y-008`.

### 4. Remove duplicate serialization and hydration work

- Collapse duplicate FAQ and purchase-and-terms payload ownership so the audited
  routes stop paying twice for the same responsive or schema data.
- Includes `FIN-config-003`, `FIN-bundle-013`, `FIN-bundle-014`,
  `FIN-schema-016`, and `FIN-hydration-011`.

### 5. Clean up secondary media and dormant-shell inefficiencies

- Tighten remaining image sizing and dormant shell contracts once the
  higher-risk accessibility, route-ownership, and serialization issues are in
  progress.
- Includes `FIN-architecture-002` and `FIN-image-015`.
