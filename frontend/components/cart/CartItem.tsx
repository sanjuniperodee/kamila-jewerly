'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

import { type CartItem as CartItemType } from '@/lib/api'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
  isUpdating: boolean
  isRemoving: boolean
}

export function CartItem({ 
  item, 
  onUpdateQuantity, 
  onRemove, 
  isUpdating, 
  isRemoving 
}: CartItemProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const handleRemove = () => {
    onRemove(item.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <Link href={`/catalog/product/${item.product.slug}`}>
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
              {item.product.primary_image ? (
                <Image
                  src={item.product.primary_image}
                  alt={item.product.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : item.product.images && item.product.images.length > 0 && item.product.images[0] && item.product.images[0].image ? (
                <Image
                  src={item.product.images[0].image}
                  alt={item.product.images[0].alt_text || item.product.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-xs">Нет фото</span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <Link 
                href={`/catalog/product/${item.product.slug}`}
                className="block hover:text-primary-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.product.name}
                </h3>
              </Link>
              
              <div className="mt-2 flex items-center gap-4">
                <span className="text-2xl font-bold text-primary-600">
                  {parseFloat(item.product.price).toLocaleString('ru')} ₸
                </span>
                <span className="text-sm text-gray-500">
                  за штуку
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Количество:</span>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={isUpdating || item.quantity <= 1}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isUpdating || item.quantity >= 99}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <span className="text-sm text-gray-500">Итого:</span>
              <div className="text-xl font-bold text-primary-600">
                {parseFloat(item.total_price).toLocaleString('ru')} ₸
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
