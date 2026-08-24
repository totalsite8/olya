import { AnimatePresence, motion } from 'framer-motion'
import { formatMoney, formatQuantity } from '../../lib/format'
import type { LineResult } from '../../lib/calc'
import type { Market } from '../../types/calculator'

interface LineItemsBreakdownProps {
  lines: LineResult[]
  market: Market
}

export function LineItemsBreakdown({ lines, market }: LineItemsBreakdownProps) {
  if (lines.length === 0) return null

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Детализация</h3>
      <ul className="space-y-2 text-sm">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.li
              key={`${line.serviceId}-${line.name}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="flex items-center justify-between gap-3 border-b border-dashed border-[var(--color-border)] pb-2 last:border-0 last:pb-0"
            >
              <span className="min-w-0 flex-1 truncate text-[var(--color-text)]">
                {line.name}{' '}
                <span className="font-mono-num text-[var(--color-text-muted)]">
                  × {formatQuantity(line.quantity)} {line.unit}
                </span>
              </span>
              <span className="shrink-0 font-mono-num font-medium text-[var(--color-text)]">{formatMoney(line.lineTotal, market)}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
