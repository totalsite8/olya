import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { IMG } from '../../data/images'
import { CONTACTS } from '../../data/contacts'

const HERO_CARDS = [
  {
    id: 'video-branding',
    href: '/video-branding',
    title: 'Видео и\nайдентика',
    subtitle: 'Рекламные ролики и motion-гайд бренда под ключ',
    image: IMG.video.unlitPoster,
    tone: 'dark' as const,
  },
  {
    id: 'alfa-mascots',
    title: 'Маскоты\nдля корпоративного обучения',
    subtitle: 'АльфаСтрахование-Жизнь — персонажи, сценарии, анимация',
    image: IMG.hero.alfaMascots,
    tone: 'dark' as const,
  },
  {
    id: 'ecozavr-brand',
    title: 'Запуск бренда',
    subtitle: 'Айдентика и упаковка для бренда «Ecozavr»',
    image: IMG.hero.ecoSoap,
    tone: 'dark' as const,
  },
  {
    id: 'pitch-decks',
    href: '/pitch-decks',
    title: 'Презентации',
    subtitle: 'Питч-деки и дизайн презентаций под ключ',
    image: IMG.hero.dataAnalytics,
    tone: 'dark' as const,
  },
  {
    id: 'social-media-design',
    href: '/social-media-design',
    title: 'Соц.сети',
    subtitle: 'Контент-система для ленты и сторис бренда',
    image: IMG.shared.domashniyMascotLaptop,
    tone: 'pink' as const,
  },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-28 sm:pb-20 sm:pt-32">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img src={IMG.hero.background} alt="" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/10 via-transparent to-[var(--color-bg)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between">
        <div className="flex items-center justify-between px-5 text-xs text-[var(--color-text-muted)] sm:px-10 sm:text-sm lg:px-16">
          <a href={`tel:${CONTACTS.phoneRaw}`} data-cursor-hover className="transition-colors hover:text-[var(--color-text)]">
            {CONTACTS.phone}
          </a>
          <a href={`mailto:${CONTACTS.email}`} data-cursor-hover className="transition-colors hover:text-[var(--color-text)]">
            {CONTACTS.email}
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center px-5 text-center sm:mt-16 sm:px-10 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-mono-num text-sm text-[var(--color-text-muted)]"
          >
            2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-3 text-[13vw] font-normal leading-[0.95] tracking-tight sm:text-[7.5vw] lg:text-[6vw]"
          >
            Bakushkina Olga
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-3 text-lg text-[var(--color-text-muted)] sm:text-xl"
          >
            Brand&nbsp;-&nbsp;designer
          </motion.p>
        </div>

        {/* Мобильная раскладка: крупная горизонтальная лента work-карточек со snap-скроллом —
            каждая работа видна целиком, без мелких превью и без лишнего текста. */}
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:hidden">
          {HERO_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-[78vw] shrink-0 snap-center"
            >
              <Link
                to={card.href ?? `/portfolio/${card.id}`}
                data-cursor-hover
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl p-5"
              >
                <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className={`absolute inset-0 ${card.tone === 'pink' ? 'bg-gradient-to-t from-black/55 via-black/10 to-transparent' : 'bg-gradient-to-t from-black/85 via-black/20 to-transparent'}`} />
                <div className="relative z-10">
                  <h3 className="font-display whitespace-pre-line text-xl font-semibold leading-tight text-white">{card.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">
                    Подробнее
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Планшет и десктоп: широкая сетка */}
        <div className="mt-16 hidden gap-3 px-5 sm:grid sm:grid-cols-2 sm:px-10 sm:gap-4 lg:grid-cols-5 lg:px-16">
          {HERO_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={card.href ?? `/portfolio/${card.id}`}
                data-cursor-hover
                className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-3xl p-5 sm:p-6"
              >
                <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className={`absolute inset-0 ${card.tone === 'pink' ? 'bg-gradient-to-t from-black/50 via-black/10 to-transparent' : 'bg-gradient-to-t from-black/85 via-black/20 to-transparent'}`} />
                <div className="relative z-10">
                  <h3 className="font-display whitespace-pre-line text-lg font-semibold leading-tight text-white sm:text-xl">{card.title}</h3>
                  <p className="mt-1.5 hidden text-xs text-white/75 sm:block">{card.subtitle}</p>
                </div>
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-transform group-hover:translate-x-0.5">
                    Подробнее
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="pointer-events-none absolute inset-x-0 bottom-3 hidden justify-center text-[var(--color-text-muted)] sm:flex"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Листайте</span>
          <ArrowRight size={14} className="rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  )
}
