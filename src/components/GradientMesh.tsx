import { useEffect, useRef } from 'react'

interface GradientMeshProps {
  colors?: string[]
  speed?: number
}

export function GradientMesh({ colors = ['#e11d2e', '#0a1f44', '#b8c3d3', '#02050b'], speed = 0.12 }: GradientMeshProps) {
  const blobsRef = useRef<HTMLDivElement[]>([])
  const frameRef = useRef<number>(0)
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (isReduced) return
    const positions = blobsRef.current.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    }))

    const animate = () => {
      if (document.hidden) { frameRef.current = requestAnimationFrame(animate); return }

      blobsRef.current.forEach((blob, i) => {
        if (!blob) return
        const p = positions[i]
        if (!p) return
        p.x += p.vx * 0.12
        p.y += p.vy * 0.12
        if (p.x > 110) p.x = -10
        if (p.x < -10) p.x = 110
        if (p.y > 110) p.y = -10
        if (p.y < -10) p.y = 110
        blob.style.transform = `translate3d(${p.x}%, ${p.y}%, 0)`
      })
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [isReduced, speed])

  if (isReduced) return null

  return (
    <div className="gradient-mesh" aria-hidden="true">
      {colors.map((color, index) => (
        <div
          key={index}
          ref={(el) => { if (el) blobsRef.current[index] = el }}
          className="gradient-mesh__blob"
          style={{
            width: `${200 + index * 80}px`,
            height: `${200 + index * 80}px`,
            background: color,
            opacity: 0.08 + index * 0.02,
          }}
        />
      ))}
    </div>
  )
}
