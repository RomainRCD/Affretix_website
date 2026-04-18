// src/data/machines.ts

export type MachineVariant = {
  /** e.g. "1,5t", "20-25t", "130m" */
  label: string
  /** Optional additional detail */
  detail?: string
}

export type Machine = {
  /** URL-safe slug for /catalogue/[family]/[machine] route (Phase 3) */
  slug: string
  /** Display name */
  name: string
  /** Must match a slug in machineFamilies */
  familySlug: string
  /** One-sentence description */
  description: string
  /** Available size/capacity variants */
  variants: MachineVariant[]
  /** Available accessories (BRH, godets, etc.) */
  accessories?: string[]
  /** Placeholder — Phase 2 will add real manufacturer image URLs */
  imageUrl?: string
}

// Helper: get all machines for a given family slug
export function getMachinesByFamily(familySlug: string): Machine[] {
  return machines.filter((m) => m.familySlug === familySlug)
}

export const machines: Machine[] = [
  // ─── Terrassement ─────────────────────────────────────────────────────────
  {
    slug: 'pelle-hydraulique',
    name: 'Pelle hydraulique',
    familySlug: 'terrassement',
    description: 'Pelle hydraulique sur chenilles pour terrassement général, fouilles et démolition légère.',
    variants: [
      { label: '14-16t' },
      { label: '20-22t' },
      { label: '30-35t' },
    ],
    accessories: ['Godet terrassement', 'Godet curage', 'BRH', 'Pince de tri'],
  },
  {
    slug: 'mini-pelle',
    name: 'Mini-pelle',
    familySlug: 'terrassement',
    description: 'Mini-pelle compacte pour travaux en espace réduit, jardins, intérieur de bâtiments.',
    variants: [
      { label: '1,5t' },
      { label: '3t' },
      { label: '6t' },
    ],
    accessories: ['Godet terrassement', 'Godet curage', 'BRH', 'Tarière'],
  },
  {
    slug: 'bulldozer',
    name: 'Bulldozer',
    familySlug: 'terrassement',
    description: 'Bulldozer sur chenilles pour décapage, poussage de terres et travaux de masse.',
    variants: [
      { label: 'D6 — 20t' },
      { label: 'D8 — 37t' },
    ],
  },
  {
    slug: 'chargeuse-sur-pneus',
    name: 'Chargeuse sur pneus',
    familySlug: 'terrassement',
    description: 'Chargeuse articulée sur pneus pour chargement de matériaux en carrière ou sur chantier.',
    variants: [
      { label: '3m³ — 12t' },
      { label: '4m³ — 18t' },
    ],
    accessories: ['Godet grappin', 'Fourches'],
  },
  {
    slug: 'scraper',
    name: 'Scraper automoteur',
    familySlug: 'terrassement',
    description: 'Scraper pour décapage et transport de terres sur de grandes surfaces.',
    variants: [{ label: '15-20m³' }],
  },
  {
    slug: 'pelle-pneus',
    name: 'Pelle sur pneus',
    familySlug: 'terrassement',
    description: 'Pelle hydraulique sur pneus, mobilité accrue pour travaux urbains et déplacements fréquents.',
    variants: [
      { label: '14t' },
      { label: '20t' },
    ],
    accessories: ['Godet terrassement', 'BRH', 'Pince'],
  },
  {
    slug: 'compacteur-de-sol',
    name: 'Compacteur de sol (pelle équipée)',
    familySlug: 'terrassement',
    description: "Pelle équipée d'un compacteur de sol intégré pour compacter en fond de fouille.",
    variants: [{ label: '20-25t' }],
  },
  {
    slug: 'ripper',
    name: 'Ripper / Scarificateur',
    familySlug: 'terrassement',
    description: 'Accessoire de défonçage pour terrain dur, monté sur bulldozer ou pelle.',
    variants: [{ label: 'Adapté D6', detail: 'Simple ou triple dent' }],
  },
  {
    slug: 'niveleuse-terrassement',
    name: 'Niveleuse (Grader)',
    familySlug: 'terrassement',
    description: 'Niveleuse automotrice pour réglage fin de plate-forme et travaux de finition.',
    variants: [
      { label: '12t' },
      { label: '16t' },
    ],
  },
  {
    slug: 'pelle-longue-portee',
    name: 'Pelle longue portée',
    familySlug: 'terrassement',
    description: 'Pelle hydraulique avec bras allongé pour travaux de curage, berges et zones inaccessibles.',
    variants: [{ label: '20t — bras 18m' }],
  },
  {
    slug: 'tractopelle',
    name: 'Tractopelle (Backhoe loader)',
    familySlug: 'terrassement',
    description: "Engin polyvalent, chargeur à l'avant et pelleteuse à l'arrière.",
    variants: [{ label: 'Standard — 8t' }],
  },
  {
    slug: 'pelle-rail-route',
    name: 'Pelle rail-route',
    familySlug: 'terrassement',
    description: 'Pelle adaptée pour interventions sur voies ferrées en configuration rail et route.',
    variants: [{ label: '14-18t' }],
  },

  // ─── Transport chantier ────────────────────────────────────────────────────
  {
    slug: 'tombereau-articule',
    name: 'Tombereau articulé',
    familySlug: 'transport-chantier',
    description: "Tombereau articulé pour transport de terres et matériaux en vrac sur terrain accidenté.",
    variants: [
      { label: '25t' },
      { label: '40t' },
      { label: '60t' },
    ],
  },
  {
    slug: 'tombereau-rigide',
    name: 'Tombereau rigide',
    familySlug: 'transport-chantier',
    description: 'Tombereau rigide grande capacité pour mines et chantiers à fort volume.',
    variants: [
      { label: '100t' },
      { label: '150t' },
    ],
  },
  {
    slug: 'dumper-de-chantier',
    name: 'Dumper de chantier',
    familySlug: 'transport-chantier',
    description: "Petit dumper maniable pour évacuation rapide de déblais dans les espaces restreints.",
    variants: [
      { label: '1t' },
      { label: '3t' },
      { label: '6t' },
    ],
  },
  {
    slug: 'camion-benne-chantier',
    name: 'Camion-benne chantier',
    familySlug: 'transport-chantier',
    description: "Camion-benne tout-terrain pour transport de déblais et matériaux sur voirie et chantier.",
    variants: [
      { label: '8x4 — 20m³' },
      { label: '6x4 — 14m³' },
    ],
  },
  {
    slug: 'transporteur-sur-chenilles',
    name: 'Transporteur sur chenilles',
    familySlug: 'transport-chantier',
    description: 'Véhicule tout-terrain sur chenilles pour transport en zone inondée ou boueuse.',
    variants: [{ label: '2t — 5t' }],
  },
  {
    slug: 'convoyeur-de-chantier',
    name: 'Convoyeur de chantier',
    familySlug: 'transport-chantier',
    description: "Tapis convoyeur modulaire pour évacuation continue de déblais ou granulats.",
    variants: [{ label: '15m', detail: "Extensible jusqu'à 30m" }],
  },
  {
    slug: 'remorque-porte-engins',
    name: 'Remorque porte-engins',
    familySlug: 'transport-chantier',
    description: "Remorque basse plate-forme pour transport d'engins de chantier entre sites.",
    variants: [
      { label: '30t PTAC' },
      { label: '50t PTAC' },
    ],
  },

  // ─── Voirie ───────────────────────────────────────────────────────────────
  {
    slug: 'finisseur',
    name: 'Finisseur à chenilles',
    familySlug: 'voirie',
    description: "Finisseur pour mise en œuvre d'enrobés bitumineux en couche de base, liaison ou roulement.",
    variants: [
      { label: 'Largeur 2,5 à 6m' },
      { label: 'Largeur 3 à 9m' },
    ],
  },
  {
    slug: 'fraiseuse-froid',
    name: 'Fraiseuse à froid',
    familySlug: 'voirie',
    description: "Fraiseuse pour fraisage d'enrobés en rénovation de chaussées, profondeur de 0 à 30cm.",
    variants: [
      { label: 'Largeur 35cm' },
      { label: 'Largeur 1m' },
      { label: 'Largeur 2m' },
    ],
  },
  {
    slug: 'repandeur-granulats',
    name: 'Répandeur de granulats',
    familySlug: 'voirie',
    description: 'Gravillonneur automoteur pour répandage de granulats en couche de surface.',
    variants: [{ label: 'Largeur 2,5 à 4,5m' }],
  },
  {
    slug: 'balayeuse-aspiratrce',
    name: 'Balayeuse aspiratrice',
    familySlug: 'voirie',
    description: "Balayeuse aspiratrice automotrice pour nettoyage de chaussées et voiries après travaux.",
    variants: [{ label: '4m³ — 8m³' }],
  },
  {
    slug: 'epandeuse-liant',
    name: 'Épandeuse de liant',
    familySlug: 'voirie',
    description: "Répandeuse de bitume ou d'émulsion pour enduits superficiels et couches d'accrochage.",
    variants: [{ label: '4 000L — 8 000L' }],
  },
  {
    slug: 'recycleuse-sol',
    name: 'Recycleuse / Stabilisatrice',
    familySlug: 'voirie',
    description: "Engin de recyclage des chaussées en place ou stabilisation de sol pour réhabilitation de voirie.",
    variants: [{ label: 'Largeur 2,4m' }],
  },
  {
    slug: 'profileuse-accotements',
    name: "Profileuse d'accotements",
    familySlug: 'voirie',
    description: "Machine de réglage et profilage d'accotements et fossés en bord de chaussée.",
    variants: [{ label: 'Standard' }],
  },

  // ─── Compactage ───────────────────────────────────────────────────────────
  {
    slug: 'compacteur-tandem',
    name: 'Compacteur tandem vibrant',
    familySlug: 'compactage',
    description: "Rouleau tandem double bille vibrant pour compactage d'enrobés en finition.",
    variants: [
      { label: '3t' },
      { label: '7t' },
      { label: '12t' },
    ],
  },
  {
    slug: 'compacteur-monocylindre',
    name: 'Compacteur monocylindre',
    familySlug: 'compactage',
    description: 'Compacteur à rouleau vibrant monocylindre pour compactage de remblais et sols.',
    variants: [
      { label: '10t' },
      { label: '14t' },
      { label: '20t' },
    ],
  },
  {
    slug: 'compacteur-pieds-dameurs',
    name: 'Compacteur à pieds dameurs',
    familySlug: 'compactage',
    description: 'Compacteur à patins ou pieds dameurs pour compactage de sols cohésifs (argiles, limons).',
    variants: [
      { label: '12t' },
      { label: '18t' },
    ],
  },
  {
    slug: 'plaque-vibrante',
    name: 'Plaque vibrante',
    familySlug: 'compactage',
    description: 'Plaque compactrice guidée à pied ou à distance pour petites surfaces et tranchées.',
    variants: [
      { label: '300 kg' },
      { label: '700 kg' },
    ],
  },
  {
    slug: 'compacteur-de-tranchee',
    name: 'Compacteur de tranchée',
    familySlug: 'compactage',
    description: 'Compacteur de fond de tranchée pour compactage des remblais de réseaux.',
    variants: [{ label: 'Largeur 30 à 60cm' }],
  },
  {
    slug: 'rouleau-pneus',
    name: 'Rouleau à pneus',
    familySlug: 'compactage',
    description: 'Compacteur pneumatique pour compactage de revêtements bitumineux et sols.',
    variants: [{ label: '12t — 30t' }],
  },
  {
    slug: 'dame-sauteuse',
    name: 'Dame sauteuse (grenouille)',
    familySlug: 'compactage',
    description: 'Compacteur à percussion pour compactage en fond de tranchée et zones très confinées.',
    variants: [{ label: 'Thermique — 65 kg' }],
  },
  {
    slug: 'compacteur-guide-a-main',
    name: 'Compacteur guidé à main',
    familySlug: 'compactage',
    description: "Petit compacteur maniable guidé à la main pour zones d'accès très restreint.",
    variants: [{ label: '350 kg — 500 kg' }],
  },
  {
    slug: 'compacteur-chaussee-lourde',
    name: 'Compacteur chaussée (grande largeur)',
    familySlug: 'compactage',
    description: 'Compacteur tandem ou monocylindre grande largeur pour autoroutes et grandes surfaces.',
    variants: [{ label: '20t — 26t' }],
  },

  // ─── VRD / Réseaux ────────────────────────────────────────────────────────
  {
    slug: 'trancheuse',
    name: 'Trancheuse à chaîne',
    familySlug: 'vrd-reseaux',
    description: 'Trancheuse à chaîne coupante pour ouverture de tranchées de réseaux (eau, gaz, fibre).',
    variants: [
      { label: 'Largeur 10-30cm, profondeur 1,5m' },
      { label: 'Largeur 30-60cm, profondeur 2m' },
    ],
  },
  {
    slug: 'pelle-a-godet-etroit',
    name: 'Pelle à godet étroit (VRD)',
    familySlug: 'vrd-reseaux',
    description: 'Mini-pelle équipée d\'un godet de curage étroit pour ouverture de tranchées VRD.',
    variants: [
      { label: '3t — godet 20cm' },
      { label: '6t — godet 30cm' },
    ],
    accessories: ['Godet curage 20cm', 'Godet curage 30cm'],
  },
  {
    slug: 'aspiratrice-excavatrice',
    name: 'Aspiratrice-excavatrice',
    familySlug: 'vrd-reseaux',
    description: 'Hydrocureuse et aspiratrice pour fouilles non destructives autour des réseaux existants.',
    variants: [{ label: '3m³ — 5m³' }],
  },
  {
    slug: 'pose-canalisations',
    name: 'Engin de pose de canalisations',
    familySlug: 'vrd-reseaux',
    description: 'Pelle équipée d\'accessoires de manutention pour pose de buses et canalisations.',
    variants: [{ label: '14-20t' }],
    accessories: ['Pince à buses', 'Élingues'],
  },
  {
    slug: 'compacteur-tranchee-vrd',
    name: 'Compacteur de tranchée VRD',
    familySlug: 'vrd-reseaux',
    description: 'Compacteur de fond de tranchée articulé pour réseaux enterrés.',
    variants: [{ label: '30-50cm largeur' }],
  },
  {
    slug: 'chargeuse-vrd',
    name: 'Chargeuse compacte VRD',
    familySlug: 'vrd-reseaux',
    description: 'Chargeuse compacte sur chenilles ou pneus pour travaux VRD en site urbain.',
    variants: [{ label: '2,5t' }],
    accessories: ['Godet', 'Fourches', 'Tarière'],
  },
  {
    slug: 'malaxeur-coulis',
    name: 'Malaxeur à coulis (injection)',
    familySlug: 'vrd-reseaux',
    description: 'Malaxeur et pompe à coulis pour injections de remblaiement de tranchées (sable-ciment).',
    variants: [{ label: 'Débit 2-6 m³/h' }],
  },
  {
    slug: 'gyrobroyeur',
    name: 'Gyrobroyeur sur pelle',
    familySlug: 'vrd-reseaux',
    description: "Gyrobroyeur hydraulique monté sur pelle pour débroussaillage des emprises VRD.",
    variants: [{ label: 'Largeur 1,2-2,4m' }],
  },
  {
    slug: 'engin-bourrage-voie',
    name: 'Engin de bourrage voie',
    familySlug: 'vrd-reseaux',
    description: 'Engin de maintenance de voies ferrées pour travaux de bourrage et VRD ferroviaire.',
    variants: [{ label: 'Standard' }],
  },
  {
    slug: 'brise-beton',
    name: 'Brise-béton sur pelle',
    familySlug: 'vrd-reseaux',
    description: 'Pelle équipée d\'un brise-béton hydraulique (BRH) pour casse de chaussée et revêtements.',
    variants: [
      { label: '3t + BRH 200 kg' },
      { label: '6t + BRH 500 kg' },
    ],
  },

  // ─── Manutention / Levage ─────────────────────────────────────────────────
  {
    slug: 'grue-mobile',
    name: 'Grue mobile sur pneus',
    familySlug: 'manutention-levage',
    description: 'Grue mobile automotrice sur pneus pour levage de charges lourdes sur chantier.',
    variants: [
      { label: '40t' },
      { label: '80t' },
      { label: '130t' },
    ],
  },
  {
    slug: 'grue-a-tour',
    name: 'Grue à tour',
    familySlug: 'manutention-levage',
    description: 'Grue à tour à montage automatisé (GMA) ou à flèche distributrice pour construction verticale.',
    variants: [
      { label: '40 mT — flèche 40m' },
      { label: '80 mT — flèche 60m' },
    ],
  },
  {
    slug: 'nacelle-articulee',
    name: 'Nacelle élévatrice articulée',
    familySlug: 'manutention-levage',
    description: 'Nacelle télescopique articulée automotrice pour travaux en hauteur (façades, réseaux aériens).',
    variants: [
      { label: 'Hauteur 12m' },
      { label: 'Hauteur 20m' },
      { label: 'Hauteur 40m' },
    ],
  },
  {
    slug: 'nacelle-ciseaux',
    name: 'Nacelle à ciseaux',
    familySlug: 'manutention-levage',
    description: 'Plate-forme élévatrice à ciseaux pour travaux en hauteur sur surface plane (entrepôts, hangars).',
    variants: [
      { label: 'Hauteur 6m — électrique' },
      { label: 'Hauteur 12m — thermique tout-terrain' },
    ],
  },
  {
    slug: 'chariot-telescopique',
    name: 'Chariot télescopique',
    familySlug: 'manutention-levage',
    description: 'Télescopique tout-terrain pour approvisionnement en hauteur et manutention de palettes sur chantier.',
    variants: [
      { label: '3t — 7m' },
      { label: '4t — 17m' },
      { label: '6t — 22m' },
    ],
    accessories: ['Fourches', 'Godet', 'Plateau à palettes'],
  },
  {
    slug: 'palan-chaine',
    name: 'Palan sur rail (pont roulant)',
    familySlug: 'manutention-levage',
    description: "Pont roulant ou palan sur rail pour manutention de charges en atelier ou entrepôt.",
    variants: [
      { label: '2t' },
      { label: '5t' },
      { label: '10t' },
    ],
  },
  {
    slug: 'chariot-elevateur',
    name: 'Chariot élévateur',
    familySlug: 'manutention-levage',
    description: 'Chariot élévateur frontal thermique ou électrique pour manutention de palettes sur site.',
    variants: [
      { label: '2,5t' },
      { label: '4t' },
      { label: '7t' },
    ],
  },
  {
    slug: 'portique-levage',
    name: 'Portique de levage mobile',
    familySlug: 'manutention-levage',
    description: "Portique mobile automoteur pour levage de charges en l'absence de grue fixe.",
    variants: [{ label: '5t — 20t' }],
  },
  {
    slug: 'grue-de-manutention',
    name: 'Grue de manutention (loader crane)',
    familySlug: 'manutention-levage',
    description: 'Grue de chargement montée sur camion pour livraison et déchargement de matériaux lourds.',
    variants: [{ label: '15 mT — 30 mT' }],
  },
  {
    slug: 'spider-lift',
    name: 'Araignée élévatrice (Spider lift)',
    familySlug: 'manutention-levage',
    description: "Nacelle araignée compacte sur stabilisateurs pour intervention en terrain difficile et accès restreint.",
    variants: [
      { label: 'Hauteur 20m' },
      { label: 'Hauteur 35m' },
    ],
  },
  {
    slug: 'monte-charge-chantier',
    name: 'Monte-charge de chantier',
    familySlug: 'manutention-levage',
    description: "Élévateur de chantier (mast climbing) pour montage de matériaux et personnel en hauteur.",
    variants: [{ label: "1t — jusqu'à 80m" }],
  },

  // ─── Béton / Fondations ───────────────────────────────────────────────────
  {
    slug: 'pompe-beton',
    name: 'Pompe à béton',
    familySlug: 'beton-fondations',
    description: 'Pompe à béton sur camion avec flèche télescopique pour coulage de dalle et voiles.',
    variants: [
      { label: 'Flèche 28m' },
      { label: 'Flèche 42m' },
      { label: 'Flèche 52m' },
    ],
  },
  {
    slug: 'malaxeur-beton',
    name: 'Malaxeur / Bétonnière automotrice',
    familySlug: 'beton-fondations',
    description: 'Toupie béton automotrice pour transport et malaxage de béton frais depuis la centrale.',
    variants: [
      { label: '6m³' },
      { label: '8m³' },
    ],
  },
  {
    slug: 'foreuse-fondations',
    name: 'Foreuse de fondations',
    familySlug: 'beton-fondations',
    description: 'Foreuse hydraulique pour réalisation de pieux forés, micropieux et colonnes de fondations.',
    variants: [
      { label: 'Diamètre 400-800mm' },
      { label: 'Diamètre 1 000-1 500mm' },
    ],
  },
  {
    slug: 'vibreur-beton',
    name: 'Vibreur à béton (aiguille)',
    familySlug: 'beton-fondations',
    description: 'Groupe vibreur avec aiguille pour serrage du béton lors du coulage.',
    variants: [
      { label: 'Aiguille 38mm' },
      { label: 'Aiguille 58mm' },
    ],
  },
  {
    slug: 'centrale-beton',
    name: 'Centrale à béton mobile',
    familySlug: 'beton-fondations',
    description: 'Centrale à béton mobile de chantier pour production autonome de béton sur site isolé.',
    variants: [{ label: 'Capacité 20-50 m³/h' }],
  },
  {
    slug: 'sondeuse',
    name: 'Sondeuse / Foreuse de reconnaissance',
    familySlug: 'beton-fondations',
    description: 'Foreuse légère pour sondages géotechniques, prélèvements de sol et reconnaissance de site.',
    variants: [{ label: 'Profondeur 20-50m' }],
  },

  // ─── Démolition / Recyclage ───────────────────────────────────────────────
  {
    slug: 'concasseur-mobile',
    name: 'Concasseur mobile',
    familySlug: 'demolition-recyclage',
    description: 'Concasseur à mâchoires ou à impact sur chenilles pour broyage de béton, pierres et grave sur chantier.',
    variants: [
      { label: 'Débit 80-150 t/h' },
      { label: 'Débit 200-350 t/h' },
    ],
  },
  {
    slug: 'crible-mobile',
    name: 'Crible mobile',
    familySlug: 'demolition-recyclage',
    description: 'Crible vibrant sur chenilles pour tri granulométrique de matériaux recyclés.',
    variants: [
      { label: 'Simple deck — débit 100 t/h' },
      { label: 'Triple deck — débit 300 t/h' },
    ],
  },
  {
    slug: 'brh',
    name: 'Brise-roche hydraulique (BRH)',
    familySlug: 'demolition-recyclage',
    description: 'Marteau hydraulique monté sur pelle pour démolition de béton, roche et maçonnerie.',
    variants: [
      { label: '200 kg (mini-pelle 3-6t)' },
      { label: '500 kg (pelle 10-14t)' },
      { label: '1 500 kg (pelle 20-35t)' },
    ],
  },
  {
    slug: 'pince-demolition',
    name: 'Pince de démolition',
    familySlug: 'demolition-recyclage',
    description: 'Pince hydraulique pulvérisatrice pour démolition sélective de structures béton armé.',
    variants: [
      { label: '600 kg' },
      { label: '2 500 kg' },
    ],
  },
  {
    slug: 'cisaille-ferraille',
    name: 'Cisaille à ferraille',
    familySlug: 'demolition-recyclage',
    description: 'Cisaille hydraulique pour découpe de profilés métalliques, ferrailles et charpentes en démolition.',
    variants: [
      { label: '1 200 kg' },
      { label: '3 000 kg' },
    ],
  },
  {
    slug: 'grappin-tri',
    name: 'Grappin de tri',
    familySlug: 'demolition-recyclage',
    description: 'Grappin orange-peel ou polyvalent pour tri de déchets, ferrailles et matériaux en déchetterie.',
    variants: [
      { label: 'Bennes 0,4 m³' },
      { label: 'Bennes 1,2 m³' },
    ],
  },
  {
    slug: 'trommel',
    name: 'Trommel mobile',
    familySlug: 'demolition-recyclage',
    description: 'Trommel rotatif sur chenilles pour criblage et tri de terre végétale, compost et déchets verts.',
    variants: [{ label: 'Débit 40-120 t/h' }],
  },
  {
    slug: 'broyeur-beton-recycle',
    name: 'Broyeur à mâchoires compact',
    familySlug: 'demolition-recyclage',
    description: 'Broyeur compact à mâchoires pour traitement de petits volumes de béton et moellons sur chantier.',
    variants: [{ label: 'Débit 20-50 t/h' }],
  },
]
