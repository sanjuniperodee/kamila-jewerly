import { Metadata } from 'next'
import { AboutPage } from '@/components/about/AboutPage'

export const metadata: Metadata = {
  title: 'О нас | KAMIL Jewelry',
  description: 'Узнайте больше о KAMIL Jewelry - компании, создающей уникальные ювелирные изделия ручной работы с любовью и вниманием к деталям.',
  keywords: 'о нас, KAMIL Jewelry, ювелирная компания, ручная работа, история компании',
  openGraph: {
    title: 'О нас | KAMIL Jewelry',
    description: 'Узнайте больше о KAMIL Jewelry - компании, создающей уникальные ювелирные изделия ручной работы.',
    type: 'website',
  },
}

export default function About() {
  return <AboutPage />
}