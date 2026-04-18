# Phase 1: Foundation & Homepage - Research

**Researched:** 2026-04-18
**Domain:** Next.js App Router, Tailwind CSS v4, Framer Motion, next/font, TypeScript — static vitrine site
**Confidence:** HIGH (stack verified against live npm registry and official docs)

---

## Summary

This phase bootstraps a blank Next.js project from scratch: it installs the full stack, wires up the design system (brand colors, fonts, global layout), and delivers a working homepage that satisfies HOME-01 through HOME-05, NAV-01, NAV-04, UX-01, and UX-02.

**Critical version mismatch vs. project spec:** The project spec says "Next.js 14+". npm latest is currently **Next.js 16.2.4** and **Tailwind CSS 4.2.2** — both major versions with breaking API changes versus what the spec implicitly assumed. Tailwind v4 replaces `tailwind.config.js` entirely with a CSS `@theme` directive. Next.js 16 enforces fully async request APIs (params, searchParams are Promises). The plan must target these current versions or explicitly pin to Next.js 15.x (LTS maintenance line) and Tailwind v3 (stable, still maintained). **Recommendation: use Next.js 15 (latest: 15.5.15) + Tailwind v4 — the most battle-tested current pairing with good create-next-app support.** Next.js 16 async-params changes add friction for a first phase.

**Primary recommendation:** Bootstrap with `npx create-next-app@15 --typescript --tailwind --eslint --app --src-dir`, then add framer-motion, configure `@theme` brand tokens, and set up font CSS variables in `globals.css`.

---

## Project Constraints (from CLAUDE.md)

All directives from `CLAUDE.md` that affect this phase:

- **Tech Stack (locked):** Next.js 14+ App Router, TypeScript, Tailwind CSS, Framer Motion
- **No CMS:** All content managed via TypeScript/JSON files in codebase
- **No Backend:** Static site only. Forms via third-party service (Phase 4)
- **Brand (locked):** Orange `#F58634`, grey `#353335`, white `#FFFFFF`, gold `#C9A84C`
- **Typography (locked):** Barlow Condensed Bold (headings/subtitles), DM Sans (body)
- **Performance:** next/image, SSG/ISR generation
- **SEO:** Metadata, Open Graph, structured data (Phase 5 concern, but layout.tsx metadata export must be planned now)
- **GSD workflow:** All file changes must go through a GSD command entry point

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HOME-01 | Visitor sees Affretix value proposition (location BTP avec chauffeur/opérateur) in hero section | Hero component pattern with Framer Motion entrance animation |
| HOME-02 | Visitor can access all 8 machine families from homepage | FamilyGrid component reading from data/families.ts catalogue file |
| HOME-03 | Visitor sees key stats / reassurance elements (machines count, zones, groupe LEVA) | Stats/reassurance section component, hardcoded or from data file |
| HOME-04 | Visitor can access general contact form from homepage | Link/CTA to `/contact` or modal — form wiring deferred to Phase 4 |
| HOME-05 | Groupe LEVA mention visible in footer or dedicated section | Footer component with LEVA gold color `#C9A84C` |
| NAV-01 | Visitor can navigate to 8 machine families via main menu | Header with nav links to `/catalogue/[family-slug]` routes |
| NAV-04 | Footer contains legal info and groupe LEVA link | Footer component in root layout.tsx |
| UX-01 | Design respects brand palette (orange, grey, white) | Tailwind v4 `@theme` custom color tokens |
| UX-02 | Typography uses Barlow Condensed (headings) and DM Sans (body) | next/font/google CSS variable setup in layout.tsx |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.5.15 | Framework — App Router, SSG, Image opt | Most stable current LTS line; 16 has async-params breaking changes too risky for phase 1 |
| react | 19.x (bundled with Next 15) | UI runtime | Bundled by Next.js — do not install separately |
| react-dom | 19.x | DOM renderer | Same as above |
| typescript | 5.x | Type safety | Included via create-next-app |
| tailwindcss | 4.2.2 | Utility CSS | Latest stable — v4 CSS-first config, no tailwind.config.js needed |
| @tailwindcss/postcss | 4.2.2 | PostCSS bridge for Next.js | Required by Tailwind v4 (replaces `autoprefixer` + old postcss-tailwindcss) |
| postcss | 8.x | PostCSS runner | Required peer dep |
| framer-motion | 12.38.0 | Animations and page transitions | Rebranded to "motion" in late 2024 — import from `motion/react`, not `framer-motion` |

