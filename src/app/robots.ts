import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/AgustinCassaniCV.pdf',
    },
    sitemap: 'https://agustincassani.com/sitemap.xml',
  }
}
