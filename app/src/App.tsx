import { useEffect, useRef, useState } from 'react'
import './App.css'

export default function App() {
  const [baseReady, setBaseReady] = useState(false)
  const [blurReady, setBlurReady] = useState(false)
  const [mix, setMix] = useState(0.6)
  const baseRef = useRef<HTMLVideoElement | null>(null)
  const blurRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const maxDpr = 1.5
    let dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
    let width = 0
    let height = 0
    let animationId = 0

    const droplets: Array<{
      x: number
      y: number
      r: number
      vx: number
      vy: number
      opacity: number
    }> = []

    const ripples: Array<{
      x: number
      y: number
      radius: number
      strength: number
      life: number
    }> = []

    const createDroplet = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: (Math.random() * 1.6 + 0.6) * dpr,
      vx: (Math.random() * 0.2 - 0.1) * dpr,
      vy: (Math.random() * 0.6 + 0.25) * dpr,
      opacity: Math.random() * 0.5 + 0.25
    })

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      droplets.length = 0
      const targetCount = width < 700 ? 90 : 150
      for (let i = 0; i < targetCount; i += 1) {
        droplets.push(createDroplet())
      }
    }

    const addRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        strength: 2.2 * dpr,
        life: 1
      })
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i]
        ripple.radius += 3.6 * dpr
        ripple.life -= 0.02
        ripple.strength *= 0.98
        if (ripple.life <= 0) ripples.splice(i, 1)
      }

      for (const drop of droplets) {
        if (ripples.length > 0) {
          for (const ripple of ripples) {
            const dx = drop.x - ripple.x
            const dy = drop.y - ripple.y
            const dist = Math.hypot(dx, dy)
            if (dist < ripple.radius && dist > 0.01) {
              const push = (1 - dist / ripple.radius) * ripple.strength
              drop.vx += (dx / dist) * push * 0.02
              drop.vy += (dy / dist) * push * 0.02
            }
          }
        }

        drop.x += drop.vx
        drop.y += drop.vy
        drop.vy = Math.min(drop.vy + 0.0015 * dpr, 1.4 * dpr)
        drop.vx *= 0.995

        if (drop.y - drop.r > height) {
          drop.y = -drop.r
          drop.x = Math.random() * width
          drop.vx = (Math.random() * 0.2 - 0.1) * dpr
          drop.vy = (Math.random() * 0.6 + 0.25) * dpr
        }

        if (drop.x < -20) drop.x = width + 20
        if (drop.x > width + 20) drop.x = -20

        ctx.beginPath()
        ctx.fillStyle = `rgba(180, 220, 255, ${drop.opacity})`
        ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.8})`
        ctx.arc(drop.x - drop.r * 0.3, drop.y - drop.r * 0.3, drop.r * 0.45, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.strokeStyle = `rgba(210, 240, 255, ${drop.opacity * 0.55})`
        ctx.lineWidth = 0.6 * dpr
        ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2)
        ctx.stroke()
      }

      animationId = requestAnimationFrame(step)
    }

    const handleClick = (event: MouseEvent) => {
      addRipple(event.clientX, event.clientY)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('click', handleClick)
    animationId = requestAnimationFrame(step)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationId)
    }
  }, [])

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
      <canvas className="rain-layer" ref={canvasRef} aria-hidden />
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
