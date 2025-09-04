'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Crown } from 'lucide-react'
import Image from 'next/image'

interface CategoriesProps {
  categories?: any[]
  isLoading?: boolean
}

export function Categories({ categories, isLoading }: CategoriesProps) {
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
    <section id="categories" className="relative py-20 bg-white overflow-hidden">
      {/* Simple Visible Background */}
      
      {/* Large visible circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#8673bf] rounded-full opacity-30"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#b8acd9] rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-[#9f8fcc] rounded-full opacity-30"></div>
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
            КАТАЛОГ
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Откройте для себя наши эксклюзивные коллекции украшений, созданные с любовью и вниманием к каждой детали
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(categories || []).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -20, scale: 1.02 }}
              className="group relative"
            >
              <Link href={`/catalog/${category.slug}`}>
                <div className="relative h-96 rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:border-lavender-200 transition-all duration-500">
                  {/* Category Image */}
                  <div className="relative h-full w-full">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-lavender-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-lavender-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-serif font-bold text-2xl">
                              {category.name && category.name.length > 0 ? category.name.charAt(0) : '?'}
                            </span>
                          </div>
                          <p className="text-lavender-700 font-medium">{category.name || 'Без названия'}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                    

                    
                    {/* Products Count Badge */}
                    {category.products_count > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="absolute top-4 left-4"
                      >
                        <div className="px-4 py-2 bg-lavender-600 rounded-full">
                          <span className="text-white font-bold text-sm">
                            {category.products_count} товаров
                          </span>
                        </div>
                      </motion.div>
                    )}
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
                      {category.name || 'Без названия'}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-white/80 mb-4 line-clamp-2"
                    >
                      {category.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex items-center gap-2 text-lavender-300 font-medium group-hover:text-lavender-200 transition-colors duration-300"
                    >
                      <span>Исследовать</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </div>

                  
                  
                  
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
