import Image from 'next/image'
import Link from 'next/link'
import type { Machine } from '@/data/machines'

export function MachineCard({ machine }: { machine: Machine }) {
  return (
    <Link
      href={`/catalogue/${machine.familySlug}/${machine.slug}`}
      className="group flex flex-col border border-grey-dark/10 hover:border-orange transition-colors duration-200 hover:shadow-md overflow-hidden"
    >
      {/* Image area — 4:3 aspect ratio */}
      <div className="relative aspect-[4/3] bg-grey-dark/5 overflow-hidden">
        {machine.imageUrl ? (
          <Image
            src={machine.imageUrl}
            alt={machine.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-body text-xs text-grey-dark/30 uppercase tracking-widest">
              Image à venir
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-heading font-bold text-base text-grey-dark uppercase tracking-wide group-hover:text-orange transition-colors leading-tight">
          {machine.name}
        </h3>
        <p className="font-body text-xs text-grey-dark/60 line-clamp-2">
          {machine.description}
        </p>
        {/* Capacity variant badges */}
        {machine.variants.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {machine.variants.map((v, i) => (
              <span
                key={`${v.label}-${i}`}
                className="font-body text-xs bg-grey-dark/5 text-grey-dark/70 px-2 py-0.5 border border-grey-dark/10"
              >
                {v.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
