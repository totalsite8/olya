import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { CONTACTS } from '../../data/contacts'

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/portfolio', label: 'Портфолио' },
  { to: '/video-branding', label: 'Видео и айдентика' },
  { to: '/about', label: 'Обо мне' },
  { to: '/contact', label: 'Контакты' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-5 transition-all duration-500 sm:px-7 ${
            scrolled ? 'mx-4 border border-[var(--color-border)] bg-[var(--color-bg-soft)]/70 py-2.5 backdrop-blur-xl sm:mx-8' : 'py-1'
          }`}
        >
          <Link to="/" className="font-display flex items-baseline gap-2 text-lg font-semibold tracking-tight" data-cursor-hover>
            <span>Bakushkina</span>
            <span className="text-[var(--color-accent)]">Olga</span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-1 backdrop-blur-md md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                data-cursor-hover
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-[var(--color-accent-contrast)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[var(--color-accent)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href={`tel:${CONTACTS.phoneRaw}`} className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]" data-cursor-hover>
              {CONTACTS.phone}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-text)] backdrop-blur-md md:hidden"
              aria-label="Открыть меню"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[var(--color-bg)] p-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Меню</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]"
                aria-label="Закрыть меню"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="mt-12 flex flex-1 flex-col justify-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <NavLink to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)} className="font-display block py-3 text-4xl font-semibold tracking-tight">
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-text-muted)]">
              <p>{CONTACTS.phone}</p>
              <p>{CONTACTS.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
