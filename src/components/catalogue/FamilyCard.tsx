import Link from 'next/link'
import type { MachineFamily } from '@/data/families'

export function FamilyCard({ family }: { family: MachineFamily }) {
  return (
    <Link
      href={`/catalogue/${family.slug}`}
      className="group flex flex-col gap-3 border border-grey-dark/10 p-6 hover:border-orange transition-colors duration-200 hover:shadow-md"
    >
      <span className="text-4xl">{family.icon}</span>
      <div>
        <h2 className="font-heading font-bold text-xl text-grey-dark uppercase tracking-wide group-hover:text-orange transition-colors">
          {family.name}
        </h2>
        <p className="font-body text-sm text-grey-dark/70 mt-1 line-clamp-2">
          {family.description}
        </p>
      </div>
      <span className="font-body text-xs text-grey-dark/50 mt-auto">
        {family.machineCount} machine{family.machineCount > 1 ? 's' : ''}
      </span>
    </Link>
  )
}
