import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiStar } from 'react-icons/fi'
import { ParallaxLayer } from '../components/ParallaxLayer'
import { SectionHeading } from '../components/SectionHeading'
import { SectionReveal } from '../components/SectionReveal'
import { testimonials } from '../constants/data'

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const progressControls = useAnimation()
  const progressRef = useRef(true)

  useEffect(() => {
    progressRef.current = !paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [paused])

  useEffect(() => {
    if (!progressRef.current) { progressControls.set({ scaleX: 0 }); return }
    progressControls.set({ scaleX: 0 })
    progressControls.start({ scaleX: 1, transition: { duration: 5.2, ease: 'linear' } })
    const interval = window.setInterval(() => setActive((index) => (index + 1) % testimonials.length), 5200)
    return () => window.clearInterval(interval)
  }, [active, progressControls])

  const previous = () => setActive((index) => (index - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((index) => (index + 1) % testimonials.length)
  const testimonial = testimonials[active]

  return (
    <SectionReveal><section className="testimonials section-space" aria-labelledby="testimonial-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ParallaxLayer speed={-0.1} className="section-shell">
        <SectionHeading index="06" eyebrow="Kind words" title="Trusted by people who care about the details." align="center" />
        <h2 id="testimonial-title" className="sr-only">Client testimonials</h2>
        <div className="testimonial-stage">
          <div className="testimonial-progress"><motion.i style={{ scaleX: 0, transformOrigin: 'left' }} animate={progressControls} /></div>
          <div className="quote-mark" aria-hidden="true">“</div>
          <AnimatePresence mode="wait">
            <motion.figure key={active} initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }} transition={{ duration: 0.52 }}>
              <div className="testimonial-stars">{[0, 1, 2, 3, 4].map((star) => <FiStar key={star} />)}</div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption><span>{testimonial.initials}</span><div><strong>{testimonial.name}</strong><small>{testimonial.role}</small></div></figcaption>
            </motion.figure>
          </AnimatePresence>
          <button type="button" className="testimonial-arrow testimonial-arrow--left" onClick={previous} aria-label="Previous testimonial"><FiArrowLeft /></button>
          <button type="button" className="testimonial-arrow testimonial-arrow--right" onClick={next} aria-label="Next testimonial"><FiArrowRight /></button>
        </div>
        <div className="testimonial-dots">{testimonials.map((item, index) => <button type="button" key={item.name} onClick={() => setActive(index)} className={active === index ? 'active' : ''} aria-label={`Show testimonial from ${item.name}`}><i /></button>)}</div>
      </ParallaxLayer>
    </section></SectionReveal>
  )
}
