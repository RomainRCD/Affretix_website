import type { Metadata } from 'next'
import { machineFamilies } from '@/data/families'
import MACHINES_DATA from '@/data/machines.json'
import { FamilyGrid } from '@/components/catalogue/FamilyGrid'

// Chiffres dérivés de machines.json — ne jamais remettre de compteur en dur.
const totalMachines = (MACHINES_DATA as unknown[]).length
const totalFamilies = machineFamilies.length
const familiesRaw = machineFamilies.map((f) => f.name).join(', ')
const familiesLine = familiesRaw.charAt(0).toLowerCase() + familiesRaw.slice(1).toLowerCase()

export const metadata: Metadata = {
  title: 'Catalogue machines | Affretix',
  description: `Parcourez nos ${totalFamilies} familles de matériel BTP avec chauffeur : ${familiesLine}.`,
}

export default function CataloguePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-grey-dark uppercase tracking-wide">
          Catalogue
        </h1>
        <p className="font-body text-grey-dark/70 mt-2 max-w-2xl">
          Location de matériel BTP avec chauffeur/opérateur — {totalMachines} machines réparties en {totalFamilies} familles.
        </p>
      </header>

      <FamilyGrid families={machineFamilies} />
    </main>
  )
}
