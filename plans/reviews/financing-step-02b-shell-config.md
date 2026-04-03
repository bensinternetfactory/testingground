# Financing Step 2b Report

## Step

- Step 2b: Audit shell, shared config, and config type contracts
- Pass result: completed
- Browser validation: not required by the harness for this shell/config/type review, so no browser run was performed

## Files Reviewed

- `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx`
- `app/(marketing)/(financing)/_components/shared-config.ts`
- `app/(marketing)/(financing)/_components/page-config-types.ts`
- `app/(marketing)/(financing)/rollback-financing/config.ts`
- `app/(marketing)/(financing)/wrecker-financing/config.ts`
- `app/(marketing)/(financing)/rotator-financing/config.ts`
- `app/(marketing)/(financing)/used-tow-truck-financing/config.ts`

## Conventions Reviewed

- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `next-best-practices`
- repo conventions from root `AGENTS.md`, `app/(marketing)/AGENTS.md`, and `app/(marketing)/CLAUDE.md`

## Routes Validated

- `/rollback-financing`
- `/wrecker-financing`
- `/rotator-financing`
- `/used-tow-truck-financing`

## Findings

### FIN-metadata-001

- Finding ID: `FIN-metadata-001`
- Status: open
- Severity: `S2-medium`
- Source skill or convention: `next-best-practices`; repo route-ownership conventions
- Rule ID or rule area: `metadata`; route ownership stays in the route file
- Pattern tag: `route-metadata-in-page-config`
- Affected components: `EquipmentFinancingPageConfig`, `rollbackFinancingPageConfig`, `wreckerFinancingPageConfig`, `rotatorFinancingPageConfig`, `usedTowTruckFinancingPageConfig`
- Affected routes: `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Shared dependency impact: the shared financing page contract still requires a `metadata` field, so every route inherits the same ownership drift
- Local or systemic: systemic
- Boundary-only: no
- Summary: Step 2a's metadata ownership issue is reaffirmed by the shared type contract. The base financing page config still requires route metadata, and each route config continues to define it inside shared config instead of the route file.
- Why this violates the cited rule: `next-best-practices` treats metadata as a route contract, and both `AGENTS.md` files keep route-level SEO ownership in the route layer. Keeping `metadata` inside the shared config type makes the wrong layer authoritative.
- Evidence:
  - `app/(marketing)/(financing)/_components/page-config-types.ts:55`
  - `app/(marketing)/(financing)/_components/page-config-types.ts:58`
  - `app/(marketing)/(financing)/rollback-financing/config.ts:21`
  - `app/(marketing)/(financing)/rollback-financing/config.ts:24`
  - `app/(marketing)/(financing)/wrecker-financing/config.ts:49`
  - `app/(marketing)/(financing)/wrecker-financing/config.ts:52`
  - `app/(marketing)/(financing)/rotator-financing/config.ts:45`
  - `app/(marketing)/(financing)/rotator-financing/config.ts:48`
  - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:15`
  - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:18`
- Fix direction: move static `metadata` exports into each `page.tsx` file, then delete `metadata` from `EquipmentFinancingPageConfig` so the shared shell contract cannot own route SEO again.
- First-seen substep: Step 2a
- Latest-reviewed substep: Step 2b
- Evidence pointer: `plans/reviews/financing-step-02b-shell-config.md`

### FIN-architecture-002

- Finding ID: `FIN-architecture-002`
- Status: open
- Severity: `S2-medium`
- Source skill or convention: `vercel-composition-patterns`; financing scope contract
- Rule ID or rule area: `patterns-explicit-variants`
- Pattern tag: `dormant-sections-in-base-shell-contract`
- Affected components: `EquipmentFinancingPageShell`, `EquipmentFinancingPageConfig`, `SHARED_TRUST_BRIDGE_CONFIG`, `buildEquipmentPrograms`
- Affected routes: `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Shared dependency impact: the base financing shell and base config type still carry dormant section branches for every financing route
- Local or systemic: systemic
- Boundary-only: no
- Summary: the shared financing shell keeps dormant section families in the base contract even though none of the four live financing configs use them. That blurs the Step 1 scope boundary and makes non-rendered sections first-class options on every financing page.
- Why this violates the cited rule: `vercel-composition-patterns` pushes explicit variants over broad optional feature surfaces. Step 1 locked `ProgramCards`, `TrustBridge`, and `EquipmentDealsSection` as dormant for current financing routes, but the base shell still imports and conditionally renders them, and the base config type still advertises them as standard page slots.
- Evidence:
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx:6`
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx:7`
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx:8`
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx:60`
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx:74`
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx:80`
  - `app/(marketing)/(financing)/_components/page-config-types.ts:64`
  - `app/(marketing)/(financing)/_components/page-config-types.ts:69`
  - `app/(marketing)/(financing)/_components/page-config-types.ts:71`
  - `app/(marketing)/(financing)/_components/shared-config.ts:10`
  - `app/(marketing)/(financing)/_components/shared-config.ts:152`
  - `app/(marketing)/(financing)/rollback-financing/config.ts:21`
  - `app/(marketing)/(financing)/wrecker-financing/config.ts:49`
  - `app/(marketing)/(financing)/rotator-financing/config.ts:45`
  - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:15`
- Fix direction: remove dormant sections from the base `EquipmentFinancingPageConfig` and shared shell until a rendered route needs them, or split an extended config/shell variant for pages that intentionally opt into dormant sections.
- First-seen substep: Step 2b
- Latest-reviewed substep: Step 2b
- Evidence pointer: `plans/reviews/financing-step-02b-shell-config.md`

### FIN-config-003

- Finding ID: `FIN-config-003`
- Status: open
- Severity: `S3-low`
- Source skill or convention: repo config-ownership conventions
- Rule ID or rule area: `config builder consistency`
- Pattern tag: `faq-builder-double-invocation`
- Affected components: `buildFaqSection`, `rollbackFinancingPageConfig`, `wreckerFinancingPageConfig`, `rotatorFinancingPageConfig`, `usedTowTruckFinancingPageConfig`
- Affected routes: `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Shared dependency impact: every financing route currently rebuilds the FAQ payload more than once before the shell renders both `FaqSection` and `JsonLd`
- Local or systemic: systemic
- Boundary-only: no
- Summary: the financing configs do not hold a single authoritative FAQ payload per route. Three routes call `buildFaqSection(...)` twice, and the used-truck route hand-builds the `faqSection` plus `faqSchema` pair separately.
- Why this violates the cited rule: repo conventions in `AGENTS.md` and `app/(marketing)/AGENTS.md` say shared config modules should remain the source of truth instead of duplicating derived route data. Here the shell consumes both `faqSection` and `faqSchema`, but the configs construct those two outputs in separate calls, which weakens the pairing contract and makes future drift easier.
- Evidence:
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx:83`
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx:87`
  - `app/(marketing)/(financing)/_components/shared-config.ts:163`
  - `app/(marketing)/(financing)/rollback-financing/config.ts:140`
  - `app/(marketing)/(financing)/rollback-financing/config.ts:169`
  - `app/(marketing)/(financing)/wrecker-financing/config.ts:168`
  - `app/(marketing)/(financing)/wrecker-financing/config.ts:197`
  - `app/(marketing)/(financing)/rotator-financing/config.ts:141`
  - `app/(marketing)/(financing)/rotator-financing/config.ts:170`
  - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:182`
  - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:185`
  - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:211`
- Fix direction: build the FAQ payload once per route, assign the result to a local constant, and derive both `faqSection` and `faqSchema` from that single value. If the used-truck route needs a different ordering rule, expose that through a dedicated shared builder instead of hand-assembling the pair inline.
- First-seen substep: Step 2b
- Latest-reviewed substep: Step 2b
- Evidence pointer: `plans/reviews/financing-step-02b-shell-config.md`

## Required Lenses

### Accessibility

- No findings. The audited shell keeps the skip link and the `main-content` landmark in the route-level shell.

### Responsive Behavior

- No findings from this step. The harness marked browser validation as not required, and the audited files do not justify runtime layout claims without a later browser-required substep.

### Core Web Vitals Risk

- No new direct CWV finding was confirmed in this step beyond the architecture/config risks above. The audited files stay server-side and do not introduce client-only hooks or hydration-only logic.

### Repo Convention Compliance

- Findings recorded: `FIN-metadata-001`, `FIN-architecture-002`, `FIN-config-003`

## No Findings

### Shell-Level Server/Client Boundary

- No findings. `EquipmentFinancingPageShell.tsx` remains a server component and the audited config files pass plain data, image references, and schema objects without introducing a client-boundary violation in this substep.

### Serialization

- No findings. The Step 2b files do not pass functions or non-serializable values through the shared financing config contract.
