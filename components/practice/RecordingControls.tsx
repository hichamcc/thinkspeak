'use client'

import Waveform from './Waveform'

interface Props {
  onStop: () => void
  analyser?: AnalyserNode
}

export default function RecordingControls({ onStop, analyser }: Props) {
  return (
    <div className="rec-controls">
      {analyser && <Waveform analyser={analyser} />}
      <div className="rec-indicator">
        <span className="rec-dot" />
        <span className="rec-label">recording</span>
      </div>
      <button className="rec-stop" onClick={onStop}>stop early</button>
    </div>
  )
}
