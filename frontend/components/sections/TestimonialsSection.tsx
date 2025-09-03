'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { type Testimonial } from '@/lib/api'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Узнайте, что говорят о нас те, кто уже выбрал KAMIL Jewelry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(testimonials) && testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-primary-200">
        <Quote className="h-8 w-8" />
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Title (if exists) */}
      {testimonial.title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {testimonial.title}
        </h3>
      )}

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center">
        <div className="relative w-12 h-12 mr-4">
          {testimonial.avatar_url ? (
            <Image
              src={testimonial.avatar_url}
              alt={testimonial.name}
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {testimonial.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          {testimonial.product_name && (
            <p className="text-sm text-gray-600">
              Купил(а): {testimonial.product_name}
            </p>
          )}
          <p className="text-xs text-gray-500">
            {new Date(testimonial.created_at).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Decorative border */}
      <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" />
    </motion.div>
  )
}
