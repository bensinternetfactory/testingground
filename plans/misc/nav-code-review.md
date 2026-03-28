 # Nav Refactor Plan, Phase-Gated

  ## Summary

  Implement the navigation fixes in ordered checkpoints, with Composition Review issues first and a hard stop before any later refactor work.
  Each checkpoint ends only after the relevant skill review is rerun and the normal repo validations pass. After checkpoint 1 is implemented
  and validated, stop and wait for your commit confirmation before moving on.

  ## Checkpoint 1: Composition Review Only

  Status gate: implement this checkpoint, rerun validations, then stop for commit.

  ### Changes

  - Refactor the nav into a narrower public API built around StickyNav only.
      - Keep StickyNav as the only intended export from components/sections/nav/sticky-nav-rm.
      - Stop exporting NavClient and raw nav arrays/types from the package entry unless a server-only internal file still needs them.
  - Replace the current mixed NavCardItem contract with explicit item variants.
      - Use a discriminated union such as image-backed card items vs icon-backed card items.
      - Remove imageSrcLight unless a real theme consumer is added at the same time.
      - Remove required-but-dead icon fields from image-only items.
  - Break up NavClient into focused pieces instead of one monolith.
      - Static nav shell and data mapping separated from interactive state.
      - Desktop menu unit, mobile menu unit, CTA unit, and overlay/state hooks split into smaller modules.
      - Escape handling and scroll lock moved into focused hooks/utilities owned by the interactive layer.
  - Consolidate NavPressable and RippleCtaLink interaction logic.
      - Extract shared press behavior into one reusable primitive or hook for ripple, haptics, keyboard modality, tap throttling, and swipe-
        cancel handling.
      - Keep the visual wrappers separate only where styling/API truly differs.

  ### Public API / interface changes

  - StickyNav remains the stable entrypoint.
  - NavCardItem becomes explicit variants instead of one shape with optional visual fields.
  - Internal interactive pieces become private to the nav folder unless there is a real external consumer.

  ### Validation before checking off

  - Rerun the vercel-composition-patterns review against the nav folder and shared CTA/pressable files; checkpoint passes only if the current
    findings are cleared or intentionally reduced with no equivalent regressions.
  - Run npm run lint.
  - Run npm run build.
  - Run minimum browser validation on a non-3000 port, preferably 3005, and confirm the refactored nav still opens/closes, desktop dropdowns
    render, and one mobile nav interaction works.
  - Then mark Checkpoint 1 complete and stop for your commit.

  ## Checkpoint 2: Nav Contract, IA, and Broken-Link Plumbing

  Start only after your commit confirmation.

  ### Changes

  - Fix the universal CTA contract without creating a /pre-approval page.
      - Make nav CTA degrade safely when DrawerProvider is absent, or standardize provider placement so every StickyNav mount satisfies the
        contract.
      - Leave the current no-pre-approval-page constraint intact.
  - Standardize fixed-nav route structure.
      - Add skip link plus main#main-content to every route mounting StickyNav, including /about and /tow-truck-calculator.
  - Make desktop and mobile IA consistent.
      - Add stable desktop access to /about.
      - Decide top-level section behavior as real overview links plus submenu triggers, then implement consistently across breakpoints.
  - Replace misleading or broken destinations with truthful plumbing pages.
      - Create minimal header/footer route plumbing for missing nav targets:
          - /used-tow-truck-financing
          - /zero-down-tow-truck-financing
          - /fleet-financing
          - /deferred-payment-tow-truck-financing
          - /resources/how-much-does-a-tow-truck-cost
          - /resources/tow-truck-financing-companies
          - /resources/tow-truck-lease-vs-loan
          - /resources/section-179-tow-truck
      - If top-level overview links are added for IA consistency, also create minimal plumbing pages for:
          - /financing
          - /programs
          - /resources
      - Each plumbing page should contain only the shared nav, a simple heading section, and the shared footer.

  ### Validation before checking off

  - Rerun web-design-guidelines against the nav files and affected route files.
  - Rerun vercel-react-best-practices on the nav components if CTA/provider changes affect client boundaries.
  - Run npm run lint.
    link lands on #main-content.
  ## Checkpoint 3: Accessibility and React/Next Tightening

  ### Changes

  - Move the nav toward the target architecture: mostly server-rendered shell with small client islands.
      - Keep static shell, logo, phone link, and static link lists on the server side where practical.
      - Limit client code to menu state, overlay state, drawer integration, and optional motion.
  - Fix mobile drawer semantics.
      - Add dialog semantics, focus entry, focus containment strategy, and background inerting or equivalent interaction blocking.
  - Fix accordion semantics.
      - Add aria-controls and stable panel IDs for mobile accordion triggers and panels.
  - Tighten hot-path implementation details.
      - Replace transition-all with explicit transitions in components/ui/navigation-menu.tsx.
      - Narrow the Radix import path if the package supports it and bundle inspection confirms it is beneficial.

  ### Validation before checking off

  - Rerun vercel-react-best-practices on the nav and shared menu components.
  - Rerun web-design-guidelines on the same files and the affected routes.
  - Run npm run lint.
  - Run npm run build.
  - Browser-validate keyboard and screen-reader-adjacent behavior: menu open/close, Escape, focus movement, mobile overlay containment, and
    accordion relationships.

  ## Assumptions and defaults

  - Phase 1 is intentionally Composition Review only; the server/client boundary split is deferred to a later checkpoint.
  - No /pre-approval page will be created.
  - Missing nav destinations should get minimal route plumbing only, not real content.
  - Each checkpoint is considered incomplete until the named skill reviews are rerun after implementation, not just before.
  - After Checkpoint 1 validation, work stops until you commit and confirm that checkpoint is locked.



