import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VAT_RATE_EU_DEFAULT } from '../data/modifiers'

interface SettingsStore {
  vatRateEu: number
  setVatRateEu: (rate: number) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      vatRateEu: VAT_RATE_EU_DEFAULT,
      setVatRateEu: (rate) => set({ vatRateEu: rate }),
    }),
    { name: 'olya-portfolio:calculator-settings' },
  ),
)
