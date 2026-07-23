import { motion, useAnimation } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export function SpiderCrawler() {
  const controls = useAnimation()
  const gradientId = useMemo(() => `crawler-grad-${Math.random().toString(36).slice(2, 8)}`, [])
  const widthRef = useRef(window.innerWidth)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showComic, setShowComic] = useState(false)

  const run = useCallback(async () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = widthRef.current - 40
    await controls.start({ x: [0, target], transition: { duration: 0, ease: 'linear' } })
    await controls.start({ x: [0, target], transition: { duration: 18, ease: 'linear', repeat: Infinity, repeatDelay: 4 } })
  }, [controls])

  useEffect(() => {
    run()
    const update = () => {
      widthRef.current = window.innerWidth
      controls.stop()
      run()
    }
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [run])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFlipping) return
    setIsFlipping(true)
    setShowComic(true)
    setTimeout(() => setShowComic(false), 900)
    setTimeout(() => setIsFlipping(false), 600)
  }

  return (
    <motion.div
      className="spider-crawler"
      aria-hidden="true"
      animate={controls}
      onClick={handleClick}
      style={{ position: 'fixed', bottom: 8, left: -40, zIndex: 9999, pointerEvents: 'auto', cursor: 'pointer' }}
    >
      <motion.div
        animate={isFlipping ? { rotate: 360, y: [-4, -30, 0], scale: [1, 1.35, 1] } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'relative' }}
      >
        {showComic && (
          <motion.span
            initial={{ opacity: 0, scale: 0.4, y: 0 }}
            animate={{ opacity: 1, scale: 1.3, y: -28 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: -15,
              left: 0,
              fontFamily: '"DM Mono", monospace',
              fontWeight: 800,
              fontSize: '11px',
              color: '#e11d2e',
              background: '#fff',
              padding: '2px 6px',
              borderRadius: '6px',
              boxShadow: '0 0 10px rgba(225, 29, 46, 0.8)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            THWIP! 🕸️
          </motion.span>
        )}
        <svg width="32" height="28" viewBox="0 0 28 24" fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e11d2e" />
              <stop offset="100%" stopColor="#0a1f44" />
            </linearGradient>
          </defs>
          <ellipse cx="14" cy="13" rx="5" ry="6" fill={`url(#${gradientId})`} opacity="0.85" />
          <circle cx="14" cy="7" r="3.5" fill={`url(#${gradientId})`} />
          <circle cx="14" cy="7" r="1.5" fill="#fff" opacity="0.8" />
          <path d="M9 6 L5 2 L5 4 Z" fill={`url(#${gradientId})`} opacity="0.7" />
          <path d="M19 6 L23 2 L23 4 Z" fill={`url(#${gradientId})`} opacity="0.7" />
          <path d="M8 10 L3 9 L4 11 Z" fill={`url(#${gradientId})`} opacity="0.7" />
          <path d="M20 10 L25 9 L24 11 Z" fill={`url(#${gradientId})`} opacity="0.7" />
          <path d="M8 15 L3 16 L4 18 Z" fill={`url(#${gradientId})`} opacity="0.7" />
          <path d="M20 15 L25 16 L24 18 Z" fill={`url(#${gradientId})`} opacity="0.7" />
          <path d="M9 19 L6 22 L8 23 Z" fill={`url(#${gradientId})`} opacity="0.7" />
          <path d="M19 19 L22 22 L20 23 Z" fill={`url(#${gradientId})`} opacity="0.7" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
