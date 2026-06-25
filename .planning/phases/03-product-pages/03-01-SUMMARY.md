---
phase: 03-product-pages
plan: "01"
subsystem: ui
tags: [nextjs, ssg, typescript, tailwind, machine-detail, catalogue]

# Dependency graph
requires:
  - phase: 02-catalogue
    provides: MachineCard with href /catalogue/[familySlug]/[slug], machines.ts data, families.ts data
provides:
  - Static machine detail page at /catalogue/[slug]/[machineSlug] for all 72 machines
  - SSG with generateStaticParams + dynamicParams=false (404 on unknown slugs)
  - All 6 PROD requirements rendered: name/family/description, variants, accessories, image, badge, devis CTA
affects: [04-contact-form, 05-home-page]

# Tech tracking
tech-stack:
  added: []
  patterns: [next/image with fill+aspect containers, async params Promise pattern (Next.js 15), conditional section rendering]

key-files:
  created:
    - src/app/catalogue/[slug]/[machineSlug]/page.tsx
  modified: []

key-decisions:
  - "Two-column md+ layout (image left, content right) with stacked mobile for optimal readability"
  - "Avec chauffeur / opérateur badge always rendered unconditionally — core brand differentiator"
  - "Accessories section conditionally rendered only when accessories array is non-empty"
  - "Image placeholder div uses same bg-grey-dark/5 as MachineCard for visual consistency"

patterns-established:
  - "Next.js 15 async params: const { slug, machineSlug } = await params — matches /catalogue/[slug]/page.tsx pattern"
  - "dynamicParams = false + generateStaticParams = strict SSG with automatic 404 for unknown routes"

requirements-completed: [PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06]

# Metrics
duration: 8min
completed: 2026-04-18
---

# Phase 3 Plan 01: Product Pages Summary

**Next.js 15 SSG machine detail page for all 72 machines with image, variants, accessories, avec-chauffeur badge, and devis CTA at /catalogue/[family]/[machine]**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-04-18T13:10:00Z
- **Completed:** 2026-04-18T13:18:19Z
- **Tasks:** 1 (+ checkpoint:human-verify pending)
- **Files modified:** 1

## Accomplishments
- Created /catalogue/[slug]/[machineSlug]/page.tsx as a single server component satisfying all 6 PROD requirements
- generateStaticParams maps all 72 machines to static routes; dynamicParams=false enforces 404 on unknown slugs
- Avec chauffeur / opérateur orange badge rendered unconditionally on every page (core brand differentiator)
- Devis CTA links to /contact?machine={slug} for Phase 4 contact form integration

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /catalogue/[slug]/[machineSlug]/page.tsx — SSG machine detail page** - `c0b8b1a` (feat)

## Files Created/Modified
- `src/app/catalogue/[slug]/[machineSlug]/page.tsx` - Static machine detail page with SSG, all 6 PROD requirements, two-column layout

## Decisions Made
- Two-column layout on md+ (image left, content right), stacked mobile — clean separation of visual and info
- Avec chauffeur / opérateur badge positioned prominently between machine name and description — not optional, always present
- `inline-block` variant cards with `bg-grey-dark/5 border border-grey-dark/10` — consistent with MachineCard variant badges
- Accessory badges use `bg-gold/10 border-gold/30` to distinguish from capacity variants and reference the LEVA brand gold

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Machine detail pages are complete and TypeScript-clean
- MachineCard hrefs (/catalogue/${familySlug}/${slug}) already point to these pages — navigation is fully wired
- Contact form (Phase 4) will receive ?machine= query param from the CTA — ready for integration
- Pending: human-verify checkpoint to confirm visual rendering at http://localhost:3000/catalogue/terrassement/pelle-hydraulique

## Known Stubs
None — all data is wired from machines.ts. imageUrl is optionally set per machine; missing images show "Image à venir" placeholder intentionally.

---
*Phase: 03-product-pages*
*Completed: 2026-04-18*
