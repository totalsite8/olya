import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap } from '../../lib/gsap'

interface RevealTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  scrub?: boolean
}

/**
 * Заголовок, который «дописывается» по мере скролла: строка разбивается на
 * слова, каждое слово прячется за маской и открывается пропорционально
 * прогрессу скролла (scrub) — в отличие от одноразового reveal, здесь текст
 * прямо откликается на положение скролла, можно проскроллить туда-обратно.
 */
export function RevealText({ children, as = 'h2', className = '', scrub = true }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const Tag = as

  useEffect(() => {
    ensureGsapPlugins()
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll<HTMLElement>('.reveal-word > span')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115, opacity: 0.15 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power3.out',
          stagger: 0.035,
          scrollTrigger: scrub
            ? { trigger: el, start: 'top 92%', end: 'top 45%', scrub: 0.6 }
            : { trigger: el, start: 'top 88%', once: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [scrub])

  const words = children.split(' ')

  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className="reveal-word inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span className="inline-block will-change-transform">
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
