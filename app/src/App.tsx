import { useEffect, useRef, useState } from 'react'
import './App.css'

export default function App() {
  const [baseReady, setBaseReady] = useState(false)
  const [blurReady, setBlurReady] = useState(false)
  const [mix, setMix] = useState(0.6)
  const baseRef = useRef<HTMLVideoElement | null>(null)
  const blurRef = useRef<HTMLVideoElement | null>(null)

  const isReady = baseReady && blurReady

  useEffect(() => {
    if (!isReady) return
    const base = baseRef.current
    const blur = blurRef.current
    if (!base || !blur) return

    base.currentTime = 0
    blur.currentTime = 0

    const playBoth = async () => {
      try {
        await Promise.all([base.play(), blur.play()])
      } catch {
        // ignore autoplay errors (muted should allow)
      }
    }

    playBoth()

    let raf = 0
    const sync = () => {
      if (!base || !blur) return
      const drift = Math.abs(base.currentTime - blur.currentTime)
      if (drift > 0.033) {
        blur.currentTime = base.currentTime
      }
      raf = requestAnimationFrame(sync)
    }

    raf = requestAnimationFrame(sync)
    return () => cancelAnimationFrame(raf)
  }, [isReady])

  return (
    <div className={`page ${isReady ? 'is-ready' : ''}`}>
      <video
        className="bg-video base"
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        ref={baseRef}
        onCanPlay={() => setBaseReady(true)}
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <video
        className="bg-video blur"
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        style={{ opacity: isReady ? mix : 0 }}
        ref={blurRef}
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
