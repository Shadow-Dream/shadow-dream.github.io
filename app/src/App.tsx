import { useEffect, useRef, useState } from 'react'
import './App.css'

const copy = {
  zh: {
    name: 'Shadow Dream',
    tagline: '在雨夜里雕刻霓虹与故事',
    identityLabel: '个人档案',
    blogTitle: '博客',
    blogMeta: '最近更新',
    playlistTitle: '歌单',
    playlistMeta: '夜行频道',
    controlsTitle: '控制台',
    play: '播放',
    pause: '暂停',
    next: '切歌',
    langSwitch: 'EN',
    hudTitle: 'WINDOW SIGNAL',
    hudStatusOn: 'LIVE',
    hudStatusOff: 'IDLE',
    nowPlaying: '正在播放',
    windowHint: '视窗已进入雾化显示模式'
  },
  en: {
    name: 'Shadow Dream',
    tagline: 'Carving neon stories in the rain',
    identityLabel: 'Profile',
    blogTitle: 'Blog',
    blogMeta: 'Latest',
    playlistTitle: 'Playlist',
    playlistMeta: 'Night Ride',
    controlsTitle: 'Console',
    play: 'Play',
    pause: 'Pause',
    next: 'Next',
    langSwitch: '中文',
    hudTitle: 'WINDOW SIGNAL',
    hudStatusOn: 'LIVE',
    hudStatusOff: 'IDLE',
    nowPlaying: 'Now Playing',
    windowHint: 'Display fog enabled'
  }
}

const blogList = {
  zh: ['霓虹雨夜的界面叙事', '玻璃与雾：空间感设计小记', '沉浸感 UI 的节奏与留白'],
  en: ['Neon Rain Interface Storytelling', 'Glass & Fog: Notes on Spatial Design', 'Rhythm and Silence in Immersive UI']
}

const tracks = [
  {
    title: 'Wikimedia Commons',
    artist: 'AI Voice',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wikipedia_-_Wikimedia_Commons_(spoken_by_AI_voice).mp3'
  },
  {
    title: '80,000 Hours',
    artist: 'AI Voice',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wikipedia_-_80%2C000_Hours_(spoken_by_AI_voice).mp3'
  },
  {
    title: 'Human Intelligence',
    artist: 'AI Voice',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wikipedia_-_Human_intelligence_(spoken_by_AI_voice).mp3'
  }
]

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh')
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const text = copy[lang]
  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = currentTrack.src
    audio.load()
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [currentTrackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
      return
    }
    audio.pause()
  }, [isPlaying])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      return
    }
    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const handleNext = () => {
    setCurrentTrackIndex((index) => (index + 1) % tracks.length)
  }

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index)
  }

  const toggleLang = () => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))
  }

  return (
    <div className="page">
      <div className="room">
        <aside className="wall wall-left">
          <div className="identity">
            <span className="identity-label">{text.identityLabel}</span>
            <h1>{text.name}</h1>
            <p>{text.tagline}</p>
          </div>

          <section className="panel">
            <div className="panel-header">
              <h2>{text.blogTitle}</h2>
              <span>{text.blogMeta}</span>
            </div>
            <ul className="list">
              {blogList[lang].map((item) => (
                <li key={item} className="list-item">{item}</li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="window-shell">
          <div className="window-frame">
            <div className="window-view">
              <div className="window-scene" aria-hidden />
              <div className="window-rain" aria-hidden />
              <div className="window-fog" aria-hidden />
              <div className="window-hud">
                <div className="hud-top">
                  <span className="hud-label">{text.hudTitle}</span>
                  <span className={`hud-status ${isPlaying ? 'live' : 'idle'}`}>
                    {isPlaying ? text.hudStatusOn : text.hudStatusOff}
                  </span>
                </div>
                <div className="hud-main">
                  <span className="hud-name">{text.name}</span>
                  <span className="hud-tagline">{text.tagline}</span>
                </div>
                <div className="hud-now">
                  <span>{text.nowPlaying}</span>
                  <strong>{currentTrack.title}</strong>
                </div>
              </div>
            </div>
            <div className="window-sill">
              <span>{text.windowHint}</span>
            </div>
          </div>
        </main>

        <aside className="wall wall-right">
          <section className="panel">
            <div className="panel-header">
              <h2>{text.playlistTitle}</h2>
              <span>{text.playlistMeta}</span>
            </div>
            <ul className="list playlist">
              {tracks.map((track, index) => (
                <li key={track.title} className={index === currentTrackIndex ? 'active' : ''}>
                  <button
                    type="button"
                    className="track-button"
                    onClick={() => selectTrack(index)}
                  >
                    <span>{track.title}</span>
                    <span className="track-artist">{track.artist}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel controls-panel">
            <div className="panel-header">
              <h2>{text.controlsTitle}</h2>
              <span>Audio / UI</span>
            </div>
            <div className="controls">
              <button
                type="button"
                className={`control-btn ${isPlaying ? 'active' : ''}`}
                onClick={togglePlay}
              >
                {isPlaying ? text.pause : text.play}
              </button>
              <button type="button" className="control-btn" onClick={handleNext}>
                {text.next}
              </button>
              <button type="button" className="control-btn ghost" onClick={toggleLang}>
                {text.langSwitch}
              </button>
            </div>
          </section>
        </aside>
      </div>

      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  )
}
