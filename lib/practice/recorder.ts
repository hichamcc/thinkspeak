export interface RecorderHandle {
  stop: () => Promise<Blob>
  cancel: () => void
  analyser: AnalyserNode
}

export async function startRecording(): Promise<RecorderHandle> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const chunks: BlobPart[] = []

  const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
    ? 'audio/webm;codecs=opus'
    : MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : 'audio/mp4'

  const recorder = new MediaRecorder(stream, { mimeType })

  // Web Audio — for waveform visualization
  const audioCtx = new AudioContext()
  const source   = audioCtx.createMediaStreamSource(stream)
  const analyser = audioCtx.createAnalyser()
  analyser.fftSize = 256
  source.connect(analyser)

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data)
  }

  recorder.start(250)

  function stopStream() {
    stream.getTracks().forEach(t => t.stop())
    audioCtx.close()
  }

  return {
    analyser,
    stop: () =>
      new Promise<Blob>(resolve => {
        recorder.onstop = () => {
          stopStream()
          resolve(new Blob(chunks, { type: mimeType }))
        }
        recorder.stop()
      }),
    cancel: () => {
      recorder.stop()
      stopStream()
    },
  }
}
