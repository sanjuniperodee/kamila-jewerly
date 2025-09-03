import { Metadata } from 'next'
import { HomePage } from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'KAMIL Jewelry - Ювелирные украшения в Астане',
  description: 'Бутик-ателье украшений для женщин с характером и стилем в Астане. Ручная работа, бижутерия, серебро, золото. Доставка по Казахстану и за рубеж.',
  keywords: [
    'ювелирные украшения Астана',
    'бижутерия Казахстан', 
    'украшения ручной работы',
    'серебряные украшения',
    'золотые украшения',
    'KAMIL Jewelry',
    'серьги кольца браслеты Астана'
  ],
  openGraph: {
    title: 'KAMIL Jewelry - Ювелирные украшения в Астане',
    description: 'Бутик-ателье украшений для женщин с характером и стилем',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'KAMIL Jewelry - Главная страница',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return <HomePage />
}
