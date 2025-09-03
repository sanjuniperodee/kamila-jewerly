/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '127.0.0.1', 'taxi.aktau-go.kz'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8017',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'taxi.aktau-go.kz',
        port: '8017',
        pathname: '/media/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8017'}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
