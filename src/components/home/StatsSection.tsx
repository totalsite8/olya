import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 8, suffix: '', label: 'Лет в дизайне', decimals: 0 },
  { value: 4, suffix: '', label: 'Направления работы', decimals: 0 },
  { value: 51900, suffix: '+', label: 'Отзывов на продукт «Ecozavr»', decimals: 0 },
  { value: 4.9, suffix: ' / 5.0', label: 'Средний рейтинг бренда', decimals: 1 },
]

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
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
      setDisplay(eased * value)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span ref={ref} className="font-mono-num">
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString('ru-RU')}
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
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
