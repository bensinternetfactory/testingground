# Dependency Transfer Matrix

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Scope:** Every dependency used by in-scope code under `app/(marketing)` and its transitive imports.

---

## Legend

**Dependency types:**
- `npm` — npm package
- `component` — internal component
- `hook` — React hook
- `util` — utility/lib function
- `provider` — provider/context
- `type` — TypeScript type/schema/interface
- `backend` — backend/data access
- `env` — environment variable
- `style` — style/design token/CSS
- `middleware` — middleware/auth/session
- `analytics` — analytics/telemetry
- `asset` — static file/image in `public/`
- `test` — test dependency

**Dispositions:**
- **Transfer unchanged** — copy as-is, no modification expected
- **Transfer with adaptation** — copy, then adapt imports/paths/integration in destination
- **Map to existing** — destination likely has an equivalent; map rather than duplicate
- **Reimplement** — must be rebuilt to fit destination architecture
- **Defer** — not required for smallest viable unit; transfer later
- **Blocker** — cannot proceed until resolved

---

## npm Packages

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `next` (16.1.6) | npm | Framework — App Router, `next/link`, `next/font/google`, `next/image` | Direct | Map to existing | Destination has Next.js 15; source uses only stable APIs (`next/link`, `next/image`, `next/font/google`, `next/navigation`, `next/dynamic`) — all present in 15. No Next.js 16-only APIs used. Version upgrade optional. | Build failure if 16-only API used (none found) | Phase 5 build verification |
| `react` / `react-dom` (19.2.3) | npm | All components | Direct | Map to existing | Destination already has React | Hooks, RSC, or concurrent features may differ | `package.json` version check |
| `framer-motion` (^12.34.0) | npm | `features/cta/client.tsx`, `lib/press-feedback.tsx`, `features/pre-approval/drawer/ui/` | Direct | Transfer unchanged or map to existing | If destination has framer-motion, align versions; if not, add | Animation breaks, CTA press feedback non-functional | Import resolution check; render test of CtaLink |
| `web-haptics` (^0.0.6) | npm | `lib/press-feedback.tsx` | Direct | Transfer unchanged | Niche package; destination unlikely to have it | Haptic feedback silently fails (graceful degradation — error is caught) | `npm ls web-haptics` |
| `clsx` (^2.1.1) | npm | `lib/utils.ts` | Direct | Map to existing | Common utility; destination may already have it | `cn()` breaks → all conditional classes fail | Check `package.json` |
| `tailwind-merge` (^3.4.1) | npm | `lib/utils.ts` | Direct | Map to existing | Common with Tailwind setups | Class merging fails → visual regressions | Check `package.json` |
| `class-variance-authority` (^0.7.1) | npm | `components/ui/Button.tsx` | Direct | Map to existing | Common with shadcn/ui setups | Button variant system breaks | Check `package.json` |
| `radix-ui` (^1.4.3) | npm | `components/ui/navigation-menu.tsx` (re-exports `@radix-ui/react-navigation-menu`) | Direct | Map to existing | Source monorepo re-exports individual packages. Only `@radix-ui/react-navigation-menu` is imported by in-scope code. Destination uses individual `@radix-ui/react-*` packages but lacks `react-navigation-menu`. Install `@radix-ui/react-navigation-menu` in destination. | Navigation menu non-functional | `npm ls @radix-ui/react-navigation-menu` after install |
| `lucide-react` (^0.564.0) | npm | Various section components | Direct | Map to existing | Common icon library | Missing icons → render errors | Check `package.json`; icon name availability |
| `tailwindcss` (^4) | npm | Build-time | Direct | Map to existing — version critical | Destination may use v3; v4 uses fundamentally different config model | All styling breaks if version mismatch | Check version; inspect config approach |
| `@tailwindcss/postcss` (^4) | npm | `postcss.config.mjs` | Direct | Map to existing | Required for Tailwind v4 PostCSS pipeline | Build fails | Check `postcss.config.*` |
| `tw-animate-css` (^1.4.0) | npm | `globals.css` @import | Direct | Transfer unchanged | Animation utility; unlikely to conflict | Missing marquee/accordion animations | Check if package exists in destination |
| `shadcn` (^3.8.4) | npm | Dev-time scaffolding | Dev | Defer | Not a runtime dependency | None at runtime | N/A |

