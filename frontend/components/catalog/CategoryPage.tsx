'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productApi, categoryApi } from '@/lib/api'
import { ProductCard } from './ProductCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Search, Filter, Grid, List } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface CategoryPageProps {
  categorySlug: string
}

export function CategoryPage({ categorySlug }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Get category info
  const { data: categoryInfo } = useQuery({
    queryKey: ['category-info', categorySlug],
    queryFn: async () => {
      // This is a placeholder - in a real app, you'd fetch category details
      return { name: formatCategoryName(categorySlug) }
    },
  })

  // Get products
  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ['category-products', categorySlug, searchQuery, sortBy],
    queryFn: async () => {
      const response = await productApi.getByCategory(categorySlug, {
        search: searchQuery || undefined,
        ordering: sortBy
      })
      return response.data
    },
  })

  // Get all categories for filter
  const { data: categories } = useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const response = await categoryApi.getAll()
      return response.data
    }
  })

  const products = productsResponse?.results || []
  const totalProducts = productsResponse?.count || 0
  const categoryName = categoryInfo?.name || formatCategoryName(categorySlug)

  function formatCategoryName(slug: string) {
    return decodeURIComponent(slug)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lavender to-lavender-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Коллекция украшений в стиле {categoryName.toLowerCase()}. Ручная работа, качественные материалы.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск украшений..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-lavender"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-lavender"
              >
                <option value="name">По названию</option>
                <option value="-created_at">Сначала новые</option>
                <option value="price">По цене (возрастание)</option>
                <option value="-price">По цене (убывание)</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-lavender text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-lavender text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results count and breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Найдено товаров: {totalProducts}
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <Link href="/" className="hover:text-lavender transition-colors">
                Главная
              </Link>
              <span className="mx-2">/</span>
              <Link href="/catalog" className="hover:text-lavender transition-colors">
                Каталог
              </Link>
              <span className="mx-2">/</span>
              <span className="text-lavender">{categoryName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Товары не найдены
              </h3>
              <p className="text-gray-600 mb-8">
                В данной категории пока нет товаров или они не соответствуют параметрам поиска
              </p>
              <Link
                href="/catalog"
                className="inline-block bg-lavender text-white px-6 py-3 rounded-lg font-medium hover:bg-lavender-dark transition-colors"
              >
                Вернуться к каталогу
              </Link>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "space-y-6"
            }>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
