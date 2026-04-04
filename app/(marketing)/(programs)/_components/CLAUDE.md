# Program Page Components

## Config Contract
- `ProgramPageConfig` in `page-config-types.ts` is the single source of truth for program-page copy and composition.
- Keep page files thin: export `metadata` from config and render `ProgramPageShell`.
- User-visible article content belongs in `sections`, not in block components.

## Block Extension Rules
- Add new article patterns by extending the `ProgramSection` union.
- Create one renderer in `blocks/` for the new kind.
- Register that renderer in `ProgramSectionRenderer.tsx`.
- Do not add shell-level branching for individual block kinds.

## Content Authoring
- Prefer plain strings for paragraphs when possible.
- Use `ParagraphContent` arrays only when inline formatting is required.
- TOC items are derived only from sections that provide both `id` and `tocLabel`.
- FAQ is appended by the shell when `faqSection` exists.

## Layout Ownership
- `ProgramPageShell` owns page chrome, layout composition, shared CTA/footer/schema rendering, and TOC derivation.
- Block renderers own local article spacing and anchor offsets.
- Do not add extra outer containment wrappers inside block renderers; `BlogLayout` already owns the article column width.
