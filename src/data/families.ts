// src/data/families.ts
export type MachineFamily = {
  /** URL-safe slug used in /catalogue/[slug] route */
  slug: string
  /** Display name (French, as shown in nav and cards) */
  name: string
  /** Short description for family card hover state and catalogue page intro */
  description: string
  /** Emoji icon placeholder — will be replaced with SVG illustration in Phase 2 */
  icon: string
  /** Total count of machine types in this family */
  machineCount: number
}

export const machineFamilies: MachineFamily[] = [
  {
    slug: 'terrassement',
    name: 'Terrassement',
    description:
      'Pelles hydrauliques, mini-pelles, bull-dozers et scrapers pour tous vos travaux de terrassement, déblaiement et décapage.',
    icon: '🏗️',
    machineCount: 12,
  },
  {
    slug: 'transport-chantier',
    name: 'Transport chantier',
    description:
      'Tombereaux articulés et rigides, dumpers de chantier pour le transport de terres, gravats et matériaux en vrac.',
    icon: '🚛',
    machineCount: 7,
  },
  {
    slug: 'voirie',
    name: 'Voirie',
    description:
      'Finisseurs à rouleaux, fraiseuses à froid, répandeurs de liants pour la construction et réfection de chaussées.',
    icon: '🛣️',
    machineCount: 7,
  },
  {
    slug: 'compactage',
    name: 'Compactage',
    description:
      'Compacteurs tandem vibrants, compacteurs à pieds dameurs et plaques vibrantes pour la compaction des sols et enrobés.',
    icon: '🔄',
    machineCount: 9,
  },
  {
    slug: 'vrd-reseaux',
    name: 'VRD / Réseaux',
    description:
      'Engins spécialisés pour les travaux de voirie, réseaux divers et canalisations : trancheuses, compacteurs de tranchées, pelles à godet étroit.',
    icon: '🔧',
    machineCount: 10,
  },
  {
    slug: 'manutention-levage',
    name: 'Manutention / Levage',
    description:
      'Grues mobiles, grues à tour, nacelles élévatrices, chariots télescopiques et chariots élévateurs pour tous vos chantiers de levage.',
    icon: '🏛️',
    machineCount: 11,
  },
  {
    slug: 'beton-fondations',
    name: 'Béton / Fondations',
    description:
      'Pompes à béton, malaxeurs, bétonnières automotrices, foreuses et sondeuses pour les ouvrages de fondation et béton projeté.',
    icon: '⚙️',
    machineCount: 6,
  },
  {
    slug: 'demolition-recyclage',
    name: 'Démolition / Recyclage',
    description:
      'Concasseurs mobiles, cribles, brise-roches hydrauliques (BRH), pinces de démolition et équipements de tri et valorisation des déchets.',
    icon: '♻️',
    machineCount: 8,
  },
]
