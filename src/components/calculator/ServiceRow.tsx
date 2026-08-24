import { motion } from 'framer-motion'
import { Stepper } from './Stepper'
import { formatMoney } from '../../lib/format'
import type { Market, ServiceItem } from '../../types/calculator'

interface ServiceRowProps {
  service: ServiceItem
  quantity: number
  market: Market
  onChange: (quantity: number) => void
  addons?: { script: boolean; voiceover: boolean }
  onToggleAddon?: (addon: 'script' | 'voiceover') => void
}

export function ServiceRow({ service, quantity, market, onChange, addons, onToggleAddon }: ServiceRowProps) {
  const unitPrice = service.price[market]
  const lineTotal = quantity * unitPrice
  const active = quantity > 0

  return (
    <motion.div
      layout
      className={`rounded-2xl border p-3.5 transition-colors sm:p-4 ${
        active ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)]' : 'border-[var(--color-border)] bg-[var(--color-surface)]'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--color-text)] sm:text-base">{service.name}</p>
          <p className="font-mono-num text-xs text-[var(--color-text-muted)]">
            {formatMoney(unitPrice, market)} / {service.unit}
            {service.description && <span className="hidden font-sans sm:inline"> · {service.description}</span>}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <Stepper value={quantity} onChange={onChange} step={service.step ?? 1} />
          <div className="w-20 pt-1 text-right font-mono-num text-sm font-semibold text-[var(--color-text)] sm:w-24">
            {active ? formatMoney(lineTotal, market) : '—'}
          </div>
        </div>
      </div>
      {(service.id === 'V1' || service.id === 'V2') && active && onToggleAddon && (
        <div className="mt-3 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <input
              type="checkbox"
              checked={addons?.script ?? false}
              onChange={() => onToggleAddon('script')}
              className="h-4 w-4 rounded accent-[var(--color-accent)]"
            />
            + сценарий / раскадровка ({quantity} мин)
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <input
              type="checkbox"
              checked={addons?.voiceover ?? false}
              onChange={() => onToggleAddon('voiceover')}
              className="h-4 w-4 rounded accent-[var(--color-accent)]"
            />
            + озвучка к видео ({quantity} мин)
          </label>
        </div>
      )}
    </motion.div>
  )
}
