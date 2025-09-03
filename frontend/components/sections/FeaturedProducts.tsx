import Link from 'next/link'
import { Star, Heart, ShoppingCart } from 'lucide-react'



interface FeaturedProductsProps {
  products?: any[]
  isLoading?: boolean
}

export function FeaturedProducts({ products, isLoading }: FeaturedProductsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Рекомендуемые товары
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Наши самые популярные украшения, которые покорили сердца клиентов
          </p>
        </div>

        {isLoading ? (
          <div className="col-span-3 text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка товаров...</p>
          </div>
        ) : Array.isArray(products) && products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={`/product/${product.slug}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {product.primary_image ? (
                      <img 
                        src={product.primary_image} 
                        alt={product.name || 'Product image'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Heart className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-gray-500 text-sm">{product.name || 'Без названия'}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.is_new && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          НОВИНКА
                        </span>
                      )}
                      {product.discount_percent > 0 && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          СКИДКА -{product.discount_percent}%
                        </span>
                      )}
                    </div>

                    {/* Quick add to cart */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-primary-600 font-medium uppercase tracking-wide">
                        {product.category?.name || 'Без категории'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name || 'Без названия'}
                    </h3>
                    
                    {/* Rating - показываем 5 звезд по умолчанию для новых товаров */}
                    <div className="flex items-center space-x-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-4 h-4 text-gray-300" 
                        />
                      ))}
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        {product.final_price ? parseFloat(product.final_price).toLocaleString('ru') : '0'} ₸
                      </span>
                      {product.old_price && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.old_price ? parseFloat(product.old_price).toLocaleString('ru') : '0'} ₸
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          </div>
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-600">Товары не найдены</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/catalog" className="btn-primary">
            Смотреть все товары
          </Link>
        </div>
      </div>
    </section>
  )
}
