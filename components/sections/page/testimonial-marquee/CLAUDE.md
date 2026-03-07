# testimonial-marquee

Two-row infinite-scroll marquee of verbatim Google reviews with expand/collapse interaction.

## Usage

```tsx
import { TestimonialMarquee } from "@/components/sections/page/testimonial-marquee";

<TestimonialMarquee />
```

No props — reads `ROW_1` and `ROW_2` from `config.ts` internally.

## Config Shape — `TestimonialReview`

| Field    | Type       | Description                       |
|----------|------------|-----------------------------------|
| `id`     | `string`   | Stable slug ID (slugified author) |
| `title`  | `string`   | Review headline                   |
| `body`   | `string`   | Full review text (verbatim)       |
| `author` | `string`   | Reviewer name                     |
| `rating` | `5`        | Always 5 stars                    |
| `source` | `"Google"` | Always Google                     |

## Behavior

- Row 1 scrolls left-to-right (150s desktop, 225s mobile), Row 2 right-to-left (180s/270s)
- Marquee container capped at `max-w-screen-2xl` (1536px), centered, hard-clipped
- Hover/touch pauses both rows; expanding a card also pauses
- Only one card expanded at a time; body becomes scrollable within fixed card height
- Clone cards are inert (`aria-hidden`, `pointer-events-none`, no tabbable descendants)
- Cards are semantic `<article>` blocks with no keyboard tab stops inside the marquee
- Skip link before marquee jumps to `#after-testimonials`
- Long author names truncate with ellipsis
- `prefers-reduced-motion: reduce` → no animation, native horizontal scroll
- IntersectionObserver toggles `marquee-visible` class (preserves animation position)

## Server/Client Boundary

- `TestimonialMarquee.tsx` — `"use client"` (IntersectionObserver, useState, useEffect)
- `config.ts` — server-safe data

## Dependencies

- `testimonial-marquee.css` — keyframes, pause states, reduced-motion, mobile speed overrides
