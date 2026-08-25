import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-10 sm:py-32 lg:px-16">
      <div className="grain-gradient absolute inset-0" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
        >
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Работаем вместе
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-8xl"
        >
          Расскажите
          <br />
          о проекте
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10"
        >
          <Link
            to="/contact"
            data-cursor-hover
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-8 py-4 text-base font-semibold text-[var(--color-accent-contrast)] transition-transform hover:scale-105"
          >
            Написать мне
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
