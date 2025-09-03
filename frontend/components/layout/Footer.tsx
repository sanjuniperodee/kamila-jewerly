import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react'

const footerLinks = {
  catalog: [
    { name: 'Ручная работа', href: '/catalog/ruchnaya-rabota' },
    { name: 'Бижутерия', href: '/catalog/bijouteriya' },
    { name: 'Серебро', href: '/catalog/serebro' },
  ],
  company: [
    { name: 'О компании', href: '/about' },
    { name: 'Доставка', href: '/delivery' },
    { name: 'Контакты', href: '/contacts' },
  ]
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container section-padding">
        {/* Centered Logo Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="KAMIL Jewelry"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Бутик-ателье украшений для женщин с характером и стилем. 
            Здесь вы найдете не просто бижутерию, а тщательно отобранные модные изделия.
          </p>
          <p className="text-lg text-gray-400 mt-4">
            <strong>KAMIL Jewelry</strong> — твой стиль, твоя история.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Catalog */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Каталог</h3>
            <ul className="space-y-2">
              {footerLinks.catalog.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Компания</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Наши контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Казахстан, г. Астана</p>
                  <p>Пр. Абая, 48 (угол ул. Ш. Уалиханова)</p>
                  <p>ТЦ &ldquo;ЖАННУР&rdquo;, 1 этаж</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <a 
                  href="tel:+77051293500" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  +7 705 129 35 00
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <a 
                  href="mailto:kamil_jewelry@mail.ru" 
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  kamil_jewelry@mail.ru
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://wa.me/77051293500" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/kamil_jewelry" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 KAMIL Jewelry. Все права защищены.
            </p>
            <p className="text-xs text-gray-500">
              Доставка по Казахстану и за рубеж
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
