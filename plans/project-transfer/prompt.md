You are acting as a systems engineer preparing a high-consequence partial migration from this Next.js repository into another existing Next.js repository.

This is a preparation and transfer-planning task, not an implementation task.

Do not start migrating code.
Do not start rewriting files in the destination repo.
Do not give generic migration advice.
Do not collapse the work into a single long response.

Your job is to produce an operational migration planning system, with explicit artifacts, hard stop points, and evidence requirements, similar to a governed migration runbook.

# Mission

Prepare this source repository for a controlled partial migration into another existing Next.js project that already has Convex attached.

# Source-repo-specific scope

Treat this repository as a config-driven App Router marketing site.

The in-scope source surface is:

- the route tree under `app/(marketing)`
- relevant top-level `app` files that materially affect those routes:
  - `app/layout.tsx`
  - `app/globals.css`
  - `app/global-error.tsx`
  - `app/not-found.tsx`
- any non-`app` dependency required to move those routes safely, including:
  - `components/sections/**`
  - `components/shared/**`
  - `components/ui/**` if actually referenced
  - `features/pre-approval/**`
  - `features/cta/**`
  - `lib/**`
  - `public/**` assets referenced by in-scope routes or their dependencies

The excluded source surface is:

- `app/(internal)`
- any file or folder not required by the in-scope route tree after dependency tracing proves it is irrelevant

Important repository reality:

- do not assume that “everything important is inside `/app`”
- route files in this repo are often thin composition shells
- many migration-relevant contracts live outside `/app`, especially in `components/sections`, `features/pre-approval`, and `features/cta`
- route-group conventions, layout wrappers, config exports, public assets, and feature-owned CTA/runtime contracts may all be migration-critical
- do not assume there are API route handlers; verify whether `route.ts` / `route.tsx` files actually exist before discussing them

# Non-negotiable operating rules

- Do not assume compatibility.
- Do not assume naming, routing, provider, alias, styling, analytics, auth, or backend patterns will match.
- Do not promise zero regressions. Instead, define a process that minimizes regression risk and blocks transfer or merge unless evidence supports proceeding.
- Treat every dependency, interface, provider, event contract, asset reference, and side effect as potentially migration-relevant until proven otherwise.
- Organize all work into phases with hard stop points between phases.
- Each phase must preserve enough context that a future session can resume safely.
- The destination repo must perform migration work on a new dedicated migration branch, not an existing working branch.
- If something cannot be verified from the codebase, mark it `Unverified` and state exactly how to verify it.
- Be explicit about what belongs to the source repo, what belongs to the destination repo, and what requires cross-repo comparison.

# Primary deliverable mode

Do not return the migration plan only as chat text.

Instead, produce a document set under `plans/project-transfer/` that functions as the governing runbook for the migration.

Create or overwrite these markdown artifacts:

1. `plans/project-transfer/project-transfer-spec.md`
2. `plans/project-transfer/project-transfer-dependency-matrix.md`
3. `plans/project-transfer/project-transfer-source-checklist.md`
4. `plans/project-transfer/project-transfer-destination-checklist.md`
5. `plans/project-transfer/project-transfer-copy-manifest.md`
6. `plans/project-transfer/project-transfer-phase-gates.md`
7. `plans/project-transfer/project-transfer-execution-log.md`
8. `plans/project-transfer/project-transfer-go-no-go.md`
9. `plans/project-transfer/project-transfer-rollback-plan.md`
10. `plans/project-transfer/project-transfer-destination-prompt.md`

If an eleventh artifact would materially reduce ambiguity, you may also create:

- `plans/project-transfer/project-transfer-resume-protocol.md`

If you create it, reference it consistently from the other artifacts.

# Required artifact roles

## 1. Governing spec

`project-transfer-spec.md` is the governing document.

It must contain:

- executive summary
- in-scope source surface
- explicit exclusions
- major risks
- key unknowns
- source migration inventory
- branching and isolation strategy for the destination repo
- phased migration plan
- hard stop / resume expectations
- cross-repo questions that must be answered before execution

This document should describe the system, not become the only place where checklists and gates live.

