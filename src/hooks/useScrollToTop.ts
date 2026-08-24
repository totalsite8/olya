import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Прокручивает страницу наверх при каждой смене маршрута,
 * чтобы новая страница всегда открывалась с первого экрана.
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
}
