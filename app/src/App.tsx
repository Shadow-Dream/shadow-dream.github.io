import { useState } from 'react'
import './App.css'

export default function App() {
  const [baseReady, setBaseReady] = useState(false)
  const [blurReady, setBlurReady] = useState(false)
  const [mix, setMix] = useState(0.6)

  const isReady = baseReady && blurReady

  return (
    <div className={`page ${isReady ? 'is-ready' : ''}`}>
      <video
        className="bg-video base"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        onCanPlay={() => setBaseReady(true)}
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <video
        className="bg-video blur"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        style={{ opacity: isReady ? mix : 0 }}
        onCanPlay={() => setBlurReady(true)}
      >
        <source src="/bg-blur.mp4" type="video/mp4" />
      </video>
      <div className="video-fade" aria-hidden />
      <div className="glass-controls">
        <label htmlFor="blurRange">磨砂</label>
        <input
          id="blurRange"
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(mix * 100)}
          onChange={(event) => setMix(Number(event.target.value) / 100)}
          aria-label="磨砂强度"
        />
        <span>{Math.round(mix * 100)}%</span>
      </div>
    </div>
  )
}
