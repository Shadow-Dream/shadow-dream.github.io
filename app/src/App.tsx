import { useState, type CSSProperties } from 'react'
import './App.css'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [blur, setBlur] = useState(8)

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
      <div
        className="glass-layer"
        style={{ '--glass-blur': `${blur}px` } as CSSProperties}
        aria-hidden
      />
      <div className="video-fade" aria-hidden />
      <div className="glass-controls">
        <label htmlFor="blurRange">磨砂</label>
        <input
          id="blurRange"
          type="range"
          min={0}
          max={24}
          step={1}
          value={blur}
          onChange={(event) => setBlur(Number(event.target.value))}
          aria-label="磨砂强度"
        />
        <span>{blur}px</span>
      </div>
    </div>
  )
}
