'use client'

import { useQuery } from '@tanstack/react-query'
import { contentApi, productApi, categoryApi, type HomepageData, type Category, type Product } from '@/lib/api'
import { CatalogHero } from '@/components/sections/CatalogHero'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { Categories } from '@/components/sections/Categories'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BannerSection } from '@/components/sections/BannerSection'

export function HomePage() {
  // Получаем данные для главной страницы
  const { data: homepageData, isLoading: homepageLoading } = useQuery<HomepageData>({
    queryKey: ['homepage-data'],
    queryFn: async () => {
      const response = await contentApi.getHomepageData()
      return response.data
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 минут
  })

  // Получаем рекомендуемые продукты
  const { data: featuredProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['featured-products'],
    queryFn: async () => {
      try {
        const response = await productApi.getFeatured()
        return response.data
      } catch (error) {
        console.error('Error fetching featured products:', error)
        return []
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 минут
  })

  // Получаем категории
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response = await categoryApi.getAll()
        return response.data.results || []
      } catch (error) {
        console.error('Error fetching categories:', error)
        return []
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 минут
  })

  if (homepageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      {/* Главный баннер/герой с каталогом */}
      {/* <CatalogHero 
        categories={categories}
        isLoading={categoriesLoading}
      /> */}

    <Categories 
        categories={categories}
        isLoading={categoriesLoading}
      />

      {/* Промо баннеры */}
      {homepageData?.promo_banners && Array.isArray(homepageData.promo_banners) && homepageData.promo_banners.length > 0 && (
        <BannerSection banners={homepageData.promo_banners} />
      )}

      {/* Категории */}

      {/* Рекомендуемые продукты */}
      <FeaturedProducts 
        products={featuredProducts}
        isLoading={productsLoading}
      />

      {/* Отзывы клиентов */}
      {homepageData?.testimonials && Array.isArray(homepageData.testimonials) && homepageData.testimonials.length > 0 && (
        <TestimonialsSection testimonials={homepageData.testimonials} />
      )}

      {/* О компании */}
      <AboutSection settings={homepageData?.settings} />

      {/* Контакты */}
      <ContactSection 
        settings={homepageData?.settings}
        faqs={homepageData?.faqs && Array.isArray(homepageData.faqs) ? homepageData.faqs : []}
      />
    </>
  )
}
