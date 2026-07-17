// src/data/machines.ts
// Données : src/data/machines.json — SOURCE UNIQUE, éditée par l'outil Site de Pilot.
// Ce fichier ne garde que le typage et les helpers. Ne pas remettre les données ici.

export type MachineVariant = {
  /** e.g. "10 t", "800 L", "9 roues · 175 cm" */
  label: string
  /** Optional additional detail (model code, note) */
  detail?: string
}

export type Machine = {
  /** URL-safe slug for /catalogue/[family]/[machine] route */
  slug: string
  /** Display name */
  name: string
  /** Must match a slug in machineFamilies */
  familySlug: string
  /** One-sentence description */
  description: string
  /** Available size/capacity variants (profondeur de gamme) */
  variants: MachineVariant[]
  /** Available accessories */
  accessories?: string[]
  /** Manufacturer/self-hosted image URL (added later) */
  imageUrl?: string
}

// Helper: get all machines for a given family slug
export function getMachinesByFamily(familySlug: string): Machine[] {
  return machines.filter((m) => m.familySlug === familySlug)
}

import MACHINES_DATA from './machines.json'

export const machines: Machine[] = MACHINES_DATA as Machine[]
