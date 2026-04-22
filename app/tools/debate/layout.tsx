import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Debate Practice for Language Learners',
  description: 'Argue both sides of a prompt to build fluency under pressure. 30 prompts, timed thinking and speaking rounds, record yourself for playback.',
  keywords: ['debate practice', 'speaking fluency', 'language debate', 'oral practice', 'speaking under pressure', 'language learning'],
  alternates: { canonical: 'https://thinkspeak.vercel.app/tools/debate' },
  openGraph: {
    title: 'Debate Practice — ThinkSpeak',
    description: 'Argue both sides of a prompt. Build fluency and confidence under timed pressure.',
    url: 'https://thinkspeak.vercel.app/tools/debate',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
