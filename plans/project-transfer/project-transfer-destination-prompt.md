# Destination Prompt — Execute in Destination Repository

> **Authority:** `project-transfer-spec.md` (in source repo)
> **Generated:** 2026-04-07
> **Updated:** 2026-04-07
> **Purpose:** This prompt is designed to be executed by an AI agent (or followed by a human) in the destination repository. It initiates the destination-side work of the TowLoans marketing migration.

---

You are acting as a systems engineer receiving a governed partial migration from a source Next.js repository into this destination repository.

This is NOT a green-field task. You are integrating existing, analyzed code into an existing codebase.

## Non-negotiable governance rules

These rules apply to every action you take under this prompt. Violations are grounds for immediate stop.

1. **Read the execution log first.** Before any work, open `project-transfer-execution-log.md` and find the most recent entry. Note the phase, status, gate decision, and next required action.
2. **Confirm the active phase.** Open `project-transfer-phase-gates.md` and verify the "Active Phase" marker matches the execution log. If they disagree, stop and reconcile before doing anything else.
3. **Execute only the currently authorized phase.** Do not begin work on Phase N+1 until Phase N's gate is `GO` and the active-phase marker has been updated.
4. **Update gates and log in the same batch.** Every batch of work must update both `project-transfer-phase-gates.md` (checklist items) and `project-transfer-execution-log.md` (evidence entry) before the batch is considered complete.
5. **Do not check off any item without matching evidence.** Every checkbox in the phase gates must have a corresponding evidence entry in the execution log. If you cannot produce the evidence, leave the box unchecked.
6. **Update the active-phase marker only after a GO gate.** The "Active Phase" line in `project-transfer-phase-gates.md` changes only when the current phase's gate decision is `GO`. A `NO-GO` or `PARTIAL` status leaves the marker unchanged.
7. **Stop immediately on Unverified, missing, blocked, or inconsistent state.** If any required evidence is missing, any precondition is unmet, any artifact is inconsistent, or any check returns `Unverified`, stop and record a `NO-GO` with the specific blocker.
8. **Use `project-transfer-resume-protocol.md` for session handoffs.** If you must pause, record the mandatory stop summary in the execution log before ending.

## What has already been done

The source repository has completed **Phase 0 (Scope Lock and Migration Charter)** of a governed migration. Phase 0's gate decision is `GO` as of 2026-04-07. **Phase 1 (Source Inventory and Dependency Extraction) is active** — it must be completed and its gate must be `GO` before this destination prompt is executed.

**Do not execute this prompt until the execution log confirms Phase 1 is `GO`.**

The following artifacts exist in the source repo under `plans/project-transfer/`:

1. `project-transfer-spec.md` — governing document (scope, risks, unknowns, phased plan)
2. `project-transfer-dependency-matrix.md` — every source dependency with type, disposition, failure mode
3. `project-transfer-source-checklist.md` — verified source-side checklist
4. `project-transfer-destination-checklist.md` — your checklist (the one you must complete)
5. `project-transfer-copy-manifest.md` — exact files to copy, exclude, and reconcile
6. `project-transfer-phase-gates.md` — operational runbook with hard stops
7. `project-transfer-execution-log.md` — evidence ledger (you must append to it)
8. `project-transfer-go-no-go.md` — pre-merge gate criteria
9. `project-transfer-rollback-plan.md` — rollback strategies
10. `project-transfer-resume-protocol.md` — session handoff protocol
11. `project-transfer-phase-prompts.md` — copy-paste phase prompts with governance rules

**Read all source artifacts before doing any work.** They are the authoritative reference for this migration.

## Your job

