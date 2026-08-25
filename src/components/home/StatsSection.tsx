import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 8, suffix: '', label: 'Лет в дизайне', decimals: 0 },
  { value: 4, suffix: '', label: 'Направления работы', decimals: 0 },
  { value: 51900, suffix: '+', label: 'Отзывов на продукт «Ecozavr»', decimals: 0 },
  { value: 4.9, suffix: ' / 5.0', label: 'Средний рейтинг бренда', decimals: 1 },
]

function Counter({ value, suffix, decimals = 0, start }: { value: number; suffix: string; decimals?: number; start: boolean }) {
  const [display, setDisplay] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true
    const duration = 1400
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])

  return (
    <span className="font-mono-num">
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString('ru-RU')}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  // Отслеживаем видимость всей секции (а не крошечного <span> с числом) —
  // на мобильных устройствах высота видимой области скачет из-за
  // скрывающейся адресной строки, и observer на маленьком элементе
  // с margin в пикселях мог никогда не сработать. amount — надёжнее.
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  // Подстраховка: если по какой-то причине observer так и не сработал
  // (например, секция уже видна при заходе на страницу и её верх/низ
  // не пересекают границы viewport), запускаем счётчики принудительно
  // через небольшую паузу после монтирования.
  const [forceStart, setForceStart] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setForceStart(true), 900)
    return () => clearTimeout(timeout)
  }, [])
  const start = isInView || forceStart

  return (
    <section ref={sectionRef} className="relative border-y border-[var(--color-border)] px-5 py-12 sm:px-10 sm:py-20 lg:px-16">
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
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} start={start} />
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
