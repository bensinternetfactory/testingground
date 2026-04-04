# Financing Step 7: Revalidation And Ledger Reconciliation

## Scope

- Executed substep: `Step 7` only
- Files reviewed:
  - `plans/reviews/financing-review-rubric.md`
  - `plans/reviews/financing-findings-ledger.md`
  - `plans/reviews/financing-step-02a-route-entries.md`
  - `plans/reviews/financing-step-02b-shell-config.md`
  - `plans/reviews/financing-step-02c-schema-drawer.md`
  - `plans/reviews/financing-step-03a-hero-wrappers.md`
  - `plans/reviews/financing-step-03b-hero-interactions.md`
  - `plans/reviews/financing-step-03c-hero-lead-gen.md`
  - `plans/reviews/financing-step-04a-strip-offers.md`
  - `plans/reviews/financing-step-04b-brand-marquee.md`
  - `plans/reviews/financing-step-04c-dormant-mid-sections.md`
  - `plans/reviews/financing-step-05a-purchase-wrapper.md`
  - `plans/reviews/financing-step-05b-purchase-interactions.md`
  - `plans/reviews/financing-step-05c-content-image-split.md`
  - `plans/reviews/financing-step-06a-faq.md`
  - `plans/reviews/financing-step-06b-footnotes-links.md`
  - `plans/reviews/financing-step-06c-closing-cta.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo conventions from `AGENTS.md`
  - step-specific local `CLAUDE.md` expectations already captured in the underlying step reports
- Browser validation: not required for Step 7 because this pass reconciles existing evidence rather than making new runtime claims

## Status Summary

- Total ledger findings reconciled: `19`
- Status result after reconciliation:
  - `open`: `19`
  - `accepted`: `0`
  - `duplicate`: `0`
  - `deferred`: `0`
  - `resolved-in-analysis`: `0`
  - `blocked`: `0`
- Severity distribution locked for Step 8 consolidation:
  - `S1-high`: `1`
  - `S2-medium`: `14`
  - `S3-low`: `4`

## Revalidation Decisions

### Revalidation Cluster A

- Severity: `S2-medium`
- Skill source: `next-best-practices`, `vercel-composition-patterns`, `vercel-react-best-practices`, repo route and CTA ownership conventions
- Rule ID or rule area: `metadata`, `patterns-explicit-variants`, `bundle-conditional`, drawer CTA contract
- Pattern tag: `financing-shell-ownership-and-drawer-contracts`
- Affected component(s): `EquipmentFinancingPageConfig`, `EquipmentFinancingPageShell`, `RootLayout`, `DrawerProvider`, `NavClient`, dormant section helpers
- Affected route(s): `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Shared dependency impact: the shared financing shell and root drawer platform still own route-level concerns and optional branches that should live in narrower route or segment boundaries
- Problem:
  - `FIN-metadata-001`, `FIN-architecture-002`, `FIN-bundle-004`, and `FIN-cta-005` were rechecked together because they all touch financing-shell ownership and shared drawer behavior
  - they are not duplicates
  - `FIN-metadata-001` is a route-contract ownership issue
  - `FIN-architecture-002` is dormant section sprawl in the base shell contract
  - `FIN-bundle-004` is root-level client-boundary overreach
  - `FIN-cta-005` is a route-registry mismatch inside the shared nav CTA helper
- Why it matters: these findings compound in the same platform layer, so they increase the odds of future route drift, but each still requires a separate fix and should stay as an independent ledger row for final prioritization
- Fix direction:
  - keep `FIN-metadata-001`, `FIN-architecture-002`, `FIN-bundle-004`, and `FIN-cta-005` as distinct open findings
  - treat `FIN-bundle-004` as the foundational drawer-scope fix
  - treat `FIN-cta-005` as a follow-on route-registry correction that still remains necessary even if the drawer provider moves into a financing-only layout
- Blocks / Blocked-By:
  - `FIN-cta-005` is not blocked by `FIN-bundle-004`; moving provider scope does not fix the used-truck route allowlist drift
  - `FIN-metadata-001` and `FIN-architecture-002` are independent of the drawer fixes
