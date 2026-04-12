import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://thinkspeak.vercel.app'
  return [
    { url: base,          lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/settings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]
}
