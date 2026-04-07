# Source Checklist

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Purpose:** Strict source-side verification checklist. Every item must be checked before transfer begins. Items marked as hard blockers must pass; soft blockers may proceed with documented risk.

---

## SC-01: Scope Confirmation

| Field | Value |
|---|---|
| **Item** | Confirm the in-scope source surface matches the spec |
| **Why it matters** | Prevents transferring too much (waste, risk) or too little (broken pages) |
| **How to verify** | Compare `project-transfer-spec.md` "In-Scope Source Surface" against actual `app/(marketing)` route tree |
| **Pass/fail** | All routes listed in spec exist; no unlisted route exists under `(marketing)` |
| **Phase** | 0 |
| **Hard blocker?** | Yes |

---

## SC-02: Route and Layout Inventory

| Field | Value |
|---|---|
| **Item** | Complete inventory of every `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx` under `app/(marketing)` |
| **Why it matters** | Missing a route file causes 404s; missing a layout breaks nesting |
| **How to verify** | `find app/\(marketing\) -name "*.tsx" -o -name "*.ts"` — compare against spec route table |
| **Pass/fail** | Every file is accounted for in the spec or copy manifest |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

---

## SC-03: Route-Group Behavior

| Field | Value |
|---|---|
| **Item** | Verify that route groups `(marketing)`, `(programs)`, `(financing)`, `(resources)` are used for organization only and do not affect URL segments |
| **Why it matters** | If the destination repo uses different route-group conventions, URL structure may collide |
| **How to verify** | Confirm parenthesized directories are not reflected in browser URLs; verify layout nesting behavior for each group |
| **Pass/fail** | No route group adds a URL segment; each group's layout.tsx behavior is documented |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

---

## SC-04: Route-Level Metadata and Schema

| Field | Value |
|---|---|
| **Item** | Inventory all `export const metadata` and `generateMetadata` exports; inventory all JSON-LD schemas |
| **Why it matters** | Metadata exports must be compatible with destination's Next.js version; JSON-LD must not conflict |
| **How to verify** | Grep for `export const metadata`, `export function generateMetadata`, `<JsonLd` across in-scope files |
| **Pass/fail** | Every metadata export and JSON-LD injection is listed |
| **Phase** | 1 |
| **Hard blocker?** | No — SEO impact, not functional |

---

## SC-05: Loading, Error, Global-Error, and Not-Found Behavior

| Field | Value |
|---|---|
| **Item** | Document the behavior of every loading.tsx, error.tsx, global-error.tsx, and not-found.tsx |
| **Why it matters** | Error/loading boundaries define user experience during failures and slow loads |
| **How to verify** | Read each file; note "use client" directives; note phone numbers or hard-coded copy |
| **Pass/fail** | All special files documented; hard-coded values (e.g., phone number `(888) 555-0199`) flagged for adaptation |
| **Phase** | 1 |
| **Hard blocker?** | No — but `global-error.tsx` phone number must be verified for destination |

---

## SC-06: Server/Client Component Boundaries

| Field | Value |
|---|---|
| **Item** | Map every "use client" directive in in-scope files |
| **Why it matters** | Incorrect boundaries cause hydration mismatches or break RSC composition |
| **How to verify** | Grep for `"use client"` across all in-scope files |
| **Pass/fail** | Every client boundary is documented in the dependency matrix |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

**Known client boundaries:**
- `app/(marketing)/error.tsx`
- `app/(marketing)/(programs)/error.tsx`
- `app/(marketing)/(financing)/error.tsx`
- `app/(marketing)/(resources)/error.tsx`
- `app/global-error.tsx`
- `features/cta/client.tsx`
- `features/pre-approval/drawer/client.tsx`
- `features/pre-approval/drawer/runtime/context.tsx`
- `features/pre-approval/drawer/runtime/hash-listener.tsx`
- `features/pre-approval/drawer/runtime/route-sync.tsx`
- `features/pre-approval/drawer/ui/PreApprovalDrawerView.tsx`
- `features/pre-approval/drawer/ui/AmountSlider.tsx`
- `lib/press-feedback.tsx`

---

## SC-07: Config-Driven Section Composition

| Field | Value |
|---|---|
| **Item** | Verify that each page shell (ProgramPageShell, EquipmentFinancingPageShell) and the homepage correctly compose sections from config objects |
| **Why it matters** | Sections are not inline JSX — they're assembled from imported configs; missing a config breaks a page |
| **How to verify** | For each page.tsx: trace config imports → config.ts → section component → dependencies |
| **Pass/fail** | Every config → section → dependency chain is traced in the dependency matrix |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

