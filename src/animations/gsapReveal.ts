import { useEffect, type RefObject } from 'react'

export function useGsapReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!scope.current) return
    const elements = scope.current.querySelectorAll<HTMLElement>('[data-gsap-reveal]')
    const observers: IntersectionObserver[] = []

    elements.forEach((el) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'scale(1)'
            el.style.filter = 'blur(0px)'
            observer.disconnect()
          }
        },
        { threshold: 0.12 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [scope])
}
