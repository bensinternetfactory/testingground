# Homepage Route Handoff Guide

This guide is for AI tools working on `app/(marketing)/page.tsx` or moving it into another
project. Optimize for portability, reuse, and preserving the current funnel
structure.

## What This Route Is

`app/(marketing)/page.tsx` is the homepage assembly layer for the TowLoans front end. It is
not the canonical home for section-specific logic. Most content and behavior are
owned by imported section components and their config files.

Use this route when you need to:

- reorder, add, or remove homepage sections
- update route-level metadata or schema
- wire the homepage into a different app shell
- trace which reusable sections must move together during migration

Do not use this route as the first place to edit detailed section internals when
a section-level component or config already owns that concern.

## How To Work On This Page

1. Read `app/(marketing)/page.tsx` first to confirm current section order and route-level
   responsibilities.
2. For content edits, inspect the imported `config.ts` files before editing JSX.
3. For section behavior or layout edits, read that section's local `CLAUDE.md`
   before changing implementation.
4. Keep route-level concerns in the route:
   - metadata
   - FAQ schema injection
   - skip link and main landmark
   - section sequencing
5. Keep component-level concerns in the sections:
   - copy structures
   - cards, accordions, calculators, sliders
   - CTA rendering details
   - visual internals

## Current Homepage Composition

The route currently renders this funnel:

`StickyNav -> HeroLeadGen -> EquipmentCards -> TruckGalleryHeroLeft -> ProgramCards -> BrandMarquee -> HowItWorks -> TestimonialMarquee -> MiniROI -> TruckGalleryHeroRight -> ResourceHub -> FaqSection -> ClosingCta -> Footer`

It also injects FAQ JSON-LD before the page shell and wraps the content in a
skip-link plus `<main id="main-content">`.

Treat that sequence as intentional until product or conversion requirements say
otherwise.

## Migration Into The Full App

When porting this page into the main application:

- treat `app/(marketing)/page.tsx` as a portable route shell
- move reusable sections with their adjacent `config.ts` and `CLAUDE.md` files
- map the destination app's layout, nav, footer, fonts, analytics, and CTA
  systems before rewriting section APIs
- preserve metadata and structured data until the destination app has equivalent
  SEO plumbing
- preserve anchor targets and landmark structure unless the destination app
  replaces them with equally accessible behavior
- normalize imports only after confirming the destination repo's alias and folder
  conventions

If the full app already has shared nav, footer, or layout wrappers, adapt this
route to those boundaries without stripping out the core section components.

## Key Dependencies To Audit During Handoff

- hero, FAQ, footer, mini-ROI, and truck-gallery section folders
- config-driven content imports used directly by the route
- shared UI used by sections, especially CTA-related components
- `JsonLd` usage for FAQ schema
- image assets and public paths referenced by section configs

## Safe Change Strategy

- Content-only change: prefer `config.ts`
- Section-specific UI change: edit the section component
- Funnel/order change: edit `app/(marketing)/page.tsx`
- SEO/schema change: edit route metadata or shared FAQ/schema utilities
- Cross-app migration: move the route and dependencies first, then integrate with
  the destination shell

## Handoff Checklist

Before considering the route successfully moved:

- all imports resolve in the destination app
- metadata is still emitted correctly
- FAQ JSON-LD still uses shared config data
- skip link still targets a real `main-content` anchor
- interactive sections still function after path or alias changes
- CTA links still point to the intended routes or flows
- nav/footer responsibilities are not duplicated accidentally

## Guardrails

- Do not flatten reusable sections into one file to simplify migration.
- Do not remove route-level SEO, schema, or accessibility behavior as a shortcut.
- Do not rewrite section contracts unless the destination app truly requires it.
- Do not assume the homepage route owns all copy; much of it lives in config
  exports.
