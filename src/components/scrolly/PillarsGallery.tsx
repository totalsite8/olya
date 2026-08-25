import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export interface PillarItem {
  icon: LucideIcon
  title: string
  description: string
  image: string
}

/**
 * Визуальная витрина «Что входит» — вместо карточек «иконка + абзац текста»
 * каждый пункт представлен реальным изображением работы с коротким
 * заголовком поверх. Текст-описание — вспомогательная подпись под кадром,
 * а не главный элемент. На мобильном — снэп-лента крупных карточек,
 * на десктопе — bento-сетка с чередованием размеров.
 */
export function PillarsGallery({ items }: { items: PillarItem[] }) {
  return (
    <>
      {/* Мобильная лента: снэп-скролл, каждая работа видна крупно */}
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 lg:hidden">
        {items.map(({ icon: Icon, title, description, image }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ delay: (i % 3) * 0.06, duration: 0.5 }}
            className="w-[72vw] shrink-0 snap-center"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--color-border)]">
              <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
                <Icon size={17} />
              </div>
              <h3 className="font-display absolute inset-x-4 bottom-4 text-lg font-semibold leading-tight text-white">{title}</h3>
            </div>
            <p className="mt-2.5 px-0.5 text-xs leading-relaxed text-[var(--color-text-muted)]">{description}</p>
          </motion.div>
        ))}
      </div>

      {/* Десктопная bento-сетка */}
      <div className="hidden grid-cols-6 gap-4 lg:grid">
        {items.map(({ icon: Icon, title, description, image }, i) => {
          const big = i === 0 || i === 3
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-3xl border border-[var(--color-border)] ${big ? 'col-span-3 aspect-[16/10]' : 'col-span-2 aspect-[4/5]'}`}
            >
              <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-colors group-hover:from-black/85" />
              <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md transition-transform group-hover:scale-110">
                <Icon size={20} />
              </div>
              <div className="absolute inset-x-6 bottom-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/75">{description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
