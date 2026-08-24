import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 120, suffix: '+', label: 'Завершённых проектов' },
  { value: 4, suffix: '', label: 'Направления работы' },
  { value: 3, suffix: '', label: 'Рынка: RU / US / EU' },
  { value: 98, suffix: '%', label: 'Клиентов возвращаются' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span ref={ref} className="font-mono-num">
      {display}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="relative border-y border-[var(--color-border)] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <p className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
