import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Language Dictation Practice',
  description: 'Sharpen your listening comprehension by hearing sentences and typing exactly what you heard. Practice in English, French, Spanish, Arabic, and Japanese.',
  keywords: ['dictation practice', 'listening comprehension', 'language dictation', 'hear and type', 'language listening', 'language learning'],
  alternates: { canonical: 'https://thinkspeak.vercel.app/tools/dictation' },
  openGraph: {
    title: 'Language Dictation — ThinkSpeak',
    description: 'Hear sentences and type exactly what you heard. Sharpen your listening in 5 languages.',
    url: 'https://thinkspeak.vercel.app/tools/dictation',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
