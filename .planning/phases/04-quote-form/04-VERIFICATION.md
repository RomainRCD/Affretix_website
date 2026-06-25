---
phase: 04-quote-form
verified: 2026-04-19T16:00:00Z
status: human_needed
score: 10/11 must-haves verified
re_verification: false
human_verification:
  - test: "Submit the form with a valid RESEND_API_KEY set in .env.local — fill all required fields and click 'Envoyer ma demande'"
    expected: "Email arrives at contact@affretix.fr with all 8 fields in a formatted HTML table. Subject is 'Demande de devis — [nom]'. Reply-To is set to the submitter's email."
    why_human: "Cannot verify email delivery programmatically without calling the live Resend API. The API route, SDK wiring, recipient, and HTML builder are all confirmed in code — only actual delivery needs human confirmation."
  - test: "Submit the form with RESEND_API_KEY missing or set to an invalid value"
    expected: "An inline red error box appears below the submit button. Form fields are NOT cleared. Success panel does NOT appear."
    why_human: "Error path behavior (inline display, form preservation) requires browser interaction to fully validate. The apiError state and role=alert div exist in code but live rendering must be confirmed."
---

# Phase 4: Quote Form Verification Report

**Phase Goal:** A visitor can submit a complete devis request from a product page and receive visual confirmation, while Affretix receives the request by email.
**Verified:** 2026-04-19T16:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visitor can fill in all contact fields: nom, entreprise, téléphone, email | VERIFIED | `DevisForm.tsx` lines 144-186: four typed inputs (text, text, tel, email) with correct `name` attributes and `formData` bindings |
| 2 | Visitor can fill in all need fields: durée, lieu de chantier, description des travaux | VERIFIED | `DevisForm.tsx` lines 207-239: three fields (duree, lieu, textarea description) with correct bindings |
| 3 | Machine type field is pre-filled when URL contains `?machine=pelle-hydraulique` | VERIFIED | `useSearchParams()` called, `useEffect` reads `searchParams.get('machine')` and calls `setFormData` on mount (lines 60-65). Suspense boundary in `contact/page.tsx` required by Next.js 15 is present. Product page CTA wired at `/catalogue/[slug]/[machineSlug]/page.tsx:159`. |
| 4 | Required fields show a red error message when submitted empty | VERIFIED | `validate()` function (lines 78-90) sets `FormErrors` state. `FormField` helper renders `<p className="...text-red-500">` when `error` prop is non-empty. Four required fields: nom, telephone, email, description. |
| 5 | After a real API call succeeds, the form is replaced by a success panel (inline, no redirect) | VERIFIED | `handleSubmit` (lines 92-122): on `response.ok`, calls `setSubmitted(true)`. `AnimatePresence` switches between `motion.form` and `SuccessPanel` keyed on `submitted` state. |
| 6 | Success panel fades and scales in via motion/react | VERIFIED | `successVariants` at module scope: `hidden: { opacity:0, scale:0.95, y:10 }` → `visible: { opacity:1, scale:1, y:0 }` with `exit` variant. `SuccessPanel` uses `variants={successVariants}`. Import is `motion/react` (not framer-motion). |
| 7 | The /contact page renders without error and uses DevisForm | VERIFIED | `contact/page.tsx` exports `metadata` + `ContactPage`. `DevisForm` imported from `@/components/contact/DevisForm`. Wrapped in `<Suspense>`. Build output: `○ /contact  4.22 kB` (static, no error). |
| 8 | Submitting the form POSTs to /api/contact via fetch | VERIFIED | `DevisForm.tsx` line 99: `fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })`. Stub `console.log` is fully removed (0 occurrences confirmed). |
| 9 | API route validates payload and rejects missing required fields (400) and non-POST methods (405) | VERIFIED | `route.ts` validates 4 required fields with type+trim checks (lines 78-85) and email regex (lines 88-91). Returns `NextResponse.json({ error }, { status: 400 })`. Only `POST` exported — Next.js returns 405 for all other methods automatically. |
| 10 | RESEND_API_KEY is never exposed in the client bundle | VERIFIED | Key read via `process.env.RESEND_API_KEY` inside a server-only Route Handler (`route.ts`, no `'use client'`). No `NEXT_PUBLIC_` prefix. Not present in `DevisForm.tsx` or any client component. `.env.local` confirmed gitignored at `.gitignore:32`. |
| 11 | Affretix receives the form data by email via Resend | HUMAN NEEDED | Code: `resend.emails.send()` wired correctly — `to: ['contact@affretix.fr']`, `replyTo: body.email`, `html: buildEmailHtml(body)` (all 8 fields in HTML table). Resend SDK `^6.12.0` in `package.json`. Cannot verify actual email delivery without a live API key and inbox access. |

