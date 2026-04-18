import Link from 'next/link'
import type { MachineFamily } from '@/data/families'

interface FamilyHeroProps {
  family: MachineFamily
  machineCount: number
}

export function FamilyHero({ family, machineCount }: FamilyHeroProps) {
  return (
    <div className="border-b border-grey-dark/10 pb-8">
      <nav className="font-body text-sm text-grey-dark/50 mb-4">
        <Link href="/catalogue" className="hover:text-orange transition-colors">
          Catalogue
        </Link>
        <span className="mx-2">/</span>
        <span className="text-grey-dark">{family.name}</span>
      </nav>

      <div className="flex items-start gap-4">
        <span className="text-5xl">{family.icon}</span>
        <div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-grey-dark uppercase tracking-wide">
            {family.name}
          </h1>
          <p className="font-body text-grey-dark/70 mt-2 max-w-2xl">
            {family.description}
          </p>
          <p className="font-body text-sm text-grey-dark/50 mt-3">
            {machineCount} machine{machineCount > 1 ? 's' : ''} disponible{machineCount > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
