# Step 4c: Boundary Review Dormant Mid-Page Shared Sections

## Scope

- Executed target: `Step 4c` only
- Files reviewed:
  - `components/sections/page/program-cards/ProgramCards.tsx`
  - `components/sections/page/program-cards/config.ts`
  - `components/sections/page/program-cards/index.ts`
  - `components/sections/page/program-cards/CLAUDE.md`
- Coupling evidence reviewed:
  - `app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx`
  - `app/(marketing)/(financing)/_components/page-config-types.ts`
  - `app/(marketing)/(financing)/_components/shared-config.ts`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/page/program-cards/CLAUDE.md`
- Routes validated:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Browser validation: not required for this step because Step 4c is limited to dormant financing-shell coupling review and does not make route-visible interaction or layout claims

## Findings

### FIN-architecture-002

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: `vercel-composition-patterns`; repo component-ownership conventions
- Rule ID or rule area: `patterns-explicit-variants`
- Pattern tag: `dormant-sections-in-base-shell-contract`
- Affected components:
  - `EquipmentFinancingPageShell`
  - `EquipmentFinancingPageConfig`
  - `ProgramCards`
  - `buildEquipmentPrograms`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: the base financing shell and config contract still reserve a shared `programs` slot and builder for a dormant section that none of the audited financing routes render.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: `ProgramCards` remains wired into the shared financing shell contract even though none of the four audited financing route configs provide `programs`, and the shared `buildEquipmentPrograms` helper has no financing-route call sites in this pass.
- Why this violates the cited rule: `vercel-composition-patterns` favors explicit variant ownership over keeping dormant branches in a shared base contract. Leaving `ProgramCards` in the canonical financing shell API means every financing route still carries a section slot that belongs to a different composition path, which increases drift risk when shell order, section ownership, or config types change.
- Evidence:
  - [ProgramCards.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/ProgramCards.tsx#L66) keeps the section self-contained and server-rendered, which means the coupling problem is not inside the section implementation itself.
  - [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/program-cards/CLAUDE.md#L33) documents `ProgramCards` as a reusable server component with a local config contract.
  - [EquipmentFinancingPageShell.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx#L7) imports `ProgramCards`, and [EquipmentFinancingPageShell.tsx](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/EquipmentFinancingPageShell.tsx#L60) still reserves a top-level render slot for `config.programs`.
  - [page-config-types.ts](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/page-config-types.ts#L15) imports `ProgramCardsConfig`, and [page-config-types.ts](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/page-config-types.ts#L64) exposes `programs?: ProgramCardsConfig` on the base `EquipmentFinancingPageConfig`.
  - [shared-config.ts](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/shared-config.ts#L21) keeps a shared dormant programs payload in financing config space, and [shared-config.ts](/Users/benfranzoso/Documents/Projects/copy/app/(marketing)/(financing)/_components/shared-config.ts#L152) exports `buildEquipmentPrograms` even though a repo-wide search in this pass found no financing route config call sites for that helper or for a `programs:` config field.
  - [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L124) explicitly classifies `components/sections/page/program-cards/*` as dormant shared scope for the audited financing routes.
- Fix direction: remove `programs` from the base `EquipmentFinancingPageConfig` and `EquipmentFinancingPageShell`, and move `ProgramCards` composition behind an explicit extended route variant or route-local assembly path if a financing route later needs that section.
- First-seen substep: `Step 2b`
- Latest-reviewed substep: `Step 4c`
- Evidence pointer: `plans/reviews/financing-step-04c-dormant-mid-sections.md`

## Required Lenses

### Accessibility

- No findings. `ProgramCards` is dormant on the audited financing routes, so this pass did not surface a route-visible accessibility defect beyond the shared shell ownership issue above.

### Responsive Behavior

- No findings. The component includes responsive layout classes, but Step 4c does not make runtime claims because the section is not currently rendered on the audited financing routes.

### Core Web Vitals Risk

- No findings. `ProgramCards` stays server-rendered and only delegates CTA interaction to the shared client CTA primitive, so this step did not find a current financing-route CWV regression beyond the latent shell-contract drift captured in `FIN-architecture-002`.

### Repo Convention Compliance

- `FIN-architecture-002` covers the step's main convention issue: the shared financing shell owns a dormant section contract that should live in an explicit variant or route-local composition instead of the base financing page type.

## No-Findings Summary

- Section-local API clarity: no issue found. The `ProgramCardsConfig` shape is explicit and self-contained, and this pass did not find boolean-prop sprawl or compound-state issues inside the dormant section itself.
- Server/client boundary placement: no issue found. `ProgramCards` remains a server component, and the local `CLAUDE.md` correctly documents that only the shared CTA primitive is client-side.
- Next.js and repo-local structure: no issue found. The section keeps its config, implementation, barrel export, and local `CLAUDE.md` in the same directory, which matches the repo ownership conventions for reusable section folders.
