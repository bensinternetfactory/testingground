# Project Transfer Spec — TowLoans Marketing Site

> **Status:** Draft — generated 2026-04-07
> **Authority:** This is the governing document for the partial migration. All other artifacts in `plans/project-transfer/` defer to it on scope and phasing decisions. Checklists, gates, and evidence live in their own first-class artifacts.

---

## Executive Summary

This migration transfers the **public marketing surface** of the TowLoans Next.js repository into an existing Next.js destination repository that already has Convex attached. The source repo is a config-driven App Router marketing site (Next.js 16 / React 19 / Tailwind v4). Route files are thin composition shells; the bulk of migration-relevant contracts live outside `/app` in `components/sections/`, `features/pre-approval/`, `features/cta/`, and `lib/`.

The migration scope is every route under `app/(marketing)` plus every non-app dependency those routes require to render and function correctly. The `app/(internal)` route group and anything not reachable from the marketing route tree are excluded.

No code will be migrated as part of this planning phase. This document and its companion artifacts define the process that will govern execution.

---

## In-Scope Source Surface

### Routes

| Route group | Segment | Page type |
|---|---|---|
| `(marketing)` | `/` | Homepage — 16 composed sections |
| `(marketing)` | `/about` | MinimalNavPage shell |
| `(marketing)/(programs)` | `/fleet-financing` | ProgramPageShell + config |
| `(marketing)/(programs)` | `/deferred-payment-tow-truck-financing` | ProgramPageShell + config |
| `(marketing)/(programs)` | `/zero-down-tow-truck-financing` | ProgramPageShell + config |
| `(marketing)/(programs)` | `/private-party-tow-truck-financing` | ProgramPageShell + config |
| `(marketing)/(financing)` | `/rollback-financing` | EquipmentFinancingPageShell + config |
| `(marketing)/(financing)` | `/rotator-financing` | EquipmentFinancingPageShell + config |
| `(marketing)/(financing)` | `/wrecker-financing` | EquipmentFinancingPageShell + config |
| `(marketing)/(financing)` | `/used-tow-truck-financing` | EquipmentFinancingPageShell + config |
| `(marketing)/(resources)` | `/tow-truck-calculator` | Custom page with Calculator |
| `(marketing)/(resources)` | `/resources/how-much-does-a-tow-truck-cost` | MinimalNavPage shell |
| `(marketing)/(resources)` | `/resources/section-179-tow-truck` | MinimalNavPage shell |
| `(marketing)/(resources)` | `/resources/tow-truck-lease-vs-loan` | MinimalNavPage shell |
| `(marketing)/(resources)` | `/resources/tow-truck-financing-companies` | MinimalNavPage shell |

### Route-level special files

| File | Role |
|---|---|
| `app/layout.tsx` | Root layout — Geist font, viewport meta, `#pre-approval-drawer-root` portal |
| `app/globals.css` | Tailwind v4 theme, brand tokens, animations, dark mode |
| `app/global-error.tsx` | Global error boundary (client) |
| `app/not-found.tsx` | 404 page (server) |
| `app/(marketing)/layout.tsx` | Mounts `PreApprovalDrawerRoot` provider |
| `app/(marketing)/loading.tsx` | Homepage skeleton |
| `app/(marketing)/error.tsx` | Marketing error boundary (client) |
| `app/(marketing)/(programs)/layout.tsx` | Passthrough |
| `app/(marketing)/(programs)/loading.tsx` | Program skeleton |
| `app/(marketing)/(programs)/error.tsx` | Program error boundary (client) |
| `app/(marketing)/(financing)/layout.tsx` | Passthrough |
| `app/(marketing)/(financing)/loading.tsx` | Financing skeleton |
| `app/(marketing)/(financing)/error.tsx` | Financing error boundary (client) |
| `app/(marketing)/(resources)/layout.tsx` | Passthrough |
| `app/(marketing)/(resources)/loading.tsx` | Resources skeleton |
| `app/(marketing)/(resources)/error.tsx` | Resources error boundary (client) |

### Non-app dependencies required by in-scope routes

| Directory | Role | Migration-critical? |
|---|---|---|
| `components/sections/page/**` | ~25 config-driven section components | Yes |
| `components/sections/heroes/**` | 5 hero variant families | Yes |
| `components/sections/nav/sticky-nav-rm/` | Sticky navigation with mobile overlay | Yes |
| `components/sections/calculator/` | ROI calculator | Yes |
| `components/shared/JsonLd.tsx` | Structured data injection | Yes |
| `components/ui/Button.tsx` | Polymorphic button/anchor | Yes |
| `components/ui/Container.tsx` | Max-width wrapper | Yes |
| `components/ui/navigation-menu.tsx` | Radix navigation menu | Yes |
| `features/cta/` | CtaLink, LeadCta, CTA contracts | Yes |
| `features/pre-approval/` | Drawer runtime, session, hash listener, route sync, UI | Yes |
| `lib/utils.ts` | `cn()` — clsx + tailwind-merge | Yes |
| `lib/press-feedback.tsx` | Press feedback hook + ripple (framer-motion, web-haptics) | Yes |
| `app/truckicons/` | SVG truck icon components | Yes — referenced by hero tiles |
| `app/(marketing)/(programs)/_components/` | ProgramPageShell, blocks, types, TOC | Yes |
| `app/(marketing)/(financing)/_components/` | EquipmentFinancingPageShell, config types | Yes |
| `app/(marketing)/_components/MinimalNavPage.tsx` | Minimal page shell | Yes |
| `public/brand-assets/**` | Benefit icons, logos, manufacturer logos, source icons | Yes |
| `public/truck-icons/**` | Truck type icon variants | Yes |
| `public/truck-*.jpg` | Truck photo gallery | Yes |

