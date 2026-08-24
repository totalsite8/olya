import { motion } from 'framer-motion'
import { Stepper } from './Stepper'
import { formatMoney } from '../../lib/format'
import { PRESENTATION_TYPES, PRESENTATION_BASE } from '../../data/services'
import type { Market } from '../../types/calculator'

interface PresentationBlockProps {
  market: Market
  items: Record<string, number>
  onChange: (code: string, quantity: number) => void
}

export function PresentationBlock({ market, items, onChange }: PresentationBlockProps) {
  const totalSlides = PRESENTATION_TYPES.reduce((sum, p) => sum + (items[p.code] ?? 0), 0)
  const baseActive = totalSlides > 0

  return (
    <div className="space-y-3">
      {PRESENTATION_TYPES.map((p) => {
        const qty = items[p.code] ?? 0
        const unitPrice = p.price[market]
        const active = qty > 0
        return (
          <motion.div
            layout
            key={p.code}
            className={`rounded-2xl border p-3.5 transition-colors sm:p-4 ${
              active ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)]' : 'border-[var(--color-border)] bg-[var(--color-surface)]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--color-text)] sm:text-base">{p.name}</p>
                <p className="font-mono-num text-xs text-[var(--color-text-muted)]">{formatMoney(unitPrice, market)} / слайд</p>
              </div>
              <div className="flex items-start gap-3">
                <Stepper value={qty} onChange={(v) => onChange(p.code, v)} sliderMax={50} />
                <div className="w-20 pt-1 text-right font-mono-num text-sm font-semibold text-[var(--color-text)] sm:w-24">
                  {active ? formatMoney(qty * unitPrice, market) : '—'}
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
      <motion.div
        layout
        className={`flex items-center justify-between rounded-2xl border border-dashed p-3.5 text-sm sm:p-4 ${
          baseActive ? 'border-[var(--color-accent)]/40 text-[var(--color-text)]' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
        }`}
      >
        <span>База проекта презентации (начисляется один раз при наличии слайдов)</span>
        <span className="font-mono-num font-semibold">{baseActive ? formatMoney(PRESENTATION_BASE[market], market) : '—'}</span>
      </motion.div>
    </div>
  )
}
