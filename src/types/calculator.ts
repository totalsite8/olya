export type Market = 'RU' | 'US' | 'EU'

export type ServiceCategory = 'design' | 'neuro' | 'video' | 'presentation'

export type UnitLabel = 'шт' | 'мин' | 'слайд' | 'мес' | 'проект' | 'набор' | 'модель' | 'формат' | 'день'

export interface MarketPrice {
  RU: number
  US: number
  EU: number
}

export interface ServiceItem {
  id: string
  code: string
  category: ServiceCategory
  name: string
  unit: UnitLabel
  price: MarketPrice
  step?: number
  dailyRate: number
  description?: string
}

export type UrgencyLevel = 'standard' | 'fast' | 'urgent' | 'today'

export interface UrgencyOption {
  level: UrgencyLevel
  label: string
  sublabel: string
  multiplier: Record<Market, number>
}

export type LicenseTier = 'internal' | 'commercial' | 'paidAds90' | 'paidAdsForever'

export interface LicenseOption {
  tier: LicenseTier
  label: string
  sublabel: string
  markup: number
}

export interface CalculatorState {
  clientName: string
  market: Market
  urgency: UrgencyLevel
  license: LicenseTier
  items: Record<string, number>
  videoAddons: Record<string, { script: boolean; voiceover: boolean }>
}

export interface HistoryEntry {
  id: string
  createdAt: string
  clientName: string
  market: Market
  urgency: UrgencyLevel
  license: LicenseTier
  items: Record<string, number>
  videoAddons: Record<string, { script: boolean; voiceover: boolean }>
  total: number
  currencySymbol: string
  rubEquivalent: number | null
  durationSequential: number
  durationParallel: number
}

export interface ExchangeRates {
  USD: number
  EUR: number
  date: string
  isFallback: boolean
}
