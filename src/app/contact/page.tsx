import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DevisForm } from '@/components/contact/DevisForm'

export const metadata: Metadata = {
  title: 'Demander un devis — Affretix',
  description:
    'Contactez Affretix pour une demande de devis de location de matériel BTP avec chauffeur/opérateur.',
}

export default function ContactPage() {
  return (
    <main className="bg-white py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-10 text-center">
          <p className="font-heading text-sm font-semibold text-orange uppercase tracking-widest mb-3">
            Devis gratuit · Sous 24h
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-grey-dark uppercase tracking-wide leading-tight mb-4">
            Demander un devis
          </h1>
          <p className="font-body text-base text-grey-dark/60 max-w-lg mx-auto">
            Remplissez le formulaire ci-dessous. Notre équipe vous recontacte rapidement pour établir une offre adaptée à votre chantier.
          </p>
        </div>

        {/* Form — Suspense required for useSearchParams in Next.js 15 */}
        <Suspense
          fallback={
            <div className="py-12 text-center font-body text-sm text-grey-dark/40">
              Chargement du formulaire...
            </div>
          }
        >
          <DevisForm />
        </Suspense>
      </div>
    </main>
  )
}
