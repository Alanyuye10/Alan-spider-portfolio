import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '../utils/cn'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className }: TiltCardProps) {
  const rotateX = useSpring(0, { stiffness: 170, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 170, damping: 22 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(239,68,68,.13), rgba(59,130,246,.06), transparent 44%)`

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateX.set((0.5 - py) * 5)
    rotateY.set((px - 0.5) * 5)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  const reset = () => { rotateX.set(0); rotateY.set(0); glowX.set(50); glowY.set(50) }

  return (
    <motion.div
      className={cn('tilt-card', className)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, backgroundImage: glow, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}