- Evidence / repro notes: Step 2a established the route metadata ownership problem, Step 2b reconfirmed it at the type-contract layer, Step 2c established the root drawer scope and used-truck CTA drift, and Step 4c reconfirmed the dormant shell-contract issue without expanding it into a duplicate finding

### Revalidation Cluster B

- Severity: `S2-medium`
- Skill source: `vercel-composition-patterns`, `vercel-react-best-practices`, `next-best-practices`, repo accessibility conventions
- Rule ID or rule area: `patterns-explicit-variants`, `architecture-compound-components`, accessibility keyboard behavior, image optimization
- Pattern tag: `hero-family-contract-and-runtime-split`
- Affected component(s): `HeroConvertFramed*`, `FramedTileSelector`, `FramedSelectionTile`, `HeroGallery`, `HeroLeadGen`, `TrustBadge`
- Affected route(s): `/rollback-financing`, `/wrecker-financing`, `/used-tow-truck-financing`, `/rotator-financing`
- Shared dependency impact: the shared hero families still combine composition drift, selector accessibility debt, and hero-media optimization risk across multiple financing routes
- Problem:
  - `FIN-architecture-006` and `FIN-patterns-007` are adjacent but not duplicates
  - `FIN-architecture-006` is about contract ownership leaking across hero families
  - `FIN-patterns-007` is about duplicated wrapper structure inside the framed family itself
  - `FIN-a11y-008` and `FIN-image-009` stay separate runtime findings because they affect different user outcomes: selection semantics versus hero LCP behavior
  - `FIN-a11y-010` remains a local low-severity lead-gen finding and does not merge into the framed-hero cluster
- Why it matters: the hero family has one architecture cleanup track and two user-facing runtime tracks, so collapsing them would hide meaningful sequencing and user impact differences
- Fix direction:
  - keep `FIN-architecture-006`, `FIN-patterns-007`, `FIN-a11y-008`, `FIN-image-009`, and `FIN-a11y-010` as distinct open findings
  - treat `FIN-architecture-006` plus `FIN-patterns-007` as the maintainability foundation for the framed family
  - treat `FIN-a11y-008` and `FIN-image-009` as user-facing fixes that can proceed independently of the wrapper refactor if needed
- Blocks / Blocked-By:
  - `FIN-a11y-008` is not blocked by either framed-wrapper architecture finding
  - `FIN-image-009` is not blocked by the contract refactor; prioritizing the first visible gallery image can be fixed independently
  - `FIN-a11y-010` remains separate and local to the lead-gen hero
- Evidence / repro notes: Step 3a established the framed-wrapper contract and shell duplication issues, Step 3b runtime validation confirmed the selector keyboard gap plus lazy-loaded hero gallery asset, and Step 3c confirmed the lead-gen trust-badge semantics issue without revealing any duplicate root cause

### Revalidation Cluster C

