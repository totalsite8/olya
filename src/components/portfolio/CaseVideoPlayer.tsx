import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX, Maximize2 } from 'lucide-react'

interface CaseVideoPlayerProps {
  src: string
  poster: string
  aspect: '9:16' | '16:9' | '1:1'
}

const ASPECT_CLASS: Record<CaseVideoPlayerProps['aspect'], string> = {
  '9:16': 'aspect-[9/16] max-w-[420px]',
  '16:9': 'aspect-video max-w-full',
  '1:1': 'aspect-square max-w-[560px]',
}

export function CaseVideoPlayer({ src, poster, aspect }: CaseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    const video = videoRef.current
    if (!el || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTime = () => setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0)
    video.addEventListener('timeupdate', onTime)
    return () => video.removeEventListener('timeupdate', onTime)
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  const requestFullscreen = () => {
    containerRef.current?.requestFullscreen?.()
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className={`group relative mx-auto w-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-black shadow-2xl ${ASPECT_CLASS[aspect]}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="h-full w-full cursor-pointer object-cover"
      />

      <AnimatePresence>
        {!playing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/25"
            aria-label="Воспроизвести"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform hover:scale-110">
              <Play size={22} className="ml-1" fill="currentColor" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/70 to-transparent p-3.5"
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/25">
              <div className="h-full rounded-full bg-white transition-[width]" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={togglePlay} className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15" aria-label={playing ? 'Пауза' : 'Играть'}>
                  {playing ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <button onClick={toggleMute} className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15" aria-label={muted ? 'Включить звук' : 'Выключить звук'}>
                  {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
              <button onClick={requestFullscreen} className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15" aria-label="На весь экран">
                <Maximize2 size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
