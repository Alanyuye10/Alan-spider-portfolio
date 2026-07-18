import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Cursor() {
  const cursorX = useSpring(useMotionValue(-100), { stiffness: 700, damping: 48 })
  const cursorY = useSpring(useMotionValue(-100), { stiffness: 700, damping: 48 })
  const glowX = useSpring(useMotionValue(-300), { stiffness: 75, damping: 28 })
  const glowY = useSpring(useMotionValue(-300), { stiffness: 75, damping: 28 })
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX - 6); cursorY.set(event.clientY - 6)
      glowX.set(event.clientX - 220); glowY.set(event.clientY - 220)
      setVisible(true)
      const target = event.target as HTMLElement
      setActive(Boolean(target.closest('a, button, input, textarea, [data-cursor]')))
    }
    const hide = () => setVisible(false)
    window.addEventListener('pointermove', move)
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
