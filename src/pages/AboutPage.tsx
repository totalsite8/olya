import { motion } from 'framer-motion'
import { Cat, Palette, PackageOpen, LayoutDashboard, ArrowUpRight, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProcessRail } from '../components/scrolly/ProcessRail'
import { ChapterNav } from '../components/scrolly/ChapterNav'
import { RevealText } from '../components/scrolly/RevealText'
import { StickyMediaStory } from '../components/scrolly/StickyMediaStory'
import { TIMELINE, EDUCATION } from '../data/timeline'
import { IMG } from '../data/images'

const SKILLS = [
  { icon: Cat, label: 'Маскоты и персонажи', value: 'Концепция, сценарии, AI-анимация', image: IMG.alfa.hero },
  { icon: Palette, label: 'Коммуникационный дизайн', value: 'Соцсети, стикерпаки, обложки', image: IMG.domashniy.mascotLaptop },
  { icon: PackageOpen, label: 'Брендинг и упаковка', value: 'Айдентика с нуля, макеты SKU', image: IMG.ecozavr.productGrid },
  { icon: LayoutDashboard, label: 'Презентации', value: 'Питч-деки, инфографика', image: IMG.pitch.coverSlide },
]

const PROCESS = [
  { step: '01', title: 'Задача', desc: 'Разбираюсь, что должен решить дизайн: обучение, продажи или узнаваемость бренда.' },
  { step: '02', title: 'Концепция', desc: 'Собираю референсы, предлагаю визуальное направление и характер персонажа или бренда.' },
  { step: '03', title: 'Продакшн', desc: 'Довожу концепцию до финального результата — иллюстрации, анимация, макеты.' },
  { step: '04', title: 'Передача', desc: 'Отдаю исходники и файлы в удобном формате, в рамках гайдбука и айдентики.' },
]

const TIMELINE_IMAGES = [IMG.path.education, IMG.path.agency, IMG.path.ecozavr, IMG.path.domashniy, IMG.path.alfa]

const CHAPTERS = [
  { id: 'intro', label: 'Обо мне' },
  { id: 'skills', label: 'Направления' },
  { id: 'path', label: 'Мой путь' },
  { id: 'process', label: 'Как я работаю' },
  { id: 'cta', label: 'Контакт' },
]

export function AboutPage() {
  const timelineSteps = [
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
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.details.map((d) => (
            <span key={d} className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-muted)]">
              {d}
            </span>
          ))}
        </div>
      ),
    })),
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ChapterNav chapters={CHAPTERS} />
      <section id="intro" className="scroll-mt-24 px-5 pb-12 pt-32 sm:px-10 sm:pb-20 sm:pt-36 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:mb-4">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            Обо мне
          </p>
          <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-8xl">
            Bakushkina Olga
            <br />
            <span className="text-outline">Brand-designer</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)] sm:mt-8 sm:text-xl">
            Разрабатываю маскотов, веду коммуникационный дизайн для крупных брендов, запускаю айдентику
            с нуля и превращаю данные в презентации, которые читают.
          </p>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 border-y border-[var(--color-border)] px-5 py-12 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <RevealText as="h2" className="font-display mb-6 text-3xl font-semibold tracking-tight sm:mb-12 sm:text-5xl">
            Направления работы
          </RevealText>
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {SKILLS.map(({ icon: Icon, label, value, image }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-[4/5] w-[62vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-[var(--color-border)] sm:w-auto sm:rounded-3xl"
              >
                <img src={image} alt={label} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md sm:h-10 sm:w-10">
                  <Icon size={18} />
                </div>
                <div className="absolute inset-x-4 bottom-4">
                  <h3 className="font-display text-base font-semibold leading-tight text-white sm:text-lg">{label}</h3>
                  <p className="mt-1 text-xs text-white/75">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="path" className="scroll-mt-24 px-5 py-14 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <RevealText as="h2" className="font-display mb-8 text-3xl font-semibold tracking-tight sm:mb-14 sm:text-5xl">
            Мой путь
          </RevealText>

          <StickyMediaStory
            steps={timelineSteps}
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

      <section id="process" className="scroll-mt-24 border-t border-[var(--color-border)] px-5 py-14 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <RevealText as="h2" className="font-display mb-10 text-3xl font-semibold tracking-tight sm:mb-16 sm:text-5xl">
            Как я работаю
          </RevealText>
          <ProcessRail steps={PROCESS} />
        </div>
      </section>

      <section id="cta" className="scroll-mt-24 border-t border-[var(--color-border)] px-5 py-12 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-8">
          <h2 className="font-display max-w-xl text-2xl font-semibold tracking-tight sm:text-5xl">Хотите обсудить проект?</h2>
          <Link
            to="/contact"
            data-cursor-hover
            className="group flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-contrast)] transition-transform hover:scale-105"
          >
            Написать мне
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </motion.div>
  )
}
