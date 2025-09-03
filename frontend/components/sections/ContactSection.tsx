import { Phone, Mail, MapPin, MessageCircle, Instagram } from 'lucide-react'

interface ContactSectionProps {
  settings?: any
  faqs?: any[]
}

export function ContactSection({ settings, faqs }: ContactSectionProps) {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            НАШИ КОНТАКТЫ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами удобным способом
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Контактная информация</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Казахстан, г. Астана</p>
                        <p className="text-gray-600">Пр. Абая, 48 (угол ул. Ш. Уалиханова)</p>
                        <p className="text-gray-600">ТЦ &ldquo;ЖАННУР&rdquo;, 1 этаж</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-primary-600" />
                      <div>
                        <a 
                          href="tel:+77051293500" 
                          className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                        >
                          +77051293500
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-primary-600" />
                      <div>
                        <a 
                          href="mailto:kamil_jewelry@mail.ru" 
                          className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                        >
                          kamil_jewelry@mail.ru
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Мы в социальных сетях</h3>
                  
                  <div className="space-y-4">
                    <a 
                      href="https://wa.me/77051293500" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-medium">WhatsApp</span>
                      </div>
                      <span className="text-green-100 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    
                    <a 
                      href="https://instagram.com/kamil_jewelry" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <Instagram className="w-6 h-6" />
                        <span className="font-medium">Instagram</span>
                      </div>
                      <span className="text-pink-100 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    
                    <a 
                      href="https://2gis.kz/astana/geo/70000001100066806" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center text-xs font-bold text-black">
                          2G
                        </div>
                        <span className="font-medium">2GIS - Наш магазин</span>
                      </div>
                      <span className="text-gray-300 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
