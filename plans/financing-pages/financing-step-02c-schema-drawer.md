# Financing Step 2c Report

## Step

- Step 2c: Audit JSON-LD, drawer CTA contract, and boundary wrappers
- Pass result: completed
- Browser validation: not required by the harness for this schema/drawer/wrapper review, so no browser run was performed

## Files Reviewed

- `components/shared/JsonLd.tsx`
- `components/ui/pre-approval-drawer/config.ts`
- `components/ui/pre-approval-drawer/DrawerContext.tsx`
- `components/ui/pre-approval-drawer/PreApprovalDrawer.tsx`
- `components/ui/pre-approval-drawer/CLAUDE.md`
- `components/ui/pre-approval-drawer/index.ts`
- `app/layout.tsx`
- `app/(marketing)/layout.tsx`
- `app/(marketing)/(financing)/layout.tsx`
- `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx`
- `app/(marketing)/(financing)/rollback-financing/config.ts`
- `app/(marketing)/(financing)/wrecker-financing/config.ts`
- `app/(marketing)/(financing)/rotator-financing/config.ts`
- `app/(marketing)/(financing)/used-tow-truck-financing/config.ts`
- `components/sections/nav/sticky-nav-rm/NavClient.tsx`
- `components/sections/page/tertiary-strip/TertiaryActionsStrip.tsx`
- `components/ui/ripple-cta-link/RippleCtaLink.tsx`
- `components/sections/heroes/hero-convert-framed/FramedTileSelector.tsx`
- `components/sections/heroes/hero-lead-gen/HeroLeadGen.tsx`

## Conventions Reviewed

- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `next-best-practices`
- repo conventions from root `AGENTS.md`, `app/(marketing)/AGENTS.md`, and `components/ui/pre-approval-drawer/CLAUDE.md`

## Routes Validated

- `/rollback-financing`
- `/wrecker-financing`
- `/rotator-financing`
- `/used-tow-truck-financing`

## Findings

### FIN-bundle-004

