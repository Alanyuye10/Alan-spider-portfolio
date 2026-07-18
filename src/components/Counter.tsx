import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

export function Counter({ value, suffix = '', duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return controls.stop
  }, [count, duration, inView, value])

  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>
}
