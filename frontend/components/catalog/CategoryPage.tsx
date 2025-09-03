'use client'

import { useQuery } from '@tanstack/react-query'
import { productApi } from '@/lib/api'
import { ProductCard } from './ProductCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface CategoryPageProps {
  categorySlug: string
}

export function CategoryPage({ categorySlug }: CategoryPageProps) {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['category-products', categorySlug],
    queryFn: async () => {
      const response = await productApi.getByCategory(categorySlug)
      return response.data
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Ошибка загрузки
          </h1>
          <p className="text-gray-600">
            Не удалось загрузить товары категории
          </p>
        </div>
      </div>
    )
  }

  const categoryName = decodeURIComponent(categorySlug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
              {categoryName}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Откройте для себя коллекцию уникальных украшений в стиле {categoryName.toLowerCase()}. 
              Ручная работа, качественные материалы, неповторимый дизайн.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products && products.results && products.results.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Товары в категории &ldquo;{categoryName}&rdquo;
                </h2>
                <p className="text-gray-600">
                  Найдено {products.count} товаров
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Товары не найдены
              </h2>
              <p className="text-gray-600 mb-8">
                В данной категории пока нет товаров
              </p>
              <a
                href="/catalog"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Вернуться к каталогу
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