[VERIFIED: npm registry — versions confirmed 2026-04-18]

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| eslint | 9.x | Linting | Bundled via create-next-app |
| @types/react | 19.x | TypeScript types | Auto-installed |
| @types/node | 22.x | Node types | Auto-installed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Next.js 15 | Next.js 16 (latest) | v16 async-params API is a breaking change — adds boilerplate for `await params` on every dynamic route. Unnecessary friction for phase 1 |
| Next.js 15 | Next.js 14 LTS | 14 is maintenance only; no new features. v15 is the stable production choice |
| Tailwind v4 | Tailwind v3 | v3 requires `tailwind.config.js` — fine but v4 is the current default from create-next-app and has better perf |
| `framer-motion` package | `motion` package | Both work; `framer-motion` still resolves to the same library — use `motion/react` import path |

**Installation:**
```bash
npx create-next-app@15 affretix-website --typescript --tailwind --eslint --app --src-dir
cd affretix-website
npm install framer-motion
```

[VERIFIED: npm view next@next-15 version = 15.5.15, tailwindcss latest = 4.2.2, framer-motion latest = 12.38.0]

---

## Architecture Patterns

### Recommended Project Structure
```
affretix-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, header, footer, metadata defaults
│   │   ├── page.tsx            # Homepage (HOME-01 to HOME-05)
│   │   ├── globals.css         # @import "tailwindcss" + @theme brand tokens + font vars
│   │   └── contact/
│   │       └── page.tsx        # General contact page (stub, wired in Phase 4)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # NAV-01: main nav with 8 family links
│   │   │   └── Footer.tsx      # NAV-04: legal + groupe LEVA
│   │   ├── home/
│   │   │   ├── Hero.tsx        # HOME-01: value proposition
│   │   │   ├── FamilyGrid.tsx  # HOME-02: 8 families entry points
│   │   │   └── Reassurance.tsx # HOME-03: stats + LEVA mention (HOME-05)
│   │   └── ui/
│   │       └── Button.tsx      # Reusable CTA button (orange brand)
│   └── data/
│       └── families.ts         # Machine family data (names, slugs, icons)
├── public/
│   └── logo.svg                # Affretix logo
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

[VERIFIED: official Next.js docs — project-structure page, nextjs.org, version 16.2.4 / 2026-04-15]

### Pattern 1: Root Layout with Font CSS Variables
**What:** Define both fonts as CSS variables in `layout.tsx`, apply them to `<html>`, reference in `globals.css` via `@theme`
**When to use:** Whenever multiple fonts must coexist with Tailwind utility classes

```tsx
// Source: nextjs.org/docs/app/getting-started/fonts (confirmed 2026-04-15)
// src/app/layout.tsx
import { Barlow_Condensed, DM_Sans } from 'next/font/google'

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**Note on Barlow Condensed:** It is NOT a variable font. Must specify explicit `weight` array. `next/font/google` supports it fine with weight specification. [VERIFIED: fonts.google.com/specimen/Barlow+Condensed]

### Pattern 2: Tailwind v4 Brand Tokens via @theme
**What:** Define brand palette and custom font families in `globals.css` using the `@theme` directive — no `tailwind.config.js` needed.
**When to use:** Every project using Tailwind v4 with a custom design system.

