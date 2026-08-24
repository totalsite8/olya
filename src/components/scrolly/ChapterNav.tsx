import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export interface Chapter {
  id: string
  label: string
}

interface LenisLike {
  scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void
}

/**
 * Вертикальная нить-навигация по «главам» страницы: тонкая линия слева от
 * точек физически соединяет все секции в одну историю и дорисовывается по
 * мере скролла — блоки страницы визуально «сшиты» одной нитью, а не висят
 * порознь. Активная глава подсвечивается через IntersectionObserver.
 */
export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll()
  const lineHeight = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.2 })

  useEffect(() => {
    const sections = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = sections.findIndex((el) => el === entry.target)
          if (idx !== -1) setActive(idx)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [chapters])

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
    if (lenis) {
      lenis.scrollTo(el, { offset: -96, duration: 1.1 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav aria-label="Разделы страницы" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="relative flex flex-col items-center gap-6 py-2">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-border)]" />
        <motion.div
          style={{ scaleY: lineHeight }}
          className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-[var(--color-accent)]"
        />

        {chapters.map((chapter, i) => (
          <button
            key={chapter.id}
            onClick={() => goTo(chapter.id)}
            data-cursor-hover
            className="group relative flex items-center"
            aria-label={chapter.label}
          >
            <span className="pointer-events-none absolute right-6 top-1/2 max-w-0 -translate-y-1/2 overflow-hidden whitespace-nowrap rounded-full bg-[var(--color-bg-soft)] px-0 py-1.5 text-xs font-medium text-[var(--color-text-muted)] opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-[220px] group-hover:px-3 group-hover:opacity-100">
              {chapter.label}
            </span>
            <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-bg)]">
              <motion.span
                animate={{ scale: active === i ? 1 : 0.55, opacity: active === i ? 1 : 0.5 }}
                transition={{ duration: 0.25 }}
                className="block h-2 w-2 rounded-full bg-[var(--color-accent)]"
              />
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
