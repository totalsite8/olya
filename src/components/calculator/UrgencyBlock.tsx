import { motion } from 'framer-motion'
import { URGENCY_OPTIONS } from '../../data/modifiers'
import type { Market, UrgencyLevel } from '../../types/calculator'

interface UrgencyBlockProps {
  market: Market
  value: UrgencyLevel
  onChange: (level: UrgencyLevel) => void
}

export function UrgencyBlock({ market, value, onChange }: UrgencyBlockProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {URGENCY_OPTIONS.map((opt) => {
        const active = opt.level === value
        const pct = Math.round(opt.multiplier[market] * 100)
        return (
          <motion.button
            key={opt.level}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(opt.level)}
            className={`relative rounded-2xl border p-3 text-left transition-colors ${
              active ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]' : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <p className="text-sm font-semibold text-[var(--color-text)]">{opt.label}</p>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{opt.sublabel}</p>
            <p className={`mt-1.5 font-mono-num text-xs font-bold ${pct > 0 ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}>
              {pct > 0 ? `+${pct}%` : '0%'}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
