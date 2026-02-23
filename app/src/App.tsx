import './App.css'

export default function App() {
  return (
    <div className="page">
      <video
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
