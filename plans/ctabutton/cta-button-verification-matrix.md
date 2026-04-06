# CTA Button Verification Matrix

## Purpose

This document maps CTA migration requirements to concrete verification steps and evidence.

Use it with:

- `plans/ctabutton/cta-button-migration-spec.md`
- `plans/ctabutton/cta-button-phase-gates.md`
- `plans/ctabutton/cta-button-execution-log.md`
- `plans/ctabutton/checklist.md`

No phase is complete until each applicable requirement below has evidence recorded in the execution log.

## Requirement Matrix

| ID | Requirement | Minimum verification | Evidence to record |
| --- | --- | --- | --- |
| `CTA-INV-01` | Internal CTA navigation renders without `legacyBehavior`, `passHref`, or nested anchor usage | automated test and code review | test name/file, file reviewed, observed DOM shape |
| `CTA-INV-02` | External CTA navigation renders as a native `<a>` with safe `_blank` rel behavior | automated test | test name/file, rendered attributes |
| `CTA-INV-03` | Disabled CTA compatibility path still renders a non-interactive button | automated test and browser validation when user-facing | test name/file, route checked, observed behavior |
| `CTA-INV-04` | Pre-approval CTA composition reuses the canonical pre-approval trigger attribute builder | automated test and code review | test name/file, builder path reviewed |
| `CTA-INV-05` | Press feedback baseline matches the live subsystem: touch-down alone does not commit, commit happens on click, and ripple or haptics are tied to commit handling | automated test and browser validation where user-facing | route, viewport, interaction notes, test reference |
| `CTA-INV-06` | Touch drift or scroll cancel prevents commit | automated test and browser validation for representative path | test name/file, interaction notes |
| `CTA-INV-07` | Keyboard activation remains semantically correct for links and buttons | automated test and browser validation | test name/file, interaction notes |
| `CTA-INV-08` | A single interaction commits at most once | automated test | test name/file, duplicate-commit path covered |
| `CTA-INV-09` | Reduced-motion behavior preserves semantic correctness and suppresses motion-only ripple behavior where applicable | automated test and browser validation | test name/file, route checked, observed behavior |
| `CTA-INV-10` | Haptics failures do not block commit | automated test | test name/file, failure mode covered |
| `CTA-INV-11` | Analytics observer failures do not block commit or navigation | automated test | test name/file, failure mode covered |
| `CTA-INV-12` | Existing `@/components/ui/ripple-cta-link` imports still compile until cutover | `npm run build` | build result and affected consumers |
| `CTA-INV-13` | Existing deep imports of `@/components/ui/ripple-cta-link/RippleCtaLink` still compile until cutover | `npm run build` and targeted search | build result, search query, remaining consumers |
| `CTA-INV-14` | Canonical `@/features/cta/*` modules resolve cleanly with existing alias/tooling | `npm run build` | build result, modules verified |
| `CTA-INV-15` | Compatibility wrapper maps legacy props to canonical contracts without behavior regression | automated test and browser validation for affected path | test name/file, mapping covered, route checked |
| `CTA-INV-16` | New production CTA work uses canonical feature modules, not the compatibility wrapper | targeted search and code review | exact query, files checked, results |
| `CTA-INV-17` | No CTA code manually constructs pre-approval query strings or trigger attributes | targeted search and code review | exact query, results, files reviewed |
| `CTA-INV-18` | Shared `lib/press-feedback.tsx` consumers remain intact while CTA ownership changes | targeted test command and `npm run build` | test files run, build result, affected consumers |
| `CTA-INV-19` | Legacy analytics payload compatibility remains exact until consumers are migrated | automated test | test name/file, expected payload, observed payload |
| `CTA-INV-20` | Wrapper-only props (`section`, `cardId`, compatibility-only `children` patterns where applicable) are removed from production callers before final wrapper deletion | targeted search, code review, and `npm run build` | exact query, results, build result |
| `CTA-INV-21` | No production import of `@/components/ui/ripple-cta-link` remains before final deletion | targeted search and `npm run build` | exact query, results, build result |
| `CTA-INV-22` | No production import of `@/components/ui/ripple-cta-link/RippleCtaLink` remains before final deletion | targeted search and `npm run build` | exact query, results, build result |
| `CTA-INV-23` | `components/ui/ripple-cta-link/` directory does not exist after final cleanup | filesystem check | `find` or `ls` result |
| `CTA-INV-24` | Public CTA API is exactly the canonical feature-owned surface documented in the production API | filesystem inventory and manual review | `ls` output, reviewed files |
| `CTA-INV-25` | Direct `usePressFeedback` consumers outside the wrapper still behave correctly after shared-runtime changes | targeted automated tests and browser validation for representative user-facing paths | test names, routes checked, affected consumers |
| `CTA-INV-26` | Direct pre-approval trigger-attribute builders outside the wrapper still emit the canonical schema after CTA composition changes | targeted automated tests and code review | test names, files reviewed, affected surfaces |
| `CTA-INV-27` | Wrapper deletion is blocked until every deep import, `children` override, and `cardId` site has explicit closure evidence | execution-log closure table and targeted search | closure table entry, search query, remaining sites |

## Phase Applicability

| Phase | Matrix IDs that must be satisfied before exit |
| --- | --- |
| `Phase 0` | `CTA-INV-02` `CTA-INV-03` `CTA-INV-04` `CTA-INV-05` `CTA-INV-06` `CTA-INV-07` `CTA-INV-08` `CTA-INV-09` |
| `Phase 1` | `CTA-INV-12` `CTA-INV-13` `CTA-INV-14` `CTA-INV-17` `CTA-INV-18` `CTA-INV-25` `CTA-INV-26` |
| `Phase 2` | `CTA-INV-01` `CTA-INV-03` `CTA-INV-04` `CTA-INV-10` `CTA-INV-11` `CTA-INV-15` `CTA-INV-19` `CTA-INV-25` `CTA-INV-26` plus applicable baseline invariants |
| `Phase 3` | applicable caller-path checks from `CTA-INV-02` through `CTA-INV-19` for each migrated revenue-critical batch, plus `CTA-INV-16` |
| `Phase 4` | applicable caller-path checks from `CTA-INV-02` through `CTA-INV-26` for remaining caller batches |
| `Phase 5` | `CTA-INV-16` `CTA-INV-20` `CTA-INV-21` `CTA-INV-22` `CTA-INV-27` plus baseline user-facing invariants for final affected paths |
| `Phase 6` | `CTA-INV-21` `CTA-INV-22` `CTA-INV-23` `CTA-INV-24` plus final build and search validation |

## Standard Verification Commands

- `npm run lint`
- `npm run build`
- targeted test command for the affected CTA feature area
- browser validation on a non-`3000` dev server for user-facing phases

## Evidence Rules

- Every execution-log entry must cite the matrix IDs it covered.
- If a requirement was not exercised, record it as `not verified` and do not mark the phase complete.
- Browser validation notes must include route, viewport class, trigger path, and observed result.
- Search-based verification must include the exact query used and whether matches remain.
