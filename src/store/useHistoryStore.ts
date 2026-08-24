import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { HistoryEntry } from '../types/calculator'

interface HistoryStore {
  entries: HistoryEntry[]
  addEntry: (entry: HistoryEntry) => void
  removeEntry: (id: string) => void
  clear: () => void
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) => set({ entries: [entry, ...get().entries] }),
      removeEntry: (id) => set({ entries: get().entries.filter((e) => e.id !== id) }),
      clear: () => set({ entries: [] }),
    }),
    { name: 'olya-portfolio:calculator-history' },
  ),
)
