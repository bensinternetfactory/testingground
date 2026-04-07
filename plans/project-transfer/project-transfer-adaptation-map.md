# Adaptation Map — Transfer Design and Destination-Specific Changes

> **Authority:** `project-transfer-spec.md`
> **Phase:** Phase 4 — Transfer Design and Adaptation Map
> **Generated:** 2026-04-07
> **Purpose:** Defines every adaptation, mapping, Phase 5/6 scope, post-copy reconciliation, and verification plan for the migration.

---

## 1. "Transfer with Adaptation" Items

These items are copied from source but require specific changes to integrate with the destination.

### A1. PreApprovalDrawerRoot Provider

**Source:** `features/pre-approval/drawer/client.tsx` exports `PreApprovalDrawerRoot`
**Source mount:** `app/(marketing)/layout.tsx` wraps children with `<PreApprovalDrawerRoot>`
**Source portal:** `app/layout.tsx` has `<div id="pre-approval-drawer-root" />` after `{children}`

**Adaptation steps:**
1. **Root layout portal** — Add `<div id="pre-approval-drawer-root" />` inside destination's `app/layout.tsx` `<body>`, after `<ConvexClientProvider>{children}</ConvexClientProvider>`:
   ```tsx
   <ConvexClientProvider>{children}</ConvexClientProvider>
   <div id="pre-approval-drawer-root" />
   ```
2. **Marketing layout** — The transferred `app/(marketing)/layout.tsx` imports `PreApprovalDrawerRoot` from `@/features/pre-approval/drawer/client` and wraps children. This file copies as-is — no code change needed. The import resolves because `features/pre-approval/` is transferred in the same batch.
3. **No Convex interaction** — `PreApprovalDrawerRoot` renders inside the Convex provider tree but makes zero Convex calls. Safe.

**Verification:** Open any marketing page → click a LeadCta → drawer must open in the portal. Navigate to `#get-pre-approved` → drawer must open via hash listener.

---

### A2. globals.css — Brand Token Replacement

**Source:** `app/globals.css` defines TowLoans brand hex values for all CSS variables
**Destination:** `app/globals.css` has generic shadcn oklch placeholder values

**Adaptation:** Replace destination's `globals.css` entirely with source's `globals.css`, then merge destination-only content back in.

**Specific changes to destination `globals.css`:**

1. **Add import:** `@import "shadcn/tailwind.css";` (line 3 in source, missing from destination)
2. **Add to `@theme inline` block** — destination is missing these theme tokens:
   ```css
   --radius-2xl: calc(var(--radius) + 8px);
   --radius-3xl: calc(var(--radius) + 12px);
   --radius-4xl: calc(var(--radius) + 16px);
   --animate-marquee: marquee var(--duration) linear infinite;
   --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;
   ```
3. **Replace `:root` block** — destination oklch values → source TowLoans hex values. Add `--nav-height: 72px`. Full source `:root` block replaces destination `:root` block.
4. **Replace `.dark` block** — destination generic dark oklch → source TowLoans dark hex values.
5. **Preserve destination-only `@layer utilities`** — keep `.h-dvh` and `.pb-safe` utilities and the `@supports` fallback (lines 124–138 of destination). Source does not have these; they serve the destination's mobile app shell.
6. **Remove destination `body` font-family override** — Source has `font-family: Arial, Helvetica, sans-serif` in `@layer base body`; destination has none. The source version should be used (it overrides Geist for body text in the marketing surface). However, this may affect dashboard text. **Decision: keep the source's font-family line but scope it** — actually, since both surfaces share `globals.css`, and the Geist CSS variable font is applied via className on `<body>`, the `font-family: Arial` in `@layer base body` is a fallback stack. Keep it as source defines it.

**Net result:** Source `globals.css` is authoritative. Copy it, then append destination's `@layer utilities` block and `@supports` block at the end.

**Verification:** Visual spot-check of marketing pages (brand colors correct) AND dashboard pages (no broken styling from token changes).

