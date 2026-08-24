import { motion } from 'framer-motion'
import { Cat, Palette, PackageOpen, LayoutDashboard, ArrowUpRight, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProcessRail } from '../components/scrolly/ProcessRail'
import { TIMELINE, EDUCATION } from '../data/timeline'

const SKILLS = [
  { icon: Cat, label: 'Маскоты и персонажи', value: 'Концепция, сценарии, иллюстрации, AI-анимация' },
  { icon: Palette, label: 'Коммуникационный дизайн', value: 'Соцсети, стикерпаки, обложки в рамках гайдбука' },
  { icon: PackageOpen, label: 'Брендинг и упаковка', value: 'Айдентика с нуля, логотип, макеты SKU' },
  { icon: LayoutDashboard, label: 'Презентации', value: 'Питч-деки, инфографика, визуализация данных' },
]

const PROCESS = [
  { step: '01', title: 'Задача', desc: 'Разбираюсь, что должен решить дизайн: обучение, продажи или узнаваемость бренда.' },
  { step: '02', title: 'Концепция', desc: 'Собираю референсы, предлагаю визуальное направление и характер персонажа или бренда.' },
  { step: '03', title: 'Продакшн', desc: 'Довожу концепцию до финального результата — иллюстрации, анимация, макеты.' },
  { step: '04', title: 'Передача', desc: 'Отдаю исходники и файлы в удобном формате, в рамках гайдбука и айдентики.' },
]

export function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="px-6 pb-20 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            Обо мне
          </p>
          <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-8xl">
            Bakushkina Olga
            <br />
            <span className="text-outline">Brand-designer</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl">
            Работаю на стыке классического бренд-дизайна и AI-инструментов: разрабатываю корпоративных маскотов,
            веду коммуникационный дизайн для крупных брендов, запускаю айдентику с нуля и превращаю сложные данные
            в презентации, которые действительно читают.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display mb-12 text-3xl font-semibold tracking-tight sm:text-5xl">Направления работы</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-6"
              >
                <Icon size={22} className="mb-4 text-[var(--color-accent)]" />
                <h3 className="font-display mb-1 text-lg font-semibold">{label}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display mb-14 text-3xl font-semibold tracking-tight sm:text-5xl">Мой путь</h2>
          <div className="space-y-6">
            <div className="flex flex-col gap-2 border-b border-[var(--color-border)] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <span className="flex shrink-0 items-center gap-2 font-mono-num text-sm text-[var(--color-text-muted)] sm:w-52">
                <GraduationCap size={14} /> {EDUCATION.period}
              </span>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[var(--color-text)]">
                  {EDUCATION.degree} · {EDUCATION.field}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{EDUCATION.institution}</p>
              </div>
            </div>

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col gap-2 border-b border-[var(--color-border)] pb-6 last:border-0 sm:flex-row sm:items-start sm:justify-between"
              >
                <span className="shrink-0 font-mono-num text-sm text-[var(--color-text-muted)] sm:w-52">{item.period}</span>
                <div className="flex-1">
                  <h3 className="whitespace-pre-line text-base font-semibold text-[var(--color-text)]">{item.place}</h3>
                  <p className="mt-1 text-sm text-[var(--color-accent)]">{item.role}</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {item.details.map((d) => (
                      <li key={d} className="text-xs text-[var(--color-text-muted)]">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display mb-16 text-3xl font-semibold tracking-tight sm:text-5xl">Как я работаю</h2>
          <ProcessRail steps={PROCESS} />
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="font-display max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">Хотите обсудить проект?</h2>
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
