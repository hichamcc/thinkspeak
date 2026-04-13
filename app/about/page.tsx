import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About & Privacy',
  description: 'How ThinkSpeak works, why we record your voice, and how your data stays private on your device.',
  alternates: { canonical: 'https://thinkspeak.vercel.app/about' },
}

export default function AboutPage() {
  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <span className="pr-nav-brand">ThinkSpeak</span>
          <Link href="/" className="pr-nav-link">back</Link>
        </div>
      </nav>

      <div className="about-body">
        <section className="about-section">
          <h2 className="about-heading">What is ThinkSpeak?</h2>
          <p className="about-text">
            A simple tool to practice speaking out loud in any language.
            You get a topic, 30 seconds to think, and 60 seconds to speak.
            That's it.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Your recordings</h2>
          <p className="about-text">
            When you allow mic access, your answer is recorded so you can listen back immediately after.
            Hearing yourself speak is one of the fastest ways to notice what to improve — your pace,
            your filler words, how clearly you express ideas.
          </p>
          <p className="about-text">
            Recordings are saved directly in your browser using IndexedDB, a built-in storage that works
            like a private folder on your device. Nothing is uploaded, nothing leaves your computer or phone.
          </p>
          <p className="about-text">
            If you clear your browser data or site storage, all recordings will be permanently deleted.
            There is no backup.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Without recording</h2>
          <p className="about-text">
            Mic access is optional. If you deny it, the timer still runs and you can still practice —
            you just won't have a recording to review afterward.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Privacy</h2>
          <p className="about-text">
            No account. No login. No data sent to any server.
            The only analytics collected are anonymous page visits via Vercel Analytics
            — no personal data, no recording content, no identifiers.
          </p>
        </section>
      </div>
    </main>
  )
}
