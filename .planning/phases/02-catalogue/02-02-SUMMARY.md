---
phase: 02-catalogue
plan: "02"
subsystem: catalogue-family-pages
tags: [nextjs, typescript, tailwind, catalogue, ssg, server-component, next-image]

# Dependency graph
requires:
  - src/data/families.ts (machineFamilies array, MachineFamily type)
  - src/data/machines.ts (Machine type, getMachinesByFamily, imageUrl)
  - next.config.ts (Unsplash remotePatterns from plan 01)
  - src/components/catalogue/FamilyCard.tsx (design pattern reference)
provides:
  - /catalogue/[slug] statically-generated family pages (8 routes, SSG)
  - FamilyHero presentational component (breadcrumb + family header)
  - MachineCard presentational component (image/placeholder + name + badges + link)
affects:
  - 02-03+ (machine detail pages at /catalogue/[family]/[slug] — links are now live)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Next.js 15 async params pattern: const { slug } = await params"
    - "generateStaticParams with dynamicParams = false for strict 404 on unknown slugs"
    - "Server Component pages — no use client"
    - "next/image fill + object-cover in relative aspect-[4/3] container"
    - "Graceful placeholder ('Image à venir') when imageUrl is absent"

key-files:
  created:
    - src/app/catalogue/[slug]/page.tsx
    - src/components/catalogue/FamilyHero.tsx
    - src/components/catalogue/MachineCard.tsx
  modified: []

key-decisions:
  - "dynamicParams = false chosen over notFound() fallback to prevent any dynamic rendering of unknown slugs"
  - "MachineCard links to /catalogue/[familySlug]/[slug] (Phase 3 URL) — links 404 gracefully until Phase 3"
  - "aspect-[4/3] container with fill image avoids fixed heights and adapts to all grid column widths"

# Metrics
duration: 8min
completed: 2026-04-18
---

# Phase 02 Plan 02: Catalogue Family Pages Summary

**Static family detail pages for all 8 machine families with FamilyHero header and MachineCard grid — 8 SSG routes at /catalogue/[slug]**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-04-18
- **Completed:** 2026-04-18
- **Tasks:** 2
- **Files modified:** 3 (all created)

## Accomplishments

- Created `/catalogue/[slug]/page.tsx` server component with `generateStaticParams` emitting all 8 family slugs
- `dynamicParams = false` enforces strict 404 for any unrecognized slug
- `generateMetadata` produces per-family `<title>` and `<description>` tags for SEO
- Created `FamilyHero` component: breadcrumb navigation (Catalogue / FamilyName), emoji icon, h1 name, description, machine count
- Created `MachineCard` component: 4:3 image area (next/image or "Image à venir" placeholder), machine name, description excerpt, capacity variant badges, link to Phase 3 URL pattern
- Responsive grid: 1 col (mobile 375px) / 2 col (tablet 768px) / 3 col (1024px) / 4 col (1280px desktop)
- `npm run build` exits 0; build output shows 8 static routes under `/catalogue/[slug]`
- `npm run lint` exits 0

## Task Commits

| Task | Description | Commit |
|------|-------------|--------|
| Task 1 | Add /catalogue/[slug] dynamic family page with generateStaticParams | `70b899d` |
| Task 2 | Add FamilyHero and MachineCard components | `167f166` |

## Files Created/Modified

- `src/app/catalogue/[slug]/page.tsx` — SSG page with generateStaticParams, dynamicParams=false, generateMetadata, async FamilyPage
- `src/components/catalogue/FamilyHero.tsx` — breadcrumb + icon + h1 + description + machine count
- `src/components/catalogue/MachineCard.tsx` — image/placeholder + name + description + variant badges + Link to /catalogue/[family]/[slug]

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- MachineCard links to `/catalogue/[familySlug]/[slug]` — these URLs currently 404 until Phase 3 (machine detail pages). This is intentional and documented in the plan as "Phase 3 URL pattern." No data stub; the URL structure is correct and will resolve when Phase 3 adds the `[slug]` route.

## Threat Flags

No new threat surface introduced. The threat model items T-02-03 and T-02-04 are both mitigated as planned:
- T-02-03: `dynamicParams = false` applied — unknown slugs return Next.js 404 before page code executes.
- T-02-04: MachineCard href to Phase 3 URL 404s gracefully with no sensitive data exposed.

## Self-Check: PASSED

- `src/app/catalogue/[slug]/page.tsx` — FOUND
- `src/components/catalogue/FamilyHero.tsx` — FOUND
- `src/components/catalogue/MachineCard.tsx` — FOUND
- Commit `70b899d` — FOUND
- Commit `167f166` — FOUND
- `npm run build` exits 0 with 8 `/catalogue/[slug]` routes as SSG — CONFIRMED
- `npm run lint` exits 0 — CONFIRMED
- `export const dynamicParams = false` in page.tsx — CONFIRMED
- `generateStaticParams` in page.tsx — CONFIRMED

---
*Phase: 02-catalogue*
*Completed: 2026-04-18*
