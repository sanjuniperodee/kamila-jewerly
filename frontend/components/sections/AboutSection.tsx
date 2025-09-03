'use client'

import Image from 'next/image'

interface AboutSectionProps {
  settings?: any
}

export function AboutSection({ settings }: AboutSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                О КОМПАНИИ
              </h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>KAMIL Jewelry</strong> — бутик-ателье украшений для женщин с характером 
                  и стилем. Здесь вы найдете не просто бижутерию, а тщательно 
                  отобранные модные изделия и уникальные украшения ручной 
                  работы, созданные с вдохновением от этнических мотивов и 
                  современных трендов.
                </p>
                
                <p>
                  Наш ассортимент включает серьги, кольца, кольё, браслеты и 
                  аксессуары — от лаконичного минимализма до этно-бохо и 
                  акцентной классики.
                </p>
                
                <p>
                  В KAMIL Jewelry можно не только выбрать готовое изделие, но и 
                  адаптировать украшение под свой образ, стиль и настроение — 
                  потому что это именно <strong>ателье</strong>, а не просто витрина.
                </p>
                
                <p>
                  Каждое украшение здесь — это способ выразить себя, подчеркнуть 
                  индивидуальность и почувствовать красоту в деталях.
                </p>
                
                <p className="text-lg font-medium text-primary-600">
                  <strong>KAMIL Jewelry</strong> — твой стиль, твоя история.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-gray-600">
                Доставка по Казахстану и за рубеж.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] bg-gradient-to-br from-primary-100 to-gold-100 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/about-company.jpg"
                alt="KAMIL Jewelry - уникальные ювелирные изделия ручной работы"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
