import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../utils/cn'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount: 0.12 })

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1 })
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={controls}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn('section-depth', className)}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}
