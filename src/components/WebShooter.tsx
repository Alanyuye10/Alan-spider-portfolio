import { motion, useMotionValue } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Burst {
  id: number
  x: number
  y: number
}

const lines = 8

export function WebShooter() {
  const [bursts, setBursts] = useState<Burst[]>([])
  const idRef = useRef(0)

  const handleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.closest('a, button, input, textarea, [data-cursor]')) return
    const nextId = ++idRef.current
    setBursts((prev) => [...prev.slice(-4), { id: nextId, x: event.clientX, y: event.clientY }])
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== nextId)), 700)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10001, pointerEvents: 'none' }} aria-hidden="true">
      {bursts.map((burst) => (
        <BurstView key={burst.id} x={burst.x} y={burst.y} />
      ))}
    </div>
  )
}

function BurstView({ x, y }: { x: number; y: number }) {
  const size = 50
  const cx = x - size / 2
  const cy = y - size / 2

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute', left: cx, top: cy, overflow: 'visible' }}
      initial={{ opacity: 1, scale: 0.3 }}
      animate={{ opacity: 0, scale: 1.8 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id={`burst-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e11d2e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#b8c3d3" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={1.5} fill="#e11d2e" opacity="0.85" />
      {Array.from({ length: lines }, (_, i) => {
        const angle = (i * 360) / lines
        const rad = (angle * Math.PI) / 180
        const x2 = size / 2 + Math.cos(rad) * (size / 2 - 2)
        const y2 = size / 2 + Math.sin(rad) * (size / 2 - 2)
        return (
          <line
            key={i}
            x1={size / 2}
            y1={size / 2}
            x2={x2}
            y2={y2}
            stroke={`url(#burst-${x}-${y})`}
            strokeWidth={0.4 + (i % 3 === 0 ? 0.4 : 0)}
            opacity={0.6}
          />
        )
      })}
    </motion.svg>
  )
}
