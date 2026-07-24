import Link from 'next/link'
import { machineFamilies } from '@/data/families'
import MACHINES_DATA from '@/data/machines.json'

// Chiffres dérivés de machines.json — ne jamais remettre de compteur en dur.
const totalTypes = (MACHINES_DATA as unknown[]).length
const totalFamilies = machineFamilies.length

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
            {totalTypes} types d&apos;engins répartis en {totalFamilies} familles. Toujours avec opérateur qualifié.
          </p>
        </div>

        {/* Family grid — centré */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
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
