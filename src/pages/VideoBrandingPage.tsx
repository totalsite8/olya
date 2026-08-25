import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, Play } from 'lucide-react'
import { CaseVideoPlayer } from '../components/portfolio/CaseVideoPlayer'
import { StickyMediaStory } from '../components/scrolly/StickyMediaStory'
import { PillarsGallery } from '../components/scrolly/PillarsGallery'
import { ProcessRail } from '../components/scrolly/ProcessRail'
import { SectionBackdrop } from '../components/scrolly/SectionBackdrop'
import { ChapterNav } from '../components/scrolly/ChapterNav'
import { RevealText } from '../components/scrolly/RevealText'
import { CtaSection } from '../components/home/CtaSection'
import { PROJECTS } from '../data/projects'
import {
  VIDEO_SERVICE_PILLARS,
  VIDEO_SERVICE_PROCESS,
  VIDEO_SERVICE_DELIVERABLES,
  VIDEO_SERVICE_FAQ,
  VIDEO_SERVICE_STORY,
} from '../data/videoService'

const CASE = PROJECTS.find((p) => p.id === 'unlit-brand-film')!

const CHAPTERS = [
  { id: 'hero', label: 'Начало' },
  { id: 'story', label: 'Как рождается ролик' },
  { id: 'pillars', label: 'Что входит' },
  { id: 'case', label: 'Кейс UNLIT' },
  { id: 'process', label: 'Как я работаю' },
  { id: 'deliverables', label: 'Что вы получаете' },
  { id: 'faq', label: 'Вопросы' },
]

export function VideoBrandingPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ChapterNav chapters={CHAPTERS} />
      <HeroVideoSection />
      <StorySection />
      <PillarsSection />
      <CaseSection />
      <ProcessSection />
      <DeliverablesSection />
      <FaqSection />
      <CtaSection />
    </motion.div>
  )
}

function HeroVideoSection() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] scroll-mt-24 flex-col justify-end overflow-hidden pb-16 pt-32 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <img src={CASE.cover} alt="" decoding="async" className="h-full w-full scale-110 object-cover opacity-30 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/30 via-[var(--color-bg)]/60 to-[var(--color-bg)]" />
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
            Видео и айдентика
            <br />
            для брендов
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-4 max-w-lg text-sm text-[var(--color-text-muted)] sm:mt-6 sm:text-lg"
          >
            От рекламного ролика до системы движения бренда: продумываю, снимаю и монтирую видео,
            которое продаёт с первого кадра — и остаётся узнаваемым в любом формате.
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
            <a href="#story" data-cursor-hover className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
              <Play size={14} /> Как рождается ролик
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <CaseVideoPlayer src={CASE.video!.src} poster={CASE.video!.poster} aspect="9:16" />
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

function StorySection() {
  return (
    <section id="story" className="scroll-mt-24 px-5 py-14 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          От идеи до финального кадра
        </p>
        <RevealText as="h2" className="font-display mb-14 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Как рождается ролик, который продаёт без слов
        </RevealText>

        <StickyMediaStory
          steps={VIDEO_SERVICE_STORY}
          renderMedia={(_, step) => (
            <div className="aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-2xl">
              <img src={step.image} alt={step.title} className="h-full w-full object-cover" />
            </div>
          )}
        />
      </div>
    </section>
  )
}

function PillarsSection() {
  return (
    <section id="pillars" className="relative scroll-mt-24 border-y border-[var(--color-border)] px-5 py-16 sm:px-10 sm:py-28 lg:px-16">
      <SectionBackdrop src={CASE.video!.poster} opacity={0.12} />
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Что входит
        </p>
        <RevealText as="h2" className="font-display max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Полный цикл видео-продакшена
        </RevealText>

        <div className="mt-8 sm:mt-16">
          <PillarsGallery items={VIDEO_SERVICE_PILLARS} />
        </div>
      </div>
    </section>
  )
}

function CaseSection() {
  return (
    <section id="case" className="scroll-mt-24 px-5 py-16 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Кейс
        </p>
        <RevealText as="h2" className="font-display max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          {CASE.title}
        </RevealText>
        <p className="mt-4 max-w-xl text-base text-[var(--color-text-muted)] sm:text-lg">{CASE.subtitle}</p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
          <Link to={`/portfolio/${CASE.id}`} data-cursor-hover className="group relative block aspect-[9/16] max-w-[420px] overflow-hidden rounded-3xl border border-[var(--color-border)]">
            <img src={CASE.video!.poster} alt={CASE.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform group-hover:scale-110">
                <Play size={22} className="ml-1" fill="currentColor" />
              </span>
            </span>
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
          {CASE.gallery.slice(1).map((src, i) => (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 5) * 0.06 }}
              className="aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--color-border)]"
            >
              <img src={src} alt="" decoding="async" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-24 border-t border-[var(--color-border)] px-5 py-16 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Как я работаю
        </p>
        <RevealText as="h2" className="font-display mb-16 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Шесть шагов от брифа до готового ролика
        </RevealText>

        <ProcessRail steps={VIDEO_SERVICE_PROCESS} />
      </div>
    </section>
  )
}

function DeliverablesSection() {
  return (
    <section id="deliverables" className="relative scroll-mt-24 overflow-hidden border-y border-[var(--color-border)] px-5 py-16 sm:px-10 sm:py-28 lg:px-16">
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
            Точный состав и стоимость каждого проекта считаются индивидуально — под задачу, формат
            и количество адаптаций.
          </p>
        </div>
        <ul className="space-y-3">
          {VIDEO_SERVICE_DELIVERABLES.map((item, i) => (
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
    <section id="faq" className="scroll-mt-24 px-5 py-16 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[900px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Вопросы
        </p>
        <h2 className="font-display mb-12 text-4xl font-semibold tracking-tight sm:text-5xl">Частые вопросы</h2>

        <div className="space-y-3">
          {VIDEO_SERVICE_FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
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