Complete the destination-side phases of the migration as defined in `project-transfer-phase-gates.md`, starting from Phase 2 (after Phase 1's gate is `GO`).

You must:
- Confirm Phase 1's gate is `GO` in the execution log before starting Phase 2
- Work only on a new dedicated migration branch (recommended: `migration/towloans-marketing`)
- Complete each phase fully before moving to the next
- Record evidence in the execution log at every phase boundary
- Update the phase gate checklist in the same batch as the evidence
- Stop at every phase gate — do not proceed if a gate is `NO-GO`
- Use `project-transfer-copy-manifest.md` as the authoritative source for what to copy
- Refuse to proceed when evidence is missing
- Update the active-phase marker only after a `GO` gate decision

## Phase 2: Destination Inventory

This is your first phase. Before any code is transferred, you must provide a complete inventory of this destination repository.

### Branch setup

1. Create a new branch from your default branch: `git checkout -b migration/towloans-marketing`
2. Confirm the branch is clean: `git status`
3. Run baseline build, lint, and test — record results

### Inventory questions

Answer each of the following with concrete facts from this repository. Do not guess.

#### Package versions
- What are the exact versions of `next`, `react`, `react-dom` in `package.json`?
- Is `framer-motion` installed? If so, what version?
- Is `clsx` installed? What about `tailwind-merge`?
- Is `class-variance-authority` installed?
- Is `radix-ui` (or `@radix-ui/*`) installed?
- Is `lucide-react` installed?
- Is `web-haptics` installed?
- Is `tw-animate-css` installed?

#### Folder structure
- What is the top-level directory structure?
- Does a `components/` directory exist? What is its structure?
- Does a `features/` directory exist?
- Does a `lib/` directory exist? What utilities does it contain?

#### `/app` structure
- What is the full route tree under `app/`?
- Are there existing routes at any of these URLs?
  - `/`, `/about`
  - `/fleet-financing`, `/deferred-payment-tow-truck-financing`, `/zero-down-tow-truck-financing`, `/private-party-tow-truck-financing`
  - `/rollback-financing`, `/rotator-financing`, `/wrecker-financing`, `/used-tow-truck-financing`
  - `/tow-truck-calculator`
  - `/resources/how-much-does-a-tow-truck-cost`, `/resources/section-179-tow-truck`, `/resources/tow-truck-lease-vs-loan`, `/resources/tow-truck-financing-companies`
- What layouts exist? Read the content of each `layout.tsx`.
- Are there `loading.tsx`, `error.tsx`, `not-found.tsx`, `global-error.tsx` files?

#### Providers
- What providers wrap the layout tree? List them in order from outermost to innermost.
- Is there a theme provider? What does it use?
- Where would `PreApprovalDrawerRoot` be inserted in the provider tree?
- Is there a `<div id="pre-approval-drawer-root" />` or equivalent portal target in the root layout?

#### Auth/Session model
- What auth library is used (Clerk, NextAuth, Auth.js, custom)?
- Is there session management?
- Does middleware enforce auth on any routes?
- Which routes are public vs protected?

#### Convex patterns
- Where is the Convex provider mounted?
- What does the Convex schema look like?
- Are there Convex queries or mutations that might interact with transferred code?
- Would transferred server components render inside or outside the Convex provider?

#### Shared components
- Does the destination use shadcn/ui? If so, what `components.json` config?
- Is there a `Button` component? How is it implemented?
- Is there a `cn()` utility? Where?
- What icon library is used?

#### Lib structure
- What is in the `lib/` directory?
- Are there any utilities that overlap with the source's `lib/utils.ts` or `lib/press-feedback.tsx`?

#### Aliases
- What does `tsconfig.json` `compilerOptions.paths` contain?
- Does `@/*` map to the project root?

#### Middleware
- Does `middleware.ts` exist? What does it do?
- Does it redirect, rewrite, or block any paths?
- Would it affect the transferred marketing routes?

#### Env vars
- What `.env*` files exist?
- Are there any env vars that would conflict with `NEXT_PUBLIC_MINI_ROI_DEBUG`?

#### Styling system
- What version of Tailwind is installed?
- Is it Tailwind v3 (with `tailwind.config.js`) or v4 (with `@import "tailwindcss"`)?
- What PostCSS config is used?
- What CSS variables are defined in `globals.css`?
- Specifically: do any of these exist? `--primary`, `--background`, `--foreground`, `--secondary`, `--border`, `--ring`, `--radius`, `--nav-height`

#### Test/Build/Deploy/Runtime
- What test framework is used?
- What is the build command?
- What deployment platform is used?
- What Node.js version is targeted?
- Is there CI/CD? What does it run?

#### Observability stack
- Is there error reporting (Sentry, DataDog, etc.)?
- Is there analytics (GA4, Segment, Mixpanel, etc.)?
- Is there logging infrastructure?

### Output format

For each section above, provide:
1. The concrete answer from this repository
2. Whether it creates a compatibility concern with the source (refer to dependency matrix)
3. If there's a concern: proposed resolution

### After completing inventory

1. Record all findings in the execution log using the full entry template
2. Update the Phase 2 checklist in `project-transfer-phase-gates.md` **in the same batch**
3. Evaluate Phase 2 gate
4. If `GO`: update the active-phase marker to Phase 3, then proceed
5. If `NO-GO`: leave the active-phase marker unchanged, document blockers, and stop

## Subsequent phases

After Phase 2, continue with Phases 3–8 as defined in `project-transfer-phase-gates.md`. At each phase:

1. Read the execution log — confirm the prior phase's gate is `GO`
2. Verify the active-phase marker matches the phase you are about to start
3. Read the phase preconditions — confirm they are met
4. Execute the checklist items
5. Record evidence in the execution log **in the same batch** as checklist updates
6. Evaluate the go/no-go gate
7. If `GO`: update the active-phase marker to the next phase
8. If `NO-GO`: leave the active-phase marker unchanged, document blockers, and stop

For Phase 5+ (actual code transfer), use `project-transfer-copy-manifest.md` as the authoritative source for what to copy. Do not copy files not listed in the manifest. Do not skip post-copy reconciliation steps.

## Additional rules

These supplement the non-negotiable governance rules at the top of this document:

- Work only on the migration branch
- Do not modify files unrelated to the migration
- If something cannot be verified, mark it `Unverified` and state how to verify it
- If you encounter an undocumented dependency or behavior, add it to the dependency matrix and execution log before proceeding
- Use `project-transfer-resume-protocol.md` if you need to pause and resume later
- If resuming a previously started phase, read the execution log first to identify what was already completed and what remains before continuing
