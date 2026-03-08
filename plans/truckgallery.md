# TruckGallery Fix Checklist (Completed)

## Scope
- Source review in this file was implemented end-to-end.
- Includes bug fixes + all listed suggestions.
- Includes final verification via tests/checks + Chrome DevTools MCP runtime validation.

## Implementation Checklist

- [x] Stabilize React keys for grid tiles.
  - Change: `key={\`${img.src}-${index}\`}`.
  - Evidence: `components/sections/page/truck-gallery/TruckGallery.tsx`.

- [x] Add runtime guard for grid shape drift.
  - Change: added `normalizeGridImages(grid)` with filtering + clamp to 4.
  - Evidence: `components/sections/page/truck-gallery/utils.ts`, used in `TruckGallery.tsx`.

- [x] Remove unreachable responsive classes on mobile-only section.
  - Change: removed `2xl:*` from the `md:hidden` gallery section.
  - Evidence: `components/sections/page/truck-gallery/TruckGallery.tsx` section class is now `md:hidden` only.

- [x] Remove duplicate-ID default footgun.
  - Change: base component no longer defaults `sectionId` to `truck-gallery`.
  - Evidence: `TruckGallery` prop no default id in `TruckGallery.tsx`.

- [x] Add explicit composition variants.
  - Change: added `TruckGalleryHeroLeft` and `TruckGalleryHeroRight` wrappers.
  - Evidence: `TruckGallery.tsx` exports wrappers; `app/page.tsx` uses wrappers.

- [x] Tighten API ergonomics for known placements.
  - Change: page switched to wrapper usage with explicit section IDs.
  - Evidence: `app/page.tsx` at gallery callsites.

- [x] Apply decorative gallery semantics.
  - Change: wrappers default to `decorative={true}`; component sets `aria-hidden` and empty `alt` text when decorative.
  - Evidence: `TruckGallery.tsx` decorative logic.

- [x] Address bundle/import hygiene note.
  - Change: replaced barrel import at page callsite with direct imports from `config` and `TruckGallery` module.
  - Evidence: `app/page.tsx` import block.

- [x] Add configurable hero image loading strategy.
  - Change: added `heroLoading` prop (`lazy | eager`), default `lazy`.
  - Evidence: `TruckGallery.tsx` + docs update.

- [x] Document updated API/usage.
  - Change: updated component-local docs with wrapper usage + decorative mode + `heroLoading`.
  - Evidence: `components/sections/page/truck-gallery/CLAUDE.md`.

- [x] Update repo MCP policy per request.
  - Change: removed Playwright-mandatory gate language; Chrome DevTools MCP is now the completion gate.
  - Evidence: `AGENTS.md` MCP Validation Gate section.

## Skill Re-Review (Post-Fix)

### vercel-composition-patterns
- Status: fixed.
- Notes:
  - Explicit variants implemented (`TruckGalleryHeroLeft`, `TruckGalleryHeroRight`).
  - Call sites now self-document layout intent.

### vercel-react-best-practices
- Status: fixed.
- Notes:
  - Dead responsive classes removed from mobile-only section.
  - Runtime guard added for grid data shape.
  - Key stability improved with source+index key.
  - Duplicate default section id removed from base component.
  - Direct imports used at page callsite (bundle hygiene suggestion addressed).

### web-design-guidelines
- Status: fixed for review scope (`TruckGallery` module + homepage callsites).
- Notes:
  - Decorative semantics are consistent (`aria-hidden` + empty alts).
  - No new focus/interaction/accessibility regressions introduced in modified files.

## Verification Results

- [x] `npm test`
  - Result: 4 test files passed, 21 tests passed.
  - Includes new file: `components/sections/page/truck-gallery/__tests__/utils.test.ts`.

- [x] `npm run lint`
  - Result: passed.

- [x] `npm run build`
  - Result: passed (Next.js production build successful).

- [x] Chrome DevTools MCP runtime validation (final gate)
  - URL: `http://localhost:3000`.
  - Viewport: `390x844`.
  - DOM checks:
    - `#truck-gallery-top` and `#truck-gallery-after-miniroi` both present.
    - top gallery grid class: `grid-cols-[50fr_25fr_25fr]` (hero-left).
    - second gallery grid class: `grid-cols-[25fr_25fr_50fr]` (hero-right).
    - both sections `aria-hidden="true"`.
    - all gallery images have empty alt text in decorative mode.
  - Console: no messages.
  - Network: no failed requests in captured set.

## Final Status
- All requested fixes/suggestions from this spec are implemented.
- Verification gate passed with tests + lint + build + Chrome DevTools MCP runtime checks.
