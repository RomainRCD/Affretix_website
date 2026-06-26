"use client"
import { motion } from "motion/react"
import type { MachineFamily } from '@/data/families'
import { FamilyCard } from './FamilyCard'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

export function FamilyGrid({ families }: { families: MachineFamily[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="visible"
      animate="visible"
    >
      {families.map((family) => (
        <motion.div key={family.slug} variants={itemVariants}>
          <FamilyCard family={family} />
        </motion.div>
      ))}
    </motion.div>
  )
}
// deploy landing produit
