import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '../utils/cn'

interface InteractiveGlowProps {
  children: ReactNode
  className?: string
}

export function InteractiveGlow({ children, className }: InteractiveGlowProps) {
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22 })

  const glow = useMotionTemplate`radial-gradient(circle at ${springX}% ${springY}%, rgba(96,165,250,.14), rgba(139,92,246,.07) 40%, transparent 60%)`
  const borderGlow = useMotionTemplate`radial-gradient(circle at ${springX}% ${springY}%, rgba(96,165,250,.35), rgba(139,92,246,.2) 40%, transparent 60%)`

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  const handleLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      className={cn('interactive-glow', className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ backgroundImage: glow }}
    >
      <div className="interactive-glow__border" style={{ backgroundImage: borderGlow }} />
      {children}
    </motion.div>
  )
}
