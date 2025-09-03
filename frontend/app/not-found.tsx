import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative w-48 h-48">
            <Image
              src="/logo.png"
              alt="KAMIL Jewelry"
              fill
              sizes="192px"
              className="object-contain"
            />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Страница не найдена
        </h2>
        <p className="text-gray-600 mb-8">
          Извините, но страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