---

## Explicit Exclusions

| Item | Reason |
|---|---|
| `app/(internal)/` | Internal brand guide — noindex, not part of public surface |
| `components/sections/brand/` | Only used by `app/(internal)/brand` |
| `components/dev/` | Development utilities only |
| `scripts/` | Build-time review harnesses, not runtime dependencies |
| `node_modules/` | Resolved at destination |
| `.claude/`, `plans/`, `CLAUDE.md` | Tooling and planning artifacts |
| `vitest.config.ts`, `vitest.setup.ts` | Test infrastructure — inventory only, transfer deferred |
| `eslint.config.mjs`, `postcss.config.mjs` | Build config — destination may have its own |

---

## Major Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | **Pre-approval drawer provider not mounted** — if the destination layout tree doesn't include `PreApprovalDrawerRoot`, every `LeadCta` and hash-entry CTA silently fails | Critical | Phase 3 compatibility check; explicit provider integration step in Phase 5 |
| R2 | **Tailwind v4 vs v3 mismatch** — destination may use Tailwind v3 with `tailwind.config.js`; source uses v4 with `@import "tailwindcss"` and CSS-variable theming | High | Phase 2 destination inventory must confirm Tailwind version; if v3, adapt strategy required |
| R3 | **React 19 / Next.js 16 version mismatch** — source uses bleeding-edge versions; destination may lag | High | Phase 2 version check; RSC boundary behavior may differ across versions |
| R4 | **`@/*` alias collision** — both repos likely define this alias but may map differently | Medium | Phase 3 alias comparison |
| R5 | **Portal target missing** — `#pre-approval-drawer-root` div must exist in root layout for drawer to render | Critical | Explicit root layout check in Phase 3 |
| R6 | **Framer Motion / web-haptics version conflict** — destination may have different framer-motion version | Medium | Phase 3 package comparison |
| R7 | **Route collision** — destination may already have routes at the same URL segments | High | Phase 3 route collision check |
| R8 | **CSS variable namespace collision** — brand tokens (e.g., `--primary`, `--background`) may conflict with destination theme | High | Phase 3 globals.css comparison |
| R9 | **Config-driven section coupling** — each section config may reference image paths, CTA triggers, or pre-approval contracts that break if any dependency is missing | Medium | Dependency matrix traces every config → asset → feature chain |
| R10 | **Convex integration side effects** — destination has Convex; source has no backend/database; transferred code must not accidentally trigger Convex providers or auth guards | High | Phase 3 Convex compatibility check |

---

## Key Unknowns

These cannot be resolved from the source repo alone. Each must be answered during Phase 2 (destination inventory) before Phase 3 can begin.

| # | Unknown | How to resolve |
|---|---|---|
| U1 | Destination Next.js and React versions | `package.json` inspection |
| U2 | Destination Tailwind version and config approach | Check for `tailwind.config.*` vs Tailwind v4 `@import` |
| U3 | Destination `@/*` alias mapping | `tsconfig.json` paths field |
| U4 | Destination provider tree (layout hierarchy) | Read `app/layout.tsx` and nested layouts |
| U5 | Destination auth/session model | Check middleware, providers, session hooks |
| U6 | Destination Convex schema and provider mounting | Check `convex/` directory and layout providers |
| U7 | Existing routes that may collide | `app/` directory listing |
| U8 | Destination globals.css / CSS variable namespace | Read stylesheet |
| U9 | Destination component library (shadcn? Radix?) | `components.json`, `package.json` |
| U10 | Destination `public/` asset conventions | Directory listing |
| U11 | Destination middleware presence and behavior | Check `middleware.ts` at root |
| U12 | Destination test framework | `vitest.config.*` or `jest.config.*` |

---

## Source Migration Inventory

### npm packages required by in-scope code

| Package | Version | Used by |
|---|---|---|
| `next` | 16.1.6 | Framework — App Router, `next/link`, `next/font/google`, `next/image` |
| `react` / `react-dom` | 19.2.3 | UI framework |
| `framer-motion` | ^12.34.0 | `features/cta/client.tsx`, `lib/press-feedback.tsx`, `features/pre-approval/drawer/ui/` |
| `web-haptics` | ^0.0.6 | `lib/press-feedback.tsx` |
| `clsx` | ^2.1.1 | `lib/utils.ts` |
| `tailwind-merge` | ^3.4.1 | `lib/utils.ts` |
| `class-variance-authority` | ^0.7.1 | `components/ui/Button.tsx` |
| `radix-ui` | ^1.4.3 | `components/ui/navigation-menu.tsx` |
| `lucide-react` | ^0.564.0 | Various section components |
| `tailwindcss` | ^4 | Build-time styling |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin for Tailwind v4 |
| `tw-animate-css` | ^1.4.0 | Animation utilities in globals.css |
| `shadcn` | ^3.8.4 | Component scaffolding (dev-time) |

