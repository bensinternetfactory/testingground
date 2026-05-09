# video-feature

Chewy-style feature panel: rounded green card containing a video placeholder on the left and a headline + body + CTA on the right. Stacks vertically on mobile.

## Usage

```tsx
import { VideoFeature } from "./_components/video-feature/VideoFeature";

<VideoFeature />
```

## Props

| Prop | Type | Description |
|---|---|---|
| _none_ | — | No props yet; placeholder copy and `href` are hardcoded until a real video and destination are wired up. |

## Layout

- Outer `SectionShell` background is white so the green panel reads as an inset card on the page.
- Inner panel: `bg-[var(--t-blue)]` with `rounded-2xl md:rounded-3xl` and `p-4 md:p-8 lg:p-10`.
- Grid is `grid-cols-1` on mobile and `md:grid-cols-2` on tablet+, vertically centered.
- Left column: `aspect-video` placeholder with white play icon and "Video coming soon" caption (`role="img"`, decorative).
- Right column: headline, paragraph, and `CtaButton` with `variant="secondary"` for a white pill on the green field. Centered on mobile, left-aligned on `md:` and up.

## Server/Client Boundary

- `VideoFeature.tsx` — server component (no `"use client"`).

## Dependencies

- `../primitives/SectionShell` — handles the `2xl` containment rule.
- `../primitives/CtaButton` — provides the on-color "secondary" white-pill CTA.
- Brand color tokens `--t-blue` and `--t-blue-ink` from `app/test/_styles/palette.css`.
