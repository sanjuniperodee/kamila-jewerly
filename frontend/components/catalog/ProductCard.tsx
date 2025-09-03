'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/api'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discount_percent > 0

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-lavender">
      {/* Product Image */}
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 block overflow-hidden">
          {product.primary_image ? (
            <Image
              src={product.primary_image}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-lavender rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-serif font-bold text-2xl">
                    {product.name && product.name.length > 0 ? product.name.charAt(0) : '?'}
                  </span>
                </div>
                <p className="text-gray-600 font-medium text-sm">{product.name || 'Без названия'}</p>
                <p className="text-gray-500 text-xs mt-1">Фото отсутствует</p>
              </div>
            </div>
          )}
          
          {/* Quick view overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white text-lavender-dark px-4 py-2 rounded-full text-sm font-medium shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Быстрый просмотр
            </span>
          </div>
        </Link>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            -{product.discount_percent}%
          </div>
        )}
        
        {/* Featured Badge */}
        {product.is_featured && (
          <div className="absolute top-3 right-3 bg-lavender text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            ★ Популярное
          </div>
        )}
        
        {/* New Badge */}
        {product.is_new && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            Новинка
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <div className="text-xs font-medium text-lavender uppercase tracking-wider mb-2">
          {product.category.name}
        </div>
        
        {/* Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-lavender transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Short Description */}
        {product.short_description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.short_description}
          </p>
        )}
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            {product.final_price} ₸
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {product.price} ₸
            </span>
          )}
        </div>
        
        {/* Action Button */}
        <div className="flex space-x-2">
          <Link
            href={`/product/${product.slug}`}
            className="flex-1 bg-lavender text-white py-2.5 px-4 rounded-lg font-medium hover:bg-lavender-dark transition-colors text-center block shadow-md hover:shadow-lg"
          >
            Подробнее
          </Link>
          <button 
            className="p-2.5 border-2 border-lavender-light text-lavender rounded-lg hover:bg-lavender hover:text-white transition-colors"
            aria-label="Добавить в избранное"
          >
            ♡
          </button>
        </div>
      </div>
    </div>
  )
}