### Environment variables

| Variable | File | Required? |
|---|---|---|
| `NEXT_PUBLIC_MINI_ROI_DEBUG` | `components/sections/page/mini-roi/MiniROI.tsx` | No — debug flag, defaults to off |

### Tests (source-side, for inventory)

31 non-node_modules test files exist across:
- `features/pre-approval/__tests__/` (12 files)
- `features/cta/__tests__/` (1 file)
- `lib/__tests__/` (1 file)
- `components/sections/heroes/**/__tests__/` (6 files)
- `components/sections/nav/**/__tests__/` (2 files)
- `components/sections/page/**/__tests__/` (5 files)
- `app/(marketing)/**/__tests__/` (4 files)

---

## Branching and Isolation Strategy

### Destination repo

1. Create a new branch: `migration/towloans-marketing` (recommended name)
2. Do NOT base this branch on any existing feature branch
3. Branch from the destination's current `main` (or equivalent default branch)
4. All migration work happens exclusively on this branch
5. No unrelated commits may be mixed in
6. Baseline lint/build/test must pass on the new branch before any transfer begins

### Source repo

- Source repo is read-only during the migration
- No source-side changes are made — all adaptation happens in the destination
- Source artifacts in `plans/project-transfer/` are the authoritative reference

---

## Phased Migration Plan

> Full operational detail lives in `project-transfer-phase-gates.md`. This section provides the strategic overview.

| Phase | Name | Purpose |
|---|---|---|
| 0 | Scope lock and migration charter | Confirm scope, assign ownership, agree on conventions |
| 1 | Source inventory and dependency extraction | Complete source-side analysis; populate dependency matrix |
| 2 | Destination inventory on a new branch | Analyze destination architecture; answer unknowns U1–U12 |
| 3 | Compatibility and collision analysis | Cross-repo comparison; identify blockers and adaptations |
| 4 | Transfer design and adaptation map | Define exactly what changes during copy and what changes after |
| 5 | Smallest viable migration unit | Transfer minimal route + dependencies; prove integration |
| 6 | Incremental expansion | Transfer remaining routes in batches with per-batch verification |
| 7 | Pre-merge validation | Full regression check; go/no-go gate review |
| 8 | Merge decision and rollback readiness | Final merge or rollback; post-merge monitoring |

### Hard stops between phases

Every phase boundary is a hard stop. Work on Phase N+1 must not begin until:
1. Phase N execution checklist items are all checked
2. Required evidence is recorded in `project-transfer-execution-log.md`
3. The go/no-go gate for Phase N is marked `GO`

If any gate is `NO-GO`, execution pauses until the blocker is resolved and re-evaluated.

---

## Cross-Repo Questions That Must Be Answered Before Execution

These questions are directed at the destination repo and must be answered during Phase 2. The destination prompt (`project-transfer-destination-prompt.md`) is designed to elicit these answers.

1. What are the destination's `next`, `react`, `react-dom` versions?
2. Does the destination use Tailwind v3 or v4? What is the config approach?
3. What does `@/*` resolve to in `tsconfig.json`?
4. What providers wrap the destination's layout tree? (Auth, Convex, theme, etc.)
5. Does the destination have middleware? What does it do?
6. What auth/session model does the destination use?
7. How is Convex integrated? (Provider, schema, client instantiation)
8. Are there existing routes at any of the source URL segments?
9. What CSS variable namespace does the destination use?
10. Does the destination use shadcn/ui? If so, what style and base color?
11. What public asset conventions does the destination follow?
12. What test framework does the destination use?
13. What is the destination's deployment target and build pipeline?
14. Does the destination have an observability/error-reporting stack?

---

## Related Artifacts

| Artifact | Purpose |
|---|---|
| `project-transfer-dependency-matrix.md` | Every dependency with type, disposition, failure mode |
| `project-transfer-source-checklist.md` | Source-side verification checklist |
| `project-transfer-destination-checklist.md` | Destination-side verification checklist |
| `project-transfer-copy-manifest.md` | Physical file transfer bundle |
| `project-transfer-phase-gates.md` | Operational runbook with hard stop points |
| `project-transfer-execution-log.md` | Evidence ledger |
| `project-transfer-go-no-go.md` | Pre-merge gate criteria |
| `project-transfer-rollback-plan.md` | Rollback strategies |
| `project-transfer-destination-prompt.md` | Executable prompt for destination repo |
| `project-transfer-resume-protocol.md` | Session handoff protocol |
| `project-transfer-phase-prompts.md` | Copy-paste phase prompts with governance rules |
