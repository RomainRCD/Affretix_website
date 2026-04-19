# Requirements: Affretix Site Vitrine

**Défini :** 2026-04-18
**Core Value :** Un professionnel BTP doit pouvoir trouver la bonne machine, avec les bonnes capacités, et envoyer une demande de devis en moins de 3 clics.

---

## v1 Requirements

### Page d'accueil

- [ ] **HOME-01** : Visiteur voit la proposition de valeur Affretix (location avec chauffeur, secteur BTP) dans la hero section
- [ ] **HOME-02** : Visiteur peut accéder aux 8 familles de machines depuis l'accueil
- [ ] **HOME-03** : Visiteur voit les chiffres clés / arguments de réassurance (ex: nombre de machines, zones, groupe LEVA)
- [ ] **HOME-04** : Visiteur peut accéder au formulaire de contact général depuis l'accueil
- [ ] **HOME-05** : La mention du groupe LEVA est visible en pied de page ou section dédiée

### Navigation & Structure

- [ ] **NAV-01** : Visiteur peut naviguer entre les 8 familles de machines via un menu principal
- [ ] **NAV-02** : Le site est accessible sur mobile, tablette et desktop (responsive)
- [ ] **NAV-03** : Chaque page a des métadonnées SEO (titre, description, og:image)
- [ ] **NAV-04** : Un footer contient les informations légales et le lien groupe LEVA

### Catalogue

- [ ] **CAT-01** : Visiteur peut voir la liste de toutes les familles de machines sur une page catalogue
- [ ] **CAT-02** : Visiteur peut filtrer/parcourir les machines d'une famille spécifique
- [ ] **CAT-03** : Chaque machine est présentée avec son nom, sa famille, ses capacités disponibles et une image
- [ ] **CAT-04** : Les images des machines proviennent des fabricants (Caterpillar, Liebherr, etc.)

### Fiche Produit

- [ ] **PROD-01** : Visiteur voit le nom de la machine, sa famille, sa description
- [ ] **PROD-02** : Visiteur peut voir les tailles / capacités disponibles (tonnages, variantes)
- [ ] **PROD-03** : Visiteur peut voir les accessoires disponibles (BRH, godet terrassement, godet curage le cas échéant)
- [ ] **PROD-04** : Visiteur voit une image principale de la machine
- [ ] **PROD-05** : Visiteur peut soumettre une demande de devis depuis la fiche produit
- [ ] **PROD-06** : La fiche produit indique que la prestation est toujours avec chauffeur/opérateur

### Formulaire de Devis

- [x] **FORM-01** : Visiteur peut renseigner ses coordonnées (nom, entreprise, téléphone, email)
- [x] **FORM-02** : Visiteur peut préciser le type de machine pré-sélectionné (pré-rempli depuis la fiche)
- [x] **FORM-03** : Visiteur peut décrire son besoin (durée, lieu de chantier, description des travaux)
- [x] **FORM-04** : Visiteur reçoit une confirmation visuelle après envoi du formulaire
- [x] **FORM-05** : Les données du formulaire sont envoyées par email à Affretix (via service tiers)

### Design & Expérience

- [ ] **UX-01** : Le design respecte la charte graphique officielle (orange #F58634, gris #353335, blanc #FFFFFF)
- [ ] **UX-02** : La typographie utilise Barlow Condensed (titres) et DM Sans (corps)
- [x] **UX-03** : Les transitions et animations sont fluides (Framer Motion)
- [x] **UX-04** : Les hover states sur les cartes machines sont interactifs et expressifs
- [ ] **UX-05** : Le chargement des pages est rapide (images optimisées via next/image)

---

## v2 Requirements

### Fonctionnalités différées

- **V2-01** : Espace client avec connexion et suivi des demandes
- **V2-02** : Tarifs publics jour/semaine/mois par machine
- **V2-03** : Carte des zones d'intervention géographiques
- **V2-04** : Galerie de chantiers réalisés / références clients
- **V2-05** : Blog / actualités sectorielles
- **V2-06** : Version multilingue (FR + EN)
- **V2-07** : Disponibilité en temps réel des machines
- **V2-08** : CMS back-office pour mise à jour du catalogue

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authentification / espace client | Non demandé en v1 |
| CMS éditable | Contenu géré en code, non requis |
| Tarifs publics | Tout sur devis |
| E-commerce / paiement | Hors périmètre |
| Blog / actualités | Hors v1 |
| Multilingue | Français uniquement en v1 |
| Disponibilité machines temps réel | Nécessite backend / ERP — hors v1 |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| HOME-01 | Phase 1 | Pending |
| HOME-02 | Phase 1 | Pending |
| HOME-03 | Phase 1 | Pending |
| HOME-04 | Phase 1 | Pending |
| HOME-05 | Phase 1 | Pending |
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 5 | Pending |
| NAV-04 | Phase 1 | Pending |
| CAT-01 | Phase 2 | Pending |
| CAT-02 | Phase 2 | Pending |
| CAT-03 | Phase 2 | Pending |
| CAT-04 | Phase 2 | Pending |
| PROD-01 | Phase 3 | Pending |
| PROD-02 | Phase 3 | Pending |
| PROD-03 | Phase 3 | Pending |
| PROD-04 | Phase 3 | Pending |
| PROD-05 | Phase 3 | Pending |
| PROD-06 | Phase 3 | Pending |
| FORM-01 | Phase 4 | Complete |
| FORM-02 | Phase 4 | Complete |
| FORM-03 | Phase 4 | Complete |
| FORM-04 | Phase 4 | Complete |
| FORM-05 | Phase 4 | Complete |
| UX-01 | Phase 1 | Pending |
| UX-02 | Phase 1 | Pending |
| UX-03 | Phase 2 | Complete |
| UX-04 | Phase 2 | Complete |
| UX-05 | Phase 5 | Pending |

**Coverage :**
- v1 requirements : 29 total
- Mapped to phases : 29
- Unmapped : 0 ✓

---
*Requirements définis : 2026-04-18*
*Dernière mise à jour : 2026-04-18 — roadmap créé, traceability confirmée*
