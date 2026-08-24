import { Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect, type ChangeEvent } from 'react'

interface StepperProps {
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
  max?: number
  sliderMax?: number
}

export function Stepper({ value, onChange, step = 1, min = 0, max = 999, sliderMax = 30 }: StepperProps) {
  const [inputValue, setInputValue] = useState(String(value))

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  const clamp = (n: number) => Math.min(max, Math.max(min, n))

  const handleStep = (delta: number) => {
    onChange(clamp(Math.round((value + delta) * 10) / 10))
  }

  const commitInput = () => {
    const parsed = parseFloat(inputValue.replace(',', '.'))
    if (Number.isNaN(parsed)) {
      setInputValue(String(value))
      return
    }
    onChange(clamp(parsed))
  }

  const effectiveSliderMax = Math.max(sliderMax, value)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => handleStep(-step)}
          disabled={value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)] disabled:opacity-30"
          aria-label="Уменьшить"
        >
          <Minus size={14} />
        </motion.button>
        <input
          inputMode="decimal"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onBlur={commitInput}
          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
          className="h-8 w-14 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-center font-mono-num text-sm font-semibold text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
        />
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => handleStep(step)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]"
          aria-label="Увеличить"
        >
          <Plus size={14} />
        </motion.button>
      </div>
      <input
        type="range"
        min={min}
        max={effectiveSliderMax}
        step={step}
        value={value}
        onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
        className="h-1 w-full min-w-[7.5rem] cursor-pointer accent-[var(--color-accent)]"
        aria-label="Количество (слайдер)"
      />
    </div>
  )
}
