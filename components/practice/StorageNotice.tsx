'use client'

interface Props {
  onClose: () => void
}

export default function StorageNotice({ onClose }: Props) {
  return (
    <div className="notice-backdrop">
      <div className="notice-box">
        <p className="notice-title">Your recordings stay on your device</p>
        <p className="notice-body">
          Everything you record here is saved directly in your browser — like a note on your own computer.
          Nothing is sent to a server or stored online. Only you can access it, and only on this device.
        </p>
        <p className="notice-body">
          If you clear your browser data, your recordings will be deleted.
        </p>
        <button className="notice-btn" onClick={onClose}>Got it</button>
      </div>
    </div>
  )
}
