"use client"
import { motion } from "motion/react"
import { Button } from "@/components/ui/Button"
import MACHINES_DATA from "@/data/machines.json"
import { machineFamilies } from "@/data/families"

// Chiffres dérivés de machines.json — ne jamais remettre de compteur en dur.
const totalEngins = (MACHINES_DATA as { variants?: unknown[] }[]).reduce(
  (n, m) => n + (m.variants?.length ?? 0),
  0,
)
const familiesRaw = machineFamilies.map((f) => f.name).join(", ")
const familiesLine = familiesRaw.charAt(0) + familiesRaw.slice(1).toLowerCase()

export function Hero() {
  return (
    <section className="relative bg-grey-dark text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-grey-dark via-grey-dark to-black/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        {/* Operator badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-orange/10 border border-orange/30 px-3 py-1 mb-6"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="w-2 h-2 rounded-full bg-orange block" />
          <span className="font-body text-xs text-orange uppercase tracking-widest font-semibold">
            Toujours avec opérateur qualifié
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight tracking-wide mb-4"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Location de matériel BTP
          <br />
          <span className="text-orange">avec chauffeur</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-body text-lg sm:text-xl text-white/75 max-w-2xl mb-8 leading-relaxed"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {totalEngins} engins disponibles. {familiesLine}.
          Présents sur toute la région.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Button href="/contact" variant="primary">
            Demander un devis
          </Button>
          <Button href="/catalogue" variant="secondary">
            Voir le catalogue
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
