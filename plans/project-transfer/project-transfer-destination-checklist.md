# Destination Checklist

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Purpose:** Strict destination-side verification checklist. Every item must be checked on the destination repo's dedicated migration branch before any source code is transferred.

---

## DC-01: Migration Branch Creation

| Field | Value |
|---|---|
| **Item** | Create a new dedicated migration branch from `main` (or equivalent default branch) |
| **Why it matters** | Isolates migration work; prevents contaminating existing branches |
| **How to verify** | `git branch --show-current` returns the migration branch name; `git log --oneline -1` matches the latest commit on default branch |
| **Pass/fail** | Branch exists, is based on default branch HEAD, contains zero migration commits |
| **Hard blocker?** | Yes |
| **Phase** | 2 |

**Recommended branch name:** `migration/towloans-marketing`

---

## DC-02: Branch Hygiene

| Field | Value |
|---|---|
| **Item** | Confirm no unrelated work is on the migration branch |
| **Why it matters** | Mixed work makes rollback impossible without cherry-picking |
| **How to verify** | `git log main..migration/towloans-marketing --oneline` shows only migration-related commits (or zero commits initially) |
| **Pass/fail** | Every commit on the branch is migration-related |
| **Hard blocker?** | Yes |
| **Phase** | 2, then re-checked at every phase gate |

---

## DC-03: Baseline Build/Lint/Test State

| Field | Value |
|---|---|
| **Item** | Confirm lint, build, and test all pass on the migration branch before any transfer |
| **Why it matters** | Establishes a known-good baseline; post-transfer failures are attributable to migration work |
| **How to verify** | Run destination's lint, build, and test commands; record output |
| **Pass/fail** | All three pass with zero errors |
| **Hard blocker?** | Yes |
| **Phase** | 2 |

---

## DC-04: Route Collision Check

| Field | Value |
|---|---|
| **Item** | Verify no existing destination routes collide with source marketing URLs |
| **Why it matters** | Route collisions cause undefined behavior or overwrite existing pages |
| **How to verify** | List all routes under destination `app/`; compare against source route table in spec |
| **Pass/fail** | Zero collisions; or collisions documented with resolution plan |
| **Hard blocker?** | Yes — collision must be resolved before transfer |
| **Phase** | 3 |

**Source URLs to check against:**
- `/` (homepage — likely collision)
- `/about`
- `/fleet-financing`
- `/deferred-payment-tow-truck-financing`
- `/zero-down-tow-truck-financing`
- `/private-party-tow-truck-financing`
- `/rollback-financing`
- `/rotator-financing`
- `/wrecker-financing`
- `/used-tow-truck-financing`
- `/tow-truck-calculator`
- `/resources/how-much-does-a-tow-truck-cost`
- `/resources/section-179-tow-truck`
- `/resources/tow-truck-lease-vs-loan`
- `/resources/tow-truck-financing-companies`

---

## DC-05: Layout and Provider-Tree Compatibility

| Field | Value |
|---|---|
| **Item** | Document the destination's full layout hierarchy and provider tree |
| **Why it matters** | Source's `PreApprovalDrawerRoot` must be mounted correctly within the destination layout tree; Convex/auth providers may interfere |
| **How to verify** | Read `app/layout.tsx` and every nested layout; list all providers in order |
| **Pass/fail** | Provider tree documented; insertion point for `PreApprovalDrawerRoot` identified; no provider conflict found |
| **Hard blocker?** | Yes |
| **Phase** | 3 |

**Source layout requirements:**
1. Root layout must include `<div id="pre-approval-drawer-root" />` as a portal target
2. Marketing layout (or equivalent) must wrap children with `<PreApprovalDrawerRoot>`
3. No parent provider should interfere with drawer state management

---

## DC-06: Alias/Path Compatibility

| Field | Value |
|---|---|
| **Item** | Compare destination `tsconfig.json` paths against source's `@/*` alias |
| **Why it matters** | Source imports use `@/components/...`, `@/features/...`, `@/lib/...`; if destination maps `@/*` differently, every import breaks |
| **How to verify** | Read destination `tsconfig.json` `compilerOptions.paths`; compare against `"@/*": ["./*"]` |
| **Pass/fail** | Alias maps to same relative root, OR adaptation plan documented |
| **Hard blocker?** | Yes |
| **Phase** | 3 |

---

## DC-07: Styling/Design-System Compatibility

| Field | Value |
|---|---|
| **Item** | Compare destination styling system against source Tailwind v4 + CSS variable theme |
| **Why it matters** | Version mismatch (v3 vs v4) requires fundamental config changes; variable namespace collisions corrupt both themes |
| **How to verify** | Check destination Tailwind version, config approach, `globals.css` CSS variables, PostCSS config |
| **Pass/fail** | Tailwind version documented; CSS variable conflicts listed; adaptation plan in place |
| **Hard blocker?** | Yes — Tailwind v3/v4 mismatch is a Phase 4 design decision |
| **Phase** | 3 |

**Variables to check for collision:**
`--background`, `--foreground`, `--primary`, `--secondary`, `--border`, `--ring`, `--radius`, `--nav-height`, `--chart-*`, `--sidebar-*`

---

## DC-08: Auth/Session Compatibility

| Field | Value |
|---|---|
| **Item** | Document destination's auth/session model and verify it does not block marketing routes |
| **Why it matters** | Source has no auth; if destination auth middleware or layout guards block unauthenticated access, marketing pages become inaccessible |
| **How to verify** | Check destination `middleware.ts` for auth redirects; check layout providers for session requirements; test an unauthenticated visit to a marketing route |
| **Pass/fail** | Marketing routes are accessible without authentication, OR exemption configured |
| **Hard blocker?** | Yes |
| **Phase** | 3 |

