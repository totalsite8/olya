import { AnimatePresence, motion } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { useState } from 'react'
import { useInstallPrompt } from '../../hooks/useInstallPrompt'

/** Показывается только на мобильных при доступном beforeinstallprompt. */
export function InstallPwaBanner() {
  const { canInstall, promptInstall } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(false)

  const visible = canInstall && !dismissed

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed inset-x-3 bottom-3 z-[90] flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]/95 p-3.5 shadow-2xl backdrop-blur-xl sm:hidden"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <Download size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[var(--color-text)]">Установить приложение</p>
            <p className="text-xs text-[var(--color-text-muted)]">Портфолио Ольги на главном экране</p>
          </div>
          <button
            onClick={() => promptInstall()}
            className="shrink-0 rounded-xl bg-[var(--color-accent)] px-3 py-2 text-xs font-semibold text-[var(--color-accent-contrast)]"
          >
            Установить
          </button>
          <button onClick={() => setDismissed(true)} aria-label="Скрыть" className="shrink-0 text-[var(--color-text-muted)]">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
