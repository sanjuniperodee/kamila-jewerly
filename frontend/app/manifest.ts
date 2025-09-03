import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KAMIL Jewelry - Ювелирные украшения в Астане',
    short_name: 'KAMIL Jewelry',
    description: 'Бутик-ателье украшений для женщин с характером и стилем',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#d946ef',
    orientation: 'portrait',
    categories: ['shopping', 'jewelry', 'fashion'],
    lang: 'ru',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
