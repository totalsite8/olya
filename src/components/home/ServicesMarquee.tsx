const SERVICES = ['Маскоты', 'Брендинг', 'Упаковка', 'Соцсети', 'Презентации', 'AI-анимация', 'Айдентика', 'Digital-дизайн']

export function ServicesMarquee() {
  const items = [...SERVICES, ...SERVICES]

  return (
    <section className="relative overflow-hidden border-y border-[var(--color-border)] py-8">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="font-display flex items-center gap-10 text-3xl font-semibold tracking-tight text-[var(--color-text-muted)] sm:text-5xl">
            {item}
            <span className="text-[var(--color-accent)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
