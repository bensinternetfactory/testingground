# GO / NO-GO — Pre-Merge Gate

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Purpose:** First-class pre-merge gate. Every criterion must be evaluated before the migration branch merges to the destination's default branch. This is not a summary — it is a decision document.

---

## GO Criteria

All of the following must be true for a `GO` decision:

### Branch Hygiene
- [x] Migration branch contains only migration-related commits
- [x] Migration branch is rebased on or merged with latest destination default branch
- [x] No merge conflicts remain
- [x] Commit history is clean and reviewable

### Dependency Parity or Approved Adaptation
- [x] Every dependency in the transfer matrix has disposition `Transfer unchanged`, `Map to existing` (with mapping confirmed), or `Transfer with adaptation` (with adaptation completed)
- [x] No `Blocker` dispositions remain
- [x] All "Map to existing" items verified: destination equivalent functions correctly
- [x] All "Transfer with adaptation" items verified: adaptation is complete and tested

### Route Validation
- [x] Every transferred route renders in browser without error
- [x] No existing destination routes are broken by the transfer
- [x] URL segments match source exactly (no unintended path changes)
- [x] Loading states work for each route group
- [x] 404 behavior works for non-existent routes under transferred groups

### Layout/Provider Validation
- [x] `PreApprovalDrawerRoot` is mounted in the correct layout position
- [x] `<div id="pre-approval-drawer-root" />` exists in root layout
- [x] Provider tree does not cause context conflicts
- [x] Layout nesting produces correct visual hierarchy

