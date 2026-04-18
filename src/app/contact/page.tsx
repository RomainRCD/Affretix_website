// src/app/contact/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Demander un devis — Affretix',
  description: 'Contactez Affretix pour une demande de devis de location de matériel BTP avec chauffeur.',
}

export default function ContactPage() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-heading text-4xl font-bold text-grey-dark uppercase tracking-wide mb-4">
          Demander un devis
        </h1>
        <p className="font-body text-lg text-grey-dark/70 mb-8">
          Notre formulaire de contact est en cours de déploiement. Pour toute demande urgente, contactez-nous directement.
        </p>
        <Link
          href="/"
          className="inline-block font-body text-sm bg-orange text-white px-6 py-3 font-semibold hover:bg-orange/90 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  )
}