---

## Internal Components

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `StickyNav` | component | Homepage, all page shells, MinimalNavPage | Direct | Transfer unchanged | Core navigation; no external dependencies beyond CTA/pre-approval | No site navigation; broken UX | Renders in browser; links functional |
| `HeroGallery` | component | Homepage | Direct | Transfer unchanged | Config-driven hero with image gallery | Homepage hero missing | Visual render check |
| `HeroLeadGen` | component | ProgramPageShell (programs) | Direct | Transfer unchanged | Hero with lead-gen form pattern | Program page heroes missing | Visual render check |
| `HeroConvertFramed` (+ variants) | component | EquipmentFinancingPageShell | Direct | Transfer unchanged | 4 framed hero variants: base, TileRight, PrimaryOnly, Outline | Financing page heroes missing | Visual render check per variant |
| `HeroConvert` (geico variant) | component | EquipmentFinancingPageShell (tile-right kind) | Direct | Transfer unchanged | Tile selector hero | Missing hero on applicable financing pages | Visual render check |
| `EquipmentCards` | component | Homepage | Direct | Transfer unchanged | Equipment type card grid | Homepage section missing | Visual render check |
| `ProgramCards` | component | Homepage | Direct | Transfer unchanged | Program card grid | Homepage section missing | Visual render check |
| `BrandMarquee` | component | Homepage, EquipmentFinancingPageShell | Direct | Transfer unchanged | Manufacturer logo marquee; has custom CSS | Missing brand social proof section | Visual render; animation check |
| `HowItWorks` | component | Homepage | Direct | Transfer unchanged | Process steps section | Homepage section missing | Visual render check |
| `TestimonialMarquee` | component | Homepage | Direct | Transfer unchanged | Testimonial carousel; has custom CSS | Missing testimonial section | Visual render; animation check |
| `MiniROI` | component | Homepage | Direct | Transfer unchanged | Interactive ROI calculator widget | Homepage calculator missing | Interactive test |
| `TruckGalleryHeroLeft` / `Right` | component | Homepage | Direct | Transfer unchanged | Truck photo galleries | Homepage gallery sections missing | Visual render check |
| `ResourceHub` | component | Homepage | Direct | Transfer unchanged | Resource links section | Homepage section missing | Visual render check |
| `FaqSection` | component | Homepage, all page shells | Direct | Transfer unchanged | FAQ accordion | FAQ sections missing across all pages | Visual render; expand/collapse check |
| `ClosingCta` | component | Homepage | Direct | Transfer unchanged | Closing CTA with benefits grid; uses LeadCta/CtaLink | Homepage closing section missing; CTA non-functional | Visual render; CTA click test |
| `Footer` | component | Homepage, all page shells, MinimalNavPage | Direct | Transfer unchanged | Site footer | No footer on any page | Visual render check |
| `Calculator` | component | `/tow-truck-calculator` | Direct | Transfer unchanged | Interactive financial calculator | Calculator page non-functional | Interactive test |
| `FinancingOffersSplit` | component | EquipmentFinancingPageShell | Direct | Transfer unchanged | Financing offer comparison | Missing section on financing pages | Visual render check |
| `PurchaseAndTermsSection` | component | EquipmentFinancingPageShell | Direct | Transfer unchanged | Purchase/terms details | Missing section on financing pages | Visual render check |
| `TertiaryActionsStrip` | component | EquipmentFinancingPageShell | Direct | Transfer unchanged | Tertiary action links | Missing strip on financing pages | Visual render check |
| `ContentImageSplit` | component | EquipmentFinancingPageShell | Direct | Transfer unchanged | Content + image layout | Missing section on applicable pages | Visual render check |
| `FinancingFootnotes` | component | EquipmentFinancingPageShell | Direct | Transfer unchanged | Legal footnotes | Missing footnotes | Visual render check |
| `EquipmentClosingCta` | component | EquipmentFinancingPageShell, ProgramPageShell | Direct | Transfer unchanged | Equipment-specific closing CTA | Missing closing CTA on equipment/program pages | Visual render check |
| `RelatedLinksStrip` | component | EquipmentFinancingPageShell | Direct | Transfer unchanged | Related page links | Missing navigation strip | Visual render check |
| `ProgramPageShell` | component | All program pages | Direct | Transfer unchanged | Orchestration shell for program pages | All program pages broken | Full page render check |
| `EquipmentFinancingPageShell` | component | All financing pages | Direct | Transfer unchanged | Orchestration shell for financing pages | All financing pages broken | Full page render check |
| `MinimalNavPage` | component | About + 4 resource pages | Direct | Transfer unchanged | Thin page shell | 5 pages broken | Visual render check |
| `ProgramSectionRenderer` | component | ProgramPageShell | Indirect | Transfer unchanged | Dynamic block renderer for program sections | Program page content missing | Render check via parent shell |
| `BlogLayout` | component | ProgramPageShell | Indirect | Transfer unchanged | Two-column article layout | Program page layout broken | Render check via parent shell |
| `ArticleSidebar` | component | ProgramPageShell | Indirect | Transfer unchanged | TOC sidebar + CTA | Program sidebar missing | Render check via parent shell |
| `SidebarCta` | component | ArticleSidebar | Indirect | Transfer unchanged | Sidebar call-to-action | Missing sidebar CTA | Render check via parent |
| `ProgramBottomLinks` | component | ProgramPageShell | Indirect | Transfer unchanged | Related programs strip | Missing bottom links on program pages | Render check via parent shell |
| `JsonLd` | component | Homepage, all page shells | Direct | Transfer unchanged | `<script type="application/ld+json">` injection | Missing structured data (SEO impact, not visual) | View page source for JSON-LD scripts |
| Button (UI) (`components/ui/Button.tsx`) | component | **Zero imports** — dead code | Indirect | **Exclude from transfer** | Source `Button.tsx` (uppercase) has zero imports anywhere in codebase. Destination has `button.tsx` (lowercase, shadcn). macOS case-insensitive FS collision. Dead code — safe to exclude. | N/A — unused | N/A |
| Container (UI) | component | Various sections | Indirect | Transfer unchanged | Max-width layout wrapper | Layout width unconstrained | Visual render check |
| `navigation-menu` (UI) | component | StickyNav | Indirect | Transfer unchanged | Radix navigation menu primitive | Desktop nav non-functional | Navigation interaction test |
| Truck icon components (`app/truckicons/`) | component | Hero tiles in financing configs | Indirect | Transfer unchanged | SVG icon components (Rollback, Wrecker, Rotator, HeavyWrecker) | Missing icons in hero tile selectors | Visual render check on financing heroes |
| Program section blocks (11 files) | component | ProgramSectionRenderer | Indirect | Transfer unchanged | ContentSectionBlock, ComparisonTableBlock, FeatureGridBlock, etc. | Program page content blocks missing | Render each block type via program pages |

