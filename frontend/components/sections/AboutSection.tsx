'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function AboutSection() {
  return (
          <section className="relative py-20 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, #8673bf 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, #b8acd9 1px, transparent 1px),
            radial-gradient(circle at 40% 40%, #8673bf 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 200px 200px'
        }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >

            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-black text-gray-900 leading-tight"
              >
                Наша{' '}
                <span className="text-lavender-600">
                  История
                </span>
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 text-lg text-gray-600 leading-relaxed"
              >
                <p>
                  Добро пожаловать в мир изысканных украшений KAMIL Jewelry! Мы - семейная компания, 
                  которая с 2009 года создает уникальные украшения, сочетающие в себе традиции восточного 
                  мастерства и современные тенденции ювелирного искусства.
                </p>
                
                <p>
                  Наша история началась в небольшой мастерской, где каждый камень, каждый металл и каждая 
                  деталь имели особое значение. Сегодня мы продолжаем следовать этим принципам, создавая 
                  украшения, которые не просто дополняют образ, но и рассказывают историю.
                </p>
                
                <p>
                  Мы гордимся тем, что используем только качественные материалы: натуральные камни, 
                  драгоценные металлы и уникальные техники обработки. Каждое украшение KAMIL - это 
                  произведение искусства, созданное с любовью и вниманием к каждой детали.
                </p>
                
                <p>
                  Наша миссия - помочь каждому клиенту найти то самое украшение, которое будет 
                  отражать его индивидуальность и станет частью его личной истории. Мы верим, что 
                  настоящая красота рождается на стыке традиций и инноваций.
                </p>
              </motion.div>

              {/* Elegant Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { number: '15+', label: 'Лет опыта' },
                  { number: '1000+', label: 'Довольных клиентов' },
                  { number: '500+', label: 'Уникальных изделий' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="text-center group"
                  >
                    <div className="text-3xl font-black text-lavender-600 mb-2 group-hover:text-lavender-700 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute -inset-8 bg-lavender-50 rounded-3xl transform rotate-3" />
              <div className="absolute -inset-8 bg-lavender-100 rounded-3xl transform -rotate-2" />
              
              {/* Main Image */}
              <div className="relative bg-lavender-600 rounded-3xl p-2">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/about-company.jpg"
                    alt="О компании KAMIL Jewelry"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Elegant Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-lavender-500 rounded-full flex items-center justify-center text-white text-2xl shadow-xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-lavender-400 rounded-full flex items-center justify-center text-white text-xl shadow-xl"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                  <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z"/>
                </svg>
              </motion.div>
            </div>

            {/* Bottom Decoration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-lavender-600 text-white rounded-full font-medium">
                <span>Создаем красоту с 2009 года</span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