```css
/* Source: tailwindcss.com/docs/theme (verified 2026-04-18) */
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand colors */
  --color-orange: #F58634;
  --color-grey-dark: #353335;
  --color-gold: #C9A84C;

  /* Font families (use CSS vars set by next/font) */
  --font-heading: var(--font-barlow-condensed), "Barlow Condensed", sans-serif;
  --font-body: var(--font-dm-sans), "DM Sans", sans-serif;
}

body {
  font-family: var(--font-body);
  color: var(--color-grey-dark);
}
```

After this, Tailwind generates utilities: `text-orange`, `bg-orange`, `text-gold`, `font-heading`, `font-body`, etc.

### Pattern 3: Framer Motion in App Router (Client Components Only)
**What:** Motion components require `"use client"` — wrap in a client component boundary.
**When to use:** Any component that uses `motion.*` elements.

```tsx
// Source: staticmania.com/blog/how-to-use-framer-motion-for-animations-in-next-js (2024)
// src/components/home/Hero.tsx
"use client"
import { motion } from "motion/react"  // NEW import path since late 2024

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* hero content */}
    </motion.div>
  )
}
```

**IMPORTANT:** Import from `"motion/react"`, NOT `"framer-motion"`. Both resolve to the same library but `motion/react` is the current package path. [VERIFIED: npm framer-motion 12.38.0 dist-tags, search results from March 2026]

### Pattern 4: Machine Data Layer (TypeScript)
**What:** Catalogue content lives in typed TypeScript files, not a CMS.
**When to use:** All content access — enables full TypeScript type safety and tree-shaking.

```ts
// src/data/families.ts
export type MachineFamily = {
  slug: string
  name: string
  description: string
  icon: string  // path to SVG or emoji for phase 1
  machineCount: number
}

export const machineFamilies: MachineFamily[] = [
  { slug: 'terrassement', name: 'Terrassement', description: '...', icon: '...', machineCount: 12 },
  { slug: 'transport', name: 'Transport', description: '...', icon: '...', machineCount: 8 },
  // ... 8 families total
]
```

### Pattern 5: next/image with Remote Manufacturer URLs
**What:** Configure `remotePatterns` in `next.config.ts` for each manufacturer domain.
**When to use:** Phase 1 only needs placeholder/no images; Phase 2 needs this configured.
**Include in Phase 1 config** to avoid runtime errors when images are added in Phase 2.

```ts
// Source: nextjs.org/docs/app/api-reference/config/next-config-js/images (verified)
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.caterpillar.com' },
      { protocol: 'https', hostname: '**.liebherr.com' },
      { protocol: 'https', hostname: '**.volvoce.com' },
      { protocol: 'https', hostname: '**.komatsu.eu' },
    ],
  },
}
export default config
```

**Warning:** Manufacturer hotlinking policies are unknown — this is flagged as a blocker in STATE.md. For Phase 1 (no machine images in homepage), this is safe to pre-configure without triggering any policy issue.

### Anti-Patterns to Avoid
- **Importing `framer-motion` instead of `motion/react`:** Still works but `motion/react` is canonical since the rebrand. Use `motion/react`.
- **Using `tailwind.config.js` with v4:** Tailwind v4 no longer uses this file for theming. Use `@theme` in CSS instead.
- **Adding `"use client"` to layout.tsx or server pages:** Only add it to leaf components that actually use client hooks or Motion.
- **Calling fonts without `variable` option:** Without `variable: '--font-...'`, the font cannot be referenced as a CSS variable in `@theme`.
- **Using `@import url(...)` for Google Fonts in CSS:** Always use `next/font/google` — it self-hosts and avoids network requests to Google.
- **Importing `Header`/`Footer` as client components unnecessarily:** They are Server Components by default unless they need state — keep them as server components and add client sub-components only where motion is needed.
- **Dynamic params without await in Next.js 15+:** From Next.js 15, `params` is a Promise. Always `await params` in dynamic routes. (Not directly relevant to Phase 1 which has no dynamic routes, but important to know for Phase 2.)

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading & FOUT | Custom `<link>` tags for Google Fonts | `next/font/google` | Self-hosts fonts, prevents layout shift, no external requests |
| Image optimization | `<img>` tags | `next/image` | Automatic WebP, lazy loading, size hints — manufacturer images will be large |
| Animation entrance effects | CSS keyframes | `motion/react` `motion.div` | Hardware-accelerated, interruptible, consistent across phases |
| Brand color utilities | Inline `style` attributes | Tailwind `@theme` color tokens | Generates consistent utility classes, purged automatically |
| TypeScript path aliases | Relative `../../` imports | `tsconfig.json` `paths: { "@/*": ["./src/*"] }` | create-next-app sets this up — use `@/components/...` from day one |

