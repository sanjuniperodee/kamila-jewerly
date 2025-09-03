'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Crown, Gem } from 'lucide-react'
import { motion } from 'framer-motion'
import { type Category } from '@/lib/api'

interface CatalogHeroProps {
  categories?: Category[]
  isLoading?: boolean
}

export function CatalogHero({ categories, isLoading }: CatalogHeroProps) {
  const featuredCategories = categories?.slice(0, 3) || []

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-gold-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gold-100 rounded-full blur-3xl opacity-20" />
      
      <div className="container relative z-10">
        <div className="text-center py-20">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6">
              <span className="block">KAMIL Jewelry</span>
              <span className="block text-primary-600">твой стиль,</span>
              <span className="block text-gold-600">твоя история</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Откройте для себя коллекцию изысканных ювелирных украшений. 
              Ручная работа, уникальный дизайн, высокое качество.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/catalog" 
                className="btn-primary inline-flex items-center justify-center group text-lg px-8 py-4"
              >
                Смотреть каталог
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/about" 
                className="btn-outline inline-flex items-center justify-center text-lg px-8 py-4"
              >
                О нас
              </Link>
            </div>
          </motion.div>

          {/* Featured Categories Grid */}
          {!isLoading && featuredCategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {featuredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <Link href={`/catalog/${category.slug}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group-hover:-translate-y-2 border border-gray-100">
                      {/* Category Icon */}
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-gold-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        {index === 0 && <Crown className="w-10 h-10 text-primary-600" />}
                        {index === 1 && <Gem className="w-10 h-10 text-gold-600" />}
                        {index === 2 && <Sparkles className="w-10 h-10 text-primary-600" />}
                      </div>
                      
                      {/* Category Name */}
                      <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-3">
                        {category.name}
                      </h3>
                      
                      {/* Category Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* Products Count */}
                      <div className="inline-flex items-center space-x-2 text-primary-600 font-medium">
                        <span>{category.products_count} товаров</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Loading State for Categories */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse" />
                </div>
              ))}
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 pt-12 border-t border-gray-200"
          >
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Бесплатная доставка от 50,000 ₸</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Гарантия качества</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Ручная работа</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
