import type { Market } from '../types/calculator'
import { CURRENCY_SYMBOL } from '../data/modifiers'

export function formatMoney(amount: number, market: Market): string {
  const formatted = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(amount)
  const symbol = CURRENCY_SYMBOL[market]
  return market === 'RU' ? `${formatted} ${symbol}` : `${symbol}${formatted}`
}

export function formatRub(amount: number): string {
  return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(amount)} ₽`
}

export function formatQuantity(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1)
}
