'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi, type Cart } from '@/lib/api'
import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'
import { EmptyCart } from './EmptyCart'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export function CartPage() {
  const queryClient = useQueryClient()
  
  // Get cart data
  const { data: cart, isLoading, error } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await cartApi.get()
      return response.data
    },
    retry: 2,
  })

  // Update cart item mutation
  const updateItemMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      cartApi.updateItem(id, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Корзина обновлена')
    },
    onError: () => {
      toast.error('Ошибка при обновлении корзины')
    },
  })

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: (id: number) => cartApi.removeItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Товар удален из корзины')
    },
    onError: () => {
      toast.error('Ошибка при удалении товара')
    },
  })

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Корзина очищена')
    },
    onError: () => {
      toast.error('Ошибка при очистке корзины')
    },
  })

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    updateItemMutation.mutate({ id, quantity })
  }

  const handleRemoveItem = (id: number) => {
    removeItemMutation.mutate(id)
  }

  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      clearCartMutation.mutate()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p>Загрузка корзины...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ошибка загрузки корзины</h1>
            <p className="text-gray-600 mb-8">Попробуйте обновить страницу</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isEmpty = !cart || cart.items.length === 0

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">Корзина</h1>
              {!isEmpty && (
                <p className="text-gray-600 mt-2">
                  {cart.total_items} {cart.total_items === 1 ? 'товар' : 'товаров'} на сумму {parseFloat(cart.total_amount).toLocaleString('ru')} ₸
                </p>
              )}
            </div>
            
            <Link href="/catalog" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Продолжить покупки
            </Link>
          </div>

          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    isUpdating={updateItemMutation.isPending}
                    isRemoving={removeItemMutation.isPending}
                  />
                ))}
                
                {/* Clear cart button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleClearCart}
                    disabled={clearCartMutation.isPending}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <CartSummary
                  totalItems={cart.total_items}
                  totalAmount={cart.total_amount}
                  onCheckout={() => window.location.href = '/checkout'}
                  isLoading={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


