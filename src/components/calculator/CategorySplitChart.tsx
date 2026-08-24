import { motion } from 'framer-motion'
import { CATEGORY_LABELS } from '../../data/services'
import { formatMoney } from '../../lib/format'
import type { LineResult } from '../../lib/calc'
import type { Market } from '../../types/calculator'

interface CategorySplitChartProps {
  lines: LineResult[]
  market: Market
}

const CATEGORY_COLORS: Record<string, string> = {
  design: '#f472b6',
  neuro: '#38bdf8',
  video: '#b48cff',
  presentation: '#4ade80',
}

export function CategorySplitChart({ lines, market }: CategorySplitChartProps) {
  const totals: Record<string, number> = {}
  let grandTotal = 0
  for (const line of lines) {
    totals[line.category] = (totals[line.category] ?? 0) + line.lineTotal
    grandTotal += line.lineTotal
  }

  const categories = Object.keys(CATEGORY_LABELS).filter((c) => (totals[c] ?? 0) > 0)
  if (categories.length === 0 || grandTotal === 0) return null

  return (
    <div className="space-y-2.5 border-t border-[var(--color-border)] pt-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Структура по категориям</p>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-hover)]">
        {categories.map((cat) => {
          const pct = (totals[cat] / grandTotal) * 100
          return (
            <motion.div
              key={cat}
              layout
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
              className="h-full first:rounded-l-full last:rounded-r-full"
            />
          )
        })}
      </div>
      <ul className="space-y-1.5">
        {categories
          .sort((a, b) => totals[b] - totals[a])
          .map((cat) => (
            <li key={cat} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat] }} />
                {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]}
              </span>
              <span className="font-mono-num font-medium text-[var(--color-text)]">
                {formatMoney(totals[cat], market)}
                <span className="ml-1.5 text-[var(--color-text-muted)]">· {Math.round((totals[cat] / grandTotal) * 100)}%</span>
              </span>
            </li>
          ))}
      </ul>
    </div>
  )
}
