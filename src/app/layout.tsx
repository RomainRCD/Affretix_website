import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import MACHINES_DATA from '@/data/machines.json'
import { machineFamilies } from '@/data/families'

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// Chiffres dérivés de machines.json — ne jamais remettre de compteur en dur.
const totalEngins = (MACHINES_DATA as { variants?: unknown[] }[]).reduce(
  (n, m) => n + (m.variants?.length ?? 0),
  0,
)
const familiesLine = machineFamilies.map((f) => f.name.toLowerCase()).join(', ')

export const metadata: Metadata = {
  title: 'Affretix — Location de matériel BTP avec chauffeur',
  description: `Louez votre engin de chantier avec opérateur qualifié. ${totalEngins} engins : ${familiesLine}.`,
  // GARDE-FOU : site non public pour l'instant — à retirer au lancement officiel.
  robots: { index: false, follow: false },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
