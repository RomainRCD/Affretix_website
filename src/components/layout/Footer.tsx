// src/components/layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-grey-dark text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand column */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-affretix-blanc.png"
              alt="Affretix — Location de matériel avec chauffeur"
              className="h-14 w-auto mb-3"
            />
            <p className="font-body text-sm leading-relaxed">
              Location de matériel BTP avec chauffeur. Toutes nos prestations sont réalisées avec un opérateur qualifié.
            </p>
          </div>

          {/* Catalogue links */}
          <div>
            <p className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Catalogue
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogue/terrassement" className="font-body text-sm hover:text-orange transition-colors">
                  Terrassement
                </Link>
              </li>
              <li>
                <Link href="/catalogue/transport-et-voirie" className="font-body text-sm hover:text-orange transition-colors">
                  Transport et voirie
                </Link>
              </li>
              <li>
                <Link href="/catalogue/compactage" className="font-body text-sm hover:text-orange transition-colors">
                  Compactage
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="font-body text-sm text-orange hover:text-orange/80 transition-colors">
                  Voir tout le catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + legal */}
          <div>
            <p className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="font-body text-sm hover:text-orange transition-colors">
                  Demander un devis
                </Link>
              </li>
            </ul>
            <div className="mt-6 space-y-1">
              <Link href="/mentions-legales" className="font-body text-xs block hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="font-body text-xs block hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs">
            &copy; {currentYear} Affretix. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