**Score:** 10/11 truths fully verified via static analysis and build checks. 1 truth requires human confirmation of live email delivery.

---

### Deferred Items

None.

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/contact/DevisForm.tsx` | Client form: all fields, useSearchParams pre-fill, validation, success state | VERIFIED | 333 lines. `'use client'` on line 1. Exports `DevisForm`. All 8 fields, `validate()`, `handleSubmit` with real fetch, `SuccessPanel` with motion variants. |
| `src/app/contact/page.tsx` | Server page wrapping DevisForm in Suspense | VERIFIED | 41 lines. Exports `metadata` + `default ContactPage`. `<Suspense>` wraps `<DevisForm />`. Builds as static route `○`. |
| `src/app/api/contact/route.ts` | Route Handler: validates body, sends email via Resend SDK | VERIFIED | 130 lines. Exports `POST`. Validates 4 required fields + email regex. Sends HTML email via Resend. Returns `{ success: true }` or `{ error: string }`. Lazy Resend instantiation inside handler (not module scope) avoids build-time throws. |
| `.env.local.example` | Documents required RESEND_API_KEY | VERIFIED | 4 lines. Contains `RESEND_API_KEY=re_xxx...` with comment explaining purpose and source. `.env.local` is gitignored — not committed. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/app/contact/page.tsx` | `src/components/contact/DevisForm.tsx` | `import { DevisForm } from '@/components/contact/DevisForm'` | WIRED | Import on line 3, component used inside `<Suspense>` on line 36. |
| `src/components/contact/DevisForm.tsx` | `next/navigation` | `import { useSearchParams } from 'next/navigation'` | WIRED | Import on line 3, `useSearchParams()` called on line 42, result used in `useEffect` on line 61. |
| `src/components/contact/DevisForm.tsx` | `motion/react` | `import { motion, AnimatePresence } from 'motion/react'` | WIRED | Import on line 4. `AnimatePresence` wraps form/panel swap on line 125. `motion.form` on line 129. `motion.div` in `SuccessPanel`. |
| `src/components/contact/DevisForm.tsx` | `src/app/api/contact/route.ts` | `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })` | WIRED | `fetch` call on line 99 with JSON body. Response parsed on line 105. `response.ok` branch sets `setSubmitted(true)`. Error branch sets `setApiError`. |
| `src/app/api/contact/route.ts` | `resend` | `import { Resend } from 'resend'` | WIRED | Import on line 2. `new Resend(apiKey)` on line 102 inside handler. `resend.emails.send()` called on line 105. |
| `src/app/api/contact/route.ts` | `process.env.RESEND_API_KEY` | `const apiKey = process.env.RESEND_API_KEY` | WIRED | Line 94. Guard check on line 95 returns 500 if missing. `new Resend(apiKey)` on line 102. |
| `src/app/catalogue/[slug]/[machineSlug]/page.tsx` | `src/app/contact/page.tsx` | `` href={`/contact?machine=${machine.slug}`} `` | WIRED | Line 159. Product page CTA passes machine slug as URL param, completing the pre-fill flow. |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|-------------------|--------|
| `DevisForm.tsx` | `formData` | User input via controlled inputs + `useSearchParams()` | Yes — user-driven, URL-param pre-fill via `useEffect` | FLOWING |
| `DevisForm.tsx` | `submitted` | Set `true` when `response.ok` from `/api/contact` | Yes — depends on real API response | FLOWING |
| `DevisForm.tsx` | `apiError` | Set from `data.error` on `!response.ok` | Yes — populated from actual API error body | FLOWING |
| `route.ts` | email body | `buildEmailHtml(body)` with all 8 fields from parsed JSON payload | Yes — dynamic, per-submission HTML | FLOWING |

---

### Behavioral Spot-Checks

