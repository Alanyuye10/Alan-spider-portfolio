import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface WebLine {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
}

export function WebTether() {
  const [tethers, setTethers] = useState<WebLine[]>([])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let currentTarget: HTMLElement | null = null

    const handleMove = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('a, button, .project-card, .skill-item, [data-web-tether]') as HTMLElement | null

      if (target && target !== currentTarget) {
        currentTarget = target
        const rect = target.getBoundingClientRect()
        const targetX = rect.left + rect.width / 2
        const targetY = rect.top + rect.height / 2

        setTethers([
          {
            id: `tether-${Date.now()}`,
            x1: event.clientX,
            y1: event.clientY,
            x2: targetX,
            y2: targetY,
          },
        ])
      } else if (!target && currentTarget) {
        currentTarget = null
        setTethers([])
      }
    }

    const handleLeave = () => {
      currentTarget = null
      setTethers([])
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  if (tethers.length === 0) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9997, pointerEvents: 'none' }} aria-hidden="true">
      <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="tether-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e11d2e" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0a1f44" stopOpacity="0.7" />
          </linearGradient>
          <filter id="tether-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {tethers.map((line) => {
          const midX = (line.x1 + line.x2) / 2
          const midY = (line.y1 + line.y2) / 2 - 18
          return (
            <g key={line.id}>
              {/* Elastic curved web strand */}
              <motion.path
                d={`M ${line.x1} ${line.y1} Q ${midX} ${midY} ${line.x2} ${line.y2}`}
                stroke="url(#tether-grad)"
                strokeWidth="2"
                strokeDasharray="4 2"
                fill="none"
                filter="url(#tether-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              />
              {/* Secondary web glow strand */}
              <motion.path
                d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
                stroke="rgba(225, 29, 46, 0.45)"
                strokeWidth="1"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
              />
              {/* Web attachment impact point */}
              <motion.circle
                cx={line.x2}
                cy={line.y2}
                r="4.5"
                fill="#e11d2e"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.8, 1] }}
                transition={{ duration: 0.3 }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
