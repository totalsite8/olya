import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { IMG } from '../../data/images'

const SERVICES = [
  {
    title: 'Видео и айдентика',
    tags: ['AI-видео', 'Motion-гайд'],
    image: IMG.video.unlitPoster,
    href: '/video-branding',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Дизайн соцсетей',
    tags: ['Контент-сетка', 'Шаблоны'],
    image: IMG.social.caseCover,
    href: '/social-media-design',
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'AI-визуалы бренда',
    tags: ['LoRA', 'Продукт-рендер'],
    image: IMG.aiVisuals.productRender,
    href: '/ai-visuals',
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'Питч-деки и презентации',
    tags: ['Питч-дек', 'Сторителлинг'],
    image: IMG.pitch.coverSlide,
    href: '/pitch-decks',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Маскоты и персонажи',
    tags: ['Персонажи', 'AI-анимация'],
    image: IMG.alfa.hero,
    href: '/portfolio/alfa-mascots',
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'Брендинг и упаковка',
    tags: ['Логотип', 'Упаковка'],
    image: IMG.ecozavr.productGrid,
    href: '/portfolio/ecozavr-brand',
    aspect: 'aspect-[3/4]',
  },
]

export function ServicesGrid() {
  return (
    <section className="relative px-5 py-16 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Что я делаю
        </p>
        <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Шесть направлений, один результат</h2>

        <div className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-16 sm:gap-4 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={service.href}
                data-cursor-hover
                className={`group relative block overflow-hidden rounded-2xl sm:rounded-3xl ${service.aspect}`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-6">
                  <div>
                    <h3 className="font-display text-sm font-semibold leading-tight tracking-tight text-white sm:text-xl">{service.title}</h3>
                    <div className="mt-1.5 hidden flex-wrap gap-1.5 sm:flex">
                      {service.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45 sm:h-11 sm:w-11">
                    <ArrowUpRight size={14} className="sm:hidden" />
                    <ArrowUpRight size={18} className="hidden sm:block" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
