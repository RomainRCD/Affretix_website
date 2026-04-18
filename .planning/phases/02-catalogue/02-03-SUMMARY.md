---
phase: 02-catalogue
plan: "03"
subsystem: ui
tags: [framer-motion, motion, react, nextjs, animation, catalogue]

# Dependency graph
requires:
  - phase: 02-catalogue-02
    provides: FamilyCard, MachineCard, /catalogue page, /catalogue/[slug] page
provides:
  - FamilyGrid.tsx: "use client" stagger animation wrapper for /catalogue index
  - MachineGrid.tsx: "use client" stagger animation wrapper for /catalogue/[slug] family pages
  - Both catalogue page.tsx files updated to use animated grid wrappers
affects: [phase-03, any phase that modifies catalogue pages or card components]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Client wrapper pattern: server page stays server component, animation logic isolated in 'use client' wrapper"
    - "Motion stagger: containerVariants with staggerChildren, itemVariants with y-slide + fade"
    - "FamilyGrid uses animate (above fold), MachineGrid uses whileInView with viewport once:true (below fold)"
    - "ease: 'easeOut' as const required for TypeScript Variants type compatibility"

key-files:
  created:
    - src/components/catalogue/FamilyGrid.tsx
    - src/components/catalogue/MachineGrid.tsx
  modified:
    - src/app/catalogue/page.tsx
    - src/app/catalogue/[slug]/page.tsx

key-decisions:
  - "FamilyGrid uses animate (not whileInView) — grid is above the fold, should fire on page load"
  - "MachineGrid uses whileInView with viewport once:true — machines are below FamilyHero, scroll-triggered is appropriate"
  - "ease typed as 'easeOut' as const to satisfy motion/react Variants TypeScript type"
  - "Server components (page.tsx) remain server components — 'use client' boundary only in grid wrappers"

patterns-established:
  - "Client animation wrapper: create a *Grid.tsx with 'use client', wrap server-rendered cards in motion.div with variants"
  - "TypeScript motion ease values: use 'easeOut' as const, not plain string"

requirements-completed: [UX-03, UX-04]

# Metrics
duration: 15min
completed: 2026-04-18
---

# Phase 02 Plan 03: Catalogue Animations Summary

**Framer Motion stagger animations added to catalogue via FamilyGrid and MachineGrid client wrappers, preserving static SSG for all 9 catalogue routes**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-18T00:00:00Z
- **Completed:** 2026-04-18T00:15:00Z
- **Tasks:** 2 (1 implementation + 1 checkpoint, auto-approved in YOLO mode)
- **Files modified:** 4

## Accomplishments
- Created FamilyGrid.tsx: "use client" animated grid that stagger-fades 8 family cards in on page load (animate)
- Created MachineGrid.tsx: "use client" animated grid that stagger-fades machine cards on scroll (whileInView, once:true)
- Updated /catalogue and /catalogue/[slug] pages to use the new animated wrappers, removing inline grids
- npm run build exits 0 — all 9 catalogue routes remain static (SSG/Static)

## Task Commits

1. **Task 1: Build FamilyGrid and MachineGrid animated wrappers** - `f762e2c` (feat)

## Files Created/Modified
- `src/components/catalogue/FamilyGrid.tsx` - "use client" motion stagger wrapper for /catalogue index
- `src/components/catalogue/MachineGrid.tsx` - "use client" motion stagger wrapper for /catalogue/[slug] family pages
- `src/app/catalogue/page.tsx` - Replaced inline grid with `<FamilyGrid families={machineFamilies} />`
- `src/app/catalogue/[slug]/page.tsx` - Replaced inline grid with `<MachineGrid machines={machines} />`

## Decisions Made
- FamilyGrid uses `animate="visible"` (not whileInView) because the card grid is above the fold — animation fires immediately on page load
- MachineGrid uses `whileInView="visible"` with `viewport={{ once: true, amount: 0.1 }}` because machines appear below FamilyHero
- Stagger interval: 70ms (staggerChildren: 0.07) with 100ms initial delay — snappy but perceptible on 8-12 cards

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript type error on motion Variants ease value**
- **Found during:** Task 1 (build verification)
- **Issue:** `ease: "easeOut"` inferred as `string` by TypeScript, not assignable to `Easing | Easing[]` type in motion/react Variants
- **Fix:** Added `as const` assertion: `ease: "easeOut" as const` in both FamilyGrid.tsx and MachineGrid.tsx
- **Files modified:** src/components/catalogue/FamilyGrid.tsx, src/components/catalogue/MachineGrid.tsx
- **Verification:** `npm run build` exits 0 after fix
- **Committed in:** f762e2c (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - TypeScript type narrowing)
**Impact on plan:** Minimal fix, no behavior change. Required for build to pass.

## Issues Encountered
- TypeScript strict typing on motion Variants required `as const` on ease string literal — fixed automatically per deviation Rule 1.

## Known Stubs
None - both grid wrappers fully wired to real data passed from server components.

## Threat Flags
None — animation components receive only typed static props from server components. No new network endpoints or auth paths introduced.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Animation layer is complete. Both card types have working hover states (from Plan 02) and stagger animations.
- Checkpoint auto-approved in YOLO mode — all 9 catalogue routes verified static, build passes.
- Ready for Phase 3.

---
*Phase: 02-catalogue*
*Completed: 2026-04-18*
