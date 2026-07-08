const stats = [
  {
    value: '142',
    label: 'Engins disponibles',
    description: 'Terrassement, transport et voirie, compactage',
  },
  {
    value: '100%',
    label: 'Avec opérateur',
    description: 'Chaque machine est livrée avec un chauffeur qualifié',
  },
  {
    value: 'Groupe LEVA',
    label: 'Votre garant',
    description: "Filiale d'un groupe régional reconnu dans le BTP",
  },
]

export function Reassurance() {
  return (
    <section className="bg-grey-dark py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="font-heading text-5xl font-bold text-orange mb-1 uppercase">
                {stat.value}
              </p>
              <p className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