- Severity: `S2-medium`
- Skill source: `vercel-react-best-practices`, `next-best-practices`, repo config conventions
- Rule ID or rule area: config builder consistency, hydration errors, `bundle-conditional`, `RSC boundaries`, image optimization, metadata serialization
- Pattern tag: `shared-serialization-and-rendering-efficiency`
- Affected component(s): financing route configs, `CountdownChip`, `PurchaseAndTermsSection`, `PurchaseSourceGrid`, `ContentImageSplit`, `FAQ`, `FaqSection`
- Affected route(s): `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Shared dependency impact: several shared financing sections still duplicate derived data, hydrate avoidable client work, or overstate rendered payload needs across the audited routes
- Problem:
  - `FIN-config-003` and `FIN-schema-016` both concern FAQ duplication, but they do not share the same root cause
  - `FIN-config-003` is route-config assembly duplication before render
  - `FIN-schema-016` is the underlying shared FAQ content model splitting schema and UI answers
  - `FIN-bundle-013` and `FIN-bundle-014` are related but not duplicates
  - `FIN-bundle-013` is wrapper-level duplicate client mounts
  - `FIN-bundle-014` is one child checklist staying client-only even when rendered only once
  - `FIN-hydration-011` and `FIN-image-015` remain standalone rendering-performance findings with separate fixes
- Why it matters: this cluster contains both foundational shared-model issues and narrower follow-on cleanup. Merging them would blur remediation order and understate the fact that some fixes reduce but do not eliminate the others
- Fix direction:
  - keep `FIN-config-003`, `FIN-hydration-011`, `FIN-bundle-013`, `FIN-bundle-014`, `FIN-image-015`, and `FIN-schema-016` as distinct open findings
  - treat `FIN-schema-016` as the foundational FAQ-content-model fix
  - treat `FIN-config-003` as the route-config assembly cleanup that still remains even after the FAQ model is normalized
  - treat `FIN-bundle-013` as the wrapper-level purchase-section fix
  - treat `FIN-bundle-014` as a smaller child-island cleanup that survives even if the wrapper mount duplication is removed
- Blocks / Blocked-By:
  - `FIN-config-003` is not blocked by `FIN-schema-016`, but the two should be remediated in the same FAQ workstream
  - `FIN-bundle-014` is not blocked by `FIN-bundle-013`; either can ship first, although resolving `FIN-bundle-013` reduces the total cost of leaving `FIN-bundle-014` in place
  - `FIN-hydration-011` and `FIN-image-015` remain independent
- Evidence / repro notes: Step 2b established duplicate FAQ builder usage, Step 4a confirmed the countdown’s client date/hydration drift, Step 5a and Step 5b split the purchase wrapper and child-island findings cleanly, Step 5c isolated the image `sizes` overstatement, and Step 6a confirmed the deeper FAQ answer dual-source problem

### Revalidation Cluster D

- Severity: `S1-high`
- Skill source: repo accessibility conventions
- Rule ID or rule area: accessibility, semantic content, internal linking semantics, mobile tap-target quality
- Pattern tag: `shared-route-surface-accessibility`
- Affected component(s): `BrandMarquee`, `FinancingFootnotes`, `RelatedLinksStrip`, `EquipmentClosingCta`
- Affected route(s): `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Shared dependency impact: the end-of-page and supporting-content surfaces across the financing routes still underexpose or weaken meaningful content and actions for assistive-technology and mobile users
- Problem:
  - `FIN-a11y-012`, `FIN-a11y-017`, `FIN-a11y-018`, and `FIN-a11y-019` are all accessibility findings on shared financing surfaces
  - none are duplicates
  - `FIN-a11y-017` remains the only `S1-high` issue because it affects required financing disclosure readability across all audited routes and is backed by direct contrast evidence
  - `FIN-a11y-018` and `FIN-a11y-019` both affect mobile friendliness at the page end, but one is link-group semantics plus target sizing and the other is the phone fallback inside the closing CTA
  - `FIN-a11y-012` remains distinct because it removes meaningful manufacturer content from the accessibility tree
- Why it matters: these issues share an accessibility remediation bucket, but they affect different content surfaces and user tasks, so they need to stay independent for ordered remediation and severity reporting
- Fix direction:
  - keep `FIN-a11y-012`, `FIN-a11y-017`, `FIN-a11y-018`, and `FIN-a11y-019` as distinct open findings
  - preserve `FIN-a11y-017` as the lone `S1-high` finding for final consolidation
  - group the other three under a shared accessibility workstream in Step 8 without deduplicating them
- Blocks / Blocked-By:
  - none of these findings block each other
  - `FIN-a11y-017` should be prioritized ahead of the lower-severity page-end accessibility fixes because it affects mandatory disclosure content on every audited financing route
- Evidence / repro notes: Step 4b established the hidden brand-list issue, Step 6b established the footnote contrast failure and related-links semantics/tap-target issue, and Step 6c runtime validation confirmed the mobile-only phone-target weakness in the closing CTA fallback

## Ledger Reconciliation Outcome

- No exact duplicate findings were discovered during Step 7.
- No finding was downgraded to `resolved-in-analysis`, `accepted`, `deferred`, or `blocked`.
- The canonical ledger should carry all nineteen findings forward as `open`.
- `Latest-reviewed substep` should be `Step 7` for all current findings to mark the reconciliation pass as the last canonical review point before final consolidation.
