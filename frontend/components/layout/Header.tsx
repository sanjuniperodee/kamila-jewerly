'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, ShoppingBag, Phone } from 'lucide-react'
import { CartButton } from '@/components/cart/CartButton'

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'О нас', href: '/about' },
  { name: 'Каталог', href: '/catalog' },
  { name: 'Блог', href: '/blog' },
  { name: 'Контакты', href: '/contacts' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container flex items-center justify-between py-4" aria-label="Главная навигация">
        {/* Left Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="text-gray-900 hover:text-primary-600 font-medium transition-colors">
            Главная
          </Link>
          <Link href="/about" className="text-gray-900 hover:text-primary-600 font-medium transition-colors">
            О нас
          </Link>
          <Link href="/catalog" className="text-gray-900 hover:text-primary-600 font-medium transition-colors">
            Каталог
          </Link>
        </div>

        {/* Centered Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-32">
              <Image
                src="/logo.png"
                alt="KAMIL Jewelry"
                fill
                priority
                sizes="192px"
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Right Navigation and Actions */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/blog" className="text-gray-900 hover:text-primary-600 font-medium transition-colors">
            Блог
          </Link>
          <Link href="/contacts" className="text-gray-900 hover:text-primary-600 font-medium transition-colors">
            Контакты
          </Link>
          
          {/* Phone */}
          <a 
            href="tel:+77051293500" 
            className="flex items-center space-x-2 text-gray-900 hover:text-primary-600 transition-colors"
            aria-label="Позвонить по номеру +7 705 129 35 00"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">+7 705 129 35 00</span>
          </a>

          {/* Cart */}
          <CartButton />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-4">
          <CartButton />
          <button
            type="button"
            className="p-2 rounded-md text-gray-900 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/25" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-semibold">Меню</span>
                <button
                  type="button"
                  className="p-2 rounded-md text-gray-900 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Закрыть меню"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-gray-900 hover:text-primary-600 font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <a 
                    href="tel:+77051293500" 
                    className="flex items-center space-x-2 py-2 text-gray-900 hover:text-primary-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+7 705 129 35 00</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
