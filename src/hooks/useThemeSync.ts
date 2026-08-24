import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

/** Синхронизирует тему из store с атрибутом data-theme на <html>. */
export function useThemeSync() {
  const theme = useAppStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])
}