---

### A3. globals.css — Marquee Keyframe Animations

**Source:** Two `@keyframes` blocks — `marquee` and `marquee-vertical`
**Destination:** Neither exists

**Adaptation:** These come with the globals.css replacement (A2). No separate action needed — they are part of the source globals.css that replaces the destination file.

**Verification:** BrandMarquee and TestimonialMarquee animate on homepage.

---

### A4. globals.css — Calculator Grid Background

**Source:** `.calculator-grid-bg` utility class
**Destination:** Not present

**Adaptation:** Included in globals.css replacement (A2). No separate action.

**Verification:** Calculator page at `/tow-truck-calculator` shows dot-grid background.

---

### A5. globals.css — Reduced Motion

**Source:** `@media (prefers-reduced-motion: reduce)` block targeting marquee, nav, accordion, and tile elements
**Destination:** Not present

**Adaptation:** Included in globals.css replacement (A2). No separate action.

**Verification:** Enable reduced-motion OS preference; confirm animations stop.

---

### A6. globals.css — Dark Mode Values

**Source:** `.dark` block with TowLoans-specific hex values (keeps `--primary: #DE3341` in both modes)
**Destination:** `.dark` block with generic oklch values

**Adaptation:** Included in globals.css replacement (A2). Source dark values replace destination values.

**Verification:** Toggle dark mode; confirm brand red (`#DE3341`) is primary in dark mode.

---

### A7. public/brand-assets/favicon/

**Source:** Favicon PNGs in `public/brand-assets/favicon/`
**Destination:** Currently uses `icon: "/convex.svg"` in root layout metadata

