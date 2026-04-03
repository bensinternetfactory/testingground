# Step 4a: Tertiary Strip And Financing Offers Split

## Scope

- Executed target: `Step 4a` only
- Files reviewed:
  - `components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx`
  - `components/sections/page/tertiary-strip/config.ts`
  - `components/sections/page/tertiary-strip/index.ts`
  - `components/sections/page/tertiary-strip/CLAUDE.md`
  - `components/sections/page/financing-offers-split/FinancingOffersSplit.tsx`
  - `components/sections/page/financing-offers-split/CountdownChip.tsx`
  - `components/sections/page/financing-offers-split/config.ts`
  - `components/sections/page/financing-offers-split/index.ts`
  - `components/sections/page/financing-offers-split/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/page/tertiary-strip/CLAUDE.md`
  - local conventions from `components/sections/page/financing-offers-split/CLAUDE.md`
- Routes validated:
  - `/rollback-financing`
- Browser validation: required and completed on port `3005`

## Browser Evidence Notes

- Desktop validation ran at `1440x1200` on `/rollback-financing`.
- Mobile validation ran with `agent-browser set device "iPhone 14"` on `/rollback-financing`.
- Desktop interaction checks:
  - the tertiary strip rendered as two outline CTA cards between the hero and the financing offers section
  - waiting for the text `Offer expires in` confirmed that the countdown chip rendered in the right-hand offer half
  - clicking `Already have a truck in mind? I found a truck and need financing` opened the same-page pre-approval drawer with the heading `How much is the rollback you found?` while staying on `/rollback-financing`
- Mobile interaction checks:
  - the tertiary strip cards collapsed into a one-column stack
  - the financing offers section rendered as two stacked offer halves with the same `Zero Down Rollback Financing` and `No Payments for Up to 180 Days` headings in mobile order

## Findings

### FIN-hydration-011

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: `next-best-practices`; `vercel-react-best-practices`
- Rule ID or rule area: hydration errors; client boundary
- Pattern tag: `countdown-client-date-hydration-drift`
- Affected components:
  - `CountdownChip`
  - `FinancingOffersSplit`
  - `ROLLBACK_FINANCING_OFFERS_SPLIT_CONFIG`
- Affected routes:
  - `/rollback-financing`
- Shared dependency impact: the shared countdown primitive can ship stale or mismatched time-sensitive offer copy anywhere another financing offer half opts into `countdown`.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: `CountdownChip` is a client component that derives its rendered label from `new Date()` during render, so the offer-expiry text can drift between prerender time, hydration time, and user timezone while never resyncing after mount.
- Why this violates the cited rule: Next.js hydration guidance explicitly calls out date and time rendering as mismatch-prone, and the reviewed client boundary is not handling an actual interactive state change. Here the chip renders time-sensitive copy from `new Date()` inside a `"use client"` component, which makes the initial HTML vulnerable to stale prerender output and timezone-based server/client day mismatches. The implementation also mixes a UTC-normalized anchor date with local-calendar `now` values, which increases off-by-one risk around day boundaries.
- Evidence:
  - [CountdownChip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/financing-offers-split/CountdownChip.tsx#L1) makes the chip a client component even though it only derives display text from config.
  - [CountdownChip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/financing-offers-split/CountdownChip.tsx#L11) and [CountdownChip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/financing-offers-split/CountdownChip.tsx#L19) compute the countdown from render-time dates, mixing a UTC-normalized anchor with local-calendar `now` parts.
  - [CountdownChip.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/financing-offers-split/CountdownChip.tsx#L37) memoizes the computed day count from static props, so the chip never refreshes after mount.
  - [config.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/financing-offers-split/config.ts#L52) enables the countdown on the rollback financing offers split.
  - Desktop browser validation on `/rollback-financing` confirmed the chip is route-visible through the rendered `Offer expires in` text.
- Fix direction: compute the remaining-day label on the server from a single UTC-normalized date source and pass the result as plain serialized data, or render the chip only after mount with explicit hydration handling if it truly must stay client-only.
- First-seen substep: `Step 4a`
- Latest-reviewed substep: `Step 4a`
- Evidence pointer: `plans/reviews/financing-step-04a-strip-offers.md`

## Required Lenses

### Accessibility

- No findings. Desktop and mobile snapshots exposed the tertiary strip cards and the offer split `learn more` action as links, and the desktop tertiary-strip CTA opened the same-page drawer without a broken interaction path.

### Responsive Behavior

- No findings. Browser validation showed the tertiary strip rendering as two cards on desktop and a one-column stack on mobile, while the financing offers split changed from a side-by-side layout to two vertically stacked offer halves.

### Core Web Vitals Risk

- `FIN-hydration-011` covers the main runtime risk in this step: the visible countdown copy is derived from render-time date math inside a client component, which can ship stale prerendered HTML and force visible correction after hydration.

### Repo Convention Compliance

- No findings. The tertiary strip remains server-only as documented in its local `CLAUDE.md`, the offers split keeps its public API local to the section directory, and both reusable section directories preserve the required local `CLAUDE.md` files.

## No-Findings Summary

- CTA usage patterns: no issue found. `TertiaryActionsStrip` delegates CTA behavior to `RippleCtaLink`, and desktop validation on `/rollback-financing` confirmed the first strip card still opens the same-page pre-approval drawer.
- Split-section semantics and layout: no issue found. `FinancingOffersSplit` keeps a narrow explicit `left`/`right` contract, uses `next/image` and `next/link`, and rendered with the expected desktop split and mobile stack in runtime checks.
- Motion, observer, and effect behavior outside the countdown chip: no issue found. The Step 4a files do not introduce scroll observers, animation hooks, or recurring client effects beyond the countdown helper.
