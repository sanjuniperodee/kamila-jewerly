'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'ГЛАВНАЯ', href: '/' },
  { name: 'О НАС', href: '/about' },
  { name: 'БЛОГ', href: '/blog' },
  { name: 'ДОСТАВКА', href: '/delivery' },
  { name: 'КОНТАКТЫ', href: '/contacts' },
  { name: 'КОРЗИНА', href: '/cart' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Logo Section */}
      <div className="container flex justify-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-56 h-36">
            <Image
              src="/logo.png"
              alt="KAMIL Jewelry"
              fill
              priority
              sizes="224px"
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Separator line */}
      <div className="h-px bg-gray-300"></div>

      {/* Navigation Menu */}
      <nav className="container flex justify-center py-4" aria-label="Главная навигация">
        <div className="flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Light grey strip */}
      <div className="h-2 bg-gray-100"></div>

      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-center py-4">
        <button
          type="button"
          className="p-2 rounded-md text-gray-900 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

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
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
