import type { LicenseOption, UrgencyOption } from '../types/calculator'

// Раздел 7.1 — срочность
export const URGENCY_OPTIONS: UrgencyOption[] = [
  { level: 'standard', label: 'Стандарт', sublabel: 'Обычный срок', multiplier: { RU: 0, US: 0, EU: 0 } },
  { level: 'fast', label: 'Быстро', sublabel: '≤ 3 рабочих дней', multiplier: { RU: 0.2, US: 0.25, EU: 0.25 } },
  { level: 'urgent', label: 'Срочно', sublabel: '≤ 24 часа', multiplier: { RU: 0.5, US: 0.5, EU: 0.5 } },
  { level: 'today', label: 'Горящий', sublabel: 'Сегодня / в ночь', multiplier: { RU: 1, US: 1, EU: 1 } },
]

// Раздел 7.4 — права на использование (только US/EU)
export const LICENSE_OPTIONS: LicenseOption[] = [
  { tier: 'internal', label: 'Внутреннее использование', sublabel: 'Без платного размещения', markup: 0 },
  { tier: 'commercial', label: 'Коммерция без платного трафика', sublabel: 'Публикация без рекламного бюджета', markup: 0.15 },
  { tier: 'paidAds90', label: 'Платная реклама, 90 дней', sublabel: 'Лицензия на рекламу с ограничением по сроку', markup: 0.3 },
  { tier: 'paidAdsForever', label: 'Платная реклама, бессрочно', sublabel: 'Неограниченная лицензия на платное размещение', markup: 0.5 },
]

export const MARKET_BENCHMARK_RU: Record<string, number> = {
  V1: 50000,
  V2: 50000,
  N1: 1000,
  P1: 1500,
  P2: 1500,
  P3: 1500,
}

export const CURRENCY_SYMBOL: Record<'RU' | 'US' | 'EU', string> = {
  RU: '₽',
  US: '$',
  EU: '€',
}

export const FALLBACK_RATES = {
  USD: 82.92,
  EUR: 96.86,
  date: '22.08.2026',
}

export const VAT_RATE_EU_DEFAULT = 0.21
