'use client'

import { useEffect, useRef, useState } from 'react'
import type { Category, Language, PracticeSession } from '@/lib/practice/types'
import { CATEGORY_LABELS } from '@/lib/practice/topics'
import { deleteSession, updateSessionNote } from '@/lib/practice/db'

interface Props {
  sessions: PracticeSession[]
  onDeleted: (id: string) => void
}

type SpeedOption = 1 | 1.5 | 2

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = String(secs % 60).padStart(2, '0')
  return `${m}:${s}`
}

function SessionRow({ session, onDeleted }: { session: PracticeSession; onDeleted: (id: string) => void }) {
  const urlRef   = useRef<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed]     = useState<SpeedOption>(1)
  const [note, setNote]       = useState(session.note ?? '')

  useEffect(() => {
    return () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current) }
  }, [])

  function togglePlay() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      if (!urlRef.current) {
        urlRef.current = URL.createObjectURL(session.blob)
        audioRef.current.src = urlRef.current
      }
      audioRef.current.playbackRate = speed
      audioRef.current.play()
      setPlaying(true)
    }
  }

  function changeSpeed(s: SpeedOption) {
    setSpeed(s)
    if (audioRef.current) audioRef.current.playbackRate = s
  }

  function handleDownload() {
    const url = URL.createObjectURL(session.blob)
    const a = document.createElement('a')
    const slug = session.topic.slice(0, 40).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    a.href = url
    a.download = `thinkspeak-${slug}.webm`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleDelete() {
    await deleteSession(session.id)
    onDeleted(session.id)
  }

  async function handleNoteBlur() {
    await updateSessionNote(session.id, note)
  }

  return (
    <div className="history-row">
      <div className="history-meta">
        <span className="history-topic">{session.topic}</span>
        <span className="history-detail">
          {CATEGORY_LABELS[session.category]?.[session.language] ?? session.category}
          {' · '}{session.language.toUpperCase()}
          {' · '}{formatDuration(session.duration)}
          {' · '}{formatDate(session.date)}
        </span>
        <div className="speed-row">
          {([1, 1.5, 2] as SpeedOption[]).map(s => (
            <button
              key={s}
              className={`speed-btn ${speed === s ? 'active' : ''}`}
              onClick={() => changeSpeed(s)}
            >×{s}</button>
          ))}
        </div>
        <textarea
          className="note-input"
          rows={1}
          placeholder="add a note..."
          value={note}
          onChange={e => setNote(e.target.value)}
          onBlur={handleNoteBlur}
        />
      </div>
      <div className="history-actions">
        <button className="history-btn" onClick={togglePlay}>
          {playing ? 'pause' : 'play'}
        </button>
        <button className="history-btn" onClick={handleDownload} title="Download to upload to ChatGPT, Claude, or any AI for feedback">↓</button>
        <button className="history-btn danger" onClick={handleDelete}>del</button>
      </div>
      <audio
        ref={audioRef}
        onEnded={() => setPlaying(false)}
        style={{ display: 'none' }}
      />
    </div>
  )
}

const CATEGORIES: Category[] = ['daily', 'opinion', 'story', 'describe', 'abstract', 'word']

export default function HistoryList({ sessions, onDeleted }: Props) {
  const [filterLang, setFilterLang] = useState<Language | 'all'>('all')
  const [filterCat,  setFilterCat]  = useState<Category | 'all'>('all')

  if (sessions.length === 0) {
    return <p className="history-empty">No recordings yet.</p>
  }

  const total     = sessions.length
  const totalMins = Math.round(sessions.reduce((acc, s) => acc + s.duration, 0) / 60)
  const enCount   = sessions.filter(s => s.language === 'en').length
  const frCount   = sessions.filter(s => s.language === 'fr').length

  const filtered = sessions.filter(s => {
    if (filterLang !== 'all' && s.language !== filterLang) return false
    if (filterCat  !== 'all' && s.category !== filterCat)  return false
    return true
  })

  return (
    <div>
      <p className="history-stats">
        {total} sessions · {totalMins} min · {enCount} EN · {frCount} FR
      </p>

      <div className="filter-row" style={{ marginTop: 12 }}>
        {(['all', 'en', 'fr'] as const).map(l => (
          <button
            key={l}
            className={`filter-chip ${filterLang === l ? 'active' : ''}`}
            onClick={() => setFilterLang(l)}
          >{l === 'all' ? 'all lang' : l.toUpperCase()}</button>
        ))}
      </div>

      <div className="filter-row" style={{ marginTop: 8 }}>
        <button
          className={`filter-chip ${filterCat === 'all' ? 'active' : ''}`}
          onClick={() => setFilterCat('all')}
        >all topics</button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-chip ${filterCat === cat ? 'active' : ''}`}
            onClick={() => setFilterCat(cat)}
          >{CATEGORY_LABELS[cat].en}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="history-empty" style={{ marginTop: 16 }}>No sessions match this filter.</p>
      ) : (
        <div className="history-list" style={{ marginTop: 16 }}>
          {filtered.map(s => (
            <SessionRow key={s.id} session={s} onDeleted={onDeleted} />
          ))}
        </div>
      )}
    </div>
  )
}
