import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function stopLenis() { lenisInstance?.stop() }
export function startLenis() { lenisInstance?.start() }

export function useLenis() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.1,
      easing: (t: number) => {
        const c4 = (2 * Math.PI) / 3
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, -10 * t) * Math.cos((t * 10 - 0.75) * c4) + 1
      },
      smoothWheel: true,
      wheelMultiplier: isTouch ? 0.5 : 0.9,
      touchMultiplier: isTouch ? 0.7 : 1.0,
      syncTouch: true,
      syncTouchLerp: isTouch ? 0.08 : 0.1,
      lerp: isTouch ? 0.08 : 0.06,
      gestureOrientation: 'vertical',
    })

    lenisInstance = lenis

    let frame = 0
    let lastTime = 0
    const raf = (time: number) => {
      if (document.hidden && lastTime !== 0) {
        frame = requestAnimationFrame(raf)
        lastTime = time
        return
      }
      lastTime = time
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      lenisInstance = null
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}

