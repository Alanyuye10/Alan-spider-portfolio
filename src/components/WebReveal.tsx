import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../utils/cn'

interface WebRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function WebReveal({ children, className, delay = 0, duration = 0.9 }: WebRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount: 0.15 })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={controls}
      variants={{
        hidden: { clipPath: 'circle(0% at 50% 50%)' },
        visible: {
          clipPath: 'circle(100% at 50% 50%)',
          transition: { delay, duration, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
