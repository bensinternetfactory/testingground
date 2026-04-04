# Step 5a: Audit Purchase-And-Terms Server Wrapper

## Scope

- Executed target: `Step 5a` only
- Files reviewed:
  - `components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx`
  - `components/sections/page/purchase-and-terms/config.ts`
  - `components/sections/page/purchase-and-terms/index.ts`
  - `components/sections/page/purchase-and-terms/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - route ownership guidance from `app/(marketing)/AGENTS.md`
  - local conventions from `components/sections/page/purchase-and-terms/CLAUDE.md`
- Routes validated:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Browser validation: not required for this step because Step 5a is limited to server-wrapper composition, prop shaping, and section containment review

## Findings

### FIN-bundle-013

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: `vercel-react-best-practices`; `next-best-practices`; local wrapper contract from `components/sections/page/purchase-and-terms/CLAUDE.md`
- Rule ID or rule area: `bundle-conditional`; RSC boundaries
- Pattern tag: `responsive-wrapper-duplicates-client-islands`
- Affected components:
  - `PurchaseAndTermsSection`
  - `PurchaseSourceGrid`
  - `TermLengthSlider`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: the shared wrapper duplicates both child island mounts for every financing route render, so each route that includes this section ships two copies of the serialized props and two hydrated client subtrees just to switch layout across breakpoints.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: `PurchaseAndTermsSection` renders mobile and desktop wrappers in parallel and mounts `PurchaseSourceGrid` plus `TermLengthSlider` inside both branches, so the responsive layout choice is implemented by CSS-hiding duplicate client islands instead of composing one server wrapper around one instance of each child.
- Why this violates the cited rule: `vercel-react-best-practices` flags unnecessary client work and duplicated serialized props as avoidable bundle cost, while `next-best-practices` pushes narrow, intentional server/client boundaries. The local `CLAUDE.md` defines this file as a server wrapper around two client children, but the current implementation mounts four client children total. That doubles hydration work and creates two parallel interactive subtrees solely for presentation differences that should be handled by one wrapper layout.
- Evidence:
  - [PurchaseAndTermsSection.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx#L39) starts a mobile-only branch and [PurchaseAndTermsSection.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx#L50) starts a second desktop-only branch instead of reusing one child composition path.
  - [PurchaseAndTermsSection.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx#L42) and [PurchaseAndTermsSection.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx#L53) each mount `PurchaseSourceGrid` with the same `config.purchaseStack` payload.
  - [PurchaseAndTermsSection.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx#L46) and [PurchaseAndTermsSection.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-and-terms/PurchaseAndTermsSection.tsx#L57) each mount `TermLengthSlider` with the same `config.termSlider` payload.
  - [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-and-terms/CLAUDE.md#L34) documents the intended boundary as one server wrapper around two client children, which the duplicated mobile/desktop branches violate in practice.
  - [config.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/purchase-and-terms/config.ts#L10) shows the wrapper config is already a simple pair of child config objects, so the extra mounts do not add variant-specific data ownership.
  - [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L11) and [financing-review-scope.md](/Users/benfranzoso/Documents/Projects/copy/plans/reviews/financing-review-scope.md#L64) lock this shared section into rendered financing-route scope for the audited review.
- Fix direction: keep a single instance of each child island and move the responsive differences into one server wrapper layout, such as one grid that stacks below `md` and switches to columns at `md`, with divider elements controlled by breakpoint classes instead of duplicating the child subtree.
- First-seen substep: `Step 5a`
- Latest-reviewed substep: `Step 5a`
- Evidence pointer: `plans/reviews/financing-step-05a-purchase-wrapper.md`

## Required Lenses

### Accessibility

- No findings. The optional section heading, eyebrow, and intro stay in semantic text elements, and this wrapper step did not reveal a server-level labeling defect beyond the duplicated island composition captured in `FIN-bundle-013`.

### Responsive Behavior

- No findings. The intended stacked-to-two-column layout is explicit in both the implementation and local `CLAUDE.md`; the defect is the duplicate responsive composition strategy, not an incorrect breakpoint contract.

### Core Web Vitals Risk

- `FIN-bundle-013` is the main risk in this step: duplicating both client islands increases serialized prop payload and hydration work for a section that could render one responsive subtree instead.

### Repo Convention Compliance

- `FIN-bundle-013` also covers the convention issue here. The route and wrapper guidance expect reusable section folders to keep their own clear ownership boundaries, and this server wrapper currently blurs that boundary by multiplying client mounts to achieve layout-only differences.

## No-Findings Summary

- Config contract clarity: no issue found. `PurchaseAndTermsConfig` keeps heading content separate from the two child config payloads, and the barrel export remains minimal.
- Section containment: no issue found. The wrapper keeps its background, width, divider, and heading concerns local to the section folder rather than leaking route assembly concerns into the shared config type.
- Semantic heading structure: no issue found. The optional eyebrow, heading, and intro are emitted in a straightforward content order without boolean-prop sprawl or cross-folder ownership drift.
