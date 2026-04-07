# Rollback Plan

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Purpose:** First-class rollback artifact. Defines rollback strategies for three stages: before merge, after merge but before release, and after release.

---

## Rollback Stages

| Stage | Risk level | Complexity | Time to rollback |
|---|---|---|---|
| Before merge | None | Trivial | Seconds |
| After merge, before release | Low | Simple | Minutes |
| After release | Medium–High | Moderate | Minutes to hours |

---

## Stage 1: Rollback Before Merge

### When this applies
The migration branch has not been merged to the destination's default branch.

### Rollback strategy
**Delete or abandon the migration branch.** No destination code has been affected.

### Steps
1. Ensure no one else is working on the migration branch
2. `git checkout main` (or destination default branch)
3. `git branch -D migration/towloans-marketing` (local)
4. `git push origin --delete migration/towloans-marketing` (remote, if pushed)

### What is preserved
- All source artifacts in source repo under `plans/project-transfer/`
- Execution log with findings from Phases 0–7
- All analysis can be reused for a retry

### What is lost
- Any destination-specific adaptation work on the migration branch
- Post-copy reconciliation work

### Restart path
- Create a new migration branch
- Re-execute from the appropriate phase using execution log as context

---

## Stage 2: Rollback After Merge, Before Release

### When this applies
The migration branch has been merged to the destination's default branch, but the merged code has NOT been deployed to production.

### Rollback strategy
**Revert the merge commit.**

### Steps
1. Identify the merge commit SHA: `git log --merges -1`
2. `git revert -m 1 <merge-commit-SHA>` — creates a new commit that undoes the merge
3. Run `next build` — confirm build passes
4. Run test suite — confirm no regressions
5. Push the revert commit
6. Record in execution log

### Why revert instead of reset
- `git reset --hard` rewrites history and is dangerous on shared branches
- `git revert` is safe, auditable, and preservable

### What is preserved
- Full git history including the migration work and its revert
- Can re-merge later by reverting the revert

### What is lost
- The merged migration code is removed from the default branch
- Any post-merge work on top of migration code must be cherry-picked or redone

---

## Stage 3: Rollback After Release

### When this applies
The merged migration code has been deployed to production.

### Rollback strategy
**Revert the merge commit and deploy the revert.** Or use deployment platform rollback if available.

### Steps

#### Option A: Git revert + deploy
1. `git revert -m 1 <merge-commit-SHA>`
2. Run `next build` — confirm build passes
3. Run test suite
4. Push and trigger deployment
5. Monitor for successful rollback

#### Option B: Platform rollback (e.g., Vercel)
1. Use deployment platform to promote previous known-good deployment
2. This is faster but does not fix the git state
3. Follow up with git revert after platform rollback

### Steps for either option
1. Immediately communicate rollback to team
2. Record rollback in execution log with timestamp and reason
3. Investigate root cause
4. Plan re-migration after root cause is fixed

---

## Rollback Triggers

Initiate rollback if any of the following occur:

### Critical triggers (rollback immediately)
- Production build fails after merge
- Any existing destination page returns 500 or blank screen
- Auth/session system is disrupted
- Convex queries fail on non-migration pages
- Deployment pipeline is blocked by migration code

### High triggers (rollback within 1 hour if not resolved)
- Multiple transferred pages return 404 or 500
- Pre-approval drawer causes JavaScript errors that affect other pages
- CSS variables from migration overwrite destination theme, corrupting non-migration pages
- Console errors on non-migration pages that were not present before merge

### Medium triggers (investigate, fix-forward if possible)
- Individual transferred page renders incorrectly
- Pre-approval drawer doesn't open (isolated to migration pages)
- Missing images on transferred pages
- Minor visual regressions on transferred pages

---

## Symptoms Requiring Immediate Rollback

