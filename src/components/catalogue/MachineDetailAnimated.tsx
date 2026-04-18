'use client'
import { motion } from 'motion/react'

// Stagger container for the right-hand content column
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

// Standard item: fade + slide up
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

// Badge: slightly more dramatic entrance (scale from 0.9)
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

// CTA: pulse-fade entrance
const ctaVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.1 } },
}

export function MachineDetailAnimated({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export function AnimatedBadge({ children }: { children: React.ReactNode }) {
  return <motion.div variants={badgeVariants}>{children}</motion.div>
}

export function AnimatedCTA({ children }: { children: React.ReactNode }) {
  return <motion.div variants={ctaVariants}>{children}</motion.div>
}
