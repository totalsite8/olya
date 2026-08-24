import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import type { ProjectCategory } from '../types/portfolio'

const FILTERS: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'design', label: 'Дизайн' },
  { id: 'neuro', label: 'Нейрогенерации' },
  { id: 'video', label: 'Видео и анимация' },
  { id: 'presentation', label: 'Презентации' },
]

export function PortfolioPage() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')

  const filtered = useMemo(() => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 pb-28 pt-36 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Портфолио
        </p>
        <h1 className="font-display max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">Работы, за которые не стыдно</h1>

        <div className="no-scrollbar mt-12 flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                filter === f.id ? 'text-[var(--color-accent-contrast)]' : 'border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {filter === f.id && (
                <motion.span layoutId="portfolio-filter-pill" className="absolute inset-0 -z-10 rounded-full bg-[var(--color-accent)]" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
              )}
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4 }}
              >
                <Link to={`/portfolio/${project.id}`} data-cursor-hover className="group relative block overflow-hidden rounded-3xl border border-[var(--color-border)]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={project.cover} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                    <div>
                      <span className="mb-2 inline-block rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {project.categoryLabel}
                      </span>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white">{project.title}</h3>
                      <p className="mt-0.5 text-xs text-white/70">{project.year}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}
