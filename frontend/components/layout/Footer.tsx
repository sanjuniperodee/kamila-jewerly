'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Sparkles,
  ArrowUp,
  Crown,
  Gem,
  Shield
} from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const features = [
    { icon: Crown, title: 'Премиум качество', desc: 'Лучшие материалы' },
    { icon: Gem, title: 'Уникальный дизайн', desc: 'Авторские работы' },
    { icon: Shield, title: 'Гарантия подлинности', desc: 'Сертифицированные камни' },
  ]

  const quickLinks = [
    { name: 'О нас', href: '/about' },
    { name: 'Каталог', href: '/catalog' },
    { name: 'Блог', href: '/blog' },
    { name: 'Доставка', href: '/delivery' },
    { name: 'Возврат', href: '/returns' },
    { name: 'Контакты', href: '/contacts' },
  ]

  const categories = [
    { name: 'Кольца', href: '/catalog/rings' },
    { name: 'Серьги', href: '/catalog/earrings' },
    { name: 'Кулоны', href: '/catalog/necklaces' },
    { name: 'Браслеты', href: '/catalog/bracelets' },
    { name: 'Колье', href: '/catalog/chokers' },
    { name: 'Комплекты', href: '/catalog/sets' },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Original Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-lavender-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-lavender-400/10 rounded-full blur-3xl" />
        
        {/* Original Geometric Pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 100% 100%" preserveAspectRatio="none" fill="none">
            <path d="M0 0 L100% 100% M100% 0 L0 100%" stroke="#8673bf" strokeWidth="1" opacity="0.1"/>
            <path d="M50% 0 L50% 100% M0 50% L100% 50%" stroke="#b8acd9" strokeWidth="1" opacity="0.1"/>
            <path d="M25% 0 L75% 100% M75% 0 L25% 100%" stroke="#8673bf" strokeWidth="1" opacity="0.08"/>
            <circle cx="20%" cy="30%" r="2" fill="#8673bf" opacity="0.2"/>
            <circle cx="80%" cy="70%" r="2" fill="#b8acd9" opacity="0.2"/>
            <circle cx="60%" cy="20%" r="1.5" fill="#8673bf" opacity="0.15"/>
            <circle cx="40%" cy="80%" r="1.5" fill="#b8acd9" opacity="0.15"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-20">
          {/* Main Footer Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-lavender-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xl">K</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    KAMIL
                  </h3>
                  <p className="text-sm text-white/60">Jewelry</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Создаем украшения, которые рассказывают вашу историю. Каждое изделие - это произведение искусства, созданное с любовью и вниманием к деталям.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white/70 hover:text-purple-300 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                  <span>+7 705 129 35 00</span>
                </div>
                <div className="flex items-center space-x-3 text-white/70 hover:text-purple-300 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  <span>kamil_jewelry@mail.ru</span>
                </div>
                <div className="flex items-center space-x-3 text-white/70 hover:text-purple-300 transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                  <span>Актау, Казахстан</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6 text-purple-200">Быстрые ссылки</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-purple-300 transition-colors duration-300 flex items-center group"
                    >
                      <Sparkles className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-6 text-purple-200">Категории</h4>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <motion.li
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={category.href}
                      className="text-white/70 hover:text-purple-300 transition-colors duration-300 flex items-center group"
                    >
                      <Sparkles className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {category.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-bold mb-6 text-lavender-200">Подписка</h4>
              <p className="text-white/70 mb-6">
                Получайте первыми информацию о новых коллекциях и эксклюзивных предложениях.
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-lavender-600 text-white rounded-lg text-sm font-medium hover:bg-lavender-700 transition-all duration-300"
                  >
                    Подписаться
                  </motion.button>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 bg-white/10 hover:bg-lavender-600 rounded-xl flex items-center justify-center transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-white/60">
                <span>© 2024 KAMIL Jewelry. Все права защищены.</span>
                <Heart className="w-4 h-4 text-pink-400" />
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-white/60">
                <Link href="/privacy" className="hover:text-lavender-300 transition-colors duration-300">
                  Политика конфиденциальности
                </Link>
                <Link href="/terms" className="hover:text-lavender-300 transition-colors duration-300">
                  Условия использования
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-lavender-600 text-white rounded-full shadow-2xl hover:shadow-lavender-500/25 transition-all duration-300 flex items-center justify-center"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  )
}
