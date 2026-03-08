# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint check (eslint v9 flat config)
```

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
