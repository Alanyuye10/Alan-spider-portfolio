import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'
import { FiArrowDown, FiArrowRight, FiDownload, FiMail } from 'react-icons/fi'
import heroVisual from '../assets/developer-orbit.jpg'
import { MagneticLink } from '../components/MagneticLink'
import { ParallaxLayer } from '../components/ParallaxLayer'
import { Particles } from '../components/Particles'
import { SpiderWeb } from '../components/SpiderWeb'
import { TextReveal } from '../components/TextReveal'
import { roles } from '../constants/data'
import { useTypewriter } from '../hooks/useTypewriter'

export function Hero() {
  const role = useTypewriter(roles)
  const sectionRef = useRef<HTMLElement>(null)
  const imageX = useSpring(useMotionValue(0), { stiffness: 80, damping: 24 })
  const imageY = useSpring(useMotionValue(0), { stiffness: 80, damping: 24 })
  const ringX = useSpring(useMotionValue(0), { stiffness: 55, damping: 20 })
  const ringY = useSpring(useMotionValue(0), { stiffness: 55, damping: 20 })

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = event.clientX / rect.width - 0.5
    const y = event.clientY / rect.height - 0.5
    imageX.set(x * 16); imageY.set(y * 12)
    ringX.set(x * -28); ringY.set(y * -20)
  }

  return (
    <section id="hero" ref={sectionRef} className="hero section-shell" onMouseMove={handleMove}>
      <Particles count={40} color="rgba(96, 165, 250, 0.4)" speed={0.15} />
      <div className="hero-grid" aria-hidden="true" />
      <ParallaxLayer speed={-0.2}><div className="hero-ambient hero-ambient--one" aria-hidden="true" /></ParallaxLayer>
      <ParallaxLayer speed={-0.15}><div className="hero-ambient hero-ambient--two" aria-hidden="true" /></ParallaxLayer>
      <div className="hero-web"><SpiderWeb size={1.4} opacity={0.35} /></div>
      <div className="hero-copy">
        <motion.div className="availability-pill" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
          <span><i /></span> Available for select projects
        </motion.div>
        <h1 aria-label="Hi, I'm Alan. Full Stack MERN Developer.">
          <span className="hero-overline">HI, I'M ALAN</span>
          <span className="hero-title-line" style={{ overflow: 'hidden' }}>
            <TextReveal as="span" type="word" delay={0.85} stagger={0.035}>Full Stack</TextReveal>
          </span>
          <span className="hero-title-mask">
            <TextReveal as="span" className="hero-title-line hero-title-line--gradient" type="word" delay={0.95} stagger={0.035}>MERN Developer.</TextReveal>
          </span>
        </h1>
        <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}><span>01</span>I’m a <strong>{role}</strong><i /></motion.div>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.28 }}>
          I design and build digital products that pair thoughtful interactions with resilient engineering—crafted to feel effortless and perform beautifully.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.36 }}>
          <MagneticLink href="#work" className="button button--primary button--shimmer">View projects <FiArrowRight /></MagneticLink>
          <MagneticLink href="/alan-resume.txt" download="alan-resume.txt" className="button button--ghost">Resume <FiDownload /></MagneticLink>
          <MagneticLink href="#contact" className="hero-mail" ariaLabel="Contact Alan"><FiMail /></MagneticLink>
        </motion.div>
      </div>

      <motion.div className="hero-visual" style={{ x: imageX, y: imageY }} initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.75, duration: 1.1 }}>
        <motion.div className="hero-orbit" style={{ x: ringX, y: ringY }} aria-hidden="true"><i /><i /><i /></motion.div>
        <div className="hero-image-wrap">
          <img src={heroVisual} alt="Abstract three-dimensional developer system with glass code panels" fetchPriority="high" />
          <div className="hero-image-fade" />
        </div>
        <motion.div className="hero-float-card hero-float-card--top" style={{ animationDelay: '0.3s' }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><span>BUILD STATUS</span><strong><i /> All systems live</strong></motion.div>
        <motion.div className="hero-float-card hero-float-card--bottom" style={{ animationDelay: '0.6s' }} animate={{ y: [0, 9, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><span>CURRENTLY CRAFTING</span><strong>Next-gen web experiences</strong></motion.div>
      </motion.div>

      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><i><FiArrowDown /></i></a>
      <div className="hero-index" aria-hidden="true">01 <span>/</span> 07</div>
    </section>
  )
}
