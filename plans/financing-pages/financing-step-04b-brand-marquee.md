# Step 4b: Audit Brand Marquee

## Scope

- Executed target: `Step 4b` only
- Files reviewed:
  - `components/sections/page/brand-marquee/BrandMarquee.tsx`
  - `components/sections/page/brand-marquee/brand-marquee.css`
  - `components/sections/page/brand-marquee/config.ts`
  - `components/sections/page/brand-marquee/index.ts`
  - `components/sections/page/brand-marquee/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/page/brand-marquee/CLAUDE.md`
- Routes validated:
  - `/rollback-financing`
- Browser validation: required and completed on port `3005`

## Browser Evidence Notes

- Desktop validation ran on `/rollback-financing` in the default `agent-browser` desktop viewport and included a full-page capture plus a scroll through the marquee region.
- Mobile validation ran with `agent-browser set device "iPhone 14"` on `/rollback-financing` and included a full-page capture plus a scroll through the marquee region.
- Desktop checks:
  - waiting for the text `We finance all major brands` confirmed the marquee heading rendered in the document
  - the full-page capture showed the dark logo ribbon between the mid-page financing content and the FAQ block
- Mobile checks:
  - the same `We finance all major brands` heading was present after switching to the mobile viewport
  - the logo ribbon remained a single in-flow section without visible horizontal spill past the narrow viewport in the mobile capture

## Findings

### FIN-a11y-012

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: repo accessibility conventions; `components/sections/page/brand-marquee/CLAUDE.md`
- Rule ID or rule area: accessibility; semantic content
- Pattern tag: `brand-list-hidden-from-at`
- Affected components:
  - `BrandMarquee`
  - `BRAND_LOGOS`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: the shared financing marquee hides its specific manufacturer list from assistive technology everywhere the audited routes render it.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: `BrandMarquee` gives each manufacturer logo a meaningful `alt` value, but then wraps both scrolling copies in an `aria-hidden` container, so screen readers only get the generic heading and never the actual financed brands listed by the section.
- Why this violates the cited rule: the local marquee contract explicitly treats each logo `name` as meaningful alternative text, which means the brand list is content rather than decoration. Hiding the entire strip from the accessibility tree discards that content for non-visual users. The duplicated second track needs to stay hidden for the seamless animation, but at least one semantic copy or equivalent text alternative should remain exposed.
- Evidence:
  - [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/brand-marquee/CLAUDE.md#L19) documents `name` as the brand name used for each logo's `alt` text.
  - [BrandMarquee.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/brand-marquee/BrandMarquee.tsx#L42) and [BrandMarquee.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/brand-marquee/BrandMarquee.tsx#L44) render each manufacturer logo with meaningful alt text.
  - [BrandMarquee.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/brand-marquee/BrandMarquee.tsx#L63) marks the entire scrolling logo strip `aria-hidden="true"`, which removes both copies from the accessibility tree.
  - [config.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/brand-marquee/config.ts#L10) defines the manufacturer list whose names are otherwise only exposed through those hidden logo alts.
  - [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L11) and [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L61) lock the four audited financing routes and this shared section into rendered scope.
  - Desktop and mobile browser validation on `/rollback-financing` confirmed the marquee is visibly rendered in the audited route flow, so the hidden manufacturer list is route-visible content rather than dormant markup.
- Fix direction: keep only the duplicate animation track hidden from assistive technology and expose one accessible copy of the manufacturers, either as a semantic list of logos or as a text alternative that enumerates the brands.
- First-seen substep: `Step 4b`
- Latest-reviewed substep: `Step 4b`
- Evidence pointer: `plans/reviews/financing-step-04b-brand-marquee.md`

## Required Lenses

### Accessibility

- `FIN-a11y-012` covers the main issue in this step: the marquee's manufacturer inventory is meaningful content, but the current `aria-hidden` wrapper removes it from assistive technology output.

### Responsive Behavior

- No findings. Desktop and `iPhone 14` runtime captures showed the ribbon staying in flow with the expected dark background, scaled logo boxes, and no visible horizontal overflow beyond the viewport.

### Core Web Vitals Risk

- No findings. The marquee did not show visible layout shift during the desktop and mobile runtime checks, and the reduced-motion CSS path remains present for users who disable animation.

### Repo Convention Compliance

- No findings. The section keeps its config and styling local to the `brand-marquee` directory, uses root-based imports appropriately, and preserves the required local `CLAUDE.md`.

## No-Findings Summary

- Client-only boundary justification: no issue found. The `"use client"` boundary remains narrowly scoped to viewport-aware motion control documented in the local `CLAUDE.md`, and this step did not surface a stronger server/client ownership violation than the accessibility issue above.
- Motion and observer behavior: no issue found. The `IntersectionObserver` only toggles the marquee animation class, hover pause is isolated to the track, and the reduced-motion media query disables the animation path entirely.
- Responsive overflow and CLS risk: no issue found. The CSS custom-property sizing switched between mobile and desktop dimensions as documented, and the audited route render did not show visible overflow or layout jumping around the marquee region.
