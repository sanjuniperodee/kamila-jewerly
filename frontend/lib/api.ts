import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8017'

// Debug: выводим переменную окружения в консоль
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)
console.log('Final API_URL:', API_URL)

// Create axios instance with default config
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Temporarily disabled for CORS testing
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// API endpoints
export const endpoints = {
  // Products
  categories: '/categories/',
  products: '/products/',
  productDetail: (slug: string) => `/products/${slug}/`,
  featuredProducts: '/products/featured/',
  newProducts: '/products/new/',
  searchProducts: '/search/',
  categoryProducts: (slug: string) => `/categories/${slug}/products/`,
  
  // Cart & Orders
  cart: '/cart/',
  addToCart: '/cart/add/',
  updateCartItem: (id: number) => `/cart/items/${id}/`,
  removeFromCart: (id: number) => `/cart/items/${id}/remove/`,
  clearCart: '/cart/clear/',
  createOrder: '/orders/create/',
  orders: '/orders/',
  orderDetail: (orderNumber: string) => `/orders/${orderNumber}/`,
  
  // Blog
  blogCategories: '/blog/categories/',
  blogPosts: '/blog/',
  blogPostDetail: (slug: string) => `/blog/${slug}/`,
  featuredBlogPosts: '/blog/featured/',
  latestBlogPosts: '/blog/latest/',
  
  // Content endpoints
  banners: '/content/banners/',
  siteSettings: '/content/settings/',
  testimonials: '/content/testimonials/',
  featuredTestimonials: '/content/testimonials/featured/',
  faq: '/content/faq/',
  homepageData: '/content/homepage/',
  
  // Health check
  health: '/health/',
}

// Type definitions
export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image?: string
  is_active: boolean
  order: number
  products_count: number
}

export interface Product {
  id: number
  name: string
  slug: string
  category: Category
  product_type: string
  description: string
  short_description: string
  price: string
  old_price?: string
  final_price: string
  discount_amount: string
  discount_percent: number
  sku: string
  weight?: string
  dimensions?: string
  material?: string
  primary_image?: string
  images: ProductImage[]
  variants: ProductVariant[]
  is_featured: boolean
  is_new: boolean
  stock_quantity: number
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: number
  image: string
  alt_text: string
  is_primary: boolean
  order: number
}

export interface ProductVariant {
  id: number
  name: string
  sku: string
  price_modifier: string
  final_price: string
  stock_quantity: number
  is_active: boolean
}

export interface CartItem {
  id: number
  product: Product
  product_variant?: ProductVariant
  quantity: number
  price: string
  total_price: string
  created_at: string
}

export interface Cart {
  id: number
  session_key: string
  items: CartItem[]
  total_amount: string
  total_items: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  delivery_address: string
  delivery_city: string
  delivery_notes?: string
  status: string
  total_amount: string
  delivery_cost: string
  notes?: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  product: number
  product_variant?: number
  quantity: number
  price: string
  product_name: string
  product_sku: string
  total_price: string
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
  description: string
  posts_count: number
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  category?: BlogCategory
  excerpt: string
  content?: string
  featured_image_url?: string
  is_featured: boolean
  meta_title?: string
  meta_description?: string
  published_at: string
  created_at: string
  updated_at?: string
}

export interface Banner {
  id: number
  title: string
  subtitle?: string
  description?: string
  image_url?: string
  mobile_image_url?: string
  button_text?: string
  button_url?: string
  link_url?: string
  position: 'hero' | 'promo' | 'category'
  order: number
  background_color: string
  text_color: string
}

export interface SiteSettings {
  site_name: string
  site_description?: string
  logo_url?: string
  favicon_url?: string
  phone?: string
  email?: string
  address?: string
  working_hours?: string
  instagram_url?: string
  whatsapp_number?: string
  telegram_url?: string
  currency: string
  free_shipping_threshold?: number
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
}

export interface Testimonial {
  id: number
  name: string
  avatar_url?: string
  rating: number
  title?: string
  content: string
  product_name?: string
  created_at: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
  category?: string
}

export interface HomepageData {
  settings: SiteSettings
  hero_banners: Banner[]
  promo_banners: Banner[]
  testimonials: Testimonial[]
  faqs: FAQ[]
}

// API functions
export const categoryApi = {
  getAll: () => api.get<{results: Category[]; count: number}>(endpoints.categories),
}

export const productApi = {
  getAll: (params?: any) => api.get<{results: Product[]; count: number}>(endpoints.products, { params }),
  getBySlug: (slug: string) => api.get<Product>(endpoints.productDetail(slug)),
  getFeatured: () => api.get<Product[]>(endpoints.featuredProducts),
  getNew: () => api.get<Product[]>(endpoints.newProducts),
  search: (query: string) => api.get<Product[]>(endpoints.searchProducts, { params: { q: query } }),
  getByCategory: (categorySlug: string, params?: any) => api.get<{results: Product[]; count: number}>(endpoints.categoryProducts(categorySlug), { params }),
}

export const cartApi = {
  get: () => api.get<Cart>(endpoints.cart),
  addItem: (data: { product_id: number; product_variant_id?: number; quantity: number }) => 
    api.post<Cart>(endpoints.addToCart, data),
  updateItem: (id: number, data: { quantity: number }) => 
    api.put<Cart>(endpoints.updateCartItem(id), data),
  removeItem: (id: number) => api.delete<Cart>(endpoints.removeFromCart(id)),
  clear: () => api.post<Cart>(endpoints.clearCart),
}

export const orderApi = {
  create: (data: {
    customer_name: string
    customer_phone: string
    customer_email?: string
    delivery_address: string
    delivery_city: string
    delivery_notes?: string
    notes?: string
  }) => api.post<Order>(endpoints.createOrder, data),
  getAll: () => api.get<Order[]>(endpoints.orders),
  getByNumber: (orderNumber: string) => api.get<Order>(endpoints.orderDetail(orderNumber)),
}

export const blogApi = {
  getCategories: () => api.get<BlogCategory[]>(endpoints.blogCategories),
  getPosts: (params?: any) => api.get<{results: BlogPost[]; count: number}>(endpoints.blogPosts, { params }),
  getPostBySlug: (slug: string) => api.get<BlogPost>(endpoints.blogPostDetail(slug)),
  getFeatured: () => api.get<BlogPost[]>(endpoints.featuredBlogPosts),
  getLatest: () => api.get<BlogPost[]>(endpoints.latestBlogPosts),
}

export const contentApi = {
  getBanners: (params?: any) => api.get<Banner[]>(endpoints.banners, { params }),
  getSiteSettings: () => api.get<SiteSettings>(endpoints.siteSettings),
  getTestimonials: (params?: any) => api.get<Testimonial[]>(endpoints.testimonials, { params }),
  getFeaturedTestimonials: () => api.get<Testimonial[]>(endpoints.featuredTestimonials),
  getFAQ: (params?: any) => api.get<FAQ[]>(endpoints.faq, { params }),
  getHomepageData: () => api.get<HomepageData>(endpoints.homepageData),
}
