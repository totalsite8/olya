import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { IMG } from '../../data/images'
import { CONTACTS } from '../../data/contacts'

const HERO_CARDS = [
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
    id: 'presentations',
    title: 'Презентации',
    subtitle: 'Дизайн презентаций',
    image: IMG.hero.dataAnalytics,
    tone: 'dark' as const,
  },
  {
    id: 'domashniy-social',
    title: 'Соц.сети',
    subtitle: 'Дизайн для социальных сетей телеканала «Домашний»',
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
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-hidden pb-14 pt-32 sm:pb-20">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img src={IMG.hero.background} alt="" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/10 via-transparent to-[var(--color-bg)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
          <a href={`tel:${CONTACTS.phoneRaw}`} data-cursor-hover className="transition-colors hover:text-[var(--color-text)]">
            {CONTACTS.phone}
          </a>
          <a href={`mailto:${CONTACTS.email}`} data-cursor-hover className="transition-colors hover:text-[var(--color-text)]">
            {CONTACTS.email}
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center text-center sm:mt-20">
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

        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4">
          {HERO_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/portfolio/${card.id}`}
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
    </section>
  )
}
