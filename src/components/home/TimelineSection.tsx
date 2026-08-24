import { GraduationCap } from 'lucide-react'
import { StickyMediaStory } from '../scrolly/StickyMediaStory'
import { TIMELINE, EDUCATION } from '../../data/timeline'
import { IMG } from '../../data/images'

const TIMELINE_IMAGES = [IMG.footer.background, IMG.hero.background, IMG.ecozavr.productGrid, IMG.domashniy.mascotLaptop, IMG.alfa.hero]

export function TimelineSection() {
  const steps = [
    {
      kicker: EDUCATION.period,
      title: `${EDUCATION.degree} · ${EDUCATION.field}`,
      desc: EDUCATION.institution,
      image: TIMELINE_IMAGES[0],
    },
    ...TIMELINE.map((item, i) => ({
      kicker: item.period,
      title: item.place,
      desc: item.role,
      image: TIMELINE_IMAGES[i + 1],
      extra: (
        <ul className="mt-4 space-y-1.5">
          {item.details.map((d) => (
            <li key={d} className="flex gap-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
              {d}
            </li>
          ))}
        </ul>
      ),
    })),
  ]

  return (
    <section className="relative border-y border-[var(--color-border)] bg-[var(--color-bg-soft)] px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          8 лет в дизайне
        </p>
        <h2 className="font-display mb-14 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Мой путь</h2>

        <StickyMediaStory
          steps={steps}
          renderMedia={(activeIndex, step) => (
            <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-2xl">
              <img src={step.image} alt={step.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                {activeIndex === 0 ? <GraduationCap size={13} /> : <span className="font-mono-num">{String(activeIndex).padStart(2, '0')}</span>}
                {step.kicker}
              </span>
            </div>
          )}
        />
      </div>
    </section>
  )
}
