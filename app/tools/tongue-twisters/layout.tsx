import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tongue Twisters for Language Practice',
  description: 'Practice articulation and pronunciation with tongue twisters in English, French, Spanish, Arabic, and Japanese. Easy, medium, and hard difficulty levels.',
  keywords: ['tongue twisters', 'pronunciation practice', 'articulation', 'language pronunciation', 'speaking practice', 'language learning'],
  alternates: { canonical: 'https://thinkspeak.vercel.app/tools/tongue-twisters' },
  openGraph: {
    title: 'Tongue Twisters — ThinkSpeak',
    description: 'Improve articulation and pronunciation with tongue twisters in 5 languages.',
    url: 'https://thinkspeak.vercel.app/tools/tongue-twisters',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