---

## Features / Hooks / Runtime

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `CtaLink` | component | ~20 sections, page shells, nav | Direct | Transfer unchanged | Canonical CTA button-link with framer-motion press feedback | All primary CTAs non-functional | Click test; visual render; press animation |
| `LeadCta` | component | ClosingCta, SidebarCta, hero variants, nav | Direct | Transfer unchanged | Pre-approval entry CTA; extends CtaLink | Pre-approval entry points broken | Click test; drawer open verification |
| `PreApprovalDrawerRoot` | provider | `app/(marketing)/layout.tsx` | Direct | Transfer with adaptation | Must be mounted in destination's marketing layout; depends on portal div | Drawer never opens; all LeadCta clicks fail silently | Mount in layout; trigger drawer open; verify render |
| `useOpenPreApproval` | hook | Internal to drawer runtime | Indirect | Transfer unchanged | Programmatic drawer open | Drawer cannot be opened programmatically | Test via DrawerHashListener behavior |
| `usePreApprovalSession` | hook | Internal to drawer runtime | Indirect | Transfer unchanged | Session state access | Drawer state inaccessible | Test via drawer interaction |
| `DrawerHashListener` | component | PreApprovalDrawerRoot | Indirect | Transfer unchanged | Listens to `#get-pre-approved` hash and `data-pre-approval-*` attributes | Hash-based drawer entry broken | Navigate to `#get-pre-approved`; verify drawer opens |
| `RouteResetListener` | component | PreApprovalDrawerRoot | Indirect | Transfer unchanged | Resets drawer on route change | Drawer stays open across navigations | Navigate away while drawer open; verify close |
| Scroll lock utilities | util | PreApprovalDrawerView | Indirect | Transfer unchanged | Body scroll prevention when drawer open | Background scrolls behind open drawer | Open drawer; try scrolling body |
| `usePressFeedback` | hook | CtaLink, LeadCta, NavPressable | Indirect | Transfer unchanged | Touch/mouse/keyboard press feedback with haptics | Press animations missing; minor UX regression | Press CTA; observe ripple and haptic |
| `PressFeedbackRipple` | component | CtaLink, NavPressable | Indirect | Transfer unchanged | Ripple animation overlay | Visual press feedback missing | Press CTA; observe ripple |
| Pre-approval trigger attributes | type/contract | CTA configs, section configs | Indirect | Transfer unchanged | `data-pre-approval-*` HTML attribute contract for hash listener | Drawer opens without correct context (origin, truck type) | Inspect element attributes after render |
| Pre-approval routes | util | Drawer continue action, CTA factories | Indirect | Transfer unchanged | `buildPreApprovalHref()`, `parsePreApprovalSearchParams()` | Drawer handoff navigates to wrong URL | Trigger continue in drawer; verify URL |
| Pre-approval selection | util | Hero tile configs | Indirect | Transfer unchanged | `resolvePreApprovalSelectionTrigger()` for tile → truck-type mapping | Selected tile doesn't set correct truck type | Select tile in hero; open drawer; verify truck type |
| `createPreApprovalEntry()` | util | Section configs | Indirect | Transfer unchanged | Factory for `PreApprovalEntry` objects | CTA config construction fails at build time | TypeScript compilation check |
| `buildPreApprovalTriggerAttributes()` | util | CTA rendering | Indirect | Transfer unchanged | Converts trigger → HTML data attributes | Data attributes missing → hash listener can't parse | Inspect rendered CTA element attributes |

