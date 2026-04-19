# Roadmap: Affretix Site Vitrine

## Overview

Five phases take the project from a blank Next.js repo to a production-ready site vitrine. Phase 1 builds the foundation: design system, layout shell, and homepage. Phase 2 delivers the full catalogue with family pages and machine listings. Phase 3 completes each machine's product page with capacities, accessories, and the devis entry point. Phase 4 wires the quote form end-to-end so a visitor can submit a request and Affretix receives it by email. Phase 5 applies SEO metadata, performance optimizations, and final polish so the site ships with confidence.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Homepage** - Next.js setup, design system, global layout, homepage (completed 2026-04-18)
- [x] **Phase 2: Catalogue** - Machine families page, family listings, data layer, responsive layout, animations (completed 2026-04-18)
- [x] **Phase 3: Product Pages** - Individual machine detail pages with capacities, accessories, and devis CTA (completed 2026-04-18)
- [ ] **Phase 4: Quote Form** - Functional devis form with pre-fill, validation, and email delivery
- [ ] **Phase 5: Polish & SEO** - Metadata, Open Graph, structured data, image performance, accessibility

## Phase Details

### Phase 1: Foundation & Homepage
**Goal**: A visitor can land on the Affretix homepage and understand the offer, navigate to machine families, and reach a general contact form
**Depends on**: Nothing (first phase)
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, NAV-01, NAV-04, UX-01, UX-02
**Success Criteria** (what must be TRUE):
  1. Visitor sees a hero section that clearly communicates "location de matériel BTP avec chauffeur/opérateur"
  2. Visitor can identify and navigate to all 8 machine families from the homepage
  3. Visitor sees reassurance elements (key stats, group LEVA mention) on the homepage
  4. A footer with legal links and the groupe LEVA reference is visible on every page
  5. All text elements use Barlow Condensed for headings and DM Sans for body, with orange #F58634 and dark grey #353335 applied correctly throughout
**Plans**: 4 plans

Plans:
- [ ] 01-PLAN-01-bootstrap.md — Next.js 15 bootstrap, Tailwind v4 brand tokens, font setup
- [ ] 01-PLAN-02-layout.md — Header (8-family nav) + Footer (LEVA mention) + stub /contact page
- [ ] 01-PLAN-03-homepage.md — Hero, FamilyGrid, Reassurance, ContactCTA sections composed into homepage
- [ ] 01-PLAN-04-data.md — Complete TypeScript data layer: 8 families + 67+ machine types

**UI hint**: yes

### Phase 2: Catalogue
**Goal**: A visitor can browse all machine families and see the machines available within each family, on any device, with smooth interactions
**Depends on**: Phase 1
**Requirements**: CAT-01, CAT-02, CAT-03, CAT-04, NAV-02, UX-03, UX-04
**Success Criteria** (what must be TRUE):
  1. Visitor can open a catalogue page showing all 8 families as navigable cards
  2. Visitor can select a family and see the full list of machines in that family, each with name, capacity summary, and image
  3. Machine images display correctly using manufacturer sources (Caterpillar, Liebherr, etc.)
  4. The catalogue layout is fully usable on mobile, tablet, and desktop viewports
  5. Hover states on machine cards are visually expressive and transitions between pages feel smooth (Framer Motion)
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md — Unsplash remotePattern + imageUrls in machines.ts + /catalogue index page + FamilyCard component
- [x] 02-02-PLAN.md — /catalogue/[slug] family pages with generateStaticParams + MachineCard + FamilyHero
- [x] 02-03-PLAN.md — Framer Motion stagger animations (FamilyGrid, MachineGrid) + human-verify checkpoint

**UI hint**: yes

### Phase 3: Product Pages
**Goal**: A visitor can read a complete machine detail page showing all capacities, accessories, and the "avec chauffeur" positioning, and reach the devis form from there
**Depends on**: Phase 2
**Requirements**: PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06
**Success Criteria** (what must be TRUE):
  1. Each machine has a dedicated URL with its name, family, and full description visible
  2. Visitor can see all available tonnages / size variants for that machine
  3. Visitor can see available accessories (BRH, godets, etc.) where applicable
  4. A clear label or badge indicates the service is always provided avec chauffeur/opérateur
  5. A prominent "Demander un devis" call-to-action is reachable from the product page
**Plans**: 2 plans

Plans:
- [x] 03-01-PLAN.md — SSG route /catalogue/[slug]/[machineSlug] + all PROD-01..06 content in server component
- [x] 03-02-PLAN.md — motion/react entrance animations via MachineDetailAnimated client wrapper

**UI hint**: yes

### Phase 4: Quote Form
**Goal**: A visitor can submit a complete devis request from a product page and receive visual confirmation, while Affretix receives the request by email
**Depends on**: Phase 3
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05
**Success Criteria** (what must be TRUE):
  1. Visitor can fill in their contact details (name, company, phone, email) in the form
  2. The machine type field is pre-filled when the form is opened from a product page
  3. Visitor can describe their need: duration, job-site location, work description
  4. After submission, visitor sees a clear success confirmation on screen
  5. Affretix receives the form data by email via the configured third-party service (Resend or Formspree)
**Plans**: 2 plans

Plans:
- [x] 04-01-PLAN.md — DevisForm client component (all fields, useSearchParams pre-fill, validation, animated success panel) + contact page update
- [ ] 04-02-PLAN.md — Resend API route + wire DevisForm fetch call + .env.local.example

**UI hint**: yes

### Phase 5: Polish & SEO
**Goal**: Every page is discoverable by search engines, loads fast, and meets baseline accessibility standards
**Depends on**: Phase 4
**Requirements**: NAV-03, UX-05
**Success Criteria** (what must be TRUE):
  1. Every page (homepage, catalogue, family pages, product pages) has a unique title, meta description, and og:image
  2. Product pages include structured data (JSON-LD) that search engines can parse
  3. All machine images use next/image with appropriate sizes, formats, and lazy-loading so Lighthouse performance score is 90+
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Homepage | 4/4 | Complete    | 2026-04-18 |
| 2. Catalogue | 3/3 | Complete    | 2026-04-18 |
| 3. Product Pages | 2/2 | Complete    | 2026-04-18 |
| 4. Quote Form | 1/2 | In Progress|  |
| 5. Polish & SEO | 0/TBD | Not started | - |
