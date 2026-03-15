# Closing CTA Review

Scope: `components/sections/page/closing-cta`

Skills / criteria used:
- `.agents/skills/web-design-guidelines/SKILL.md`
- `.agents/skills/vercel-react-best-practices/SKILL.md`
- `.agents/skills/vercel-composition-patterns/SKILL.md`

Notes:
- The requested path `.claude/skills/vercel-react-best-practices/SKILL.md` was not present in this repo. I used the equivalent local skill at `.agents/skills/vercel-react-best-practices/SKILL.md`.
- Web Interface Guidelines were checked against the current upstream rules from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`.

## Accessibility Issues

| Severity | File | Rule / source | Problem | Recommendation |
| --- | --- | --- | --- | --- |
| Medium | `components/sections/page/closing-cta/ClosingCta.tsx:28` | Web guidelines: images need `alt` or `alt=""` if decorative | The benefit icons sit next to text labels that already communicate the same meaning, so the current alt text is likely redundant. Screen readers will announce both the icon alt and the visible heading. | Treat these icons as decorative in this component: use `alt=""`, and update the config contract so decorative icons do not require authored alt text. |
| Medium | `components/sections/page/closing-cta/config.ts:34` | Web guidelines: decorative images should not add extra announcement noise | The config requires non-empty `icon.alt` values, which encourages redundant accessible names for icons that appear purely supportive here. | Make `alt` optional or allow an explicit decorative mode so the config matches the actual accessibility intent. |
| Medium | `components/sections/page/closing-cta/ClosingCta.tsx:68` | Web guidelines: interactive elements need visible focus | The phone link has hover styling but no explicit `focus-visible` treatment. Keyboard users do not get the same clear focus affordance that the primary CTA provides. | Add a visible `focus-visible` style such as a ring or outline offset, not just color change. |

## Code Issues

| Severity | File | Rule / source | Problem | Recommendation |
| --- | --- | --- | --- | --- |
| Medium | `components/sections/page/closing-cta/ClosingCta.tsx:45` | Vercel composition patterns: explicit variants / avoid duplicated conditional structure | The primary CTA is rendered twice only to swap between `label` and `shortLabel` across breakpoints. This duplicates markup and makes future CTA changes easy to apply to one branch and miss in the other. | Render a single CTA and swap text inside it with responsive spans, or extract one small wrapper component that owns the label-selection logic. |
| Medium | `components/sections/page/closing-cta/config.ts:16` | Web guidelines: handle empty states for empty arrays | `benefits` is modeled as a generic array, but the component always renders the list container. If the component is reused with an empty array, it produces an empty section with missing content and spacing. | Guard the list render or enforce a non-empty benefits contract for this section-level component. |
| Low | `components/sections/page/closing-cta/ClosingCta.tsx:2` | Vercel React best practices: `bundle-barrel-imports` | `RippleCtaLink` is imported from the folder barrel (`@/components/ui/ripple-cta-link`) instead of the concrete module file. For this local barrel the cost is small, but it still works against the direct-import guidance. | Import from the concrete file path if the repo is standardizing on direct source imports for UI primitives. |
| Low | `components/sections/page/closing-cta/ClosingCta.tsx:15` | Web guidelines: use `text-wrap: balance` or `text-pretty` on headings | The section headline lacks any heading wrap control, so it can produce awkward line breaks on intermediate widths. | Add `text-balance` or `text-pretty` to the heading if that utility pattern is accepted in the project. |

## Summary

- Highest-signal accessibility issues: redundant icon alt text and missing explicit keyboard focus styling on the phone link.
- Highest-signal code issue: duplicated CTA rendering for responsive copy.
- Lower-priority cleanup: empty-state guarding for `benefits`, direct import hygiene, and heading wrap polish.
