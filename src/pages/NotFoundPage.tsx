import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center"
    >
      <p className="font-display text-[30vw] font-bold leading-none text-[var(--color-accent-soft)] sm:text-[18vw]">404</p>
      <h1 className="font-display -mt-8 text-3xl font-semibold tracking-tight sm:text-5xl">Страница потерялась</h1>
      <p className="mt-4 max-w-md text-[var(--color-text-muted)]">Похоже, такой страницы не существует. Возвращайтесь на главную.</p>
      <Link
        to="/"
        data-cursor-hover
        className="group mt-8 flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-contrast)]"
      >
        На главную
        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  )
}
