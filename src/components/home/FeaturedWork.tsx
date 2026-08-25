import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ensureGsapPlugins, gsap } from '../../lib/gsap'
import { PROJECTS } from '../../data/projects'

export function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureGsapPlugins()
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const cards = container.querySelectorAll<HTMLElement>('.work-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        )
        const image = card.querySelector<HTMLElement>('.work-card-image')
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.25 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          )
        }
        void i
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative px-5 py-16 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              Избранные работы
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">Проекты, которые
              <br />
              говорят сами за себя
            </h2>
          </div>
          <Link
            to="/portfolio"
            data-cursor-hover
            className="group flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--color-surface-hover)]"
          >
            Всё портфолио
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2">
          {PROJECTS.slice(0, 4).map((project, i) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              data-cursor-hover
              className={`work-card group relative block overflow-hidden rounded-2xl border border-[var(--color-border)] sm:rounded-3xl ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/3] sm:aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <img src={project.cover} alt={project.title} className="work-card-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-8">
                <div>
                  <span className="mb-1.5 inline-block rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md sm:mb-2 sm:px-3 sm:text-xs">
                    {project.categoryLabel}
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3>
                  <p className="mt-1 hidden text-sm text-white/70 sm:block">{project.subtitle}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45 sm:h-11 sm:w-11">
                  <ArrowUpRight size={16} className="sm:hidden" />
                  <ArrowUpRight size={18} className="hidden sm:block" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
