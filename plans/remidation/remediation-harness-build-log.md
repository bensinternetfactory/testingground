# Remediation Harness Build Log

## Module Status

- [x] Module 1: registry foundation
- [ ] Module 2: dependency + policy core
- [ ] Module 3: prompt payload generation
- [ ] Module 4: CLI wiring for `validate`, `next`, and `prompt`
- [ ] Module 5: locks, artifacts, and preflight
- [ ] Module 6: validators
- [ ] Module 7: orchestrator + fake runner
- [ ] Module 8: real runner adapters

## Module 1

- Date: `2026-04-05`
- Scope:
  - added reusable remediation contracts in `scripts/remediation/types.ts`
  - translated the finance ledger into a concrete TypeScript registry in `scripts/remediation/programs/finance-pages.ts`
  - encoded the FAQ composite as `FIN-faq-unification` in registry data instead of prose
  - added registry validation and indexing in `scripts/remediation/harness/registry.ts`
  - added focused registry tests in `scripts/__tests__/remediation/registry.test.ts`
- Decisions:
  - registry format is TypeScript source, not JSON/YAML
  - source markdown stays evidence only; registry units are the normalized execution queue
  - stale `plans/reviews/...` evidence pointers were normalized to the real `plans/financing-pages/...` step files inside the registry
- Outputs:
  - `scripts/remediation/types.ts`
  - `scripts/remediation/harness/registry.ts`
  - `scripts/remediation/programs/finance-pages.ts`
  - `scripts/__tests__/remediation/registry.test.ts`
- Verification:
  - `npm test -- scripts/__tests__/remediation/registry.test.ts`
  - `npm run lint scripts/remediation scripts/__tests__/remediation`
- Next module boundary:
  - implement dependency resolution and policy selection without touching runner/orchestrator code

## Notes For The Next Agent

- The finance registry currently contains `18` remediation units because `FIN-config-003` and `FIN-schema-016` were merged into one composite unit.
- The first explicit dependency already encoded is `FIN-patterns-007 -> FIN-architecture-006`.
- `trackerPath` is declared but intentionally not created yet; tracker/state persistence belongs to a later module.
