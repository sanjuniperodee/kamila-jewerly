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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-serif font-bold text-2xl">
                  {product.name && product.name.length > 0 ? product.name.charAt(0) : '?'}
                </span>
              </div>
              <p className="text-gray-600 font-medium text-sm">{product.name || 'Без названия'}</p>
              <p className="text-gray-500 text-xs mt-1">Фото отсутствует</p>
            </div>
          </div>
        )}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount_percent}%
          </div>
        )}
        
        {/* Featured Badge */}
        {product.is_featured && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ★
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-2">
          {product.category.name}
        </div>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {product.final_price} ₸
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {product.price} ₸
            </span>
          )}
        </div>
        
        {/* Action Button */}
        <Link
          href={`/product/${product.slug}`}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center block"
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}
