import { Metadata } from 'next'
import { BlogPage } from '@/components/blog/BlogPage'

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Блог KAMIL Jewelry - советы по выбору украшений, новости моды и тренды ювелирного искусства',
  keywords: [
    'блог ювелирных украшений',
    'советы по выбору украшений',
    'модные украшения',
    'тренды ювелирного искусства',
    'KAMIL Jewelry блог'
  ],
  openGraph: {
    title: 'Блог KAMIL Jewelry',
    description: 'Советы по выбору украшений, новости моды и тренды ювелирного искусства',
  },
}

export default function Blog() {
  return <BlogPage />
}
