---
phase: 01-foundation-homepage
plan: 01
subsystem: ui
tags: [nextjs, tailwind, typescript, framer-motion, fonts, next-font, tailwind-v4]

# Dependency graph
requires: []
provides:
  - Next.js 15 App Router project with TypeScript and Tailwind v4
  - Brand color tokens: text-orange, bg-orange, text-grey-dark, bg-grey-dark, text-gold, text-white
  - Font utilities: font-heading (Barlow Condensed), font-body (DM Sans) via next/font/google
  - next.config.ts with remotePatterns for manufacturer image domains
  - Clean build (npm run build exits 0)
affects:
  - 01-02-layout
  - 01-03-homepage
  - All subsequent plans that use brand Tailwind utilities

# Tech tracking
tech-stack:
  added:
    - next@15.5.15
    - react@19.1.0
    - react-dom@19.1.0
    - framer-motion@^12.38.0
    - tailwindcss@^4
    - "@tailwindcss/postcss@^4"
    - typescript@^5
    - eslint@^9
  patterns:
    - Tailwind v4 @theme directive for brand tokens (no tailwind.config.js)
    - next/font/google CSS variable strategy for font bridging to @theme
    - next.config.ts (TypeScript config, not .js)

key-files:
  created:
    - package.json
    - tsconfig.json
    - next.config.ts
    - postcss.config.mjs
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx
    - .gitignore
  modified: []

key-decisions:
  - "Used Next.js 15 (15.5.15) instead of latest v16 — avoids async-params breaking changes, smoother DX for phase 1"
  - "Tailwind v4 @theme directive for all brand tokens — no tailwind.config.js, CSS-first approach"
  - "framer-motion package installed, imported via motion/react path (canonical since v11 rebrand)"
  - "Barlow Condensed declared with explicit weight=['400','700'] — required as it is not a variable font"
  - "Bootstrapped via temp directory workaround — create-next-app refuses to install into non-empty dirs"

patterns-established:
  - "Pattern 1: Brand tokens in globals.css @theme block — all plans use text-orange, bg-grey-dark, text-gold, font-heading, font-body"
  - "Pattern 2: Font CSS variables bridged from next/font to @theme — barlowCondensed.variable + dmSans.variable on <html>"
  - "Pattern 3: next/font/google with variable strategy — no Google Fonts CDN at runtime"

requirements-completed: [UX-01, UX-02]

# Metrics
duration: 25min
completed: 2026-04-18
---

# Phase 01 Plan 01: Project Bootstrap Summary

**Next.js 15 project bootstrapped with Tailwind v4 @theme brand tokens (orange #F58634, grey-dark #353335, gold #C9A84C) and Barlow Condensed + DM Sans via next/font/google CSS variable pipeline**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-04-18T00:00:00Z
- **Completed:** 2026-04-18
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Next.js 15.5.15 App Router project fully bootstrapped with TypeScript, Tailwind v4, ESLint, framer-motion
- Tailwind v4 @theme brand tokens established: `text-orange`, `bg-orange`, `text-grey-dark`, `bg-grey-dark`, `text-gold`, `text-white`, `font-heading`, `font-body` all available as utilities
- Font pipeline: Barlow Condensed (400+700) and DM Sans loaded via next/font/google with CSS variable strategy, applied to `<html>` in layout.tsx
- next.config.ts pre-configured with remotePatterns for caterpillar.com, liebherr.com, volvoce.com, komatsu.eu — avoids Phase 2 image errors
- npm audit: 0 vulnerabilities found

## Task Commits

Each task was committed atomically:

1. **Task 1: Bootstrap Next.js 15 project and install dependencies** - `5f2a3c0` (feat)
2. **Task 2: Configure Tailwind v4 brand tokens and font CSS variables** - `f299c3b` (feat)

## Files Created/Modified
- `package.json` - Next.js 15.5.15, framer-motion, Tailwind v4 deps; renamed to affretix-website
- `tsconfig.json` - TypeScript config with @/* path alias
- `next.config.ts` - TypeScript Next.js config with remotePatterns for manufacturer domains
- `postcss.config.mjs` - Tailwind v4 PostCSS bridge (@tailwindcss/postcss object format)
- `src/app/globals.css` - @import "tailwindcss" + @theme brand palette + font families + base body styles
- `src/app/layout.tsx` - Root layout: Barlow_Condensed + DM_Sans via next/font/google, lang="fr", Affretix metadata
- `src/app/page.tsx` - Default Next.js homepage (placeholder, replaced in Plan 03)
- `.gitignore` - Standard Next.js gitignore

## Decisions Made
- **Next.js 15 over 16:** v16 introduces async `params` as Promises on all dynamic routes — unnecessary friction for phase 1 greenfield. v15 is the stable LTS line.
- **Tailwind v4 @theme:** create-next-app@15 ships with Tailwind v4 by default. CSS-first approach, no tailwind.config.js needed.
- **framer-motion package:** Installed as `framer-motion`, imported via `motion/react` path per canonical usage since v11 rebrand.
- **Bootstrap workaround:** create-next-app refuses to install into non-empty directories (detected `.claude/`, `.planning/`, `CLAUDE.md`). Workaround: bootstrapped into `/tmp/affretix-temp`, copied project files to worktree, ran `npm install` in worktree to fix symlinks.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Bootstrap into temp directory due to non-empty worktree**
- **Found during:** Task 1 (project bootstrap)
- **Issue:** `create-next-app` detects `.claude/`, `.planning/`, `CLAUDE.md` in worktree and refuses to proceed with "directory contains files that could conflict"
- **Fix:** Bootstrapped into `/tmp/affretix-temp`, installed framer-motion there, copied all generated files to worktree, removed copied node_modules and ran `npm install` in worktree to regenerate correct platform-native symlinks
- **Files modified:** All Task 1 files (same files as planned)
- **Verification:** `npm run build` exits 0; all acceptance criteria met
- **Committed in:** `5f2a3c0` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking — create-next-app conflict resolution)
**Impact on plan:** Workaround transparent to output — all acceptance criteria met, same files produced as specified.

## Issues Encountered
- node_modules copied from `/tmp` had broken `.bin` symlinks (pointing to wrong absolute paths). Fixed by removing copied node_modules and running `npm install` fresh in the worktree.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Brand utilities (`text-orange`, `bg-grey-dark`, `text-gold`, `font-heading`, `font-body`) available for all subsequent plans
- Font pipeline operational — Barlow Condensed Bold and DM Sans self-hosted via next/font/google
- next.config.ts remotePatterns pre-configured for manufacturer image domains
- `npm run build` exits 0, ready for Plan 02 (Header + Footer layout)
- No blockers for Plan 02

---
*Phase: 01-foundation-homepage*
*Completed: 2026-04-18*
