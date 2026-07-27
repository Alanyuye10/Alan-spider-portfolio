import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

export function VenomFace() {
  const [show, setShow] = useState(false)
  const [droplets, setDroplets] = useState<{ id: number; x: number; y: number }[]>([])
  const clicksRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const idRef = useRef(0)

  const trigger = useCallback(() => {
    setShow(true)
    const drops = Array.from({ length: 16 }, (_, i) => ({
      id: idRef.current++,
      x: 40 + Math.random() * 20,
      y: 40 + Math.random() * 20,
    }))
    setDroplets(drops)
    setTimeout(() => {
      setDroplets([])
      setShow(false)
    }, 1600)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.spider-crawler')) return
      clicksRef.current++
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => { clicksRef.current = 0 }, 2000)
      if (clicksRef.current >= 3) {
        clicksRef.current = 0
        trigger()
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      clearTimeout(timerRef.current)
    }
  }, [trigger])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="venom-face"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 400 300" width="400" height="300">
            <defs>
              <radialGradient id="venom-glow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#1a0030" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#000" stopOpacity="1" />
              </radialGradient>
              <linearGradient id="venom-grin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ccc" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            <rect width="400" height="300" rx="40" fill="url(#venom-glow)" />

            <motion.g
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <path d="M 60 140 Q 80 80 140 90 Q 180 95 200 130" fill="none" stroke="url(#venom-grin)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 200 130 Q 220 95 260 90 Q 320 80 340 140" fill="none" stroke="url(#venom-grin)" strokeWidth="4" strokeLinecap="round" />

              <motion.path
                d="M 80 170 Q 100 160 120 170 Q 130 200 100 210 Q 70 230 50 200 Z"
                fill="#fff"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                style={{ transformOrigin: '100px 190px' }}
              />
              <motion.path
                d="M 280 170 Q 300 160 320 170 Q 330 200 300 210 Q 270 230 250 200 Z"
                fill="#fff"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                style={{ transformOrigin: '300px 190px' }}
              />

              <motion.path
                d="M 140 210 Q 160 195 180 215 L 200 230 L 220 215 Q 240 195 260 210 Q 230 250 200 260 Q 170 250 140 210 Z"
                fill="#fff"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35, ease: 'easeOut' }}
              />

              <motion.path
                d="M 150 218 L 160 205 L 170 220 M 230 220 L 240 205 L 250 218"
                fill="none"
                stroke="#000"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.2 }}
              />
            </motion.g>
          </svg>

          {droplets.map((d) => (
            <motion.span
              key={d.id}
              className="venom-droplet"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: 60 + Math.random() * 40, scale: 0.3 }}
              transition={{ duration: 1.2, delay: Math.random() * 0.4, ease: 'easeIn' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
