import { useEffect, useRef } from 'react'

/**
 * Обычный системный курсор остаётся видимым — никакой замены.
 * Вместо этого лёгкое радиальное свечение мягко следует за курсором
 * по всему полю сайта (аналог "magnetic light" из современных студийных
 * сайтов), не перекрывая интерактивные элементы и не отвлекая внимание.
 */
export function CursorField() {
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let raf = 0

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08
      if (fieldRef.current) {
        fieldRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={fieldRef} className="cursor-field" aria-hidden="true" />
}
