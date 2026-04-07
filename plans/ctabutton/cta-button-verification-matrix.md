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
| `CTA-INV-28` | Every canonical CTA surface (`CtaLink`, `LeadCta`, `CtaButton`) shows immediate visible pressed-state feedback on touch-down and mouse-down using the existing `usePressFeedback` + motion pattern from the drawer continue button (`PreApprovalDrawerView.tsx:486`); at least one non-opacity signal required per the production API | Tier 1: automated test firing real `pointerdown`/`touchstart` asserting pressed-state class or `whileTap` activation; Tier 2: agent-browser at mobile viewport confirming visual feedback | test name/file, route, viewport, observed pressed-state signal, tier level |
| `CTA-INV-29` | Real mobile tap on every CTA class commits correctly — DOM `.click()` is valid only for commit-plumbing proof, not for touch-first acceptance | Tier 3: real device tap by human for every affected CTA class; Tier 1 + Tier 2 are prerequisites but insufficient alone | route, CTA class, viewport, interaction source (must be "real tap"), device/browser, observed commit result |
| `CTA-INV-30` | Touch cancel on drift or scroll verified with real `touchstart` → `touchmove` beyond retention distance (`SWIPE_THRESHOLD` in `lib/press-feedback.tsx`), not synthetic `MouseEvent("click")` | Tier 1: automated test with touch event sequence; Tier 2: agent-browser pointer sequence at mobile viewport | test name/file, retention threshold used, observed cancel behavior, route for browser check |
| `CTA-INV-31` | Haptics adapter fires at commit phase for every canonical CTA surface via the existing `web-haptics` integration in `usePressFeedback`; cancel path does not trigger haptics | Tier 1: automated test with `web-haptics` mock verifying `trigger()` call on commit and absence on cancel | test name/file, adapter call log for commit and cancel paths |
| `CTA-INV-32` | Haptics adapter throw, unavailability, or missing browser support does not block pressed state, commit, navigation, analytics, or pre-approval entry on any CTA surface — matching the existing `try/catch` isolation in `lib/press-feedback.tsx:118` | Tier 1: automated test with throwing adapter | test name/file, failure mode covered, observed CTA behavior under failure |
| `CTA-INV-33` | Every execution-log browser validation entry declares its interaction source: "real tap" (Tier 3), "real click" (Tier 2), or "programmatic DOM click" (Tier 1); only "real tap" is eligible for touch-first acceptance per `CTA-INV-29` | execution-log review | entry ID, declared source, acceptance eligibility |

## Phase Applicability

| Phase | Matrix IDs that must be satisfied before exit |
| --- | --- |
| `Phase 0` | `CTA-INV-02` `CTA-INV-03` `CTA-INV-04` `CTA-INV-05` `CTA-INV-06` `CTA-INV-07` `CTA-INV-08` `CTA-INV-09` |
| `Phase 1` | `CTA-INV-12` `CTA-INV-13` `CTA-INV-14` `CTA-INV-17` `CTA-INV-18` `CTA-INV-25` `CTA-INV-26` |
| `Phase 2` | `CTA-INV-01` `CTA-INV-03` `CTA-INV-04` `CTA-INV-10` `CTA-INV-11` `CTA-INV-15` `CTA-INV-19` `CTA-INV-25` `CTA-INV-26` plus applicable baseline invariants |
| `Phase 3` | applicable caller-path checks from `CTA-INV-02` through `CTA-INV-19` for each migrated revenue-critical batch, plus `CTA-INV-16` |
| `Phase 4` | applicable caller-path checks from `CTA-INV-02` through `CTA-INV-26` for remaining caller batches |
| `Phase 5` | `CTA-INV-16` `CTA-INV-20` `CTA-INV-21` `CTA-INV-22` `CTA-INV-27` plus baseline user-facing invariants for final affected paths |
| `Phase 6` | `CTA-INV-21` `CTA-INV-22` `CTA-INV-23` `CTA-INV-24` `CTA-INV-28` `CTA-INV-29` `CTA-INV-30` `CTA-INV-31` `CTA-INV-32` `CTA-INV-33` plus final build and search validation |

Note: `CTA-INV-28` through `CTA-INV-33` are system interaction invariants that apply to every phase from Phase 2 onward. They are listed explicitly under Phase 6 as the final acceptance gate, but any phase that changes a CTA surface must also provide evidence for the applicable IDs from this range.

## Standard Verification Commands

- `npm run lint`
- `npm run build`
- targeted test command for the affected CTA feature area
- browser validation on a non-`3000` dev server for user-facing phases

## Evidence Tiers

Touch-first verification uses a three-tier evidence model. Each tier has different fidelity and different proof value.

| Tier | Method | What it proves | What it does not prove |
| --- | --- | --- | --- |
| Tier 1 | Automated tests firing real `TouchEvent`/`PointerEvent` sequences | Code paths are wired: pressed state, cancel, commit, haptics adapter calls, failure isolation | Real finger-on-glass works; visual feedback is perceptible; scroll-vs-tap disambiguation in a real mobile browser |
| Tier 2 | Agent-browser at mobile viewport size | DOM wiring works at mobile size; element is tappable; commit completes | Real touch hardware; real scroll disambiguation; haptics hardware |
| Tier 3 | Real device tap by human | Everything: finger on glass, scroll disambiguation, haptics vibration, visual feedback perception | Nothing — this is the gold standard |

Gate rule:

- Tier 1 + Tier 2 are required and automatable. No phase passes without them for every changed CTA class.
- Tier 3 is required but manual. The execution log must contain a human-verified entry with device, browser, and observed behavior before the CTA class is marked accepted.
- Entries that only have Tier 1 + Tier 2 evidence are marked `code-verified, pending device acceptance` — they are not sufficient for final touch-first acceptance.
- Existing execution-log entries that claimed mobile proof via programmatic DOM `.click()` are retroactively downgraded to Tier 1 evidence only.

## Evidence Rules

- Every execution-log entry must cite the matrix IDs it covered.
- If a requirement was not exercised, record it as `not verified` and do not mark the phase complete.
- Browser validation notes must include route, viewport class, trigger path, and observed result.
- Search-based verification must include the exact query used and whether matches remain.
- Every browser validation entry must declare its interaction source per `CTA-INV-33`: "real tap" (Tier 3), "real click" (Tier 2), or "programmatic DOM click" (Tier 1).
- DOM `.click()` is valid for commit-plumbing proof (`CTA-INV-08`, `CTA-INV-10`, `CTA-INV-11`) but is not valid for touch-first acceptance (`CTA-INV-28`, `CTA-INV-29`).
