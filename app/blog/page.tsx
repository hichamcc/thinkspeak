import type { Metadata } from 'next'
import Link from 'next/link'
import { POSTS } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Blog — Speaking Practice Tips',
  description: 'Practical advice on improving your speaking, building fluency, and practicing a language on your own.',
  alternates: { canonical: 'https://thinkspeak.vercel.app/blog' },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPage() {
  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/" className="pr-nav-brand" style={{ textDecoration: 'none' }}>ThinkSpeak</Link>
          <Link href="/" className="pr-nav-link">back</Link>
        </div>
      </nav>

      <div className="blog-list-body">
        <h1 className="blog-list-title">Speaking Practice</h1>
        <p className="blog-list-sub">Practical advice on fluency, confidence, and daily practice.</p>

        <div className="blog-list">
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <span className="blog-card-date">{formatDate(post.date)}</span>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-desc">{post.description}</p>
              <span className="blog-card-read">Read →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
