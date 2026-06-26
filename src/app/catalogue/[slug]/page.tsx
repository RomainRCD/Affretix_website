import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { machineFamilies } from '@/data/families'
import { getMachinesByFamily } from '@/data/machines'
import { FamilyHero } from '@/components/catalogue/FamilyHero'
import { MachineGrid } from '@/components/catalogue/MachineGrid'

// Emit one static page per family at build time
export async function generateStaticParams() {
  return machineFamilies.map((family) => ({ slug: family.slug }))
}

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

      <MachineGrid machines={machines} />
    </main>
  )
}
