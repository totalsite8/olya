import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Image, Sparkles, Video, Presentation as PresentationIcon, User2, RotateCcw, ShieldCheck, Search, History, ArrowLeft, Calculator } from 'lucide-react'
import { CategoryTabs } from '../components/calculator/CategoryTabs'
import { ServiceRow } from '../components/calculator/ServiceRow'
import { PresentationBlock } from '../components/calculator/PresentationBlock'
import { UrgencyBlock } from '../components/calculator/UrgencyBlock'
import { LicenseBlock } from '../components/calculator/LicenseBlock'
import { SummaryPanel } from '../components/calculator/SummaryPanel'
import { LineItemsBreakdown } from '../components/calculator/LineItemsBreakdown'
import { ServiceSearch } from '../components/calculator/ServiceSearch'
import { HistoryDrawer } from '../components/calculator/HistoryDrawer'
import { useThemeSync } from '../hooks/useThemeSync'
import { SERVICES, CATEGORY_LABELS } from '../data/services'
import { useCalculatorStore } from '../store/useCalculatorStore'
import { useHistoryStore } from '../store/useHistoryStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { calculate, convertToRub } from '../lib/calc'
import { formatMoney } from '../lib/format'
import { getExchangeRates } from '../lib/exchangeRates'
import type { ExchangeRates, HistoryEntry, Market } from '../types/calculator'
import { FALLBACK_RATES } from '../data/modifiers'

const MARKET_OPTIONS: { value: Market; label: string }[] = [
  { value: 'RU', label: 'RU · ₽' },
  { value: 'US', label: 'US · $' },
  { value: 'EU', label: 'EU · €' },
]

const CATEGORY_ICONS: Record<string, ReactNode> = {
  design: <Image size={15} />,
  neuro: <Sparkles size={15} />,
  video: <Video size={15} />,
  presentation: <PresentationIcon size={15} />,
}

const CATEGORY_ORDER = ['design', 'neuro', 'video', 'presentation'] as const

