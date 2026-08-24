import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useThemeSync } from './hooks/useThemeSync'
import { useScrollToTop } from './hooks/useScrollToTop'
import { SiteLayout } from './components/layout/SiteLayout'
import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ProjectPage } from './pages/ProjectPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { CalculatorPage } from './pages/CalculatorPage'
import { VideoBrandingPage } from './pages/VideoBrandingPage'
import { SocialMediaDesignPage } from './pages/SocialMediaDesignPage'
import { AiVisualsPage } from './pages/AiVisualsPage'
import { PitchDecksPage } from './pages/PitchDecksPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  useThemeSync()
  useScrollToTop()
  const location = useLocation()
  const isCalculator = location.pathname.startsWith('/calculator')

  if (isCalculator) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/calculator" element={<CalculatorPage />} />
        </Routes>
      </AnimatePresence>
    )
  }

  return (
    <SmoothScrollProvider>
      <SiteLayout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<ProjectPage />} />
            <Route path="/video-branding" element={<VideoBrandingPage />} />
            <Route path="/social-media-design" element={<SocialMediaDesignPage />} />
            <Route path="/ai-visuals" element={<AiVisualsPage />} />
            <Route path="/pitch-decks" element={<PitchDecksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </SiteLayout>
    </SmoothScrollProvider>
  )
}

export default App
