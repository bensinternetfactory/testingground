# Step 5c: Audit Content-Image-Split

## Scope

- Executed target: `Step 5c` only
- Files reviewed:
  - `components/sections/page/content-image-split/ContentImageSplit.tsx`
  - `components/sections/page/content-image-split/config.ts`
  - `components/sections/page/content-image-split/index.ts`
  - `components/sections/page/content-image-split/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/page/content-image-split/CLAUDE.md`
- Routes validated:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Browser validation: not required for this step because Step 5c is limited to static semantic structure, `next/image` sizing hints, and server-component boundary review

## Findings

### FIN-image-015

- Status: `open`
- Severity: `S3-low`
- Source skill or convention: `next-best-practices`; `vercel-react-best-practices`; local layout guidance from `components/sections/page/content-image-split/CLAUDE.md`
- Rule ID or rule area: image optimization; rendering performance
- Pattern tag: `constrained-image-slot-overstates-sizes`
- Affected components:
  - `ContentImageSplit`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: every audited financing route that renders this shared section can fetch a larger image candidate than the actual slot needs, especially on wide desktop viewports, because the `sizes` hint is based on viewport width instead of the capped container width and narrower image column.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: `ContentImageSplit` renders a `fill` image inside a `max-w-7xl` grid with an image column smaller than half the container, but its `sizes` hint advertises `100vw` on mobile and `45vw` on desktop, which materially overstates the real rendered slot once container padding and the max-width cap apply.
- Why this violates the cited rule: `next-best-practices` expects `next/image` `sizes` values to match the real layout so Next can choose an appropriately sized candidate, and `vercel-react-best-practices` flags avoidable bytes as a rendering-performance risk. The local `CLAUDE.md` describes a constrained two-column layout, but the current hint does not reflect that constraint. On large screens, `45vw` can be hundreds of pixels wider than the actual image column, so this shared mid-page section can overfetch image bytes on all four audited financing routes.
- Evidence:
  - [ContentImageSplit.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/content-image-split/ContentImageSplit.tsx#L13) and [ContentImageSplit.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/content-image-split/ContentImageSplit.tsx#L14) cap the section inside `max-w-7xl` and a `1fr / 0.8fr` desktop grid, so the image slot is narrower than `45vw` once the container max width is reached.
  - [ContentImageSplit.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/content-image-split/ContentImageSplit.tsx#L29) through [ContentImageSplit.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/content-image-split/ContentImageSplit.tsx#L35) place the image in a `fill` container but still advertise `sizes="(max-width: 768px) 100vw, 45vw"`.
  - [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/content-image-split/CLAUDE.md#L29) through [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/content-image-split/CLAUDE.md#L34) document the intended stacked mobile layout and approximately `55/45` desktop split.
  - [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L11) through [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L16) lock the audited route list, and [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L73) through [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L75) place this section folder in rendered financing-route scope.
- Fix direction: replace the current `sizes` hint with one that matches the actual capped slot width, such as a breakpoint-aware string that accounts for the `max-w-7xl` container, the smaller image column, and the mobile horizontal padding.
- First-seen substep: `Step 5c`
- Latest-reviewed substep: `Step 5c`
- Evidence pointer: `plans/reviews/financing-step-05c-content-image-split.md`

## Required Lenses

### Accessibility

- No findings. The component exposes its eyebrow, heading, body copy, and required image alt text in a straightforward semantic order without introducing custom interactive affordances.

### Responsive Behavior

- No findings. The section keeps one server-rendered stack-to-grid composition path; the only responsive risk identified in this pass is the image-byte overfetch captured by `FIN-image-015`, not duplicated markup or breakpoint-specific branch drift.

### Core Web Vitals Risk

- `FIN-image-015` is the main risk in this step: the shared section can overfetch image bytes on every audited financing route because its `sizes` hint is wider than the actual constrained image slot.

### Repo Convention Compliance

- No findings. The section keeps config ownership local to the folder, stays server-only, and exposes a narrow barrel surface that matches the repo's reusable-section conventions.

## No-Findings Summary

- Semantic content exposure: no issue found. The section keeps persuasive copy in plain text elements instead of burying it in non-semantic wrappers.
- Server-component suitability: no issue found. `ContentImageSplit` has no hooks, effects, or browser APIs, so keeping it as a server component matches the local contract and Next RSC guidance.
- Config contract clarity: no issue found. `ContentImageSplitConfig` only exposes the fields the section actually consumes, and the index file re-exports that surface without extra coupling.
