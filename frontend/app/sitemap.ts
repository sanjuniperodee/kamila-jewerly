import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kamiljewelry.kz'
  
  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/delivery`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  // Категории товаров (обновленные)
  const categories = [
    'ruchnaya-rabota',
    'bijouteriya', 
    'serebro',
    'zoloto',
    'podarochnye-nabory'
  ]
  
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/catalog/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
      priority: 0.8,
  }))

  // Примеры страниц товаров (для демонстрации структуры)
  const productPages = [
    {
      url: `${baseUrl}/product/example-product`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  ]

  return [...staticPages, ...categoryPages, ...productPages]
}
