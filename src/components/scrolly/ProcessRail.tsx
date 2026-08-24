import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface ProcessStep {
  step: string
  title: string
  desc: string
}

/**
 * Вертикальный «рельс» процесса: линия прогресса дорисовывается по мере
 * скролла, а активный шаг подсвечивается — история читается как непрерывный
 * путь, а не набор изолированных карточек.
 */
export function ProcessRail({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 40%'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--color-border)] sm:left-[19px]" />
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-[15px] top-2 w-px bg-[var(--color-accent)] sm:left-[19px]"
      />

      <div className="flex flex-col gap-16 sm:gap-20">
        {steps.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-12 sm:pl-16"
          >
            <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] font-mono-num text-xs text-[var(--color-accent)] sm:h-10 sm:w-10">
              {item.step}
            </span>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{item.title}</h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-[var(--color-text-muted)]">{item.desc}</p>
            {i === steps.length - 1 && (
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                Готово к передаче ✦
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
