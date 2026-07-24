import MACHINES_DATA from '@/data/machines.json'
import { machineFamilies } from '@/data/families'

// Chiffres dérivés de machines.json — ne jamais remettre de compteur en dur.
const totalEngins = (MACHINES_DATA as { variants?: unknown[] }[]).reduce(
  (n, m) => n + (m.variants?.length ?? 0),
  0,
)
const familiesRaw = machineFamilies.map((f) => f.name).join(', ')
const familiesLine = familiesRaw.charAt(0) + familiesRaw.slice(1).toLowerCase()

const stats = [
  {
    value: String(totalEngins),
    label: 'Engins disponibles',
    description: familiesLine,
  },
  {
    value: '100%',
    label: 'Avec opérateur',
    description: 'Chaque machine est livrée avec un chauffeur qualifié',
  },
  {
    value: 'Sur-mesure',
    label: 'Conseil chantier',
    description: 'On vous oriente vers la machine adaptée à votre besoin',
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
