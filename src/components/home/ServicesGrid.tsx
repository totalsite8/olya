import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Cat, PackageOpen, LayoutDashboard, Film, ArrowUpRight, Sparkles, Wand2 } from 'lucide-react'
import { ensureGsapPlugins, gsap } from '../../lib/gsap'
import { useScrollReactiveIcons } from '../../hooks/useScrollReactiveIcons'

const SERVICES = [
  {
    icon: Film,
    title: 'Видео и айдентика',
    description: 'Рекламные ролики, AI-продакшн и motion-гайд бренда под ключ — от идеи до адаптации под все форматы.',
    tags: ['AI-видео', 'Motion-гайд', '9:16 / 16:9'],
    href: '/video-branding',
  },
  {
    icon: Sparkles,
    title: 'Дизайн соцсетей',
    description: 'Контент-система для ленты: гайдбук и переиспользуемые шаблоны постов, сторис и карточек товара.',
    tags: ['Контент-сетка', 'Гайдбук', 'Шаблоны'],
    href: '/social-media-design',
  },
  {
    icon: Wand2,
    title: 'AI-визуалы бренда',
    description: 'Консистентный персонаж и продукт-рендеры на кастомной модели, обученной на стиле бренда.',
    tags: ['LoRA', 'Консистентный персонаж', 'Продукт-рендер'],
    href: '/ai-visuals',
  },
  {
    icon: LayoutDashboard,
    title: 'Питч-деки и презентации',
    description: 'Нарратив-стратегия и дизайн инвесторской презентации — от сырых цифр до убедительной истории.',
    tags: ['Питч-дек', 'Инфографика', 'Сторителлинг'],
    href: '/pitch-decks',
  },
  {
    icon: Cat,
    title: 'Маскоты и персонажи',
    description: 'Разработка корпоративных маскотов, сценарии обучающих роликов, иллюстрации, раскадровка и AI-анимация под ключ.',
    tags: ['Персонажи', 'Сценарий', 'AI-анимация'],
  },
  {
    icon: PackageOpen,
    title: 'Брендинг и упаковка',
    description: 'Разработка айдентики с нуля, дизайн упаковки, логотипы и позиционирование — от концепции до готовых макетов SKU.',
    tags: ['Логотип', 'Упаковка', 'Позиционирование'],
  },
]

export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReactiveIcons(ref, '.reveal-icon')

  useEffect(() => {
    ensureGsapPlugins()
    const container = ref.current
    if (!container) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        container.querySelectorAll('.service-card'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: container, start: 'top 82%', once: true } },
      )
    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Что я делаю
        </p>
        <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Шесть направлений, один результат</h2>

        <div ref={ref} className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description, tags, href }) => {
            const cardClassName =
              'service-card reveal-item group relative block overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-7 transition-colors hover:border-[var(--color-accent)]/40'
            const content = (
              <>
                <div className="reveal-icon mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="font-display mb-2 flex items-center gap-2 text-xl font-semibold tracking-tight">
                  {title}
                  {href && <ArrowUpRight size={16} className="text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )
            return href ? (
              <Link key={title} to={href} data-cursor-hover className={`${cardClassName} cursor-pointer`}>
                {content}
              </Link>
            ) : (
              <div key={title} className={cardClassName}>
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
