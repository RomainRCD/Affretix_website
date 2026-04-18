---
phase: 01-foundation-homepage
plan: 02
subsystem: ui
tags: [nextjs, tailwind, typescript, server-components, navigation, layout]

# Dependency graph
requires:
  - 01-01-bootstrap (brand tokens, font pipeline, layout.tsx base)
provides:
  - Persistent site header with 8-family navigation links
  - Persistent site footer with Groupe LEVA mention in gold
  - Root layout wiring Header and Footer around all pages
  - Stub /contact page reachable from CTA links
affects:
  - All subsequent plans (every page gets Header + Footer via layout.tsx)
  - 01-03-homepage (hero CTA links to /contact — now reachable)
  - 01-04-data (families.ts will be enriched; Header imports it)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component layout (Header, Footer — no use client)
    - machineFamilies.map() loop for nav link generation from data
    - flex flex-col min-h-screen + flex-1 on main for sticky footer
    - rel="noopener noreferrer" on external links (T-02-01 threat mitigation)

key-files:
  created:
    - src/data/families.ts
    - src/components/layout/Header.tsx
    - src/components/layout/Footer.tsx
    - src/app/contact/page.tsx
  modified:
    - src/app/layout.tsx

key-decisions:
  - "Header and Footer are Server Components — no use client needed since no interactivity in this plan"
  - "families.ts created in this plan as minimal stub (Plan 04 will enrich with full machine data)"
  - "Mobile nav deferred to Phase 2 — mobile shows only Catalogue + Devis links"
  - "Footer links to /mentions-legales and /politique-confidentialite as stub hrefs — pages not created yet"

# Metrics
duration: 15min
completed: 2026-04-18
---

# Phase 01 Plan 02: Header, Footer, and Layout Shell Summary

**Persistent site shell built: Server Component Header with 8-family nav bar, Server Component Footer with Groupe LEVA mention in gold, wired into root layout.tsx — every page now displays brand chrome. Stub /contact page created for CTA target.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-18T00:00:00Z
- **Completed:** 2026-04-18
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- `src/data/families.ts` created with all 8 MachineFamily entries (terrassement, transport-chantier, voirie, compactage, vrd-reseaux, manutention-levage, beton-fondations, demolition-recyclage)
- `Header.tsx` Server Component: brand name "Affretix" in text-orange, Catalogue + "Demander un devis" CTA in top bar, full 8-family desktop nav bar via `machineFamilies.map()`
- `Footer.tsx` Server Component: Groupe LEVA external link with `rel="noopener noreferrer"` in text-gold, 3-column grid (brand/catalogue/contact+legal), mentions légales + politique de confidentialité links, copyright bar
- `layout.tsx` updated: Header and Footer imported and rendered around `<main>`, `flex flex-col min-h-screen` + `flex-1` ensures footer always at bottom
- `/contact` stub page: H1, description, back-to-home link, proper metadata with Affretix in title
- Build: 6 static pages, 0 TypeScript errors, 0 linting warnings

## Task Commits

1. **Task 1: Create Header and Footer components** — `5203751` (feat)
2. **Task 2: Wire Header/Footer into layout.tsx and stub /contact page** — `5d98653` (feat)

## Files Created/Modified

- `src/data/families.ts` — MachineFamily type + 8 entries with slug, name, description, icon, machineCount
- `src/components/layout/Header.tsx` — Server Component; top bar with brand + CTA nav; desktop family nav bar
- `src/components/layout/Footer.tsx` — Server Component; 3-column grid; LEVA link in text-gold with rel=noopener noreferrer
- `src/app/layout.tsx` — Added Header/Footer imports, restructured body with flex layout
- `src/app/contact/page.tsx` — Stub contact page with metadata (title includes "Affretix")

## Decisions Made

- **Server Components only:** Header and Footer have no interactive state — no animation, no dropdowns in this plan. `"use client"` deliberately omitted for performance (SSR benefits, no hydration cost).
- **families.ts stub:** Plan 04 will enrich this file with full machine data (photos, specs, etc.). Minimal shape created here so Header compiles and nav renders correctly today.
- **Mobile nav deferred:** Desktop shows full 8-family nav bar. Mobile shows just Catalogue link + Devis CTA. Full mobile hamburger menu is Phase 2 scope.
- **Footer stubs for legal pages:** `/mentions-legales` and `/politique-confidentialite` links render in Footer but pages don't exist yet — acceptable as stub hrefs for Phase 1.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written. npm install required in worktree (no pre-existing node_modules) but this is a worktree setup detail, not a deviation.

## Known Stubs

| File | Stub | Reason |
|------|------|--------|
| `src/app/contact/page.tsx` | No contact form — placeholder text only | Form implementation is Phase 4 scope (Resend/Formspree integration) |
| `src/components/layout/Footer.tsx` | Links to `/mentions-legales` and `/politique-confidentialite` | Pages not created in this plan — stubs for future legal pages |
| `src/data/families.ts` | machineCount values are estimates; icon is emoji placeholder | Plan 04 will replace with real counts and SVG icons |

## Threat Surface Scan

Threat T-02-01 (Footer external link tab-nabbing) is mitigated: `rel="noopener noreferrer"` is present on the groupe-leva.fr link in Footer.tsx line 22.

No new threat surface beyond what is declared in the plan's threat model.

## Verification Results

```
grep machineFamilies.map Header.tsx      → line 42: confirmed
grep text-gold Footer.tsx               → lines 25, 91: confirmed (link + bottom bar)
grep groupe-leva.fr Footer.tsx          → line 22: confirmed with rel="noopener noreferrer"
grep Header layout.tsx                  → lines 4, 33: import + render confirmed
grep Footer layout.tsx                  → lines 5, 35: import + render confirmed
npm run build                           → 6 static pages, 0 errors, exits 0
tsc --noEmit                            → exits 0, no errors
```

## Next Phase Readiness

- Every route now renders Header + Footer automatically via root layout
- `/contact` route resolves — all CTA links throughout the site work
- `src/data/families.ts` ready for Plan 04 to enrich with full machine catalogue data
- No blockers for Plan 03 (homepage hero/sections)

---
*Phase: 01-foundation-homepage*
*Completed: 2026-04-18*