**Adaptation:**
1. Copy `public/brand-assets/favicon/` to destination (no collision — directory doesn't exist)
2. Update destination `app/layout.tsx` metadata to reference the TowLoans favicon:
   ```tsx
   icons: {
     icon: "/brand-assets/favicon/towloans-favicon.png",
   },
   ```
   Available files: `towloans-favicon.png` (with background), `towloans-favicon-no-bg.png` (transparent). Use `towloans-favicon.png` as the primary favicon.
3. Keep `public/convex.svg` in destination (no reason to delete it; it's unused after metadata change)

**Verification:** Browser tab shows TowLoans favicon, not Convex logo.

---

## 2. "Map to Existing" Items

These items exist in both repos. The destination's version is used; no file transfer needed.

| # | Item | Destination equivalent | Mapping strategy | Action |
|---|---|---|---|---|
| M1 | `next` (16.1.6) | `next` (^15.2.6) | Use destination version. Source uses only stable APIs present in 15. | None |
| M2 | `react` / `react-dom` (19.2.3) | `react` / `react-dom` (^19.0.0) | Use destination version. Same major, compatible. | None |
| M3 | `framer-motion` (^12.34.0) | `framer-motion` (^12.23.25) | Use destination version. Minor diff. | Optional: bump to ^12.34.0 for consistency |
| M4 | `clsx` (^2.1.1) | `clsx` (^2.1.1) | Exact match. | None |
| M5 | `tailwind-merge` (^3.4.1) | `tailwind-merge` (^3.3.1) | Compatible. | None |
| M6 | `class-variance-authority` (^0.7.1) | `class-variance-authority` (^0.7.1) | Exact match. | None |
| M7 | `radix-ui` monorepo (^1.4.3) | Individual `@radix-ui/react-*` packages | Source `navigation-menu.tsx` imports `@radix-ui/react-navigation-menu`. Destination uses individual packages. Install the individual package. | **MUST INSTALL:** `@radix-ui/react-navigation-menu` |
| M8 | `lucide-react` (^0.564.0) | `lucide-react` (^0.544.0) | Compatible minor diff. | Optional bump |
| M9 | `tailwindcss` (^4) | `tailwindcss` (^4) | Exact match. | None |
| M10 | `@tailwindcss/postcss` (^4) | `@tailwindcss/postcss` (^4) | Exact match. | None |
| M11 | `cn()` in `lib/utils.ts` | `cn()` in `lib/utils.ts` | **Byte-identical files.** Do NOT transfer `lib/utils.ts`. Destination's version is used. All `@/lib/utils` imports resolve. | **Do NOT copy `lib/utils.ts`** |
| M12 | Geist font (root layout) | Geist font (root layout) | Destination loads identical fonts with identical CSS variable names (`--font-geist-sans`, `--font-geist-mono`). | None |

### Items to install in destination

```bash
npm install web-haptics @radix-ui/react-navigation-menu
```

`web-haptics` is "Transfer unchanged" (not "Map to existing") but listed here for the complete install command.

---

## 3. Phase 5 Scope — Smallest Viable Migration Unit

**Goal:** Homepage renders at `/` with full navigation, all 16 sections, CTA system, and pre-approval drawer functional.

### 3a. Files to Copy (preserving source-relative paths)

**Features:**
| Source path | Notes |
|---|---|
| `features/cta/` (entire directory) | CTA system: CtaLink, LeadCta, contracts, factory |
| `features/pre-approval/` (entire directory) | Drawer runtime, session, hash listener, UI, contracts |

**Lib:**
| Source path | Notes |
|---|---|
| `lib/press-feedback.tsx` | Press feedback hook + ripple. **Do NOT copy `lib/utils.ts`** — destination has identical file |

**Shared components:**
| Source path | Notes |
|---|---|
| `components/shared/JsonLd.tsx` | Structured data injection |
| `components/ui/navigation-menu.tsx` | Radix navigation menu primitive |
| `components/ui/Container.tsx` | Max-width layout wrapper |

**Navigation + footer:**
| Source path | Notes |
|---|---|
| `components/sections/nav/sticky-nav-rm/` (entire) | Sticky nav with mobile overlay + CSS |
| `components/sections/page/footer/` (entire) | Site footer + config |

**Homepage sections (all required for homepage):**
| Source path | Notes |
|---|---|
| `components/sections/heroes/hero-gallery/` (entire) | Homepage hero with gallery |
| `components/sections/page/equipment-cards/` (entire) | Equipment card grid |
| `components/sections/page/program-cards/` (entire) | Program card grid |
| `components/sections/page/brand-marquee/` (entire) | Manufacturer logo marquee + CSS |
| `components/sections/page/how-it-works/` (entire) | Process steps section |
| `components/sections/page/testimonial-marquee/` (entire) | Testimonial carousel + CSS |
| `components/sections/page/mini-roi/` (entire) | Interactive ROI calculator widget |
| `components/sections/page/truck-gallery/` (entire) | Truck photo galleries |
| `components/sections/page/resource-hub/` (entire) | Resource links section |
| `components/sections/page/faq/` (entire) | FAQ accordion + schema builder |
| `components/sections/page/closing-cta/` (entire) | Closing CTA with benefits grid |

**Truck icons:**
| Source path | Notes |
|---|---|
| `app/truckicons/` (entire) | SVG truck icon components |

**Route files:**
| Source path | Notes |
|---|---|
| `app/(marketing)/page.tsx` | Homepage |
| `app/(marketing)/layout.tsx` | PreApprovalDrawerRoot mount — copies as-is |
| `app/(marketing)/loading.tsx` | Homepage loading skeleton |
| `app/(marketing)/error.tsx` | Marketing error boundary |
| `app/(marketing)/_components/MinimalNavPage.tsx` | Minimal page shell (needed by Phase 6, but easy to include now) |

**Public assets:**
| Source path | Notes |
|---|---|
| `public/brand-assets/benefit-icons/` | Benefit icons for CTA/closing sections |
| `public/brand-assets/logo/` | TowLoans logos for nav/footer |
| `public/brand-assets/manufacturers/` | Manufacturer logos for BrandMarquee |
| `public/brand-assets/truck-icons/` | Truck type icon variants (15 SVGs) |
| `public/brand-assets/favicon/` | Favicon PNGs |
| `public/truck-*.jpg` and `public/truck-1.png` | Truck gallery photos (16 files) |

### 3b. Files NOT to Copy in Phase 5

| Source path | Reason |
|---|---|
| `lib/utils.ts` | Destination has identical file |
| `components/ui/Button.tsx` | Dead code (zero imports); macOS case collision with destination `button.tsx` |
| `app/layout.tsx` | Destination has its own; adapt only (add portal div) |
| `app/globals.css` | Destination has its own; adapt per A2 |
| `app/global-error.tsx` | Keep destination's version |
| `app/not-found.tsx` | Keep destination's version (or add if absent) |
| `package.json` | Add packages only; do not overwrite |
| `tsconfig.json` | Identical alias; do not overwrite |
| `next.config.ts` | Merge `optimizePackageImports` only |
| `postcss.config.mjs` | Keep destination's format |
| `components.json` | Identical config; do not overwrite |

### 3c. Integration Steps (ordered)

These steps must be performed IN ORDER after files are copied:

1. **Install packages:** `npm install web-haptics @radix-ui/react-navigation-menu`
2. **Merge globals.css:** Replace destination's `globals.css` with source content, then append destination's `@layer utilities` and `@supports` blocks (see A2)
3. **Add portal div:** Add `<div id="pre-approval-drawer-root" />` to destination's `app/layout.tsx` inside `<body>` after `<ConvexClientProvider>{children}</ConvexClientProvider>` (see A1)
4. **Update favicon metadata:** Change `icons.icon` in destination `app/layout.tsx` metadata to `"/brand-assets/favicon/towloans-favicon.png"`
5. **Update root metadata:** Change destination `app/layout.tsx` metadata title from "Create Next App" to "TowLoans" and description to match source
6. **Remove destination homepage collision:** Delete or rename `app/(public)/page.tsx` (the current placeholder homepage). The `(public)` route group and its other routes (`/apply/**`, `/pre-approval`) remain unchanged.
7. **Merge next.config.ts:** Add `experimental: { optimizePackageImports: ["lucide-react"] }` to destination's config
8. **Run `tsc --noEmit`** — fix any type errors
9. **Run `npm run lint`** — fix new lint errors (pre-existing baseline: 7 errors)
10. **Run `npm run build`** — fix build errors
11. **Start dev server** — verify homepage renders
12. **Browser verification** — see Phase 5 verification plan below

### 3d. Homepage Route Collision Resolution

**Problem:** Destination has `app/(public)/page.tsx` → `/` and source has `app/(marketing)/page.tsx` → `/`. Two `page.tsx` files cannot resolve to the same URL in App Router.

**Resolution:** Delete destination's `app/(public)/page.tsx` during Phase 5 step 6. This removes the placeholder homepage. The `(public)` route group continues to serve `/apply/**`, `/pre-approval`, and other public routes — only the root `page.tsx` is removed.

**Impact on destination components:** The current homepage imports from `@/components/layout/` (Header, HeroSection, TruckGallery, FeaturesSection, NotificationBanner) and `app/(public)/_components/LoanSearchForm`. These components become dead code after the homepage replacement. They should NOT be deleted during migration — they are destination-owned and may be reused elsewhere. Cleanup is a post-merge activity.

---

## 4. Phase 6 Batches — Incremental Expansion

### Batch 6a: About + Resource Pages (5 pages, low risk)

**Files to copy:**
| Source path | Notes |
|---|---|
| `app/(marketing)/about/page.tsx` | About page |
| `app/(marketing)/(resources)/layout.tsx` | Resources passthrough layout |
| `app/(marketing)/(resources)/loading.tsx` | Resources skeleton |
| `app/(marketing)/(resources)/error.tsx` | Resources error boundary |
| `app/(marketing)/(resources)/tow-truck-calculator/page.tsx` | Calculator page |
| `app/(marketing)/(resources)/resources/how-much-does-a-tow-truck-cost/page.tsx` | Resource article |
| `app/(marketing)/(resources)/resources/section-179-tow-truck/page.tsx` | Resource article |
| `app/(marketing)/(resources)/resources/tow-truck-lease-vs-loan/page.tsx` | Resource article |
| `app/(marketing)/(resources)/resources/tow-truck-financing-companies/page.tsx` | Resource article |
| `components/sections/calculator/` (entire) | Calculator component + data |

**Dependencies already present:** MinimalNavPage (copied in Phase 5), StickyNav, Footer, FaqSection, ClosingCta, CTA system, JsonLd.

**New dependencies:** Calculator component only (for the calculator page).

**Verification plan:**
- `/about` renders with MinimalNavPage shell, nav, footer
- `/tow-truck-calculator` renders with interactive calculator, dot-grid background
- All 4 `/resources/*` pages render with content, nav, footer
- No console errors on any page
- Build passes, no new lint errors, no test regressions

---

### Batch 6b: Program Pages (4 pages, medium complexity)

**Files to copy:**
| Source path | Notes |
|---|---|
| `app/(marketing)/(programs)/layout.tsx` | Programs passthrough layout |
| `app/(marketing)/(programs)/loading.tsx` | Programs skeleton |
| `app/(marketing)/(programs)/error.tsx` | Programs error boundary |
| `app/(marketing)/(programs)/_components/` (entire) | ProgramPageShell, blocks, types, TOC, BlogLayout, ArticleSidebar, SidebarCta, ProgramBottomLinks, ProgramSectionRenderer + 11 section block files |
| `app/(marketing)/(programs)/fleet-financing/` | Fleet financing page + config |
| `app/(marketing)/(programs)/deferred-payment-tow-truck-financing/` | Deferred payment page + config |
| `app/(marketing)/(programs)/zero-down-tow-truck-financing/` | Zero-down page + config |
| `app/(marketing)/(programs)/private-party-tow-truck-financing/` | Private party page + config |
| `components/sections/heroes/hero-lead-gen/` (entire) | Program hero variant |

**New dependencies:** HeroLeadGen hero, ProgramPageShell with all 11 section block types, BlogLayout, ArticleSidebar, SidebarCta, ProgramBottomLinks, deriveToc utility.

**Section components already present from Phase 5:** FaqSection, EquipmentClosingCta (needs to be included — see note), Footer, StickyNav, CTA system.

**Note:** `components/sections/page/equipment-closing-cta/` is used by ProgramPageShell. It must be copied in this batch if not already present.

**Additional files to include in this batch:**
| Source path | Notes |
|---|---|
| `components/sections/page/equipment-closing-cta/` (entire) | Used by both ProgramPageShell and EquipmentFinancingPageShell |

**Verification plan:**
- `/fleet-financing` renders with HeroLeadGen, program sections, TOC sidebar, FAQ, closing CTA, footer
- `/deferred-payment-tow-truck-financing` renders correctly
- `/zero-down-tow-truck-financing` renders correctly
- `/private-party-tow-truck-financing` renders correctly
- Program section blocks render (content sections, comparison tables, feature grids, etc.)
- TOC sidebar links scroll to correct sections
- LeadCta in sidebar and hero opens pre-approval drawer
- No console errors
- Build passes, no new lint errors, no test regressions

---

### Batch 6c: Financing Pages (4 pages, medium-high complexity)

**Files to copy:**
| Source path | Notes |
|---|---|
| `app/(marketing)/(financing)/layout.tsx` | Financing passthrough layout |
| `app/(marketing)/(financing)/loading.tsx` | Financing skeleton |
| `app/(marketing)/(financing)/error.tsx` | Financing error boundary |
| `app/(marketing)/(financing)/_components/` (entire) | EquipmentFinancingPageShell, config types, shared-config |
| `app/(marketing)/(financing)/rollback-financing/` | Rollback financing page + config |
| `app/(marketing)/(financing)/rotator-financing/` | Rotator financing page + config |
| `app/(marketing)/(financing)/wrecker-financing/` | Wrecker financing page + config |
| `app/(marketing)/(financing)/used-tow-truck-financing/` | Used tow truck page + config |
| `components/sections/heroes/hero-convert-framed/` (entire) | 4 framed hero variants |
| `components/sections/heroes/hero-convert-geico/` (entire) | Tile selector hero |
| `components/sections/page/financing-offers-split/` (entire) | Offer comparison section |
| `components/sections/page/purchase-and-terms/` (entire) | Purchase/terms section |
| `components/sections/page/tertiary-strip/` (entire) | Tertiary action links |
| `components/sections/page/content-image-split/` (entire) | Content + image layout |
| `components/sections/page/financing-footnotes/` (entire) | Legal footnotes |
| `components/sections/page/related-links-strip/` (entire) | Related page links |
| `components/sections/page/purchase-source-grid/` (entire) | **Required** — unconditionally imported by PurchaseAndTermsSection.tsx (line 1) |
| `components/sections/page/term-length-slider/` (entire) | **Required** — unconditionally imported by PurchaseAndTermsSection.tsx (line 2) |

**Conditionally included (only if referenced by financing configs):**
| Source path | Condition |
|---|---|
| `components/sections/page/proof-block/` | If any financing config references ProofBlock (grep found zero imports — likely not needed) |
| `components/sections/page/equipment-deals/` | If any financing config references EquipmentDeals (grep found zero imports — likely not needed) |
| `public/brand-assets/source-icons/` | Only if a financing config iconSrc references this path (current configs use `benefit-icons/` instead — likely not needed) |

**Dependencies already present from prior batches:** EquipmentClosingCta (6b), BrandMarquee (Phase 5), FaqSection (Phase 5), Footer (Phase 5), CTA system (Phase 5), truck icons (Phase 5). **HeroLeadGen (6b)** — `EquipmentFinancingPageShell.tsx` imports HeroLeadGen at line 14 for `hero.kind: "lead-gen"` (used by rotator-financing). This component is already copied in Batch 6b. Batch 6c depends on 6b completing first.

**Verification plan:**
- `/rollback-financing` renders with correct hero variant, all financing sections, footnotes, related links
- `/rotator-financing` renders correctly
- `/wrecker-financing` renders correctly
- `/used-tow-truck-financing` renders correctly
- Hero tile selectors set correct truck type for pre-approval
- EquipmentFinancingPageShell renders all configured sections in correct order
- BrandMarquee animates on financing pages
- LeadCta opens pre-approval drawer with correct context
- No console errors
- Build passes, no new lint errors, no test regressions

---

### Batch 6d: Conditional Sections + Cleanup (if needed)

This batch exists only if Batch 6c's conditional checks reveal unreferenced sections, or if any sections were missed.

**Files:** Any remaining section components from the "Copy only if referenced" list in the copy manifest:
- `components/sections/heroes/hero-showcase-rm/` — only if grep confirms import by an in-scope page
- Root-level `public/*.svg` files — only `public/towloansdark.svg` if referenced and not already present

**Verification plan:**
- All pages still render after any additions
- Build passes
- No console errors

---

## 5. Post-Copy Reconciliation Sequence

This is the ordered checklist of reconciliation steps, with destination-specific details. Each step maps to a copy manifest reconciliation item.

### Phase 5 Reconciliation (executed during Phase 5 integration)

| # | Item | Specific action | When | Depends on |
|---|---|---|---|---|
| R1 | Root layout portal | Add `<div id="pre-approval-drawer-root" />` in destination `app/layout.tsx` `<body>` after `<ConvexClientProvider>{children}</ConvexClientProvider>` | After file copy, before build | Files copied |
| R2 | Marketing layout integration | Transferred `app/(marketing)/layout.tsx` already wraps children with `PreApprovalDrawerRoot`. No additional action — import resolves to `@/features/pre-approval/drawer/client`. | Automatic | R1, features/pre-approval copied |
| R3 | Import path resolution | All `@/` imports resolve identically (tsconfig paths are byte-identical). Verify: `features/`, `components/`, `lib/` paths all exist in destination after copy. | After file copy | Files copied |
| R4 | Tailwind theme merge | Replace destination `globals.css` with source version. Append destination-only `@layer utilities` (.h-dvh, .pb-safe) and `@supports` blocks. | After file copy | Files copied |
| R5 | Font integration | No action — destination already loads Geist with identical CSS variable names. | N/A | — |
| R6 | Package installation | `npm install web-haptics @radix-ui/react-navigation-menu` | Before build | package.json accessible |
| R7 | next.config merge | Add `experimental: { optimizePackageImports: ["lucide-react"] }` to destination's `next.config.ts`. Keep all existing destination config. | After file copy | — |
| R8 | Route group structure | Source route groups `(marketing)`, `(programs)`, `(financing)`, `(resources)` are created as-is in destination's `app/` directory. URL segments unchanged. No restructuring needed. | Automatic | Files copied |
| R9 | Metadata reconciliation | Source pages export their own `metadata`. Root layout metadata updated: title → "TowLoans", description updated. Favicon handled separately in R16. No conflict with route-level metadata. | During integration | R7 complete |
| R10 | Asset path verification | All `public/brand-assets/**` and `public/truck-*.jpg` files serve from identical URL paths. Verify `<Image src="/brand-assets/..." />` resolves. | After file copy | Assets copied |
| R11 | Auth/middleware exemption | **No action needed.** Destination middleware only protects `/dashboard` and `/server`. Marketing routes are public by default. | N/A | — |
| R12 | Convex isolation | **No action needed.** Transferred code has zero Convex imports. Components render inside Convex provider harmlessly. | N/A | — |
| R13 | 2xl containment convention | **No conflict.** Destination root layout does not add max-width constraints. Source sections apply their own `2xl:max-w-screen-2xl` classes. | N/A | — |
| R14 | Error boundary adaptation | Source `app/(marketing)/error.tsx` copies as-is. Check phone number `(888) 555-0199` — confirm it's correct for the destination brand (it is — same brand). | After file copy | — |
| R15 | Homepage collision | Delete destination `app/(public)/page.tsx`. Keep all other `(public)` routes. | Before build | — |
| R16 | Favicon | Update `metadata.icons` in destination root layout to `"/brand-assets/favicon/towloans-favicon.png"`. | During integration | Favicon assets copied |

### Phase 6 Reconciliation (per batch)

| # | Batch | Reconciliation needed |
|---|---|---|
| R17 | 6a | None — all dependencies present from Phase 5. Calculator component is self-contained. |
| R18 | 6b | Verify `equipment-closing-cta/` is present (copy if not). No other reconciliation. |
| R19 | 6c | Verify all conditional section components referenced by financing configs are present. Copy any missing ones. |
| R20 | 6d | Final sweep — verify no dangling imports across all transferred files. |

---

## 6. Verification Plan

### Phase 5 Verification

| Check | Method | Pass criteria |
|---|---|---|
| TypeScript | `tsc --noEmit` (or `npx tsc --noEmit`) | Zero new errors (destination has `ignoreBuildErrors: true` but we want clean types) |
| Lint | `npm run lint` | No more than 7 errors (pre-existing baseline) |
| Build | `npm run build` | Clean build, homepage route appears in output |
| Tests | `npm test` | No more than 13 failures / 7 failing suites (pre-existing baseline) |
| Homepage renders | Browser: `http://localhost:3000/` | All 16 sections visible, correct brand colors |
| Navigation | Click nav links | Links navigate correctly, mobile menu works |
| CTA click | Click any CtaLink | Navigates or opens drawer as expected |
| Pre-approval (hash) | Navigate to `/#get-pre-approved` | Drawer opens in portal |
| Pre-approval (click) | Click any LeadCta button | Drawer opens with correct context |
| Drawer interaction | Move amount slider, click continue | Slider responds, continue navigates to pre-approval route |
| Console | DevTools console | Zero errors (warnings acceptable) |
| Dashboard intact | Navigate to `/dashboard` (authenticated) | Dashboard renders correctly, no brand color regressions |
| Existing routes | Spot-check `/signin`, `/apply/[token]` | No regressions |

### Phase 6a Verification

| Check | Method | Pass criteria |
|---|---|---|
| Build | `npm run build` | Passes, new routes appear |
| Tests | `npm test` | No new failures beyond baseline |
| About page | Browser: `/about` | MinimalNavPage renders with nav, content, footer |
| Calculator | Browser: `/tow-truck-calculator` | Calculator renders, dot-grid background, interactive inputs |
| Resource pages | Browser: all 4 `/resources/*` URLs | Content renders, nav and footer present |
| Console | All new pages | Zero errors |

### Phase 6b Verification

| Check | Method | Pass criteria |
|---|---|---|
| Build | `npm run build` | Passes, program routes appear |
| Tests | `npm test` | No new failures beyond baseline |
| All 4 program pages | Browser: each program URL | HeroLeadGen, sections, TOC sidebar, FAQ, closing CTA, footer |
| TOC | Click TOC links on program pages | Smooth scroll to correct section |
| Sidebar CTA | Click SidebarCta | Pre-approval drawer opens |
| Console | All program pages | Zero errors |

### Phase 6c Verification

| Check | Method | Pass criteria |
|---|---|---|
| Build | `npm run build` | Passes, financing routes appear |
| Tests | `npm test` | No new failures beyond baseline |
| All 4 financing pages | Browser: each financing URL | Correct hero variant, all sections render, footnotes, related links |
| Hero tiles | Click tile selectors (if present) | Correct truck type selected, pre-approval context set |
| BrandMarquee | Visible on financing pages | Logos animate |
| Console | All financing pages | Zero errors |

### Phase 6d Verification (if applicable)

| Check | Method | Pass criteria |
|---|---|---|
| Build | `npm run build` | Passes |
| All pages | Quick sweep of all 15 marketing URLs | All render |

---

## 7. Items Excluded from Transfer (confirmed)

| Item | Reason | Reference |
|---|---|---|
| `lib/utils.ts` | Byte-identical in destination | M11 |
| `components/ui/Button.tsx` | Dead code; macOS case collision with destination `button.tsx` | Entry 6 |
| `app/layout.tsx` | Destination's is adapted, not replaced | A1 |
| `app/globals.css` | Destination's is adapted (merge), not blindly overwritten | A2 |
| `app/global-error.tsx` | Keep destination's version | Entry 6 |
| `app/not-found.tsx` | Source-specific; destination can add its own | Spec exclusions |
| `package.json` | Add packages; do not overwrite | Copy manifest |
| `tsconfig.json` | Identical alias; do not overwrite | DC-06 |
| `next.config.ts` | Merge one field; do not overwrite | DC-15 |
| `postcss.config.mjs` | Keep destination's format | Entry 6 |
| `components.json` | Functionally equivalent config (same style, base color, aliases) | DC-14 |
| `.DS_Store` files | Always exclude | Entry 6 |
| `app/(internal)/` | Excluded from scope | Spec |
| `components/sections/brand/` | Only used by excluded internal page | Spec |
| `components/dev/` | Dev utilities only | Spec |
| `scripts/` | Build-time review harnesses | Spec |
| `__tests__/` directories | Test transfer deferred | Spec |
| Template SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) | Next.js starter defaults, not referenced | DC-16 |

---

## 8. Discrepancy Correction

The `app/(marketing)/CLAUDE.md` lists `HeroLeadGen` as section 4 of the homepage. The actual code in `app/(marketing)/page.tsx` (line 2, line 59) imports and renders `HeroGallery`, not `HeroLeadGen`. **The code is authoritative.** `HeroGallery` is the homepage hero; `HeroLeadGen` is used by program pages only.
