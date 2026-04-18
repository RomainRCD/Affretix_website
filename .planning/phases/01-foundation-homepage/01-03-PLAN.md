---
phase: 01-foundation-homepage
plan: 03
type: execute
wave: 3
depends_on:
  - 01-PLAN-01-bootstrap
  - 01-PLAN-02-layout
files_modified:
  - src/app/page.tsx
  - src/components/home/Hero.tsx
  - src/components/home/FamilyGrid.tsx
  - src/components/home/Reassurance.tsx
  - src/components/home/ContactCTA.tsx
  - src/components/ui/Button.tsx
autonomous: true
requirements:
  - HOME-01
  - HOME-02
  - HOME-03
  - HOME-04

must_haves:
  truths:
    - "Visitor sees a hero section with the headline 'Location de matériel BTP avec chauffeur' in Barlow Condensed on a dark background"
    - "Hero section includes the subtext establishing the operator/chauffeur positioning"
    - "Visitor can see all 8 machine family cards on the homepage, each linking to /catalogue/[slug]"
    - "A reassurance section shows at minimum 3 key stats (machines count, operator positioning, LEVA group)"
    - "A contact CTA section with a prominent button links to /contact"
    - "All motion entrance animations use 'use client' components — no Server Component runtime errors"
  artifacts:
    - path: "src/components/home/Hero.tsx"
      provides: "Full-width hero with headline, subtext, CTA button, motion entrance animation"
      exports: ["Hero"]
    - path: "src/components/home/FamilyGrid.tsx"
      provides: "8-card grid of machine families with name, description, and link"
      exports: ["FamilyGrid"]
    - path: "src/components/home/Reassurance.tsx"
      provides: "Stats row with 3+ reassurance items"
      exports: ["Reassurance"]
    - path: "src/components/home/ContactCTA.tsx"
      provides: "CTA section with button to /contact"
      exports: ["ContactCTA"]
    - path: "src/components/ui/Button.tsx"
      provides: "Reusable orange CTA button component"
      exports: ["Button"]
    - path: "src/app/page.tsx"
      provides: "Homepage composing all four sections in order"
      contains: "Hero"
  key_links:
    - from: "src/components/home/FamilyGrid.tsx"
      to: "src/data/families.ts"
      via: "importing machineFamilies to render family cards"
      pattern: "machineFamilies"
    - from: "src/app/page.tsx"
      to: "src/components/home/Hero.tsx"
      via: "import and render in homepage"
      pattern: "import.*Hero"
---

<objective>
Build all four homepage sections — Hero, FamilyGrid, Reassurance, ContactCTA — and compose them into the homepage. This delivers HOME-01 (value proposition), HOME-02 (8 families), HOME-03 (stats/reassurance), and HOME-04 (contact CTA) in a single plan.

Purpose: After this plan, a visitor landing on `/` sees the full above-the-fold and homepage scroll experience: the Affretix value proposition, all 8 machine families as entry points to the catalogue, key trust indicators, and a clear path to request a quote.

Output: Four section components + a reusable Button + `page.tsx` composing them. Motion entrance animations on Hero (fade-in, slide-up). Static rendering everywhere else.
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
@.planning/phases/01-foundation-homepage/01-02-SUMMARY.md

