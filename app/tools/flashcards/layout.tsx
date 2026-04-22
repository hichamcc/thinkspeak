import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Language Flashcards',
  description: 'Learn vocabulary in French, Spanish, Arabic, and Japanese with spaced flashcards. 60 words with translations and romanization.',
  keywords: ['language flashcards', 'vocabulary flashcards', 'French vocabulary', 'Spanish vocabulary', 'Arabic vocabulary', 'Japanese vocabulary', 'language learning'],
  alternates: { canonical: 'https://thinkspeak.vercel.app/tools/flashcards' },
  openGraph: {
    title: 'Language Flashcards — ThinkSpeak',
    description: 'Learn vocabulary in French, Spanish, Arabic, and Japanese. 60 words with translations.',
    url: 'https://thinkspeak.vercel.app/tools/flashcards',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
