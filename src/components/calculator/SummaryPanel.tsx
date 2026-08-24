import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Save, TrendingUp, Info } from 'lucide-react'
import { formatMoney, formatRub } from '../../lib/format'
import { netAmountRu } from '../../lib/calc'
import { AnimatedNumber } from './AnimatedNumber'
import { CategorySplitChart } from './CategorySplitChart'
import type { CalcResult } from '../../lib/calc'
import type { ExchangeRates, Market, UrgencyLevel } from '../../types/calculator'
import { URGENCY_OPTIONS, CURRENCY_SYMBOL } from '../../data/modifiers'

interface SummaryPanelProps {
  result: CalcResult
  market: Market
  urgency: UrgencyLevel
  rates: ExchangeRates
  vatRateEu: number
  onSave: () => void
  canSave: boolean
  saved: boolean
}

export function SummaryPanel({ result, market, urgency, rates, vatRateEu, onSave, canSave, saved }: SummaryPanelProps) {
  const rubEquivalent = market === 'RU' ? null : Math.round(result.total * (market === 'US' ? rates.USD : rates.EUR))
  const urgencyOption = URGENCY_OPTIONS.find((u) => u.level === urgency)!
  const urgencyPct = Math.round(urgencyOption.multiplier[market] * 100)

  const durationWarning =
    urgency !== 'standard' &&
    result.durationSequentialDays > 0 &&
    ((urgency === 'fast' && result.durationSequentialDays > 3) || (urgency === 'urgent' && result.durationSequentialDays > 1))

  return (
    <div className="sticky top-4 space-y-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Итог</h3>
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--color-text-muted)]">
          <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${rates.isFallback ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-success)]'}`} />
          {rates.isFallback ? 'РЕЗЕРВ. КУРС' : 'ЦБ РФ · LIVE'}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <Row label="Сумма позиций" value={formatMoney(result.itemsSubtotal, market)} muted />
        <AnimatePresence>
          {result.licenseMarkup > 0 && <Row label="Наценка за права" value={`+${formatMoney(result.licenseMarkup, market)}`} accent />}
        </AnimatePresence>
        <AnimatePresence>
          {result.urgencyMarkup > 0 && (
            <Row label={`Наценка за срочность (+${urgencyPct}%)`} value={`+${formatMoney(result.urgencyMarkup, market)}`} accent />
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-[var(--color-border)] pt-4">
        <p className="text-xs text-[var(--color-text-muted)]">ИТОГО</p>
        <p className="flex items-baseline gap-1 text-3xl font-bold text-[var(--color-text)]">
          {market !== 'RU' && <span className="font-mono-num">{CURRENCY_SYMBOL[market]}</span>}
          <AnimatedNumber value={result.total} formatter={(n) => new Intl.NumberFormat('ru-RU').format(n)} />
          {market === 'RU' && <span className="font-mono-num">{CURRENCY_SYMBOL[market]}</span>}
        </p>
        {rubEquivalent !== null && (
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            ≈ {formatRub(rubEquivalent)} {rates.isFallback ? '(резервный курс' : '(курс ЦБ на'} {rates.date})
          </p>
        )}
        {market === 'RU' && result.total > 0 && (
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">На руки (после налога 6%): {formatRub(netAmountRu(result.total))}</p>
        )}
      </div>

      <CategorySplitChart lines={result.lines} market={market} />

      {result.hasAnyItems && (
        <div className="space-y-1.5 rounded-2xl bg-[var(--color-accent-soft)] p-3 text-xs text-[var(--color-text)]">
          <p>
            Срок: <strong>{result.durationSequentialDays} дн.</strong> последовательно / <strong>{result.durationParallelDays} дн.</strong> параллельно
          </p>
          {durationWarning && (
            <div className="flex items-start gap-1.5 text-[var(--color-warning)]">
              <AlertTriangle size={13} className="mt-0.5 shrink-0" />
              <span>Расчётный срок больше заявленной срочности. Расчёт не блокируется.</span>
            </div>
          )}
        </div>
      )}

      {result.marketBenchmarkRub !== null && result.marketBenchmarkRub > 0 && (
        <div className="flex items-start gap-2 rounded-2xl border border-[var(--color-border)] p-3 text-xs text-[var(--color-text-muted)]">
          <TrendingUp size={14} className="mt-0.5 shrink-0 text-[var(--color-success)]" />
          <span>
            Рыночный ориентир: по медиане рынка РФ этот заказ стоил бы примерно <strong className="text-[var(--color-text)]">{formatRub(result.marketBenchmarkRub)}</strong>.
          </span>
        </div>
      )}

      <TaxNote market={market} vatRateEu={vatRateEu} />

      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={!canSave}
        onClick={onSave}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-[var(--color-accent-contrast)] transition-opacity disabled:opacity-40"
      >
        <Save size={16} />
        {saved ? 'Сохранено ✓' : 'Сохранить в историю'}
      </motion.button>
    </div>
  )
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center justify-between">
      <span className={muted ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text)]'}>{label}</span>
      <span className={`font-mono-num font-medium ${accent ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'}`}>{value}</span>
    </motion.div>
  )
}

function TaxNote({ market, vatRateEu }: { market: Market; vatRateEu: number }) {
  const text =
    market === 'RU'
      ? 'НДС не облагается — самозанятость, налог 6%.'
      : market === 'US'
        ? 'Налог не начисляется (иностранный исполнитель, форма W-8BEN у клиента).'
        : `НДС не включён (нетто), применимая ставка по стране клиента, по умолчанию ${Math.round(vatRateEu * 100)}%.`

  return (
    <div className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
      <Info size={13} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  )
}
