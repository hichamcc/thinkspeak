import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Speak Practice',
  description: 'Language speaking practice — EN / FR',
  openGraph: {
    images: [{ url: '/og.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
