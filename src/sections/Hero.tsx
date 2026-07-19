import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi'
import heroVisual from '../assets/developer-orbit.jpg'
import { MagneticLink } from '../components/MagneticLink'
import { ParallaxLayer } from '../components/ParallaxLayer'
import { Particles } from '../components/Particles'
import { SpiderWeb } from '../components/SpiderWeb'
import { TextReveal } from '../components/TextReveal'
import { roles } from '../constants/data'
import { useTypewriter } from '../hooks/useTypewriter'

const terminalCommands = ['explore ./about', 'view --work', 'cd contact', 'open ./resume']

export function Hero() {
  const role = useTypewriter(roles)
  const [cmdIndex, setCmdIndex] = useState(0)
  const [cmdText, setCmdText] = useState('')
  const [cmdPhase, setCmdPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing')
  const sectionRef = useRef<HTMLElement>(null)
  const lastMoveRef = useRef(0)
  const rectCacheRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    const cmd = terminalCommands[cmdIndex]
    if (cmdPhase === 'typing') {
      if (cmdText.length < cmd.length) {
        const t = setTimeout(() => setCmdText(cmd.slice(0, cmdText.length + 1)), 40)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setCmdPhase('waiting'), 2000)
        return () => clearTimeout(t)
      }
    }
    if (cmdPhase === 'waiting') {
      const t = setTimeout(() => setCmdPhase('deleting'), 1500)
      return () => clearTimeout(t)
    }
    if (cmdPhase === 'deleting') {
      if (cmdText.length > 0) {
        const t = setTimeout(() => setCmdText(cmdText.slice(0, -1)), 20)
        return () => clearTimeout(t)
      } else {
        setCmdIndex((cmdIndex + 1) % terminalCommands.length)
        setCmdPhase('typing')
      }
    }
  }, [cmdText, cmdPhase, cmdIndex])
  const imageX = useSpring(useMotionValue(0), { stiffness: 80, damping: 24 })
  const imageY = useSpring(useMotionValue(0), { stiffness: 80, damping: 24 })
  const ringX = useSpring(useMotionValue(0), { stiffness: 55, damping: 20 })
  const ringY = useSpring(useMotionValue(0), { stiffness: 55, damping: 20 })

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const now = Date.now()
    if (now - lastMoveRef.current < 16) return
    lastMoveRef.current = now
    if (!rectCacheRef.current) {
      rectCacheRef.current = sectionRef.current?.getBoundingClientRect()
    }
    const rect = rectCacheRef.current
    if (!rect) return
    const x = event.clientX / rect.width - 0.5
    const y = event.clientY / rect.height - 0.5
    imageX.set(x * 16); imageY.set(y * 12)
    ringX.set(x * -28); ringY.set(y * -20)
  }

  return (
    <section id="hero" ref={sectionRef} className="hero section-shell" onMouseMove={handleMove}>
      <Particles count={35} color="rgba(99, 102, 241, 0.4)" speed={0.12} />
      <div className="hero-grid" aria-hidden="true" />
      <ParallaxLayer speed={-0.2}><div className="hero-ambient hero-ambient--one" aria-hidden="true" /></ParallaxLayer>
      <ParallaxLayer speed={-0.15}><div className="hero-ambient hero-ambient--two" aria-hidden="true" /></ParallaxLayer>
      <div className="hero-web"><SpiderWeb size={1.4} opacity={0.35} /></div>
      <div className="hero-skyline" aria-hidden="true">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" width="100%" height="100%">
          <defs>
            <linearGradient id="skyline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="60%" stopColor="rgba(190,18,60,0.04)" />
              <stop offset="100%" stopColor="rgba(79,70,229,0.08)" />
            </linearGradient>
          </defs>
          <rect width="1200" height="400" fill="url(#skyline-grad)" />
          <g opacity="0.35" fill="rgba(190,18,60,0.12)">
            <rect x="20" y="120" width="60" height="280" rx="2" />
            <rect x="90" y="80" width="45" height="320" rx="2" />
            <rect x="145" y="160" width="55" height="240" rx="2" />
            <rect x="210" y="60" width="70" height="340" rx="2" />
            <rect x="290" y="140" width="40" height="260" rx="2" />
            <rect x="340" y="100" width="80" height="300" rx="2" />
            <rect x="430" y="40" width="55" height="360" rx="2" />
            <rect x="495" y="130" width="65" height="270" rx="2" />
            <rect x="570" y="90" width="50" height="310" rx="2" />
            <rect x="630" y="50" width="85" height="350" rx="2" />
            <rect x="725" y="110" width="45" height="290" rx="2" />
            <rect x="780" y="70" width="60" height="330" rx="2" />
            <rect x="850" y="150" width="70" height="250" rx="2" />
            <rect x="930" y="55" width="55" height="345" rx="2" />
            <rect x="995" y="95" width="65" height="305" rx="2" />
            <rect x="1070" y="130" width="50" height="270" rx="2" />
            <rect x="1130" y="75" width="55" height="325" rx="2" />
          </g>
          <g opacity="0.15" fill="rgba(79,70,229,0.15)">
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x={30 + i * 98} y={60 + Math.sin(i * 1.7) * 50} width={2} height={6} rx={1} opacity={0.3 + Math.random() * 0.7} />
            ))}
          </g>
        </svg>
      </div>
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
        <motion.div className="hero-float-card hero-float-card--top" drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.1} whileHover={{ scale: 1.03 }} style={{ cursor: 'grab' }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} whileTap={{ cursor: 'grabbing' }}><span>BUILD STATUS</span><strong><i /> All systems live</strong></motion.div>
        <motion.div className="hero-float-card hero-float-card--bottom" drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.1} whileHover={{ scale: 1.03 }} style={{ cursor: 'grab' }} animate={{ y: [0, 9, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} whileTap={{ cursor: 'grabbing' }}><span>CURRENTLY CRAFTING</span><strong>Next-gen web experiences</strong></motion.div>
      </motion.div>

      <a className="terminal-cue" href="#about">
        <span className="terminal-cue__prompt">alan@portfolio:~$</span>
        <span className="terminal-cue__cmd">
          <span className="terminal-cue__text">{cmdText}</span>
          <span className="terminal-cue__cursor" />
        </span>
      </a>
      <div className="hero-index" aria-hidden="true">01 <span>/</span> 07</div>
    </section>
  )
}
