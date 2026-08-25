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
  /** Соотношение сторон карточки-изображения в мобильной раскладке (по умолчанию 4:5). */
  mobileAspect?: string
}

/**
 * Классический scrollytelling-паттерн — но только для широких экранов, где
 * есть место для двух колонок: медиа-панель «прилипает», пока читатель
 * прокручивает шаги истории рядом с ней.
 *
 * На мобильном (портфолио дизайнера в первую очередь смотрят с телефона)
 * side-by-side sticky-эффект физически не работает и превращается в «одна
 * картинка наверху + простыня текста внизу». Поэтому на мобильном рендерим
 * честную визуальную ленту: каждый шаг — это крупное изображение работы,
 * а текст — короткая подпись под ним, а не наоборот.
 */
export function StickyMediaStory({ steps, renderMedia, mediaClassName, reverse, mobileAspect = 'aspect-[4/5]' }: StickyMediaStoryProps) {
  const { active, setRef } = useActiveIndex(steps.length)

  return (
    <>
      {/* Мобильная и планшетная раскладка: визуальная лента карточек */}
      <div className="flex flex-col gap-8 lg:hidden">
        {steps.map((step) => (
          <div key={step.title} className="reveal-item">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-xl ${mobileAspect}`}
            >
              {step.image && <img src={step.image} alt={step.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                {step.kicker && (
                  <span className="font-mono-num mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
                    {step.kicker}
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-tight text-white">{step.title}</h3>
              </div>
            </motion.div>
            <p className="mt-3 px-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{step.desc}</p>
            {step.extra && <div className="px-1">{step.extra}</div>}
          </div>
        ))}
      </div>

      {/* Десктопная раскладка: sticky-медиа + синхронизированный список шагов */}
      <div className={`hidden lg:grid lg:grid-cols-2 lg:gap-x-16 ${reverse ? 'lg:[direction:rtl]' : ''}`}>
        <div className={`lg:sticky lg:top-28 lg:order-none lg:h-fit ${reverse ? '[direction:ltr]' : ''} ${mediaClassName ?? ''}`}>
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

        <div className={`flex flex-col gap-[30vh] py-[8vh] lg:order-none ${reverse ? '[direction:ltr]' : ''}`}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              ref={setRef(i)}
              className="flex min-h-[1px] flex-col justify-center opacity-[var(--step-opacity)] transition-opacity duration-500"
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
    </>
  )
}
