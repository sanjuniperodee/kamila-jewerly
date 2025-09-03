'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Navigation } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    toast.success('Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Адрес',
      details: ['г. Астана, Проспект Абая, 48', 'ТЦ "ЖАННУР", 1 этаж', 'Байконыр район, Z00P4K7'],
      link: 'https://2gis.kz/astana/geo/70000001100066806'
    },
    {
      icon: Phone,
      title: 'Телефон',
      details: ['+7 705 129 35 00'],
      link: 'tel:+77051293500'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['kamil_jewelry@mail.ru'],
      link: 'mailto:kamil_jewelry@mail.ru'
    },
    {
      icon: Clock,
      title: 'Режим работы',
      details: ['Ежедневно с 10:00 до 22:00', 'Без выходных'],
      link: null
    }
  ]

  const socialLinks = [
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      link: 'https://wa.me/77051293500',
      color: 'bg-green-500'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      link: 'https://instagram.com/kamil_jewelry',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      icon: Navigation,
      name: '2GIS',
      link: 'https://2gis.kz/astana/geo/70000001100066806',
      color: 'bg-blue-500'
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
              Контакты
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Мы всегда готовы ответить на ваши вопросы и помочь с выбором украшений. 
              Свяжитесь с нами удобным для вас способом
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="bg-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <div className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {item.link && idx === 0 ? (
                          <a 
                            href={item.link} 
                            className="hover:text-primary-600 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-6">
                Напишите нам
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Тема обращения
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Выберите тему</option>
                    <option value="consultation">Консультация</option>
                    <option value="order">Заказ изделия</option>
                    <option value="repair">Ремонт украшения</option>
                    <option value="complaint">Жалоба</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    placeholder="Расскажите, чем мы можем вам помочь..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors transform hover:scale-105"
                >
                  Отправить сообщение
                </button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Как нас найти</h3>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Карта будет здесь</p>
                    <p className="text-sm">г. Астана, Проспект Абая, 48</p>
                    <p className="text-xs text-gray-500">ТЦ "ЖАННУР", 1 этаж</p>
                  </div>
                </div>
                <a
                  href="https://2gis.kz/astana/geo/70000001100066806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Navigation className="h-5 w-5" />
                  Открыть в 2GIS - Наш магазин
                </a>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Мы в социальных сетях</h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className={`w-12 h-12 rounded-lg ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{social.name}</h4>
                          <p className="text-sm text-gray-600">
                            {social.name === 'WhatsApp' && 'Быстрая связь'}
                            {social.name === 'Instagram' && 'Фото наших работ'}
                            {social.name === '2GIS' && 'Наше местоположение'}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xl text-gray-600">
              Ответы на популярные вопросы наших клиентов
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'Как долго изготавливается индивидуальный заказ?',
                answer: 'Время изготовления индивидуального заказа зависит от сложности изделия и составляет от 7 до 21 рабочего дня. Точные сроки мы озвучиваем после консультации.'
              },
              {
                question: 'Предоставляете ли вы гарантию на изделия?',
                answer: 'Да, мы предоставляем гарантию 1 год на все наши изделия. Гарантия покрывает дефекты изготовления и включает бесплатную чистку украшений.'
              },
              {
                question: 'Можно ли вернуть или обменять украшение?',
                answer: 'Возврат и обмен возможны в течение 14 дней с момента покупки при наличии чека и сохранении товарного вида изделия. Индивидуальные заказы обмену и возврату не подлежат.'
              },
              {
                question: 'Делаете ли вы ремонт украшений?',
                answer: 'Да, мы выполняем ремонт ювелирных изделий любой сложности: от простой полировки до восстановления сложных элементов. Стоимость определяется после оценки изделия.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
