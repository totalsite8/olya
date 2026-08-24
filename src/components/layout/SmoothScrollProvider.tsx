import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../../lib/gsap'

/**
 * Глобальный плавный скролл (Lenis) — тренд 2026 года для «сшитых» страниц:
 * инерционная прокрутка делает переход между блоками физически ощутимым,
 * а не рывками. Синхронизирован с GSAP ScrollTrigger, чтобы все scroll-driven
 * анимации (параллакс, рельсы процесса, кинетические заголовки) откликались
 * на тот же плавный скролл, а не на «сырые» события браузера.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureGsapPlugins()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.1,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // @ts-expect-error — глобальная ссылка для якорных ссылок (#story и т.д.)
    window.__lenis = lenis

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      // @ts-expect-error — очистка
      window.__lenis = undefined
    }
  }, [])

  return <>{children}</>
}
