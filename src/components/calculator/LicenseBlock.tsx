import { motion } from 'framer-motion'
import { LICENSE_OPTIONS } from '../../data/modifiers'
import type { LicenseTier } from '../../types/calculator'

interface LicenseBlockProps {
  value: LicenseTier
  onChange: (tier: LicenseTier) => void
}

export function LicenseBlock({ value, onChange }: LicenseBlockProps) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {LICENSE_OPTIONS.map((opt) => {
        const active = opt.tier === value
        return (
          <motion.button
            key={opt.tier}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(opt.tier)}
            className={`rounded-2xl border p-3.5 text-left transition-colors ${
              active ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]' : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--color-text)]">{opt.label}</p>
              <span className={`font-mono-num text-xs font-bold ${opt.markup > 0 ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}>
                {opt.markup > 0 ? `+${Math.round(opt.markup * 100)}%` : '0%'}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">{opt.sublabel}</p>
          </motion.button>
        )
      })}
    </div>
  )
}