**Key insight:** The entire font + animation + image pipeline has production-grade solutions in the stack. Hand-rolling any of these introduces performance and maintenance debt that compounds in later phases.

---

## Common Pitfalls

### Pitfall 1: Forgetting `"use client"` on Motion Components
**What goes wrong:** `motion.div` throws "You're importing a component that needs createContext" server-side error.
**Why it happens:** Framer Motion uses React context internally; contexts only work in client components.
**How to avoid:** Every component file that contains `motion.*` must have `"use client"` as its first line.
**Warning signs:** Build error mentioning `createContext` or `useState` in a Server Component.

### Pitfall 2: Tailwind v4 Config Confusion
**What goes wrong:** Developer creates `tailwind.config.js` with `theme.extend.colors` — classes are ignored.
**Why it happens:** Tailwind v4 ignores the legacy config file for theming; all tokens must be in `@theme` in CSS.
**How to avoid:** Put ALL brand tokens in `globals.css` under `@theme`. If migrating from v3, run the official upgrade tool.
**Warning signs:** Custom color classes like `text-orange` generate no CSS output.

### Pitfall 3: Barlow Condensed Missing Weight Specification
**What goes wrong:** `Barlow_Condensed()` with no `weight` throws a runtime error at startup.
**Why it happens:** Barlow Condensed is NOT a variable font — weight must be explicit.
**How to avoid:** Always pass `weight: ['700']` (or `['400', '700']` for heading + subheading variants).
**Warning signs:** `next dev` startup error: "Font is not a variable font and requires a weight".

### Pitfall 4: next/image Unconfigured Host Error
**What goes wrong:** `<Image src="https://caterpillar.com/..." />` throws Error at build/runtime.
**Why it happens:** `next/image` requires all external domains to be whitelisted in `next.config.ts`.
**How to avoid:** Pre-configure `remotePatterns` for manufacturer domains in Phase 1 even if images aren't used yet.
**Warning signs:** Console error: "hostname not configured under images.remotePatterns".

### Pitfall 5: Framer Motion Wrong Import Path
**What goes wrong:** `import { motion } from "framer-motion"` still works but causes a deprecation/routing warning.
**Why it happens:** The package was rebranded to `motion` in late 2024; the correct entrypoint is `motion/react`.
**How to avoid:** Use `import { motion } from "motion/react"` from the start.
**Warning signs:** Console warnings about deprecated imports or bundle analyzer showing duplicate motion chunks.

### Pitfall 6: Footer/Header NOT in layout.tsx
**What goes wrong:** Header and Footer are placed inside `page.tsx` — they disappear on other routes.
**Why it happens:** Misunderstanding of App Router: `layout.tsx` wraps all children, `page.tsx` is route-specific.
**How to avoid:** Import `<Header>` and `<Footer>` into `app/layout.tsx` only.
**Warning signs:** Navigation disappears when navigating to any route other than `/`.

---

## Code Examples

### globals.css — Full Brand Setup
```css
/* Source: tailwindcss.com/docs/theme — verified 2026-04-18 */
@import "tailwindcss";

@theme {
  --color-orange: #F58634;
  --color-grey-dark: #353335;
  --color-gold: #C9A84C;
  --color-white: #FFFFFF;

  --font-heading: var(--font-barlow-condensed), "Barlow Condensed", sans-serif;
  --font-body: var(--font-dm-sans), "DM Sans", sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-white);
  color: var(--color-grey-dark);
}
```

