---
phase: 01-foundation-homepage
plan: "04"
subsystem: data
tags: [typescript, catalogue, machines, families, static-data]

# Dependency graph
requires: []
provides:
  - MachineFamily type and machineFamilies array (8 complete family definitions)
  - Machine type, MachineVariant type, machines array (72 machine types)
  - getMachinesByFamily helper function for filtering by family slug
affects:
  - 01-foundation-homepage plans 02, 03 (FamilyGrid, catalogue navigation)
  - 02-catalogue (machine pages, family routes, fiche produit)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Static TypeScript data files as single source of truth (no CMS, no API)"
    - "Machine data organized by familySlug foreign-key pattern linking machines to families"
    - "Variant array pattern for representing size/capacity options per machine type"

key-files:
  created:
    - src/data/families.ts
    - src/data/machines.ts
  modified: []

key-decisions:
  - "machineCount in families.ts reflects actual count in machines.ts (not plan stub values)"
  - "72 machines defined across 8 families, exceeding 67+ minimum requirement"
  - "transport-chantier family: 7 machines (plan estimated 8 — porteur polyvalent removed, ampliroll merged into camion-benne)"

patterns-established:
  - "Pattern 1: familySlug as the join key between families.ts and machines.ts — all Phase 2 catalogue routes use this"
  - "Pattern 2: variants array on Machine type for size/capacity options — Phase 2 fiche produit will iterate this"
  - "Pattern 3: optional accessories array on Machine — signals compatible attachments for the machine"

requirements-completed: [HOME-02, NAV-01]

# Metrics
duration: 10min
completed: 2026-04-18
---

# Phase 01 Plan 04: Machine Data Layer Summary

**72-machine TypeScript data layer with 8 typed families, variant arrays, and getMachinesByFamily helper — single source of truth for Phase 2 catalogue**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-04-18T00:00:00Z
- **Completed:** 2026-04-18T00:10:00Z
- **Tasks:** 2
- **Files modified:** 2 (created)

## Accomplishments

- Complete MachineFamily type and 8 family definitions in `families.ts` with slugs, descriptions, icons, and accurate machine counts
- 72 Machine type definitions in `machines.ts` across all 8 families, each with variants array (1–3 size/capacity options) and optional accessories
- `getMachinesByFamily(slug)` helper function exported and ready for Phase 2 catalogue page use
- TypeScript compilation passes with 0 errors

## Machine Count Per Family

| Family | Slug | Count |
|--------|------|-------|
| Terrassement | terrassement | 12 |
| Transport chantier | transport-chantier | 7 |
| Voirie | voirie | 7 |
| Compactage | compactage | 9 |
| VRD / Réseaux | vrd-reseaux | 10 |
| Manutention / Levage | manutention-levage | 11 |
| Béton / Fondations | beton-fondations | 6 |
| Démolition / Recyclage | demolition-recyclage | 8 |
| **Total** | | **72** |

## Task Commits

Each task was committed atomically:

1. **Task 1: Write complete families.ts with 8 families** - `4b8c032` (feat)
2. **Task 2: Write machines.ts with all machine types grouped by family** - `5696fb8` (feat)

## Files Created/Modified

- `src/data/families.ts` - 8 MachineFamily definitions with slug, name, description, icon, machineCount
- `src/data/machines.ts` - 72 Machine definitions with familySlug, description, variants[], optional accessories[]; exports getMachinesByFamily helper

## Decisions Made

- `machineCount` values in `families.ts` were set to match actual counts from `machines.ts` (plan stub had 8 for transport-chantier; actual is 7 — porteur ampliroll merged with camion-benne entry)
- Used string literal types only (no enums) to keep data files lightweight and easily extensible in Phase 2
- `imageUrl?: string` optional field left undefined in all entries — Phase 2 will populate with manufacturer image URLs

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] machineCount for transport-chantier corrected from 8 to 7**
- **Found during:** Task 1 verification (after Task 2 finalized)
- **Issue:** Plan example had `machineCount: 8` for transport-chantier but actual machines.ts defines 7 entries for that family
- **Fix:** Set `machineCount: 7` in families.ts to match actual count
- **Files modified:** src/data/families.ts
- **Verification:** grep confirms 7 matches for `familySlug: 'transport-chantier'` in machines.ts
- **Committed in:** 4b8c032 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 data correctness)
**Impact on plan:** Keeps machineCount accurate for Plan 03 FamilyGrid card display. No scope creep.

## Issues Encountered

- `npx tsc --noEmit` failed because TypeScript was not installed in the worktree node_modules. Ran `npm install` to populate dependencies, then verified with `./node_modules/.bin/tsc --noEmit`. Result: 0 errors.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `src/data/families.ts` and `src/data/machines.ts` are ready to import in Plans 02 and 03 (FamilyGrid component, navigation families list)
- Phase 2 (Catalogue) can immediately build family and machine page routes using `getMachinesByFamily` and iterating `machineFamilies`
- Phase 2 will extend `Machine` with real `imageUrl` values from manufacturer URLs in the Excel catalogue

---
*Phase: 01-foundation-homepage*
*Completed: 2026-04-18*
