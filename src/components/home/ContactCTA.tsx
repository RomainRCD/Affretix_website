import { Button } from '@/components/ui/Button'

export function ContactCTA() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading text-4xl font-bold text-grey-dark uppercase tracking-wide mb-4">
          Un projet ? Parlons-en.
        </h2>
        <p className="font-body text-lg text-grey-dark/60 mb-8 leading-relaxed">
          Décrivez votre besoin et recevez un devis personnalisé sous 24h. Toutes nos prestations incluent un opérateur qualifié.
        </p>
        <Button href="/contact" variant="primary" className="text-base px-8 py-4">
          Demander un devis gratuit
        </Button>
      </div>
    </section>
  )
}
