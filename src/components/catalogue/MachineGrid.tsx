"use client"
import { motion } from "motion/react"
import type { Machine } from '@/data/machines'
import { MachineCard } from './MachineCard'

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

export function MachineGrid({ machines }: { machines: Machine[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10"
      variants={containerVariants}
      initial="visible"
      animate="visible"
    >
      {machines.map((machine) => (
        <motion.div key={machine.slug} variants={itemVariants}>
          <MachineCard machine={machine} />
        </motion.div>
      ))}
    </motion.div>
  )
}
