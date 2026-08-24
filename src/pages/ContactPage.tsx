import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Instagram, ArrowUpRight, Check } from 'lucide-react'

export function ContactPage() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Проект от ${name || 'клиента'}`)
    const body = encodeURIComponent(`${message}\n\nКонтакт для связи: ${contact}`)
    window.location.href = `mailto:hello@olgabakushkina.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 pb-28 pt-36 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            Контакты
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            Давайте
            <br />
            познакомимся
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--color-text-muted)]">
            Расскажите о задаче — отвечаю в течение рабочего дня. Если нужен точный расчёт стоимости прямо сейчас,
            опишите объём работ в сообщении, и я пришлю смету.
          </p>

          <div className="mt-12 space-y-4">
            <a
              href="mailto:hello@olgabakushkina.com"
              data-cursor-hover
              className="group flex items-center justify-between rounded-2xl border border-[var(--color-border)] p-5 transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Email</p>
                  <p className="font-medium">hello@olgabakushkina.com</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="group flex items-center justify-between rounded-2xl border border-[var(--color-border)] p-5 transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <Send size={17} />
                </span>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Telegram</p>
                  <p className="font-medium">@olgabakushkina</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="group flex items-center justify-between rounded-2xl border border-[var(--color-border)] p-5 transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <Instagram size={18} />
                </span>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Instagram</p>
                  <p className="font-medium">@olga.bakushkina.design</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">Как вас зовут?</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Имя"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">Email или Telegram</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">Расскажите о проекте</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Что нужно сделать, сроки, бюджет…"
                className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--color-accent-contrast)]"
            >
              {sent ? (
                <>
                  <Check size={16} /> Открываю почтовый клиент
                </>
              ) : (
                <>
                  Отправить сообщение
                  <ArrowUpRight size={16} />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  )
}
