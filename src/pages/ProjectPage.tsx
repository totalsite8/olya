import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Target, UserCog, ShieldAlert } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import { CaseVideoPlayer } from '../components/portfolio/CaseVideoPlayer'
import { ChapterNav } from '../components/scrolly/ChapterNav'
import { RevealText } from '../components/scrolly/RevealText'
import { ensureGsapPlugins, gsap } from '../lib/gsap'
import type { PortfolioProject } from '../types/portfolio'

export function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = PROJECTS.find((p) => p.id === id)
  const index = PROJECTS.findIndex((p) => p.id === id)
  const next = project ? PROJECTS[(index + 1) % PROJECTS.length] : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) return <Navigate to="/portfolio" replace />

  const chapters = [
    { id: 'hero', label: 'Начало' },
    { id: 'brief', label: 'Задача и роль' },
    { id: 'gallery', label: 'Работа' },
    ...(project.outcome ? [{ id: 'outcome', label: 'Итог' }] : []),
    { id: 'next', label: 'Следующий проект' },
  ]

  return (
    <motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ChapterNav chapters={chapters} />
      <div id="hero">{project.video ? <VideoHero project={project} /> : <ImageHero project={project} />}</div>
      <ProjectBody project={project} next={next} />
    </motion.div>
  )
}

function VideoHero({ project }: { project: PortfolioProject }) {
  if (!project.video) return null
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <div className="absolute inset-0 -z-10">
        <img src={project.cover} alt="" className="h-full w-full scale-110 object-cover opacity-25 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/40 via-[var(--color-bg)]/70 to-[var(--color-bg)]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <Link
          to="/portfolio"
          data-cursor-hover
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-sm font-medium backdrop-blur-md"
        >
          <ArrowLeft size={15} /> Портфолио
        </Link>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_460px]">
          <div>
            <span className="mb-3 inline-block rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)]">
              {project.categoryLabel} · {project.year}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">{project.title}</h1>
            <p className="mt-4 max-w-xl text-base text-[var(--color-text-muted)] sm:text-lg">{project.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <CaseVideoPlayer src={project.video.src} poster={project.video.poster} aspect={project.video.aspect} />
        </div>
      </div>
    </section>
  )
}

function ImageHero({ project }: { project: PortfolioProject }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureGsapPlugins()
    const el = ref.current
    const img = el?.querySelector<HTMLElement>('.hero-image')
    if (!el || !img) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.15, yPercent: -4 },
        { scale: 1, yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 } },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative h-[75vh] min-h-[520px] overflow-hidden">
      <img src={project.cover} alt={project.title} className="hero-image h-full w-full object-cover" />
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
  )
}

function ProjectBody({ project, next }: { project: PortfolioProject; next: PortfolioProject | null }): ReactNode {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureGsapPlugins()
    const container = galleryRef.current
    if (!container) return
    const ctx = gsap.context(() => {
      const tiles = container.querySelectorAll<HTMLElement>('.case-tile')
      tiles.forEach((tile) => {
        const img = tile.querySelector<HTMLElement>('img')
        gsap.fromTo(
          tile,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: tile, start: 'top 92%', once: true } },
        )
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: tile, start: 'top bottom', end: 'bottom top', scrub: 0.7 } },
          )
        }
      })
    }, container)
    return () => ctx.revert()
  }, [project.id])

  return (
    <>
      {/* Задача / роль — читаются как продолжение истории кейса, не как отдельный блок */}
      <section id="brief" className="relative scroll-mt-24 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.7 }}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                <Target size={13} /> Задача
              </span>
              <p className="text-lg leading-relaxed text-[var(--color-text)] sm:text-xl">{project.task}</p>
            </motion.div>

            <div className="hidden bg-[var(--color-border)] lg:block" />

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.7, delay: 0.1 }}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                <UserCog size={13} /> Моя роль
              </span>
              <ul className="space-y-3">
                {project.role.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex gap-2.5 text-base leading-relaxed text-[var(--color-text-muted)]"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {r}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {project.nda && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 flex items-start gap-3 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-sm text-[var(--color-text-muted)]"
            >
              <ShieldAlert size={16} className="mt-0.5 shrink-0" />
              {project.nda}
            </motion.div>
          )}
        </div>
      </section>

      {/* Галерея — единая, непрерывная лента кейса */}
      <section id="gallery" ref={galleryRef} className="scroll-mt-24 px-6 pb-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px] space-y-16">
          {project.galleryGroups ? (
            project.galleryGroups.map((group, gi) => (
              <div key={group.title}>
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
                >
                  <span className="font-mono-num text-[var(--color-accent)]">{String(gi + 1).padStart(2, '0')}</span>
                  {group.title}
                </motion.h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {group.images.map((src, i) => (
                    <div
                      key={src + i}
                      className={`case-tile relative overflow-hidden rounded-2xl border border-[var(--color-border)] ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {project.gallery.map((src, i) => (
                <div key={src + i} className={`case-tile relative overflow-hidden rounded-2xl border border-[var(--color-border)] ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {project.outcome && (
        <section id="outcome" className="scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-[1400px] overflow-hidden rounded-3xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-8 sm:p-12"
          >
            <RevealText as="h3" className="font-display text-2xl font-semibold tracking-tight sm:text-4xl">
              {project.outcome.title}
            </RevealText>
            {project.outcome.stats && (
              <div className="mt-8 flex flex-wrap gap-10 sm:gap-16">
                {project.outcome.stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="font-mono-num text-4xl font-bold text-[var(--color-accent)] sm:text-5xl">{s.value}</p>
                    <p className="mt-2 max-w-[220px] text-sm text-[var(--color-text-muted)]">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            )}
            {project.outcome.footnote && <p className="mt-8 max-w-2xl text-sm text-[var(--color-text-muted)]">{project.outcome.footnote}</p>}
          </motion.div>
        </section>
      )}

      {next && <NextProjectSection next={next} />}
    </>
  )
}

function NextProjectSection({ next }: { next: PortfolioProject }) {
  return (
    <section id="next" className="scroll-mt-24 border-t border-[var(--color-border)] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
        >
          Следующий проект
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.7 }}>
          <Link to={`/portfolio/${next.id}`} data-cursor-hover className="group relative block overflow-hidden rounded-3xl border border-[var(--color-border)]">
            <div className="aspect-[21/9] overflow-hidden">
              <img src={next.cover} alt={next.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8">
              <div>
                <span className="mb-2 inline-block rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {next.categoryLabel}
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">{next.title}</h3>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
