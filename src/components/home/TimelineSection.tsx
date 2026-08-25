import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, ChevronRight } from 'lucide-react'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../../lib/gsap'
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
 * «Мой путь» как технологичный лог процесса: на десктопе секция «залипает»
 * на весь экран (GSAP ScrollTrigger pin) — высота блока не растягивается
 * «портянкой», а сам скролл колёсиком переключает активный шаг слева и
 * содержимое «экрана» справа. Когда доходим до последнего шага, страница
 * отпускается и скролл идёт дальше как обычно.
 */
export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    ensureGsapPlugins()
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const steps = STEPS.length
      const st = ScrollTrigger.create({
        trigger: section,
        // top+=110 — небольшой отступ, чтобы «залипший» блок не прятался
        // под плавающим хедером (fixed, z-50), а фиксировался чуть ниже него.
        start: 'top top+=110',
        end: () => `+=${steps * 480}`,
        pin: stage,
        pinSpacing: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const idx = Math.min(steps - 1, Math.floor(self.progress * steps))
          setActive(idx)
        },
      })
      triggerRef.current = st

      return () => {
        st.kill()
        triggerRef.current = null
      }
    })

    return () => mm.revert()
  }, [])

  // Клик по пункту слева должен реально промотать страницу к соответствующему
  // моменту pin-анимации — иначе следующий скролл читателя «перепрыгнет»
  // активный шаг обратно на позицию, посчитанную по scroll-прогрессу.
  const goToStep = (i: number) => {
    const st = triggerRef.current
    if (!st) {
      setActive(i)
      return
    }
    const progress = (i + 0.5) / STEPS.length
    const targetScroll = st.start + progress * (st.end - st.start)
    // @ts-expect-error — глобальная ссылка на экземпляр Lenis из SmoothScrollProvider
    const lenis = window.__lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetScroll, { duration: 1 })
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-soft)] px-5 py-14 sm:px-10 sm:py-24 lg:px-16 lg:py-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(var(--color-text)_1px,transparent_1px),linear-gradient(90deg,var(--color-text)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div ref={stageRef} className="relative mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-14 lg:mb-6">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              8 лет в дизайне
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-5xl">Мой путь</h2>
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

        {/* Десктоп: индекс-панель слева + «активный экран» справа. Сама секция «залипает»
            на весь экран через GSAP pin (см. useEffect выше) — контент не растягивается
            по высоте, а переключается по прогрессу скролла, пока страница неподвижна. */}
        <div className="hidden lg:grid lg:max-h-[78vh] lg:grid-cols-[340px_1fr] lg:gap-10">
          <div className="flex flex-col justify-center gap-2">
            {STEPS.map((step, i) => (
              <button
                key={step.title}
                type="button"
                onClick={() => goToStep(i)}
                className="group relative flex flex-col justify-center border-l py-4 pl-6 text-left transition-colors duration-300"
                style={{ borderColor: active === i ? 'var(--color-accent)' : 'var(--color-border)' }}
              >
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
                  className="font-display mt-1.5 whitespace-pre-line text-lg font-semibold leading-tight transition-colors duration-300"
                  style={{ color: active === i ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                >
                  {step.title}
                </p>
                {active === i && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--color-accent)]"
                  >
                    <ChevronRight size={13} /> {step.role}
                  </motion.span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col justify-center">
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
