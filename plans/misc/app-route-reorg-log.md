# App Route Reorganization Log

Date: 2026-03-29

## Goal

Reorganize the `app/` directory using Next.js App Router route groups so related pages live close together, while preserving:

- existing public URLs
- existing rendered UI and page behavior
- existing metadata and content
- existing page composition unless a move was required

## High-Level Result

The public route tree is now organized under hidden route groups:

- `app/(marketing)`
- `app/(marketing)/(financing)`
- `app/(marketing)/(programs)`
- `app/(marketing)/(resources)`
- `app/(internal)`

No public URLs were changed.

## Route Files Moved

### Marketing root

- `app/page.tsx` -> `app/(marketing)/page.tsx`
- `app/about/page.tsx` -> `app/(marketing)/about/page.tsx`
- `app/AGENTS.md` -> `app/(marketing)/AGENTS.md`
- `app/CLAUDE.md` -> `app/(marketing)/CLAUDE.md`

### Internal

- `app/brand/page.tsx` -> `app/(internal)/brand/page.tsx`

### Financing

- `app/rollback-financing/page.tsx` -> `app/(marketing)/(financing)/rollback-financing/page.tsx`
- `app/rollback-financing/config.ts` -> `app/(marketing)/(financing)/rollback-financing/config.ts`
- `app/wrecker-financing/page.tsx` -> `app/(marketing)/(financing)/wrecker-financing/page.tsx`
- `app/rotator-financing/page.tsx` -> `app/(marketing)/(financing)/rotator-financing/page.tsx`
- `app/used-tow-truck-financing/page.tsx` -> `app/(marketing)/(financing)/used-tow-truck-financing/page.tsx`

### Programs

- `app/zero-down-tow-truck-financing/page.tsx` -> `app/(marketing)/(programs)/zero-down-tow-truck-financing/page.tsx`
- `app/fleet-financing/page.tsx` -> `app/(marketing)/(programs)/fleet-financing/page.tsx`
- `app/deferred-payment-tow-truck-financing/page.tsx` -> `app/(marketing)/(programs)/deferred-payment-tow-truck-financing/page.tsx`

### Resources

- `app/tow-truck-calculator/page.tsx` -> `app/(marketing)/(resources)/tow-truck-calculator/page.tsx`
- `app/resources/how-much-does-a-tow-truck-cost/page.tsx` -> `app/(marketing)/(resources)/resources/how-much-does-a-tow-truck-cost/page.tsx`
- `app/resources/tow-truck-financing-companies/page.tsx` -> `app/(marketing)/(resources)/resources/tow-truck-financing-companies/page.tsx`
- `app/resources/tow-truck-lease-vs-loan/page.tsx` -> `app/(marketing)/(resources)/resources/tow-truck-lease-vs-loan/page.tsx`
- `app/resources/section-179-tow-truck/page.tsx` -> `app/(marketing)/(resources)/resources/section-179-tow-truck/page.tsx`

## Shared App Code Moved

### Financing-only shared code

Moved out of `app/_shared/equipment-financing/` and into the financing group:

- `app/_shared/equipment-financing/EquipmentFinancingPageShell.tsx` -> `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx`
- `app/_shared/equipment-financing/equipment-page-config.tsx` -> `app/(marketing)/(financing)/_components/equipment-page-config.tsx`
- `app/_shared/equipment-financing/page-config-types.ts` -> `app/(marketing)/(financing)/_components/page-config-types.ts`
- `app/_shared/equipment-financing/shared-config.ts` -> `app/(marketing)/(financing)/_components/shared-config.ts`

### Marketing-local shared code

- `app/_shared/minimal-nav-page/MinimalNavPage.tsx` -> `app/(marketing)/_components/MinimalNavPage.tsx`

## New Files Added

### Root convention files

- `app/global-error.tsx`
- `app/not-found.tsx`

### Marketing group convention files

- `app/(marketing)/layout.tsx`
- `app/(marketing)/loading.tsx`
- `app/(marketing)/error.tsx`

### Financing group convention files

- `app/(marketing)/(financing)/layout.tsx`
- `app/(marketing)/(financing)/loading.tsx`
- `app/(marketing)/(financing)/error.tsx`

### Programs group convention files

- `app/(marketing)/(programs)/layout.tsx`
- `app/(marketing)/(programs)/loading.tsx`
- `app/(marketing)/(programs)/error.tsx`

### Resources group convention files

- `app/(marketing)/(resources)/layout.tsx`
- `app/(marketing)/(resources)/loading.tsx`
- `app/(marketing)/(resources)/error.tsx`

### New program route

- `app/(marketing)/(programs)/private-party-tow-truck-financing/page.tsx`

## Files Edited

### Root layout

- `app/layout.tsx`

Changes:

- replaced placeholder metadata
- added `viewport` export with theme color
- removed manual `<meta name="theme-color">` from `<head>`
- kept existing providers and global styling setup intact