<interfaces>
<!-- Confirmed exports from Plan 02 data layer -->
From src/data/families.ts:
```typescript
export type MachineFamily = {
  slug: string
  name: string
  description: string
  icon: string
  machineCount: number
}

export const machineFamilies: MachineFamily[]  // 8 entries
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create reusable Button and Hero components</name>
  <files>src/components/ui/Button.tsx, src/components/home/Hero.tsx</files>

  <read_first>
    - .planning/phases/01-foundation-homepage/01-RESEARCH.md — Pattern 3 (Framer Motion in App Router), Code Examples (Hero Component with Motion), Pitfall 1 (Forgetting "use client"), Anti-Patterns ("use client" only on leaf components that use motion)
    - src/app/globals.css — confirm token names: color-orange, color-grey-dark, font-heading, font-body
  </read_first>

  <action>
**Step 1: Create reusable Button component**

Button is a simple interactive component — it needs `"use client"` only if it uses hooks or events. Since it renders an anchor/link, it can stay as a Server Component.

```tsx
// src/components/ui/Button.tsx
import Link from 'next/link'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const base = 'inline-block font-body font-semibold px-6 py-3 transition-colors text-sm uppercase tracking-wide'
  const variants = {
    primary: 'bg-orange text-white hover:bg-orange/90',
    secondary: 'bg-transparent text-orange border border-orange hover:bg-orange hover:text-white',
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
```

**Step 2: Create Hero component**

Hero uses `motion/react` — must have `"use client"`. Implement the Framer Motion entrance animation pattern from research.

```tsx
// src/components/home/Hero.tsx
"use client"
import { motion } from "motion/react"
import { Button } from "@/components/ui/Button"

export function Hero() {
  return (
    <section className="relative bg-grey-dark text-white overflow-hidden">
      {/* Background texture / gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-grey-dark via-grey-dark to-black/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        {/* Operator badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-orange/10 border border-orange/30 px-3 py-1 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="w-2 h-2 rounded-full bg-orange block" />
          <span className="font-body text-xs text-orange uppercase tracking-widest font-semibold">
            Toujours avec opérateur qualifié
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight tracking-wide mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Location de matériel BTP
          <br />
          <span className="text-orange">avec chauffeur</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-body text-lg sm:text-xl text-white/75 max-w-2xl mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          67 types d&apos;engins disponibles. Terrassement, transport, levage, compactage et plus.
          Filiale du groupe LEVA — présents sur toute la région.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Button href="/contact" variant="primary">
            Demander un devis
          </Button>
          <Button href="/catalogue" variant="secondary">
            Voir le catalogue
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
```
  </action>

  <verify>
    <automated>cd /Users/romainrichard/PycharmProjects/Affretix_website && npx tsc --noEmit 2>&1 | grep -E "Hero|Button|error" | head -20</automated>
  </verify>

  <acceptance_criteria>
    - `src/components/ui/Button.tsx` exports `Button` component
    - `src/components/ui/Button.tsx` does NOT contain `"use client"` (no hooks needed)
    - `src/components/home/Hero.tsx` has `"use client"` as its first line
    - `src/components/home/Hero.tsx` imports `{ motion }` from `"motion/react"` (NOT `"framer-motion"`)
    - `src/components/home/Hero.tsx` contains the text "Location de matériel BTP" in the JSX
    - `src/components/home/Hero.tsx` contains "avec chauffeur" or "opérateur" text
    - `src/components/home/Hero.tsx` uses `font-heading` class on the h1
    - `src/components/home/Hero.tsx` uses `text-orange` on the accent span
    - `npx tsc --noEmit` shows 0 errors for these files
  </acceptance_criteria>

  <done>Button (Server Component) and Hero (Client Component with motion) created. Hero communicates "location BTP avec chauffeur" with Barlow Condensed heading in orange.</done>
</task>

<task type="auto">
  <name>Task 2: Create FamilyGrid, Reassurance, ContactCTA sections and compose homepage</name>
  <files>
    src/components/home/FamilyGrid.tsx,
    src/components/home/Reassurance.tsx,
    src/components/home/ContactCTA.tsx,
    src/app/page.tsx
  </files>

  <read_first>
    - src/data/families.ts (read to confirm exact exports and shape)
    - src/components/home/Hero.tsx (confirm it exists and is importable)
    - .planning/phases/01-foundation-homepage/01-RESEARCH.md — Architecture Patterns, Anti-Patterns (do NOT add "use client" to server pages)
  </read_first>

  <action>
**Step 1: FamilyGrid — 8 family cards**

FamilyGrid is a Server Component (static data, no animations required at homepage level — hover states via CSS Tailwind transitions are sufficient).

```tsx
// src/components/home/FamilyGrid.tsx
import Link from 'next/link'
import { machineFamilies } from '@/data/families'

export function FamilyGrid() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-grey-dark uppercase tracking-wide mb-3">
            Nos familles de machines
          </h2>
          <p className="font-body text-lg text-grey-dark/60 max-w-xl mx-auto">
            67 types d&apos;engins répartis en 8 familles. Toujours avec opérateur qualifié.
          </p>
        </div>

        {/* 8-card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {machineFamilies.map((family) => (
            <Link
              key={family.slug}
              href={`/catalogue/${family.slug}`}
              className="group flex flex-col items-center text-center p-6 border border-grey-dark/10 hover:border-orange hover:bg-orange/5 transition-all duration-200"
            >
              {/* Icon */}
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200 block">
                {family.icon}
              </span>

              {/* Family name */}
              <h3 className="font-heading text-base font-bold text-grey-dark uppercase tracking-wide group-hover:text-orange transition-colors mb-1">
                {family.name}
              </h3>

              {/* Machine count */}
              <p className="font-body text-xs text-grey-dark/50 group-hover:text-grey-dark/70 transition-colors">
                {family.machineCount} types d&apos;engins
              </p>
            </Link>
          ))}
        </div>

        {/* Catalogue link */}
        <div className="text-center mt-10">
          <Link
            href="/catalogue"
            className="font-body text-sm text-orange hover:text-orange/70 font-semibold transition-colors"
          >
            Voir tout le catalogue →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Reassurance — key stats (HOME-03)**

