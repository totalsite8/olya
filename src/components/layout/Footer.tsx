import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone, Send } from 'lucide-react'
import { CONTACTS } from '../../data/contacts'
import { IMG } from '../../data/images'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] px-6 pb-10 pt-24 sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10">
        <img src={IMG.footer.background} alt="" decoding="async" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/70 to-[var(--color-bg)]/20" />
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
            <a href={`tel:${CONTACTS.phoneRaw}`} data-cursor-hover className="flex items-center gap-2.5 transition-colors hover:text-[var(--color-text)]">
              <Phone size={15} /> {CONTACTS.phone}
            </a>
            <a href={CONTACTS.telegramUrl} target="_blank" rel="noreferrer" data-cursor-hover className="flex items-center gap-2.5 transition-colors hover:text-[var(--color-text)]">
              <Send size={14} /> {CONTACTS.telegram}
            </a>
            <a href={`mailto:${CONTACTS.email}`} data-cursor-hover className="flex items-center gap-2.5 transition-colors hover:text-[var(--color-text)]">
              <Mail size={15} /> {CONTACTS.email}
            </a>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-sm text-[var(--color-text-muted)]">{CONTACTS.roleFull}</p>
            <p className="font-mono-num text-xs text-[var(--color-text-muted)]">2026</p>
          </div>
        </div>

        <Link to="/contact" data-cursor-hover className="group mt-10 block">
          <h2 className="font-display text-[13vw] font-bold uppercase leading-[0.85] tracking-tight sm:text-[9vw] lg:text-[7vw]">
            Bakushkina Olga
          </h2>
        </Link>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Bakushkina Olga. Все права защищены.</span>
          <div className="flex items-center gap-4">
            <Link to="/contact" data-cursor-hover className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-text)]">
              Написать мне <ArrowUpRight size={13} />
            </Link>
            <Link
              to="/calculator"
              className="flex items-center gap-1.5 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              data-cursor-hover
              title="Внутренний калькулятор стоимости услуг"
            >
              Калькулятор <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
