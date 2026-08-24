import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  formatter: (n: number) => string
  className?: string
}

export function AnimatedNumber({ value, formatter, className }: AnimatedNumberProps) {
  const motionValue = useMotionValue(value)
  const spring = useSpring(motionValue, { stiffness: 140, damping: 22, mass: 0.6 })
  const [display, setDisplay] = useState(formatter(value))
  const rounded = useTransform(spring, (v) => formatter(Math.round(v)))

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return unsub
  }, [rounded])

  return (
    <motion.span className={`font-mono-num ${className ?? ''}`} aria-live="polite">
      {display}
    </motion.span>
  )
}
