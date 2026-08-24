import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X, Plus, Check } from 'lucide-react'
import { SERVICES, PRESENTATION_TYPES, CATEGORY_LABELS } from '../../data/services'
import { formatMoney } from '../../lib/format'
import type { Market } from '../../types/calculator'

interface SearchableItem {
  id: string
  name: string
  unit: string
  price: number
  category: string
}

interface ServiceSearchProps {
  open: boolean
  onClose: () => void
  market: Market
  items: Record<string, number>
  onQuickAdd: (id: string) => void
}

export function ServiceSearch({ open, onClose, market, items, onQuickAdd }: ServiceSearchProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const pool: SearchableItem[] = useMemo(() => {
    const services: SearchableItem[] = SERVICES.map((s) => ({ id: s.id, name: s.name, unit: s.unit, price: s.price[market], category: s.category }))
    const presentations: SearchableItem[] = PRESENTATION_TYPES.map((p) => ({ id: p.code, name: p.name, unit: 'слайд', price: p.price[market], category: 'presentation' }))
    return [...services, ...presentations]
  }, [market])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pool
    return pool.filter((item) => item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q))
  }, [pool, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="fixed left-1/2 top-[10vh] z-[70] w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] shadow-2xl"
          >
            <div className="flex items-center gap-2.5 border-b border-[var(--color-border)] px-4 py-3">
              <Search size={16} className="shrink-0 text-[var(--color-text-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Найти услугу: пост, аватар, слайд…"
                className="flex-1 bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
              />
              <button onClick={onClose} className="shrink-0 text-[var(--color-text-muted)]">
                <X size={16} />
              </button>
            </div>
            <div className="no-scrollbar max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-[var(--color-text-muted)]">Ничего не найдено</p>}
              {results.map((item) => {
                const active = (items[item.id] ?? 0) > 0
                return (
                  <button
                    key={item.id}
                    onClick={() => onQuickAdd(item.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[var(--color-surface-hover)]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--color-text)]">{item.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {CATEGORY_LABELS[item.category as keyof typeof CATEGORY_LABELS]} · {formatMoney(item.price, market)} / {item.unit}
                      </p>
                    </div>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        active ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]' : 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                      }`}
                    >
                      {active ? <Check size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
