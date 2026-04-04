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
- Agent rule: never start local validation/dev servers on port `3000`.
- Agent rule: for active UI/browser validation, prefer `npm run dev` over `npm start` so live reload remains available while iterating across viewports.
- Agent rule: start the validation server in a persistent PTY/TTY-backed long-running session (or equivalent background process) so it stays available for repeated browser checks.
- Agent rule: do not assume port `3005`; first check for an open non-`3000` port, launch the server there, and reuse that same running server for desktop/mobile validation passes when possible.

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
- For user-facing changes, browser/DOM validation is also required after standard checks. Use the globally installed `agent-browser` skill/CLI against a local `npm run dev` server on an open non-`3000` port.
- Start that validation server once in a persistent PTY/TTY-backed session (or equivalent background process), then keep it running while you perform desktop and mobile checks.
- Minimum `agent-browser` validation for user-facing work: open the changed page, wait for load completion, confirm the page renders, and verify at least one relevant DOM interaction or assertion for the changed feature.
- Use `npm start` only when you specifically need a production-mode verification pass after the build succeeds.
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
