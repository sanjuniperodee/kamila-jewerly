'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Heart, Users, Sparkles } from 'lucide-react'

export function AboutPage() {
  const stats = [
    { label: 'Лет опыта', value: '15+', icon: Award },
    { label: 'Довольных клиентов', value: '5000+', icon: Heart },
    { label: 'Изделий создано', value: '10000+', icon: Sparkles },
    { label: 'Мастеров', value: '8', icon: Users },
  ]

  const values = [
    {
      title: 'Качество',
      description: 'Мы используем только лучшие материалы и проверенные технологии для создания украшений, которые прослужат вам долгие годы.',
      icon: Award
    },
    {
      title: 'Индивидуальность',
      description: 'Каждое изделие создается с учетом пожеланий клиента, делая его по-настоящему уникальным и особенным.',
      icon: Sparkles
    },
    {
      title: 'Мастерство',
      description: 'Наши мастера имеют многолетний опыт и постоянно совершенствуют свои навыки, следя за последними тенденциями.',
      icon: Users
    },
    {
      title: 'Забота',
      description: 'Мы заботимся о каждом клиенте, предоставляя полную поддержку от консультации до послепродажного обслуживания.',
      icon: Heart
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
              О нашей компании
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              KAMIL Jewelry — это история о страсти к красоте, мастерству и созданию украшений, 
              которые подчеркивают уникальность каждого человека
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story Section - Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-6 border-b-2 border-primary-600 pb-2">
                О КОМПАНИИ
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  KAMIL Jewelry — это бутик-ателье, где создаются уникальные ювелирные изделия ручной работы для женщин, 
                  вдохновленные этническими мотивами и современными трендами.
                </p>
                <p>
                  Наш ассортимент включает серьги, кольца, колье, браслеты и аксессуары — от минималистичных до этно-бохо и классических стилей.
                </p>
                <p>
                  KAMIL Jewelry — это ателье, где изделия можно адаптировать под индивидуальный стиль, а не просто витрина.
                </p>
                <p className="text-xl font-semibold text-primary-600 mt-6">
                  KAMIL Jewelry — твой стиль, твоя история.
                </p>
                <p className="text-gray-600">
                  Доставка по Казахстану и за рубеж.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-company.jpg"
                  alt="KAMIL Jewelry - уникальные ювелирные изделия ручной работы"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
              Наши достижения
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Цифры, которые говорят о нашем опыте и доверии клиентов
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Принципы, которые направляют нашу работу каждый день
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
              Наша команда
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Талантливые мастера и дизайнеры, которые создают ваши украшения
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src="/logo.png"
                alt="KAMIL Jewelry команда"
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Команда профессионалов
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Наша команда состоит из опытных ювелиров, дизайнеров и консультантов, 
              каждый из которых вносит свой уникальный вклад в создание прекрасных украшений. 
              Мы работаем как единое целое, чтобы воплотить ваши мечты в реальность.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
              Готовы создать что-то особенное?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами, чтобы обсудить ваш индивидуальный заказ или 
              посетите наш каталог готовых изделий
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacts"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Связаться с нами
              </a>
              <a
                href="/catalog"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Посмотреть каталог
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
