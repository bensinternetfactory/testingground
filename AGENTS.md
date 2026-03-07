# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router entry points, route segments, and page-level metadata.
- `components/`: Reusable UI and section components (`ui/`, `sections/`, `shared/`, `dev/`).
- `lib/`: Shared utilities (for example `lib/utils.ts`).
- `public/`: Static assets, brand files, and icons.
- `docs/` and `plans/`: Content, SEO notes, and implementation planning docs.
- Use the `@/*` alias for root-based imports (configured in `tsconfig.json`).

## Build, Test, and Development Commands
- `npm run dev`: Start the local dev server at `http://localhost:3000`.
- `npm run build`: Build the production bundle (validates routes and types via Next.js).
- `npm start`: Run the built app in production mode.
- `npm run lint`: Run ESLint (`eslint.config.mjs` with Next core-web-vitals + TypeScript rules).

## Coding Style & Naming Conventions
- Language: TypeScript (`strict` mode enabled).
- Indentation: 2 spaces; keep imports grouped and sorted logically.
- Components: `PascalCase` file and export names (`HeroShowcase.tsx`).
- Helpers/config: `camelCase` or `kebab-case` based on existing folder conventions.
- Routes: Use descriptive folder names under `app/` (for example `app/tow-truck-calculator/page.tsx`).
- Prefer `next/link` for internal navigation; use `<a>` for external URLs only.

## Testing Guidelines
- No dedicated test runner is currently configured.
- Minimum pre-PR checks: `npm run lint` and `npm run build`.
- If adding tests, place them near features as `*.test.ts` / `*.test.tsx` or in `__tests__/` and document the run command in `package.json`.

## Commit & Pull Request Guidelines
- Follow the repository’s commit style: concise, imperative subjects (for example `Add ...`, `Fix ...`, `Update ...`).
- Keep commits focused by feature or fix; avoid mixing refactors with behavior changes.
- PRs should include:
  - What changed and why.
  - Affected routes/components (for example `app/homepage-01/page.tsx`).
  - Screenshots or short recordings for UI changes.
  - Confirmation that `npm run lint` and `npm run build` pass.

## Agent-Specific Notes
- For reusable component directories, include a local `CLAUDE.md` covering usage, props/config, and server/client boundaries.
