'use client'
import { useState } from 'react'

type Fields = { nom: string; telephone: string; email: string; description: string }

export function ProductQuoteForm({ machineName }: { machineName: string }) {
  const [data, setData] = useState<Fields>({ nom: '', telephone: '', email: '', description: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.nom.trim() || !data.telephone.trim() || !data.email.trim()) {
      setError('Nom, téléphone et email sont requis.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError('Adresse email invalide.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: data.nom,
          telephone: data.telephone,
          email: data.email,
          machine: machineName,
          description: data.description.trim() || `Demande de devis — ${machineName}`,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Une erreur s'est produite. Réessayez.")
        setSubmitting(false)
        return
      }
      setSubmitted(true)
      setSubmitting(false)
    } catch {
      setError('Impossible de joindre le serveur. Réessayez.')
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white text-grey-dark rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-heading font-bold text-xl uppercase tracking-wide">Demande envoyée</p>
        <p className="font-body text-sm text-grey-dark/60 mt-1">
          Notre équipe vous recontacte sous 24 h pour votre {machineName.toLowerCase()}.
        </p>
      </div>
    )
  }

  return (
    <form
      id="devis"
      onSubmit={handleSubmit}
      noValidate
      className="bg-white text-grey-dark rounded-xl p-5"
    >
      <p className="font-heading font-bold uppercase tracking-wide text-xl">Votre devis gratuit</p>
      <p className="font-body text-xs text-grey-dark/60 mb-4">Réponse sous 24 h, sans engagement.</p>
      <div className="flex flex-col gap-2.5">
        <input
          name="nom"
          value={data.nom}
          onChange={handleChange}
          placeholder="Nom"
          className="h-10 border border-grey-dark/15 rounded-md px-3 font-body text-sm focus:outline-none focus:border-orange"
        />
        <input
          name="telephone"
          type="tel"
          value={data.telephone}
          onChange={handleChange}
          placeholder="Téléphone"
          className="h-10 border border-grey-dark/15 rounded-md px-3 font-body text-sm focus:outline-none focus:border-orange"
        />
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          className="h-10 border border-grey-dark/15 rounded-md px-3 font-body text-sm focus:outline-none focus:border-orange"
        />
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={2}
          placeholder="Votre chantier (lieu, durée, besoin)…"
          className="border border-grey-dark/15 rounded-md px-3 py-2 font-body text-sm resize-none focus:outline-none focus:border-orange"
        />
        {error && (
          <p role="alert" className="font-body text-xs text-red-600">{error}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-orange text-white h-12 rounded-md font-heading font-semibold uppercase tracking-wide text-base hover:bg-orange/90 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Envoi…' : 'Recevoir mon devis'}
        </button>
      </div>
      <p className="font-body text-[11px] text-grey-dark/40 mt-2.5 text-center">
        {machineName} · pré-rempli automatiquement
      </p>
    </form>
  )
}
