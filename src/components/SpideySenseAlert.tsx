import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AlertItem {
  id: number
  x: number
  y: number
  text: string
}

const SPIDEY_TEXTS = [
  '⚡ SPIDEY SENSE TICKLING! ⚡',
  '🕸️ WEB-SHOOTER READY! 🕸️',
  '⚡ GREAT POWER & RESPONSIBILITY! ⚡',
  '🕸️ THWIP! THWIP! 🕸️',
  '⚡ DANGER SENSE ACTIVATED! ⚡',
]

export function SpideySenseAlert() {
  const [alert, setAlert] = useState<AlertItem | null>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer: NodeJS.Timeout

    const handleOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('.button--primary, .project-card, .nav-cta, [data-spidey]') as HTMLElement | null

      if (target) {
        const rect = target.getBoundingClientRect()
        const randomText = SPIDEY_TEXTS[Math.floor(Math.random() * SPIDEY_TEXTS.length)]
        const newAlert = {
          id: Date.now(),
          x: rect.left + rect.width / 2,
          y: rect.top - 18,
          text: randomText,
        }
        setAlert(newAlert)
        clearTimeout(timer)
        timer = setTimeout(() => setAlert(null), 1400)
      }
    }

    document.addEventListener('mouseover', handleOver, { passive: true })
    return () => {
      document.removeEventListener('mouseover', handleOver)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {alert && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }} aria-hidden="true">
          <motion.div
            key={alert.id}
            style={{
              position: 'absolute',
              left: alert.x,
              top: alert.y,
              transform: 'translate(-50%, -100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Spider-Sense Electric Radiating Waves */}
            <svg width="120" height="40" viewBox="0 0 120 40" style={{ overflow: 'visible' }}>
              <motion.path
                d="M 10 30 Q 60 -10 110 30"
                stroke="#ff3447"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <motion.path
                d="M 25 35 Q 60 5 95 35"
                stroke="#ffcc00"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 0.5, delay: 0.1, repeat: Infinity }}
              />
            </svg>
            <span
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                color: '#fff',
                background: 'linear-gradient(135deg, #e11d2e, #0a1f44)',
                padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 0 18px rgba(225, 29, 46, 0.75), 0 0 35px rgba(225, 29, 46, 0.4)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {alert.text}
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
