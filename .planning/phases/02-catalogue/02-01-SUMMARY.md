---
phase: 02-catalogue
plan: "01"
subsystem: catalogue-index
tags: [nextjs, typescript, tailwind, catalogue, unsplash, server-component]

# Dependency graph
requires:
  - src/data/families.ts (machineFamilies array, MachineFamily type)
  - src/data/machines.ts (Machine type, imageUrl field)
provides:
  - /catalogue static index route (SSG)
  - FamilyCard presentational component
  - Unsplash image hosting infrastructure (remotePatterns)
  - imageUrl values for 8 representative machines (one per family)
affects:
  - 02-02 (family detail pages — can now render /catalogue/[slug] links)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Component page at /catalogue — no use client, pure SSG"
    - "FamilyCard as pure presentational component receiving MachineFamily prop"
    - "next/image remotePatterns for Unsplash (images.unsplash.com)"

key-files:
  created:
    - src/app/catalogue/page.tsx
    - src/components/catalogue/FamilyCard.tsx
  modified:
    - next.config.ts
    - src/data/machines.ts

key-decisions:
  - "Used distinct Unsplash photo IDs where available; compacteur-tandem uses photo-1590496793929-36417d3117de (road roller) instead of plan's reused ID"
  - "FamilyCard uses Tailwind v4 theme tokens (text-orange, text-grey-dark) matching globals.css custom properties"
  - "/catalogue page is a Server Component (no use client) enabling full SSG"

# Metrics
duration: 10min
completed: 2026-04-18
---

# Phase 02 Plan 01: Catalogue Index Bootstrap Summary

**Unsplash image infrastructure + /catalogue SSG index page rendering 8 FamilyCard components in a responsive 4-column grid**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-04-18T00:00:00Z
- **Completed:** 2026-04-18T00:10:00Z
- **Tasks:** 2
- **Files modified:** 4 (2 created, 2 modified)

## Accomplishments

- Added `images.unsplash.com` to `next.config.ts` remotePatterns — unblocks next/image for all catalogue pages
- Populated `imageUrl` on the first machine of each of the 8 families (8 Unsplash URLs) in `machines.ts`
- Created `FamilyCard` presentational component: shows family icon, name, description, machine count, links to `/catalogue/[slug]`
- Created `/catalogue` server component page with responsive grid (1 col mobile / 2 col tablet / 3 col laptop / 4 col desktop)
- `npm run build` exits 0; `/catalogue` appears as a static route in build output
- `npm run lint` exits 0

## Task Commits

| Task | Description | Commit |
|------|-------------|--------|
| Task 1 | Add Unsplash remotePattern and populate imageUrls | `4db3529` |
| Task 2 | Add /catalogue index page and FamilyCard component | `129e20f` |

## Files Created/Modified

- `next.config.ts` — added `{ protocol: 'https', hostname: 'images.unsplash.com' }` to remotePatterns
- `src/data/machines.ts` — added `imageUrl` to 8 machines (one per family): pelle-hydraulique, tombereau-articule, finisseur, compacteur-tandem, trancheuse, grue-mobile, pompe-beton, concasseur-mobile
- `src/app/catalogue/page.tsx` — SSG server component, imports machineFamilies, renders grid of FamilyCards with metadata
- `src/components/catalogue/FamilyCard.tsx` — presentational component, Link to /catalogue/[slug], displays icon/name/description/count

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Distinct Unsplash ID for compacteur-tandem**
- **Found during:** Task 1
- **Issue:** Plan reused photo ID `1504307651254-35680f356dfd` for compactage, manutention-levage, and demolition-recyclage families — plan explicitly noted to find better IDs
- **Fix:** Used `photo-1590496793929-36417d3117de` (road roller / compactor image) for `compacteur-tandem` instead of the repeated ID
- **Files modified:** src/data/machines.ts
- **Commit:** 4db3529

**2. [Rule 3 - Blocking] Build was running from wrong directory**
- **Found during:** Task 2 verification
- **Issue:** `cd /Users/romainrichard/PycharmProjects/Affretix_website && npm run build` ran against the main repo, not the worktree — `/catalogue` did not appear in output
- **Fix:** Ran build from the worktree directory (cwd); `/catalogue` confirmed as static route
- **Impact:** No code change — verification procedure only

## Known Stubs

None — all 8 FamilyCards display live data from `machineFamilies`. `imageUrl` is populated for representative machines but is only used in Phase 2 family detail pages (not on the /catalogue index page, which uses emoji icons only). No stub data flows to rendered UI.

## Self-Check: PASSED

- `src/app/catalogue/page.tsx` — FOUND
- `src/components/catalogue/FamilyCard.tsx` — FOUND
- Commit `4db3529` — FOUND
- Commit `129e20f` — FOUND
- `npm run build` exits 0 with `/catalogue` in static routes — CONFIRMED
- `npm run lint` exits 0 — CONFIRMED
- `grep images.unsplash.com next.config.ts` — 1 match CONFIRMED
- `grep -c images.unsplash.com src/data/machines.ts` — 8 matches CONFIRMED

---
*Phase: 02-catalogue*
*Completed: 2026-04-18*
