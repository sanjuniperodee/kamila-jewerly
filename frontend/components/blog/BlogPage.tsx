'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Calendar, User, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { blogApi, type BlogPost, type BlogCategory } from '@/lib/api'

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Get blog posts
  const { data: postsResponse, isLoading: postsLoading } = useQuery<{ results: BlogPost[]; count: number }>({
    queryKey: ['blog-posts', searchQuery, selectedCategory],
    queryFn: async () => {
      const response = await blogApi.getPosts({ 
        search: searchQuery || undefined,
        category: selectedCategory || undefined 
      })
      return response.data
    },
    placeholderData: (previousData) => previousData,
  })

  // Get blog categories
  const { data: categories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const response = await blogApi.getCategories()
      return response.data
    }
  })

  // Get featured posts
  const { data: featuredPosts } = useQuery({
    queryKey: ['featured-blog-posts'],
    queryFn: async () => {
      const response = await blogApi.getFeatured()
      return response.data
    }
  })

  const posts = postsResponse?.results || []
  const totalPosts = postsResponse?.count || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Блог KAMIL Jewelry
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Советы по выбору украшений, новости моды и тренды ювелирного искусства
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по блогу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-primary-300 bg-white/10 backdrop-blur text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      !selectedCategory 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Все статьи ({totalPosts})
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {category.name} ({category.posts_count})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Posts */}
            {featuredPosts && featuredPosts.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Рекомендуемое</h3>
                <div className="space-y-4">
                  {featuredPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(post.published_at).toLocaleDateString('ru')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {postsLoading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                    <div className="aspect-video bg-gray-200" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded" />
                        <div className="h-3 bg-gray-200 rounded w-5/6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {searchQuery ? 'Ничего не найдено' : 'Пока нет статей'}
                </h2>
                <p className="text-gray-600 mb-8">
                  {searchQuery 
                    ? `По запросу "${searchQuery}" ничего не найдено. Попробуйте изменить поисковый запрос.`
                    : 'Скоро здесь появятся интересные статьи о ювелирных украшениях.'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="btn-primary"
                  >
                    Очистить поиск
                  </button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface BlogPostCardProps {
  post: BlogPost
}

function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/blog/${post.slug}`}>
        {/* Featured Image */}
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-gold-100 relative overflow-hidden">
          {post.featured_image_url ? (
            <Image
              src={post.featured_image_url}
              alt={post.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-serif font-bold">K</span>
                </div>
                <p className="text-gray-500 text-sm">KAMIL Jewelry</p>
              </div>
            </div>
          )}
          
          {post.is_featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                Рекомендуемое
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category & Date */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            {post.category && (
              <span className="text-primary-600 font-medium">{post.category.name}</span>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.published_at).toLocaleDateString('ru')}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Read More */}
          <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
            <span>Читать далее</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  )
}
