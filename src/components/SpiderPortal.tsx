import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

export function SpiderPortal() {
  const [active, setActive] = useState(false)
  const lastScrollRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const { scrollY } = useScroll()
  const smoothScroll = useSpring(scrollY, { stiffness: 60, damping: 25 })
  const opacity = useTransform(smoothScroll, [0, 500, 2000, 3000], [0.25, 0.35, 0.2, 0])
  const scale = useTransform(smoothScroll, [0, 500], [0.8, 1])
  const gradientId = useMemo(() => `portal-${Math.random().toString(36).slice(2, 8)}`, [])

  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (isReduced) return

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollRef.current)
      if (delta > 300) {
        setActive(true)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setActive(false), 2000)
      }
      lastScrollRef.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timerRef.current)
    }
  }, [isReduced])

  if (isReduced) return null

  return (
    <>
      <motion.div
        className={`spider-portal ${active ? 'active' : ''}`}
        style={{ opacity, scale }}
        aria-hidden="true"
      >
        <svg width="500" height="500" viewBox="0 0 500 500">
          <defs>
            <filter id={`${gradientId}-glitch`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.03"
                numOctaves="3"
                result="noise"
                seed={Math.floor(Math.random() * 100)}
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.03;0.06;0.02;0.04;0.03"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={active ? 15 : 5} xChannelSelector="R" yChannelSelector="G">
                <animate
                  attributeName="scale"
                  values={active ? '15;25;10;20;15' : '5;8;3;6;5'}
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </feDisplacementMap>
            </filter>
            <radialGradient id={`${gradientId}-core`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#05d9e8" stopOpacity="0.6" />
              <stop offset="25%" stopColor="#ff2a6d" stopOpacity="0.4" />
              <stop offset="55%" stopColor="#8a2be2" stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${gradientId}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff2a6d" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#05d9e8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          <circle cx="250" cy="250" r="200" fill={`url(#${gradientId}-core)`} filter={`url(#${gradientId}-glitch)`} />

          <motion.g
            animate={
              active
                ? { rotate: [0, 360], scale: [1, 1.08, 0.95, 1.05, 1] }
                : { rotate: 0, scale: 1 }
            }
            transition={
              active
                ? { rotate: { duration: 3, ease: 'linear', repeat: Infinity }, scale: { duration: 1.5, ease: 'easeInOut' } }
                : { duration: 0.5 }
            }
            style={{ transformOrigin: '250px 250px' }}
          >
            <path
              d="M 250 50 C 300 50 350 80 380 120 C 410 160 430 210 430 250 C 430 290 410 340 380 380 C 350 420 300 450 250 450 C 200 450 150 420 120 380 C 90 340 70 290 70 250 C 70 210 90 160 120 120 C 150 80 200 50 250 50 Z"
              fill="none"
              stroke={`url(#${gradientId}-edge)`}
              strokeWidth="3"
              opacity="0.6"
            />
            <path
              d="M 250 80 C 290 80 325 105 348 135 C 371 165 385 205 385 250 C 385 295 371 335 348 365 C 325 395 290 420 250 420 C 210 420 175 395 152 365 C 129 335 115 295 115 250 C 115 205 129 165 152 135 C 175 105 210 80 250 80 Z"
              fill="none"
              stroke={`url(#${gradientId}-edge)`}
              strokeWidth="1.5"
              opacity="0.4"
            />
          </motion.g>

          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 360) / 8
            const rad = (angle * Math.PI) / 180
            const r = 195
            const x = 250 + Math.cos(rad) * r
            const y = 250 + Math.sin(rad) * r
            return (
              <motion.line
                key={i}
                x1="250"
                y1="250"
                x2={x}
                y2={y}
                stroke={`url(#${gradientId}-edge)`}
                strokeWidth="0.8"
                opacity="0.3"
                animate={
                  active
                    ? { opacity: [0.3, 0.7, 0.2, 0.5, 0.3] }
                    : { opacity: 0.3 }
                }
                transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
              />
            )
          })}

          {Array.from({ length: 3 }, (_, i) => (
            <motion.circle
              key={`orbit-${i}`}
              cx="250"
              cy="250"
              r={80 + i * 50}
              fill="none"
              stroke={`url(#${gradientId}-edge)`}
              strokeWidth="0.6"
              opacity="0.2"
              animate={
                active
                  ? { rotate: [0, 360], pathLength: [0.3, 0.8, 0.3] }
                  : {}
              }
              transition={{
                rotate: {
                  duration: 8 + i * 3,
                  ease: 'linear',
                  repeat: Infinity,
                },
                pathLength: {
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                },
              }}
              style={{ transformOrigin: '250px 250px' }}
              strokeDasharray={`${80 + i * 20} ${360 - (80 + i * 20)}`}
            />
          ))}
        </svg>
      </motion.div>
      <div className="spider-portal__scanlines" aria-hidden="true" />
    </>
  )
}
