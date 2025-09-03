'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CartSummaryProps {
  totalItems: number
  totalAmount: string
  onCheckout: () => void
  isLoading?: boolean
}

export function CartSummary({ 
  totalItems, 
  totalAmount, 
  onCheckout, 
  isLoading = false 
}: CartSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Итого</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Товары ({totalItems})</span>
          <span className="font-medium">
            {parseFloat(totalAmount).toLocaleString('ru')} ₸
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Доставка</span>
          <span className="text-green-600 font-medium">Бесплатно</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Общая сумма</span>
            <span>{parseFloat(totalAmount).toLocaleString('ru')} ₸</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        disabled={isLoading || totalItems === 0}
        className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Обработка...' : 'Оформить заказ'}
      </button>
      
      <div className="mt-4 text-center">
        <Link 
          href="/catalog" 
          className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          Продолжить покупки
        </Link>
      </div>
      
      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Бесплатная доставка от 50,000 ₸</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Гарантия качества</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Возврат в течение 14 дней</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