Three stat items: machines count, operator positioning, groupe LEVA. Static Server Component.

```tsx
// src/components/home/Reassurance.tsx
const stats = [
  {
    value: '67+',
    label: 'Types d\'engins',
    description: 'Terrassement, levage, compactage, voirie et plus',
  },
  {
    value: '100%',
    label: 'Avec opérateur',
    description: 'Chaque machine est livrée avec un chauffeur qualifié',
  },
  {
    value: 'Groupe LEVA',
    label: 'Votre garant',
    description: 'Filiale d\'un groupe régional reconnu dans le BTP',
  },
]

export function Reassurance() {
  return (
    <section className="bg-grey-dark py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="font-heading text-5xl font-bold text-orange mb-1 uppercase">
                {stat.value}
              </p>
              <p className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 3: ContactCTA — general contact entry point (HOME-04)**

```tsx
// src/components/home/ContactCTA.tsx
import { Button } from '@/components/ui/Button'

export function ContactCTA() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading text-4xl font-bold text-grey-dark uppercase tracking-wide mb-4">
          Un projet ? Parlons-en.
        </h2>
        <p className="font-body text-lg text-grey-dark/60 mb-8 leading-relaxed">
          Décrivez votre besoin et recevez un devis personnalisé sous 24h. Toutes nos prestations incluent un opérateur qualifié.
        </p>
        <Button href="/contact" variant="primary" className="text-base px-8 py-4">
          Demander un devis gratuit
        </Button>
      </div>
    </section>
  )
}
```

**Step 4: Compose homepage page.tsx**

`page.tsx` is a Server Component — do NOT add `"use client"`. It only imports and renders the four sections.

```tsx
// src/app/page.tsx
import { Hero } from '@/components/home/Hero'
import { FamilyGrid } from '@/components/home/FamilyGrid'
import { Reassurance } from '@/components/home/Reassurance'
import { ContactCTA } from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FamilyGrid />
      <Reassurance />
      <ContactCTA />
    </>
  )
}
```
  </action>

  <verify>
    <automated>cd /Users/romainrichard/PycharmProjects/Affretix_website && npm run build 2>&1 | tail -30</automated>
  </verify>

  <acceptance_criteria>
    - `src/components/home/FamilyGrid.tsx` exports `FamilyGrid`
    - `src/components/home/FamilyGrid.tsx` imports `machineFamilies` from `@/data/families`
    - `src/components/home/FamilyGrid.tsx` renders cards via `machineFamilies.map`
    - `src/components/home/FamilyGrid.tsx` each card links to `/catalogue/[family.slug]`
    - `src/components/home/FamilyGrid.tsx` does NOT contain `"use client"`
    - `src/components/home/Reassurance.tsx` exports `Reassurance`
    - `src/components/home/Reassurance.tsx` contains "67+" or machine count stat
    - `src/components/home/Reassurance.tsx` contains "opérateur" or "chauffeur" in stats
    - `src/components/home/Reassurance.tsx` contains "Groupe LEVA" or "LEVA" in stats
    - `src/components/home/Reassurance.tsx` does NOT contain `"use client"`
    - `src/components/home/ContactCTA.tsx` exports `ContactCTA`
    - `src/components/home/ContactCTA.tsx` contains a link to `/contact`
    - `src/app/page.tsx` imports and renders `Hero`, `FamilyGrid`, `Reassurance`, `ContactCTA`
    - `src/app/page.tsx` does NOT contain `"use client"`
    - `npm run build` exits 0
  </acceptance_criteria>

  <done>All four homepage sections built and composed into page.tsx. Build passes. Homepage renders Hero → FamilyGrid → Reassurance → ContactCTA in correct sequence.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    Complete homepage with 4 sections:
    1. Hero — dark background, Barlow Condensed headline "Location de matériel BTP / avec chauffeur" in orange, subtitle with 67+ engins, two CTA buttons
    2. FamilyGrid — 8 machine family cards in a 4-column desktop grid, each linking to /catalogue/[slug]
    3. Reassurance — dark background stats row with 67+ machines, 100% avec opérateur, Groupe LEVA
    4. ContactCTA — white background, centered CTA button to /contact
    Header and Footer visible on all pages (from Plan 02).
  </what-built>
  <how-to-verify>
    1. Run `npm run dev` and open http://localhost:3000
    2. Verify header shows "Affretix" and the 8-family nav row is visible on desktop
    3. Scroll the homepage — confirm all 4 sections appear in order
    4. Check that Hero headline uses large Barlow Condensed font with "avec chauffeur" in orange
    5. Check that FamilyGrid shows exactly 8 cards (Terrassement, Transport chantier, Voirie, Compactage, VRD / Réseaux, Manutention / Levage, Béton / Fondations, Démolition / Recyclage)
    6. Check that Reassurance section has "67+" stat and "100%" stat
    7. Click "Demander un devis" CTA — should navigate to /contact stub page
    8. Verify Footer shows "Groupe LEVA" in golden color
    9. Resize to 375px width — check that layout does not break (cards stack to 2 columns, nav collapses)
  </how-to-verify>
  <resume-signal>Type "approved" to continue, or describe any visual issues to fix</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Client browser | Motion animations execute client-side; no user input collected in this phase |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-03-01 | Information Disclosure | Hero client component | accept | No sensitive data rendered in Hero; motion state is purely cosmetic |
| T-03-02 | Denial of Service | Motion animation on low-end devices | accept | Framer Motion uses hardware-accelerated transforms (opacity, y) — minimal CPU impact; `prefers-reduced-motion` media query honored automatically by motion/react |
</threat_model>

<verification>
```bash
npm run build   # must exit 0
npm run dev     # must start without errors
```

Structural grep checks:
```bash
grep -n '"use client"' src/components/home/Hero.tsx       # must return line 1
grep -n '"use client"' src/app/page.tsx                   # must return nothing
grep -n 'machineFamilies.map' src/components/home/FamilyGrid.tsx  # must return a result
grep -n 'motion/react' src/components/home/Hero.tsx       # must return import line
grep -c 'href.*catalogue' src/components/home/FamilyGrid.tsx  # must return >= 1
```

Manual viewport checks via browser:
- Desktop (1280px): 4-column FamilyGrid, desktop nav with 8 families in header
- Mobile (375px): 2-column FamilyGrid, mobile nav with Catalogue + Devis links
</verification>

<success_criteria>
- Homepage (`/`) renders all 4 sections without JavaScript errors
- Hero section contains "Location de matériel BTP" and "avec chauffeur" text
- Hero section has motion entrance animation (requires "use client" in Hero.tsx)
- FamilyGrid renders exactly 8 cards matching the 8 machine families from data
- Reassurance section shows at least 3 stats including machine count and opérateur mention
- ContactCTA links to /contact
- Build exits 0
- No `"use client"` on page.tsx, FamilyGrid.tsx, Reassurance.tsx, ContactCTA.tsx
- Hero.tsx has `"use client"` as first line and imports from `"motion/react"`
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-homepage/01-03-SUMMARY.md` with:
- What was built (4 homepage sections, Button component)
- Component decisions (which are Server vs Client Components and why)
- Files created/modified
- Verification results including human-verify outcome
</output>
