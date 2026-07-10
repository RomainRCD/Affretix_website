'use client'
import { useState, useRef, useEffect } from 'react'

type Variant = { label: string; detail?: string }

type FormData = {
  materiel: string
  siret: string
  entreprise: string
  adresseEntreprise: string
  cpEntreprise: string
  villeEntreprise: string
  nom: string
  prenom: string
  email: string
  telephone: string
  dateDebut: string
  dateFin: string
  adresseChantier: string
  cpChantier: string
  villeChantier: string
  commentaire: string
}

const STEP_LABELS = ['Matériel', 'Contact', 'Chantier']

const getToday = () => new Date().toISOString().split('T')[0]
const isSiretFormat = (v: string) => /^\d{9}$|^\d{14}$/.test(v.replace(/\s/g, ''))
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const telOk = (v: string) => /^[\d\s]{10,}$/.test(v.replace(/\s/g, ''))
const cpOk = (v: string) => /^\d{5}$/.test(v.replace(/\s/g, ''))

// Enrichissement via l'API publique Recherche d'entreprises (annuaire SIRENE)
async function fetchCompanyBySiret(siret: string) {
  const clean = siret.replace(/\s/g, '')
  try {
    const res = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(clean)}`,
      { headers: { Accept: 'application/json' } },
    )
    if (!res.ok) return null
    const data = await res.json()
    const c = data.results?.[0]
    if (!c) return null
    return {
      nom_complet: c.nom_complet ?? '',
      adresse: c.siege?.adresse ?? '',
      code_postal: c.siege?.code_postal ?? '',
      ville: c.siege?.libelle_commune ?? '',
    }
  } catch {
    return null
  }
}

const inputClass =
  'h-10 w-full border border-grey-dark/15 rounded-md px-3 font-body text-sm focus:outline-none focus:border-orange'

export function ProductQuoteForm({
  machineName,
  variants = [],
}: {
  machineName: string
  variants?: Variant[]
}) {
  const materielOptions = variants.map(
    (v) => `${machineName} ${v.label}${v.detail ? ` ${v.detail}` : ''}`,
  )

  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    materiel: variants.length > 0 ? '' : machineName,
    siret: '',
    entreprise: '',
    adresseEntreprise: '',
    cpEntreprise: '',
    villeEntreprise: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateDebut: '',
    dateFin: '',
    adresseChantier: '',
    cpChantier: '',
    villeChantier: '',
    commentaire: '',
  })

  const [siretSearching, setSiretSearching] = useState(false)
  const [siretVerified, setSiretVerified] = useState(false)
  const [siretError, setSiretError] = useState('')
  const siretTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => () => { if (siretTimer.current) clearTimeout(siretTimer.current) }, [])

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSiret = (value: string) => {
    const sanitized = value.replace(/[^\d\s]/g, '')
    set('siret', sanitized)
    setSiretError('')
    if (siretTimer.current) clearTimeout(siretTimer.current)

    const clean = sanitized.replace(/\s/g, '')
    if (!clean) { setSiretVerified(false); setSiretSearching(false); return }
    if (!isSiretFormat(clean)) {
      setSiretVerified(false)
      setSiretSearching(false)
      if (clean.length >= 9) setSiretError('Le SIRET doit contenir 9 ou 14 chiffres')
      return
    }

    setSiretSearching(true)
    setSiretVerified(false)
    siretTimer.current = setTimeout(async () => {
      const company = await fetchCompanyBySiret(clean)
      if (company) {
        setForm((prev) => ({
          ...prev,
          entreprise: company.nom_complet,
          adresseEntreprise: company.adresse,
          cpEntreprise: company.code_postal,
          villeEntreprise: company.ville,
        }))
        setSiretVerified(true)
        setSiretError('')
      } else {
        setSiretError('SIRET non trouvé — saisissez le nom manuellement')
      }
      setSiretSearching(false)
    }, 500)
  }

  const step1Ok = form.materiel.trim() !== '' && form.entreprise.trim() !== ''
  const step2Ok =
    form.nom.trim() !== '' &&
    form.prenom.trim() !== '' &&
    emailOk(form.email) &&
    telOk(form.telephone)
  const step3Ok =
    form.dateDebut !== '' &&
    form.dateFin !== '' &&
    form.dateFin >= form.dateDebut &&
    cpOk(form.cpChantier) &&
    form.villeChantier.trim() !== ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitState === 'sending' || !step3Ok) return
    setSubmitState('sending')
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materiel: form.materiel,
          siret: form.siret,
          entreprise: form.entreprise,
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          telephone: form.telephone,
          dateDebut: form.dateDebut,
          dateFin: form.dateFin,
          adresseChantier: form.adresseChantier,
          cpChantier: form.cpChantier,
          villeChantier: form.villeChantier,
          commentaire: form.commentaire,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Une erreur s'est produite. Réessayez.")
        setSubmitState('error')
        return
      }
      setSubmitState('sent')
    } catch {
      setError('Impossible de joindre le serveur. Réessayez.')
      setSubmitState('error')
    }
  }

  if (submitState === 'sent') {
    return (
      <div id="devis" className="bg-white text-grey-dark rounded-xl p-6 text-center">
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
    <form id="devis" onSubmit={handleSubmit} noValidate className="bg-white text-grey-dark rounded-xl p-5">
      <p className="font-heading font-bold uppercase tracking-wide text-xl">Votre devis gratuit</p>
      <p className="font-body text-xs text-grey-dark/60 mb-4">Réponse sous 24 h, sans engagement.</p>

      {/* Indicateur d'étapes — 3 segments */}
      <div className="flex gap-1.5 mb-5">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1
          return (
            <div key={label} className="flex-1 flex flex-col gap-1">
              <span className={`h-1 rounded-full ${step >= n ? 'bg-orange' : 'bg-grey-dark/15'}`} />
              <span className={`font-body text-[10px] uppercase tracking-wide ${step >= n ? 'text-orange font-semibold' : 'text-grey-dark/40'}`}>
                {n}. {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* ÉTAPE 1 — Produit & société */}
      {step === 1 && (
        <div className="flex flex-col gap-2.5">
          <label className="font-body text-xs font-semibold text-grey-dark/70">Matériel souhaité</label>
          {variants.length > 0 ? (
            <select
              value={form.materiel}
              onChange={(e) => set('materiel', e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>Choisir la capacité</option>
              {materielOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input value={form.materiel} readOnly className={`${inputClass} bg-grey-dark/5`} />
          )}

          <label className="font-body text-xs font-semibold text-grey-dark/70 mt-1">
            N° SIRET <span className="font-normal text-grey-dark/40">(optionnel — recommandé)</span>
          </label>
          <div className="relative">
            <input
              value={form.siret}
              onChange={(e) => handleSiret(e.target.value)}
              inputMode="numeric"
              maxLength={20}
              placeholder="Ex : 443 061 841 00047"
              className={`${inputClass} pr-9 font-mono ${siretError ? 'border-red-500' : ''}`}
            />
            {siretSearching && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-orange border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            )}
            {!siretSearching && siretVerified && (
              <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          {siretError && <p className="font-body text-xs text-red-600">{siretError}</p>}
          {siretVerified && form.entreprise && (
            <div className="bg-green-600/5 border border-green-600/20 rounded-md p-2.5">
              <p className="font-body text-sm font-semibold">{form.entreprise}</p>
              <p className="font-body text-xs text-grey-dark/50 mt-0.5">
                {form.adresseEntreprise && `${form.adresseEntreprise}, `}{form.cpEntreprise} {form.villeEntreprise}
              </p>
            </div>
          )}

          <label className="font-body text-xs font-semibold text-grey-dark/70 mt-1">Nom de l&apos;entreprise</label>
          <input
            value={form.entreprise}
            onChange={(e) => set('entreprise', e.target.value)}
            readOnly={siretVerified}
            placeholder="Votre société"
            className={`${inputClass} ${siretVerified ? 'bg-grey-dark/5' : ''}`}
          />

          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!step1Ok}
            className="bg-orange text-white h-12 rounded-md font-heading font-semibold uppercase tracking-wide text-base hover:bg-orange/90 transition-colors disabled:opacity-40 mt-2"
          >
            Continuer
          </button>
          <p className="font-body text-[11px] text-grey-dark/40 text-center">Service réservé aux professionnels</p>
        </div>
      )}

      {/* ÉTAPE 2 — Contact */}
      {step === 2 && (
        <div className="flex flex-col gap-2.5">
          {form.entreprise && (
            <div className="bg-grey-dark/5 rounded-md p-2.5">
              <p className="font-body text-[11px] text-grey-dark/50">Entreprise</p>
              <p className="font-body text-sm font-semibold">{form.entreprise}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="font-body text-xs font-semibold text-grey-dark/70">Nom</label>
              <input value={form.nom} onChange={(e) => set('nom', e.target.value)} autoComplete="family-name" placeholder="Dupont" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body text-xs font-semibold text-grey-dark/70">Prénom</label>
              <input value={form.prenom} onChange={(e) => set('prenom', e.target.value)} autoComplete="given-name" placeholder="Jean" className={inputClass} />
            </div>
          </div>
          <label className="font-body text-xs font-semibold text-grey-dark/70">E-mail professionnel</label>
          <input value={form.email} onChange={(e) => set('email', e.target.value)} type="email" autoComplete="email" placeholder="email@entreprise.fr" className={inputClass} />
          <label className="font-body text-xs font-semibold text-grey-dark/70">Téléphone</label>
          <input value={form.telephone} onChange={(e) => set('telephone', e.target.value)} type="tel" autoComplete="tel" placeholder="06 XX XX XX XX" className={inputClass} />

          <div className="flex gap-2.5 mt-2">
            <button type="button" onClick={() => setStep(1)} className="flex-1 border border-grey-dark/20 text-grey-dark h-12 rounded-md font-heading font-semibold uppercase tracking-wide text-sm hover:border-orange transition-colors">
              Retour
            </button>
            <button type="button" onClick={() => setStep(3)} disabled={!step2Ok} className="flex-1 bg-orange text-white h-12 rounded-md font-heading font-semibold uppercase tracking-wide text-sm hover:bg-orange/90 transition-colors disabled:opacity-40">
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 — Chantier */}
      {step === 3 && (
        <div className="flex flex-col gap-2.5">
          <div className="bg-grey-dark/5 rounded-md p-2.5">
            <p className="font-body text-sm font-semibold truncate">{form.materiel}</p>
            <p className="font-body text-[11px] text-grey-dark/50 truncate">{form.entreprise} · {form.prenom} {form.nom}</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="font-body text-xs font-semibold text-grey-dark/70">Date début</label>
              <input value={form.dateDebut} onChange={(e) => set('dateDebut', e.target.value)} type="date" min={getToday()} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body text-xs font-semibold text-grey-dark/70">Date fin</label>
              <input value={form.dateFin} onChange={(e) => set('dateFin', e.target.value)} type="date" min={form.dateDebut || getToday()} className={inputClass} />
            </div>
          </div>
          <label className="font-body text-xs font-semibold text-grey-dark/70">Adresse du chantier <span className="font-normal text-grey-dark/40">(optionnel)</span></label>
          <input value={form.adresseChantier} onChange={(e) => set('adresseChantier', e.target.value)} placeholder="12 rue de la Paix" className={inputClass} />
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="font-body text-xs font-semibold text-grey-dark/70">Code postal</label>
              <input value={form.cpChantier} onChange={(e) => set('cpChantier', e.target.value)} inputMode="numeric" maxLength={5} placeholder="75001" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body text-xs font-semibold text-grey-dark/70">Ville</label>
              <input value={form.villeChantier} onChange={(e) => set('villeChantier', e.target.value)} placeholder="Paris" className={inputClass} />
            </div>
          </div>
          <label className="font-body text-xs font-semibold text-grey-dark/70">Commentaire <span className="font-normal text-grey-dark/40">(optionnel)</span></label>
          <textarea value={form.commentaire} onChange={(e) => set('commentaire', e.target.value)} rows={2} placeholder="Accès, contraintes horaires, besoins spécifiques…" className="w-full border border-grey-dark/15 rounded-md px-3 py-2 font-body text-sm resize-none focus:outline-none focus:border-orange" />

          {error && <p role="alert" className="font-body text-xs text-red-600">{error}</p>}

          <div className="flex gap-2.5 mt-2">
            <button type="button" onClick={() => setStep(2)} className="flex-1 border border-grey-dark/20 text-grey-dark h-12 rounded-md font-heading font-semibold uppercase tracking-wide text-sm hover:border-orange transition-colors">
              Retour
            </button>
            <button type="submit" disabled={submitState === 'sending' || !step3Ok} className="flex-1 bg-orange text-white h-12 rounded-md font-heading font-semibold uppercase tracking-wide text-sm hover:bg-orange/90 transition-colors disabled:opacity-40">
              {submitState === 'sending' ? 'Envoi…' : 'Envoyer'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
