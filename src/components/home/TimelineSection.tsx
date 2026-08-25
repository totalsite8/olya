import { motion } from 'framer-motion'
import { GraduationCap, ChevronRight } from 'lucide-react'
import { useActiveIndex } from '../../hooks/useActiveIndex'
import { TIMELINE, EDUCATION } from '../../data/timeline'
import { IMG } from '../../data/images'

const TIMELINE_IMAGES = [IMG.path.education, IMG.path.agency, IMG.path.ecozavr, IMG.path.domashniy, IMG.path.alfa]

const STEPS = [
  {
    index: '00',
    kicker: EDUCATION.period,
    title: `${EDUCATION.degree} · ${EDUCATION.field}`,
    place: EDUCATION.institution,
    role: 'Основа',
    details: [] as string[],
    image: TIMELINE_IMAGES[0],
  },
  ...TIMELINE.map((item, i) => ({
    index: String(i + 1).padStart(2, '0'),
    kicker: item.period,
    title: item.place,
    place: item.place,
    role: item.role,
    details: item.details,
    image: TIMELINE_IMAGES[i + 1],
  })),
]

/**
 * «Мой путь» как технологичный лог процесса: индекс-панель слева (как список
 * процессов/коммитов) синхронизирована с «экраном» справа через классический
 * CSS position:sticky — тот же надёжный паттерн, что уже используется на всех
 * остальных страницах сайта (см. StickyMediaStory). Никакого JS-пина через
 * position:fixed — это избавляет от хрупких конфликтов с overflow/Lenis,
 * из-за которых секция могла превращаться в пустую «портянку», если пин не
 * применялся. Правая панель «залипает» под хедером и остаётся видна целиком,
 * пока читатель прокручивает список шагов рядом с ней.
 */
export function TimelineSection() {
  const { active, setRef } = useActiveIndex(STEPS.length)

  return (
    <section className="relative border-y border-[var(--color-border)] bg-[var(--color-bg-soft)] px-5 py-14 sm:px-10 sm:py-24 lg:px-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.035] [background-image:linear-gradient(var(--color-text)_1px,transparent_1px),linear-gradient(90deg,var(--color-text)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              8 лет в дизайне
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">Мой путь</h2>
          </div>
          <span className="font-mono-num hidden items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-xs text-[var(--color-text-muted)] sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
            log --career --since=2017
          </span>
        </div>

        {/* Мобильная лента: карточки-«терминалы», каждая с UI-скриншотом инструмента периода */}
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 lg:hidden">
          {STEPS.map((step) => (
            <div key={step.title} className="w-[80vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--color-border)]">
                <img src={step.image} alt={step.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="font-mono-num absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] text-white backdrop-blur-md">
                  {step.index === '00' ? <GraduationCap size={11} /> : null}
                  {step.kicker}
                </span>
              </div>
              <div className="p-4">
                <p className="font-display whitespace-pre-line text-base font-semibold leading-tight text-[var(--color-text)]">{step.title}</p>
                <p className="font-mono-num mt-1 text-xs text-[var(--color-accent)]">{step.role}</p>
                {step.details.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {step.details.slice(0, 4).map((d) => (
                      <span key={d} className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)]">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Десктоп: индекс-панель слева + «активный экран» справа. Правая панель залипает
            (position: sticky) под хедером, пока читатель прокручивает список шагов слева —
            переключение шага происходит, когда он пересекает центральную полосу экрана,
            то есть уже после того, как «экран» справа полностью зафиксирован и виден целиком. */}
        <div className="hidden lg:grid lg:grid-cols-[340px_1fr] lg:gap-10">
          <div className="flex flex-col gap-[22vh] py-[10vh]">
            {STEPS.map((step, i) => (
              <div key={step.title} ref={setRef(i)} className="group relative flex min-h-[1px] flex-col justify-center border-l pl-6 transition-colors duration-300" style={{ borderColor: active === i ? 'var(--color-accent)' : 'var(--color-border)' }}>
                <span
                  className="absolute -left-[3px] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: active === i ? 'var(--color-accent)' : 'var(--color-border)',
                    boxShadow: active === i ? '0 0 0 5px var(--color-accent-soft)' : 'none',
                  }}
                />
                <div className="flex items-center gap-2">
                  <span className="font-mono-num text-xs text-[var(--color-text-muted)]">{step.index}</span>
                  <span className="font-mono-num text-xs text-[var(--color-accent)]">{step.kicker}</span>
                </div>
                <p
                  className="font-display mt-1.5 whitespace-pre-line text-2xl font-semibold leading-tight transition-colors duration-300"
                  style={{ color: active === i ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                >
                  {step.title}
                </p>
                {active === i && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 flex items-center gap-1 text-xs font-medium text-[var(--color-accent)]"
                  >
                    <ChevronRight size={13} /> {step.role}
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          <div className="sticky top-28 h-fit">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-black shadow-2xl">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="font-mono-num ml-3 truncate text-[11px] text-white/50">
                  {STEPS[active].place.toLowerCase().replace(/[«»]/g, '')}
                </span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <motion.img
                  key={STEPS[active].image}
                  src={STEPS[active].image}
                  alt={STEPS[active].title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {STEPS[active].details.length > 0 && (
              <motion.div
                key={`details-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {STEPS[active].details.map((d) => (
                  <span key={d} className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)]">
                    {d}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
