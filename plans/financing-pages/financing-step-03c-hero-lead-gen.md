# Step 3c: Lead-Gen Hero Path

## Scope

- Executed target: `Step 3c` only
- Files reviewed:
  - `components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`
  - `components/sections/heroes/hero-lead-gen/TrustBadge.tsx`
  - `components/sections/heroes/hero-lead-gen/config.ts`
  - `components/sections/heroes/hero-lead-gen/index.ts`
  - `components/sections/heroes/hero-lead-gen/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/heroes/hero-lead-gen/CLAUDE.md`
- Routes validated:
  - `/rotator-financing`
- Browser validation: required and completed on port `3005`

## Browser Evidence Notes

- Desktop validation ran at `1440x1200` on `/rotator-financing`.
- Mobile validation ran with `agent-browser set device "iPhone 14"` on `/rotator-financing`.
- Desktop interaction checks:
  - the hero rendered as a two-column layout with the truck image visible to the right of the headline and CTA
  - clicking the primary `Get Pre-Approved` CTA opened the same-page pre-approval drawer headed `Estimate how much financing you need.` while staying on `/rotator-financing`
- Mobile interaction checks:
  - the hero rendered as a single-column text-first layout with the primary CTA expanding to the available width
  - clicking the primary `Get Pre-Approved` CTA opened the same-page drawer while staying on `/rotator-financing`

## Findings

### FIN-a11y-010

- Status: `open`
- Severity: `S3-low`
- Source skill or convention: repo accessibility conventions
- Rule ID or rule area: accessibility; semantic structure
- Pattern tag: `trust-badge-group-without-list-semantics`
- Affected components:
  - `HeroLeadGen`
  - `TrustBadge`
- Affected routes:
  - `/rotator-financing`
- Shared dependency impact: any route that reuses `HeroLeadGen` inherits the same trust-badge markup and decorative icon behavior.
- Local or systemic: `local`
- Boundary-only: `no`
- Summary: the hero’s trust-badge row is rendered as generic `div` containers, and the default checkmark SVG is not marked decorative, so assistive technology gets a flat badge cluster instead of a semantic list and may announce redundant icon graphics.
- Why this violates the cited rule: this badge strip communicates a short set of supporting claims immediately after the main CTA, so semantic list markup is the more accurate structure. The current implementation preserves the visual layout, but it does not expose list relationships and leaves the fallback SVG without `aria-hidden`, which can add unnecessary noise for screen-reader users.
- Evidence:
  - [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx#L42) renders the badge cluster in a plain `<div>` instead of list markup.
  - [TrustBadge.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/TrustBadge.tsx#L20) renders each badge as a plain `<div>` rather than a list item.
  - [TrustBadge.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/TrustBadge.tsx#L4) renders the fallback checkmark SVG without `aria-hidden="true"` or another decorative treatment.
- Fix direction: render the trust-badge cluster as a semantic list, update `TrustBadge` to output a list item, and mark the default icon as decorative so only the badge text contributes to the accessibility tree.
- First-seen substep: `Step 3c`
- Latest-reviewed substep: `Step 3c`
- Evidence pointer: `plans/reviews/financing-step-03c-hero-lead-gen.md`

## Required Lenses

### Accessibility

- `FIN-a11y-010` covers the main accessibility issue in this step: the trust-badge support claims are not exposed with list semantics, and the fallback icon is not explicitly decorative.

### Responsive Behavior

- No findings. Browser validation showed the hero collapsing cleanly from the desktop two-column presentation into a mobile text-first stack, and the primary CTA opened the same-page drawer in both validated viewports.

### Core Web Vitals Risk

- No findings. [HeroLeadGen.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx#L51) uses `next/image` with `priority`, and desktop validation showed the hero image rendering in the initial above-the-fold layout without visible loading or shift issues.

### Repo Convention Compliance

- No findings. The reviewed files stay server-only as documented in the local `CLAUDE.md`, the hero contract remains local to the section directory, and the directory preserves the required local `CLAUDE.md`.

## No-Findings Summary

- CTA behavior: no issue found. On both desktop and mobile `/rotator-financing`, clicking the primary hero CTA opened the same-page pre-approval drawer and kept the route stable.
- Hero image treatment: no issue found in the validated desktop path. The image stays in the desktop hero column and is prioritized through `next/image`.
- Section contract clarity: no issue found. `HeroLeadGen` accepts a single explicit config object documented by the local `CLAUDE.md`, and `index.ts` keeps the public exports narrow to the hero, its badge helper, and their typed config surface.