### CTA and Pre-Approval Contract Validation
- [x] `CtaLink` renders and navigates correctly
- [x] `LeadCta` opens the pre-approval drawer
- [x] Hash entry (`#get-pre-approved`) opens the drawer
- [x] Data attributes (`data-pre-approval-*`) are present on rendered CTA elements
- [x] Drawer amount slider functions (drag, min/max, step)
- [x] Drawer continue button navigates to correct URL with query params
- [x] Drawer closes on escape, overlay click, and route change
- [x] Drawer scroll lock works (body doesn't scroll behind drawer)
- [x] Press feedback (ripple animation) functions on CTAs
- [x] **Drawer → `/pre-approval` handoff verified:** `amount` param prefills `requestedAmount` ($100,000 badge shown). `trucktype` param is ignored gracefully (user sees truck type step — no crash, no blank state). Documented as accepted known gap.

### Convex/Data Validation
- [x] No transferred component makes Convex queries or mutations
- [x] Transferred server components render correctly within Convex provider tree (if applicable)
- [x] No runtime errors related to Convex in transferred pages

### Auth/Session Validation
- [x] All transferred marketing routes are accessible without authentication
- [x] Destination middleware does not redirect or block transferred routes
- [x] No session-dependent behavior is broken

### Error/Loading/Not-Found Validation
- [x] Error boundaries catch and display errors gracefully
- [x] Loading skeletons appear during navigation
- [x] 404 page displays for invalid routes
- [x] Global error boundary works for uncaught errors
- [x] Phone numbers and copy in error pages are correct for destination

### Observability Validation
- [x] If destination has analytics: CTA `analytics` props are wired (or documented as future work)
- [x] If destination has error reporting: error boundaries are integrated (or documented as future work)
- [x] `PreApprovalEvent` callback is wired to destination analytics (or documented as future work)
- [x] No excessive console warnings or errors

### Rollback Readiness
- [x] `project-transfer-rollback-plan.md` has been reviewed
- [x] Rollback can be executed within the documented timeframe
- [x] Rollback triggers are understood by the team
- [x] Pre-merge rollback is trivial (delete branch)
- [x] Post-merge rollback strategy is documented and tested (if applicable)

---

## NO-GO Criteria

Any of the following triggers an immediate `NO-GO`:

- Build fails on migration branch
- Existing destination tests fail (regression)
- Any transferred page does not render in browser
- Pre-approval drawer does not open from any entry point
- Route collision is unresolved
- Auth middleware blocks transferred routes with no exemption
- Convex provider causes runtime errors on transferred pages
- Unresolved `Blocker` disposition in dependency matrix
- Missing evidence for any Phase 5–7 gate
- Rollback plan has not been reviewed

---

## Evidence Required

Each GO criterion must be backed by evidence in `project-transfer-execution-log.md`:

| Category | Evidence type |
|---|---|
| Branch hygiene | `git log` output showing only migration commits |
| Dependency parity | Updated dependency matrix with all dispositions resolved |
| Route validation | Browser verification log for every transferred page |
| Layout/provider | Screenshot or description of correct layout rendering |
| CTA/pre-approval | Step-by-step browser verification of drawer flow |
| Convex/data | Confirmation that no Convex calls are made by transferred code |
| Auth/session | Unauthenticated browser visit to each transferred route |
| Error/loading | Triggered error and loading states (if possible) |
| Observability | Console log review showing no errors |
| Rollback | Written confirmation that rollback plan was reviewed |

---

## Approving Questions

These must be answered `Yes` before a `GO` decision:

1. **Can you build?** — Does `next build` succeed with zero new errors?
2. **Can you ship?** — Would you deploy this to production today?
3. **Can you rollback?** — If something breaks post-merge, can you undo it within the documented timeframe?
4. **Is the scope complete?** — Are all in-scope routes transferred and verified?
5. **Is anything unknown?** — Are there any unanswered questions that could cause post-merge surprises?

| Question | Answer | Evidence |
|---|---|---|
| Can you build? | **Yes** | `next build` passes, all 33 routes generated, zero new errors |
| Can you ship? | **Yes** | All 15 marketing pages verified in browser, zero console errors, zero regressions |
| Can you rollback? | **Yes** | Pre-merge: delete branch. Post-merge: `git revert -m 1`. Rollback plan reviewed. |
| Is the scope complete? | **Yes** | All 15 in-scope marketing routes transferred and browser-verified |
| Is anything unknown? | **No** | Only accepted known gaps: `trucktype` param not consumed (documented), analytics wiring deferred, pre-existing test failures root-caused |

---

## Acceptable Known Issues vs Unacceptable Unknowns

### Acceptable known issues (may proceed with GO)
- Missing analytics wiring (documented as post-merge follow-up)
- Missing test transfer (tests deferred; source tests remain as reference)
- Minor visual differences due to font rendering or CSS variable values (documented)
- `NEXT_PUBLIC_MINI_ROI_DEBUG` env var not set (debug feature, no production impact)
- **`trucktype` URL param not consumed by destination `/pre-approval` page** — The marketing drawer's `buildPreApprovalHref()` navigates to `/pre-approval?amount=X&trucktype=Y`. The destination page reads `amount` (lines 90–112 of `app/(public)/pre-approval/page.tsx`) and prefills `requestedAmount`/`fundingAmount` correctly, but ignores `trucktype`. The user lands on the truck type step and must re-select manually. This is a graceful degradation, not a breakage. Implementing `trucktype` param reading requires changes to the Convex-backed application flow (form state, step skip logic in `useFlow`, `stepConditions.ts`) and must be done as a careful follow-up — separate commit or PR with its own testing.

### Unacceptable unknowns (block GO)
- Untested route that may or may not render
- Unresolved route collision
- Unknown auth/middleware behavior on transferred routes
- Unresolved Convex provider interaction
- Missing pre-approval drawer functionality without root cause
- Build warnings that were not present before migration
- Pre-existing test failures not baselined or resolved — the 13 pre-existing failures (7/15 suites) on destination `main` must either be fixed before Phase 7 validation or explicitly documented with root causes so migration regressions can be distinguished

---

## Final Decision

| Field | Value |
|---|---|
| **Decision** | **GO** |
| **Date** | 2026-04-07 |
| **Decided by** | claude |
| **Execution log entry** | Entry 15 |
| **Notes** | All GO criteria satisfied. Build, lint, tests pass (pre-existing failures root-caused, zero migration regressions). All 15 transferred pages browser-verified. Pre-approval drawer verified from 3 entry points with `/pre-approval` handoff confirmed. Rollback plan reviewed. Branch is clean with 2 migration-only commits. |