export function CalculatorPage() {
  useThemeSync()
  const state = useCalculatorStore()
  const addEntry = useHistoryStore((s) => s.addEntry)
  const vatRateEu = useSettingsStore((s) => s.vatRateEu)
  const [rates, setRates] = useState<ExchangeRates>({ ...FALLBACK_RATES, isFallback: true })
  const [saved, setSaved] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('design')

  useEffect(() => {
    getExchangeRates().then(setRates)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const result = useMemo(() => calculate(state), [state])

  const grouped = useMemo(() => {
    const map: Record<string, typeof SERVICES> = { design: [], neuro: [], video: [], presentation: [] }
    for (const s of SERVICES) map[s.category].push(s)
    return map
  }, [])

  const countIn = (category: string) => grouped[category].filter((s) => (state.items[s.id] ?? 0) > 0).length
  const subtotalIn = (category: string) => {
    const sum = result.lines.filter((l) => l.category === category).reduce((acc, l) => acc + l.lineTotal, 0)
    return sum > 0 ? formatMoney(sum, state.market) : undefined
  }

  const handleQuickAdd = (serviceId: string) => {
    const current = state.items[serviceId] ?? 0
    state.setQuantity(serviceId, current > 0 ? 0 : 1)
    const service = SERVICES.find((s) => s.id === serviceId)
    setActiveCategory(service?.category ?? 'presentation')
    setSearchOpen(false)
  }

  const handleSave = () => {
    if (!result.hasAnyItems) return
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      clientName: state.clientName,
      market: state.market,
      urgency: state.urgency,
      license: state.license,
      items: state.items,
      videoAddons: state.videoAddons,
      total: result.total,
      currencySymbol: state.market,
      rubEquivalent: convertToRub(result.total, state.market, rates),
      durationSequential: result.durationSequentialDays,
      durationParallel: result.durationParallelDays,
    }
    addEntry(entry)
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const handleOpenEntry = (entry: HistoryEntry) => {
    state.loadState({
      clientName: entry.clientName,
      market: entry.market,
      urgency: entry.urgency,
      license: entry.license,
      items: entry.items,
      videoAddons: entry.videoAddons,
    })
    setHistoryOpen(false)
  }

  const tabItems = CATEGORY_ORDER.map((cat) => ({
    id: cat,
    label: CATEGORY_LABELS[cat],
    icon: CATEGORY_ICONS[cat],
    count: countIn(cat),
    subtotal: subtotalIn(cat),
  }))

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-contrast)]">
              <ArrowLeft size={16} />
            </span>
            <div className="leading-tight">
              <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-text)] sm:text-base">
                <Calculator size={15} /> Калькулятор
              </p>
              <p className="hidden text-xs text-[var(--color-text-muted)] sm:block">Внутренний инструмент · только для Ольги</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistoryOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
              aria-label="История"
            >
              <History size={16} />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
              aria-label="Поиск"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 space-y-4">
          <div className="flex flex-col gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <User2 size={17} />
              </span>
              <input
                value={state.clientName}
                onChange={(e) => state.setClientName(e.target.value)}
                placeholder="Имя клиента"
                className="w-full min-w-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] sm:w-56"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
                {MARKET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => state.setMarket(opt.value)}
                    className={`relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                      state.market === opt.value ? 'text-[var(--color-accent-contrast)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    {state.market === opt.value && (
                      <motion.span layoutId="market-switch-calc" className="absolute inset-0 -z-10 rounded-xl bg-[var(--color-accent)]" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                    )}
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => state.reset()}
                title="Сбросить расчёт"
                aria-label="Сбросить расчёт"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <CategoryTabs items={tabItems} active={activeCategory} onChange={setActiveCategory}>
              {activeCategory === 'design' &&
                grouped.design.map((service) => (
                  <ServiceRow key={service.id} service={service} quantity={state.items[service.id] ?? 0} market={state.market} onChange={(qty) => state.setQuantity(service.id, qty)} />
                ))}
              {activeCategory === 'neuro' &&
                grouped.neuro.map((service) => (
                  <ServiceRow key={service.id} service={service} quantity={state.items[service.id] ?? 0} market={state.market} onChange={(qty) => state.setQuantity(service.id, qty)} />
                ))}
              {activeCategory === 'video' &&
                grouped.video.map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    quantity={state.items[service.id] ?? 0}
                    market={state.market}
                    onChange={(qty) => state.setQuantity(service.id, qty)}
                    addons={state.videoAddons[service.id]}
                    onToggleAddon={(addon) => state.toggleAddon(service.id, addon)}
                  />
                ))}
              {activeCategory === 'presentation' && <PresentationBlock market={state.market} items={state.items} onChange={(code, qty) => state.setQuantity(code, qty)} />}
            </CategoryTabs>

            {state.market !== 'RU' && (
              <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-4 sm:p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  <ShieldCheck size={15} />
                  Права на использование
                </h3>
                <LicenseBlock value={state.license} onChange={state.setLicense} />
              </div>
            )}

            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-4 sm:p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Срочность</h3>
              <UrgencyBlock market={state.market} value={state.urgency} onChange={state.setUrgency} />
            </div>

            <LineItemsBreakdown lines={result.lines} market={state.market} />
          </div>

          <div>
            <SummaryPanel
              result={result}
              market={state.market}
              urgency={state.urgency}
              rates={rates}
              vatRateEu={vatRateEu}
              onSave={handleSave}
              canSave={result.hasAnyItems}
              saved={saved}
            />
          </div>
        </div>
      </div>

      <HistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} onOpenEntry={handleOpenEntry} />
      <ServiceSearch open={searchOpen} onClose={() => setSearchOpen(false)} market={state.market} items={state.items} onQuickAdd={handleQuickAdd} />
    </div>
  )
}
