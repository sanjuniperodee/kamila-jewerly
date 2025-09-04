import type { Metadata } from 'next'
// Font imports removed for build compatibility - using CSS imports instead
import './globals.css'
import './font-override.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Font variables removed for build compatibility - using CSS imports instead
const inter = { variable: '' }
const playfair = { variable: '' }
const montserrat = { variable: '' }
const cormorant = { variable: '' }
const lora = { variable: '' }

export const metadata: Metadata = {
  title: {
    template: '%s | KAMIL Jewelry - Ювелирные украшения в Астане',
    default: 'KAMIL Jewelry - Ювелирные украшения, бижутерия и аксессуары в Астане'
  },
  description: 'KAMIL Jewelry - бутик-ателье украшений для женщин с характером и стилем в Астане. Ручная работа, бижутерия, серебро, золото. Доставка по Казахстану и за рубеж.',
  keywords: [
    'ювелирные украшения Астана',
    'бижутерия Казахстан',
    'украшения ручной работы',
    'серебряные украшения',
    'золотые украшения',
    'KAMIL Jewelry',
    'серьги кольца браслеты',
    'ювелирная мастерская Астана'
  ],
  authors: [{ name: 'KAMIL Jewelry' }],
  creator: 'KAMIL Jewelry',
  publisher: 'KAMIL Jewelry',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kamiljewelry.kz'),
  alternates: {
    languages: {
      'ru-KZ': '/',
      'kk-KZ': '/kk',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    url: 'https://kamiljewelry.kz',
    siteName: 'KAMIL Jewelry',
    title: 'KAMIL Jewelry - Ювелирные украшения в Астане',
    description: 'Бутик-ателье украшений для женщин с характером и стилем. Ручная работа, бижутерия, серебро, золото.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KAMIL Jewelry - Ювелирные украшения',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAMIL Jewelry - Ювелирные украшения в Астане',
    description: 'Бутик-ателье украшений для женщин с характером и стилем',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8673bf" />
        <meta name="msapplication-TileColor" content="#8673bf" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              "name": "KAMIL Jewelry",
              "description": "Бутик-ателье украшений для женщин с характером и стилем",
              "url": "https://kamiljewelry.kz",
              "logo": "https://kamiljewelry.kz/logo.png",
              "image": "https://kamiljewelry.kz/og-image.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Проспект Абая, 48, ТЦ Жаннур, 1 этаж",
                "addressLocality": "Астана",
                "addressCountry": "KZ"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "51.1694",
                "longitude": "71.4491"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+77051293500",
                "contactType": "customer service",
                "availableLanguage": ["Russian", "Kazakh"]
              },
              "sameAs": [
                "https://instagram.com/kamil_jewelry",
                "https://wa.me/77051293500",
                "https://2gis.kz/astana/geo/70000001100066806"
              ],
              "openingHours": "Mo-Su 10:00-22:00",
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