---

## DC-09: Convex Compatibility

| Field | Value |
|---|---|
| **Item** | Document Convex integration and verify transferred marketing code does not trigger Convex providers or queries |
| **Why it matters** | Source has zero backend/database dependencies; if destination's Convex provider wraps the layout tree, transferred server components may fail if they're expected to interact with Convex |
| **How to verify** | Check `convex/` directory for schema; check layout tree for `ConvexProvider`; verify transferred code makes no Convex calls |
| **Pass/fail** | Convex provider location documented; transferred code verified to have no Convex dependencies; or isolation strategy defined |
| **Hard blocker?** | Yes |
| **Phase** | 3 |

---

## DC-10: Environment Variable Compatibility

| Field | Value |
|---|---|
| **Item** | Check destination env vars for conflicts and add source env vars if needed |
| **Why it matters** | Missing env vars cause runtime failures |
| **How to verify** | Compare source env var list (only `NEXT_PUBLIC_MINI_ROI_DEBUG`, optional) against destination `.env*` files |
| **Pass/fail** | No conflicts; optional debug var documented |
| **Hard blocker?** | No |
| **Phase** | 3 |

---

## DC-11: Runtime/Deployment Compatibility

| Field | Value |
|---|---|
| **Item** | Document destination deployment target and verify compatibility with source code patterns |
| **Why it matters** | Source uses Next.js 16 App Router features (RSC, streaming, Suspense); deployment target must support them |
| **How to verify** | Check destination `next.config.*`, deployment platform (Vercel, self-hosted, etc.), Node.js version |
| **Pass/fail** | Deployment platform supports App Router; Node.js version compatible |
| **Hard blocker?** | Yes |
| **Phase** | 3 |

---

## DC-12: Observability Compatibility

| Field | Value |
|---|---|
| **Item** | Document destination's error reporting, logging, and monitoring stack |
| **Why it matters** | Source has `PreApprovalEvent` and `analytics.legacySection` prop contracts that may need wiring; error boundaries may need integration with destination's error reporter |
| **How to verify** | Check for Sentry, DataDog, or similar in destination; check if analytics SDKs are present |
| **Pass/fail** | Observability stack documented; integration points for CTA analytics and pre-approval events identified (if applicable) |
| **Hard blocker?** | No — functional without wiring, but recommended |
| **Phase** | 3 |

---

## DC-13: Package Version Comparison

| Field | Value |
|---|---|
| **Item** | Compare every npm package from source dependency matrix against destination versions |
| **Why it matters** | Version mismatches cause build failures or subtle runtime bugs |
| **How to verify** | Read destination `package.json`; compare versions for: `next`, `react`, `react-dom`, `framer-motion`, `clsx`, `tailwind-merge`, `class-variance-authority`, `radix-ui`, `lucide-react`, `tailwindcss`, `tw-animate-css`, `web-haptics` |
| **Pass/fail** | All packages present with compatible versions, OR missing packages listed with install plan |
| **Hard blocker?** | Yes for `next`, `react`, `tailwindcss`; No for others (can be installed) |
| **Phase** | 3 |

---

## DC-14: Component Library Check (shadcn/ui)

| Field | Value |
|---|---|
| **Item** | Check if destination uses shadcn/ui and compare configuration |
| **Why it matters** | Source uses shadcn `new-york` style with `neutral` base color; destination may use different style or none at all |
| **How to verify** | Check for `components.json` in destination root |
| **Pass/fail** | Configuration documented; conflicts identified |
| **Hard blocker?** | No — but style conflicts may cause visual inconsistency |
| **Phase** | 3 |

---

## DC-15: `next.config` Compatibility

| Field | Value |
|---|---|
| **Item** | Compare destination `next.config.*` against source |
| **Why it matters** | Source uses `experimental.optimizePackageImports: ["lucide-react"]`; destination may have conflicting or missing config |
| **How to verify** | Read destination `next.config.ts` or `next.config.js` |
| **Pass/fail** | Config documented; required additions listed |
| **Hard blocker?** | No — config can be merged |
| **Phase** | 3 |

---

## DC-16: Public Asset Conventions

| Field | Value |
|---|---|
| **Item** | Document destination's `public/` directory conventions |
| **Why it matters** | Source copies ~130 assets into `public/`; naming collisions or convention mismatches must be caught |
| **How to verify** | `ls -R` destination `public/` directory; check for overlapping paths |
| **Pass/fail** | No path collisions; or collision resolution plan documented |
| **Hard blocker?** | No — but collisions must be resolved before Phase 5 |
| **Phase** | 3 |

---

## DC-17: Merge Protection Criteria

| Field | Value |
|---|---|
| **Item** | Define criteria that must be met before the migration branch can merge to default branch |
| **Why it matters** | Prevents merging broken or incomplete migration work |
| **How to verify** | All items in `project-transfer-go-no-go.md` are satisfied |
| **Pass/fail** | GO decision recorded in execution log; all evidence present |
| **Hard blocker?** | Yes |
| **Phase** | 8 |

**Merge is blocked until:**
1. Build passes (`next build`)
2. Lint passes
3. All existing destination tests pass
4. No route collisions remain
5. Every transferred page renders correctly in browser
6. Pre-approval drawer opens and functions if transferred
7. No console errors on any transferred page
8. Rollback plan reviewed and ready
9. Go/no-go checklist fully resolved
