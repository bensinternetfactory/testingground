# Homepage Social Proof Marquee Spec (Decision-Complete)

## Summary
Replace the existing `#testimonials` social-proof section with a dedicated, reusable testimonials marquee section that emphasizes brand legitimacy using verbatim Google review content.
The new section will show: title, top 5-star trust line, optional subheading, and two continuously looping marquee rows moving in opposite directions, with pause-on-interaction and inline `Read more` expansion.

## Implementation Changes
- Create a new reusable section at `components/sections/page/testimonial-marquee` with:
  - `TestimonialMarquee.tsx` (`"use client"`)
  - `config.ts` (typed review corpus; all provided reviews included verbatim)
  - `testimonial-marquee.css` (animations, reduced-motion behavior, pause states)
  - `index.ts`
  - `CLAUDE.md` (usage, props, client boundary, behavior contract)
- Replace current social-proof markup in `app/page.tsx` with `<TestimonialMarquee />` in the same section position.
- Remove old social-proof internals:
  - Stats bar
  - Static 3 testimonial cards
  - Partner logo chips
- Keep existing `id="testimonials"` section anchor semantics so nav/link behavior remains stable.

## Public Interfaces / Types
- Add typed content model in `config.ts`:
  - `type TestimonialReview = { id: string; title: string; body: string; author: string; rating: 5; source: "Google" }`
- Component API:
  - `TestimonialMarquee` with no external props for v1 (reads local typed config).
- Rendering contract:
  - All provided reviews are rendered.
  - Deterministic row split by index parity (even row 1, odd row 2).
  - Two visual track copies per row for seamless looping; clone track is `aria-hidden`.

## Behavior + UX Spec
- Header copy style: direct credibility.
- Top trust line: 5 inline SVG stars + text `Rated 5 Stars by Operators`.
- Google indicator: full-color Google “G” icon on each card.
- Motion:
  - Use dedicated architecture (not reused `BrandMarquee` internals), CSS marquee + client state for interaction control.
  - Row directions: row 1 left→right, row 2 right→left.
  - Asymmetric speeds: row 1 faster than row 2 (fixed durations, not dynamic).
- Pause behavior:
  - Pause both rows globally on card hover/focus/touchstart.
  - Resume on pointer/touch release unless a card is expanded.
- Readability:
  - Review body clamped in collapsed state with `Read more`.
  - Inline expand in-place; only one expanded card at a time.
  - Expanding pauses both rows; close via explicit close button and outside click.
- Accessibility:
  - Duplicate loop tracks hidden from assistive tech.
  - Keyboard support for `Read more` / close interactions.
  - Reduced motion: disable animation and render static horizontal rows (no auto-motion).
- Data/content policy:
  - Use all provided reviews verbatim (no normalization edits).
  - No new analytics events for this section.
  - No review/aggregate schema markup for this section.

## Test Plan
- Run `npm run lint` and `npm run build`.
- Manual desktop/mobile QA:
  - Two rows animate opposite directions and loop seamlessly.
  - Hover/focus/touch pauses both rows.
  - `Read more` expands inline, single-expanded-card rule enforced.
  - Close button and outside-click collapse behavior works.
  - Reduced-motion mode disables marquee animation.
  - Screen reader does not announce duplicated clone tracks.
  - Visual checks for long reviews, star row, Google icon, spacing, and contrast.

## Assumptions (Locked Defaults)
- V1 is a hard replace (no feature flag, no A/B).
- `Read more` visibility is deterministic via clamp policy (not analytics-driven).
- Existing brand marquee section elsewhere on homepage remains unchanged.
- New component follows current Tailwind + local CSS pattern used by existing section modules.
