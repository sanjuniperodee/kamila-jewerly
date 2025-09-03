'use client'

import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 text-gray-300"
        >
          <ShoppingBag className="w-full h-full" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-gray-900 mb-4"
        >
          Ваша корзина пуста
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          Добавьте товары из нашего каталога, чтобы начать покупки
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/catalog" 
            className="inline-flex items-center bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Перейти в каталог
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
        
        {/* Additional suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Популярные категории
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/catalog/rings"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="text-sm font-medium text-gray-900">Кольца</div>
              <div className="text-xs text-gray-500 mt-1">От 15,000 ₸</div>
            </Link>
            
            <Link 
              href="/catalog/necklaces"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="text-sm font-medium text-gray-900">Кулоны</div>
              <div className="text-xs text-gray-500 mt-1">От 25,000 ₸</div>
            </Link>
            
            <Link 
              href="/catalog/earrings"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="text-sm font-medium text-gray-900">Серьги</div>
              <div className="text-xs text-gray-500 mt-1">От 12,000 ₸</div>
            </Link>
            
            <Link 
              href="/catalog/bracelets"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="text-sm font-medium text-gray-900">Браслеты</div>
              <div className="text-xs text-gray-500 mt-1">От 18,000 ₸</div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
