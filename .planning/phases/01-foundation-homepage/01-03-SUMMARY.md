---
phase: 01-foundation-homepage
plan: 03
subsystem: ui
tags: [nextjs, tailwind, framer-motion, server-components, client-components, homepage]

# Dependency graph
requires:
  - 01-01-bootstrap (brand tokens, font pipeline, framer-motion)
  - 01-02-layout (families.ts, Header/Footer, /contact stub)
provides:
  - Full homepage: Hero + FamilyGrid + Reassurance + ContactCTA sections
  - Reusable Button component (src/components/ui/Button.tsx)
  - HOME-01: Value proposition "Location de matériel BTP avec chauffeur" in hero
  - HOME-02: All 8 machine families navigable from homepage via /catalogue/[slug]
  - HOME-03: Reassurance section with 67+, 100% opérateur, Groupe LEVA stats
  - HOME-04: ContactCTA section with /contact link
affects:
  - All pages (page.tsx now renders full homepage content)

# Tech tracking
tech-stack:
  added:
    - motion@^12.38.0 (provides motion/react import path; framer-motion alone does not export this subpath)
  patterns:
    - Client Component leaf pattern: only Hero uses "use client" (motion animations)
    - Server Component default: FamilyGrid, Reassurance, ContactCTA, page.tsx — no hydration cost
    - machineFamilies.map() in FamilyGrid for dynamic card generation from static data
    - motion/react staggered entrance animation in Hero (opacity + y transforms)

key-files:
  created:
    - src/components/ui/Button.tsx
    - src/components/home/Hero.tsx
    - src/components/home/FamilyGrid.tsx
    - src/components/home/Reassurance.tsx
    - src/components/home/ContactCTA.tsx
  modified:
    - src/app/page.tsx
    - package.json (added motion dependency)
    - package-lock.json

key-decisions:
  - "Hero is the only Client Component — motion animations require it; all other sections are Server Components"
  - "Button component is a Server Component (uses Next.js Link with no hooks/events)"
  - "Installed motion package alongside framer-motion — motion/react subpath only available via standalone motion package, not framer-motion@12"
  - "FamilyGrid uses CSS hover transitions (not motion) — keeps it a Server Component with no hydration cost"

# Metrics
duration: 20min
completed: 2026-04-18
requirements-completed: [HOME-01, HOME-02, HOME-03, HOME-04]
---

# Phase 01 Plan 03: Homepage Sections Summary

**Full homepage assembled: Hero (dark bg, Barlow Condensed "Location de matériel BTP / avec chauffeur" in orange, motion entrance), FamilyGrid (8 family cards → /catalogue/[slug]), Reassurance (67+/100%/Groupe LEVA stats), ContactCTA (/contact link) — build passes, 0 TypeScript errors.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-04-18T00:00:00Z
- **Completed:** 2026-04-18
- **Tasks:** 2 auto + 1 checkpoint (auto-approved)
- **Files created:** 5
- **Files modified:** 3

## Accomplishments

- `src/components/ui/Button.tsx` — Server Component; primary (orange fill) and secondary (orange outline) variants; wraps Next.js `Link`
- `src/components/home/Hero.tsx` — Client Component; `"use client"` + `motion/react`; dark grey-dark background; Barlow Condensed h1 "Location de matériel BTP / avec chauffeur" with text-orange accent; badge "Toujours avec opérateur qualifié"; DM Sans subheadline; staggered motion entrance (opacity + y transforms); two CTAs (Demander un devis → /contact, Voir le catalogue → /catalogue)
- `src/components/home/FamilyGrid.tsx` — Server Component; 8-card responsive grid (2 cols mobile, 4 cols desktop); each card: emoji icon + family name + machineCount; hover: orange border + orange text + scale icon; links to `/catalogue/[slug]`; generated from `machineFamilies.map()`
- `src/components/home/Reassurance.tsx` — Server Component; dark grey-dark background; 3 stats: "67+" types d'engins, "100%" avec opérateur, "Groupe LEVA" votre garant; Barlow Condensed large numbers in text-orange
- `src/components/home/ContactCTA.tsx` — Server Component; white background; centered headline "Un projet ? Parlons-en."; CTA button to /contact
- `src/app/page.tsx` — Server Component; composes Hero → FamilyGrid → Reassurance → ContactCTA; no "use client"
- `motion` package installed — required for `motion/react` import path (framer-motion@12 does not export this subpath)

## Task Commits

1. **Task 1: Create Button and Hero components** — `8486f88` (feat)
2. **Task 2: Build homepage sections and compose page.tsx** — `2f59cd4` (feat)

## Files Created/Modified