## 2. Dependency transfer matrix

`project-transfer-dependency-matrix.md` must be a first-class artifact, not a short appendix.

For every dependency used by in-scope code, include:

- dependency name
- dependency type:
  - npm package
  - internal component
  - hook
  - utility/lib
  - provider/context
  - type/schema
  - backend/data access
  - env var
  - style/design token
  - middleware/auth/session
  - analytics/telemetry
  - asset/static file
  - test dependency
- where it is used
- whether it is direct or indirect
- migration disposition:
  - transfer unchanged
  - transfer with adaptation
  - reimplement in destination
  - map to existing destination equivalent
  - defer
  - blocker
- why that disposition is correct
- failure mode if handled incorrectly
- verification method after transfer

The matrix must reflect this repo’s actual structure, including config-driven section dependencies and feature-owned CTA/pre-approval contracts where relevant.

## 3. Source checklist

`project-transfer-source-checklist.md` must be a strict source-side checklist.

For each item include:

- item
- why it matters
- how to verify it
- pass/fail criteria
- which phase it belongs to
- whether failure is a hard blocker

It must cover at minimum:

- scope confirmation
- route and layout inventory
- route-group behavior
- route-level metadata and schema behavior
- loading, error, global-error, and not-found behavior
- server/client component boundaries
- config-driven section composition
- provider/context dependencies
- CTA and pre-approval feature coupling
- alias/path assumptions
- lib/util coupling
- env vars
- backend/data assumptions
- styling dependencies
- public assets and static references
- middleware assumptions
- analytics/logging/error reporting
- tests available / missing
- known risky areas
- excluded-but-referenced code

## 4. Destination checklist

`project-transfer-destination-checklist.md` must be a strict destination-side checklist.

It must explicitly include:

- creation of a new dedicated migration branch
- a naming recommendation for that branch
- confirmation that no unrelated work is mixed into the branch
- baseline lint/build/test state on that branch before any transfer
- route collision check
- layout and provider-tree compatibility check
- alias/path compatibility check
- styling/design-system compatibility check
- auth/session compatibility check
- Convex compatibility check
- environment variable compatibility check
- runtime/deployment compatibility check
- observability compatibility check
- merge protection criteria

For each checklist item include:

- item
- why it matters
- how to verify it
- pass/fail criteria
- hard blocker or not
- phase assignment

## 5. Phase gates

## 5. Copy manifest

`project-transfer-copy-manifest.md` must define the physical transfer bundle for the destination repo.

This artifact is required because the likely transfer method is manual folder/file copying.

It must include:

- exact files and folders to copy from the source repo
- exact files and folders that must not be copied
- whether each item must preserve its relative path exactly
- whether each item is required for the smallest viable transfer or only for later phases
- why each copied item is included
- what will break if it is omitted
- any rename or remap expectation that should happen only after the copy lands in the destination repo

It must also include these sections:

- `Copy as-is first`
- `Do not copy blindly`
- `Copy only if referenced by traced dependencies`
- `Post-copy reconciliation required`

The manifest must reflect this repo’s actual architecture. If a route under `app/(marketing)` depends on code in `components/sections`, `features/pre-approval`, `features/cta`, `lib`, or `public`, the manifest must say so explicitly.

The manifest must favor preserving source-relative structure during the initial copy so the destination repo can adapt imports and integration points afterward in a controlled way.

## 6. Phase gates

`project-transfer-phase-gates.md` must be the operational runbook, modeled after a governed migration checklist.

It must:

- declare exactly one active phase at a time
- include preconditions, execution checklist items, and go/no-go gates for each phase
- require evidence recording in the execution log before a phase can be marked complete
- tell the executor to stop if any required item cannot be checked

Required phases:

- `Phase 0`: Scope lock and migration charter
- `Phase 1`: Source inventory and dependency extraction
- `Phase 2`: Destination inventory on a new branch
- `Phase 3`: Compatibility and collision analysis
- `Phase 4`: Transfer design and adaptation map
- `Phase 5`: Smallest viable migration unit
- `Phase 6`: Incremental expansion
- `Phase 7`: Pre-merge validation
- `Phase 8`: Merge decision and rollback readiness

