# Copy Manifest

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Purpose:** Defines the physical file transfer bundle for the destination repo. This is the authoritative source for what to copy, what to exclude, and what requires post-copy reconciliation.

---

## Transfer Method

The expected transfer method is **manual folder/file copying** from the source repo into the destination repo's migration branch. Files should preserve their source-relative paths during initial copy; import and integration adaptation happens afterward in the destination.

---

## Copy As-Is First

These files and directories should be copied preserving their source-relative paths. They are required for the smallest viable transfer unit or are foundational dependencies.

| Source path | Preserve relative path? | Required for smallest viable unit? | Why included | What breaks if omitted |
|---|---|---|---|---|
| `features/cta/` | Yes | Yes | Canonical CTA components (CtaLink, LeadCta) + contracts + lead-entry factory | Every CTA on every page is non-functional |
| `features/pre-approval/` | Yes | Yes | Drawer runtime, session, hash listener, UI, contracts, selection, routes | Pre-approval drawer never opens; all LeadCta entry points fail |
| `lib/utils.ts` | Yes | Yes | `cn()` utility — used by ~50+ components | All conditional Tailwind class composition breaks |
| `lib/press-feedback.tsx` | Yes | Yes | Press feedback hook + ripple — used by CTA and nav | Press animations missing; minor UX degradation |
| `components/shared/JsonLd.tsx` | Yes | Yes | JSON-LD structured data injection | Missing structured data on all pages (SEO) |
| `components/ui/Button.tsx` | Yes | Yes | Polymorphic button/anchor with CVA variants | Button rendering breaks in sections that use it |
| `components/ui/Container.tsx` | Yes | Yes | Max-width layout wrapper | Layout width unconstrained in sections |
| `components/ui/navigation-menu.tsx` | Yes | Yes | Radix navigation menu primitive | Desktop nav dropdown non-functional |
| `components/sections/nav/sticky-nav-rm/` | Yes | Yes | Sticky navigation with mobile overlay + custom CSS | No site navigation |
| `components/sections/page/footer/` | Yes | Yes | Site footer component + config | No footer on any page |
| `components/sections/page/faq/` | Yes | Yes | FAQ accordion section + schema builder | FAQ sections missing across all pages |
| `components/sections/page/closing-cta/` | Yes | Yes | Closing CTA section with benefits grid | Homepage closing section missing |
| `app/truckicons/` | Yes | Yes | SVG truck icon components (Rollback, Wrecker, Rotator, HeavyWrecker) | Missing icons in hero tile selectors |
| `app/(marketing)/_components/MinimalNavPage.tsx` | Yes | Yes | Minimal page shell — used by 5 pages | 5 pages broken |

---

## Copy As-Is — Section Components

These are the section components imported by in-scope pages. Copy the entire directory for each.

| Source path | Preserve relative path? | Required for smallest viable unit? | Why included | What breaks if omitted |
|---|---|---|---|---|
| `components/sections/page/equipment-cards/` | Yes | Yes (homepage) | Equipment card grid | Homepage section missing |
| `components/sections/page/program-cards/` | Yes | Yes (homepage) | Program card grid | Homepage section missing |
| `components/sections/page/brand-marquee/` | Yes | Yes (homepage + financing) | Manufacturer logo marquee + custom CSS | Brand social proof section missing |
| `components/sections/page/how-it-works/` | Yes | Yes (homepage) | Process steps section | Homepage section missing |
| `components/sections/page/testimonial-marquee/` | Yes | Yes (homepage) | Testimonial carousel + custom CSS | Testimonial section missing |
| `components/sections/page/mini-roi/` | Yes | Yes (homepage) | Interactive ROI calculator widget | Homepage calculator missing |
| `components/sections/page/truck-gallery/` | Yes | Yes (homepage) | Truck photo galleries (left + right variants) | Homepage gallery sections missing |
| `components/sections/page/resource-hub/` | Yes | Yes (homepage) | Resource links section | Homepage section missing |
| `components/sections/page/equipment-closing-cta/` | Yes | Phase 5+ (financing/programs) | Equipment-specific closing CTA | Missing closing CTA on equipment/program pages |
| `components/sections/page/financing-offers-split/` | Yes | Phase 5+ (financing) | Financing offer comparison | Financing pages missing offers section |
| `components/sections/page/purchase-and-terms/` | Yes | Phase 5+ (financing) | Purchase/terms details | Financing pages missing terms section |
| `components/sections/page/tertiary-strip/` | Yes | Phase 5+ (financing) | Tertiary action links | Financing pages missing action strip |
| `components/sections/page/content-image-split/` | Yes | Phase 5+ (financing) | Content + image layout | Applicable financing pages missing section |
| `components/sections/page/financing-footnotes/` | Yes | Phase 5+ (financing) | Legal footnotes | Financing pages missing footnotes |
| `components/sections/page/related-links-strip/` | Yes | Phase 5+ (financing) | Related page links | Financing pages missing related links |
| `components/sections/page/proof-block/` | Yes | Phase 5+ (if referenced) | Trust/proof section | Missing proof section |
| `components/sections/page/purchase-source-grid/` | Yes | Phase 5+ (if referenced) | Purchase source grid | Missing grid section |
| `components/sections/page/equipment-deals/` | Yes | Phase 5+ (if referenced) | Equipment deals section | Missing deals section |
| `components/sections/page/term-length-slider/` | Yes | Phase 5+ (if referenced) | Term length slider | Missing slider section |

