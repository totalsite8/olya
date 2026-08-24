import type { CSSProperties, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useActiveIndex } from '../../hooks/useActiveIndex'

export interface StoryStep {
  kicker?: string
  title: string
  desc: string
  image?: string
  extra?: ReactNode
}

interface StickyMediaStoryProps {
  steps: StoryStep[]
  renderMedia: (activeIndex: number, step: StoryStep) => ReactNode
  mediaClassName?: string
  reverse?: boolean
}

/**
 * Классический scrollytelling-паттерн: медиа-панель «прилипает» к экрану,
 * пока читатель прокручивает шаги истории рядом с ней. Каждый шаг активирует
 * своё изображение/видео/кадр — так объяснение и визуал двигаются синхронно.
 */
export function StickyMediaStory({ steps, renderMedia, mediaClassName, reverse }: StickyMediaStoryProps) {
  const { active, setRef } = useActiveIndex(steps.length)

  return (
    <div className={`grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2 ${reverse ? 'lg:[direction:rtl]' : ''}`}>
      <div className={`order-1 lg:sticky lg:top-28 lg:order-none lg:h-fit ${reverse ? '[direction:ltr]' : ''} ${mediaClassName ?? ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderMedia(active, steps[active])}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`order-2 flex flex-col gap-14 py-6 lg:order-none lg:gap-[30vh] lg:py-[8vh] ${reverse ? '[direction:ltr]' : ''}`}>
        {steps.map((step, i) => (
          <div
            key={step.title}
            ref={setRef(i)}
            className="flex min-h-[1px] flex-col justify-center opacity-100 transition-opacity duration-500 lg:opacity-[var(--step-opacity)]"
            style={{ '--step-opacity': active === i ? 1 : 0.35 } as CSSProperties}
          >
            {step.kicker && (
              <span className="font-mono-num mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-accent)]">
                {step.kicker}
              </span>
            )}
            <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">{step.title}</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-text-muted)]">{step.desc}</p>
            {step.extra}
          </div>
        ))}
      </div>
    </div>
  )
}
