'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { TONGUE_TWISTERS, type Language } from '@/lib/tools/data'
import { startRecording, type RecorderHandle } from '@/lib/practice/recorder'

const LANGS: Language[] = ['en', 'fr', 'es', 'ar', 'ja']
const DIFFICULTIES = ['easy', 'medium', 'hard'] as const

export default function TongueTwistersPage() {
  const [lang, setLang]     = useState<Language>('en')
  const [diff, setDiff]     = useState<'easy' | 'medium' | 'hard'>('easy')
  const [idx, setIdx]       = useState(0)
  const [recording, setRecording] = useState(false)
  const [blob, setBlob]     = useState<Blob | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  const recorderRef = useRef<RecorderHandle | null>(null)

  const list   = TONGUE_TWISTERS[lang].filter(t => t.difficulty === diff)
  const twister = list[idx % list.length]

  function changeLang(l: Language) {
    setLang(l); setIdx(0); setBlob(null); setBlobUrl(null); setRecording(false)
  }

  function changeDiff(d: typeof diff) {
    setDiff(d); setIdx(0); setBlob(null); setBlobUrl(null); setRecording(false)
  }

  async function toggleRecording() {
    if (recording) {
      if (recorderRef.current) {
        const b = await recorderRef.current.stop()
        recorderRef.current = null
        setBlob(b)
        if (blobUrl) URL.revokeObjectURL(blobUrl)
        setBlobUrl(URL.createObjectURL(b))
      }
      setRecording(false)
    } else {
      setBlob(null); setBlobUrl(null)
      try {
        recorderRef.current = await startRecording()
        setRecording(true)
      } catch { /* no mic */ }
    }
  }

  function next() {
    setIdx(i => (i + 1) % list.length)
    setBlob(null); setBlobUrl(null); setRecording(false)
  }

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/tools" className="pr-nav-link" style={{ fontSize: 13 }}>← tools</Link>
          <span className="pr-nav-brand">Tongue Twisters</span>
        </div>
      </nav>

      <div className="pr-home">
        <div className="home-headline">
          <span className="home-eyebrow">tongue twisters</span>
          <p className="home-sub">Record yourself, listen back, and push for speed without losing clarity.</p>
        </div>

        {/* Language + difficulty */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div className="pr-nav-langs">
            {LANGS.map(l => (
              <button key={l} className={`lang-pill ${lang === l ? 'active' : ''}`} onClick={() => changeLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="tool-wpm-pills">
            {DIFFICULTIES.map(d => (
              <button key={d} className={`tool-wpm-pill ${diff === d ? 'active' : ''}`} onClick={() => changeDiff(d)}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Twister card */}
        <div className="topic-card topic-card-framed" style={{ maxWidth: 520 }}>
          <p className="topic-text" style={{ fontSize: 26, lineHeight: 1.4 }}>{twister.text}</p>
          {twister.phonetic && (
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 10, fontStyle: 'italic' }}>
              {twister.phonetic}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="home-actions">
          <button
            className={`pr-start ${recording ? '' : ''}`}
            onClick={toggleRecording}
            style={recording ? { background: '#e74c3c' } : {}}
          >
            {recording ? '⬛ stop' : '⏺ record'}
          </button>
          <button className="pr-skip" onClick={next}>next →</button>
        </div>

        {/* Playback */}
        {blobUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <audio src={blobUrl} controls className="playback-audio" />
          </div>
        )}

        <p className="queue-pos">{(idx % list.length) + 1} / {list.length} {diff}</p>
      </div>
    </main>
  )
}
