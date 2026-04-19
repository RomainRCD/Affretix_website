---
phase: 04-quote-form
plan: "02"
subsystem: api
tags: [resend, next.js, api-route, email, fetch, form]

# Dependency graph
requires:
  - phase: 04-quote-form/04-01
    provides: DevisForm client component with stub console.log submit handler; FormData interface with 8 fields
provides:
  - src/app/api/contact/route.ts — Next.js Route Handler: validates payload, sends HTML email via Resend SDK
  - DevisForm updated: real fetch('/api/contact') replaces stub, inline apiError display on failure
  - .env.local.example documenting RESEND_API_KEY
affects: [any phase adding rate limiting, spam protection, or analytics to the contact form]

# Tech tracking
tech-stack:
  added:
    - resend@^6.12.0
  patterns:
    - "Defer Resend instantiation inside handler (not module scope) — Resend v6 throws at construction with no key, breaking build-time page data collection"
    - "Guard RESEND_API_KEY presence at runtime, return 500 with user-friendly message if missing"
    - "Fetch error handling pattern: check response.ok, parse error from JSON body, display inline without clearing form"

key-files:
  created:
    - src/app/api/contact/route.ts
    - .env.local.example
  modified:
    - src/components/contact/DevisForm.tsx

key-decisions:
  - "Resend client instantiated inside POST handler (not module scope) to avoid build-time throw when RESEND_API_KEY is absent in CI/preview environments"
  - "apiError displayed below submit button as role=alert div — form fields preserved on error so user can retry"
  - "from: onboarding@resend.dev used until Affretix domain is verified in Resend dashboard"
  - "replyTo: set to submitter's email for easy reply from contact@affretix.fr inbox"

patterns-established:
  - "API route guard pattern: check env var presence at request time, return 500 with friendly message rather than crash"
  - "Inline API error pattern: setApiError on !response.ok, clear on next submit attempt"

requirements-completed: [FORM-04, FORM-05]

# Metrics
duration: 3min
completed: 2026-04-19
---

# Phase 04 Plan 02: Resend Email Integration Summary

**Next.js /api/contact Route Handler with Resend SDK sending branded HTML email to contact@affretix.fr, replacing the DevisForm console.log stub with a real fetch call and inline error handling**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-19T15:34:16Z
- **Completed:** 2026-04-19T15:36:46Z
- **Tasks:** 3 (2 auto + 1 checkpoint:human-verify — approved)
- **Files modified:** 3 (created 2, modified 1)

## Accomplishments

- Created `src/app/api/contact/route.ts`: validates 4 required fields + email format, sends a branded HTML email via Resend SDK with all 8 form fields in a formatted table, proper error responses (400/500)
- Updated `DevisForm.tsx`: stub console.log replaced with real `fetch('/api/contact')`, `apiError` state drives an inline red alert block below the submit button — form fields preserved on failure
- Created `.env.local.example` documenting `RESEND_API_KEY`
- Build passes: `/contact` static, `/api/contact` dynamic route handler, TypeScript clean

## Task Commits

1. **Task 1: Install Resend, create API route, and document env var** - `1809159` (feat)
2. **Task 2: Wire DevisForm to fetch /api/contact and handle real success/error states** - `da30400` (feat)

## Files Created/Modified

- `src/app/api/contact/route.ts` — Route Handler: JSON parse, field validation, Resend email send, 400/500 error responses
- `src/components/contact/DevisForm.tsx` — Real fetch call, apiError state + inline display, stub removed
- `.env.local.example` — Documents RESEND_API_KEY with placeholder and instructions

## Decisions Made

- Resend client instantiated inside the POST handler (not module scope): Resend v6 throws `Missing API key` at construction time, which Next.js evaluates at build time for page data collection, blocking the build. Moving instantiation inside the handler defers it to runtime.
- `replyTo` set to the submitter's email address — allows Affretix to reply directly from their inbox without copy-pasting.
- `from: onboarding@resend.dev` used until Affretix domain is verified; this is the standard Resend sandbox sender for testing.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Deferred Resend instantiation from module scope to inside POST handler**
- **Found during:** Task 2 (build verification after Task 1 commit)
- **Issue:** `const resend = new Resend(process.env.RESEND_API_KEY)` at module scope causes Resend v6 to throw `Error: Missing API key` during Next.js build-time page data collection (when `RESEND_API_KEY` is absent). This blocked `npm run build` with `Failed to collect page data for /api/contact`.
- **Fix:** Removed module-scope `const resend`. Added `const apiKey = process.env.RESEND_API_KEY` guard inside the handler with a 500 response if absent; instantiate `new Resend(apiKey)` only when a request arrives.
- **Files modified:** src/app/api/contact/route.ts
- **Verification:** `npm run build` exits 0; `/contact` renders as static page (○), `/api/contact` as dynamic route handler (ƒ)
- **Committed in:** da30400 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug blocking build)
**Impact on plan:** Essential fix — build would not pass in any environment without RESEND_API_KEY set at build time. No scope creep.

## Issues Encountered

- Resend v6 constructor throws synchronously when given `undefined` as the API key — unlike v2/v3 which accepted it and only threw on send. The module-scope singleton pattern in the plan is incompatible with Next.js build-time module evaluation when the env var is absent. Fixed by lazy instantiation inside handler.

## User Setup Required

To test email delivery:

1. Create a free Resend account at https://resend.com
2. Generate an API key at https://resend.com/api-keys (Full Access)
3. Add to `.env.local` in the project root:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
4. Optionally verify your domain in Resend Dashboard → Domains; until then `onboarding@resend.dev` is used as the sender

## Next Phase Readiness

- Full end-to-end devis form complete: UI → POST /api/contact → Resend → contact@affretix.fr
- Human-verify checkpoint (Task 3) approved: end-to-end flow confirmed by reviewer (email delivery to be verified when RESEND_API_KEY is configured)
- Future phases can add rate limiting via Vercel Edge Middleware or WAF (see T-04-08 in threat model)

---
*Phase: 04-quote-form*
*Completed: 2026-04-19*
