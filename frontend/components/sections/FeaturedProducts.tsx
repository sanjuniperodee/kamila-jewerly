'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FeaturedProductsProps {
  products?: any[]
  isLoading?: boolean
}

export function FeaturedProducts({ products, isLoading }: FeaturedProductsProps) {
  if (isLoading) {
    return (
      <section className="relative py-32 bg-white">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-lavender-100 rounded-lg w-64 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-96 bg-lavender-50 rounded-3xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
          <section className="relative py-20 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-lavender-50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-lavender-100 rounded-full blur-3xl" />
        
        {/* Original Spiral Pattern */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path d="M600 400 m-200 0 a200 200 0 1 1 400 0 a200 200 0 1 1 -400 0" stroke="#8673bf" strokeWidth="2" opacity="0.1"/>
            <path d="M600 400 m-150 0 a150 150 0 1 1 300 0 a150 150 0 1 1 -300 0" stroke="#b8acd9" strokeWidth="2" opacity="0.1"/>
            <path d="M600 400 m-100 0 a100 100 0 1 1 200 0 a100 100 0 1 1 -200 0" stroke="#8673bf" strokeWidth="2" opacity="0.1"/>
          </svg>
        </div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8">
            ПОПУЛЯРНЫЕ
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Наши самые востребованные украшения, которые выбирают ценители красоты и стиля
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(products || []).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -20, scale: 1.02 }}
              className="group relative"
            >
              <Link href={`/product/${product.slug}`}>
                <div className="relative h-96 rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:border-lavender-200 transition-all duration-500">
                  {/* Product Image */}
                  <div className="relative h-full w-full">
                    {product.primary_image ? (
                      <Image
                        src={product.primary_image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-lavender-50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-lavender-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-serif font-bold text-2xl">
                              {product.name && product.name.length > 0 ? product.name.charAt(0) : '?'}
                            </span>
                          </div>
                          <p className="text-lavender-700 font-medium">{product.name || 'Без названия'}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-4 py-2 bg-lavender-600 rounded-full">
                        <span className="text-white font-bold text-sm">
                          {product.category?.name || 'Без категории'}
                        </span>
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-4 py-2 bg-lavender-500 rounded-full">
                        <span className="text-white font-bold text-sm">
                          {product.final_price ? `${product.final_price} ₸` : 'Цена не указана'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-2xl font-bold text-white mb-3 group-hover:text-lavender-200 transition-colors duration-300"
                    >
                      {product.name || 'Без названия'}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-white/80 mb-4 line-clamp-2"
                    >
                      {product.short_description || 'Описание отсутствует'}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex items-center justify-between"
                    >
                      <div className="text-lavender-300 font-medium group-hover:text-lavender-200 transition-colors duration-300">
                        Подробнее
                      </div>
                      
                      {/* Price Display */}
                      <div className="text-right">
                        {product.old_price && product.old_price > product.final_price && (
                          <div className="text-white/60 line-through text-sm">
                            {product.old_price} ₸
                          </div>
                        )}
                        <div className="text-white font-bold text-lg">
                          {product.final_price ? `${product.final_price} ₸` : 'Цена не указана'}
                        </div>
                      </div>
                    </motion.div>
                  </div>


                  
                  
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <Link href="/catalog">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-lavender-600 rounded-2xl text-black font-bold text-lg shadow-2xl hover:shadow-lavender-500/25 hover:bg-lavender-700 transition-all duration-300 border-2 border-lavender-700"
            >
              Смотреть все товары

            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
