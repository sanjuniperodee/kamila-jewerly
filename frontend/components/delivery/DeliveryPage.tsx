import { Truck, MapPin, Globe, Package, Clock, ShieldCheck, Search } from 'lucide-react'

export function DeliveryPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-lavender-light/30 to-white">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-semibold text-gray-900 mb-6">
              Доставка и получение заказа
            </h1>
            <p className="text-xl text-gray-600 font-sans">
              Мы доставляем украшения по всему Казахстану и за его пределы
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 font-sans">
              В KAMIL Jewelry мы стремимся сделать процесс получения ваших украшений максимально удобным и быстрым.
              Ниже представлена информация о способах доставки, сроках и условиях получения заказа.
            </p>
          </div>

          {/* Delivery Options */}
          <div className="space-y-12">
            {/* Kazakhstan Delivery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-lavender/10 p-3 rounded-full">
                  <Truck className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                    1. Доставка по Казахстану
                  </h2>
                  <ul className="space-y-3 text-gray-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Отправляем заказы курьерскими службами (CDEK, KazPost и др.).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Срок доставки — от 2 до 5 рабочих дней, в зависимости от региона.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Стоимость рассчитывается по тарифам службы доставки и оплачивается дополнительно.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Astana Delivery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-lavender/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                    2. Доставка по Астане
                  </h2>
                  <ul className="space-y-3 text-gray-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Возможен курьер или самовывоз по предварительной договоренности.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Срочная доставка — обсуждается индивидуально.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* International Delivery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-lavender/10 p-3 rounded-full">
                  <Globe className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                    3. Международная доставка
                  </h2>
                  <ul className="space-y-3 text-gray-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Отправляем украшения в любые страны.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Стоимость и сроки рассчитываются индивидуально в зависимости от страны и способа доставки.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>После согласования заказа и оплаты вы получите трек-номер для отслеживания.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Packaging */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-lavender/10 p-3 rounded-full">
                  <Package className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                    4. Упаковка и сохранность
                  </h2>
                  <ul className="space-y-3 text-gray-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Все изделия упакованы в фирменные коробочки и защищены от повреждений.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Перед отправкой каждое украшение проверяется вручную.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Custom Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-lavender/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                    5. Изготовление под заказ
                  </h2>
                  <ul className="space-y-3 text-gray-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Если изделия нет в наличии, изготовление занимает от 1 до 3 дней.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>После готовности заказ будет отправлен выбранным способом.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-lavender/10 p-3 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                    6. Гарантии и возврат
                  </h2>
                  <ul className="space-y-3 text-gray-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Украшения проходят проверку качества перед отправкой.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>Возврат и обмен возможны только при наличии производственного брака (в течение 7 дней с момента получения).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tracking */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-lavender/10 p-3 rounded-full">
                  <Search className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                    7. Отслеживание заказа
                  </h2>
                  <ul className="space-y-3 text-gray-700 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-lavender font-medium">•</span>
                      <span>После отправки вы получите уведомление и трек-номер для отслеживания посылки.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-accent font-semibold text-gray-900 mb-4">
              Остались вопросы по доставке?
            </h3>
            <p className="text-gray-700 mb-6 font-sans">
              Свяжитесь с нами любым удобным способом, и мы с радостью ответим на все ваши вопросы
            </p>
            <div className="flex justify-center">
              <a 
                href="/contacts" 
                className="btn-primary inline-flex items-center"
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
