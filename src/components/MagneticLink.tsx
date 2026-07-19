import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { cn } from '../utils/cn'

interface MagneticLinkProps {
  href: string
  children: ReactNode
  className?: string
  download?: boolean | string
  target?: string
  onClick?: () => void
  ariaLabel?: string
}

export function MagneticLink({ href, children, className, download, target, onClick, ariaLabel }: MagneticLinkProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const rectRef = useRef<DOMRect | null>(null)

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!rectRef.current) {
      rectRef.current = event.currentTarget.getBoundingClientRect()
    }
    const rect = rectRef.current
    x.set((event.clientX - rect.left - rect.width / 2) * 0.16)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16)
  }

  const reset = () => { x.set(0); y.set(0); rectRef.current = null }

  return (
    <motion.a
      href={href}
      style={{ x, y }}
      className={cn('magnetic-link', className)}
      download={download}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.a>
  )
}
