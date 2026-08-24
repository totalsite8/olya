import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionBackdropProps {
  src: string
  opacity?: number
  from?: 'top' | 'both' | 'bottom'
}

/**
 * Полноэкранная фоновая картинка секции с мягкой растушёвкой в цвет фона —
 * так соседние секции визуально перетекают друг в друга без жёстких границ,
 * а лёгкий параллакс держит ощущение глубины во время скролла.
 */
export function SectionBackdrop({ src, opacity = 0.55, from = 'both' }: SectionBackdropProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const gradient =
    from === 'both'
      ? 'bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)]'
      : from === 'top'
        ? 'bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/70'
        : 'bg-gradient-to-b from-[var(--color-bg)]/70 via-transparent to-[var(--color-bg)]'

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.img src={src} alt="" style={{ y, opacity }} className="h-[120%] w-full scale-105 object-cover" />
      <div className={`absolute inset-0 ${gradient}`} />
    </div>
  )
}
