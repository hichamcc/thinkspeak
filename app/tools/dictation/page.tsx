'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { DICTATION, type Language } from '@/lib/tools/data'

const LANGS: Language[] = ['en', 'fr', 'es', 'ar', 'ja']

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function diffWords(correct: string, typed: string) {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff\u3040-\u30ff\u4e00-\u9fff\s]/g, '').trim()
  const a = normalize(correct).split(/\s+/)
  const b = normalize(typed).split(/\s+/)
  return a.map((word, i) => ({ word, correct: word === (b[i] ?? '') }))
}

export default function DictationPage() {
  const [lang, setLang] = useState<Language>('en')
  const [order]         = useState<Record<Language, number[]>>(() => {
    const r = {} as Record<Language, number[]>
    for (const l of LANGS) r[l] = shuffle(DICTATION[l].map((_, i) => i))
    return r
  })
  const [idx, setIdx]       = useState<Record<Language, number>>({ en: 0, fr: 0, es: 0, ar: 0, ja: 0 })
  const [input, setInput]   = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [speed, setSpeed]   = useState(0.85)
  const [playing, setPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const sentenceIdx = order[lang][idx[lang] % order[lang].length]
  const sentence    = DICTATION[lang][sentenceIdx]
  const audioSrc    = `/audio/dictation/${lang}-${sentenceIdx}.mp3`

  function changeLang(l: Language) {
    stopAudio()
    setLang(l); setInput(''); setSubmitted(false)
  }

  function stopAudio() {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0 }
    setPlaying(false)
  }

  function speak() {
    stopAudio()
    const audio = new Audio(audioSrc)
    audio.playbackRate = speed
    audioRef.current = audio
    setPlaying(true)
    audio.onended = () => setPlaying(false)
    audio.onerror = () => {
      // Fallback to browser TTS if file not generated yet
      setPlaying(false)
      const u = new SpeechSynthesisUtterance(sentence)
      u.rate = speed
      window.speechSynthesis.speak(u)
    }
    audio.play()
  }

  function submit() {
    if (!input.trim()) return
    stopAudio()
    setSubmitted(true)
  }

  function next() {
    stopAudio()
    setIdx(prev => ({ ...prev, [lang]: prev[lang] + 1 }))
    setInput(''); setSubmitted(false)
  }

  const diff  = submitted ? diffWords(sentence, input) : []
  const score = submitted && diff.length > 0
    ? Math.round(diff.filter(w => w.correct).length / diff.length * 100)
    : 0

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/tools" className="pr-nav-link" style={{ fontSize: 13 }}>← tools</Link>
          <span className="pr-nav-brand">Dictation</span>
        </div>
      </nav>

      <div className="pr-home" style={{ maxWidth: 560, width: '100%', margin: '0 auto' }}>
        <div className="home-headline">
          <span className="home-eyebrow">dictation</span>
          <p className="home-sub">Listen to the sentence, then type exactly what you heard.</p>
        </div>

        <div className="pr-nav-langs">
          {LANGS.map(l => (
            <button key={l} className={`lang-pill ${lang === l ? 'active' : ''}`} onClick={() => changeLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Speed */}
        <div className="tool-wpm-row" style={{ gap: 6 }}>
          <span className="tool-wpm-label">speed</span>
          <div className="tool-wpm-pills">
            {([0.7, 0.85, 1.0, 1.15] as const).map(s => (
              <button key={s} className={`tool-wpm-pill ${speed === s ? 'active' : ''}`} onClick={() => setSpeed(s)}>
                ×{s}
              </button>
            ))}
          </div>
        </div>

        {/* Listen */}
        <button className="pr-start" onClick={speak}>
          {playing ? 'playing...' : '▶ listen'}
        </button>

        {!submitted ? (
          <>
            <textarea
              className="tool-textarea"
              rows={3}
              placeholder="type what you heard..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              style={{ width: '100%' }}
            />
            <div className="home-actions">
              <button className="pr-start" onClick={submit} disabled={!input.trim()}>check</button>
              <button className="pr-skip" onClick={speak}>replay</button>
              <button className="pr-skip" onClick={next}>next →</button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <div className="topic-card topic-card-framed" style={{ padding: '16px 24px', alignItems: 'flex-start', textAlign: 'left' }}>
              <p className="home-stats" style={{ marginBottom: 6 }}>correct sentence</p>
              <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6, color: 'var(--fg)' }}>{sentence}</p>
            </div>

            <div className="topic-card topic-card-framed" style={{ padding: '16px 24px', alignItems: 'flex-start', textAlign: 'left' }}>
              <p className="home-stats" style={{ marginBottom: 8 }}>your answer — {score}%</p>
              <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.8 }}>
                {diff.map((w, i) => (
                  <span key={i} style={{ color: w.correct ? 'var(--fg)' : '#e74c3c', marginRight: 6 }}>
                    {w.word}
                  </span>
                ))}
              </p>
            </div>

            <div className="home-actions">
              <button className="pr-start" onClick={next}>next sentence</button>
              <button className="pr-skip" onClick={() => { setSubmitted(false); setInput('') }}>try again</button>
            </div>
          </div>
        )}

        <span className="queue-pos">
          {(idx[lang] % order[lang].length) + 1} / {order[lang].length}
        </span>
      </div>
    </main>
  )
}