---

## SC-08: Provider/Context Dependencies

| Field | Value |
|---|---|
| **Item** | Identify all React contexts and providers used by in-scope code |
| **Why it matters** | Missing provider = `useContext` returns undefined → runtime crash |
| **How to verify** | Grep for `createContext`, `useContext`, `Provider` across in-scope code |
| **Pass/fail** | Only one provider found: `PreApprovalDrawerRoot` (via `DrawerStateProvider`) — documented and transfer plan exists |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

---

## SC-09: CTA and Pre-Approval Feature Coupling

| Field | Value |
|---|---|
| **Item** | Trace every CTA instance and pre-approval entry point across in-scope routes |
| **Why it matters** | CTAs are the primary conversion mechanism; pre-approval drawer is the lead capture flow |
| **How to verify** | Grep for `<CtaLink`, `<LeadCta`, `preApprovalTrigger`, `preApprovalEntry`, `#get-pre-approved` across all in-scope files |
| **Pass/fail** | Every CTA and pre-approval entry point is traced to its config and trigger |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

---

## SC-10: Alias/Path Assumptions

| Field | Value |
|---|---|
| **Item** | Verify that all in-scope imports use the `@/*` alias and that it maps to project root |
| **Why it matters** | Destination may map `@/*` differently; relative paths may not survive folder restructuring |
| **How to verify** | Grep for `from "@/` and `from "../` and `from "./"` across in-scope files; confirm `tsconfig.json` paths |
| **Pass/fail** | Alias mapping documented; all import paths inventoried |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

**Source mapping:** `"@/*": ["./*"]` — maps to project root.

---

## SC-11: Lib/Util Coupling

| Field | Value |
|---|---|
| **Item** | Verify `lib/utils.ts` and `lib/press-feedback.tsx` are the only lib files used by in-scope code |
| **Why it matters** | Undiscovered lib dependencies cause import failures |
| **How to verify** | Grep for `from "@/lib/` across in-scope files |
| **Pass/fail** | Only `utils.ts` and `press-feedback.tsx` are imported |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

---

## SC-12: Environment Variables

| Field | Value |
|---|---|
| **Item** | Inventory all `process.env` references in in-scope code |
| **Why it matters** | Missing env vars cause runtime failures or silent behavior changes |
| **How to verify** | Grep for `process.env` across in-scope files |
| **Pass/fail** | Only `NEXT_PUBLIC_MINI_ROI_DEBUG` found — optional debug flag, no production impact |
| **Phase** | 1 |
| **Hard blocker?** | No |

---

## SC-13: Backend/Data Assumptions

| Field | Value |
|---|---|
| **Item** | Confirm no API route handlers (`route.ts`/`route.tsx`) exist under `app/(marketing)` |
| **Why it matters** | API routes require backend infrastructure; source has none |
| **How to verify** | `find app/\(marketing\) -name "route.ts" -o -name "route.tsx"` |
| **Pass/fail** | Zero results |
| **Phase** | 1 |
| **Hard blocker?** | Yes — if found, backend transfer planning needed |

**Verified:** No `route.ts` or `route.tsx` files exist under `app/(marketing)`.

---

## SC-14: Styling Dependencies

| Field | Value |
|---|---|
| **Item** | Inventory all CSS files, CSS variables, custom animations, and Tailwind config used by in-scope code |
| **Why it matters** | Styling mismatches cause visual regressions across every page |
| **How to verify** | List all `.css` files in in-scope directories; extract CSS variables from `globals.css`; check for `@theme`, `@keyframes`, custom utilities |
| **Pass/fail** | All CSS dependencies documented in dependency matrix |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

**Known CSS files:**
- `app/globals.css` (brand tokens, animations, theme)
- `components/sections/nav/sticky-nav-rm/sticky-nav.css`
- `components/sections/heroes/hero-showcase-rm/hero-showcase.css`
- `components/sections/page/brand-marquee/marquee.css`
- `components/sections/page/testimonial-marquee/testimonial.css`
- `features/pre-approval/drawer/ui/amount-slider.css`

---

## SC-15: Public Assets and Static References

| Field | Value |
|---|---|
| **Item** | Trace every `public/` asset reference from in-scope code |
| **Why it matters** | Missing assets produce broken images and 404s |
| **How to verify** | Grep for `/brand-assets/`, `/truck-icons/`, `/truck-`, image `src` props across in-scope files and their configs |
| **Pass/fail** | Every referenced asset is listed in the copy manifest |
| **Phase** | 1 |
| **Hard blocker?** | Yes |