---

## Utilities / Lib

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `cn()` (lib/utils.ts) | util | ~50+ components | Direct | Transfer unchanged or map to existing | If destination has `cn()`, use theirs; if not, transfer | All conditional class composition breaks → visual regressions | Import resolution; spot-check class output |
| `deriveToc()` | util | ProgramPageShell | Indirect | Transfer unchanged | Derives table of contents from section config | Program page TOC missing | Render program page; verify TOC links |
| `buildFaqSchema()` | util | FaqSection | Indirect | Transfer unchanged | Generates FAQ JSON-LD from config | Missing FAQ structured data | View page source |
| Calculator data (`calculator-data.ts`) | util | Calculator component | Indirect | Transfer unchanged | Financial calculation data/formulas | Calculator shows wrong results | Interactive calculator test |

---

## Types / Schemas / Configs

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `ProgramPageConfig` | type | Program page configs, ProgramPageShell | Direct | Transfer unchanged | Config contract for program pages | TypeScript errors | `tsc --noEmit` |
| `EquipmentFinancingPageConfig` | type | Financing page configs, EquipmentFinancingPageShell | Direct | Transfer unchanged | Config contract for financing pages | TypeScript errors | `tsc --noEmit` |
| `PreApprovalTrigger` | type | CTA configs, section configs, drawer runtime | Direct | Transfer unchanged | Core pre-approval trigger contract | TypeScript errors; runtime mismatches | `tsc --noEmit` |
| `PreApprovalEntry` | type | LeadCta, section configs | Direct | Transfer unchanged | Entry point contract for pre-approval | TypeScript errors | `tsc --noEmit` |
| `PreApprovalSession` | type | Drawer runtime | Indirect | Transfer unchanged | Session state shape | TypeScript errors | `tsc --noEmit` |
| `PreApprovalEvent` | type | Drawer runtime, onEvent callback | Indirect | Transfer unchanged | Event contract for analytics integration | TypeScript errors | `tsc --noEmit` |
| `CtaCopy`, `CtaAppearance` | type | CTA configs | Indirect | Transfer unchanged | CTA styling/copy contracts | TypeScript errors | `tsc --noEmit` |
| Section config types (per section) | type | Each section's `config.ts` | Indirect | Transfer unchanged | Content/layout contracts per section | TypeScript errors | `tsc --noEmit` |
| Route-level config files (8 files) | type | Program + financing page.tsx files | Direct | Transfer unchanged | Page content definitions | Pages render empty shells | Render each page |
| Shared financing config (`shared-config.ts`) | type | Financing config files | Indirect | Transfer unchanged | Reusable financing config utilities | Config construction fails | TypeScript check |

