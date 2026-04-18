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