| Symptom | Why it's critical |
|---|---|
| Non-migration pages broken | Migration has damaged existing functionality |
| Build pipeline blocked | Team cannot ship other work |
| Auth/login flow broken | Users locked out |
| Convex errors on dashboard/app pages | Core product functionality impacted |
| Deployment crashes or timeouts | Infrastructure instability |

---

## Fix-Forward vs Revert Decision Matrix

| Scenario | Fix forward? | Revert? |
|---|---|---|
| Single CSS issue on one migration page | Yes | No |
| Missing image asset | Yes | No |
| Import error affecting one migration page | Yes | No |
| CSS variable collision affecting non-migration pages | No | Yes |
| Provider error cascading to non-migration pages | No | Yes |
| Build failure | No | Yes |
| Multiple pages broken with unclear root cause | No | Yes |
| Single migration page 404 (missing route file) | Yes | No |

---

## Branch-Level Rollback Strategy

### Before merge
- Delete branch: zero risk, zero residue

### After merge
- Revert commit: creates clean audit trail
- Never use `git reset --hard` on shared branches
- Never force-push to default branch

### Re-migration after rollback
1. Diagnose root cause from execution log and error reports
2. Create a new migration branch (e.g., `migration/towloans-marketing-v2`)
3. Cherry-pick working commits from original migration branch if applicable
4. Fix identified issues
5. Re-execute Phase 5+ with updated adaptation map

---

## Pre-Merge Rollback Readiness Requirements

Before Phase 8 (merge decision), confirm:

- [ ] Team knows how to revert a merge commit
- [ ] Deployment platform rollback procedure is documented (if applicable)
- [ ] Monitoring is in place for post-merge observation
- [ ] Communication channel for rollback notification is identified
- [ ] Execution log is up to date (provides context for post-rollback diagnosis)

---

## Data/Backend Rollback Considerations

**Source has no backend/database dependencies.** Transferred code is purely frontend.

However, if the destination repo's Convex backend is affected:
- Convex schema changes: roll back schema changes separately from code
- Convex data: no data migration is part of this transfer, so no data rollback needed
- Convex functions: no Convex functions are being added by this migration

**Key assumption:** This migration adds zero backend code. If this assumption changes, update this section.

---

## Feature Flag / Route Isolation Considerations

### If the destination supports feature flags
- Consider gating transferred routes behind a feature flag during initial deployment
- This allows instant disable without git revert
- Implementation: conditionally render marketing routes based on flag

### If the destination uses route-level isolation
- Transferred routes under `(marketing)` route group are naturally isolated
- Removing the route group directory removes all transferred routes
- This provides a manual "kill switch" at the filesystem level

### Recommended approach
If the destination has a feature flag system, use it for the initial deployment. If not, rely on git revert as the rollback mechanism.

---

## Logging/Monitoring Signals to Watch After Release

| Signal | Where to watch | What to look for |
|---|---|---|
| Build status | CI/CD pipeline | Build failures after merge |
| Error rate | Error reporting (Sentry, etc.) | Spike in JavaScript errors |
| 404 rate | Server logs / analytics | New 404s on transferred or existing routes |
| Page load time | Performance monitoring | Degraded load times (large asset bundle) |
| Console errors | Browser dev tools | JavaScript errors on any page |
| Deployment status | Deployment platform | Failed or stuck deployments |
| User reports | Support channels | User-facing issues |

### Monitoring window
- First 1 hour: active monitoring (check all signals manually)
- First 24 hours: passive monitoring (alerts should catch issues)
- First week: periodic spot-checks

---

## Artifacts Required to Execute Rollback Safely

| Artifact | Why needed |
|---|---|
| Merge commit SHA | To revert the correct commit |
| `project-transfer-execution-log.md` | Context for diagnosis |
| `project-transfer-dependency-matrix.md` | To understand what was transferred |
| `project-transfer-copy-manifest.md` | To understand what files were added |
| Pre-merge baseline build/test results (DC-03) | To compare against post-rollback state |
| Deployment platform access | To trigger platform-level rollback if needed |
