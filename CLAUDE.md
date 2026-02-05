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

## Configuration

- TypeScript strict mode enabled
- ESLint uses Next.js core-web-vitals and TypeScript rules
- `next.config.ts` is empty - add Next.js config options there as needed