---

## SC-16: Middleware Assumptions

| Field | Value |
|---|---|
| **Item** | Confirm source has no middleware.ts |
| **Why it matters** | Source assumes no request interception; destination may have middleware that blocks/redirects marketing routes |
| **How to verify** | Check for `middleware.ts` or `middleware.tsx` at project root |
| **Pass/fail** | No middleware file exists in source |
| **Phase** | 1 |
| **Hard blocker?** | No — but destination middleware check is Phase 2 blocker |

**Verified:** No middleware file exists.

---

## SC-17: Analytics/Logging/Error Reporting

| Field | Value |
|---|---|
| **Item** | Inventory any analytics, logging, or error reporting integrations |
| **Why it matters** | Transferred code may need wiring to destination's observability stack |
| **How to verify** | Grep for analytics SDKs, `console.log`, error reporting libraries across in-scope code |
| **Pass/fail** | No global analytics integration exists; `analytics` prop on CtaLink/LeadCta is a passive contract; `PreApprovalEvent` is emitted but unconsumed |
| **Phase** | 1 |
| **Hard blocker?** | No |

---

## SC-18: Tests Available / Missing

| Field | Value |
|---|---|
| **Item** | Inventory all test files for in-scope code |
| **Why it matters** | Tests are evidence for correctness; missing tests are risk areas |
| **How to verify** | `find . -path "*/__tests__/*" -name "*.test.*"` excluding `node_modules` |
| **Pass/fail** | Test inventory complete |
| **Phase** | 1 |
| **Hard blocker?** | No |

**Existing tests (31 files):**
- Pre-approval: 12 test files (drawer, runtime, context, hash listener, route sync, public API, selection, scroll lock, amount slider, press feedback)
- CTA: 1 test file (public API)
- Lib: 1 test file (press feedback)
- Heroes: 6 test files (framed tile selector, tertiary links, tile selector, hero input, hero lead gen)
- Nav: 2 test files (NavPressable, preApprovalCta)
- Page sections: 5 test files (mini-roi calc/input/math/component, truck gallery utils, equipment closing CTA, tertiary strip, term length slider)
- Marketing routes: 4 test files (homepage card callers, homepage pre-approval callers, program nav card link, program pre-approval config renderers)

**Missing test coverage:** No route-level render tests for full page output. No integration tests for page shell → config → section composition chain.

---

## SC-19: Known Risky Areas

| Field | Value |
|---|---|
| **Item** | Flag areas with high migration risk |
| **Why it matters** | Focused attention on highest-risk areas prevents surprises |
| **How to verify** | Review dependency matrix for items with "Transfer with adaptation" disposition |
| **Pass/fail** | All risky areas documented |
| **Phase** | 1 |
| **Hard blocker?** | No |

**Risky areas:**
1. **Pre-approval drawer integration** — requires portal div in root layout + provider in marketing layout + hash listener behavior + route sync with Next.js router
2. **Tailwind v4 CSS variable theme** — `globals.css` defines brand tokens that may collide with destination theme
3. **Geist font loading** — loaded in root layout via `next/font/google`; destination may load fonts differently
4. **framer-motion version** — press feedback and drawer animations depend on specific framer-motion APIs
5. **`2xl` containment convention** — every section uses this; if destination has different max-width conventions, visual breakage
6. **Config-driven section composition** — each config file is a web of imports; a missing intermediate dependency breaks the page

---

## SC-20: Excluded-but-Referenced Code

| Field | Value |
|---|---|
| **Item** | Identify any code outside the in-scope surface that is referenced by in-scope code |
| **Why it matters** | If excluded code is actually needed, the transfer is incomplete |
| **How to verify** | Trace all imports from in-scope files; flag any that resolve outside the defined scope |
| **Pass/fail** | No import from in-scope code resolves to an excluded file |
| **Phase** | 1 |
| **Hard blocker?** | Yes — any such reference must either expand scope or be adapted |

**Known edge cases:**
- `app/truckicons/` — inside `app/` but outside `(marketing)`; referenced by financing hero configs. **Resolution:** include in scope (listed in spec).
- `components/sections/brand/` — used only by `app/(internal)/brand`. **Resolution:** confirmed excluded; no in-scope code imports it.
- `components/dev/` — development utilities. **Resolution:** confirmed excluded; no in-scope code imports it.
