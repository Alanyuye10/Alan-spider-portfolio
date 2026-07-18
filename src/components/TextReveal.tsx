import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  type?: 'char' | 'word'
  delay?: number
  stagger?: number
  className?: string
  once?: boolean
}

export function TextReveal({ children, as: Tag = 'span', type = 'word', delay = 0, stagger = 0.03, className, once = true }: TextRevealProps) {
  const units = type === 'char' ? children.split('') : children.split(' ')
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag className={cn('text-reveal', className)} aria-label={children}>
      {units.map((unit, index) => {
        const isSpace = unit === ' '
        return (
          <span key={`${unit}-${index}`} className="text-reveal__unit" style={{ display: isSpace ? 'inline-block' : 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <motion.span
              className="text-reveal__inner"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once, amount: 0.3 }}
              transition={{ duration: 0.6, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block', whiteSpace: isSpace ? 'pre' : 'normal' }}
            >
              {isSpace ? '\u00A0' : unit}
            </motion.span>
          </span>
        )
      })}
    </MotionTag>
  )
}
