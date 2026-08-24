import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown, Calculator } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { CONTACTS } from '../../data/contacts'

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/portfolio', label: 'Портфолио' },
  { to: '/about', label: 'Обо мне' },
  { to: '/contact', label: 'Контакты' },
]

const SERVICES_LINKS = [
  { to: '/video-branding', label: 'Видео и айдентика', desc: 'Рекламные ролики и motion-гайд бренда' },
  { to: '/social-media-design', label: 'Дизайн соцсетей', desc: 'Контент-системы для Instagram и Reels' },
  { to: '/ai-visuals', label: 'AI-визуалы бренда', desc: 'Консистентные персонажи и продукт-рендеры' },
  { to: '/pitch-decks', label: 'Питч-деки и презентации', desc: 'Инвесторские сторидеки под ключ' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isServiceRouteActive = SERVICES_LINKS.some((l) => l.to === location.pathname)

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

  useEffect(() => {
    setServicesOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
            {NAV_LINKS.slice(0, 2).map((link) => (
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

            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setServicesOpen((v) => !v)}
                data-cursor-hover
                className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isServiceRouteActive ? 'text-[var(--color-accent-contrast)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {isServiceRouteActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--color-accent)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                Услуги
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-2 shadow-2xl"
                  >
                    {SERVICES_LINKS.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        data-cursor-hover
                        className="block rounded-2xl px-4 py-3 transition-colors hover:bg-[var(--color-surface-hover)]"
                      >
                        <p className="text-sm font-semibold text-[var(--color-text)]">{link.label}</p>
                        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{link.desc}</p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.slice(2).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
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

          <div className="hidden items-center gap-3 lg:flex">
            <a href={`tel:${CONTACTS.phoneRaw}`} className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]" data-cursor-hover>
              {CONTACTS.phone}
            </a>
            <Link
              to="/calculator"
              data-cursor-hover
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3.5 py-2 text-xs font-medium text-[var(--color-text-muted)] backdrop-blur-md transition-colors hover:text-[var(--color-text)]"
              title="Внутренний калькулятор стоимости услуг"
            >
              <Calculator size={13} /> Калькулятор
            </Link>
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
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-[var(--color-bg)] p-6 md:hidden"
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
            <nav className="mt-10 flex flex-1 flex-col justify-center gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <NavLink to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)} className="font-display block py-2.5 text-3xl font-semibold tracking-tight">
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-1 mt-6 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
              >
                Услуги
              </motion.p>
              {SERVICES_LINKS.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 + i * 0.05 }}>
                  <NavLink to={link.to} onClick={() => setMenuOpen(false)} className="font-display block py-2 text-xl font-semibold tracking-tight">
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
                <Link
                  to="/calculator"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-muted)]"
                >
                  <Calculator size={14} /> Калькулятор
                </Link>
              </motion.div>
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
