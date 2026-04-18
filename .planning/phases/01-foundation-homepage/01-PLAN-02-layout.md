---
phase: 01-foundation-homepage
plan: 02
type: execute
wave: 2
depends_on:
  - 01-PLAN-01-bootstrap
files_modified:
  - src/app/layout.tsx
  - src/components/layout/Header.tsx
  - src/components/layout/Footer.tsx
  - src/app/contact/page.tsx
autonomous: true
requirements:
  - NAV-01
  - NAV-04
  - HOME-05

must_haves:
  truths:
    - "Header is visible on every page with the Affretix logo/brand name and navigation links to all 8 machine families"
    - "Footer is visible on every page with the groupe LEVA mention in gold #C9A84C"
    - "Footer contains legal information (mentions légales, copyright)"
    - "A stub /contact page exists and is reachable from the site"
    - "Header and Footer are Server Components (no unnecessary 'use client')"
  artifacts:
    - path: "src/components/layout/Header.tsx"
      provides: "Site-wide header with 8-family navigation links"
      exports: ["Header"]
    - path: "src/components/layout/Footer.tsx"
      provides: "Site-wide footer with groupe LEVA mention in gold"
      exports: ["Footer"]
    - path: "src/app/layout.tsx"
      provides: "Root layout wiring Header and Footer around page content"
      contains: "Header"
    - path: "src/app/contact/page.tsx"
      provides: "Stub contact page for HOME-04 CTA target"
      contains: "contact"
  key_links:
    - from: "src/app/layout.tsx"
      to: "src/components/layout/Header.tsx"
      via: "import and render in root layout body"
      pattern: "import.*Header"
    - from: "src/app/layout.tsx"
      to: "src/components/layout/Footer.tsx"
      via: "import and render in root layout body"
      pattern: "import.*Footer"
    - from: "src/components/layout/Header.tsx"
      to: "src/data/families.ts"
      via: "importing machineFamilies array to generate nav links"
      pattern: "machineFamilies"
---

<objective>
Build the persistent shell: a Header with all 8 machine family navigation links and a Footer with the groupe LEVA mention. Wire them into `layout.tsx` so they appear on every page.

Purpose: NAV-01 requires visitors to reach all 8 families from the main menu. NAV-04 requires a footer with legal info and the LEVA link. HOME-05 requires the LEVA mention to be visible. This plan delivers all three as persistent site chrome.

Output: `Header.tsx`, `Footer.tsx`, updated `layout.tsx`, stub `/contact` page. A visitor landing on any route sees the header nav and footer from this point forward.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-foundation-homepage/01-RESEARCH.md
@.planning/phases/01-foundation-homepage/01-01-SUMMARY.md

<interfaces>
<!-- Key types from the data layer — executor uses these directly -->
<!-- Note: src/data/families.ts is created in Plan 04. Header must IMPORT from it. -->
<!-- If Plan 04 has not yet run, create a MINIMAL families.ts inline in this plan -->
<!-- so the Header compiles. Plan 04 will replace it with the full data. -->

Minimum viable families.ts shape for Header compilation:
```typescript
// src/data/families.ts
export type MachineFamily = {
  slug: string
  name: string
  description: string
  icon: string
  machineCount: number
}

export const machineFamilies: MachineFamily[] = [
  { slug: 'terrassement', name: 'Terrassement', description: '', icon: '', machineCount: 0 },
  { slug: 'transport-chantier', name: 'Transport chantier', description: '', icon: '', machineCount: 0 },
  { slug: 'voirie', name: 'Voirie', description: '', icon: '', machineCount: 0 },
  { slug: 'compactage', name: 'Compactage', description: '', icon: '', machineCount: 0 },
  { slug: 'vrd-reseaux', name: 'VRD / Réseaux', description: '', icon: '', machineCount: 0 },
  { slug: 'manutention-levage', name: 'Manutention / Levage', description: '', icon: '', machineCount: 0 },
  { slug: 'beton-fondations', name: 'Béton / Fondations', description: '', icon: '', machineCount: 0 },
  { slug: 'demolition-recyclage', name: 'Démolition / Recyclage', description: '', icon: '', machineCount: 0 },
]
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Header and Footer components</name>
  <files>
    src/data/families.ts,
    src/components/layout/Header.tsx,
    src/components/layout/Footer.tsx
  </files>

  <read_first>
    - .planning/phases/01-foundation-homepage/01-RESEARCH.md — Anti-Patterns section (Header/Footer NOT in layout.tsx, importing Header as client component unnecessarily), Architecture Patterns (project structure)
    - src/app/globals.css — to confirm exact token names available (text-orange, text-gold, bg-grey-dark, font-heading, font-body)
  </read_first>

  <action>
**Step 1: Create the data file** (if it does not already exist from Plan 04)

Create `src/data/families.ts` with the 8 machine families. If Plan 04 already created a richer version, skip this step.

```ts
// src/data/families.ts
export type MachineFamily = {
  slug: string
  name: string
  description: string
  icon: string
  machineCount: number
}

