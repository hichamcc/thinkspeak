import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Language Tools',
  description: 'Free tools to improve speaking, reading, listening, and vocabulary in any language.',
  alternates: { canonical: 'https://thinkspeak.vercel.app/tools' },
}

const TOOLS = [
  {
    href:  '/tools/reading',
    name:  'Reading Speed',
    desc:  'Train yourself to read faster with RSVP. One word at a time, from 100 to 500 WPM.',
    tag:   'reading',
  },
  {
    href:  '/tools/shadowing',
    name:  'Shadowing',
    desc:  'Hear a sentence, repeat it immediately. The fastest technique for accent and natural rhythm.',
    tag:   'speaking',
  },
  {
    href:  '/tools/flashcards',
    name:  'Vocabulary Flashcards',
    desc:  'Flip through key language learning vocabulary across 5 languages. Rate yourself and repeat the ones you missed.',
    tag:   'vocabulary',
  },
  {
    href:  '/tools/dictation',
    name:  'Dictation',
    desc:  'Listen to a spoken sentence and type what you hear. Trains the gap between hearing and writing.',
    tag:   'listening',
  },
  {
    href:  '/tools/tongue-twisters',
    name:  'Tongue Twisters',
    desc:  'Record yourself on progressively harder tongue twisters. Listen back for clarity and speed.',
    tag:   'speaking',
  },
  {
    href:  '/tools/debate',
    name:  'Debate Prompt',
    desc:  'Get a position — for or against — and argue it for 60 seconds. Then flip and argue the other side.',
    tag:   'speaking',
  },
  {
    href:  '/tools/word-association',
    name:  'Word Association',
    desc:  'See a word. Speak as many related words as you can in 30 seconds. Trains vocabulary retrieval speed.',
    tag:   'vocabulary',
  },
]

const TAG_COLOR: Record<string, string> = {
  reading:    '#3b82f6',
  speaking:   '#10b981',
  vocabulary: '#8b5cf6',
  listening:  '#f59e0b',
}

export default function ToolsPage() {
  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/" className="pr-nav-brand" style={{ textDecoration: 'none' }}>ThinkSpeak</Link>
          <div className="pr-nav-actions pr-nav-actions--desktop">
            <Link href="/" className="pr-nav-link">practice</Link>
            <Link href="/blog" className="pr-nav-link">blog</Link>
            <Link href="/about" className="pr-nav-link">about</Link>
          </div>
        </div>
      </nav>

      <div className="tools-landing">
        <div className="tools-landing-header">
          <h1 className="tool-title">Language Tools</h1>
          <p className="tool-sub">Focused exercises to sharpen speaking, reading, listening, and vocabulary.</p>
        </div>

        <div className="tools-grid">
          {TOOLS.map(t => (
            <Link key={t.href} href={t.href} className="tools-card">
              <span
                className="tools-card-tag"
                style={{ color: TAG_COLOR[t.tag] ?? '#666', borderColor: TAG_COLOR[t.tag] ?? '#e2e2e2' }}
              >{t.tag}</span>
              <span className="tools-card-name">{t.name}</span>
              <span className="tools-card-desc">{t.desc}</span>
              <span className="tools-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
