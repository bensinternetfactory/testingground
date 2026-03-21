# ripple-cta-link

Shared CTA button-link with lightweight ripple feedback, analytics hooks, and anchor SEO semantics.

## Usage

```tsx
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";

<RippleCtaLink
  href="/some-page"
  label="Get Started"
  icon={<ArrowIcon />}
  section="hero"
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | required | Navigation target |
| `label` | `string` | required | Analytics label and fallback visible CTA text |
| `children` | `ReactNode` | — | Optional custom CTA content rendered instead of `label` |
| `icon` | `ReactNode` | — | Optional icon element |
| `iconPosition` | `"start" \| "end"` | `"end"` | Icon placement relative to label |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `className` | `string` | — | Additional CSS classes |
| `prefetch` | `boolean` | — | Next.js prefetch (internal links only) |
| `isPlaceholder` | `boolean` | `false` | Marks link as placeholder for analytics/QA |
| `onAnalyticsEvent` | `(payload) => void` | — | Fire-and-forget analytics hook |
| `ariaLabel` | `string` | — | Explicit accessible name when custom children should stay `aria-hidden` |
| `section` | `string` | `""` | Section identifier for analytics |
| `cardId` | `string` | — | Card identifier for analytics |
| `variant` | `"filled" \| "outline"` | `"filled"` | Visual variant — `filled` is the default dark pill, `outline` is a transparent button with border |
| `justify` | `"center" \| "between"` | `"center"` | Content justification — `between` pushes icon to far right (useful for full-width outline buttons) |
| `disabled` | `boolean` | `false` | Renders a non-interactive button with the same layout when the CTA should stay visually present but unavailable |

## Visual States

### Filled variant (default)

- **Default**: Dark pill (`bg-[#111111]`, white text, `rounded-full`)
- **Hover**: Subtle fade (`bg-[#111111]/90`) + icon nudge (translate 0.5px in icon direction)
- **Focus**: `focus-visible:ring-2` with `ring-[#111111]` and `ring-offset-2`
- **Tap**: CSS-only ripple pulse from tap point (`bg-[#22C55E]/20`)
- **Disabled**: `bg-[#D1D5DB]`, white text, `cursor-not-allowed`

### Outline variant

- **Default**: Transparent background, `border-gray-400`, dark text (`text-[#111]`), `rounded-full`
- **Hover**: `bg-gray-100` fill + border darkens to `gray-500` + icon nudge
- **Focus**: Same ring treatment as filled (`ring-[#111]`)
- **Tap**: CSS-only neutral ripple (`bg-black/10`)
- **Disabled**: `border-gray-300`, `text-gray-400`, transparent background

## Interaction Behavior

- Ripple cap: max 1 active ripple per instance
- Ripple clears after ~250ms
- Keyboard: `Enter` triggers center-origin ripple
- Desktop: icon nudge on hover/focus

## Server/Client Boundary

- `RippleCtaLink.tsx` — **client component** (`"use client"`)
- Parent components remain server components; only CTA interaction is client-side

## Link Routing

- Internal URLs: uses `next/link` with optional `prefetch`
- External URLs (`https?://`): uses native `<a>` with `target="_blank"` and `rel="noopener noreferrer"`

## Dependencies

- `next/link`