---

## Styles / Design Tokens

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `globals.css` brand tokens | style | All components via Tailwind | Direct | Transfer with adaptation | Same variable names in both repos (`--primary`, `--background`, etc.). Source uses TowLoans brand hex values; destination uses generic shadcn oklch values. Since destination IS the TowLoans app, source brand values should replace destination generic values globally. `--nav-height` must be added. Marquee keyframes and `.calculator-grid-bg` must be added. Source has `@import "shadcn/tailwind.css"` — destination does not; add it. | Wrong colors if values not reconciled; missing animations | Visual spot-check after globals.css merge |
| `globals.css` animations | style | BrandMarquee, TestimonialMarquee | Direct | Transfer with adaptation | `@keyframes marquee-left`, `marquee-up` with CSS variables | Marquee animations frozen | Visual animation check |
| `calculator-grid-bg` utility | style | Calculator page | Direct | Transfer with adaptation | Custom dot-grid background class | Calculator background plain | Visual render check |
| Geist font (`next/font/google`) | style | Root layout | Direct | Map to existing | Destination already loads Geist and Geist_Mono with identical CSS variable names (`--font-geist-sans`, `--font-geist-mono`). No adaptation needed. | N/A — already present | Verify font rendering |
| `sticky-nav-rm/sticky-nav.css` | style | StickyNav | Indirect | Transfer unchanged | Custom nav CSS | Nav styling broken | Visual render check |
| `hero-showcase-rm/hero-showcase.css` | style | HeroShowcase | Indirect | Transfer unchanged | Custom hero CSS | Hero styling broken | Visual render check |
| `brand-marquee/brand-marquee.css` | style | BrandMarquee | Indirect | Transfer unchanged | Marquee-specific CSS | Marquee styling broken | Visual render check |
| `testimonial-marquee/testimonial-marquee.css` | style | TestimonialMarquee | Indirect | Transfer unchanged | Testimonial marquee CSS | Marquee styling broken | Visual render check |
| `features/pre-approval/amount-slider.css` | style | AmountSlider | Indirect | Transfer unchanged | Slider track/thumb styling | Slider visually broken | Visual render check |
| Reduced motion media queries | style | globals.css | Indirect | Transfer with adaptation | Accessibility: disables animations when `prefers-reduced-motion` | Animations play for users who need reduced motion | Test with reduced motion preference |
| Dark mode variant | style | globals.css | Indirect | Transfer with adaptation | `@custom-variant dark (&:is(.dark *))` | Dark mode tokens applied incorrectly or not at all | Toggle dark mode; verify colors |
| `2xl` section containment classes | style | All `<section>` and `<footer>` elements | Direct | Transfer unchanged | `2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x ...` convention | Sections expand past 1536px on ultra-wide screens | Resize browser to >1536px |

---

