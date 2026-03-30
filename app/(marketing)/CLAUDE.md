# homepage route (`app/(marketing)/page.tsx`)

This file documents the current homepage route so AI tools can move or extend it
without flattening the section architecture.

## Purpose

`app/(marketing)/page.tsx` is the primary TowLoans landing page. It is a server-rendered
composition route that:

- exports route metadata
- builds FAQ JSON-LD from shared FAQ config
- renders a skip link, sticky navigation, funnel sections, and footer
- delegates section behavior and content to reusable components plus `config.ts`
  data files

The page itself is intentionally thin. Treat it as an orchestration layer, not
the place for new business logic.

## Usage

This is a route entrypoint, not a reusable component:

```tsx
import Homepage01 from "@/app/(marketing)/page";
```

If this page is moved to another app, preserve its role as the route-level shell
for the homepage funnel.

## Section Order

`app/(marketing)/page.tsx` currently renders sections in this order:

1. `JsonLd` for FAQ schema
2. skip link to `#main-content`
3. `StickyNav`
4. `HeroLeadGen`
5. `EquipmentCards`
6. `TruckGalleryHeroLeft`
7. `ProgramCards`
8. `BrandMarquee`
9. `HowItWorks`
10. `TestimonialMarquee`
11. `MiniROI`
12. `TruckGalleryHeroRight`
13. `ResourceHub`
14. `FaqSection`
15. `ClosingCta`
16. `Footer`

Preserve this order during migration unless there is an intentional funnel or UX
change.

## Route Responsibilities

### Metadata

The route exports `metadata: Metadata` with homepage SEO title and description.
If the page moves into another app, keep equivalent route-level metadata in the
destination framework or layout system.

### Structured Data

FAQ schema is generated with:

```tsx
const faqSchema = buildFaqSchema(HOMEPAGE_FAQ_SECTION_CONFIG.faqs);
```

Do not hand-build FAQ JSON-LD in the route when the shared helper already
exists.

### Accessibility

The route owns:

- skip link targeting `#main-content`
- `<main id="main-content">` wrapper
- overall page shell structure

Retain these affordances if the page is restyled or embedded into another app.

## Composition Contract

- Prefer editing section `config.ts` files for content changes.
- Prefer editing section components only when layout or interaction changes are
  required.
- Do not inline section markup into `app/(marketing)/page.tsx`.
- Do not duplicate content data that already lives in section configs.

## Main Dependencies

These sections already have local `CLAUDE.md` files and should remain the source
of truth for detailed usage/contracts:

- `components/sections/heroes/hero-lead-gen/CLAUDE.md`
- `components/sections/page/faq/CLAUDE.md`
- `components/sections/page/footer/CLAUDE.md`
- `components/sections/page/mini-roi/CLAUDE.md`
- `components/sections/page/truck-gallery/CLAUDE.md`

Many other imported sections follow the same config-driven pattern even when they
are not listed above.

## Server / Client Boundary

- `app/(marketing)/page.tsx` is a server route component
- metadata and schema generation stay server-safe
- some imported sections include client interactivity internally, but the route
  should stay free of `"use client"` unless the entire page shell genuinely
  becomes interactive

## Migration Notes

When moving this route into the main web app:

- move the route file with the section folders it depends on
- move related `config.ts` files with their sections
- verify `@/*` alias support in the destination repo, or update imports
  consistently
- verify shared UI dependencies such as CTA links, drawers, and nav/footer
  patterns before refactoring
- keep metadata, FAQ schema, skip link, and `main-content` anchor intact until
  destination equivalents exist

## Non-Goals

- Do not turn this route into a monolithic page component.
- Do not collapse reusable sections into page-local JSX for convenience.
- Do not remove SEO or accessibility behavior during migration.
