import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { CustomCursor } from './CustomCursor'
import { InstallPwaBanner } from './InstallPwaBanner'

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="noise-overlay" />
      <CustomCursor />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <InstallPwaBanner />
    </div>
  )
}
