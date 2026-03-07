# Testimonial Marquee — Fix & Polish Changelog

## Date: 2026-03-07

## Files Modified

- `components/sections/page/testimonial-marquee/TestimonialMarquee.tsx`
- `components/sections/page/testimonial-marquee/testimonial-marquee.css`
- `components/sections/page/testimonial-marquee/CLAUDE.md` (updated docs)

No new files. `config.ts`, `index.ts`, and `app/page.tsx` were unchanged.

---

## Issues Fixed

### 1. Animation too fast
**Before:** Row 1 = 80s, Row 2 = 96s (desktop); 120s/144s (mobile)
**After:** Row 1 = 150s, Row 2 = 180s (desktop); 225s/270s (mobile)

The new durations produce a leisurely ~25px/s drift. Mobile uses a 1.5x multiplier for comfortable reading on smaller viewports.

### 2. Jank on loop reset
**Before:** IntersectionObserver toggled the `marquee-animate` class on/off. Removing the class killed the CSS animation entirely, so re-adding it restarted from position 0 — causing a visible jump.

**After:** The `marquee-animate` class was removed. Animation keyframes are always applied via `.marquee-row-1` and `.marquee-row-2` selectors. Tracks start with `animation-play-state: paused` by default. A new `.marquee-visible` class (toggled by IntersectionObserver via direct DOM classList manipulation) sets `animation-play-state: running`. This pauses/resumes without resetting position.

### 3. Cards clipped at max-w-7xl edges
**Before:** Marquee container had no width constraint — was full-bleed on all screens, but cards appeared clipped due to the parent's overflow context.

**After:** Marquee container now has `mx-auto max-w-screen-2xl overflow-hidden` — capped at 1536px, centered, with hard clip at edges. Header remains in `max-w-7xl`. No gradient fade masks.

### 4. Hover pause not working
**Before:** `data-paused` attribute and CSS hover rule were present but only tracked `isHovered` and `expandedId`. Touch events set hover state but had no keyboard focus support.

**After:** Added `isFocused` state. Pause condition is now `isHovered || isFocused || expandedId !== null`. Added `onFocus`/`onBlur` handlers on the container (blur only fires when focus leaves the container entirely via `contains(relatedTarget)` check). CSS fallback hover rule remains.

---

## Enhancements Added

### 5. Inert clone cards
Clone cards (the duplicate set that creates the seamless loop illusion) are now wrapped in a `<div aria-hidden="true" className="pointer-events-none contents">`. This means:
- Screen readers skip them
- They cannot receive keyboard focus (clone cards do not render tabbable controls)
- They cannot be clicked
- They always render in collapsed state with a no-op toggle handler
- `contents` display ensures the flex layout treats children as direct flex items

### 6. Keyboard focus on actionable controls
`ReviewCard` uses semantic `<article>` markup. Keyboard tab order goes to actionable controls (`Read more` / `Read less`) instead of every card container. Buttons include `focus-visible` ring styling for clear keyboard affordance.

### 7. Skip link
Added before the marquee container:
```html
<a href="#after-testimonials" class="sr-only focus:not-sr-only ...">Skip testimonials</a>
```
A `<span id="after-testimonials" />` is placed at the end of the `<section>`. Standard visually-hidden skip-link pattern — visible only on keyboard focus.

### 8. Author name truncation
The author name `<span>` in the card footer now has the `truncate` class (`overflow-hidden text-ellipsis whitespace-nowrap`). Long names like "Phantom Troop Transport LLC" get ellipsis instead of wrapping or overflowing.

### 9. Reduced motion fallback (improved)
**Before:** `prefers-reduced-motion: reduce` set `animation: none` — cards were frozen in place with no way to see off-screen reviews.

**After:** In addition to `animation: none !important`, tracks get `overflow-x: auto` and `width: auto`. This renders cards as a static horizontally-scrollable strip with native browser scrollbar.

---

## Preserved Behavior (no changes)

- Card width: fixed 320px (`w-80`) on all breakpoints
- Card height: fixed at 4.5rem body area, scrolls within when expanded
- Row gap: 24px (`mt-6`) between rows, 24px (`gap-6`) between cards
- Both rows pause simultaneously on any interaction
- Title + body both shown (authentic Google Reviews format)
- Google G icon: 16px, decorative, no links
- Section background: `bg-gray-50`, cards white with `border-gray-200`
- No review count — header reads "Rated 5 Stars by Operators"
- No outbound links from the testimonial section
- Unique reviews per row: ROW_1 = 11 reviews, ROW_2 = 10 reviews, no overlap
- Dismiss via "Read less" button only — no click-outside or Escape handling

---

## Verification

- `npm run lint` — passes
- `npm run build` — passes
