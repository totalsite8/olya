import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/projects'

export function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = PROJECTS.find((p) => p.id === id)
  const index = PROJECTS.findIndex((p) => p.id === id)
  const next = project ? PROJECTS[(index + 1) % PROJECTS.length] : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) return <Navigate to="/portfolio" replace />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={project.cover} alt={project.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/20 to-black/10" />
        <Link
          to="/portfolio"
          data-cursor-hover
          className="absolute left-6 top-28 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-md sm:left-10 lg:left-16"
        >
          <ArrowLeft size={15} /> Портфолио
        </Link>
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <span className="mb-3 inline-block rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {project.categoryLabel} · {project.year}
            </span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-7xl">{project.title}</h1>
            <p className="mt-2 max-w-xl text-base text-white/70 sm:text-lg">{project.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-display mb-4 text-2xl font-semibold tracking-tight">О проекте</h2>
            <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{project.description}</p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Услуги</p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span key={s} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Теги</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="text-sm text-[var(--color-text-muted)]">
                    #{t.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {next && (
        <section className="border-t border-[var(--color-border)] px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Следующий проект</p>
            <Link to={`/portfolio/${next.id}`} data-cursor-hover className="group relative block overflow-hidden rounded-3xl border border-[var(--color-border)]">
              <div className="aspect-[21/9] overflow-hidden">
                <img src={next.cover} alt={next.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8">
                <h3 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">{next.title}</h3>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}
    </motion.div>
  )
}
