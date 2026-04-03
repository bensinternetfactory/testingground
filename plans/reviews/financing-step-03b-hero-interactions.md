# Step 3b: Framed Hero Interactive Islands And Shared CTA Primitive

## Scope

- Executed target: `Step 3b` only
- Files reviewed:
  - `components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`
  - `components/sections/heroes/hero-convert-framed/FramedSelectionTile.tsx`
  - `components/sections/heroes/hero-convert-framed/HeroGallery.tsx`
  - `components/ui/ripple-cta-link/RippleCtaLink.tsx`
  - `components/ui/ripple-cta-link/index.ts`
  - `components/sections/heroes/hero-convert-framed/CLAUDE.md`
  - `components/ui/ripple-cta-link/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/heroes/hero-convert-framed/CLAUDE.md`
  - local conventions from `components/ui/ripple-cta-link/CLAUDE.md`
- Routes validated:
  - `/wrecker-financing`
  - `/used-tow-truck-financing`
- Browser validation: required and completed on port `3005`

## Browser Evidence Notes

- Desktop validation ran at `1280x800` on `/wrecker-financing`.
- Mobile validation ran with `agent-browser set device "iPhone 14"` on `/wrecker-financing`.
- Desktop interaction checks:
  - selecting `Light-Duty Wrecker` changed the hero CTA from a disabled button to a live `Get Pre-Approved` link
  - focusing the first tile and pressing `ArrowRight` left focus and selection unchanged, which matches the current button-based implementation rather than radio-group keyboard behavior
  - clicking `Next image` changed the displayed gallery image alt from `Red wrecker tow truck` to `Blue and green wrecker tow truck`
  - DOM inspection showed the active desktop hero gallery image rendering with `loading="lazy"`
- Mobile interaction checks:
  - the two hero tiles rendered in a single column with the same `left` position and different `top` positions
  - selecting a tile enabled the CTA
  - clicking `Get Pre-Approved` opened the same-page pre-approval drawer with the heading `Estimate how much financing you need.` while staying on `/wrecker-financing`

## Findings

### FIN-a11y-008

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: repo accessibility conventions; `hero-convert-framed` local contract
- Rule ID or rule area: accessibility; keyboard behavior
- Pattern tag: `single-select-buttons-without-radiogroup`
- Affected components:
  - `FramedTileSelector`
  - `FramedSelectionTile`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: every framed-hero route that uses the shared selector inherits the same single-select keyboard model.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: the equipment selector is implemented as a set of independently tabbable press buttons with `aria-pressed`, even though the UI is a single-choice picker that should expose radio-group semantics and arrow-key navigation.
- Why this violates the cited rule: the shared hero CTA path begins with one required equipment choice, so the selector should expose the semantics and keyboard behavior of a single-select control. The current implementation gives screen-reader users toggle-button semantics instead of choice-in-a-set semantics and does not support directional key movement between options.
- Evidence:
  - [FramedTileSelector.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx#L47) renders a generic `role="group"` wrapper instead of a `radiogroup`.
  - [FramedSelectionTile.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/FramedSelectionTile.tsx#L29) renders each option as a plain `<button>` with `aria-pressed={selected}` rather than a radio control.
  - Browser validation on `/wrecker-financing` at desktop width showed that focusing the first tile and pressing `ArrowRight` left focus on `Light-Duty Wrecker` and left both tiles at `pressed: "false"`.
- Fix direction: convert the selector to a true single-select pattern, such as a `radiogroup` with radio semantics and roving arrow-key support, while preserving the current visual button treatment.
- First-seen substep: `Step 3b`
- Latest-reviewed substep: `Step 3b`
- Evidence pointer: `plans/reviews/financing-step-03b-hero-interactions.md`

### FIN-image-009

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: `next-best-practices`; `vercel-react-best-practices`
- Rule ID or rule area: image optimization; rendering performance
- Pattern tag: `hero-gallery-lazy-lcp`
- Affected components:
  - `HeroGallery`
- Affected routes:
  - `/wrecker-financing`
- Shared dependency impact: any financing route that opts into `HeroGallery` inherits the same hero-image loading behavior.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: the above-the-fold desktop gallery image is rendered without `priority`, so Next.js keeps it on the default lazy-loading path even though it is hero media.
- Why this violates the cited rule: Next.js image guidance reserves eager loading for likely LCP media. Here the gallery sits in the hero region on desktop, and runtime inspection showed the current image still rendering with `loading="lazy"`, which can slow the route’s primary visual paint.
- Evidence:
  - [HeroGallery.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroGallery.tsx#L28) renders the active hero image with `next/image` but does not set `priority`.
  - Desktop browser validation on `/wrecker-financing` at `1280x800` showed the active hero image alt `Red wrecker tow truck` with `loading="lazy"`.
  - After clicking `Next image`, the new active image alt changed to `Blue and green wrecker tow truck`, and the DOM still reported `loading="lazy"` for the gallery image.
- Fix direction: mark the initially visible gallery image as prioritized on routes where the gallery occupies the hero media slot, or preload the first gallery image from the server wrapper so desktop hero routes do not lazy-load their likely LCP asset.
- First-seen substep: `Step 3b`
- Latest-reviewed substep: `Step 3b`
- Evidence pointer: `plans/reviews/financing-step-03b-hero-interactions.md`

## Required Lenses

### Accessibility

- `FIN-a11y-008` covers the main accessibility issue in this step: the selector behaves like a single-choice control but does not expose single-choice semantics or directional keyboard behavior.

### Responsive Behavior

- No findings. Mobile validation on `iPhone 14` showed the hero tiles stacking into one column as documented in the local `CLAUDE.md`, and the same-page CTA flow still opened the pre-approval drawer after selection.

### Core Web Vitals Risk

- `FIN-image-009` covers the main CWV risk in this step: the desktop hero gallery image remains lazy-loaded even when it is the likely LCP media.

### Repo Convention Compliance

- No findings. The reviewed interactive files keep the server/client split documented in the local `CLAUDE.md` files, and the shared CTA primitive stays isolated behind a small barrel export in [index.ts](/Users/benfranzoso/Documents/Projects/copy/components/ui/ripple-cta-link/index.ts#L1).

## No-Findings Summary

- Shared CTA primitive correctness: no issue found in the validated hero flow. On mobile `/wrecker-financing`, selecting a tile enabled the `RippleCtaLink` CTA and clicking it opened the same-page pre-approval drawer without a route change.
- Gallery interaction correctness: no issue found with basic pointer interaction. On desktop `/wrecker-financing`, the previous/next buttons updated the active gallery image as expected.
- Touch behavior: no issue found in the validated path. The mobile selector and CTA remained operable with tap interactions.
