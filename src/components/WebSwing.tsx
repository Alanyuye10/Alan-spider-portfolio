import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function WebSwing() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = Math.abs(window.scrollY - lastY)
          if (delta > 120) {
            setShow(true)
            clearTimeout((handleScroll as any)._timer)
            ;(handleScroll as any)._timer = setTimeout(() => setShow(false), 1200)
          }
          lastY = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.svg
        className="web-swing"
        aria-hidden="true"
        width="300"
        height="200"
        viewBox="0 0 300 200"
        fill="none"
        style={{
          position: 'fixed', bottom: 40, right: -40, zIndex: 9996,
          pointerEvents: 'none', opacity: show ? 1 : 0,
          transition: 'opacity 0.4s ease',
          overflow: 'visible',
        }}
        initial={{ x: 100 }}
        animate={show ? { x: 0 } : { x: 100 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <defs>
          <linearGradient id="swing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#be123c" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0.1" />
          </linearGradient>
          <filter id="swing-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <motion.path
          d="M290 190 C250 140 180 30 80 60 C30 75 10 110 10 110"
          stroke="url(#swing-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#swing-glow)"
          initial={{ pathLength: 0, opacity: 0.8 }}
          animate={show ? { pathLength: 1, opacity: [0.8, 0.3, 0] } : { pathLength: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.path
          d="M290 190 C260 150 200 50 110 70"
          stroke="url(#swing-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={show ? { pathLength: 1, opacity: [0.5, 0.2, 0] } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        />
      </motion.svg>
      <motion.div
        className="web-swing-dust"
        aria-hidden="true"
        style={{
          position: 'fixed', bottom: 36, right: 220, zIndex: 9995,
          pointerEvents: 'none', opacity: show ? 0.4 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', width: 2 + Math.random() * 3, height: 2 + Math.random() * 3,
              borderRadius: '50%', background: '#be123c',
              boxShadow: '0 0 4px rgba(190,18,60,0.4)',
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={show ? { x: -20 - Math.random() * 40, y: -10 - Math.random() * 30, opacity: 0 } : { x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
          />
        ))}
      </motion.div>
    </>
  )
}
