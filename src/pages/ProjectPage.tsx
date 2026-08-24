import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Target, UserCog, ShieldAlert } from 'lucide-react'
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
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-6xl">{project.title}</h1>
            <p className="mt-2 max-w-xl text-base text-white/70 sm:text-lg">{project.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-7 sm:p-8">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              <Target size={13} /> Задача
            </span>
            <p className="text-base leading-relaxed text-[var(--color-text-muted)]">{project.task}</p>
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-7 sm:p-8">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              <UserCog size={13} /> Моя роль
            </span>
            <ul className="space-y-2">
              {project.role.map((r) => (
                <li key={r} className="flex gap-2.5 text-base leading-relaxed text-[var(--color-text-muted)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.nda && (
          <div className="mx-auto mt-6 flex max-w-[1400px] items-start gap-3 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-sm text-[var(--color-text-muted)]">
            <ShieldAlert size={16} className="mt-0.5 shrink-0" />
            {project.nda}
          </div>
        )}

        <div className="mx-auto mt-14 grid max-w-[1400px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {project.gallery.map((src, i) => (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06 }}
              className={`overflow-hidden rounded-2xl border border-[var(--color-border)] ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>

        {project.outcome && (
          <div className="mx-auto mt-14 max-w-[1400px] rounded-3xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-8 sm:p-10">
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{project.outcome.title}</h3>
            {project.outcome.stats && (
              <div className="mt-6 flex flex-wrap gap-10">
                {project.outcome.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-mono-num text-4xl font-bold text-[var(--color-accent)]">{s.value}</p>
                    <p className="mt-1 max-w-[200px] text-sm text-[var(--color-text-muted)]">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
            {project.outcome.footnote && <p className="mt-6 text-sm text-[var(--color-text-muted)]">{project.outcome.footnote}</p>}
          </div>
        )}
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
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">{next.title}</h3>
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
