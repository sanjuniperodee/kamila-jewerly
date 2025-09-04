'use client'

import { usePathname } from 'next/navigation'
import Head from 'next/head'

interface CanonicalUrlProps {
  path?: string
}

export function CanonicalUrl({ path }: CanonicalUrlProps) {
  const pathname = usePathname()
  const currentPath = path || pathname
  const canonicalUrl = `https://kamiljewelry.kz${currentPath}`

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