### Route imports updated after moves

- `app/(marketing)/about/page.tsx`
- `app/(marketing)/(programs)/deferred-payment-tow-truck-financing/page.tsx`
- `app/(marketing)/(programs)/fleet-financing/page.tsx`
- `app/(marketing)/(programs)/zero-down-tow-truck-financing/page.tsx`
- `app/(marketing)/(financing)/used-tow-truck-financing/page.tsx`
- `app/(marketing)/(resources)/resources/how-much-does-a-tow-truck-cost/page.tsx`
- `app/(marketing)/(resources)/resources/section-179-tow-truck/page.tsx`
- `app/(marketing)/(resources)/resources/tow-truck-financing-companies/page.tsx`
- `app/(marketing)/(resources)/resources/tow-truck-lease-vs-loan/page.tsx`
- `app/(marketing)/(financing)/rollback-financing/page.tsx`
- `app/(marketing)/(financing)/wrecker-financing/page.tsx`
- `app/(marketing)/(financing)/rotator-financing/page.tsx`

### Financing config import normalization

- `app/(marketing)/(financing)/rollback-financing/config.ts`

Changes:

- updated imports to use financing-local `_components` files
- kept existing rollback page config behavior intact

### Route documentation path updates

- `app/(marketing)/AGENTS.md`
- `app/(marketing)/CLAUDE.md`

Changes:

- updated references from `app/page.tsx` to `app/(marketing)/page.tsx`

### Link target updates for Private Party route

- `components/sections/nav/sticky-nav-rm/nav-data.ts`
- `components/sections/page/program-cards/config.ts`
- `components/sections/page/footer/config.ts`

Changes:

- added the real `/private-party-tow-truck-financing` destination to the nav and footer
- updated the homepage program card so its CTA points to `/private-party-tow-truck-financing`

## Route Structure After Reorganization

```text
app/
  layout.tsx
  global-error.tsx
  not-found.tsx
  globals.css
  favicon.ico

  (marketing)/
    layout.tsx
    loading.tsx
    error.tsx
    page.tsx
    about/page.tsx

    (financing)/
      layout.tsx
      loading.tsx
      error.tsx
      _components/
      rollback-financing/page.tsx
      rollback-financing/config.ts
      wrecker-financing/page.tsx
      rotator-financing/page.tsx
      used-tow-truck-financing/page.tsx

    (programs)/
      layout.tsx
      loading.tsx
      error.tsx
      zero-down-tow-truck-financing/page.tsx
      fleet-financing/page.tsx
      deferred-payment-tow-truck-financing/page.tsx
      private-party-tow-truck-financing/page.tsx

    (resources)/
      layout.tsx
      loading.tsx
      error.tsx
      tow-truck-calculator/page.tsx
      resources/
        how-much-does-a-tow-truck-cost/page.tsx
        tow-truck-financing-companies/page.tsx
        tow-truck-lease-vs-loan/page.tsx
        section-179-tow-truck/page.tsx

  (internal)/
    brand/page.tsx
```

## Behavior / Safety Notes

- public URLs were preserved
- route groups are hidden, so they do not change route paths
- the new group `layout.tsx` files currently return `children` directly
- this was intentional to avoid introducing visual regressions during the reorganization
- no existing page content was rewritten
- no existing section composition was intentionally changed
- financing shared code stayed near financing routes
- placeholder pages still use the existing `MinimalNavPage` rendering pattern

## Validation Completed

### Static checks

- `npm run lint`
- `npm run build`

Both passed.

### Build output confirmed these routes exist

- `/`
- `/about`
- `/brand`
- `/deferred-payment-tow-truck-financing`
- `/fleet-financing`
- `/private-party-tow-truck-financing`
- `/resources/how-much-does-a-tow-truck-cost`
- `/resources/section-179-tow-truck`
- `/resources/tow-truck-financing-companies`
- `/resources/tow-truck-lease-vs-loan`
- `/rollback-financing`
- `/rotator-financing`
- `/tow-truck-calculator`
- `/used-tow-truck-financing`
- `/wrecker-financing`
- `/zero-down-tow-truck-financing`

### Browser validation completed on port `3005`

Validated with local dev server:

- opened `/rollback-financing`
- confirmed the rollback financing page rendered
- confirmed the moved route still had the expected interactive content
- opened `/private-party-tow-truck-financing`
- confirmed the new page rendered with the correct heading
- confirmed the DOM contains links targeting `/private-party-tow-truck-financing`

## Things Intentionally Not Changed

- `app/truckicons/*` was left in place
- the new group layouts were not used to consolidate shared nav/footer wrappers yet
- no visual cleanup or redesign work was attempted
- unrelated existing changes in `plans/todo.md` and `plans/reviews/` were not touched

## Final Outcome

The `app/` tree is now organized by marketing route groups with financing, programs, and resources physically grouped together, while preserving existing route behavior and avoiding intentional visual changes.
