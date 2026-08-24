import { useEffect, useRef } from 'react'
import { GraduationCap } from 'lucide-react'
import { ensureGsapPlugins, gsap } from '../../lib/gsap'
import { TIMELINE, EDUCATION } from '../../data/timeline'

export function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureGsapPlugins()
    const container = ref.current
    if (!container) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        container.querySelectorAll('.timeline-card'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: container, start: 'top 82%', once: true } },
      )
    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative border-y border-[var(--color-border)] bg-[var(--color-bg-soft)] px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-display mb-14 text-4xl font-semibold tracking-tight sm:text-6xl">Мой путь</h2>

        <div ref={ref} className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          <div className="timeline-card w-64 shrink-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 sm:w-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 font-mono-num text-xs text-[var(--color-text-muted)]">
              <GraduationCap size={12} /> {EDUCATION.period}
            </span>
            <h3 className="mt-4 text-sm font-semibold text-[var(--color-text)]">{EDUCATION.degree}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{EDUCATION.field}</p>
            <p className="mt-3 text-xs text-[var(--color-text-muted)]">{EDUCATION.institution}</p>
          </div>

          {TIMELINE.map((item) => (
            <div key={item.period} className="timeline-card w-64 shrink-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 sm:w-auto">
              <span className="inline-block rounded-full border border-[var(--color-border)] px-3 py-1 font-mono-num text-xs text-[var(--color-text-muted)]">
                {item.period}
              </span>
              <h3 className="mt-4 whitespace-pre-line text-sm font-semibold text-[var(--color-text)]">{item.place}</h3>
              <p className="mt-1 text-sm text-[var(--color-accent)]">{item.role}</p>
              <ul className="mt-3 space-y-1">
                {item.details.map((d) => (
                  <li key={d} className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
