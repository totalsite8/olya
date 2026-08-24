import { useEffect, type RefObject } from 'react'
import { ensureGsapPlugins, gsap } from '../lib/gsap'

/**
 * Делает иконки карточек внутри контейнера «живыми» на протяжении всего
 * скролла — не разовый reveal, а непрерывная лёгкая реакция (покачивание +
 * микро-масштаб), синхронизированная с положением карточки в вьюпорте.
 * Пользователь должен видеть, что интерфейс отзывается на каждое движение
 * колеса, а не просто проигрывает анимацию один раз при появлении.
 */
export function useScrollReactiveIcons(containerRef: RefObject<HTMLElement | null>, selector = '.reveal-icon') {
  useEffect(() => {
    ensureGsapPlugins()
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const icons = container.querySelectorAll<HTMLElement>(selector)
      icons.forEach((icon, i) => {
        gsap.fromTo(
          icon,
          { rotate: -10, scale: 0.92 },
          {
            rotate: 10,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: icon.closest('.reveal-item') ?? icon,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8 + (i % 3) * 0.2,
            },
          },
        )
      })
    }, container)

    return () => ctx.revert()
  }, [containerRef, selector])
}
