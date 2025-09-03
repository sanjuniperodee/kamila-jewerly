import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/cart',
        '/checkout',
        '/orders',
        '*.json',
      ],
    },
    sitemap: 'https://kamiljewelry.kz/sitemap.xml',
  }
}
