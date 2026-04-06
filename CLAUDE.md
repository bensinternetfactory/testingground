# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint check (eslint v9 flat config)
```

Agent rule: never start validation or preview servers on port `3000`; use `3001+` and prefer `3005` in this repo so the user's own preview on `3000` is left alone.

For user-facing changes, browser/DOM validation is required after standard checks. Use the globally installed `agent-browser` skill or CLI against a local server on a non-`3000` port, preferably `3005` in this repo. Minimum validation: open the changed page, wait for load completion, confirm the page renders, and verify at least one relevant DOM interaction or assertion for the changed feature.

For the pre-approval drawer migration, execute from the plan set instead of improvising:

- `plans/pre-approval-drawer-migration-spec.md` is the governing spec.
- `plans/pre-approval-drawer-verification-matrix.md` maps requirements to verification.
- `plans/pre-approval-drawer-phase-gates.md` is the active go/no-go checklist.
- `plans/pre-approval-drawer-execution-log.md` is the required evidence log.

For that migration, every implementation batch must:

- identify the current phase before editing
- verify the required checks for that phase before moving on
- update the phase gate checklist and execution log in the same batch
- stop immediately if a gate is not satisfied, evidence is missing, or a regression is found

## Architecture

This is a Next.js 16 landing page using the App Router architecture with React 19.

**Key directories:**
- `app/` - App Router pages and layouts (server components by default)
- `public/` - Static assets

**Styling:**
- Tailwind CSS v4 with the new `@import "tailwindcss"` syntax
- CSS variables for theming defined in `app/globals.css` (supports dark mode via `prefers-color-scheme`)
- Geist font family loaded via `next/font/google`

**Path alias:** `@/*` maps to the project root

## Conventions

- **Internal links must use `next/link`** — never use a raw `<a>` tag for internal routes. `Link` enables client-side navigation and prefetching. Only use `<a>` for external URLs.
- **Reusable CTA rule (`RippleCtaLink`)** — use `RippleCtaLink` for **primary internal CTA button-links** (high-intent conversion actions visually presented as buttons).
  - Use standard `Link`/`<a>` for inline text links in paragraph content, including FAQ answer links.
  - Keep semantic form actions as `<button type="submit">` (do not replace with CTA link components).
  - Keep specialized third-party/native controls when `RippleCtaLink` would break semantics or behavior.
  - External destinations should use native `<a>` patterns unless intentionally using `RippleCtaLink`'s external-anchor behavior.

```tsx
// Do: primary internal button-style CTA
<RippleCtaLink href="/rollback-financing" label="See Rollback Financing" />

// Don't: inline FAQ/body copy link
<Link href="/tow-truck-calculator">tow truck calculator</Link>
```
- **2xl section containment** — every `<section>` and `<footer>` on the page (excluding the navbar) must include these Tailwind classes on its outermost element:
  ```
  2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden
  ```
  This caps section width at 1536px, centers it, adds subtle left/right borders, and clips overflow. The body background is white, so flanking space is white. The navbar is excluded — it stays full-width.
- **Every reusable component directory must include a `CLAUDE.md`** with: one-line description, usage snippet, props/config table, server/client boundary notes, and dependencies.

## Configuration

- TypeScript strict mode enabled
- ESLint uses Next.js core-web-vitals and TypeScript rules
- `next.config.ts` is empty - add Next.js config options there as needed

## Custom Agents

This project has custom audit agents in `.claude/agents/`:

- **legend-manager** -- Orchestrates all three legend agents for full audits. Use for: "audit my code", "review everything", "pre-deploy check"
- **next-legend** -- Next.js best practices audit (11 categories). Use for: "check my Next.js code", "review server components"
- **react-legend** -- React performance audit (57 Vercel rules, 8 categories). Use for: "check React performance", "review re-renders"
- **web-legend** -- Web interface guidelines audit (13 categories). Use for: "check accessibility", "review my UI"

When the user asks for an audit, code review, or best-practices check, delegate to the appropriate agent(s).
