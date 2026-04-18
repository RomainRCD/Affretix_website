import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { machines } from '@/data/machines'
import { machineFamilies } from '@/data/families'

export const dynamicParams = false

export async function generateStaticParams() {
  return machines.map((m) => ({
    slug: m.familySlug,
    machineSlug: m.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; machineSlug: string }>
}): Promise<Metadata> {
  const { slug, machineSlug } = await params
  const machine = machines.find((m) => m.slug === machineSlug && m.familySlug === slug)
  if (!machine) return {}
  const family = machineFamilies.find((f) => f.slug === slug)
  return {
    title: `${machine.name} | ${family?.name ?? slug} | Affretix`,
    description: machine.description,
  }
}

export default async function MachinePage({
  params,
}: {
  params: Promise<{ slug: string; machineSlug: string }>
}) {
  const { slug, machineSlug } = await params
  const machine = machines.find((m) => m.slug === machineSlug && m.familySlug === slug)
  if (!machine) notFound()

  const family = machineFamilies.find((f) => f.slug === slug)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb / Back link */}
      <nav className="mb-8 flex items-center gap-2 font-body text-sm text-grey-dark/50">
        <Link href="/catalogue" className="hover:text-orange transition-colors">
          Catalogue
        </Link>
        <span>/</span>
        <Link href={`/catalogue/${slug}`} className="hover:text-orange transition-colors">
          {family?.name ?? slug}
        </Link>
        <span>/</span>
        <span className="text-grey-dark/70">{machine.name}</span>
      </nav>

      <Link
        href={`/catalogue/${slug}`}
        className="inline-flex items-center gap-1 font-body text-sm text-orange hover:underline mb-6"
      >
        ← Retour à {family?.name ?? slug}
      </Link>

      {/* Main content grid */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Left: Image */}
        <div>
          {machine.imageUrl ? (
            <div className="relative w-full md:h-[480px] aspect-[16/9] md:aspect-auto overflow-hidden">
              <Image
                src={machine.imageUrl}
                alt={machine.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ) : (
            <div className="relative w-full md:h-[480px] aspect-[16/9] md:aspect-auto bg-grey-dark/5 flex items-center justify-center">
              <span className="font-body text-sm text-grey-dark/30 uppercase tracking-widest">
                Image à venir
              </span>
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-6">
          {/* Machine name — PROD-01 */}
          <div>
            <p className="font-body text-sm text-grey-dark/50 uppercase tracking-widest mb-1">
              {family?.name ?? slug}
            </p>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-grey-dark uppercase leading-tight">
              {machine.name}
            </h1>
          </div>

          {/* Avec chauffeur badge — PROD-06 (ALWAYS shown) */}
          <div>
            <span className="inline-block bg-orange text-white font-heading uppercase text-sm px-4 py-1.5 tracking-wide">
              Avec chauffeur / opérateur
            </span>
          </div>

          {/* Description — PROD-01 */}
          <p className="font-body text-grey-dark/70 leading-relaxed">
            {machine.description}
          </p>

          {/* Variants — PROD-02 */}
          <div>
            <h2 className="font-heading uppercase text-grey-dark font-semibold text-lg mb-3">
              Capacités disponibles
            </h2>
            <div className="flex flex-wrap gap-2">
              {machine.variants.map((variant) => (
                <div
                  key={variant.label}
                  className="bg-grey-dark/5 border border-grey-dark/10 px-4 py-3 inline-block"
                >
                  <p className="font-heading font-bold text-grey-dark">{variant.label}</p>
                  {variant.detail && (
                    <p className="font-body text-xs text-grey-dark/50 mt-0.5">{variant.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Accessories — PROD-03 (conditional) */}
          {machine.accessories && machine.accessories.length > 0 && (
            <div>
              <h2 className="font-heading uppercase text-grey-dark font-semibold text-lg mb-3">
                Accessoires disponibles
              </h2>
              <div className="flex flex-wrap gap-2">
                {machine.accessories.map((accessory) => (
                  <span
                    key={accessory}
                    className="bg-gold/10 text-grey-dark border border-gold/30 font-body text-sm px-3 py-1"
                  >
                    {accessory}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Devis CTA — PROD-05 */}
          <div className="mt-2">
            <Link
              href={`/contact?machine=${machine.slug}`}
              className="flex items-center justify-center w-full md:w-auto bg-orange text-white font-heading uppercase text-lg px-8 py-4 hover:bg-orange/90 transition-colors tracking-wide"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
