import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Word Association Speaking Exercise',
  description: 'Speak freely about a single word for 30 seconds. Build spontaneity, vocabulary recall, and confidence speaking without preparation.',
  keywords: ['word association', 'speaking exercise', 'spontaneous speaking', 'vocabulary recall', 'fluency exercise', 'language learning'],
  alternates: { canonical: 'https://thinkspeak.vercel.app/tools/word-association' },
  openGraph: {
    title: 'Word Association — ThinkSpeak',
    description: 'Speak freely about a single word for 30 seconds. Build spontaneous fluency.',
    url: 'https://thinkspeak.vercel.app/tools/word-association',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
