'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function CartButton() {
  const [itemCount, setItemCount] = useState(0)

  // В реальном приложении здесь будет логика получения количества товаров из корзины
  useEffect(() => {
    // Временная заглушка
    setItemCount(0)
  }, [])

  return (
    <Link 
      href="/cart" 
      className="relative p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
      aria-label={`Корзина ${itemCount > 0 ? `(${itemCount} товаров)` : '(пуста)'}`}
    >
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  )
}
