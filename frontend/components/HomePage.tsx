'use client'

import { useQuery } from '@tanstack/react-query'
import { contentApi, categoryApi, productApi } from '@/lib/api'
import { motion } from 'framer-motion'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { Categories } from '@/components/sections/Categories'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BannerSection } from '@/components/sections/BannerSection'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function HomePage() {
  const { data: homepageData, isLoading: homepageLoading } = useQuery({
    queryKey: ['homepage'],
    queryFn: contentApi.getHomepageData,
    staleTime: 5 * 60 * 1000,
  })

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
    staleTime: 10 * 60 * 1000,
  })

  const { data: featuredProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: productApi.getFeatured,
    staleTime: 5 * 60 * 1000,
  })

  if (homepageLoading || categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Categories Section */}
        <div id="categories">
          <Categories 
            categories={categories?.data?.results}
            isLoading={categoriesLoading}
          />
        </div>



        {/* Featured Products Section */}
        <div id="products">
          <FeaturedProducts 
            products={featuredProducts?.data}
            isLoading={productsLoading}
          />
        </div>

        {/* About Section */}
        <div id="about">
          <AboutSection />
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection 
          testimonials={homepageData?.data?.testimonials || []}
        />

        {/* Contact Section */}
        <div id="contact">
          <ContactSection />
        </div>

        {/* Banner Section */}
        <BannerSection banners={[]} />
      </div>


    </div>
  )
}