For each phase provide:

- purpose
- preconditions
- execution checklist
- required evidence/artifacts
- go / no-go gate

## 7. Execution log

`project-transfer-execution-log.md` must be the evidence ledger.

It must include:

- purpose
- status legend (`PASS`, `BLOCKED`, `FAIL`, `PARTIAL`)
- reusable entry template
- instruction that the log must be updated in the same batch as any migration-planning or execution work

Each entry template must include:

- date
- agent
- phase
- batch / scope
- status
- changes made
- files created or updated
- commands run
- automated verification results
- browser verification results if applicable
- evidence summary
- gate decision (`GO` or `NO-GO`)
- blockers / regressions
- next required action

## 8. GO / NO-GO artifact

`project-transfer-go-no-go.md` must be a first-class pre-merge gate, not just one section inside another file.

It must define:

- `GO criteria`
- `NO-GO criteria`
- `evidence required`
- `approving questions that must be answered`

It must explicitly cover:

- branch hygiene
- dependency parity or approved adaptation
- route validation
- layout/provider validation
- CTA and pre-approval contract validation if migrated
- Convex/data validation
- auth/session validation
- error/loading/not-found validation
- observability validation
- rollback readiness
- acceptable known issues vs unacceptable unknowns

## 9. Rollback plan

`project-transfer-rollback-plan.md` must be a first-class rollback artifact.

It must distinguish:

- rollback before merge
- rollback after merge but before release
- rollback after release

Include:

- rollback triggers
- symptoms requiring immediate rollback
- what can be fixed forward vs what must be reverted
- branch-level rollback strategy
- pre-merge rollback readiness requirements
- post-merge rollback steps
- data/backend rollback considerations
- feature-flag or route-isolation considerations if available
- logging/monitoring signals to watch after release
- what artifacts must exist to execute rollback safely

## 10. Destination prompt

`project-transfer-destination-prompt.md` must be a prompt the destination repo can execute later.

It should assume the source-side artifacts already exist and instruct the destination repo to:

- read the source-side artifacts first
- work only on a new migration branch
- perform destination inventory before transfer
- compare destination architecture against the source dependency matrix
- log findings in a governed, phased way
- stop at each phase gate
- refuse to proceed when evidence is missing
- use `project-transfer-copy-manifest.md` as the authoritative source for what to copy into the destination repo

It must ask the destination repo to provide concrete answers about:

- package versions
- folder structure
- `/app` structure
- providers
- auth/session model
- Convex patterns
- shared components
- lib structure
- aliases
- middleware
- env vars
- styling system
- test/build/deploy/runtime details
- observability stack

# Required analysis content

While producing the artifact set, your analysis must address this repository’s actual architecture.

At minimum, verify and reflect:

- the public route surface is primarily under `app/(marketing)`
- the top-level `app/layout.tsx` and route-group layouts may materially affect transferability
- `app/(marketing)/layout.tsx` mounts `PreApprovalDrawerRoot`, so provider/runtime dependencies outside `/app` are in scope
- route files often assemble imported section/config modules rather than owning all behavior directly
- CTA behavior may be mediated by `features/cta`
- pre-approval drawer, hash-entry, route handoff, and trigger attribute contracts may be mediated by `features/pre-approval`
- public image and asset references under `public/` may be required to render transferred routes correctly
- route-level tests and feature tests may exist and should be inventoried as evidence, not assumed complete

# Hard-stop and resume protocol

The generated artifact set must support safe pauses and handoffs between sessions.

If you choose not to create `project-transfer-resume-protocol.md`, then the governing spec and phase-gates file together must explicitly define:

- what summary artifact is required before stopping after each phase
- what decisions must be recorded
- what unresolved questions must be carried forward
- what inventories or file lists must be captured
- what must not begin until the next phase formally starts

# Output behavior

Your final response should be brief.

It should:

- name the files you created or updated
- summarize the major repo-specific adjustments you made to the planning system
- call out any unverified assumptions you had to leave open

Do not paste the full artifact contents into chat if they were written to files.
