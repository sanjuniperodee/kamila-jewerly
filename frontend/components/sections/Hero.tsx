'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { type Banner, type SiteSettings } from '@/lib/api'

interface HeroProps {
  banners?: Banner[]
  settings?: SiteSettings
}

export function Hero({ banners, settings }: HeroProps) {
  const mainBanner = Array.isArray(banners) && banners.length > 0 ? banners[0] : null

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-16">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                {mainBanner ? (
                  <>
                    <span className="block">{mainBanner.title}</span>
                    {mainBanner.subtitle && (
                      <span className="block text-primary-600">{mainBanner.subtitle}</span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="block">{settings?.site_name || 'KAMIL Jewelry'}</span>
                    <span className="block text-primary-600">твой стиль,</span>
                    <span className="block text-gold-600">твоя история</span>
                  </>
                )}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                {mainBanner?.description || settings?.site_description || 
                'Бутик-ателье украшений для женщин с характером и стилем. Здесь вы найдете не просто бижутерию, а тщательно отобранные модные изделия.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {mainBanner?.button_text && mainBanner?.button_url ? (
                <Link 
                  href={mainBanner.button_url} 
                  className="btn-primary inline-flex items-center justify-center group"
                >
                  {mainBanner.button_text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link 
                  href="/catalog" 
                  className="btn-primary inline-flex items-center justify-center group"
                >
                  Смотреть каталог
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              
              <Link 
                href="/about" 
                className="btn-outline inline-flex items-center justify-center"
              >
                О нас
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">5.0 рейтинг</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <p className="text-sm text-gray-600">Ручная работа</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/5] bg-gradient-to-br from-primary-100 to-gold-100 rounded-2xl overflow-hidden shadow-2xl">
                {mainBanner?.image_url ? (
                  <Image
                    src={mainBanner.image_url}
                    alt={mainBanner.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <Image
                          src="/logo.png"
                          alt="KAMIL Jewelry"
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      </div>
                      <p className="text-gray-600 font-medium">Фото украшений</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">50%</div>
                  <div className="text-xs text-gray-500">скидка</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-600 rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-sm font-bold">Новая</div>
                  <div className="text-xs">коллекция</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gold-100 rounded-full blur-3xl opacity-20" />
    </section>
  )
}