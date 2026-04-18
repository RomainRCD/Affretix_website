'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

interface FormData {
  nom: string
  entreprise: string
  telephone: string
  email: string
  machine: string
  duree: string
  lieu: string
  description: string
}

interface FormErrors {
  nom?: string
  telephone?: string
  email?: string
  description?: string
}

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

const successVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

export function DevisForm() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState<FormData>({
    nom: '',
    entreprise: '',
    telephone: '',
    email: '',
    machine: '',
    duree: '',
    lieu: '',
    description: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Pre-fill machine field from ?machine= URL param (FORM-02)
  useEffect(() => {
    const machineParam = searchParams.get('machine')
    if (machineParam) {
      setFormData((prev) => ({ ...prev, machine: machineParam }))
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.nom.trim()) newErrors.nom = 'Votre nom est requis'
    if (!formData.telephone.trim()) newErrors.telephone = 'Votre téléphone est requis'
    if (!formData.email.trim()) {
      newErrors.email = 'Votre email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide'
    }
    if (!formData.description.trim()) newErrors.description = 'Veuillez décrire vos travaux'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // STUB: Plan 02 will replace this with fetch('/api/contact', ...)
    console.log('Form data:', formData)
    await new Promise((r) => setTimeout(r, 600)) // Simulate network latency
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <SuccessPanel key="success" />
      ) : (
        <motion.form
          key="form"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
          {/* Section 1: Vos coordonnées */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold text-grey-dark uppercase tracking-widest mb-2">
              Vos coordonnées
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Nom *" error={errors.nom}>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className={inputClass(!!errors.nom)}
                />
              </FormField>
              <FormField label="Entreprise" error={undefined}>
                <input
                  type="text"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  placeholder="BTP Martin SAS"
                  className={inputClass(false)}
                />
              </FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Téléphone *" error={errors.telephone}>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="06 12 34 56 78"
                  className={inputClass(!!errors.telephone)}
                />
              </FormField>
              <FormField label="Email *" error={errors.email}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean@btpmartin.fr"
                  className={inputClass(!!errors.email)}
                />
              </FormField>
            </div>
          </fieldset>

          {/* Divider */}
          <hr className="border-grey-dark/10" />

          {/* Section 2: Votre besoin */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold text-grey-dark uppercase tracking-widest mb-2">
              Votre besoin
            </legend>
            <FormField label="Type de machine" error={undefined}>
              <input
                type="text"
                name="machine"
                value={formData.machine}
                onChange={handleChange}
                placeholder="ex : pelle-hydraulique"
                className={inputClass(false)}
              />
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Durée estimée" error={undefined}>
                <input
                  type="text"
                  name="duree"
                  value={formData.duree}
                  onChange={handleChange}
                  placeholder="ex : 3 jours, 2 semaines"
                  className={inputClass(false)}
                />
              </FormField>
              <FormField label="Lieu de chantier" error={undefined}>
                <input
                  type="text"
                  name="lieu"
                  value={formData.lieu}
                  onChange={handleChange}
                  placeholder="Ville ou code postal"
                  className={inputClass(false)}
                />
              </FormField>
            </div>
            <FormField label="Description des travaux *" error={errors.description}>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Décrivez brièvement les travaux à réaliser, le type de terrain, les contraintes d'accès..."
                className={inputClass(!!errors.description) + ' resize-none'}
              />
            </FormField>
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange text-white font-heading font-semibold text-base uppercase tracking-wider px-8 py-4 hover:bg-orange/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

function inputClass(hasError: boolean): string {
  return [
    'w-full font-body text-sm text-grey-dark bg-white border px-4 py-3',
    'placeholder:text-grey-dark/40 focus:outline-none focus:ring-2 focus:ring-orange/50',
    'transition-colors',
    hasError ? 'border-red-500' : 'border-grey-dark/20 focus:border-orange',
  ].join(' ')
}

function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-sm font-medium text-grey-dark">{label}</label>
      {children}
      {error && (
        <p className="font-body text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

function SuccessPanel() {
  return (
    <motion.div
      variants={successVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center text-center py-16 px-6 gap-6"
    >
      {/* Icon: checkmark circle in orange */}
      <div className="w-16 h-16 rounded-full bg-orange flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="font-heading text-3xl font-bold text-grey-dark uppercase tracking-wide">
        Demande envoyée !
      </h2>
      <p className="font-body text-base text-grey-dark/70 max-w-sm">
        Merci pour votre demande. Notre équipe vous contactera dans les plus brefs délais pour établir votre devis.
      </p>
      <Link
        href="/catalogue"
        className="inline-block font-body text-sm font-semibold text-orange border border-orange px-6 py-3 hover:bg-orange hover:text-white transition-colors"
      >
        Retour au catalogue
      </Link>
    </motion.div>
  )
}
