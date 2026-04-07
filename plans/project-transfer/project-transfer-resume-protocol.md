# Resume Protocol — Session Handoff

> **Authority:** `project-transfer-spec.md`
> **Generated:** 2026-04-07
> **Purpose:** Ensures safe pauses and handoffs between sessions. A new session (human or AI agent) can pick up the migration at any phase boundary without information loss.

---

## When to use this protocol

- You are starting a new session and need to continue migration work
- A different person or agent is taking over
- Work was paused mid-phase and needs to resume
- You need to verify the current state before continuing

---

## Resume Checklist

Execute this checklist at the start of every new session:

### 1. Read the execution log
- Open `project-transfer-execution-log.md`
- Find the most recent entry
- Note the **phase**, **status**, **gate decision**, and **next required action**

### 2. Identify the active phase
- Open `project-transfer-phase-gates.md`
- Find the "Active Phase" marker at the top
- Verify it matches the execution log's most recent phase

### 3. Check for blockers
- Read the most recent execution log entry's "Blockers / regressions" field
- If blockers exist: address them before resuming normal work
- If no blockers: proceed with the "Next required action"

### 4. Verify the working state
- **If in source repo:** Confirm you're on the correct branch; `git status` is clean
- **If in destination repo:** Confirm you're on the migration branch; `git status` is clean
- Run a build to confirm the codebase is in a known-good state

### 5. Confirm artifacts are current
- Spot-check the dependency matrix, source checklist, and destination checklist against actual code
- If any artifact is stale (code has changed since last session), update it before proceeding

---

## What must be recorded before stopping

Before ending any session, record the following in the execution log:

### Mandatory stop summary

| Field | Requirement |
|---|---|
| **Phase** | Current phase number and name |
| **Status** | PASS, PARTIAL, BLOCKED, or FAIL |
| **Gate decision** | GO, NO-GO, or "not yet evaluated" |
| **What was completed** | Specific checklist items finished |
| **What remains** | Specific checklist items still pending |
| **Decisions made** | Any decisions that affect future work |
| **Unresolved questions** | Questions that the next session must answer |
| **Inventories captured** | File lists, dependency findings, comparison results |
| **What must not begin** | Work that depends on the current phase completing |

### If stopping mid-phase

If you must stop before a phase gate is evaluated:
1. Record partial progress in the execution log
2. List remaining checklist items explicitly
3. Note any state that the next session needs to recreate (e.g., "dev server must be running on port 3005")
4. Do NOT update the "Active Phase" marker — the phase is still in progress

### If stopping at a phase boundary

If you completed a phase and evaluated the gate:
1. Record the full execution log entry including gate decision
2. If `GO`: update the "Active Phase" marker in `project-transfer-phase-gates.md` to the next phase
3. If `NO-GO`: leave the active phase unchanged; document blockers clearly

---

## Cross-session context preservation

### Things that are safe to derive from the codebase
- File existence and contents
- Import chains
- Package versions
- Route structure

### Things that must be recorded explicitly (not re-derivable)
- Decisions about adaptation strategies (e.g., "we decided to namespace CSS variables with `tl-` prefix")
- Compatibility findings from cross-repo comparison (destination state may change)
- Browser verification results (not reproducible from code alone)
- Which specific post-copy reconciliation steps have been completed
- Which specific pages have been verified in the browser

### Things that decay quickly
- Build/test results (code may have changed)
- Branch state (rebases, new commits)
- Deployment state

---

## Example resume scenario

> **Execution log, most recent entry:**
> Phase 5 — Smallest Viable Migration Unit
> Status: PARTIAL
> Build passes. Homepage renders. Pre-approval drawer does NOT open — investigating.
> Blocker: Hash listener not firing; suspect portal div is missing from root layout.
> Next required action: Add `<div id="pre-approval-drawer-root" />` to destination root layout.

**New session action:**
1. Read execution log → Phase 5, PARTIAL, blocker identified
2. Verify on migration branch → `git branch --show-current`
3. Read destination `app/layout.tsx` → confirm portal div is missing
4. Add portal div
5. Test drawer → verify it opens
6. Continue Phase 5 checklist
7. Record results in execution log

---

## Phase-specific resume notes

| Phase | Key context to carry forward |
|---|---|
| 0 | Scope agreement, ownership, source commit SHA |
| 1 | Source checklist results, dependency matrix verification findings |
| 2 | Destination inventory answers (U1–U12), migration branch name and base commit |
| 3 | Collision report, compatibility findings, updated dependency dispositions |
| 4 | Adaptation map, Phase 5 scope, Phase 6 batch plan |
| 5 | Which post-copy reconciliation steps are done, which pages verified, which errors resolved |
| 6 | Which batches are complete, per-batch verification results |
| 7 | Full verification results, go/no-go answers |
| 8 | Merge commit SHA, post-merge monitoring results |