### layout.tsx — Root Layout Shell
```tsx
// Source: nextjs.org/docs/app/getting-started/fonts — verified 2026-04-15
import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Affretix — Location de matériel BTP avec chauffeur',
  description: 'Louez votre engin de chantier avec opérateur. Terrassement, transport, compactage et plus. Filiale du groupe LEVA.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### postcss.config.mjs — Tailwind v4 PostCSS
```js
// Source: tailwindcss.com/docs/guides/nextjs — verified 2026-04-18
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

### Hero Component with Motion
```tsx
// Source: staticmania.com/blog/how-to-use-framer-motion-for-animations-in-next-js
"use client"
import { motion } from "motion/react"

export function Hero() {
  return (
    <section className="bg-grey-dark text-white min-h-[80vh] flex items-center px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="font-heading text-5xl font-bold text-orange uppercase tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Location de matériel BTP<br />avec chauffeur
        </motion.h1>
        <motion.p
          className="font-body text-xl mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          67+ engins disponibles. Toujours avec opérateur qualifié.
        </motion.p>
      </div>
    </section>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` for custom tokens | `@theme` in `globals.css` | Tailwind v4 (Jan 2025) | No JS config file needed — must use CSS syntax |
| `import { motion } from "framer-motion"` | `import { motion } from "motion/react"` | Late 2024 (v11+) | Package rebranded; old import still works but `motion/react` is canonical |
| `next.config.js` | `next.config.ts` | Next.js 15 | TypeScript config file is now the default |
| `middleware.ts` | `proxy.ts` | Next.js 16 | Not relevant to Phase 1 — but document for future phases |
| `params` synchronous access | `params` as a Promise (`await params`) | Next.js 15 | Not relevant in Phase 1 (no dynamic routes on homepage) — critical for Phase 2 |

**Deprecated/outdated:**
- `@tailwind base; @tailwind components; @tailwind utilities`: Replaced by `@import "tailwindcss"` in v4
- `@next/font` package: Merged into `next/font` since Next.js 13 — never use the old package
- `autoprefixer` in postcss config: No longer needed with `@tailwindcss/postcss` in v4

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Barlow Condensed Bold is available in next/font/google with `weight: ['700']` | Standard Stack, Code Examples | Font fails to load; fallback would be used. Mitigation: verify at `fonts.google.com/specimen/Barlow+Condensed` before coding |
| A2 | Machine family slugs (terrassement, transport, etc.) are the 8 canonical families from the catalogue | Architecture Patterns — data/families.ts | Slugs may differ from final catalogue — data file should be authoritative. Low risk: easy to update |
| A3 | Framer Motion `motion/react` import path works for version 12.38.0 | Code Examples | Import path wrong — would be caught immediately at `npm run dev`. Low risk |

---

## Open Questions (RESOLVED)

1. **Next.js version: 15 or 16?**
   - What we know: Spec says "14+" which is ambiguous. npm latest is 16.2.4 with async-params breaking change. 15.5.15 is the stable maintenance line with a smoother DX.
   - What's unclear: Whether the client wants future-proofing (v16) or stability (v15).
   - Recommendation: Pin to **Next.js 15** for Phase 1. Note in PLAN that upgrading to v16 is a future task.

2. **Machine family slugs and icons**
   - What we know: There are 8 families (Terrassement, Transport, Voirie, Compactage, VRD/Réseaux, Manutention/Levage, Béton/Fondations, Démolition/Recyclage) per PROJECT.md.
   - What's unclear: What icons/images to use in the FamilyGrid for Phase 1 (no machine photos yet in homepage).
   - Recommendation: Use placeholder SVG icons or emoji-based icons in Phase 1; upgrade to proper illustrations in Phase 2.

3. **Contact form destination for HOME-04**
   - What we know: HOME-04 requires a contact CTA; FORM-01 to FORM-05 are Phase 4.
   - What's unclear: Should Phase 1 link to a stub `/contact` page or simply render a placeholder section?
   - Recommendation: Create a stub `/contact/page.tsx` that renders "Formulaire disponible bientôt" — routes to it cleanly without functional form.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js runtime | Yes | v25.6.1 | — |
