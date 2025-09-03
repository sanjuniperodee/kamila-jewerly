'use client'

import { useState } from 'react'
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { productApi, categoryApi, type Product, type Category } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Get products
  const { data: productsResponse, isLoading: productsLoading } = useQuery<{ results: Product[]; count: number }>({
    queryKey: ['products', searchQuery, selectedCategory, sortBy],
    queryFn: async () => {
      const response = await productApi.getAll({
        search: searchQuery || undefined,
        category: selectedCategory || undefined,
        ordering: sortBy
      })
      return response.data
    },
    placeholderData: (previousData) => previousData,
  })

  // Get categories
  const { data: categories } = useQuery<{results: Category[]; count: number}>({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const response = await categoryApi.getAll()
      return response.data
    }
  })

  const products = productsResponse?.results || []
  const totalProducts = productsResponse?.count || 0

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
              Каталог украшений
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Откройте для себя коллекцию изысканных ювелирных изделий, созданных с любовью и вниманием к деталям
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
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Все категории</option>
                {categories?.results?.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Найдено товаров: {totalProducts}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productsLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Товары не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "space-y-6"
            }>
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product, viewMode }: { product: Product; viewMode: 'grid' | 'list' }) {
  const [isLiked, setIsLiked] = useState(false)
  
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="flex">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={product.images && product.images.length > 0 && product.images[0] && product.images[0].image ? product.images[0].image : '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
            {product.is_new && (
              <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                NEW
              </span>
            )}
            {product.discount_percent && (
              <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                -{product.discount_percent}%
              </span>
            )}
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <Link href={`/product/${product.slug}`}>
                  {product.name}
                </Link>
              </h3>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{product.category?.name}</p>
            <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {product.old_price && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.old_price} ₸
                  </span>
                )}
                <span className="text-xl font-bold text-primary-600">
                  {product.price} ₸
                </span>
              </div>
              
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                В корзину
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images && product.images.length > 0 && product.images[0] && product.images[0].image ? product.images[0].image : '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_new && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
          {product.discount_percent && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{product.discount_percent}%
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full bg-white shadow-md transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick add to cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            В корзину
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 hover:text-primary-600 transition-colors">
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">{product.category?.name}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.old_price && (
              <span className="text-sm text-gray-500 line-through">
                {product.old_price} ₸
              </span>
            )}
            <span className="font-bold text-primary-600">
              {product.price} ₸
            </span>
          </div>
          
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">(12)</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
