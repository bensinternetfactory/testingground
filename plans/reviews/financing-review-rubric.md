# Financing Review Rubric

## Purpose

This rubric is the stable review standard for the financing audit. Every substep
must apply:

- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `next-best-practices`
- repo-local conventions from `AGENTS.md` and the relevant local `CLAUDE.md`
  files named by the harness

Static code review is required for every substep. Browser validation is required
only when the harness marks it as required.

## Valid Execution Sequence

The only valid execution order is:

`Step 1 -> Step 2a -> Step 2b -> Step 2c -> Step 3a -> Step 3b -> Step 3c -> Step 4a -> Step 4b -> Step 4c -> Step 5a -> Step 5b -> Step 5c -> Step 5d -> Step 6a -> Step 6b -> Step 6c -> Step 7 -> Step 8`

No pass may skip ahead, merge multiple steps, or backfill later outputs early.

## Severity Levels

| Severity | Meaning | Typical use |
| --- | --- | --- |
| `S0-blocker` | Prevents valid release, breaks core route behavior, or invalidates the audit step | Broken route composition, impossible interaction path, invalid workflow state |
| `S1-high` | Strong user, SEO, accessibility, or architectural risk with clear production impact | Broken metadata ownership, invalid server/client boundary, inaccessible core control |
| `S2-medium` | Meaningful maintainability or performance risk that should be fixed soon | Variant drift, duplicated contracts, avoidable client bundle or rerender cost |
| `S3-low` | Local polish or consistency issue with limited blast radius | Minor convention drift, weak naming, small semantic mismatch |
| `S4-note` | No-fix-required observation or explicit pass note | Intentional deviation documented as acceptable |

## Finding Template

Every finding must be recorded in the step report and normalized into the ledger
with the following fields:

- `Finding ID`
- `Status`
- `Severity`
- `Source skill or convention`
- `Rule ID or rule area`
- `Pattern tag`
- `Affected components`
- `Affected routes`
- `Shared dependency impact`
- `Local or systemic`
- `Boundary-only: yes/no`
- `Summary`
- `Why this violates the cited rule`
- `Evidence`
- `Fix direction`
- `First-seen substep`
- `Latest-reviewed substep`
- `Evidence pointer`

## Evidence Expectations

Every finding must include:

- exact file references, with line numbers where they are stable and available
- affected route list
- whether the issue is local or systemic
- why the issue belongs to the cited skill or convention source
- a concrete fix direction

Every step report must include:

- files reviewed
- conventions reviewed
- routes validated
- the required lenses:
  - accessibility
  - responsive behavior
  - Core Web Vitals risk
  - repo convention compliance
- explicit `No findings` sections for checked areas that passed
- browser evidence notes when browser validation is required

## Rule-Family Mapping

### `vercel-composition-patterns`

Use for:

- variant design and boolean-prop sprawl
- compound component and context architecture
- state ownership and provider boundaries
- children-vs-render-props API clarity
- explicit variant wrapper design

Typical rule families:

- `architecture-*`
- `state-*`
- `patterns-*`
- `react19-*`

### `vercel-react-best-practices`

Use for:

- bundle size control
- client/server serialization boundaries
- rerender churn and effect placement
- event-listener strategy
- hydration, rendering, animation, and interaction performance

Typical rule families:

- `async-*`
- `bundle-*`
- `server-*`
- `client-*`
- `rerender-*`
- `rendering-*`
- `js-*`
- `advanced-*`

### `next-best-practices`

Use for:

- App Router file conventions
- metadata ownership and route contracts
- React Server Component boundaries
- script handling
- hydration-risk patterns
- image and bundling guidance

Typical rule areas:

- file conventions
- metadata
- RSC boundaries
- scripts
- image optimization
- directives
- hydration errors
- bundling

### Repo Conventions

Use for:

- route ownership staying in route files
- component/config ownership staying in local modules
- TypeScript strictness and naming conventions
- local `CLAUDE.md` usage for reusable component directories
- validation requirements from `AGENTS.md`

## Repo Convention Checklist

Check each audited file for:

- ownership lives in the correct layer: route, shell, section, or config
- imports use `@/*` when root-based imports are appropriate
- internal navigation uses `next/link`
- reusable component directories preserve local `CLAUDE.md`
- file naming follows route and component conventions
- server/client boundaries match actual interactivity needs
- no review output claims browser behavior without required runtime evidence

## Systemic vs Local Classification

Mark a finding as `systemic` when one of these is true:

- the same pattern appears in more than one audited route or component family
- a shared dependency can reproduce the issue across multiple financing pages
- the bug comes from a shell, config contract, or reusable primitive
- the fix direction necessarily changes a shared API or shared behavior

Otherwise mark it `local`.

## Boundary-Only Classification

Mark a finding as `boundary-only` when:

- the issue is in nav, drawer, footer, layout, or other dependency reviewed only
  for financing-page impact
- the dependency is not in deep refactor scope for the current step
- the finding explains financing-route risk without opening a full deep audit of
  that dependency

If the boundary dependency becomes the primary root cause of a financing-route
issue, escalate it in the report but keep the label explicit.

## Browser Validation Rules By Substep Type

Browser validation is required when the substep makes claims about:

- keyboard behavior
- pointer or touch behavior
- focus behavior
- responsive layout
- hydration or flicker
- CLS, INP, or LCP risk visible in the browser

When required, minimum evidence is:

- local server on port `3005`
- one mobile viewport
- one desktop viewport
- one affected financing route
- one interaction relevant to the audited area
- report notes describing what was observed

Browser validation may be omitted only for route/config/schema/type reviews, and
the step report must say why.

## Step 1 Notes

- Accessibility: no user-facing UI was changed in Step 1; the rubric now makes
  this lens mandatory in every later report.
- Responsive behavior: not applicable for Step 1 beyond defining the reporting
  requirement.
- Core Web Vitals risk: no runtime code changed in Step 1.
- Repo convention compliance: this rubric follows the harness-defined file names
  and review workflow.