export const machineFamilies: MachineFamily[] = [
  {
    slug: 'terrassement',
    name: 'Terrassement',
    description: 'Pelles, mini-pelles, bulldozers et scrapers pour tous vos travaux de terrassement.',
    icon: '🏗️',
    machineCount: 12,
  },
  {
    slug: 'transport-chantier',
    name: 'Transport chantier',
    description: 'Tombereaux articulés et rigides pour le transport de matériaux sur chantier.',
    icon: '🚛',
    machineCount: 8,
  },
  {
    slug: 'voirie',
    name: 'Voirie',
    description: 'Finisseurs, fraiseuses et équipements pour la réfection et la construction de voirie.',
    icon: '🛣️',
    machineCount: 7,
  },
  {
    slug: 'compactage',
    name: 'Compactage',
    description: 'Compacteurs à rouleaux vibrants et compacteurs à pieds dameurs.',
    icon: '🔄',
    machineCount: 9,
  },
  {
    slug: 'vrd-reseaux',
    name: 'VRD / Réseaux',
    description: 'Engins spécialisés pour les travaux de voirie, réseaux divers et canalisations.',
    icon: '🔧',
    machineCount: 10,
  },
  {
    slug: 'manutention-levage',
    name: 'Manutention / Levage',
    description: 'Grues, nacelles, chariots télescopiques et équipements de levage.',
    icon: '🏛️',
    machineCount: 11,
  },
  {
    slug: 'beton-fondations',
    name: 'Béton / Fondations',
    description: 'Pompes à béton, malaxeurs, foreuses et engins de fondations spéciales.',
    icon: '⚙️',
    machineCount: 6,
  },
  {
    slug: 'demolition-recyclage',
    name: 'Démolition / Recyclage',
    description: 'Concasseurs, cribles, pinces et équipements de démolition et valorisation.',
    icon: '♻️',
    machineCount: 8,
  },
]
```

**Step 2: Create Header.tsx**

Header is a Server Component (no animations in the header itself — navigation uses standard Next.js `<Link>`).

```tsx
// src/components/layout/Header.tsx
import Link from 'next/link'
import { machineFamilies } from '@/data/families'

