import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Canonique = www.affretix.fr. L'apex affretix.fr est redirigé en 301 vers www.
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')
  if (host === 'affretix.fr') {
    const url = new URL(request.url)
    url.protocol = 'https:'
    url.host = 'www.affretix.fr'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = {
  // S'exécute sur toutes les routes sauf les assets internes Next.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
