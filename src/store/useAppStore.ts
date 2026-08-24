import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'
export type ActiveScreen = 'home' | 'portfolio' | 'about' | 'contact' | 'calculator'

interface AppState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void

  activeScreen: ActiveScreen
  setActiveScreen: (screen: ActiveScreen) => void

  /** Игровая механика вовлечения: очки за взаимодействие с портфолио (открытие кейсов, скролл секций и т.д.) */
  pointsBalance: number
  addPoints: (amount: number) => void
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('olya-portfolio:theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      setTheme: (theme) => set({ theme }),

      activeScreen: 'home',
      setActiveScreen: (screen) => set({ activeScreen: screen }),

      pointsBalance: 0,
      addPoints: (amount) => set({ pointsBalance: get().pointsBalance + amount }),
    }),
    {
      name: 'olya-portfolio:app',
      partialize: (state) => ({ theme: state.theme, pointsBalance: state.pointsBalance }),
    },
  ),
)
