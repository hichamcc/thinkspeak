import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Language Shadowing Practice',
  description: 'Listen to native sentences and repeat them immediately. The fastest technique for improving accent, rhythm, and natural pronunciation in French, Spanish, Arabic, and Japanese.',
  keywords: ['language shadowing', 'shadowing technique', 'pronunciation practice', 'accent improvement', 'listening practice', 'language learning'],
  alternates: { canonical: 'https://thinkspeak.vercel.app/tools/shadowing' },
  openGraph: {
    title: 'Language Shadowing — ThinkSpeak',
    description: 'Listen to native sentences and repeat them immediately. Improve your accent and rhythm.',
    url: 'https://thinkspeak.vercel.app/tools/shadowing',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
