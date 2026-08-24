import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react'
import { CtaSection } from '../components/home/CtaSection'
import { ensureGsapPlugins, gsap } from '../lib/gsap'
import { PROJECTS } from '../data/projects'
import { IMG } from '../data/images'
import { PITCH_SERVICE_PILLARS, PITCH_SERVICE_PROCESS, PITCH_SERVICE_DELIVERABLES, PITCH_SERVICE_FAQ } from '../data/pitchDeckService'

const CASE = PROJECTS.find((p) => p.id === 'presentations')!

export function PitchDecksPage() {
  const pillarsRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureGsapPlugins()
    const ctxs = [pillarsRef, processRef]
      .filter((r) => r.current)
      .map((r) =>
        gsap.context(() => {
          gsap.fromTo(
            r.current!.querySelectorAll('.reveal-item'),
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: r.current, start: 'top 82%', once: true } },
          )
        }, r.current!),
      )
    return () => ctxs.forEach((c) => c.revert())
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <HeroSection />
      <PillarsSection ref={pillarsRef} />
      <CaseSection />
      <ProcessSection ref={processRef} />
      <DeliverablesSection />
      <FaqSection />
      <CtaSection />
    </motion.div>
  )
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[90svh] flex-col justify-end overflow-hidden pb-16 pt-32 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <img src={IMG.pitch.heroBg} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/10 via-[var(--color-bg)]/50 to-[var(--color-bg)]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_380px] lg:px-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
          >
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            Услуга под ключ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-semibold leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Питч-деки,
            <br />
            которые убеждают
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 max-w-lg text-base text-[var(--color-text-muted)] sm:text-lg"
          >
            Нарратив-стратегия и дизайн инвесторской презентации — от сырых цифр до истории,
            которая читается за отведённые инвестору три минуты внимания.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              data-cursor-hover
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--color-accent-contrast)] transition-transform hover:scale-105"
            >
              Обсудить проект
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a href="#case" data-cursor-hover className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
              Смотреть кейсы
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-2xl"
        >
          <img src={IMG.pitch.caseCover} alt="Пример дизайна питч-дека" className="h-full w-full object-cover" />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mx-auto mt-14 text-[var(--color-text-muted)]">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="flex justify-center">
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function PillarsSection({ ref }: { ref: RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative border-y border-[var(--color-border)] px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Что входит
        </p>
        <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">От нарратива до финального файла</h2>

        <div ref={ref} className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PITCH_SERVICE_PILLARS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="reveal-item group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-7 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform group-hover:scale-110">
                <Icon size={22} />
              </div>
              <h3 className="font-display mb-2 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseSection() {
  return (
    <section id="case" className="scroll-mt-24 px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Кейс
        </p>
        <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">{CASE.title}</h2>
        <p className="mt-4 max-w-xl text-base text-[var(--color-text-muted)] sm:text-lg">{CASE.subtitle}</p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
          <Link to={`/portfolio/${CASE.id}`} data-cursor-hover className="group relative block overflow-hidden rounded-3xl border border-[var(--color-border)]">
            <img src={CASE.cover} alt={CASE.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </Link>

          <div className="space-y-8">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Задача</p>
              <p className="text-base leading-relaxed text-[var(--color-text-muted)]">{CASE.task}</p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Что сделано</p>
              <ul className="space-y-2">
                {CASE.role.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    <Check size={15} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to={`/portfolio/${CASE.id}`}
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              Открыть полный кейс
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CASE.gallery.slice(1, 9).map((src, i) => (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 5) * 0.06 }}
              className="aspect-video overflow-hidden rounded-2xl border border-[var(--color-border)]"
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ ref }: { ref: RefObject<HTMLDivElement | null> }) {
  return (
    <section className="border-t border-[var(--color-border)] px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Как я работаю
        </p>
        <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Шесть шагов до финального файла</h2>

        <div ref={ref} className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {PITCH_SERVICE_PROCESS.map((item) => (
            <div key={item.step} className="reveal-item">
              <span className="font-mono-num text-sm text-[var(--color-accent)]">{item.step}</span>
              <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DeliverablesSection() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-border)] px-6 py-28 sm:px-10 lg:px-16">
      <div className="grain-gradient absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            Что вы получаете
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Готовый пакет,
            <br />
            без доплат
          </h2>
          <p className="mt-6 max-w-md text-base text-[var(--color-text-muted)]">
            Точный состав и стоимость зависят от количества слайдов и того, нужен ли нарратив
            с нуля или готов текст.
          </p>
        </div>
        <ul className="space-y-3">
          {PITCH_SERVICE_DELIVERABLES.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Check size={15} />
              </span>
              <span className="text-sm font-medium text-[var(--color-text)]">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[900px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Вопросы
        </p>
        <h2 className="font-display mb-12 text-4xl font-semibold tracking-tight sm:text-5xl">Частые вопросы</h2>

        <div className="space-y-3">
          {PITCH_SERVICE_FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-base font-medium text-[var(--color-text)]">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 text-[var(--color-text-muted)]">
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.a}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
