import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Ripple { id: number; x: number; y: number }

export function CursorTrail() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const idRef = useRef(0)
  const trailRef = useRef<HTMLDivElement>(null)
  const posRef = useRef([{ x: -100, y: -100 }, { x: -100, y: -100 }, { x: -100, y: -100 }])
  const rafRef = useRef<number>(0)
  const skipRef = useRef(0)
  const isReduced = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (isReduced) return

    const move = (event: PointerEvent) => { posRef.current[0] = { x: event.clientX, y: event.clientY } }
    const handleDown = (event: PointerEvent) => {
      const id = idRef.current++
      setRipples((prev) => [...prev, { id, x: event.clientX, y: event.clientY }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700)
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      skipRef.current++
      const dots = trailRef.current?.querySelectorAll('.cursor-trail__dot')
      if (!dots) { rafRef.current = requestAnimationFrame(animate); return }

      for (let i = 1; i < 3; i++) {
        const prev = posRef.current[i - 1]
        const curr = posRef.current[i]
        curr.x = lerp(curr.x, prev.x, 0.18)
        curr.y = lerp(curr.y, prev.y, 0.18)
        const dot = dots[i - 1] as HTMLElement
        if (dot) dot.style.transform = `translate(${curr.x - 4}px, ${curr.y - 4}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', handleDown)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', handleDown)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isReduced])

  if (isReduced) return null

  return (
    <div ref={trailRef} className="cursor-trail" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="cursor-trail__dot" style={{ width: 8 - i * 2.5, height: 8 - i * 2.5, opacity: 0.4 - i * 0.13, background: `rgba(96,165,250,${0.5 - i * 0.14})`, willChange: 'transform' }} />
      ))}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="cursor-ripple"
            initial={{ left: ripple.x - 8, top: ripple.y - 8, width: 16, height: 16, opacity: 0.5 }}
            animate={{ width: 60, height: 60, left: ripple.x - 30, top: ripple.y - 30, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
