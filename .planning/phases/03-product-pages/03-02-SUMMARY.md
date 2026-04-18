---
phase: 03-product-pages
plan: "02"
subsystem: ui
tags: [motion, framer-motion, animation, next.js, typescript, catalogue]

# Dependency graph
requires:
  - phase: 03-product-pages
    provides: Machine detail page (page.tsx) with static content sections built in plan 03-01

provides:
  - MachineDetailAnimated client wrapper with stagger entrance animations
  - AnimatedItem, AnimatedBadge, AnimatedCTA sub-wrappers for granular animation control
  - Animated machine detail page using motion/react (not framer-motion)

affects: [03-product-pages, 03-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Client animation wrapper pattern: server page stays server component, 'use client' wrapper isolates animation logic"
    - "motion/react import (not framer-motion) with easeOut as const for TypeScript correctness"
    - "animate='visible' (not whileInView) for above-fold primary content"
    - "Stagger container with delayChildren + staggerChildren for sequential entrance"

key-files:
  created:
    - src/components/catalogue/MachineDetailAnimated.tsx
  modified:
    - src/app/catalogue/[slug]/[machineSlug]/page.tsx

key-decisions:
  - "Use animate='visible' (not whileInView) because product detail is above-fold primary content"
  - "Image column kept as plain server-rendered div — no animation delay on hero image"
  - "Separate badgeVariants with scale 0.9→1 for distinct badge entrance vs standard item slide-up"
  - "ctaVariants with extra delay:0.1 ensures CTA animates in last, drawing eye to conversion action"

patterns-established:
  - "Client wrapper isolation: 'use client' wrapper receives React children from server component parent"
  - "Named sub-wrapper exports (AnimatedItem, AnimatedBadge, AnimatedCTA) for semantic animation intent"

requirements-completed: []

# Metrics
duration: 8min
completed: 2026-04-18
---

# Phase 03 Plan 02: Product Page Animations Summary

**motion/react stagger entrance animations on machine detail page right-hand column, with distinct badge scale-pop and last-in CTA fade using the Phase 2 client-wrapper isolation pattern**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-04-18T00:00:00Z
- **Completed:** 2026-04-18T00:08:00Z
- **Tasks:** 2 of 2 (Task 1 implementation + Task 2 checkpoint:human-verify approved)
- **Files modified:** 2

## Accomplishments
- Created `MachineDetailAnimated.tsx` client wrapper with `motion/react` stagger container and four animation variants (container, item, badge, CTA)
- Updated `page.tsx` to wrap right-hand content sections in animation components while keeping image column server-rendered and unanimated
- TypeScript compiles without errors (`npx tsc --noEmit` exits 0)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create MachineDetailAnimated client wrapper and wire it to the page** - `a9a1473` (feat)

2. **Task 2: checkpoint:human-verify — visual approval** - Approved by user

## Files Created/Modified
- `src/components/catalogue/MachineDetailAnimated.tsx` - Client wrapper exporting MachineDetailAnimated (stagger container), AnimatedItem (fade+slide), AnimatedBadge (scale+fade), AnimatedCTA (delayed fade)
- `src/app/catalogue/[slug]/[machineSlug]/page.tsx` - Right-hand content column replaced with MachineDetailAnimated + sub-wrappers; image column untouched

## Decisions Made
- Used `animate="visible"` instead of `whileInView` because the machine detail content is the primary above-fold content — it should play on load, not on scroll
- Kept image column outside the client wrapper to avoid any hydration delay on the hero image (marked `priority` in next/image)
- Badge uses `scale: 0.9 → 1` for a distinct pop-in that draws attention to the avec-chauffeur differentiator
- CTA `AnimatedCTA` has an extra `delay: 0.1` so it enters last, naturally guiding the eye to the conversion action

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Animation wrappers approved and in place; all 72 static machine routes have entrance animations
- Client-wrapper pattern established and ready to reuse in future catalogue pages
- Ready to proceed to plan 03-03

---
*Phase: 03-product-pages*
*Completed: 2026-04-18*
