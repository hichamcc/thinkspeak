import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/blog/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://thinkspeak.vercel.app'
  const blogPosts: MetadataRoute.Sitemap = POSTS.map(p => ({
    url:             `${base}/blog/${p.slug}`,
    lastModified:    new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }))
  return [
    { url: base,               lastModified: new Date(), changeFrequency: 'monthly', priority: 1   },
    { url: `${base}/blog`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/settings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...blogPosts,
  ]
}
