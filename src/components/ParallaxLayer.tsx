import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '../utils/cn'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxLayer({ children, speed = -0.3, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, speed * 200]), { stiffness: 120, damping: 20 })

  return (
    <motion.div ref={ref} style={{ y }} className={cn('parallax-layer', className)}>
      {children}
    </motion.div>
  )
}