export function Header() {
  return (
    <header className="bg-grey-dark text-white">
      {/* Top bar: brand + CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-heading text-2xl font-bold text-orange uppercase tracking-widest">
          Affretix
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/catalogue"
            className="font-body text-sm text-white/80 hover:text-orange transition-colors"
          >
            Catalogue
          </Link>
          <Link
            href="/contact"
            className="font-body text-sm bg-orange text-white px-4 py-2 font-semibold hover:bg-orange/90 transition-colors"
          >
            Demander un devis
          </Link>
        </nav>
        {/* Mobile: just show "Catalogue" link for now — mobile nav expansion is Phase 2 */}
        <nav className="lg:hidden flex items-center gap-4">
          <Link href="/catalogue" className="font-body text-sm text-white/80 hover:text-orange transition-colors">
            Catalogue
          </Link>
          <Link href="/contact" className="font-body text-sm bg-orange text-white px-3 py-1.5 text-xs font-semibold">
            Devis
          </Link>
        </nav>
      </div>

      {/* Family nav bar — desktop only, all 8 families */}
      <nav className="hidden lg:block border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 overflow-x-auto">
            {machineFamilies.map((family) => (
              <li key={family.slug}>
                <Link
                  href={`/catalogue/${family.slug}`}
                  className="font-body text-xs text-white/70 hover:text-orange px-3 py-3 block whitespace-nowrap transition-colors"
                >
                  {family.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
```

**Step 3: Create Footer.tsx**

Footer is a Server Component. The groupe LEVA mention uses the gold color token.

```tsx
// src/components/layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-grey-dark text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand column */}
          <div>
            <p className="font-heading text-xl font-bold text-orange uppercase tracking-widest mb-2">
              Affretix
            </p>
            <p className="font-body text-sm leading-relaxed">
              Location de matériel BTP avec chauffeur. Toutes nos prestations sont réalisées avec un opérateur qualifié.
            </p>
            <p className="font-body text-sm mt-3">
              Une filiale du{' '}
              <a
                href="https://www.groupe-leva.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 font-semibold transition-colors"
              >
                Groupe LEVA
              </a>
            </p>
          </div>

          {/* Catalogue links */}
          <div>
            <p className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Catalogue
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogue/terrassement" className="font-body text-sm hover:text-orange transition-colors">
                  Terrassement
                </Link>
              </li>
              <li>
                <Link href="/catalogue/transport-chantier" className="font-body text-sm hover:text-orange transition-colors">
                  Transport chantier
                </Link>
              </li>
              <li>
                <Link href="/catalogue/manutention-levage" className="font-body text-sm hover:text-orange transition-colors">
                  Manutention / Levage
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="font-body text-sm text-orange hover:text-orange/80 transition-colors">
                  Voir tout le catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + legal */}
          <div>
            <p className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="font-body text-sm hover:text-orange transition-colors">
                  Demander un devis
                </Link>
              </li>
            </ul>
            <div className="mt-6 space-y-1">
              <Link href="/mentions-legales" className="font-body text-xs block hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="font-body text-xs block hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs">
            &copy; {currentYear} Affretix. Tous droits réservés.
          </p>
          <p className="font-body text-xs">
            Filiale du{' '}
            <span className="text-gold font-semibold">Groupe LEVA</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
```
  </action>

  <verify>
    <automated>cd /Users/romainrichard/PycharmProjects/Affretix_website && npx tsc --noEmit 2>&1 | head -30</automated>
  </verify>

  <acceptance_criteria>
    - `src/data/families.ts` exists and exports `machineFamilies` array with exactly 8 entries
    - `src/data/families.ts` contains all 8 slugs: terrassement, transport-chantier, voirie, compactage, vrd-reseaux, manutention-levage, beton-fondations, demolition-recyclage
    - `src/components/layout/Header.tsx` exports `Header` function
    - `src/components/layout/Header.tsx` imports `machineFamilies` from `@/data/families`
    - `src/components/layout/Header.tsx` renders all 8 family nav links via `machineFamilies.map`
    - `src/components/layout/Header.tsx` does NOT contain `"use client"` (Server Component)
    - `src/components/layout/Footer.tsx` exports `Footer` function
    - `src/components/layout/Footer.tsx` contains `text-gold` class (groupe LEVA mention)
    - `src/components/layout/Footer.tsx` contains `groupe-leva.fr` or `Groupe LEVA` text
    - `src/components/layout/Footer.tsx` does NOT contain `"use client"` (Server Component)
    - `npx tsc --noEmit` exits 0
  </acceptance_criteria>

  <done>Header and Footer Server Components created. Header renders 8 family nav links from data. Footer renders LEVA mention in gold. TypeScript compiles clean.</done>
</task>

<task type="auto">
  <name>Task 2: Wire Header/Footer into layout.tsx and create stub /contact page</name>
  <files>src/app/layout.tsx, src/app/contact/page.tsx</files>

  <read_first>
    - src/app/layout.tsx (read current state — has font setup from Plan 01, no Header/Footer yet)
    - .planning/phases/01-foundation-homepage/01-RESEARCH.md — Pitfall 6 (Footer/Header NOT in layout.tsx), Open Questions #3 (contact stub approach)
  </read_first>

  <action>
**Step 1: Update layout.tsx to include Header and Footer**

Read the current `src/app/layout.tsx` first. It has the font setup from Plan 01. Add Header/Footer imports and wiring:

```tsx
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
  description: 'Louez votre engin de chantier avec opérateur qualifié. 67+ engins : terrassement, transport, compactage et plus. Filiale du groupe LEVA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

The `flex flex-col min-h-screen` on body + `flex-1` on main ensures the footer always sits at the bottom even on short pages.

**Step 2: Create stub /contact page**

HOME-04 requires a contact CTA that is reachable. The form itself is Phase 4. Create a stub page that confirms the route works:

```tsx
// src/app/contact/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Demander un devis — Affretix',
  description: 'Contactez Affretix pour une demande de devis de location de matériel BTP avec chauffeur.',
}

export default function ContactPage() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-heading text-4xl font-bold text-grey-dark uppercase tracking-wide mb-4">
          Demander un devis
        </h1>
        <p className="font-body text-lg text-grey-dark/70 mb-8">
          Notre formulaire de contact est en cours de déploiement. Pour toute demande urgente, contactez-nous directement.
        </p>
        <Link
          href="/"
          className="inline-block font-body text-sm bg-orange text-white px-6 py-3 font-semibold hover:bg-orange/90 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  )
}
```
  </action>

  <verify>
    <automated>cd /Users/romainrichard/PycharmProjects/Affretix_website && npm run build 2>&1 | tail -20</automated>
  </verify>

  <acceptance_criteria>
    - `src/app/layout.tsx` imports `Header` from `@/components/layout/Header`
    - `src/app/layout.tsx` imports `Footer` from `@/components/layout/Footer`
    - `src/app/layout.tsx` renders `<Header />` before `<main>` and `<Footer />` after `<main>`
    - `src/app/layout.tsx` has `flex flex-col min-h-screen` on `<body>`
    - `src/app/contact/page.tsx` exists with an exported default React component
    - `src/app/contact/page.tsx` exports `metadata` with `title` containing "Affretix"
    - `npm run build` exits 0
  </acceptance_criteria>

  <done>layout.tsx wires Header/Footer. Stub /contact page created and reachable. Build passes.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| External link (Groupe LEVA) | Footer links to groupe-leva.fr — external site |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-02-01 | Information Disclosure | Footer external link to groupe-leva.fr | mitigate | Use `rel="noopener noreferrer"` on all external links to prevent tab-nabbing and referrer leakage — already included in Footer.tsx code above |
| T-02-02 | Tampering | Server Component data (families.ts) | accept | families.ts is a static TypeScript file compiled at build time — no runtime mutation surface |
</threat_model>

<verification>
After both tasks complete:

```bash
npm run build  # must exit 0
npm run dev    # must start without errors
```

Manual browser check at http://localhost:3000:
- Header visible with "Affretix" brand name and 8 family links in the nav bar (desktop)
- Footer visible with "Groupe LEVA" in gold
- Navigate to http://localhost:3000/contact — stub contact page renders with H1 and return link

Grep checks:
```bash
grep -n "machineFamilies.map" src/components/layout/Header.tsx     # nav loop present
grep -n "text-gold" src/components/layout/Footer.tsx               # LEVA gold styling
grep -n "groupe-leva.fr" src/components/layout/Footer.tsx          # external LEVA link
grep -n "Header" src/app/layout.tsx                                # Header wired in layout
grep -n "Footer" src/app/layout.tsx                                # Footer wired in layout
```
</verification>

<success_criteria>
- Header renders all 8 machine family nav links (from machineFamilies data)
- Footer displays groupe LEVA mention with `text-gold` class
- Footer contains external link to groupe-leva.fr with `rel="noopener noreferrer"`
- Footer contains "mentions légales" and "politique de confidentialité" links
- `/contact` route resolves to stub page
- Both Header and Footer are Server Components (no `"use client"`)
- Build passes with 0 TypeScript errors
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-homepage/01-02-SUMMARY.md` with:
- What was built (Header, Footer, data file, contact stub)
- Component structure decisions
- Files created/modified
- Verification results
</output>
