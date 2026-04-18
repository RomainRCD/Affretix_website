---
phase: 02-catalogue
status: passed
verified: 2026-04-18
---

# Verification: Phase 2 — Catalogue

**Goal:** A visitor can browse all machine families and see machines within each family, on any device, with smooth interactions.

## Must-Haves Check

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | /catalogue index page exists (SSG) | ✓ PASS | `src/app/catalogue/page.tsx`, static in build output |
| 2 | 8 family cards on /catalogue | ✓ PASS | FamilyGrid + FamilyCard render `machineFamilies.map()` |
| 3 | /catalogue/[slug] dynamic routes (8 families) | ✓ PASS | `generateStaticParams` returns all 8 slugs, `dynamicParams=false` |
| 4 | `await params` Next.js 15 pattern | ✓ PASS | `const { slug } = await params` in slug page |
| 5 | MachineCard: name, variants, image, avec opérateur | ✓ PASS | MachineCard.tsx verified |
| 6 | Responsive grid (1→2→4 columns) | ✓ PASS | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |
| 7 | Stagger animations (Framer Motion) | ✓ PASS | FamilyGrid.tsx + MachineGrid.tsx use `motion/react` whileInView |
| 8 | Hover states on cards | ✓ PASS | Orange border, title color, image scale on hover |
| 9 | Unsplash remotePattern in next.config.ts | ✓ PASS | Added for machine placeholder images |
| 10 | Build passes — 9+ static routes | ✓ PASS | `next build` → 0 errors, 8 SSG family routes + /catalogue |

## Requirements Coverage

| Requirement | Status |
|-------------|--------|
| CAT-01 — /catalogue index with 8 families | ✓ Delivered |
| CAT-02 — Browse machines per family | ✓ Delivered |
| CAT-03 — Machine with name, capacity, image | ✓ Delivered |
| CAT-04 — Manufacturer/placeholder images | ✓ Delivered (Unsplash) |
| NAV-02 — Responsive on all viewports | ✓ Delivered |
| UX-03 — Framer Motion transitions | ✓ Delivered |
| UX-04 — Expressive hover states | ✓ Delivered |

**Coverage: 7/7 requirements ✓**

## Verdict

**PASSED** — All automated checks pass. Phase 2 goal achieved.
