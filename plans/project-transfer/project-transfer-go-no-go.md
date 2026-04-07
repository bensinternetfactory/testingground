# GO / NO-GO — Pre-Merge Gate

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Purpose:** First-class pre-merge gate. Every criterion must be evaluated before the migration branch merges to the destination's default branch. This is not a summary — it is a decision document.

---

## GO Criteria

All of the following must be true for a `GO` decision:

### Branch Hygiene
- [ ] Migration branch contains only migration-related commits
- [ ] Migration branch is rebased on or merged with latest destination default branch
- [ ] No merge conflicts remain
- [ ] Commit history is clean and reviewable

### Dependency Parity or Approved Adaptation
- [ ] Every dependency in the transfer matrix has disposition `Transfer unchanged`, `Map to existing` (with mapping confirmed), or `Transfer with adaptation` (with adaptation completed)
- [ ] No `Blocker` dispositions remain
- [ ] All "Map to existing" items verified: destination equivalent functions correctly
- [ ] All "Transfer with adaptation" items verified: adaptation is complete and tested

### Route Validation
- [ ] Every transferred route renders in browser without error
- [ ] No existing destination routes are broken by the transfer
- [ ] URL segments match source exactly (no unintended path changes)
- [ ] Loading states work for each route group
- [ ] 404 behavior works for non-existent routes under transferred groups

### Layout/Provider Validation
- [ ] `PreApprovalDrawerRoot` is mounted in the correct layout position
- [ ] `<div id="pre-approval-drawer-root" />` exists in root layout
- [ ] Provider tree does not cause context conflicts
- [ ] Layout nesting produces correct visual hierarchy

### CTA and Pre-Approval Contract Validation
- [ ] `CtaLink` renders and navigates correctly
- [ ] `LeadCta` opens the pre-approval drawer
- [ ] Hash entry (`#get-pre-approved`) opens the drawer
- [ ] Data attributes (`data-pre-approval-*`) are present on rendered CTA elements
- [ ] Drawer amount slider functions (drag, min/max, step)
- [ ] Drawer continue button navigates to correct URL with query params
- [ ] Drawer closes on escape, overlay click, and route change
- [ ] Drawer scroll lock works (body doesn't scroll behind drawer)
- [ ] Press feedback (ripple animation) functions on CTAs

### Convex/Data Validation
- [ ] No transferred component makes Convex queries or mutations
- [ ] Transferred server components render correctly within Convex provider tree (if applicable)
- [ ] No runtime errors related to Convex in transferred pages

### Auth/Session Validation
- [ ] All transferred marketing routes are accessible without authentication
- [ ] Destination middleware does not redirect or block transferred routes
- [ ] No session-dependent behavior is broken

### Error/Loading/Not-Found Validation
- [ ] Error boundaries catch and display errors gracefully
- [ ] Loading skeletons appear during navigation
- [ ] 404 page displays for invalid routes
- [ ] Global error boundary works for uncaught errors
- [ ] Phone numbers and copy in error pages are correct for destination

### Observability Validation
- [ ] If destination has analytics: CTA `analytics` props are wired (or documented as future work)
- [ ] If destination has error reporting: error boundaries are integrated (or documented as future work)
- [ ] `PreApprovalEvent` callback is wired to destination analytics (or documented as future work)
- [ ] No excessive console warnings or errors

### Rollback Readiness
- [ ] `project-transfer-rollback-plan.md` has been reviewed
- [ ] Rollback can be executed within the documented timeframe
- [ ] Rollback triggers are understood by the team
- [ ] Pre-merge rollback is trivial (delete branch)
- [ ] Post-merge rollback strategy is documented and tested (if applicable)

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
| Can you build? | _________ | Build log |
| Can you ship? | _________ | Full verification log |
| Can you rollback? | _________ | Rollback plan review |
| Is the scope complete? | _________ | Route verification checklist |
| Is anything unknown? | _________ | Open questions list (must be empty or all accepted) |

---

## Acceptable Known Issues vs Unacceptable Unknowns

### Acceptable known issues (may proceed with GO)
- Missing analytics wiring (documented as post-merge follow-up)
- Missing test transfer (tests deferred; source tests remain as reference)
- Minor visual differences due to font rendering or CSS variable values (documented)
- `NEXT_PUBLIC_MINI_ROI_DEBUG` env var not set (debug feature, no production impact)

### Unacceptable unknowns (block GO)
- Untested route that may or may not render
- Unresolved route collision
- Unknown auth/middleware behavior on transferred routes
- Unresolved Convex provider interaction
- Missing pre-approval drawer functionality without root cause
- Build warnings that were not present before migration

---

## Final Decision

| Field | Value |
|---|---|
| **Decision** | _________ (GO / NO-GO) |
| **Date** | _________ |
| **Decided by** | _________ |
| **Execution log entry** | _________ (entry number) |
| **Notes** | _________ |
