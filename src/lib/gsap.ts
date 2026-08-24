import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function ensureGsapPlugins() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true

  // Картинки часто догружаются позже разметки и сдвигают высоту секций —
  // пересчитываем позиции всех ScrollTrigger, чтобы sticky/scrub-эффекты
  // не «съезжали» после полной загрузки медиа.
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => ScrollTrigger.refresh())
  }
}

export { gsap, ScrollTrigger }