## Assets / Static Files

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `public/brand-assets/benefit-icons/**` | asset | ClosingCta, section configs | Direct | Transfer unchanged | ~30 benefit icon variants (SVG) | Broken images in CTA/benefit sections | Visual render check |
| `public/brand-assets/logo/**` | asset | StickyNav, Footer | Direct | Transfer unchanged | TowLoans logos (SVG): dark, light, green hook | Missing logos in nav/footer | Visual render check |
| `public/brand-assets/manufacturers/**` | asset | BrandMarquee | Direct | Transfer unchanged | 16 manufacturer logos | Missing logos in marquee | Visual render check |
| `public/brand-assets/favicon/**` | asset | Metadata/head | Direct | Transfer with adaptation | Favicon PNGs | Wrong or missing favicon | Browser tab check |
| `public/brand-assets/source-icons/**` | asset | PurchaseSourceGrid | Direct | Transfer unchanged | 4 purchase source placeholder icons | Missing icons | Visual render check |
| `public/brand-assets/truck-icons/**` | asset | Hero tile selectors, equipment cards, nav | Direct | Transfer unchanged | 15 SVGs across 4 types (rollback, wrecker, rotator, heavywrecker) in dark/green/light variants | Missing icons in hero tiles | Visual render check |
| `public/truck-*.jpg` | asset | TruckGallery, hero sections | Direct | Transfer unchanged | 15 truck photos (JPG) | Missing gallery images | Visual render check |
| `public/*.svg` (root-level) | asset | Various | Direct | Transfer only if referenced | 5 SVGs at public root | Broken images if referenced | Trace references |

---

## Environment Variables

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `NEXT_PUBLIC_MINI_ROI_DEBUG` | env | `MiniROI` component | Direct | Defer | Debug flag; defaults to off; not required for production | No impact if absent | N/A |

---

## Backend / Data Access

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| (none) | — | — | — | — | Source has no database, API routes, or backend data access | — | Verify no `route.ts` files exist in marketing routes |

**Verified:** No `route.ts` or `route.tsx` files exist under `app/(marketing)`. The source is purely static/client-side.

---

## Middleware / Auth / Session

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| (none) | — | — | — | — | Source has no `middleware.ts` and no auth/session model | — | Confirm no `middleware.ts` at source root |

**Verified:** No `middleware.ts` exists at the source root. The destination's middleware/auth must be checked for compatibility — it must not block the transferred marketing routes.

---

## Analytics / Telemetry

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `analytics` prop contract | analytics | CtaLink, LeadCta (prop: `analytics.legacySection`) | Indirect | Transfer unchanged | Prop exists in component interface but no global analytics integration in source | No impact if destination has no analytics; may need wiring if it does | Check if destination has analytics; wire if present |
| `PreApprovalEvent` | analytics | `PreApprovalDrawerRoot` `onEvent` callback | Indirect | Transfer unchanged | Event contract exists; no consumer in source | Events fire but no handler processes them | Check if destination wants to consume these events |

---

## Test Dependencies (inventory only)

| Dependency | Type | Used by | Direct? | Disposition | Rationale | Failure mode | Verification |
|---|---|---|---|---|---|---|---|
| `vitest` (^4.0.18) | test | All test files | Dev | Defer | Test infrastructure; destination may use different framework | Tests don't run | Phase 6+ if tests are transferred |
| `@testing-library/react` (^16.3.2) | test | Component tests | Dev | Defer | Test renderer | Tests don't run | Phase 6+ |
| `@testing-library/jest-dom` (^6.9.1) | test | Assertion matchers | Dev | Defer | Custom matchers | Tests don't run | Phase 6+ |
| `@testing-library/user-event` (^14.6.1) | test | Interaction tests | Dev | Defer | User event simulation | Tests don't run | Phase 6+ |
| `happy-dom` (^20.8.9) | test | DOM environment | Dev | Defer | Test DOM | Tests don't run | Phase 6+ |
| `jsdom` (^29.0.1) | test | Alternative DOM | Dev | Defer | Test DOM | Tests don't run | Phase 6+ |
