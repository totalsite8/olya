import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../lib/gsap'

/**
 * Прокручивает страницу наверх при каждой смене маршрута,
 * чтобы новая страница всегда открывалась с первого экрана.
 * Учитывает подключённый глобальный плавный скролл (Lenis) и пересчитывает
 * все scroll-driven анимации GSAP, так как высота контента резко меняется
 * между страницами (иначе sticky/scrub-эффекты «уезжают»).
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // @ts-expect-error — глобальная ссылка на экземпляр Lenis из SmoothScrollProvider
    const lenis = window.__lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [pathname])
}
