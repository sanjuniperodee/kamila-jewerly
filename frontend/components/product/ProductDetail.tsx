'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, ShoppingCart, ArrowLeft, Share2 } from 'lucide-react'
import { Product } from '@/lib/api'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const hasDiscount = product.discount_percent > 0
  const finalPrice = selectedVariant ? selectedVariant.final_price : product.final_price
  const basePrice = selectedVariant ? selectedVariant.price_modifier : product.price

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', {
      product_id: product.id,
      variant_id: selectedVariant?.id,
      quantity
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-lavender transition-colors">
                Главная
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/catalog" className="hover:text-lavender transition-colors">
                Каталог
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link 
                href={`/catalog/${product.category.slug}`} 
                className="hover:text-lavender transition-colors"
              >
                {product.category.name}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg relative">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]?.image || product.primary_image || ''}
                  alt={product.images[selectedImage]?.alt_text || product.name}
                  width={600}
                  height={600}
                  className="object-contain w-full h-full"
                  priority
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Фото отсутствует</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-primary-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.image}
                      alt={image.alt_text}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Back Button */}
            <div className="flex items-center justify-between">
              <Link
                href="/catalog"
                className="flex items-center space-x-2 text-gray-600 hover:text-lavender transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад к каталогу</span>
              </Link>
              <button className="p-2 text-gray-600 hover:text-lavender transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div className="text-sm text-lavender font-medium uppercase tracking-wide">
              {product.category.name}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="w-5 h-5 text-yellow-400 fill-yellow-400" 
                  />
                ))}
              </div>
              <span className="text-gray-600">5.0 (12 отзывов)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  {Number(finalPrice).toLocaleString('ru-RU')} ₸
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-500 line-through">
                    {Number(basePrice).toLocaleString('ru-RU')} ₸
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{product.discount_percent}%
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-gray-600">
                  Экономия: {Number(product.discount_amount).toLocaleString('ru-RU')} ₸
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Описание</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || product.short_description || 'Описание товара отсутствует'}
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Варианты</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-lavender bg-lavender-light/20 text-lavender-dark'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Количество</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-gray-600">
                {product.stock_quantity > 0 
                  ? `В наличии: ${product.stock_quantity} шт.`
                  : 'Нет в наличии'
                }
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-lavender text-white py-4 px-6 rounded-lg font-semibold hover:bg-lavender-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Добавить в корзину</span>
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Детали товара</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Артикул:</span>
                  <span className="ml-2 font-medium">{product.sku}</span>
                </div>
                {product.material && (
                  <div>
                    <span className="text-gray-600">Материал:</span>
                    <span className="ml-2 font-medium">{product.material}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-gray-600">Вес:</span>
                    <span className="ml-2 font-medium">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="text-gray-600">Размеры:</span>
                    <span className="ml-2 font-medium">{product.dimensions}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
