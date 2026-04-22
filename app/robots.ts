import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/settings', '/practice'],
      },
    ],
    sitemap: 'https://thinkspeak.vercel.app/sitemap.xml',
  }
}
