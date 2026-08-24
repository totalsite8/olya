import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CalculatorState, LicenseTier, Market, UrgencyLevel } from '../types/calculator'

interface CalculatorStore extends CalculatorState {
  setClientName: (name: string) => void
  setMarket: (market: Market) => void
  setUrgency: (urgency: UrgencyLevel) => void
  setLicense: (license: LicenseTier) => void
  setQuantity: (serviceId: string, quantity: number) => void
  toggleAddon: (serviceId: string, addon: 'script' | 'voiceover') => void
  loadState: (state: Partial<CalculatorState>) => void
  reset: () => void
}

const initialState: CalculatorState = {
  clientName: '',
  market: 'RU',
  urgency: 'standard',
  license: 'internal',
  items: {},
  videoAddons: {},
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setClientName: (clientName) => set({ clientName }),
      setMarket: (market) => set({ market }),
      setUrgency: (urgency) => set({ urgency }),
      setLicense: (license) => set({ license }),
      setQuantity: (serviceId, quantity) => set({ items: { ...get().items, [serviceId]: Math.max(0, quantity) } }),
      toggleAddon: (serviceId, addon) => {
        const current = get().videoAddons[serviceId] ?? { script: false, voiceover: false }
        set({ videoAddons: { ...get().videoAddons, [serviceId]: { ...current, [addon]: !current[addon] } } })
      },
      loadState: (state) => set({ ...initialState, ...state }),
      reset: () => set({ ...initialState }),
    }),
    { name: 'olya-portfolio:calculator' },
  ),
)
