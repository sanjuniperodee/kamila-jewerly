'use client'

import { motion } from 'framer-motion'

interface TestimonialsSectionProps {
  testimonials?: any[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // Mock testimonials if none provided
  const mockTestimonials = [
    {
      id: 1,
      name: 'Анна Петрова',
      text: 'Невероятно красивые украшения! Качество на высоте, каждый камень сияет по-особенному. KAMIL Jewelry стал моим любимым брендом.',
      rating: 5
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      text: 'Покупаю украшения уже третий год. Дизайн уникальный, материалы качественные. Рекомендую всем, кто ценит красоту и качество.',
      rating: 5
    },
    {
      id: 3,
      name: 'Елена Козлова',
      text: 'Отличный сервис и потрясающие украшения! Каждое изделие - произведение искусства. Спасибо за ваше мастерство и внимание к деталям.',
      rating: 5
    }
  ]

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : mockTestimonials

  return (
          <section className="relative py-20 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-lavender-50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-lavender-100 rounded-full blur-3xl" />
        
        {/* Original Petal Pattern */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path d="M300 200 Q400 150 500 200 T700 200 Q800 250 900 200 T1100 200 Q1000 300 900 400 T700 400 Q600 350 500 400 T300 400 Q200 300 300 200" fill="#8673bf" opacity="0.08"/>
            <path d="M200 500 Q300 450 400 500 T600 500 Q700 550 800 500 T1000 500 Q900 600 800 700 T600 700 Q500 650 400 700 T200 700 Q100 600 200 500" fill="#b8acd9" opacity="0.08"/>
          </svg>
        </div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8">
            ОТЗЫВЫ
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Что говорят наши довольные клиенты о качестве и красоте украшений KAMIL
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -20, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative h-full rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:border-lavender-200 transition-all duration-500 p-8">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-lavender-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                        className="w-5 h-5 bg-lavender-500 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                      </motion.div>
                    ))}
                  </div>

                  {/* Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-gray-700 leading-relaxed text-lg"
                  >
                    "{testimonial.text}"
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center space-x-4"
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-lavender-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    
                    {/* Name */}
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-lavender-600">Постоянный клиент</div>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-lavender-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-lavender-600 rounded-2xl text-black font-bold text-lg shadow-2xl hover:shadow-lavender-500/25 hover:bg-lavender-700 transition-all duration-300 border-2 border-lavender-700"
          >
            Оставить отзыв
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
