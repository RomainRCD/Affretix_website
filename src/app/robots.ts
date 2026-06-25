import type { MetadataRoute } from 'next'

// GARDE-FOU : interdit tout crawl tant que le site n'est pas public.
// À RETIRER (ou passer en allow) au lancement officiel.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
