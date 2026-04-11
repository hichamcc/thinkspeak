'use client'

import { useEffect, useRef } from 'react'

interface Props {
  analyser: AnalyserNode
}

const BAR_COUNT = 7

export default function Waveform({ analyser }: Props) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    const data = new Uint8Array(analyser.frequencyBinCount)
    const step = Math.floor(data.length / BAR_COUNT)

    function draw() {
      rafRef.current = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(data)
      for (let i = 0; i < BAR_COUNT; i++) {
        const val    = data[i * step] / 255
        const height = Math.max(4, Math.round(val * 40))
        const bar    = barsRef.current[i]
        if (bar) bar.style.height = `${height}px`
      }
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [analyser])

  return (
    <div className="waveform">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={i}
          className="waveform-bar"
          ref={el => { barsRef.current[i] = el }}
        />
      ))}
    </div>
  )
}
