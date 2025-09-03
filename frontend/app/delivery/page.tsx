
import { DeliveryPage } from '@/components/delivery/DeliveryPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Доставка | KAMIL Jewelry',
  description: 'Условия доставки украшений KAMIL Jewelry по Казахстану и за рубеж. Информация о сроках, стоимости и способах получения заказа.',
}

export default function Delivery() {
  return <DeliveryPage />
}