| Behavior | Method | Result | Status |
|----------|--------|--------|--------|
| TypeScript compiles clean | `npx tsc --noEmit` | Exit 0, no errors | PASS |
| Production build succeeds | `npm run build` | Exit 0; `/contact` as `○` static, `/api/contact` as `ƒ` dynamic | PASS |
| `DevisForm` stub removed | `grep "console.log" DevisForm.tsx` | 0 matches | PASS |
| `fetch('/api/contact')` present in DevisForm | Static analysis | Found on line 99 | PASS |
| `apiError` state wired (3+ occurrences) | Static analysis | 3 occurrences (state, setter, JSX render) | PASS |
| All 8 fields in email HTML builder | Static analysis in `route.ts` | 8 `row()` calls covering all fields | PASS |
| RESEND_API_KEY server-only | `grep -rn NEXT_PUBLIC_RESEND src/` | 0 matches; not in client components | PASS |
| `.env.local` gitignored | `git check-ignore .env.local` | `.gitignore:32` match confirmed | PASS |
| Email delivery end-to-end | Requires live Resend API + inbox | Cannot run statically | HUMAN NEEDED |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| FORM-01 | 04-01-PLAN.md | Visiteur peut renseigner ses coordonnées (nom, entreprise, téléphone, email) | SATISFIED | All 4 fields present in `DevisForm.tsx` section "Vos coordonnées" (lines 144-186) |
| FORM-02 | 04-01-PLAN.md | Visiteur peut préciser le type de machine pré-sélectionné (pré-rempli depuis la fiche) | SATISFIED | `useSearchParams` + `useEffect` pre-fills `machine` field from `?machine=` URL param; product page CTA at `catalogue/.../page.tsx:159` passes the slug |
| FORM-03 | 04-01-PLAN.md | Visiteur peut décrire son besoin (durée, lieu de chantier, description des travaux) | SATISFIED | Fields `duree`, `lieu`, `description` (textarea) present in section "Votre besoin" (lines 207-239) |
| FORM-04 | 04-01-PLAN.md + 04-02-PLAN.md | Visiteur reçoit une confirmation visuelle après envoi du formulaire | SATISFIED | `SuccessPanel` with `AnimatePresence` swap, animated orange checkmark, "Demande envoyée !" heading — shown inline on `setSubmitted(true)` |
| FORM-05 | 04-02-PLAN.md | Les données du formulaire sont envoyées par email à Affretix (via service tiers) | PARTIAL — HUMAN NEEDED | Code path is complete: `fetch → /api/contact → Resend SDK → contact@affretix.fr`. Resend SDK v6.12.0 installed. Live email delivery unconfirmed (requires RESEND_API_KEY and inbox verification). |

All 5 requirements are mapped and accounted for. FORM-05 is coded but needs live testing.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None found | — | — | — | — |

No TODOs, FIXMEs, placeholders, empty returns, hardcoded empty data, or stub patterns found in any phase-4 files. The stub `console.log('Form data:', formData)` from Plan 01 is confirmed removed (0 occurrences).

---

### Human Verification Required

#### 1. End-to-end email delivery with live RESEND_API_KEY

**Test:**
1. Add `RESEND_API_KEY=re_your_key_here` to `.env.local` (get a free key at https://resend.com/api-keys)
2. Run `npm run dev` and visit http://localhost:3000/contact
3. Fill all required fields (nom, téléphone, email, description) and click "Envoyer ma demande"
4. Confirm the form shows "Envoi en cours..." then transitions to the success panel ("Demande envoyée !")
5. Check the inbox at contact@affretix.fr — confirm email arrived with all 8 fields in a formatted HTML table

**Expected:** Email subject is `Demande de devis — [nom you entered]`. Reply-To is set to the submitter's email. All fields appear in the table (empty optional fields are omitted by the `row()` helper).

**Why human:** Live email delivery cannot be tested without a real API key and inbox access. The Resend SDK call, route wiring, recipient, and HTML builder are all confirmed in code — only actual delivery proves the end-to-end path.

#### 2. Error path — inline error display without form clearing

**Test:**
1. Without a valid RESEND_API_KEY (or set to `"invalid"`), run `npm run dev`
2. Fill the form and submit
3. Confirm a red error box appears below the submit button with text "Erreur de configuration serveur. Veuillez réessayer plus tard."
4. Confirm all form fields retain their values (form is NOT cleared on error)
5. Confirm the success panel does NOT appear

**Expected:** `role="alert"` div renders with `text-red-600 bg-red-50` styling. Form state preserved. No redirect.

**Why human:** The `apiError` state and `role="alert"` div are confirmed in code. The actual rendered behavior (visibility, styling, field preservation) requires browser interaction to fully validate.

---

### Gaps Summary

No blocking gaps. All artifacts exist, are substantive, and are fully wired. The build is clean (TypeScript and `npm run build` both pass). The only open items are live email delivery and error-state rendering, which require human browser testing and cannot be verified programmatically.

---

_Verified: 2026-04-19T16:00:00Z_
_Verifier: Claude (gsd-verifier)_
