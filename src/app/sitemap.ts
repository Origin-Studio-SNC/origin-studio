import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  
  // Pages principales avec leurs versions multilingues
  const routes = [
    '',
    '/about',
    // Ajouter d'autres routes au fur et à mesure
  ]

  const locales = ['fr', 'en', 'de']
  
  const sitemap: MetadataRoute.Sitemap = []

  // Générer les URLs pour chaque route et chaque locale
  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            'fr-CH': `${baseUrl}/fr${route}`,
            'en-US': `${baseUrl}/en${route}`,
            'de-CH': `${baseUrl}/de${route}`,
          }
        }
      })
    })
  })

  return sitemap
}
