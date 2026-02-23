import { useState } from 'react'
import './App.css'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className={`page ${isReady ? 'is-ready' : ''}`}>
      <video
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        onCanPlay={() => setIsReady(true)}
      >
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
      </video>
      <div className="video-fade" aria-hidden />
    </div>
  )
}
