import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Burst {
  id: number
  x: number
  y: number
  word: string
  color: string
}

const WORDS = ['THWIP!', 'BAM!', 'POW!', 'KRAK!', 'ZAP!', 'WHAM!', 'FWIP!', 'SNAP!']
const COLORS = ['#e11d2e', '#b8c3d3', '#fff', '#ff5a69', '#5f8fd8']

const lineCount = 10

export function ComicBurst() {
  const [bursts, setBursts] = useState<Burst[]>([])
  const idRef = useRef(0)

  const handleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.closest('a, button, input, textarea, [data-cursor]')) return
    const nextId = ++idRef.current
    const word = WORDS[Math.floor(Math.random() * WORDS.length)]
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    setBursts((prev) => [...prev.slice(-3), { id: nextId, x: event.clientX, y: event.clientY, word, color }])
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== nextId)), 800)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10001, pointerEvents: 'none' }} aria-hidden="true">
      {bursts.map((burst) => (
        <BurstView key={burst.id} {...burst} />
      ))}
    </div>
  )
}

function BurstView({ x, y, word, color }: Burst) {
  const size = 80
  const cx = x - size / 2
  const cy = y - size / 2
  const gradientId = `comic-${x}-${y}`

  return (
    <motion.div
      style={{
        position: 'absolute', left: cx, top: cy, width: size, height: size,
        display: 'grid', placeItems: 'center',
      }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: [1, 1, 0], scale: [0.3, 1.4, 1.8] }}
      transition={{ duration: 0.7, ease: 'easeOut', times: [0, 0.4, 1] }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e11d2e" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#b8c3d3" stopOpacity="0.38" />
          </linearGradient>
        </defs>
        {Array.from({ length: lineCount }, (_, i) => {
          const angle = (i * 360) / lineCount
          const rad = (angle * Math.PI) / 180
          const x2 = size / 2 + Math.cos(rad) * (size / 2 - 3)
          const y2 = size / 2 + Math.sin(rad) * (size / 2 - 3)
          return (
            <line key={i} x1={size / 2} y1={size / 2} x2={x2} y2={y2}
              stroke={`url(#${gradientId})`} strokeWidth={0.5 + (i % 2 === 0 ? 0.5 : 0)} opacity={0.5} />
          )
        })}
      </svg>
      <motion.span
        style={{
          fontFamily: '"DM Mono", monospace', fontWeight: 800, fontSize: 'clamp(0.7rem, 2.2vw, 1.1rem)',
          color, textShadow: '0 0 12px currentColor, 0 2px 8px rgba(0,0,0,0.6)',
          letterSpacing: '0.02em', lineHeight: 1, userSelect: 'none',
        }}
        initial={{ rotate: -15 }}
        animate={{ rotate: [0, 8, -4, 0] }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {word}
      </motion.span>
    </motion.div>
  )
}