---

## Copy As-Is — Hero Components

| Source path | Preserve relative path? | Required for smallest viable unit? | Why included | What breaks if omitted |
|---|---|---|---|---|
| `components/sections/heroes/hero-gallery/` | Yes | Yes (homepage) | Homepage hero with gallery | Homepage hero missing |
| `components/sections/heroes/hero-lead-gen/` | Yes | Phase 5+ (programs) | Program page hero with lead gen | Program page heroes missing |
| `components/sections/heroes/hero-convert-framed/` | Yes | Phase 5+ (financing) | 4 framed hero variants for financing pages | Financing page heroes missing |
| `components/sections/heroes/hero-convert-geico/` | Yes | Phase 5+ (financing) | Tile selector hero | Applicable financing heroes missing |
| `components/sections/heroes/hero-showcase-rm/` | Yes | Defer — verify if referenced | Showcase hero variant + custom CSS | Only if referenced by in-scope pages |

---

## Copy As-Is — Route Files and Page Shells

| Source path | Preserve relative path? | Required for smallest viable unit? | Why included | What breaks if omitted |
|---|---|---|---|---|
| `app/(marketing)/page.tsx` | Yes | Yes | Homepage | Homepage 404 |
| `app/(marketing)/layout.tsx` | Yes — adapt integration | Yes | PreApprovalDrawerRoot mount | Drawer context missing for all marketing pages |
| `app/(marketing)/loading.tsx` | Yes | Yes | Homepage loading skeleton | No loading UI |
| `app/(marketing)/error.tsx` | Yes | Yes | Marketing error boundary | Unhandled errors crash page |
| `app/(marketing)/about/page.tsx` | Yes | Phase 6 | About page | About page 404 |
| `app/(marketing)/(programs)/` (entire directory) | Yes | Phase 6 | All program pages + shell + blocks + configs | All program pages 404 |
| `app/(marketing)/(financing)/` (entire directory) | Yes | Phase 6 | All financing pages + shell + configs | All financing pages 404 |
| `app/(marketing)/(resources)/` (entire directory) | Yes | Phase 6 | Calculator + resource pages | All resource pages 404 |
| `app/(marketing)/__tests__/` | Yes | Defer | Route-level test files | Tests don't run (no runtime impact) |
| `components/sections/calculator/` | Yes | Phase 6 (calculator page) | ROI calculator component + data | Calculator page non-functional |

---

## Copy As-Is — Public Assets

| Source path | Preserve relative path? | Required for smallest viable unit? | Why included | What breaks if omitted |
|---|---|---|---|---|
| `public/brand-assets/benefit-icons/` | Yes | Yes | Benefit icons used in CTA/section configs | Broken images |
| `public/brand-assets/logo/` | Yes | Yes | TowLoans logos (nav, footer) | Missing logos |
| `public/brand-assets/manufacturers/` | Yes | Yes (homepage) | Manufacturer logos for BrandMarquee | Missing marquee logos |
| `public/brand-assets/favicon/` | Yes | Phase 5+ (adapt) | Favicon PNGs | Missing/wrong favicon |
| `public/brand-assets/source-icons/` | Yes | Phase 6 (if referenced) | Purchase source placeholders | Missing icons |
| `public/brand-assets/truck-icons/` | Yes | Yes | Truck type icon variants — 15 SVGs across 4 types (rollback, wrecker, rotator, heavywrecker) | Missing hero tile icons |
| `public/truck-*.jpg` and `public/truck-*.png` | Yes | Yes (homepage) | Truck photo gallery images | Broken gallery images |

---

## Do Not Copy Blindly

