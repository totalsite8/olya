import { FALLBACK_RATES } from '../data/modifiers'
import type { ExchangeRates } from '../types/calculator'

const CACHE_KEY = 'olya-portfolio:exchange-rates:v1'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000

interface CachedRates {
  fetchedAt: number
  rates: ExchangeRates
}

const CBR_DAILY_JSON_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'

function readCache(): CachedRates | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedRates
    if (!parsed?.rates || !parsed?.fetchedAt) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(rates: ExchangeRates) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), rates }))
  } catch {
    // ignore
  }
}

function fallback(): ExchangeRates {
  return { USD: FALLBACK_RATES.USD, EUR: FALLBACK_RATES.EUR, date: FALLBACK_RATES.date, isFallback: true }
}

async function fetchFromCbr(signal?: AbortSignal): Promise<ExchangeRates> {
  const res = await fetch(CBR_DAILY_JSON_URL, { signal })
  if (!res.ok) throw new Error(`CBR API responded with ${res.status}`)
  const data = await res.json()
  const usd = data?.Valute?.USD?.Value
  const eur = data?.Valute?.EUR?.Value
  if (typeof usd !== 'number' || typeof eur !== 'number') throw new Error('Unexpected CBR API payload')
  const dateRaw: string | undefined = data?.Date
  const date = dateRaw ? new Date(dateRaw).toLocaleDateString('ru-RU') : FALLBACK_RATES.date
  return { USD: usd, EUR: eur, date, isFallback: false }
}

/** Курсы ЦБ РФ с кешем на сутки в localStorage и резервом при недоступности API. */
export async function getExchangeRates(): Promise<ExchangeRates> {
  const cached = readCache()
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached.rates

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)
    const rates = await fetchFromCbr(controller.signal)
    clearTimeout(timeout)
    writeCache(rates)
    return rates
  } catch {
    if (cached) return { ...cached.rates, isFallback: true }
    return fallback()
  }
}
