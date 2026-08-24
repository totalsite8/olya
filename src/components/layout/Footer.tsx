import { Link } from 'react-router-dom'
import { ArrowUpRight, Instagram, Send, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Готовы начать
              <br />
              проект?
            </p>
            <Link
              to="/contact"
              data-cursor-hover
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              Написать мне <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="flex gap-3">
            <a
              href="mailto:hello@olgabakushkina.com"
              data-cursor-hover
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              aria-label="Telegram"
            >
              <Send size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              aria-label="Instagram"
            >
              <Instagram size={17} />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ольга Бакушкина. Все права защищены.</span>
          <div className="flex items-center gap-4">
            <span>Дизайн · Нейрогенерации · Видео · Презентации</span>
            <Link
              to="/calculator"
              className="opacity-30 transition-opacity hover:opacity-80"
              data-cursor-hover
              aria-label="Внутренний калькулятор"
              title="Внутренний калькулятор"
            >
              ·
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
