# Affretix — Site Vitrine

## What This Is

Site vitrine pour Affretix, filiale du groupe LEVA, spécialisée dans la location de matériel de chantier BTP **avec chauffeur/opérateur**. Le site permet aux entreprises BTP, TP et manutention de parcourir un catalogue de 67+ types d'engins répartis en 8 familles, de consulter les fiches produits avec options/capacités, et de soumettre une demande de devis directement depuis chaque fiche.

## Core Value

Un professionnel BTP doit pouvoir trouver la bonne machine, avec les bonnes capacités, et envoyer une demande de devis en moins de 3 clics.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Navigation par les 8 familles de machines (Terrassement, Transport, Voirie, Compactage, VRD/Réseaux, Manutention/Levage, Béton/Fondations, Démolition/Recyclage)
- [ ] Page catalogue par famille avec liste des machines
- [ ] Fiche produit avec options/capacités disponibles (tonnages, variantes)
- [ ] Formulaire de demande de devis sur chaque fiche produit
- [ ] Page d'accueil vitrine avec proposition de valeur Affretix
- [ ] Design fidèle à la charte graphique officielle (orange #F58634, gris foncé #353335, typographie Barlow/DM Sans)
- [ ] Site responsive (mobile, tablette, desktop)
- [ ] Animations fluides (transitions, hover, scroll)
- [ ] Photos des engins issues des fabricants (Caterpillar, Liebherr, etc.)
- [ ] Mention groupe LEVA

### Out of Scope

- Espace client / authentification — non demandé en v1
- CMS / back-office éditable — contenu géré en code
- Tarifs publics — tout sur devis
- Multilingue — français uniquement en v1
- E-commerce / paiement en ligne — hors périmètre
- Blog / actualités — hors v1

## Context

- Catalogue produits : 8 familles, 67 types de machines, 152+ références détaillées
- Toutes les locations sont **avec opérateur** uniquement — c'est le positionnement différenciant
- Photos : images fabricants (URLs Caterpillar/Liebherr disponibles dans le catalogue Excel)
- Formulaire de devis : champs à préciser (phase ultérieure), collecte des infos entreprise + besoin
- Filiale du groupe LEVA — lien à valoriser (couleur or #C9A84C)

## Constraints

- **Tech Stack** : Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion
- **No CMS** : Contenu géré via fichiers TypeScript/JSON dans le codebase
- **No Backend** : Site statique, formulaire via service tiers (Resend, Formspree, ou similaire)
- **Charte graphique** : Strictement respectée (palette, typographies Astrotec/Barlow Condensed/DM Sans)
- **Performance** : Images optimisées (next/image), génération statique (SSG/ISR)
- **SEO** : Metadata, Open Graph, structured data pour chaque fiche machine

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Rendu hybride SSG/SSR, SEO natif, performance | — Pending |
| Tailwind CSS | Vitesse de développement, responsive natif | — Pending |
| Framer Motion | Animations fluides sans surcharge JS | — Pending |
| Contenu en JSON/TS | Pas de CMS requis, maintenable par devs | — Pending |
| Photos fabricants | Pas de photos Affretix disponibles pour l'instant | — Pending |

---
*Last updated: 2026-04-18 after initialization*

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
