# CTA Feature

Primary CTA system for revenue-critical navigation and lead-entry surfaces.

## Usage

```tsx
import { CtaLink, LeadCta } from "@/features/cta/client";
import { createPreApprovalEntry } from "@/features/cta/lead-entry";
import type { CtaOrigin } from "@/features/cta/contract";

// Internal navigation CTA
<CtaLink href="/rollback-financing" copy={{ label: "See Rollback Financing" }} />

// Pre-approval lead-entry CTA
const entry = createPreApprovalEntry({ pathname, trigger });
<LeadCta entry={entry} copy={{ label: "Get Pre-Approved" }} />

// External link CTA
<CtaLink href="https://example.com" copy={{ label: "Visit Partner" }} />
```

## Props / Config

### CtaLink

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `href` | `string` | Yes | Destination URL (internal or external) |
| `copy` | `CtaCopy` | Yes | `{ label, eyebrow?, ariaLabel? }` |
| `appearance` | `CtaAppearance` | No | `{ tone?, size?, align?, fullWidth?, className? }` |
| `disabled` | `boolean` | No | Renders as disabled `<button>` |
| `icon` | `ReactNode` | No | Icon element |
| `iconPosition` | `"start" \| "end"` | No | Defaults to `"end"` |
| `preApprovalTrigger` | `PreApprovalTrigger` | No | Attaches pre-approval data attributes |
| `prefetch` | `boolean` | No | Next.js prefetch option |
| `analytics` | `CtaAnalyticsContext` | No | Legacy analytics context (compatibility) |
| `children` | `ReactNode` | No | Overrides `copy.label` content |

### LeadCta

Same as `CtaLink` but replaces `href` and `preApprovalTrigger` with:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `entry` | `PreApprovalEntry` | Yes | From `createPreApprovalEntry()` |

### Appearance tones

- `"primary"` (default) -- dark filled pill
- `"secondary"` -- bordered outline pill
- `"inverse"` -- white outline for dark backgrounds

## Server / Client Boundary

- `contract.ts` -- server-safe types, importable from server components and config files
- `lead-entry.ts` -- server-safe pre-approval entry factory and attribute builder
- `client.tsx` -- `'use client'`, owns React components, motion, and press interaction

## Dependencies

- `next/link` -- internal navigation
- `framer-motion` -- `whileTap` pressed-state feedback, ripple animation
- `@/lib/press-feedback` -- `usePressFeedback` hook, `PressFeedbackRipple`, `tapSpring`
- `@/features/pre-approval/contract` -- `PreApprovalTrigger` type
- `@/features/pre-approval/drawer/server` -- `buildPreApprovalEntryHref`, `buildPreApprovalTriggerAttributes`
- `web-haptics` -- haptics adapter (integrated via `usePressFeedback`, not directly imported)
