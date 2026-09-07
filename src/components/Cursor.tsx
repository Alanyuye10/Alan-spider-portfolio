import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  // A slightly softer spring prevents the cursor from overshooting on high-Hz
  // trackpads while keeping it responsive to quick mouse movement.
  const cursorX = useSpring(useMotionValue(-100), { stiffness: 760, damping: 48, mass: 0.28 })
  const cursorY = useSpring(useMotionValue(-100), { stiffness: 760, damping: 48, mass: 0.28 })
  const glowX = useSpring(useMotionValue(-300), { stiffness: 90, damping: 30, mass: 0.5 })
  const glowY = useSpring(useMotionValue(-300), { stiffness: 90, damping: 30, mass: 0.5 })
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)
  const activeRef = useRef(false)
  const lastActiveCheckRef = useRef(0)
  const lastTargetRef = useRef<EventTarget | null>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ticking = false
    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX - 6); cursorY.set(event.clientY - 6)
      glowX.set(event.clientX - 220); glowY.set(event.clientY - 220)
      lastTargetRef.current = event.target
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false
          const now = performance.now()
          if (now - lastActiveCheckRef.current > 100) {
            lastActiveCheckRef.current = now
            const target = lastTargetRef.current as HTMLElement
            const isActive = Boolean(target?.closest('a, button, input, textarea, [data-cursor]'))
            if (isActive !== activeRef.current) {
              activeRef.current = isActive
              setActive(isActive)
            }
          }
        })
        ticking = true
      }
    }
    const hide = () => { visibleRef.current = false; setVisible(false) }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    return () => { window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('mouseleave', hide) }
  }, [cursorX, cursorY, glowX, glowY])

  return (
    <>
      <motion.div className="cursor-dot" aria-hidden="true" style={{ x: cursorX, y: cursorY, opacity: visible ? 1 : 0, scale: active ? 2.2 : 1 }} />
      <motion.div className="cursor-glow" aria-hidden="true" style={{ x: glowX, y: glowY, opacity: visible ? 1 : 0, scale: active ? 1.5 : 1 }} />
    </>
  )
}
