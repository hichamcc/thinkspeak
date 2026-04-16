'use client'

import { useEffect, useRef } from 'react'

interface Props {
  blob: Blob
  duration: number
  isShort?: boolean
  onSave: () => void
  onDiscard: () => void
}

export default function Playback({ blob, duration, isShort, onSave, onDiscard }: Props) {
  const urlRef  = useRef<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const url = URL.createObjectURL(blob)
    urlRef.current = url
    if (audioRef.current) audioRef.current.src = url
    return () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current) }
  }, [blob])

  const mins = Math.floor(duration / 60)
  const secs = String(duration % 60).padStart(2, '0')

  function handleDownload() {
    if (!urlRef.current) return
    const a = document.createElement('a')
    a.href = urlRef.current
    a.download = 'thinkspeak-recording.webm'
    a.click()
  }

  return (
    <div className="playback">
      <p className="playback-duration">{mins}:{secs}</p>
      {isShort && (
        <p className="playback-short">that was short — save anyway?</p>
      )}
      <audio ref={audioRef} controls className="playback-audio" />
      <div className="playback-actions">
        <button className="pr-btn primary" onClick={onSave}>
          {isShort ? 'save anyway' : 'save'}
        </button>
        <button className="pr-btn" onClick={onDiscard}>discard</button>
        <button className="pr-btn" onClick={handleDownload} title="Download to upload to an AI for feedback">↓</button>
      </div>
    </div>
  )
}
