import { SERVICES_BY_ID, PRESENTATION_TYPES, PRESENTATION_BASE, PRESENTATION_DAILY_RATE, SERVICES } from '../data/services'
import { URGENCY_OPTIONS, LICENSE_OPTIONS, MARKET_BENCHMARK_RU } from '../data/modifiers'
import type { CalculatorState, Market } from '../types/calculator'

export interface LineResult {
  serviceId: string
  name: string
  unit: string
  quantity: number
  unitPrice: number
  lineTotal: number
  category: string
}

export interface CalcResult {
  lines: LineResult[]
  presentationBase: number
  presentationSlideCount: number
  itemsSubtotal: number
  licenseMarkup: number
  urgencyMarkup: number
  total: number
  durationSequentialDays: number
  durationParallelDays: number
  marketBenchmarkRub: number | null
  hasAnyItems: boolean
}

const round = (n: number) => Math.round(n)

export function calculate(state: CalculatorState): CalcResult {
  const { market, items, videoAddons, urgency, license } = state
  const lines: LineResult[] = []
  let itemsSubtotal = 0
  let hasAnyItems = false
  const durationsPerLine: number[] = []

  for (const service of SERVICES) {
    const qty = items[service.id] ?? 0
    if (qty <= 0) continue
    hasAnyItems = true
    const unitPrice = service.price[market]
    const lineTotal = qty * unitPrice
    lines.push({ serviceId: service.id, name: service.name, unit: service.unit, quantity: qty, unitPrice, lineTotal, category: service.category })
    itemsSubtotal += lineTotal
    durationsPerLine.push(Math.ceil(qty / service.dailyRate))

    if (service.id === 'V1' || service.id === 'V2') {
      const addon = videoAddons[service.id]
      if (addon?.script) {
        const v3 = SERVICES_BY_ID['V3']
        const addPrice = v3.price[market] * qty
        lines.push({ serviceId: 'V3', name: `${v3.name} (для ${service.name})`, unit: v3.unit, quantity: qty, unitPrice: v3.price[market], lineTotal: addPrice, category: v3.category })
        itemsSubtotal += addPrice
        durationsPerLine.push(Math.ceil(qty / v3.dailyRate))
      }
      if (addon?.voiceover) {
        const v4 = SERVICES_BY_ID['V4']
        const addPrice = v4.price[market] * qty
        lines.push({ serviceId: 'V4', name: `${v4.name} (для ${service.name})`, unit: v4.unit, quantity: qty, unitPrice: v4.price[market], lineTotal: addPrice, category: v4.category })
        itemsSubtotal += addPrice
        durationsPerLine.push(Math.ceil(qty / v4.dailyRate))
      }
    }
  }

  let presentationSlideCount = 0
  let presentationBase = 0
  for (const p of PRESENTATION_TYPES) {
    const qty = items[p.code] ?? 0
    if (qty <= 0) continue
    hasAnyItems = true
    presentationSlideCount += qty
    const unitPrice = p.price[market]
    const lineTotal = qty * unitPrice
    lines.push({ serviceId: p.code, name: p.name, unit: 'слайд', quantity: qty, unitPrice, lineTotal, category: 'presentation' })
    itemsSubtotal += lineTotal
    durationsPerLine.push(Math.ceil(qty / PRESENTATION_DAILY_RATE))
  }
  if (presentationSlideCount > 0) {
    presentationBase = PRESENTATION_BASE[market]
    itemsSubtotal += presentationBase
  }

  const licenseOption = LICENSE_OPTIONS.find((l) => l.tier === license)
  const licenseMarkupRate = market === 'RU' ? 0 : licenseOption?.markup ?? 0
  const licenseMarkup = itemsSubtotal * licenseMarkupRate

  const urgencyOption = URGENCY_OPTIONS.find((u) => u.level === urgency)!
  const urgencyRate = urgencyOption.multiplier[market]
  const urgencyMarkup = (itemsSubtotal + licenseMarkup) * urgencyRate

  const total = itemsSubtotal + licenseMarkup + urgencyMarkup

  const durationSequentialDays = durationsPerLine.length ? Math.max(1, durationsPerLine.reduce((a, b) => a + b, 0)) : 0
  const durationParallelDays = durationsPerLine.length ? Math.max(1, ...durationsPerLine) : 0

  let marketBenchmarkRub: number | null = null
  if (hasAnyItems) {
    let benchmark = 0
    let matched = false
    for (const line of lines) {
      const benchPrice = MARKET_BENCHMARK_RU[line.serviceId]
      if (benchPrice) {
        matched = true
        benchmark += line.quantity * benchPrice
      }
    }
    if (matched) marketBenchmarkRub = round(benchmark)
  }

  return {
    lines,
    presentationBase,
    presentationSlideCount,
    itemsSubtotal: round(itemsSubtotal),
    licenseMarkup: round(licenseMarkup),
    urgencyMarkup: round(urgencyMarkup),
    total: round(total),
    durationSequentialDays,
    durationParallelDays,
    marketBenchmarkRub,
    hasAnyItems,
  }
}

export function convertToRub(amount: number, market: Market, rates: { USD: number; EUR: number }): number | null {
  if (market === 'RU') return null
  const rate = market === 'US' ? rates.USD : rates.EUR
  return round(amount * rate)
}

export function netAmountRu(total: number): number {
  return round(total * 0.94)
}
