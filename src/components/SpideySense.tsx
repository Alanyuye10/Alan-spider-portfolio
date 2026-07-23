import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'

interface Ring {
  id: number
  x: number
  y: number
}

export function SpideySense() {
  const [rings, setRings] = useState<Ring[]>([])
  const idRef = { current: 0 }
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMove = (event: globalThis.MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    const handleOver = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('a, button, [data-spidey]')) return
      const nextId = ++idRef.current
      setRings((prev) => [...prev.slice(-2), { id: nextId, x: event.clientX, y: event.clientY }])
      setTimeout(() => setRings((prev) => prev.filter((r) => r.id !== nextId)), 1000)
    }

    document.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
    }
  }, [])

  return (
    <>
      <motion.div
        className="spidey-aura"
        aria-hidden="true"
        style={{
          x: smoothX, y: smoothY,
          position: 'fixed', top: -120, left: -120, width: 240, height: 240,
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          background: 'radial-gradient(circle, rgba(225,29,46,0.1) 0%, rgba(10,31,68,0.08) 42%, transparent 72%)',
        }}
      />
      <div style={{ position: 'fixed', inset: 0, zIndex: 9997, pointerEvents: 'none' }} aria-hidden="true">
        {rings.map((ring) => (
          <motion.div
            key={ring.id}
            style={{
              position: 'absolute', left: ring.x - 20, top: ring.y - 20, width: 40, height: 40,
              borderRadius: '50%', border: '1.5px solid rgba(225,29,46,0.62)',
              boxShadow: '0 0 14px rgba(225,29,46,0.38), inset 0 0 14px rgba(10,31,68,0.28)',
            }}
            initial={{ opacity: 0.8, scale: 0.3 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        ))}
      </div>
    </>
  )
}
