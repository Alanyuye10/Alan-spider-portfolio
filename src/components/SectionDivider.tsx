import { motion } from 'framer-motion'
import { useMemo } from 'react'

const paths = [
  'M0,40 C60,10 140,70 200,40 C260,10 340,70 400,40 C460,10 540,70 600,40 C660,10 740,70 800,40 L800,80 L0,80 Z',
  'M0,50 C80,20 120,80 200,50 C280,20 320,80 400,50 C480,20 520,80 600,50 C680,20 720,80 800,50 L800,80 L0,80 Z',
  'M0,60 Q100,10 200,60 T400,60 T600,60 T800,60 L800,80 L0,80 Z',
]

export function SectionDivider() {
  const gradientId = useMemo(() => `divider-grad-${Math.random().toString(36).slice(2, 8)}`, [])
  const webGradId = useMemo(() => `web-strand-${Math.random().toString(36).slice(2, 8)}`, [])

  return (
    <motion.div
      className="section-divider"
      aria-hidden="true"
      animate={{ scaleY: [1, 0.65, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: 'center' }}
    >
      <svg viewBox="0 0 800 80" preserveAspectRatio="none" width="100%" height="100%">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(225,29,46,.15)" />
            <stop offset="50%" stopColor="rgba(184,195,211,.08)" />
            <stop offset="100%" stopColor="rgba(10,31,68,.16)" />
          </linearGradient>
          <linearGradient id={webGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(225,29,46,.34)" />
            <stop offset="50%" stopColor="rgba(184,195,211,.24)" />
            <stop offset="100%" stopColor="rgba(10,31,68,.28)" />
          </linearGradient>
        </defs>
        {paths.map((d, index) => (
          <path key={index} d={d} fill={`url(#${gradientId})`} style={{ opacity: 0.6 - index * 0.15 }} />
        ))}
        <line x1="0" y1="18" x2="800" y2="18" stroke={`url(#${webGradId})`} strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="92" x2="800" y2="92" stroke={`url(#${webGradId})`} strokeWidth="0.3" opacity="0.2" />
      </svg>
    </motion.div>
  )
}
