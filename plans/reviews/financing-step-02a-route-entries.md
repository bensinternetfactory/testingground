# Step 2a: Route Entries And Route Metadata Contracts

## Scope

- Executed Step 2a only.
- Browser validation: not required for this pass because this step is limited to route entries and metadata contracts.

## Files Reviewed

- `app/(marketing)/(financing)/rollback-financing/page.tsx`
- `app/(marketing)/(financing)/rollback-financing/config.ts`
- `app/(marketing)/(financing)/wrecker-financing/page.tsx`
- `app/(marketing)/(financing)/wrecker-financing/config.ts`
- `app/(marketing)/(financing)/rotator-financing/page.tsx`
- `app/(marketing)/(financing)/rotator-financing/config.ts`
- `app/(marketing)/(financing)/used-tow-truck-financing/page.tsx`
- `app/(marketing)/(financing)/used-tow-truck-financing/config.ts`
- `app/(marketing)/(financing)/_components/page-config-types.ts`
- `app/(marketing)/AGENTS.md`
- `app/(marketing)/CLAUDE.md`
- `app/(marketing)/page.tsx`
- `app/(marketing)/(programs)/fleet-financing/page.tsx`

## Conventions Reviewed

- `next-best-practices`: metadata
- `vercel-react-best-practices`: server boundaries, bundle risk
- `vercel-composition-patterns`: route-to-config handoff clarity
- Repo conventions from root `AGENTS.md`, `app/(marketing)/AGENTS.md`, and `app/(marketing)/CLAUDE.md`

## Routes Validated

- `/rollback-financing`
- `/wrecker-financing`
- `/rotator-financing`
- `/used-tow-truck-financing`

## Findings

### FIN-metadata-001

- Finding ID: `FIN-metadata-001`
- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: `next-best-practices` metadata, repo route-ownership conventions
- Rule ID or rule area: `metadata`, route ownership
- Pattern tag: `route-metadata-in-page-config`
- Affected components: `rollbackFinancingPageConfig`, `wreckerFinancingPageConfig`, `rotatorFinancingPageConfig`, `usedTowTruckFinancingPageConfig`, `EquipmentFinancingPageConfig`
- Affected routes: `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Shared dependency impact: shared financing page config now owns a Next.js `Metadata` field for every audited route
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: All four financing routes move route metadata into shared page config and only re-export it from the route file, which weakens the route-level metadata contract and mixes Next route concerns into reusable content config.
- Why this violates the cited rule: the local route guides explicitly keep metadata in the route, and Next metadata is a route-segment contract. Moving it into `config.ts` means SEO changes now require editing a shared page-config object instead of the route entry that owns the segment. It also forces the shared `EquipmentFinancingPageConfig` type to depend on `Metadata`, which couples reusable config to Next route concerns instead of keeping the route as the owner.
- Evidence:
  - `app/(marketing)/AGENTS.md` requires route-level concerns, including metadata, to stay in the route.
  - `app/(marketing)/CLAUDE.md` states that the route exports `metadata: Metadata`.
  - The homepage and program routes keep `metadata` local in the route file.
  - The financing routes instead export `metadata` from route config:
    - `app/(marketing)/(financing)/rollback-financing/page.tsx:4`
    - `app/(marketing)/(financing)/wrecker-financing/page.tsx:4`
    - `app/(marketing)/(financing)/rotator-financing/page.tsx:4`
    - `app/(marketing)/(financing)/used-tow-truck-financing/page.tsx:5`
  - Each financing `config.ts` file embeds the route metadata in the shared config object:
    - `app/(marketing)/(financing)/rollback-financing/config.ts:21-34`
    - `app/(marketing)/(financing)/wrecker-financing/config.ts:49-62`
    - `app/(marketing)/(financing)/rotator-financing/config.ts:45-58`
    - `app/(marketing)/(financing)/used-tow-truck-financing/config.ts:15-29`
  - The shared config contract hard-codes `metadata: Metadata`:
    - `app/(marketing)/(financing)/_components/page-config-types.ts:55-58`
- Fix direction: move each route's `metadata` export into its `page.tsx` file, keep `config.ts` focused on rendered section data and structured data inputs, and remove the `metadata` field from `EquipmentFinancingPageConfig` once the route files become the metadata owners again.
- First-seen substep: `Step 2a`
- Latest-reviewed substep: `Step 2a`
- Evidence pointer: `plans/reviews/financing-step-02a-route-entries.md`

## No Findings

### Page Ownership

- All four route entries remain thin server route components that hand off rendering cleanly to `EquipmentFinancingPageShell`.
- No route entry pulls visual section internals back into the route file.

### Route-To-Config Handoff Quality

- The route handoff is otherwise consistent across all four audited routes.
- Each route imports a single page config object and passes it into the shared shell without introducing extra wrapper logic or client-only behavior.

### Accessibility

- No route-entry-level accessibility regression was found in this pass.
- This step did not audit runtime interactions, and browser validation was not required.

### Responsive Behavior

- No route-entry-level responsive behavior issue was found in this pass.
- The audited files contain no viewport-specific branching or layout logic.

### Core Web Vitals Risk

- No Step 2a-specific CWV issue was found in the route entries.
- The route files add no client hooks, effects, or extra async work.

### Repo Convention Compliance

- Imports use the repo alias conventions appropriately.
- Route filenames and export structure follow the current App Router layout.
