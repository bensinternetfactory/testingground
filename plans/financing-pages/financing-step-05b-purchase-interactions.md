# Step 5b: Audit Purchase-Source-Grid And Term-Length-Slider Client Islands

## Scope

- Executed target: `Step 5b` only
- Files reviewed:
  - `components/sections/page/purchase-source-grid/PurchaseSourceGrid.tsx`
  - `components/sections/page/purchase-source-grid/config.ts`
  - `components/sections/page/purchase-source-grid/index.ts`
  - `components/sections/page/purchase-source-grid/CLAUDE.md`
  - `components/sections/page/term-length-slider/TermLengthSlider.tsx`
  - `components/sections/page/term-length-slider/config.ts`
  - `components/sections/page/term-length-slider/index.ts`
  - `components/sections/page/term-length-slider/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/page/purchase-source-grid/CLAUDE.md`
  - local conventions from `components/sections/page/term-length-slider/CLAUDE.md`
- Routes validated:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Browser validation: required and completed on port `3005`

## Browser Evidence Notes

- Desktop validation ran on `/rollback-financing` at `1280x900`.
- Mobile validation ran on `/rollback-financing` at `390x844`.
- Desktop checks:
  - the purchase-and-terms section rendered as the expected two-column block with the checklist on the left and the year slider on the right
  - no visible overflow or collapsed spacing appeared around the shared checklist and slider section
- Mobile checks:
  - the same section stacked into a single-column flow without visible clipping
  - browser automation focused the `Select truck model year` range input and an `ArrowLeft` keypress decremented the value from `2027` to `2026`, confirming the slider accepts keyboard input in the narrow viewport path

## Findings

### FIN-bundle-014

- Status: `open`
- Severity: `S3-low`
- Source skill or convention: `vercel-react-best-practices`; `next-best-practices`; local boundary guidance from `components/sections/page/purchase-source-grid/CLAUDE.md`
- Rule ID or rule area: `bundle-conditional`; RSC boundaries
- Pattern tag: `static-checklist-marked-client`
- Affected components:
  - `PurchaseSourceGrid`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: every audited financing route currently hydrates the purchase-source checklist as a client island and serializes its heading, body, and icon props even though the component is static and the checklist items are shared constants.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: `PurchaseSourceGrid` is marked `"use client"` even though it only renders static `next/image` content plus a constant checklist with no state, effects, event handlers, or browser-only logic.
- Why this violates the cited rule: `next-best-practices` and `vercel-react-best-practices` both push narrow client boundaries and avoiding unnecessary serialized client payloads. The local `CLAUDE.md` explicitly says the grid items are identical on all pages and that the client boundary exists only for "future-proofing", which is not a runtime requirement. Keeping this component client-only adds avoidable JS and hydration work to all four financing routes for markup that can be rendered entirely on the server.
- Evidence:
  - [PurchaseSourceGrid.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-source-grid/PurchaseSourceGrid.tsx#L1) marks the component as a client island.
  - [PurchaseSourceGrid.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-source-grid/PurchaseSourceGrid.tsx#L7) through [PurchaseSourceGrid.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-source-grid/PurchaseSourceGrid.tsx#L40) render only static image, heading, body copy, and a mapped list from shared constants.
  - [config.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-source-grid/config.ts#L13) defines the checklist entries as a shared constant rather than route-specific interactive data.
  - [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-source-grid/CLAUDE.md#L30) says the grid items are identical on all pages, and [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-source-grid/CLAUDE.md#L42) says the client boundary exists only for future-proofing.
  - Desktop and mobile browser validation on `/rollback-financing` confirmed the rendered checklist is purely presentational content with no interactive affordance that would justify a client boundary.
- Fix direction: remove `"use client"` from `PurchaseSourceGrid.tsx` and keep the checklist as a server component until it gains real browser-only behavior.
- First-seen substep: `Step 5b`
- Latest-reviewed substep: `Step 5b`
- Evidence pointer: `plans/reviews/financing-step-05b-purchase-interactions.md`

## Required Lenses

### Accessibility

- No findings. `TermLengthSlider` exposes an explicit `aria-label` plus `aria-valuetext`, and mobile browser validation confirmed the range control accepts keyboard adjustment in the audited route.

### Responsive Behavior

- No findings. Desktop validation at `1280x900` and mobile validation at `390x844` both showed the purchase-and-terms section staying in flow without visible overflow around the checklist or slider.

### Core Web Vitals Risk

- `FIN-bundle-014` is the main risk in this step: the static checklist ships avoidable client JS and hydration work on every audited financing route.

### Repo Convention Compliance

- `FIN-bundle-014` also covers the convention issue here. The local component contract documents a future-proofing-only client boundary, which conflicts with the repo's preference for explicit, minimal server/client ownership.

## No-Findings Summary

- Interactive control accessibility: no issue found. The slider exposes a stable range input contract with descriptive value text instead of a custom div-based control.
- Rerender and state patterns: no issue found. `TermLengthSlider` keeps a single local `selectedYear` state value and derives the visible term inline without effect churn or extra synchronized state.
- Touch behavior and responsive ergonomics: no issue found. The mobile runtime check preserved a usable stacked layout and accepted keyboard-driven slider changes in the narrow viewport path.
