import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Тонкая полоса прогресса чтения страницы — визуально «сшивает» все секции
 * в единую историю от первого экрана до последнего.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.2 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--color-accent)]"
      aria-hidden
    />
  )
}
