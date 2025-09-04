import { Metadata } from 'next'
import { AboutPage } from '@/components/about/AboutPage'

export const metadata: Metadata = {
  title: 'О нас | KAMIL Jewelry',
  description: 'Узнайте больше о KAMIL Jewelry - компании, создающей уникальные ювелирные изделия ручной работы с любовью и вниманием к деталям.',
  keywords: 'о нас, KAMIL Jewelry, ювелирная компания, ручная работа, история компании',
  alternates: {
    canonical: 'https://kamiljewelry.kz/about',
  },
  openGraph: {
    title: 'О нас | KAMIL Jewelry',
    description: 'Узнайте больше о KAMIL Jewelry - компании, создающей уникальные ювелирные изделия ручной работы.',
    type: 'website',
    url: 'https://kamiljewelry.kz/about',
  },
}

export default function About() {
  return <AboutPage />
}