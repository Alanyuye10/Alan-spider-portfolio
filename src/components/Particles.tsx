import { useCallback, useEffect, useRef } from 'react'
import { cn } from '../utils/cn'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  life: number
  maxLife: number
}

interface ParticlesProps {
  count?: number
  color?: string
  speed?: number
  className?: string
}

export function Particles({ count = 50, color = 'rgba(96, 165, 250, 0.6)', speed = 0.2, className }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const init = useCallback(() => {
    const adjustedCount = isTouch ? Math.floor(count / 3) : count
    const particles: Particle[] = []
    for (let i = 0; i < adjustedCount; i++) {
      particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.6 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      })
    }
    particlesRef.current = particles
  }, [count, speed, isTouch])

  useEffect(() => {
    if (isReduced) return
    init()

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      canvas.style.width = canvas.offsetWidth + 'px'
      canvas.style.height = canvas.offsetHeight + 'px'
      ctx.scale(2, 2)
    }

    resize()
    window.addEventListener('resize', resize)

    let paused = false
    let skip = 0
    const animate = () => {
      if (paused) { frameRef.current = requestAnimationFrame(animate); return }
      skip = (skip + 1) % 2
      if (skip !== 0) { frameRef.current = requestAnimationFrame(animate); return }

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      particlesRef.current.forEach((p) => {
        p.x += p.speedX * 0.3
        p.y += p.speedY * 0.3
        p.life++

        if (p.x > 100) p.x = 0
        if (p.x < 0) p.x = 100
        if (p.y > 100) p.y = 0
        if (p.y < 0) p.y = 100

        if (p.life > p.maxLife) {
          p.life = 0
          p.maxLife = Math.random() * 300 + 200
        }

        const lifeOpacity = p.life < 40 ? p.life / 40 : p.life > p.maxLife - 40 ? (p.maxLife - p.life) / 40 : 1

        ctx.beginPath()
        ctx.arc((p.x / 100) * w, (p.y / 100) * h, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.opacity * lifeOpacity
        ctx.fill()
      })
      ctx.globalAlpha = 1

      frameRef.current = requestAnimationFrame(animate)
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      paused = !entry.isIntersecting
    }, { threshold: 0 })
    observerRef.current.observe(canvas)

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      observerRef.current?.disconnect()
    }
  }, [init, color, isReduced])

  if (isReduced) return null

  return <canvas ref={canvasRef} className={cn('particles', className)} aria-hidden="true" />
}
