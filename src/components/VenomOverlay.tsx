import { useEffect, useRef } from 'react'

interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  phase: number
  freq: number
  hue: number
}

export function VenomOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const blobsRef = useRef<Blob[]>([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const timeRef = useRef(0)

  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  useEffect(() => {
    if (isReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const count = isTouch ? 5 : 10
    const blobs: Blob[] = []
    for (let i = 0; i < count; i++) {
      blobs.push({
        x: Math.random() * 100,
        y: Math.random() * 110 - 10,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.08 - 0.02,
        radius: 20 + Math.random() * 50,
        phase: Math.random() * Math.PI * 2,
        freq: 0.3 + Math.random() * 0.7,
        hue: Math.random() * 20 - 10,
      })
    }
    blobsRef.current = blobs

    const handleMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleLeave = () => {
      mouseRef.current = { x: -999, y: -999 }
    }

    window.addEventListener('pointermove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    let resizeTimeout: number
    const resize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        if (!canvas) return
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
        ctx.scale(2, 2)
      }, 100)
    }
    resize()

    const animate = () => {
      if (!canvas || !ctx) { frameRef.current = requestAnimationFrame(animate); return }
      timeRef.current += 0.01
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      blobsRef.current.forEach((blob) => {
        const pulse = 1 + Math.sin(timeRef.current * blob.freq + blob.phase) * 0.15
        const rad = blob.radius * pulse

        blob.x += blob.vx
        blob.y += blob.vy

        if (blob.x > 110) blob.x = -10
        if (blob.x < -10) blob.x = 110
        if (blob.y < -20) { blob.y = h + 10; blob.x = Math.random() * 100 }
        if (blob.y > h + 20) { blob.y = -10; blob.x = Math.random() * 100 }

        const cx = (blob.x / 100) * w
        const cy = (blob.y / 100) * h

        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const dx = cx - mx
        const dy = cy - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        let stretchX = 0
        let stretchY = 0
        if (dist < 250) {
          const force = (1 - dist / 250) * 0.6
          stretchX = dx * force
          stretchY = dy * force
        }

        const grad = ctx.createRadialGradient(
          cx + stretchX, cy + stretchY, 0,
          cx + stretchX, cy + stretchY, rad
        )
        grad.addColorStop(0, `rgba(10, 0, 20, ${0.35 + pulse * 0.08})`)
        grad.addColorStop(0.4, `rgba(26, 0, 48, ${0.2 + pulse * 0.05})`)
        grad.addColorStop(0.7, `rgba(0, 0, 0, ${0.12 + pulse * 0.03})`)
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.arc(cx + stretchX, cy + stretchY, rad, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('pointermove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      clearTimeout(resizeTimeout)
    }
  }, [isReduced, isTouch])

  if (isReduced) return null

  return (
    <>
      <canvas ref={canvasRef} className="venom-overlay" aria-hidden="true" />
      <div className="venom-corner venom-corner--tl" aria-hidden="true" />
      <div className="venom-corner venom-corner--br" aria-hidden="true" />
    </>
  )
}
