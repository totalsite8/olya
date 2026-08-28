import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { PROJECTS } from '../../data/projects'
import { CONTACTS } from '../../data/contacts'
import type { PortfolioProject } from '../../types/portfolio'

/**
 * Хаотичная раскладка карточек лучших работ: у каждой карточки — своё
 * смещение по X/Y (в процентах от контейнера) и небольшой поворот, чтобы
 * поле выглядело как рассыпанные на столе карточки, а не ровная сетка.
 * Значения подобраны вручную под количество проектов, чтобы карточки не
 * перекрывали друг друга слишком сильно на широких экранах.
 */
const LAYOUT: { top: number; left: number; rotate: number; size: 'sm' | 'md' | 'lg'; align: 'left' | 'right' }[] = [
  { top: 4, left: 4, rotate: -6, size: 'lg', align: 'left' },
  { top: 10, left: 28, rotate: 4, size: 'md', align: 'left' },
  { top: 2, left: 50, rotate: -3, size: 'md', align: 'left' },
  { top: 14, left: 88, rotate: 6, size: 'lg', align: 'right' },
  { top: 48, left: 8, rotate: 5, size: 'md', align: 'left' },
  { top: 52, left: 38, rotate: -5, size: 'lg', align: 'left' },
  { top: 44, left: 76, rotate: 3, size: 'md', align: 'right' },
]

const SIZE_CLASS: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-[34vw] sm:w-[18vw] lg:w-[220px]',
  md: 'w-[40vw] sm:w-[21vw] lg:w-[260px]',
  lg: 'w-[46vw] sm:w-[24vw] lg:w-[300px]',
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cards = PROJECTS.map((project, i) => ({ project, layout: LAYOUT[i % LAYOUT.length] }))

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-28 sm:pb-16 sm:pt-32">
      {/* Имя и фамилия — на всю ширину экрана, сверху */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] sm:text-sm">
          <a href={`tel:${CONTACTS.phoneRaw}`} data-cursor-hover className="transition-colors hover:text-[var(--color-text)]">
            {CONTACTS.phone}
          </a>
          <span className="font-mono-num hidden sm:inline">2026</span>
          <a href={`mailto:${CONTACTS.email}`} data-cursor-hover className="transition-colors hover:text-[var(--color-text)]">
            {CONTACTS.email}
          </a>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display -mx-1 mt-4 w-[calc(100%+0.5rem)] text-center leading-[0.86] tracking-tight sm:mt-6"
          style={{ fontSize: 'clamp(3.2rem, 13.5vw, 11rem)' }}
        >
          Bakushkina Olga
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-2 text-center text-base text-[var(--color-text-muted)] sm:mt-3 sm:text-xl"
        >
          Brand&nbsp;-&nbsp;designer
        </motion.p>
      </div>

      {/* Мобильная раскладка: все работы видны сразу, хаотичным снэп-скроллом,
          без наведения — на тач-устройствах его нет. */}
      <div className="no-scrollbar relative z-10 mt-8 flex flex-1 snap-x snap-mandatory items-center gap-3 overflow-x-auto px-4 pb-2 sm:hidden">
        {cards.map(({ project }, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, rotate: (i % 2 === 0 ? -1 : 1) * (2 + (i % 3)) }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-[68vw] shrink-0 snap-center"
          >
            <Link to={`/portfolio/${project.id}`} data-cursor-hover className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-xl">
              <img src={project.cover} alt={project.title} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="relative z-10 p-4">
                <span className="mb-1.5 inline-block rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                  {project.categoryLabel}
                </span>
                <h3 className="font-display text-base font-semibold leading-tight text-white">{project.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Десктоп: хаотичное поле, изначально скрытое — видны только точки-метки
          с названием, при наведении раскрывается полноценное превью работы. */}
      <div className="relative z-10 mt-6 hidden flex-1 sm:block">
        <div className="relative mx-auto h-full min-h-[420px] w-full max-w-[1500px] px-6 lg:px-10">
          {cards.map(({ project, layout }, i) => (
            <HeroWorkCard key={project.id} project={project} layout={layout} index={i} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="pointer-events-none relative z-10 mt-4 hidden justify-center text-[var(--color-text-muted)] sm:flex"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Наведите на точки · Листайте</span>
          <ArrowRight size={14} className="rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function HeroWorkCard({
  project,
  layout,
  index,
}: {
  project: PortfolioProject
  layout: { top: number; left: number; rotate: number; size: 'sm' | 'md' | 'lg'; align: 'left' | 'right' }
  index: number
}) {
  return (
    <Link
      to={`/portfolio/${project.id}`}
      data-cursor-hover
      className="group absolute"
      style={{ top: `${layout.top}%`, left: `${layout.left}%` }}
    >
      {/* Скрытое состояние: хаотичная метка-точка с подписью названия работы */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 + index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover="hover"
        className="relative flex items-center gap-2.5"
      >
        <motion.span
          variants={{ hover: { scale: 0, opacity: 0 } }}
          transition={{ duration: 0.25 }}
          className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-40" />
          <span className="relative h-2.5 w-2.5 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)]" />
        </motion.span>
        <motion.span
          variants={{ hover: { opacity: 0, x: -6 } }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]"
        >
          {project.title}
        </motion.span>

        {/* Раскрытое состояние: полноценное превью, появляется поверх остального поля.
            Карточки у правого края поля раскрываются влево, чтобы не вылезать за экран. */}
        <motion.div
          variants={{ hover: { opacity: 1, scale: 1, pointerEvents: 'auto' } }}
          initial={{ opacity: 0, scale: 0.85, pointerEvents: 'none' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotate: layout.rotate, [layout.align]: 0 }}
          className={`pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-2xl ${
            layout.align === 'left' ? 'origin-top-left' : 'origin-top-right'
          } ${SIZE_CLASS[layout.size]}`}
        >
          <div className="relative aspect-[3/4] w-full">
            <img src={project.cover} alt={project.title} decoding="async" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
              <div>
                <span className="mb-1.5 inline-block rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                  {project.categoryLabel}
                </span>
                <h3 className="font-display whitespace-pre-line text-lg font-semibold leading-tight text-white">{project.title}</h3>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  )
}
