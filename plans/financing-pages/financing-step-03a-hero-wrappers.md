# Step 3a: Framed Hero Server Wrappers And Variant Design

## Scope

- Executed target: `Step 3a` only
- Files reviewed:
  - `components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx`
  - `components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx`
  - `components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly.tsx`
  - `components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight.tsx`
  - `components/sections/heroes/hero-convert-framed/index.ts`
  - `components/sections/heroes/hero-convert-framed/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/heroes/hero-convert-framed/CLAUDE.md`
- Routes validated:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/used-tow-truck-financing`
- Browser validation: not required. This pass only reviewed static server-wrapper architecture, exported variant contracts, and wrapper-level image markup.

## Findings

### FIN-architecture-006

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: `vercel-composition-patterns`; repo component-ownership conventions
- Rule ID or rule area: `patterns-explicit-variants`
- Pattern tag: `variant-contract-owned-by-sibling-family`
- Affected components:
  - `HeroConvertFramed`
  - `HeroConvertFramedOutline`
  - `HeroConvertFramedPrimaryOnly`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: the framed hero family still depends on the sibling `hero-convert-geico` config contract for most of its public API surface.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: the three main framed wrapper variants present themselves as explicit local variants, but they still inherit their prop contract from `HeroConvertConfig` in the sibling `hero-convert-geico` family.
- Why this violates the cited rule: `patterns-explicit-variants` is supposed to give each variant family an explicit, locally owned contract. Extending a sibling family config means unrelated API changes can leak into the framed family, and it also weakens the repo ownership rule that reusable internals should live in their own local module.
- Evidence:
  - [HeroConvertFramed.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx#L13) defines `HeroConvertFramedConfig` by extending `Omit<HeroConvertConfig, "tiles">` imported from `../hero-convert-geico/config` at [HeroConvertFramed.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx#L6).
  - [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx#L21) defines `HeroConvertFramedOutlineConfig` by extending `Omit<HeroConvertConfig, "tiles" | "tertiaryLinks">` imported from the same sibling family at [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx#L7).
  - [HeroConvertFramedPrimaryOnly.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly.tsx#L12) repeats the same pattern by extending `Omit<HeroConvertConfig, "tiles" | "tertiaryLinks">` imported from `../hero-convert-geico/config` at [HeroConvertFramedPrimaryOnly.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly.tsx#L5).
  - The local contract intent in [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/CLAUDE.md#L1) says this folder exposes explicit framed variants, which makes the cross-family config inheritance drift more visible.
- Fix direction: extract a locally owned framed-hero base config in this directory, then let each wrapper variant extend that local contract instead of inheriting from `hero-convert-geico`.
- First-seen substep: `Step 3a`
- Latest-reviewed substep: `Step 3a`
- Evidence pointer: `plans/reviews/financing-step-03a-hero-wrappers.md`

### FIN-patterns-007

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: `vercel-composition-patterns`; `vercel-react-best-practices`
- Rule ID or rule area: `architecture-compound-components`; `rendering-conditional-render`
- Pattern tag: `wrapper-shell-duplication`
- Affected components:
  - `HeroConvertFramed`
  - `HeroConvertFramedOutline`
  - `HeroConvertFramedPrimaryOnly`
  - `HeroConvertFramedTileRight`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: every framed hero variant duplicates the same server wrapper shell, footnote-marker transformer, and large parts of the responsive media layout.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: the family uses explicit variant entry points, but each variant re-implements the same shell structure instead of composing a shared server scaffold with small variant slots.
- Why this violates the cited rule: `architecture-compound-components` favors shared structure with explicit composition points when multiple variants differ only in a few regions. Repeating the same wrapper tree and helper logic across four files increases drift risk for responsive changes, footnote rendering, and image treatment, because fixes now require synchronized edits in multiple wrappers.
- Evidence:
  - [HeroConvertFramed.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx#L27) defines `renderBodyWithMarkers`, and [HeroConvertFramed.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramed.tsx#L98) repeats the common section shell, tile-selector placement, optional microcopy/disclaimer, and desktop/mobile image split.
  - [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx#L32) repeats the same footnote helper, and [HeroConvertFramedOutline.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedOutline.tsx#L136) repeats the same wrapper structure with only the tertiary region changed.
  - [HeroConvertFramedPrimaryOnly.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly.tsx#L22) repeats the footnote helper again, and [HeroConvertFramedPrimaryOnly.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedPrimaryOnly.tsx#L75) repeats the shell with only the tertiary branch removed.
  - [HeroConvertFramedTileRight.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight.tsx#L16) repeats the same helper for a fourth time, while [HeroConvertFramedTileRight.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/HeroConvertFramedTileRight.tsx#L68) duplicates the same section grid and typography foundation with the selector moved to the right column.
- Fix direction: extract shared server-only building blocks such as `renderBodyWithMarkers`, the outer section shell, and a common hero frame layout that accepts variant slots for tertiary content and media placement.
- First-seen substep: `Step 3a`
- Latest-reviewed substep: `Step 3a`
- Evidence pointer: `plans/reviews/financing-step-03a-hero-wrappers.md`

## Required Lenses

### Accessibility

- No findings. The wrappers keep a single `<h1>` per hero, preserve text content as real text instead of background images, and pass explicit `alt` text to every `next/image` call reviewed in this step.

### Responsive Behavior

- `FIN-patterns-007` covers the main responsive risk in this step: the same mobile/desktop wrapper structure is duplicated across the family, so breakpoint changes are prone to drift.

### Core Web Vitals Risk

- No additional findings. The wrappers remain server components, use `next/image` instead of raw `<img>`, and provide explicit `sizes` strings plus `priority` on the desktop standalone-hero image path. Gallery-internal behavior is deferred to Step `3b`, where `HeroGallery.tsx` is in scope.

### Repo Convention Compliance

- `FIN-architecture-006` covers the main convention drift in this step: the family does not fully own its local config contract.
- No findings on file naming, export naming, or server/client boundary placement. [index.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/heroes/hero-convert-framed/index.ts#L1) exports the explicit variant entry points cleanly, and the local `CLAUDE.md` accurately documents the wrapper-vs-client split.

## No-Findings Summary

- Server/client boundary placement: no wrapper-level issue found. The reviewed wrappers stay server-rendered and delegate interactivity to `FramedTileSelector`, which matches the local `CLAUDE.md` contract and Next.js RSC guidance.
- API export surface: no issue found in the directory barrel. The folder exposes explicit component and type exports for each framed variant.
