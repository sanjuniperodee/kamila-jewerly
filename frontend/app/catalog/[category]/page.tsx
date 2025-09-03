import { Metadata } from 'next'
import { CategoryPage } from '@/components/catalog/CategoryPage'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.category)
  
  return {
    title: `${categoryName} | KAMIL Jewelry`,
    description: `Коллекция украшений в стиле ${categoryName} от KAMIL Jewelry. Уникальные дизайны, ручная работа, высокое качество.`,
    keywords: `${categoryName}, украшения, KAMIL Jewelry, ювелирные изделия, ручная работа`,
    openGraph: {
      title: `${categoryName} | KAMIL Jewelry`,
      description: `Коллекция украшений в стиле ${categoryName}`,
      type: 'website',
    },
  }
}

export default function Category({ params }: CategoryPageProps) {
  return <CategoryPage categorySlug={params.category} />
}
