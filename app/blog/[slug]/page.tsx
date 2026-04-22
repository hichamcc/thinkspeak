import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { POSTS, getPost } from '@/lib/blog/posts'

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://thinkspeak.vercel.app/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://thinkspeak.vercel.app/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og.png'],
    },
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/" className="pr-nav-brand" style={{ textDecoration: 'none' }}>ThinkSpeak</Link>
          <Link href="/blog" className="pr-nav-link">← blog</Link>
        </div>
      </nav>

      <article className="blog-post-body">
        <header className="blog-post-header">
          <p className="blog-post-date">{formatDate(post.date)}</p>
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-desc">{post.description}</p>
        </header>

        <div className="blog-post-content">
          {post.content}
        </div>
      </article>
    </main>
  )
}
