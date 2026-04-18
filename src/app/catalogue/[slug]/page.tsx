import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { machineFamilies } from '@/data/families'
import { getMachinesByFamily } from '@/data/machines'
import { FamilyHero } from '@/components/catalogue/FamilyHero'
import { MachineCard } from '@/components/catalogue/MachineCard'

// Emit one static page per family at build time
export async function generateStaticParams() {
  return machineFamilies.map((family) => ({ slug: family.slug }))
}

// Prevent unknown slugs from triggering dynamic rendering — force 404
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const family = machineFamilies.find((f) => f.slug === slug)
  if (!family) return {}
  return {
    title: `${family.name} | Catalogue Affretix`,
    description: family.description,
  }
}

export default async function FamilyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const family = machineFamilies.find((f) => f.slug === slug)
  if (!family) notFound()

  const machines = getMachinesByFamily(slug)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FamilyHero family={family} machineCount={machines.length} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {machines.map((machine) => (
          <MachineCard key={machine.slug} machine={machine} />
        ))}
      </div>
    </main>
  )
}
