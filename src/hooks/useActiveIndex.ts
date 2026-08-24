import { useEffect, useRef, useState } from 'react'

/**
 * Отслеживает, какой из перечисленных элементов сейчас «активен» в вьюпорте —
 * то есть ближе всего к горизонтальной центральной полосе экрана. Используется
 * для scroll-driven повествования: sticky-медиа слева, шаги истории справа.
 */
export function useActiveIndex(count: number) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    refs.current = refs.current.slice(0, count)
  }, [count])

  useEffect(() => {
    if (count === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = refs.current.findIndex((el) => el === entry.target)
          if (idx !== -1) setActive(idx)
        })
      },
      { threshold: 0, rootMargin: '-42% 0px -42% 0px' },
    )

    refs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [count])

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
  }

  return { active, setRef }
}
