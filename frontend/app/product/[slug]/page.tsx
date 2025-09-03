'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { productApi } from '@/lib/api'
import { ProductDetail } from '@/components/product/ProductDetail'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await productApi.getBySlug(slug)
      return response.data
    },
    enabled: !!slug,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 h-48">
              <img
                src="/logo.png"
                alt="KAMIL Jewelry"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
            Товар не найден
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Извините, но товар не существует или был удален
          </h2>
          <p className="text-gray-600 mb-8">
            Попробуйте найти похожие товары в нашем каталоге
          </p>
          <a
            href="/catalog"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Перейти в каталог
          </a>
        </div>
      </div>
    )
  }

  return <ProductDetail product={product} />
}
