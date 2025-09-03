import Link from 'next/link'
import { ArrowRight } from 'lucide-react'



interface CategoriesProps {
  categories?: any[]
  isLoading?: boolean
}

export function Categories({ categories, isLoading }: CategoriesProps) {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            КАТАЛОГ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Откройте для себя наши коллекции украшений, созданные с любовью и вниманием к деталям
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(isLoading ? [] : (Array.isArray(categories) ? categories : [])).map((category) => (
            <div key={category.id} className="group relative">
              <Link href={`/catalog/${category.slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                                      {/* Image */}
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {category.image ? (
                      <img 
                        src={category.image} 
                        alt={category.name || 'Категория'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Image failed to load:', category.image);
                          // Fallback к placeholder если изображение не загрузилось
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                        onLoad={() => console.log('Image loaded successfully:', category.image)}
                      />
                    ) : (
                      <div className="text-red-500 text-xs p-2">
                        No image: {JSON.stringify(category.image)}
                      </div>
                    )}
                    
                    {/* Fallback placeholder */}
                    <div className={`w-full h-full bg-gray-200 flex items-center justify-center ${category.image ? 'hidden' : ''}`}>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-serif font-bold text-xl">
                            {category.name && category.name.length > 0 ? category.name.charAt(0) : '?'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">{category.name || 'Без названия'}</p>
                      </div>
                    </div>
                    
                    {/* Products count badge */}
                    {category.products_count > 0 && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {category.products_count} товаров
                        </div>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                      {category.name || 'Без названия'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description || 'Описание отсутствует'}
                    </p>
                    
                    <div className="flex items-center justify-center">
                      <span className="inline-flex items-center px-6 py-2 bg-black text-white rounded-lg text-sm font-medium group-hover:bg-primary-600 transition-colors">
                        Подробнее
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
