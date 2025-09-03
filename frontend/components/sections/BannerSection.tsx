'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { type Banner } from '@/lib/api'

interface BannerSectionProps {
  banners: Banner[]
}

export function BannerSection({ banners }: BannerSectionProps) {
  if (!banners || !Array.isArray(banners) || banners.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-8 ${
          banners.length === 1 
            ? 'grid-cols-1' 
            : banners.length === 2 
            ? 'grid-cols-1 lg:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {banners.map((banner, index) => (
            <BannerCard key={banner.id} banner={banner} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BannerCard({ banner, index }: { banner: Banner; index: number }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-80"
      style={{ 
        backgroundColor: banner.background_color,
        color: banner.text_color 
      }}
    >
      {/* Background Image */}
      {banner.image_url && (
        <div className="absolute inset-0">
          <Image
            src={banner.image_url}
            alt={banner.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        {banner.subtitle && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="text-sm font-medium mb-2 opacity-90"
          >
            {banner.subtitle}
          </motion.p>
        )}

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          className="text-2xl md:text-3xl font-bold font-serif mb-4"
        >
          {banner.title}
        </motion.h3>

        {banner.description && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className="text-sm md:text-base opacity-90 mb-6 line-clamp-3"
          >
            {banner.description}
          </motion.p>
        )}

        {banner.button_text && banner.button_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
          >
            <Link
              href={banner.button_url}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              {banner.button_text}
            </Link>
          </motion.div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-400 rounded-2xl transition-colors duration-300" />
    </motion.div>
  )

  // Если есть ссылка на весь баннер
  if (banner.link_url && !banner.button_url) {
    return (
      <Link href={banner.link_url} className="block">
        {content}
      </Link>
    )
  }

  return content
}
