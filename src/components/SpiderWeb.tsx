import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface SpiderWebProps {
  color?: string
  opacity?: number
  size?: number
  className?: string
  animated?: boolean
}

export function SpiderWeb({ opacity = 1, size = 1, className, animated = true }: SpiderWebProps) {
  const gradientId = useMemo(() => `web-grad-${Math.random().toString(36).slice(2, 8)}`, [])
  const rings = 6
  const radialLines = 12
  const center = 100
  const maxRadius = 92

  const angles = Array.from({ length: radialLines }, (_, i) => (i * 360) / radialLines)

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      style={{ opacity, transform: `scale(${size})` }}
      animate={animated ? { opacity: [opacity * 0.75, opacity * 1.15, opacity * 0.75] } : undefined}
      transition={animated ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id={`${gradientId}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={center} cy={center} r={maxRadius + 8} fill={`url(#${gradientId}-glow)`} />

        {angles.map(angle => {
          const rad = (angle * Math.PI) / 180
          const x = center + Math.cos(rad) * maxRadius
          const y = center + Math.sin(rad) * maxRadius
          return (
            <line
              key={`rad-${angle}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={`url(#${gradientId})`}
              strokeWidth="0.4"
            />
          )
        })}

        {Array.from({ length: rings }, (_, i) => {
          const r = ((i + 1) / rings) * maxRadius
          const pts = angles.map(a => {
            const rad = (a * Math.PI) / 180
            return `${center + Math.cos(rad) * r},${center + Math.sin(rad) * r}`
          }).join(' ')
          return (
            <polygon
              key={`ring-${i}`}
              points={pts}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={i < 2 ? 0.7 : 0.35}
              opacity={0.6 - i * 0.08}
            />
          )
        })}

        <circle cx={center} cy={center} r="1.8" fill="#ef4444" opacity="0.5" />
      </svg>
    </motion.div>
  )
}
