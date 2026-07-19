import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

export function SpiderRappel() {
  const [vh, setVh] = useState(700)
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 25 })
  const y = useTransform(smooth, [0, 1], [-50, vh * 0.8])
  const opacity = useTransform(smooth, [0, 0.03, 0.92, 1], [0, 1, 1, 0])
  const gradientId = useMemo(() => `rappel-${Math.random().toString(36).slice(2, 8)}`, [])

  useEffect(() => {
    setVh(window.innerHeight)
    const handle = () => setVh(window.innerHeight)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  return (
    <motion.div
      className="spider-rappel"
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: '50%', zIndex: 9998, pointerEvents: 'none', opacity, x: '-50%', y }}
    >
      <svg width="28" height="50" viewBox="0 0 28 50" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        <line x1="14" y1="0" x2="14" y2="24" stroke="rgba(190,18,60,0.25)" strokeWidth="1" strokeDasharray="2 3" />
        <ellipse cx="14" cy="38" rx="5" ry="6" fill={`url(#${gradientId})`} opacity="0.7" />
        <circle cx="14" cy="32" r="3.5" fill={`url(#${gradientId})`} />
        <circle cx="14" cy="32" r="1.5" fill="#fff" opacity="0.6" />
        <path d="M9 35 L5 31 L5 33 Z" fill={`url(#${gradientId})`} opacity="0.5" />
        <path d="M19 35 L23 31 L23 33 Z" fill={`url(#${gradientId})`} opacity="0.5" />
        <path d="M9 40 L4 39 L5 41 Z" fill={`url(#${gradientId})`} opacity="0.5" />
        <path d="M19 40 L24 39 L23 41 Z" fill={`url(#${gradientId})`} opacity="0.5" />
        <path d="M10 44 L6 47 L8 48 Z" fill={`url(#${gradientId})`} opacity="0.5" />
        <path d="M18 44 L22 47 L20 48 Z" fill={`url(#${gradientId})`} opacity="0.5" />
      </svg>
    </motion.div>
  )
}
