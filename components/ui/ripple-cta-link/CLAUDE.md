# ripple-cta-link

Shared CTA button-link with ripple animation, haptic feedback, and anchor SEO semantics.

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
| `disabled` | `boolean` | `false` | Renders a non-interactive button with the same layout when the CTA should stay visually present but unavailable |

## Visual States

- **Default**: Dark pill (`bg-[#111111]`, white text, `rounded-full`)
- **Hover**: Subtle fade (`bg-[#111111]/90`) + icon nudge (translate 0.5px in icon direction)
- **Focus**: `focus-visible:ring-2` with `ring-[#111111]` and `ring-offset-2`
- **Active/Tap**: `scale: 0.96` spring + green ripple from tap point (`bg-[#22C55E]/20`)
- **Reduced motion**: No ripple/spring animation; haptics still fire at lower intensity

## Interaction Behavior

- Ripple cap: max 1 active ripple per instance
- Double-tap guard: ignores duplicate activation within 250ms
- Swipe guard: in scroll containers, suppresses tap effects when movement exceeds 10px threshold
- Keyboard: `Enter` triggers center-origin ripple; no haptic on keyboard
- Desktop: icon nudge on hover/focus

## Server/Client Boundary

- `RippleCtaLink.tsx` — **client component** (`"use client"`)
- Parent components remain server components; only CTA interaction is client-side

## Link Routing

- Internal URLs: uses `next/link` with optional `prefetch`
- External URLs (`https?://`): uses native `<a>` with `target="_blank"` and `rel="noopener noreferrer"`

## Dependencies

- `framer-motion` (v12+)
- `next/link`
- `web-haptics/react`
