import { motion } from 'framer-motion'
import { HeroSection } from '../components/home/HeroSection'
import { TimelineSection } from '../components/home/TimelineSection'
import { ServicesMarquee } from '../components/home/ServicesMarquee'
import { FeaturedWork } from '../components/home/FeaturedWork'
import { ServicesGrid } from '../components/home/ServicesGrid'
import { StatsSection } from '../components/home/StatsSection'
import { CtaSection } from '../components/home/CtaSection'

export function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <HeroSection />
      <TimelineSection />
      <ServicesMarquee />
      <FeaturedWork />
      <ServicesGrid />
      <StatsSection />
      <CtaSection />
    </motion.div>
  )
}