› i do not need /financing /resoruces or /program pages like you mentioned. Review the plan you just wrote and double check to make sure it
  addresses everything and make sure you have the exact file locations as well in this spec


• I’m tightening the spec against your constraint now: no overview pages for /financing, /programs, or /resources, and I’m rewriting the plan
  with exact target files so it can be executed step-by-step without extra decisions.

• Proposed Plan


  # Navigation Refactor Plan With Exact File Targets

  ## Summary

  This plan covers every issue in plans/misc/nav-code-review.md, split into checkpoints. Checkpoint 1 is Composition Review only, then stop
  and wait for your commit confirmation. No /financing, /programs, /resources, or /pre-approval page will be created.

  ## Checkpoint 1: Composition Review Only

  Status gate: implement, validate, rerun the composition skill, then stop.
  Status: [x] Complete

  ### Files to change

  - components/sections/nav/sticky-nav-rm/nav-data.ts
  - components/sections/nav/sticky-nav-rm/NavClient.tsx
  - components/sections/nav/sticky-nav-rm/NavPressable.tsx
  - components/sections/nav/sticky-nav-rm/StickyNav.tsx
  - components/sections/nav/sticky-nav-rm/index.ts
  - components/ui/ripple-cta-link/RippleCtaLink.tsx

  ### Changes

  - [x] Replace the mixed NavCardItem shape in components/sections/nav/sticky-nav-rm/nav-data.ts with an explicit discriminated union.
      - [x] One variant for image-backed items.
      - [x] One variant for icon-backed items.
      - [x] Remove imageSrcLight.
      - [x] Remove dead required icon data from image-only items.
  - [x] Break components/sections/nav/sticky-nav-rm/NavClient.tsx into smaller focused internal units.
      - [x] Separate desktop menu composition from mobile overlay composition.
      - [x] Separate CTA rendering from menu rendering.
      - [x] Move Escape and scroll-lock behavior into focused internal hooks or helpers.
      - [x] Keep the overall StickyNav contract stable.
  - [x] Consolidate duplicated press behavior from components/sections/nav/sticky-nav-rm/NavPressable.tsx and components/ui/ripple-cta-link/
    RippleCtaLink.tsx.
      - [x] Extract one shared press interaction primitive or hook for ripple, haptics, keyboard modality, touch swipe-cancel, and tap throttling.
      - [x] Keep styling APIs separate only where needed.
  - [x] Narrow the public surface in components/sections/nav/sticky-nav-rm/index.ts.
      - [x] Export only the intended top-level nav entrypoint and any types that must remain public.
      - [x] Stop exporting NavClient and raw section/item arrays unless another checked-in consumer requires them.

  ### Validation before checking off

  - [x] Rerun vercel-composition-patterns against:
      - components/sections/nav/sticky-nav-rm/NavClient.tsx
      - components/sections/nav/sticky-nav-rm/nav-data.ts
      - components/sections/nav/sticky-nav-rm/NavPressable.tsx
      - components/ui/ripple-cta-link/RippleCtaLink.tsx
  - [x] Run npm run lint.
  - [x] Run npm run build.
  - [x] Run browser validation on port 3005 and confirm:
      - [x] Desktop nav renders.
      - [x] At least one desktop dropdown works.
      - [x] Mobile menu opens/closes.
      - [x] At least one mobile nav link interaction works.
  - [x] Then mark Checkpoint 1 complete and stop for your commit.

  ## Checkpoint 2: Broken Destinations, CTA Contract, and Route Contract

  Start only after your commit confirmation.

  ### Files to change

  - components/sections/nav/sticky-nav-rm/nav-data.ts
  - components/sections/nav/sticky-nav-rm/NavClient.tsx
  - components/ui/pre-approval-drawer/DrawerContext.tsx
  - app/page.tsx
  - app/about/page.tsx
  - app/tow-truck-calculator/page.tsx

  ### New route files to create

  - app/used-tow-truck-financing/page.tsx
  - app/zero-down-tow-truck-financing/page.tsx
  - app/fleet-financing/page.tsx
  - app/deferred-payment-tow-truck-financing/page.tsx
  - app/resources/how-much-does-a-tow-truck-cost/page.tsx
  - app/resources/tow-truck-financing-companies/page.tsx
  - app/resources/tow-truck-lease-vs-loan/page.tsx
  - app/resources/section-179-tow-truck/page.tsx

  ### Changes

  - Replace the misleading Private Party -> / placeholder in components/sections/nav/sticky-nav-rm/nav-data.ts with a truthful destination.
      - Point it to one of the newly created plumbing routes.
  - Fix the broken primary CTA contract used by components/sections/nav/sticky-nav-rm/NavClient.tsx and components/ui/pre-approval-drawer/
    DrawerContext.tsx.
      - Make the CTA safe on routes without DrawerProvider, without creating a /pre-approval page.
      - Keep existing pre-approval drawer behavior where the provider exists.
  - Standardize every fixed-nav route to include the same skip-link and main#main-content contract already used on the homepage.
      - Update app/about/page.tsx.
      - Update app/tow-truck-calculator/page.tsx.
      - Adjust app/page.tsx only if CTA/provider wiring changes require it.
  - Create minimal plumbing pages for every nav destination that currently does not resolve.
      - Each new page should contain StickyNav, a skip link, main#main-content, a single heading section, and the shared footer.
      - Do not add real body content.

  ### Validation before checking off

  - Rerun web-design-guidelines against:
      - components/sections/nav/sticky-nav-rm/nav-data.ts
      - components/sections/nav/sticky-nav-rm/NavClient.tsx
      - components/ui/pre-approval-drawer/DrawerContext.tsx
      - app/page.tsx
      - app/about/page.tsx
      - app/tow-truck-calculator/page.tsx
      - All new plumbing route files.
  - Run npm run lint.
  - Run npm run build.
  - Browser-validate on 3005:
      - Every nav link resolves to a real page.
      - CTA behaves correctly on homepage, about, calculator, and an equipment financing page.
      - Skip link lands on #main-content on the fixed-nav routes.

  ## Checkpoint 3: IA Consistency, Accessibility, and React/Next Tightening

  ### Files to change

  - components/sections/nav/sticky-nav-rm/NavClient.tsx
  - components/sections/nav/sticky-nav-rm/StickyNav.tsx
  - components/sections/nav/sticky-nav-rm/nav-data.ts
  - components/ui/navigation-menu.tsx

  ### Changes

  - Make desktop and mobile information architecture consistent in components/sections/nav/sticky-nav-rm/NavClient.tsx.
      - Add stable desktop access to /about.
      - Do not add /financing, /programs, or /resources overview pages.
      - Keep top-level sections as triggers if they remain trigger-only, but ensure breakpoint parity for the actual nav options.
  - Fix mobile accordion semantics in components/sections/nav/sticky-nav-rm/NavClient.tsx.
      - Add stable panel IDs.
      - Add aria-controls.
  - Upgrade mobile overlay semantics in components/sections/nav/sticky-nav-rm/NavClient.tsx.
      - Treat it as a dialog/drawer with appropriate semantics.
      - Add focus entry and focus containment behavior.
      - Prevent background interaction while open.
  - Move the nav toward the target “mostly server, small client islands” architecture using components/sections/nav/sticky-nav-rm/
    StickyNav.tsx as the boundary point.
      - Keep static shell, logo, phone link, and static link data server-rendered where practical.
      - Keep only menu state, overlay state, drawer integration, and optional motion in client code.
  - Tighten shared menu implementation in components/ui/navigation-menu.tsx.
      - Replace transition-all with explicit transition properties.
      - Narrow the Radix import path if supported and beneficial.

  ### Validation before checking off

  - Rerun vercel-react-best-practices against:
      - components/sections/nav/sticky-nav-rm/StickyNav.tsx
      - components/sections/nav/sticky-nav-rm/NavClient.tsx
      - components/sections/nav/sticky-nav-rm/nav-data.ts
      - components/ui/navigation-menu.tsx
  - Rerun web-design-guidelines on the same files.
  - Run npm run lint.
  - Run npm run build.
  - Browser-validate on 3005:
      - Keyboard open/close works.
      - Escape closes the mobile overlay.
      - Focus enters and stays contained while the mobile overlay is open.
      - Desktop/mobile nav options are consistent.
  ## Coverage Check Against The Review
  This spec covers every issue from plans/misc/nav-code-review.md:

  - Composition issues:
      - mixed NavCardItem API
      - monolithic NavClient
      - duplicated pressable primitives
      - overly broad nav exports
  - React/Next issues:
      - oversized client boundary
      - unnecessary serialized visual fields
      - transition-all
      - Radix aggregate import review
  - Web/interface issues:
      - misleading Private Party destination
      - missing aria-controls
      - desktop/mobile IA mismatch for /about
      - broken CTA contract on routes without DrawerProvider
      - missing skip-link and main#main-content contract
      - mobile overlay semantics and focus/inert behavior
  - Broken route coverage:
      - all currently missing href targets in nav data get route plumbing
  - Explicit exclusions:
      - no /pre-approval page
      - no /financing, /programs, or /resources overview pages

  ## Assumptions

  - Checkpoint 1 ends after composition validation and before any route plumbing or CTA contract work.
  - New plumbing pages should follow the repo’s existing page structure using the shared nav and footer components.
  - If any later skill rerun produces additional findings outside the original review, those findings must be resolved before that checkpoint
    is checked off.
