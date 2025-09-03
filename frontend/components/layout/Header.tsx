'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingBag, Search, User, Heart } from 'lucide-react'

const navigation = [
  { name: 'ГЛАВНАЯ', href: '/' },
  { name: 'КАТАЛОГ', href: '/catalog' },
  { name: 'О НАС', href: '/about' },
  { name: 'БЛОГ', href: '/blog' },
  { name: 'ДОСТАВКА', href: '/delivery' },
  { name: 'КОНТАКТЫ', href: '/contacts' },
  { name: 'КОРЗИНА', href: '/cart', icon: ShoppingBag },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile and handle scroll events
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`bg-white sticky top-0 z-50 shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between py-3 px-4">
          {/* Menu Button */}
          <button
            type="button"
            className="p-2 rounded-md text-gray-900 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Logo (smaller on mobile) */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-16">
              <Image
                src="/logo.png"
                alt="KAMIL Jewelry"
                fill
                priority
                sizes="128px"
                className="object-contain"
              />
            </div>
          </Link>
          
          {/* Cart Icon */}
          <Link href="/cart" className="p-2 text-gray-900 hover:text-lavender transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Desktop Header */}
        <div className="hidden lg:block">
          {/* Logo Section */}
          <div className="flex justify-center">
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
          <nav className="flex justify-center py-4" aria-label="Главная навигация">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-lavender font-medium transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Light grey strip - shown on both mobile and desktop */}
      <div className="h-1 bg-gray-100"></div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/25" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-0 left-0 w-full max-w-xs h-full bg-white shadow-xl overflow-y-auto">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="relative w-24 h-12">
                  <Image
                    src="/logo.png"
                    alt="KAMIL Jewelry"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  type="button"
                  className="p-2 rounded-md text-gray-900 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Закрыть меню"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Mobile menu search */}
              <div className="px-4 py-3 border-b">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Поиск..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-lavender"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {/* Mobile menu navigation */}
              <div className="px-4 py-6 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center py-3 px-2 text-gray-900 hover:text-lavender hover:bg-lavender-light/10 rounded-lg font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                    {item.name}
                  </Link>
                ))}
                
                {/* Additional mobile menu items */}
                <div className="pt-4 mt-4 border-t">
                  <Link
                    href="/account"
                    className="flex items-center py-3 px-2 text-gray-900 hover:text-lavender hover:bg-lavender-light/10 rounded-lg font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    МОЙ АККАУНТ
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center py-3 px-2 text-gray-900 hover:text-lavender hover:bg-lavender-light/10 rounded-lg font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    ИЗБРАННОЕ
                  </Link>
                </div>
                
                {/* Contact info */}
                <div className="pt-4 mt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Связаться с нами:</p>
                  <p className="text-sm font-medium">+7 705 129 35 00</p>
                  <p className="text-sm text-gray-600 mt-1">kamil_jewelry@mail.ru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
