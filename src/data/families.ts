// src/data/families.ts
// machineCount est calculé depuis machines.json — ne plus le maintenir à la main.
import MACHINES_DATA from './machines.json'
const countFor = (slug: string) => (MACHINES_DATA as { familySlug: string }[]).filter((m) => m.familySlug === slug).length
export type MachineFamily = {
  /** URL-safe slug used in /catalogue/[slug] route */
  slug: string
  /** Display name (French, as shown in nav and cards) */
  name: string
  /** Short description for family card hover state and catalogue page intro */
  description: string
  /** Emoji icon placeholder — will be replaced with SVG illustration later */
  icon: string
  /** Total count of machine types (produits) in this family */
  machineCount: number
}

export const machineFamilies: MachineFamily[] = [
  {
    slug: 'terrassement',
    name: 'Terrassement',
    description:
      'Pelles sur chenilles et sur pneus, mini-pelles, Mecalac, bulldozers, dumpers, chargeurs, chargeuses, tractopelles et accessoires pour tous vos travaux de terrassement.',
    icon: '🏗️',
    machineCount: countFor('terrassement'),
  },
  {
    slug: 'transport-et-voirie',
    name: 'Transport et voirie',
    description:
      'Balayeuses THP, tracteurs benne et tracteurs cuve pour le transport de matériaux, le nettoyage et l’entretien de voirie.',
    icon: '🚛',
    machineCount: countFor('transport-et-voirie'),
  },
  {
    slug: 'compactage',
    name: 'Compactage',
    description:
      'Rouleaux compacteurs tandem, monocylindres vibrants et sur pneus pour la compaction des sols, graves et enrobés.',
    icon: '🔄',
    machineCount: countFor('compactage'),
  },
]
