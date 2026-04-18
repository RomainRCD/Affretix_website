import type { Metadata } from 'next'
import { machineFamilies } from '@/data/families'
import { FamilyCard } from '@/components/catalogue/FamilyCard'

export const metadata: Metadata = {
  title: 'Catalogue machines | Affretix',
  description:
    'Parcourez nos 8 familles de matériel BTP avec chauffeur : terrassement, transport, voirie, compactage, VRD, manutention, béton et démolition.',
}

export default function CataloguePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-grey-dark uppercase tracking-wide">
          Catalogue
        </h1>
        <p className="font-body text-grey-dark/70 mt-2 max-w-2xl">
          Location de matériel BTP avec chauffeur/opérateur — 72 machines réparties en 8 familles.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {machineFamilies.map((family) => (
          <FamilyCard key={family.slug} family={family} />
        ))}
      </div>
    </main>
  )
}