- Finding ID: `FIN-bundle-004`
- Status: open
- Severity: `S2-medium`
- Source skill or convention: `vercel-react-best-practices`; `next-best-practices`
- Rule ID or rule area: `bundle-conditional`; RSC/client-boundary placement
- Pattern tag: `root-layout-drawer-provider`
- Affected components: `RootLayout`, `DrawerProvider`, `DrawerHashListener`, `PreApprovalDrawer`
- Affected routes: `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Shared dependency impact: the root app shell now mounts the financing drawer provider, portal, router dependency, and global document/window listeners for every route in the app, not just the financing routes that consume same-page drawer CTAs
- Local or systemic: systemic
- Boundary-only: yes
- Summary: the financing drawer boundary sits at `app/layout.tsx`, so the whole app pays for the pre-approval drawer client bundle and its global listeners even though the marketing and financing segment layouts are otherwise pass-through shells.
- Why this violates the cited rule: `vercel-react-best-practices` pushes client code toward the smallest boundary that needs it, and `next-best-practices` treats server/client boundaries as route-segment concerns. The local drawer guide also shows `DrawerProvider` wrapping the page content that owns hash-based CTAs, not the entire application shell.
- Evidence:
  - `components/ui/pre-approval-drawer/CLAUDE.md:7`
  - `components/ui/pre-approval-drawer/CLAUDE.md:16`
  - `components/ui/pre-approval-drawer/CLAUDE.md:58`
  - `app/layout.tsx:3`
  - `app/layout.tsx:35`
  - `app/(marketing)/layout.tsx:1`
  - `app/(marketing)/(financing)/layout.tsx:1`
  - `components/ui/pre-approval-drawer/DrawerContext.tsx:107`
  - `components/ui/pre-approval-drawer/DrawerContext.tsx:146`
  - `components/ui/pre-approval-drawer/PreApprovalDrawer.tsx:143`
- Fix direction: move `DrawerProvider` down into `app/(marketing)/(financing)/layout.tsx` or another financing-only wrapper so only routes that rely on same-page drawer hashes load the drawer client island and its listeners.
- First-seen substep: Step 2c
- Latest-reviewed substep: Step 2c
- Evidence pointer: `plans/reviews/financing-step-02c-schema-drawer.md`

### FIN-cta-005

- Finding ID: `FIN-cta-005`
- Status: open
- Severity: `S2-medium`
- Source skill or convention: repo CTA contract conventions; `components/ui/pre-approval-drawer/CLAUDE.md`
- Rule ID or rule area: drawer CTA contract
- Pattern tag: `drawer-enabled-route-drift`
- Affected components: `resolveDrawerTriggerHref`, `NavClient`, `usedTowTruckFinancingPageConfig`
- Affected routes: `/used-tow-truck-financing`
- Shared dependency impact: the shared nav CTA helper hard-codes the financing routes that can stay on-page, so any financing route omitted from the allowlist falls back to `/rollback-financing#get-pre-approved` even when its own page already exposes drawer-based CTAs
- Local or systemic: systemic
- Boundary-only: yes
- Summary: the shared drawer path allowlist excludes `/used-tow-truck-financing`, but that route still advertises same-page pre-approval CTAs in the hero and closing CTA. As a result, the sticky-nav primary CTA on the used-truck page routes away to the rollback page instead of honoring the same-page drawer contract.
- Why this violates the cited rule: the drawer `CLAUDE.md` defines hash-based CTAs as a same-page drawer affordance, and `app/(marketing)/AGENTS.md` says CTA links should keep pointing at the intended flow after shell integration. The shared nav helper currently breaks that contract for one audited financing route because the route registry lives in a separate hard-coded list.
- Evidence:
  - `components/ui/pre-approval-drawer/CLAUDE.md:16`
  - `components/ui/pre-approval-drawer/config.ts:15`
  - `components/ui/pre-approval-drawer/config.ts:17`
  - `components/ui/pre-approval-drawer/config.ts:23`
  - `components/sections/nav/sticky-nav-rm/NavClient.tsx:16`
  - `components/sections/nav/sticky-nav-rm/NavClient.tsx:26`
  - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:41`
  - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:194`
  - `app/(marketing)/AGENTS.md:96`
  - `app/(marketing)/AGENTS.md:97`
- Fix direction: derive the sticky-nav CTA behavior from financing route ownership instead of a hard-coded allowlist, or at minimum add `/used-tow-truck-financing` to `DRAWER_ENABLED_PATHS` so all audited financing routes honor the same same-page drawer contract.
- First-seen substep: Step 2c
- Latest-reviewed substep: Step 2c
- Evidence pointer: `plans/reviews/financing-step-02c-schema-drawer.md`

## Required Lenses

### Accessibility

- No new static accessibility finding was confirmed in this pass.
- The audited files keep the drawer contract centered on dialog markup and route-level landmarks, but browser validation was not required here, so this report does not make new runtime keyboard or focus claims.

### Responsive Behavior

- No findings from this step.
- The harness marked browser validation as not required, and the Step 2c files do not justify new runtime responsive claims without a later browser-required pass.

### Core Web Vitals Risk

- Findings recorded: `FIN-bundle-004`
- No separate LCP, CLS, or INP regression was confirmed beyond the root-level client-boundary expansion already captured in `FIN-bundle-004`.

### Repo Convention Compliance

- Findings recorded: `FIN-cta-005`

## No Findings

### JSON-LD Route Parity

- No findings. All four financing configs still provide the same three structured-data payload categories consumed by the shared shell: FAQ, `FinancialProduct`, and breadcrumb schema.

### Shared Shell Schema Injection

- No findings. `EquipmentFinancingPageShell` remains the single place that renders the financing route JSON-LD blocks, and the shell injects them consistently after the route content rather than scattering script tags through section components.

### Boundary Wrapper Side Effects In Segment Layouts

- No findings in `app/(marketing)/layout.tsx` or `app/(marketing)/(financing)/layout.tsx`. Both segment layouts are pass-through server wrappers; the boundary side-effect issue is isolated to `app/layout.tsx`.
