---
phase: 04-quote-form
plan: "01"
subsystem: ui
tags: [react, motion, next.js, forms, validation, useSearchParams]

# Dependency graph
requires:
  - phase: 03-product-pages
    provides: MachineDetailAnimated motion/react pattern; product page CTA link to /contact?machine=slug
provides:
  - DevisForm client component with 8 fields, client-side validation, URL pre-fill, animated success panel
  - /contact page with page header and Suspense boundary wrapping DevisForm
affects: [04-02-quote-form, any phase adding email backend or form analytics]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "'use client' form component with useSearchParams pre-fill from URL query param"
    - "AnimatePresence mode='wait' for form/success-panel swap animation"
    - "Suspense boundary wrapping useSearchParams consumer in Next.js 15 App Router page"
    - "Helper components (FormField, SuccessPanel, inputClass) co-located in same file as main export"

key-files:
  created:
    - src/components/contact/DevisForm.tsx
  modified:
    - src/app/contact/page.tsx

key-decisions:
  - "Machine field is plain text (not select/autocomplete) — slug value from URL appears as-is; Plan 02 will format for email readability"
  - "Submit handler is a console.log stub — real Resend API call wired in Plan 02"
  - "successVariants defined at module scope so SuccessPanel can reference without re-declaring inside nested component"
  - "Link (next/link) used instead of <a> for /catalogue navigation to satisfy Next.js ESLint rule"

patterns-established:
  - "Form validation pattern: validate() returns boolean, sets errors state, clears per-field on change"
  - "Contact component directory: src/components/contact/ established for form-related UI"

requirements-completed: [FORM-01, FORM-02, FORM-03, FORM-04]

# Metrics
duration: 15min
completed: 2026-04-18
---

# Phase 04 Plan 01: Devis Form UI Summary

**Animated devis form at /contact with 8 fields, URL-based machine pre-fill, client-side validation, and stub submit with AnimatePresence success panel**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-18T19:00:00Z
- **Completed:** 2026-04-18T19:11:33Z
- **Tasks:** 2 auto tasks completed (checkpoint:human-verify pending)
- **Files modified:** 2

## Accomplishments
- Created `DevisForm.tsx` — fully interactive 'use client' form with 2 sections (coordonnées + besoin), 8 fields, client-side validation with inline red error messages, URL pre-fill via `useSearchParams`, and stub submit handler
- Animated success panel with `AnimatePresence mode="wait"` — form fades out, success panel fades/scales in with orange checkmark
- Updated `/contact` page with branded header (orange eyebrow, bold h1, subtitle) and `<Suspense>` boundary required by Next.js 15 for `useSearchParams` consumers
- Build passes: `/contact` renders as static page (`○`)

## Task Commits

1. **Task 1: Create DevisForm client component** - `03fd8e3` (feat)
2. **Task 2: Update /contact page with Suspense boundary** - `27a5a0f` (feat)

## Files Created/Modified
- `src/components/contact/DevisForm.tsx` — 'use client' form component: 8 fields, validation, useSearchParams pre-fill, AnimatePresence success panel
- `src/app/contact/page.tsx` — Page header + Suspense boundary wrapping DevisForm; Link import removed (no longer needed)

## Decisions Made
- Machine slug from URL (`?machine=pelle-hydraulique`) displayed as-is in the text field — formatting deferred to Plan 02 email template
- Submit is a console.log stub for Plan 01; Plan 02 wires the real `/api/contact` Resend route
- `successVariants` defined at module scope (not inside `DevisForm`) so `SuccessPanel` sub-component can reference it directly

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Replaced `<a>` tag with Next.js `<Link>` in SuccessPanel**
- **Found during:** Task 2 (build verification)
- **Issue:** SuccessPanel used `<a href="/catalogue">` which violates `@next/next/no-html-link-for-pages` ESLint rule and causes build failure
- **Fix:** Added `import Link from 'next/link'` and replaced `<a>` with `<Link>` component
- **Files modified:** src/components/contact/DevisForm.tsx
- **Verification:** `npm run build` exits 0 after fix
- **Committed in:** 27a5a0f (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug/build failure)
**Impact on plan:** Essential fix — build would not pass without it. No scope creep.

## Issues Encountered
- ESLint `@next/next/no-html-link-for-pages` rule blocked build — resolved by switching to `<Link>` (Next.js best practice for internal navigation)

## User Setup Required
None - no external service configuration required. Resend API key setup deferred to Plan 02.

## Next Phase Readiness
- DevisForm UI complete and build-verified — ready for Plan 02 (Resend email integration)
- Plan 02 must: create `/api/contact` route, add `RESEND_API_KEY` env var, replace stub submit handler with `fetch('/api/contact', ...)`
- Human-verify checkpoint (Task 3) still pending — reviewer should visit http://localhost:3000/contact to confirm form layout, pre-fill, validation, and success panel animation

---
*Phase: 04-quote-form*
*Completed: 2026-04-18*
