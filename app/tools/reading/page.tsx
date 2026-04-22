'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

export const dynamic = 'force-static'

const SAMPLE = `The most important thing about reading faster is not moving your eyes faster. It is eliminating subvocalization, the habit of silently pronouncing every word as you read it. Most people read at the speed they speak, roughly 150 words per minute, because their brain is sounding out every word. When you train yourself to recognize words visually rather than phonetically, that ceiling disappears.

Speed reading is not about skimming or skipping. It is about trusting your eyes to deliver words to your brain without the audio detour. The voice in your head feels helpful. It feels like comprehension. But it is actually a bottleneck, a speed limiter inherited from when you first learned to read as a child by sounding letters out loud.

The good news is that the brain is remarkably fast at recognizing whole words as visual shapes. You do not need to sound out the word "elephant" to know what it means. You recognize it the same way you recognize a stop sign. That recognition can happen well above 300 words per minute once you stop waiting for the internal voice to confirm each word.

There are three things that slow most readers down. The first is subvocalization, which we already covered. The second is regression, the habit of letting your eyes drift back to words you already passed. It happens automatically, triggered by the smallest moment of doubt, and most readers do it far more than they realize. The third is a narrow field of focus, reading one word at a time instead of training your peripheral vision to pick up the words on either side.

You do not have to fix all three at once. Start with pace. Use a tool that controls the speed for you, so the decision of how fast to go is taken out of your hands. Let the words come. At 200 words per minute, comprehension stays high for almost everyone. At 300, it takes adjustment but remains solid. Push past 400 and you are in territory where practice matters. At 500 and above, you are reading in a fundamentally different way, closer to pattern recognition than sequential decoding.

The goal is not to read every book at maximum speed. The goal is to expand your ceiling so that your comfortable reading speed rises. Someone who can read at 400 words per minute reads a news article at 250 with the same effort that someone trained at 150 reads it at 100. The ceiling determines the floor.

Start at a speed that feels slightly uncomfortable. Not impossible, just faster than natural. Hold it for a few minutes. Then push it up by one step. Do this every few sessions. Within a few weeks the speed that felt like a stretch becomes the new baseline.`

const WPM_PRESETS = [100, 150, 200, 250, 300, 400, 500]

function getORP(word: string): [string, string, string] {
  // Optimal Recognition Point: ~30% into the word
  const clean = word.replace(/[^a-zA-Z0-9]/g, '')
  if (clean.length <= 1) return ['', word, '']
  const orp = Math.max(0, Math.floor(clean.length * 0.3))
  const left  = word.slice(0, orp)
  const mid   = word.slice(orp, orp + 1)
  const right = word.slice(orp + 1)
  return [left, mid, right]
}

export default function ReadingToolPage() {
  const [input,   setInput]   = useState('')
  const [words,   setWords]   = useState<string[]>([])
  const [wpm,     setWpm]     = useState(200)
  const [index,   setIndex]   = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [done,    setDone]    = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function loadText(text: string) {
    const w = text.trim().split(/\s+/).filter(Boolean)
    if (w.length === 0) return
    setWords(w)
    setIndex(0)
    setPlaying(false)
    setStarted(true)
    setDone(false)
  }

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    stop()
    if (!playing || words.length === 0) return
    const ms = Math.round(60000 / wpm)
    intervalRef.current = setInterval(() => {
      setIndex(i => {
        if (i >= words.length - 1) {
          setPlaying(false)
          setDone(true)
          return i
        }
        return i + 1
      })
    }, ms)
    return stop
  }, [playing, wpm, words.length, stop])

  function togglePlay() {
    if (done) {
      setIndex(0)
      setDone(false)
      setPlaying(true)
      return
    }
    setPlaying(p => !p)
  }

  function reset() {
    setPlaying(false)
    setIndex(0)
    setDone(false)
  }

  function restart() {
    setStarted(false)
    setPlaying(false)
    setWords([])
    setIndex(0)
    setDone(false)
  }

  const progress  = words.length > 1 ? index / (words.length - 1) : 0
  const secsLeft  = words.length > 0 ? Math.ceil((words.length - index) / wpm * 60) : 0
  const totalSecs = words.length > 0 ? Math.ceil(words.length / wpm * 60) : 0
  const [left, mid, right] = started && words[index] ? getORP(words[index]) : ['', '', '']

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <span className="pr-nav-brand">ThinkSpeak</span>
          <div className="pr-nav-actions pr-nav-actions--desktop">
            <Link href="/" className="pr-nav-link">practice</Link>
            <Link href="/blog" className="pr-nav-link">blog</Link>
          </div>
        </div>
      </nav>

      {!started ? (
        <div className="tool-setup">
          <div className="tool-setup-header">
            <h1 className="tool-title">Reading Speed</h1>
            <p className="tool-sub">Paste any text and train yourself to read faster, one word at a time.</p>
          </div>

          <div className="tool-wpm-row">
            <span className="tool-wpm-label">Starting speed</span>
            <div className="tool-wpm-pills">
              {WPM_PRESETS.map(w => (
                <button
                  key={w}
                  className={`tool-wpm-pill ${wpm === w ? 'active' : ''}`}
                  onClick={() => setWpm(w)}
                >{w}</button>
              ))}
            </div>
            <span className="tool-wpm-unit">words / min</span>
          </div>

          <textarea
            className="tool-textarea"
            placeholder="Paste your text here..."
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={6}
          />

          <div className="tool-setup-actions">
            <button
              className="pr-start"
              onClick={() => loadText(input || SAMPLE)}
              disabled={false}
            >
              {input.trim() ? 'start reading' : 'try sample text'}
            </button>
          </div>

          {!input.trim() && (
            <p className="tool-hint">No text? We have a sample about speed reading itself.</p>
          )}
        </div>
      ) : (
        <div className="tool-reader">
          {/* Progress bar */}
          <div className="tool-progress-track">
            <div className="tool-progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>

          {/* Word display */}
          <div className="tool-word-wrap">
            <div className="tool-orp-line" />
            <p className="tool-word">
              <span className="tool-word-left">{left}</span>
              <span className="tool-word-mid">{mid}</span>
              <span className="tool-word-right">{right}</span>
            </p>
          </div>

          {/* Stats */}
          <div className="tool-stats">
            <span>{wpm} wpm</span>
            <span>{index + 1} / {words.length}</span>
            <span>{done ? 'done' : `${secsLeft}s left`}</span>
          </div>

          {/* Speed control */}
          <div className="tool-wpm-pills" style={{ justifyContent: 'center' }}>
            {WPM_PRESETS.map(w => (
              <button
                key={w}
                className={`tool-wpm-pill ${wpm === w ? 'active' : ''}`}
                onClick={() => setWpm(w)}
              >{w}</button>
            ))}
          </div>

          {/* Controls */}
          <div className="home-actions">
            <button className="pr-start" onClick={togglePlay}>
              {done ? 'restart' : playing ? 'pause' : 'play'}
            </button>
            {!done && (
              <button className="pr-skip" onClick={reset}>reset</button>
            )}
            <button className="pr-skip" onClick={restart}>new text</button>
          </div>

          <p className="tool-total">
            {words.length} words · ~{Math.ceil(totalSecs / 60)} min at {wpm} wpm
          </p>
        </div>
      )}
    </main>
  )
}
