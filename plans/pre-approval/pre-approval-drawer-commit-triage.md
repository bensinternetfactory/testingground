# Pre-Approval Drawer Commit Triage

## Purpose

This document records the commit triage that must happen before the migration advances beyond `Phase 2`.

It exists to answer one question:

- which recent commits define the live drawer baseline closely enough that `Phase 3` must not proceed until they are reconciled?

## Repository State At Triage Time

Date: `2026-04-06`

- current branch: `main`
- upstream: `origin/main`
- divergence at triage time: `ahead 1`, `behind 0`

Implication:

- there is not a remote `50`-commit merge backlog waiting on `origin/main`
- there is a recent local history of roughly `50` commits, and a smaller subset of those commits materially define the pre-approval drawer baseline
- the migration should treat that smaller subset as the blocker set for `Phase 3`

## Phase 3 Blocker Set

These commits are Phase 3 blockers because they directly changed one or more of:

- drawer runtime behavior
- hash open behavior
- route-sync behavior
- portal/mount behavior
- scroll-lock behavior
- CTA entry semantics
- layout ownership for the mounted marketing runtime

| Commit | Scope | Why it blocks `Phase 3` | Required action before `Phase 3` |
| --- | --- | --- | --- |
| `0a58157` | Initial introduction of the drawer surface | Establishes the original drawer/filesystem baseline and initial CTA wiring | treat as historical baseline anchor during any blame/revert analysis |
| `1624084` | Rollback page CTA navigation and drawer context | Changed rollback page entry behavior and drawer context usage | confirm Phase 3 does not regress rollback CTA entry behavior |
| `55c3e5a` | `RippleCtaLink`, hero wiring, rollback page data | Changed authored CTA emission behavior in a shared entry component | verify authored trigger attributes and CTA callers still match assumptions |
| `917e19b` | hero-gallery + drawer integration | Added a live drawer-integrated caller surface | include hero-gallery callers in baseline impact review before changing runtime contract |
| `c64ddd1` | App route groups and marketing layouts | Changed layout ownership and route tree boundaries around mounted runtime | confirm current mount location and route reset assumptions still match post-reorg app structure |
| `89f4445` | Drawer hardening + CTA/hero/config updates | Major runtime/trigger/config change touching drawer internals and authored callers | treat as the largest migration-sensitive baseline commit; reconcile explicitly before Phase 3 |
| `f21d214` | iOS feel + scroll-lock architecture | Changed close/motion/scroll-lock behavior central to Phase 3 | keep as baseline for touch, scroll-lock, and dismiss-path verification |
| `8d1af81` | UX bug fixes + exit animation shift | Changed close sequencing and modal/sheet UX details | preserve these UX corrections during Phase 3 runtime wrapping |
| `c80b17d` | Portal creation and app layout | Changed mount/portal safety behavior | ensure Phase 3 root contract does not reintroduce render-phase portal issues |
| `76e19a2` | State vs trigger orchestration split | Introduced the listener/provider separation the migration now builds on | keep as a structural baseline for parser/runtime ownership |
| `83fd815` | explicit route-sync logic | Replaced pathname remount behavior with route listener semantics | Phase 3 must preserve route-change reopen/reset semantics from this commit |
| `ce98c89` | behavioral tests + continue animation fix | Added the baseline regression suite and fixed continue behavior | keep these tests green and treat them as authoritative invariants |
| `a6d010b` | canonical feature modules + migration docs | Introduced the feature-owned API and Phase 1 migration state | current migration work depends on this commit; do not bypass it |

## Phase 5 Dependency Set

These commits are important, but they are primarily caller-migration dependencies rather than immediate `Phase 3` blockers.

- `d04de64` `Strengthen hero-gallery semantics, crawlability, and reusability`
- `c28d72d` `Fix mobile nav: restore logo/hamburger, fix iOS scroll bleed`
- `3e6df85` `Update sticky nav interactions`
- `a9b874d` `Complete nav checkpoint 2`
- `5edb803` `Refactor sticky nav composition`
- `323d7e5` `Add outline-dark RippleCtaLink variant and dark TertiaryActionsStrip`
- `1073c69` `Add Framed Selector Deck hero variant and rollback financing v2 preview`
- `da24818` `Promote HeroConvertFramed to production rollback financing page`
- `9e2c8bf` `Rollback hero cleanup: outline CTAs, footnotes, dynamic drawer title, mobile spacing`
- `88e067a` `Rollback financing rebuild: components, drawer, config, and docs`
- `0c94429` `Refactor rollback financing page architecture`
- `b99cca6` `Add countdown chip, layout alignment, slider restyle, and CTA strip to rollback page`
- `20afbec` `Redesign nav dropdowns with image icons, hover states, and responsive sizing`
- `2f8df30` `Restyle nav: bigger logo, subtle hover, green truck icons, active trigger bg`
- `ef38d0b` `Clean up ripple colors, remove leasing section, and add navbar todo`
- `c3a34e8` `Add tile-right hero variant and wire used-tow-truck page to EquipmentFinancingPageShell`
- `9ce0666` `Replace deals grid with interactive purchase-and-terms on used-tow-truck page`
- `be6c138` `Refactor financing config authoring order`
- `6a3b292` `Add content-image-split section and update closing CTA`
- `d328ee0` `Split financing route configs by page`
- `544d150` `Fix financing route metadata ownership`
- `17dfd1a` `Fix financing FAQ config contracts`
- `9fc32a0` `Build fleet financing program page`
- `ebc20cf` `Build deferred payment financing program page`
- `0df8ed5` `Build private party financing program page`
- `7962be6` `Build zero-down tow truck financing page`
- `8e20b60` `Polish zero-down page: sidebar, cards, closing CTA`
- `7fbf11f` `Restyle zero-down sidebar and rebalance article layout`
- `7df89b1` `Execute zero-down Phase 2 refinements`
- `6c212b4` `Refactor zero-down program page`

Use this set during `Phase 5` caller migration planning unless one of these commits is found to have changed a caller that `Phase 3` must touch immediately.

## Non-Blocking Docs / Process Commits

These commits do not block the migration runtime work directly:

- `f929efe` `Document full data flow from CTA through drawer to pre-approval page`
- `6cc23a6` `Update drawer CLAUDE.md to reflect current architecture`
- `d206d06` `Mark drawer cleanup as complete — no further work recommended`
- `52ed844` `Update drawer review tracking with commit hashes and instructions`
- `7081bc2` `Move financing review docs to financing-pages`
- `a1330ee` `Add financing review final report`
- `40e0494` `Add financing review audit docs`
- `1389e76` `Add financing review harness`
- `c2fff59` `Add financing review workflow plan`
- `aee06f9` `Remove stale SEO audit report`

## Recommendation

Pragmatic decision:

1. accept the blocker-set commits above as the current drawer baseline
2. treat any future changes against those areas as ordinary regression risk, not as a separate commit-integration project
3. keep the migration parked at `Phase 2` until the next explicit implementation phase begins

Why this is the right call:

- every blocker-set commit is already reachable from the current `main`
- there is no remote merge backlog to reconcile first
- delaying on a fake integration task would add process without reducing risk

Current decision:

- blocker-set commits are blessed as the current baseline
- commit-triage alone is no longer a blocker to future migration work
- `Phase 3` still does not begin automatically; it requires an explicit next batch