| npm | Package management | Yes | 11.9.0 | — |
| Next.js (to install) | Framework | Not yet installed | 15.5.15 (to install) | — |
| Tailwind CSS (to install) | Styling | Not yet installed | 4.2.2 (to install) | — |
| Framer Motion (to install) | Animations | Not yet installed | 12.38.0 (to install) | — |
| Git | Version control | Yes (repo initialized) | — | — |

**No blocking missing dependencies** — all are installable via npm. The project is a blank repo awaiting `create-next-app`.

---

## Validation Architecture

No test framework is configured yet (blank repo). Phase 1 is a greenfield bootstrap — visual verification is the primary validation method. Formal test infrastructure (if required) would be Wave 0 for Phase 2.

**Phase 1 validation approach:**
- `npm run dev` starts without errors
- `npm run build` completes without TypeScript errors
- Manual browser check: homepage renders with correct fonts, colors, and layout at 375px, 768px, 1280px

**Wave 0 gaps (if automated tests are required):**
- [ ] No test runner installed — `npm install -D jest @testing-library/react @testing-library/jest-dom ts-jest` would be needed
- [ ] No `jest.config.ts` — would need to be created

**Recommendation for this vitrine project:** Skip automated testing in Phase 1. Framer Motion visual tests are impractical to automate. Invest test effort in form validation (Phase 4) where there is logic to verify.

---

## Security Domain

This phase has no user input, no auth, no API routes, no data submission. Security surface is minimal.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in v1 |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | All pages public |
| V5 Input Validation | No | No forms in Phase 1 |
| V6 Cryptography | No | Static site |

**Threat patterns relevant to Phase 1:**
- Dependency supply chain: Use `npm audit` after install — no known critical vulnerabilities in Next.js 15 / Tailwind 4 / Framer Motion 12 at research date [ASSUMED — verify at install time]
- External image hotlinking: Manufacturer URLs in `remotePatterns` — configure conservatively (specific hostnames, not wildcards) to avoid being a proxy for arbitrary external images

---

## Sources

### Primary (HIGH confidence)
- `nextjs.org/docs/app/getting-started/fonts` — font setup, CSS variable pattern (version 16.2.4 docs, 2026-04-15)
- `nextjs.org/docs/app/getting-started/project-structure` — folder conventions, layout hierarchy (version 16.2.4 docs, 2026-04-15)
- `nextjs.org/docs/app/api-reference/config/next-config-js/images` — remotePatterns configuration
- `tailwindcss.com/docs/guides/nextjs` — Tailwind v4 + Next.js installation steps
- `tailwindcss.com/docs/theme` — @theme directive, custom color/font tokens
- npm registry — verified versions: next@15.5.15, tailwindcss@4.2.2, framer-motion@12.38.0, typescript@5.x (2026-04-18)

### Secondary (MEDIUM confidence)
- `makerkit.dev/blog/tutorials/nextjs-16` — Next.js 16 async params breaking changes summary
- `staticmania.com/blog/how-to-use-framer-motion-for-animations-in-next-js` — motion/react import path, "use client" requirement
- `fonts.google.com/specimen/Barlow+Condensed` — Barlow Condensed font availability and style variants

### Tertiary (LOW confidence)
- Multiple community articles (Medium, DEV.to) confirming framer-motion → motion/react rebrand — consistent but not from official docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against live npm registry
- Architecture: HIGH — based on official Next.js 16.2.4 documentation (backwards compatible with v15 conventions)
- Tailwind v4 setup: HIGH — official tailwindcss.com docs
- Pitfalls: MEDIUM — mix of official docs and community-verified patterns
- Framer Motion import path: MEDIUM — verified via multiple sources, not from official motion.dev docs directly

**Research date:** 2026-04-18
**Valid until:** 2026-05-18 (30 days — all three libraries release frequently but APIs are stable within minor versions)
