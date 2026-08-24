import { motion } from 'framer-motion'
import { Image, Sparkles, Video, Presentation, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const SKILLS = [
  { icon: Image, label: 'Дизайн', value: 'Посты, баннеры, обложки, карточки товара' },
  { icon: Sparkles, label: 'Нейрогенерации', value: 'AI-изображения, аватары, LoRA-модели' },
  { icon: Video, label: 'Видео и анимация', value: '2D/3D-анимация, моушн, сценарии' },
  { icon: Presentation, label: 'Презентации', value: 'Питч-деки, инфографика, шаблоны' },
]

const PROCESS = [
  { step: '01', title: 'Бриф и цели', desc: 'Разбираемся, что должен решить дизайн: продажи, узнаваемость или инвестиции.' },
  { step: '02', title: 'Концепция', desc: 'Собираю референсы, предлагаю 2–3 визуальных направления на выбор.' },
  { step: '03', title: 'Продакшн', desc: 'Довожу выбранную концепцию до финального результата с 3 кругами правок.' },
  { step: '04', title: 'Передача', desc: 'Отдаю исходники и файлы в удобном формате — без скрытых доплат.' },
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
            Дизайнер, который
            <br />
            <span className="text-outline">думает продуктом</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl">
            Меня зовут Ольга Бакушкина. Работаю на стыке классического дизайна и нейросетей: делаю визуал, который
            не просто красиво выглядит, а решает задачу клиента — продать, объяснить или произвести впечатление.
            За последние годы прошла путь от постов для соцсетей до питч-деков и AI-роликов для инвестиционных раундов.
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
          <h2 className="font-display mb-14 text-3xl font-semibold tracking-tight sm:text-5xl">Как я работаю</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="font-mono-num text-sm text-[var(--color-accent)]">{item.step}</span>
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
