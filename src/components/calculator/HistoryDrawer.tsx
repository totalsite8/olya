import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2, FolderOpen, User, Clock } from 'lucide-react'
import { useHistoryStore } from '../../store/useHistoryStore'
import { formatRub } from '../../lib/format'
import { CURRENCY_SYMBOL } from '../../data/modifiers'
import type { HistoryEntry } from '../../types/calculator'

interface HistoryDrawerProps {
  open: boolean
  onClose: () => void
  onOpenEntry: (entry: HistoryEntry) => void
}

export function HistoryDrawer({ open, onClose, onOpenEntry }: HistoryDrawerProps) {
  const entries = useHistoryStore((s) => s.entries)
  const removeEntry = useHistoryStore((s) => s.removeEntry)
  const clear = useHistoryStore((s) => s.clear)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[var(--color-border)] bg-[var(--color-bg)] p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">История расчётов</h2>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]">
                <X size={17} />
              </button>
            </div>

            {entries.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-[var(--color-text-muted)]">
                <FolderOpen size={32} />
                <p className="text-sm">Пока нет сохранённых расчётов</p>
              </div>
            ) : (
              <>
                <div className="no-scrollbar mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
                  {entries.map((entry) => (
                    <motion.div layout key={entry.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-[var(--color-text)]">
                            <User size={13} className="shrink-0 text-[var(--color-text-muted)]" />
                            {entry.clientName || 'Без имени'}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                            <Clock size={12} />
                            {new Date(entry.createdAt).toLocaleString('ru-RU')}
                          </p>
                        </div>
                        <button
                          onClick={() => removeEntry(entry.id)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-danger)]/10 hover:text-[var(--color-danger)]"
                          aria-label="Удалить"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]">{entry.market}</span>
                        <span className="font-mono-num text-sm font-bold text-[var(--color-text)]">
                          {CURRENCY_SYMBOL[entry.market]}
                          {new Intl.NumberFormat('ru-RU').format(entry.total)}
                        </span>
                      </div>
                      {entry.rubEquivalent !== null && <p className="mt-1 text-right text-xs text-[var(--color-text-muted)]">≈ {formatRub(entry.rubEquivalent)}</p>}
                      <button onClick={() => onOpenEntry(entry)} className="mt-3 w-full rounded-xl border border-[var(--color-border)] py-2 text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]">
                        Открыть и пересчитать
                      </button>
                    </motion.div>
                  ))}
                </div>
                <button onClick={clear} className="mt-4 w-full rounded-xl border border-[var(--color-danger)]/30 py-2.5 text-sm font-medium text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10">
                  Очистить всю историю
                </button>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
