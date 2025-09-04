import { Metadata } from 'next'
import { CatalogPage } from '@/components/catalog/CatalogPage'

export const metadata: Metadata = {
  title: 'Каталог ювелирных изделий | KAMIL Jewelry',
  description: 'Широкий выбор ювелирных изделий ручной работы, бижутерии и серебряных украшений от KAMIL Jewelry. Найдите идеальное украшение для себя или в подарок.',
  keywords: 'каталог украшений, ювелирные изделия, бижутерия, серебро, золото, кольца, серьги, браслеты, цепочки',
  alternates: {
    canonical: 'https://kamiljewelry.kz/catalog',
  },
  openGraph: {
    title: 'Каталог ювелирных изделий | KAMIL Jewelry',
    description: 'Широкий выбор ювелирных изделий ручной работы, бижутерии и серебряных украшений от KAMIL Jewelry.',
    type: 'website',
    url: 'https://kamiljewelry.kz/catalog',
  },
}

export default function Catalog() {
  return <CatalogPage />
}
