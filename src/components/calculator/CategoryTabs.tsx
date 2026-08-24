import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

export interface CategoryTabItem {
  id: string
  label: string
  icon: ReactNode
  count: number
  subtotal?: string
}

interface CategoryTabsProps {
  items: CategoryTabItem[]
  active: string
  onChange: (id: string) => void
  children: ReactNode
}

/** Настоящие табы: одна панель видна за раз, переключение мгновенное. */
export function CategoryTabs({ items, active, onChange, children }: CategoryTabsProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="no-scrollbar flex items-stretch gap-1 overflow-x-auto border-b border-[var(--color-border)] p-2">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex shrink-0 flex-col items-start gap-0.5 rounded-2xl px-3.5 py-2.5 text-left transition-colors sm:min-w-[140px] ${
                isActive ? 'text-[var(--color-accent-contrast)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="category-tab-bg"
                  className="absolute inset-0 rounded-2xl bg-[var(--color-accent)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 text-sm font-semibold">
                {item.icon}
                {item.label}
              </span>
              <span className={`relative z-10 font-mono-num text-[11px] ${isActive ? 'text-[var(--color-accent-contrast)]/80' : 'text-[var(--color-text-muted)]'}`}>
                {item.count > 0 ? `${item.count} шт${item.subtotal ? ` · ${item.subtotal}` : ''}` : 'пусто'}
              </span>
            </button>
          )
        })}
      </div>
      <div className="relative min-h-[120px] p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            className="space-y-3"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
