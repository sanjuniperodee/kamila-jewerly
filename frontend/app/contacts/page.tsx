import { Metadata } from 'next'
import { ContactsPage } from '@/components/contacts/ContactsPage'

export const metadata: Metadata = {
  title: 'Контакты | KAMIL Jewelry',
  description: 'Свяжитесь с KAMIL Jewelry. Наш адрес, телефон, email и социальные сети. Мы всегда готовы ответить на ваши вопросы.',
  keywords: 'контакты, KAMIL Jewelry, адрес, телефон, email, связаться',
  alternates: {
    canonical: 'https://kamiljewelry.kz/contacts',
  },
  openGraph: {
    title: 'Контакты | KAMIL Jewelry',
    description: 'Свяжитесь с KAMIL Jewelry. Наш адрес, телефон, email и социальные сети.',
    type: 'website',
    url: 'https://kamiljewelry.kz/contacts',
  },
}

export default function Contacts() {
  return <ContactsPage />
}