| File | Status | Notes |
|------|--------|-------|
| `src/components/ui/Button.tsx` | Created | Server Component, primary/secondary variants |
| `src/components/home/Hero.tsx` | Created | Client Component, motion/react entrance animation |
| `src/components/home/FamilyGrid.tsx` | Created | Server Component, 8 cards from machineFamilies |
| `src/components/home/Reassurance.tsx` | Created | Server Component, 3 stats |
| `src/components/home/ContactCTA.tsx` | Created | Server Component, /contact CTA |
| `src/app/page.tsx` | Modified | Replaced default Next.js placeholder |
| `package.json` | Modified | Added motion dependency |

## Decisions Made

- **Hero is the only Client Component:** The plan requires motion entrance animations. Only Hero.tsx needs `"use client"` — keeping FamilyGrid, Reassurance, ContactCTA as Server Components avoids unnecessary hydration cost.
- **motion package added:** The plan spec mandates `import { motion } from "motion/react"`. The `framer-motion@12` package (already in deps) exports from `"framer-motion"` directly but does NOT provide a `motion/react` subpath. The standalone `motion` package (same version 12.38.0, same maintainer) provides that exact path. Added as dependency rather than changing the import path to preserve the spec.
- **Button stays Server Component:** No client-side state, no event handlers beyond what Next.js Link provides natively.
- **FamilyGrid hover via CSS only:** Tailwind `group-hover:` utilities provide hover lift, border color change, and icon scale without any JavaScript — cleaner than motion for simple hover states.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added motion package for motion/react import path**
- **Found during:** Task 2 build verification
- **Issue:** `npm run build` failed with "Module not found: Can't resolve 'motion/react'". `framer-motion@12.38.0` exports only from the root path `"framer-motion"`, not the `motion/react` subpath.
- **Fix:** Ran `npm install motion` — adds the standalone `motion@12.38.0` package which provides `./react` export (`motion/react`). Both framer-motion and motion are published by the same team at the same version.
- **Files modified:** `package.json`, `package-lock.json`
- **Commit:** `2f59cd4` (included in Task 2 commit)

## Checkpoint Auto-approved

**Task 3: checkpoint:human-verify** — Auto-approved (parallel executor agent). Visual/functional verification (Hero heading, 8 FamilyGrid cards, Reassurance stats, ContactCTA /contact link, Header/Footer shell) deferred to human review or integration test in a later phase.

## Known Stubs

| File | Stub | Reason |
|------|------|--------|
| `src/components/home/Hero.tsx` | Hero background is CSS gradient only (no photo) | Phase 2 scope — background image/video from BTP site photography |
| `src/components/home/FamilyGrid.tsx` | Icons are emoji placeholders | Plan 04 scope (families.ts already uses emoji; SVG illustrations in Phase 2) |

## Threat Surface Scan

No new threat surface beyond what is declared in the plan's threat model:
- T-03-01 (Hero client component): No sensitive data in Hero — motion state is cosmetic only
- T-03-02 (Motion on low-end devices): `motion/react` respects `prefers-reduced-motion` automatically

## Verification Results

```
grep "use client" Hero.tsx          → line 1: confirmed
grep "use client" page.tsx          → NONE (correct — Server Component)
grep "use client" FamilyGrid.tsx    → NONE (correct)
grep "use client" Reassurance.tsx   → NONE (correct)
grep "use client" ContactCTA.tsx    → NONE (correct)
grep machineFamilies.map FamilyGrid → line 20: confirmed
grep motion/react Hero.tsx          → line 2: confirmed
grep catalogue FamilyGrid.tsx       → 3 matches (section href + card href template + footer link)
npm run build                       → 6 static pages, 0 errors, exits 0
```

## Self-Check: PASSED

Files confirmed to exist:
- `src/components/ui/Button.tsx` — FOUND
- `src/components/home/Hero.tsx` — FOUND
- `src/components/home/FamilyGrid.tsx` — FOUND
- `src/components/home/Reassurance.tsx` — FOUND
- `src/components/home/ContactCTA.tsx` — FOUND
- `src/app/page.tsx` — FOUND

Commits confirmed in git log:
- `8486f88` feat(01-03): create Button and Hero components — FOUND
- `2f59cd4` feat(01-03): build homepage sections and compose page.tsx — FOUND

## Next Phase Readiness

- Homepage (`/`) renders all 4 sections: Hero → FamilyGrid → Reassurance → ContactCTA
- All 8 machine families are clickable from the homepage, linking to `/catalogue/[slug]`
- `/contact` CTA is wired and the route exists (stub from Plan 02)
- `src/components/ui/Button.tsx` is reusable across all future plans requiring CTA buttons
- Build exits 0, ready for Plan 04 (machine data layer enrichment)
- No blockers for remaining plans

---
*Phase: 01-foundation-homepage*
*Completed: 2026-04-18*
