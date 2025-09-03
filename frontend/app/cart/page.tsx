import { Metadata } from 'next'
import { CartPage } from '@/components/cart/CartPage'

export const metadata: Metadata = {
  title: 'Корзина',
  description: 'Ваша корзина покупок в KAMIL Jewelry',
  robots: {
    index: false,
    follow: true,
  },
}

export default function Cart() {
  return <CartPage />
}
