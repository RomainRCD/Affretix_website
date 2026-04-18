---
phase: 01-foundation-homepage
status: passed
verified: 2026-04-18
---

# Verification: Phase 1 — Foundation & Homepage

**Goal:** A visitor can land on the Affretix homepage, understand the offer, navigate to machine families, and reach a general contact CTA.

## Must-Haves Check

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | Build passes without errors | ✓ PASS | `next build` → 6 static pages, 0 errors |
| 2 | Brand colors in globals.css | ✓ PASS | `--color-orange: #F58634`, `--color-grey-dark: #353335`, `--color-gold: #C9A84C` |
| 3 | Barlow Condensed + DM Sans fonts | ✓ PASS | `next/font/google` with CSS variables in layout.tsx |
| 4 | Header nav links to 8 families | ✓ PASS | `machineFamilies.map()` → dynamic links `/catalogue/{slug}` |
| 5 | Footer groupe LEVA mention | ✓ PASS | Link to groupe-leva.fr with `text-gold` styling |
| 6 | Hero: value proposition BTP avec chauffeur | ✓ PASS | "Location de matériel BTP avec chauffeur" in Hero.tsx |
| 7 | FamilyGrid: 8 navigable family cards | ✓ PASS | `machineFamilies.map()` → 8 cards linking to `/catalogue/[slug]` |
| 8 | Reassurance: stats + groupe LEVA | ✓ PASS | 67+ machines, 100% avec opérateur, Groupe LEVA stats |
| 9 | ContactCTA links to /contact | ✓ PASS | `Button href="/contact"` in ContactCTA.tsx |
| 10 | Data: 8 families in families.ts | ✓ PASS | 8 slugs defined |
| 11 | Data: 72 machines in machines.ts | ✓ PASS | 72 machine entries with familySlug references |

## Requirements Coverage

| Requirement | Description | Status |
|-------------|-------------|--------|
| HOME-01 | Hero section with value proposition | ✓ Delivered |
| HOME-02 | 8 families accessible from homepage | ✓ Delivered |
| HOME-03 | Reassurance stats + LEVA mention | ✓ Delivered |
| HOME-04 | Contact CTA on homepage | ✓ Delivered |
| HOME-05 | Groupe LEVA visible in footer | ✓ Delivered |
| NAV-01 | 8-family navigation in Header | ✓ Delivered |
| NAV-04 | Footer with legal links + LEVA | ✓ Delivered |
| UX-01 | Brand palette applied (#F58634, #353335) | ✓ Delivered |
| UX-02 | Barlow Condensed + DM Sans typography | ✓ Delivered |

**Coverage: 9/9 requirements ✓**

## Human Verification Items

The following should be checked in the browser (`npm run dev`):

1. Homepage renders without visual errors on desktop and mobile
2. Header family nav links are all visible and correct
3. Hero animation (Framer Motion stagger) plays on load
4. FamilyGrid cards hover state shows orange border lift
5. Footer LEVA link opens correct URL

## Verdict

**PASSED** — All automated checks pass. Phase 1 goal achieved.
