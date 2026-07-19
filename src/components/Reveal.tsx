import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { easePremium } from '../constants/spring'
import { cn } from '../utils/cn'

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
}

export function Reveal({ children, delay = 0, className, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.84, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: easePremium }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
