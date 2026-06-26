// src/components/layout/Header.tsx
import Link from 'next/link'
import { machineFamilies } from '@/data/families'

export function Header() {
  return (
    <header className="bg-grey-dark text-white">
      {/* Top bar: brand + CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center" aria-label="Affretix — accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-affretix-blanc-compact.png"
            alt="Affretix — Location de matériel avec chauffeur"
            className="h-9 w-auto"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/catalogue"
            className="font-body text-sm text-white/80 hover:text-orange transition-colors"
          >
            Catalogue
          </Link>
          <Link
            href="/contact"
            className="font-body text-sm bg-orange text-white px-4 py-2 font-semibold hover:bg-orange/90 transition-colors"
          >
            Demander un devis
          </Link>
        </nav>
        {/* Mobile: just show "Catalogue" link for now — mobile nav expansion is Phase 2 */}
        <nav className="lg:hidden flex items-center gap-4">
          <Link href="/catalogue" className="font-body text-sm text-white/80 hover:text-orange transition-colors">
            Catalogue
          </Link>
          <Link href="/contact" className="font-body text-sm bg-orange text-white px-3 py-1.5 text-xs font-semibold">
            Devis
          </Link>
        </nav>
      </div>

      {/* Family nav bar — desktop only, all families */}
      <nav className="hidden lg:block border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 overflow-x-auto">
            {machineFamilies.map((family) => (
              <li key={family.slug}>
                <Link
                  href={`/catalogue/${family.slug}`}
                  className="font-body text-xs text-white/70 hover:text-orange px-3 py-3 block whitespace-nowrap transition-colors"
                >
                  {family.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
