import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { machines } from '@/data/machines'
import { machineFamilies } from '@/data/families'
import { ProductQuoteForm } from '@/components/catalogue/ProductQuoteForm'

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
    title: `Location ${machine.name} avec chauffeur | ${family?.name ?? ''} | Affretix`,
    description: `Louez un ${machine.name.toLowerCase()} avec opérateur qualifié. ${machine.description} Devis gratuit sous 24 h.`,
  }
}

const reassurance = [
  {
    icon: (
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 0c-3.3 0-6 2-6 5m12 0c0-1.6-.8-2.9-2-3.8" />
    ),
    title: 'Chauffeur inclus',
    text: "Opérateur qualifié, productif dès l'arrivée. Aucun permis requis de votre côté.",
  },
  {
    icon: <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />,
    title: 'Intervention rapide',
    text: 'Devis sous 24 h et mise à disposition rapide sur toute la région.',
    gold: false,
  },
  {
    icon: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Z" />
        <path d="M20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
        <path d="M18 18a3 3 0 0 1-3 3h-2" />
      </>
    ),
    title: 'Un seul interlocuteur',
    text: 'Un contact dédié de la demande de devis à la fin de votre chantier.',
    gold: false,
  },
]

export default async function MachinePage({
  params,
}: {
  params: Promise<{ slug: string; machineSlug: string }>
}) {
  const { slug, machineSlug } = await params
  const machine = machines.find((m) => m.slug === machineSlug && m.familySlug === slug)
  if (!machine) notFound()

  const family = machineFamilies.find((f) => f.slug === slug)
  const nameLower = machine.name.toLowerCase()

  // Regroupe les variantes par tonnage : "18 t" et "18 t + balayeuse avant"
  // deviennent un seul bloc "18 t" portant l'option en pastille.
  const capacities = machine.variants.reduce<{ label: string; options: string[] }[]>(
    (acc, v) => {
      const existing = acc.find((c) => c.label === v.label)
      if (existing) {
        if (v.detail) existing.options.push(v.detail)
      } else {
        acc.push({ label: v.label, options: v.detail ? [v.detail] : [] })
      }
      return acc
    },
    [],
  )

  const useCases = [
    `Transport et manutention sur chantier — ${family?.name.toLowerCase() ?? 'BTP'}`,
    'Approvisionnement et évacuation de matériaux',
    'Rotation sur gros volumes et délais serrés',
    'Travaux ponctuels sans immobiliser votre propre matériel',
  ]

  const faq = [
    {
      q: 'Le chauffeur est-il vraiment inclus ?',
      a: "Oui, chaque location se fait avec un opérateur qualifié. Vous n'avez ni permis ni manœuvre à gérer.",
    },
    {
      q: 'Quel délai pour obtenir la machine ?',
      a: 'Devis sous 24 h, puis mise à disposition selon disponibilité — généralement très rapide.',
    },
    {
      q: 'Sur quelle zone intervenez-vous ?',
      a: 'Toute la région. Indiquez votre zone de chantier dans la demande de devis.',
    },
  ]

  return (
    <main>
      <section className="bg-grey-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pb-16">
          <nav className="flex items-center gap-2 font-body text-xs text-white/40 mb-6">
            <Link href="/catalogue" className="hover:text-orange transition-colors">Catalogue</Link>
            <span>/</span>
            <Link href={`/catalogue/${slug}`} className="hover:text-orange transition-colors">{family?.name ?? slug}</Link>
            <span>/</span>
            <span className="text-white/70">{machine.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <span className="inline-flex items-center gap-2 border border-orange/40 bg-orange/10 text-orange px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-orange block" />
                Toujours avec opérateur qualifié
              </span>

              <h1 className="font-heading font-bold uppercase leading-[1.05] text-4xl sm:text-5xl mt-4 mb-3">
                Location de {machine.name}
                <br />
                <span className="text-orange">avec chauffeur</span>
              </h1>

              <p className="font-body text-base text-white/75 max-w-md mb-6">
                {machine.description} Livré avec son conducteur expérimenté — sans permis ni logistique à gérer.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2.5 font-body text-sm">
                <span className="flex items-center gap-2"><Dot /> Opérateur inclus</span>
                <span className="flex items-center gap-2"><Dot /> Devis sous 24 h</span>
              </div>

              <div className="mt-6 border border-dashed border-white/15 rounded-lg h-28 flex items-center justify-center text-white/30 font-body text-xs uppercase tracking-widest">
                Visuel {nameLower} — à venir
              </div>
            </div>

            <div className="lg:sticky lg:top-6">
              <ProductQuoteForm machineName={machine.name} variants={machine.variants} />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-grey-dark/10">
        <h2 className="font-heading font-bold uppercase tracking-wide text-2xl sm:text-3xl">Capacités disponibles</h2>
        <p className="font-body text-sm text-grey-dark/60 mt-1 mb-6 max-w-2xl">
          Profondeur de gamme — on positionne la bonne machine selon votre tonnage et vos besoins.
        </p>
        {capacities.length > 0 ? (
          <div className="flex flex-wrap gap-3 items-stretch">
            {capacities.map((c, i) => (
              <div
                key={`${c.label}-${i}`}
                className="flex flex-col justify-center gap-2.5 border border-grey-dark/10 rounded-xl px-6 py-4"
              >
                <p className="font-heading font-bold text-3xl text-grey-dark leading-none">{c.label}</p>
                {c.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {c.options.map((o, j) => (
                      <span
                        key={j}
                        className="font-body text-[13px] font-medium text-orange-dark bg-orange/10 px-2.5 py-1 rounded-full"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-sm text-grey-dark/60">Accessoire disponible à la demande pour vos engins.</p>
        )}
      </section>

      <section className="bg-[#FBEEE2] border-b border-grey-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-heading font-bold uppercase tracking-wide text-2xl sm:text-3xl mb-6">Pourquoi Affretix</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {reassurance.map((r) => (
              <div key={r.title}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`w-7 h-7 ${r.gold ? 'stroke-gold' : 'stroke-orange'}`} aria-hidden="true">
                  {r.icon}
                </svg>
                <p className="font-heading font-semibold uppercase text-base mt-2 mb-1">{r.title}</p>
                <p className="font-body text-sm text-grey-dark/60">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-grey-dark/10">
        <h2 className="font-heading font-bold uppercase tracking-wide text-2xl sm:text-3xl mb-5">Cas d&apos;usage</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {useCases.map((u) => (
            <div key={u} className="flex gap-3 items-start">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-orange mt-1 shrink-0" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-body text-sm text-grey-dark/80">{u}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FBEEE2] border-b border-grey-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-heading font-bold uppercase tracking-wide text-2xl sm:text-3xl mb-5">Questions fréquentes</h2>
          <div className="flex flex-col gap-2.5 max-w-3xl">
            {faq.map((f) => (
              <div key={f.q} className="border border-grey-dark/10 rounded-lg p-4 bg-white">
                <p className="font-body font-semibold text-sm">{f.q}</p>
                <p className="font-body text-sm text-grey-dark/60 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grey-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="font-heading font-bold uppercase tracking-wide text-3xl sm:text-4xl mb-2">
            Besoin d&apos;un {nameLower} avec chauffeur&nbsp;?
          </h2>
          <p className="font-body text-white/70 mb-6">Devis gratuit sous 24 h, sans engagement.</p>
          <a
            href="#devis"
            className="inline-block bg-orange text-white px-8 py-4 font-heading font-semibold uppercase tracking-wide text-lg hover:bg-orange/90 transition-colors"
          >
            Demander mon devis
          </a>
        </div>
      </section>
    </main>
  )
}

function Dot({ gold = false }: { gold?: boolean }) {
  return <span className={`w-1.5 h-1.5 rounded-full block ${gold ? 'bg-gold' : 'bg-orange'}`} />
}
