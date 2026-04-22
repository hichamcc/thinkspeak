'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { WORD_ASSOCIATION } from '@/lib/tools/data'
import { startRecording, type RecorderHandle } from '@/lib/practice/recorder'

const SECS = 30

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function WordAssociationPage() {
  const [words]   = useState(() => shuffle(WORD_ASSOCIATION))
  const [idx, setIdx]       = useState(0)
  const [phase, setPhase]   = useState<'home' | 'recording' | 'done'>('home')
  const [timeLeft, setTimeLeft] = useState(SECS)
  const [blob, setBlob]     = useState<Blob | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const recorderRef = useRef<RecorderHandle | null>(null)

  const word = words[idx]

  useEffect(() => {
    return () => { if (blobUrl) URL.revokeObjectURL(blobUrl) }
  }, [blobUrl])

  useEffect(() => {
    if (phase !== 'recording') {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          stopRecording()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  async function startSession() {
    setBlob(null); setBlobUrl(null)
    setTimeLeft(SECS)
    try {
      recorderRef.current = await startRecording()
    } catch { /* no mic */ }
    setPhase('recording')
  }

  async function stopRecording() {
    if (recorderRef.current) {
      const b = await recorderRef.current.stop()
      recorderRef.current = null
      setBlob(b)
      setBlobUrl(URL.createObjectURL(b))
    }
    setPhase('done')
  }

  function next() {
    setIdx(i => (i + 1) % words.length)
    setPhase('home')
    setBlob(null); setBlobUrl(null)
  }

  const pct = timeLeft / SECS
  const r = 70, circ = 2 * Math.PI * r

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/tools" className="pr-nav-link" style={{ fontSize: 13 }}>← tools</Link>
          <span className="pr-nav-brand">Word Association</span>
        </div>
      </nav>

      {phase === 'home' && (
        <div className="pr-home">
          <div className="home-headline">
            <span className="home-eyebrow">word association</span>
            <p className="home-sub">See a word. Speak as many related words as you can before time runs out.</p>
          </div>
          <div className="topic-card topic-card-framed">
            <p className="topic-text" style={{ fontSize: 56, letterSpacing: '-0.04em' }}>{word}</p>
          </div>
          <div className="home-actions">
            <button className="pr-start" onClick={startSession}>start — {SECS}s</button>
            <button className="pr-skip" onClick={next}>next word →</button>
          </div>
        </div>
      )}

      {phase === 'recording' && (
        <div className="pr-phase">
          <div className="topic-card">
            <p className="topic-text" style={{ fontSize: 56, letterSpacing: '-0.04em' }}>{word}</p>
          </div>
          <div className="phase-timer-circle">
            <svg width="180" height="180">
              <circle cx="90" cy="90" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle cx="90" cy="90" r={r} fill="none" stroke="var(--fg)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - pct)}
                transform="rotate(-90 90 90)"
              />
            </svg>
            <div className="phase-timer-inner">
              <span className="phase-circle-number">{timeLeft}</span>
              <span className="phase-circle-label">seconds</span>
            </div>
          </div>
          <p className="pr-phase-name">speak your associations</p>
          <button className="pr-skip" onClick={stopRecording}>stop early</button>
        </div>
      )}

      {phase === 'done' && (
        <div className="pr-phase">
          <div className="topic-card topic-card-framed">
            <p className="topic-text" style={{ fontSize: 48 }}>{word}</p>
          </div>
          {blobUrl && <audio src={blobUrl} controls className="playback-audio" />}
          <p className="home-sub" style={{ textAlign: 'center' }}>Listen back and count how many you said.</p>
          <div className="home-actions">
            <button className="pr-start" onClick={next}>next word</button>
            <button className="pr-skip" onClick={startSession}>try again</button>
          </div>
        </div>
      )}
    </main>
  )
}