These items must NOT be copied as-is. They require destination-specific handling.

| Source path | Reason | What to do instead |
|---|---|---|
| `app/layout.tsx` | Destination has its own root layout with Convex providers, auth, fonts | Merge required elements: `<div id="pre-approval-drawer-root" />` portal, Geist font variables, relevant metadata — into destination's existing root layout |
| `app/globals.css` | Destination has its own theme/CSS | Extract source-specific tokens and animations; merge into destination globals without overwriting destination theme. Namespace if needed |
| `app/global-error.tsx` | Destination may have its own global error boundary | Compare; adopt source version only if destination has none, or merge error handling |
| `app/not-found.tsx` | Destination may have its own 404 page | Compare; adopt source version only if destination has none |
| `package.json` | Destination has its own dependencies | Add missing packages from dependency matrix; do NOT overwrite destination package.json |
| `tsconfig.json` | Destination has its own TypeScript config | Verify `@/*` alias compatibility; do NOT overwrite |
| `next.config.ts` | Destination has its own Next.js config | Merge `experimental.optimizePackageImports` if needed; do NOT overwrite |
| `postcss.config.mjs` | Destination may have different PostCSS setup | Verify Tailwind PostCSS plugin compatibility; do NOT overwrite |
| `components.json` | Destination may have its own shadcn config | Compare style, base color, aliases; do NOT overwrite |

---

## Copy Only If Referenced by Traced Dependencies

These items should only be included if dependency tracing confirms they are used by in-scope code.

| Source path | How to verify | Likely needed? |
|---|---|---|
| `components/sections/heroes/hero-showcase-rm/` | Grep for `HeroShowcase` import in in-scope page/shell files | Unlikely — appears to be an unused variant |
| `public/*.svg` (root-level: `file.svg`, `globe.svg`, `next.svg`, `window.svg`, `towloansdark.svg`) | Grep for each filename in in-scope files | `towloansdark.svg` likely needed; others likely not |
| `lib/__tests__/` | Only if transferring test infrastructure | Defer |
| `features/pre-approval/__tests__/` | Only if transferring test infrastructure | Defer |
| `features/cta/__tests__/` | Only if transferring test infrastructure | Defer |

---

## Post-Copy Reconciliation Required

After the initial copy lands in the destination repo, these reconciliation steps must be performed before the code will build or function correctly.

| Item | What must happen | Why |
|---|---|---|
| **Root layout portal** | Add `<div id="pre-approval-drawer-root" />` to destination's `app/layout.tsx` | Drawer renders via React portal to this DOM node |
| **Marketing layout integration** | Ensure `PreApprovalDrawerRoot` wraps marketing route children in the destination layout tree | Without the provider, drawer hooks throw; all LeadCta silently fails |
| **Import path resolution** | Verify all `@/` imports resolve correctly in destination | Alias may map differently; transferred files reference `@/features/`, `@/lib/`, `@/components/` |
| **Tailwind theme merge** | Merge source CSS variables and animations into destination `globals.css` | Source components depend on `--primary`, `--background`, `--nav-height`, marquee keyframes, etc. |
| **Font integration** | Ensure Geist font is loaded and CSS variables (`--font-geist-sans`, `--font-geist-mono`) are available | Typography depends on these variables |
| **Package installation** | Run `npm install` for any packages added to destination `package.json` | Missing packages = build failure |
| **`next.config` merge** | Add `optimizePackageImports: ["lucide-react"]` if not present | Large bundle size without optimization |
| **Route group structure** | Decide whether source route groups `(marketing)`, `(programs)`, `(financing)`, `(resources)` map to destination conventions or need restructuring | URL segments must remain unchanged; group naming is flexible |
| **Metadata reconciliation** | Verify transferred metadata exports don't conflict with destination site title/description patterns | Duplicate or conflicting metadata |
| **Asset path verification** | Verify all `public/` assets are accessible at their expected paths | Next.js serves `public/` from root; path must be identical |
| **Auth/middleware exemption** | If destination has auth middleware, ensure marketing routes are exempted from auth checks | Source routes expect unauthenticated access |
| **Convex isolation** | Verify transferred server components don't run inside a Convex provider that expects backend queries | Source has zero backend dependencies |
| **2xl containment convention** | Verify destination layout doesn't add its own max-width constraints that conflict with source's `2xl:max-w-screen-2xl` pattern | Double-constraining breaks layout |
| **Error boundary adaptation** | Update phone numbers and copy in error.tsx files if they differ for destination brand | Hard-coded phone `(888) 555-0199` may be wrong for destination |
