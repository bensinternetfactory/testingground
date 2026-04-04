# Financing Step 6c: Closing CTA

## Scope

- Executed substep: `Step 6c` only
- Files reviewed:
  - `components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx`
  - `components/sections/page/equipment-closing-cta/config.ts`
  - `components/sections/page/equipment-closing-cta/index.ts`
  - `components/ui/ripple-cta-link/RippleCtaLink.tsx`
  - `components/ui/ripple-cta-link/index.ts`
  - `components/sections/page/equipment-closing-cta/CLAUDE.md`
  - `components/ui/ripple-cta-link/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo conventions from `AGENTS.md`
  - local contracts from the two step-specific `CLAUDE.md` files
- Routes validated:
  - `/rollback-financing`
- Browser validation:
  - Required by the harness and completed on port `3005`
  - Desktop viewport: `1280x900`
  - Mobile viewport: `iPhone 14` emulation (`390x844`)

## Findings

### FIN-a11y-019

- Finding ID: `FIN-a11y-019`
- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: repo accessibility conventions
- Rule ID or rule area: `accessibility; mobile tap-target quality`
- Pattern tag: `closing-cta-inline-phone-target-too-small`
- Affected components: `EquipmentClosingCta`
- Affected routes: `/rollback-financing` (runtime-observed); any financing route that renders `contactBlock`
- Shared dependency impact: the shared closing-CTA component defines the fallback phone treatment everywhere a route opts into `contactBlock`
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: the secondary phone contact inside the closing CTA is rendered as a small inline text link with no padding or minimum target size, so the fallback contact path is difficult to tap on mobile.
- Why this violates the cited rule: the page-end contact option is a real action, not passive copy. On small screens it should be comfortably tappable, but the current implementation keeps it inside a `text-sm` paragraph with an unpadded inline anchor.
- Evidence:
  - `components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx:43` renders the entire contact block as one `text-sm` paragraph.
  - `components/sections/page/equipment-closing-cta/EquipmentClosingCta.tsx:45` renders the phone action as a plain inline `<a>` with underline styling only.
  - Desktop browser pass on `/rollback-financing` showed the phone link as secondary microcopy beneath the primary CTA.
  - Mobile browser pass on `/rollback-financing` showed the phone link as a narrow inline hit area directly under the primary button instead of a touch-sized secondary action.
- Fix direction: promote the phone fallback to a dedicated secondary CTA treatment on mobile, such as a padded pill/button or a stacked secondary row with minimum hit-area sizing.

## No Findings

### CTA Semantics

- No findings. The primary closing CTA remains a real link with visible text, a large hit area, and no nested interactive content.

### Drawer Or Route Transition Behavior

- No findings. On `/rollback-financing`, clicking the visible closing CTA opened the financing drawer in place on both desktop and mobile without navigating away from the route.

### Focus Order Near Page End

- No findings. After opening the drawer on desktop, a `Tab` pass exposed only the drawer controls (`Close`, amount slider, `Continue to Pre-Approval`) in the interactive snapshot, which is consistent with focus moving into the active overlay instead of leaking into the page footer.

### Core Web Vitals Risk

- No findings. The closing CTA uses one narrow client island (`RippleCtaLink`) for interaction only, and Step 6c did not uncover extra effects, observers, or layout-shift behavior in the audited area.

### Repo Convention Compliance

- No findings. The closing section stays server-rendered, the CTA interaction remains isolated to the shared client primitive, and the local `CLAUDE.md` server/client boundary guidance matches the implementation.

### `vercel-composition-patterns`

- No findings. The closing CTA API is narrow and explicit, with one optional `contactBlock` branch rather than variant sprawl or leaked shared state.

### `vercel-react-best-practices`

- No findings. `RippleCtaLink` keeps the client boundary scoped to the CTA primitive, and the Step 6c runtime pass did not reveal rerender churn or hydration instability in the closing CTA path.

### `next-best-practices`

- No findings. The primary CTA uses `next/link` via the shared primitive for internal navigation behavior, and the audited files do not introduce metadata, script, or invalid server/client-boundary problems.

## Browser Evidence Notes

- Desktop validation ran on `http://192.168.50.155:3005/rollback-financing` at `1280x900`.
- I scrolled to the closing CTA, confirmed the primary button rendered with a large pill target, clicked `Get Pre-Approved`, and observed the financing drawer overlay open on the same route.
- After the drawer opened, a `Tab` interaction yielded an interactive snapshot containing only drawer controls, supporting the expected focus handoff into the active overlay.
- Mobile validation ran on the same route using `iPhone 14` emulation.
- I scrolled to the closing CTA, confirmed the main button remained large and centered, tapped `Get Pre-Approved`, and observed the drawer open as a bottom-sheet style overlay.
- The mobile pass also showed the fallback phone link as a much smaller inline text target beneath the main CTA, which produced `FIN-a11y-019`.
