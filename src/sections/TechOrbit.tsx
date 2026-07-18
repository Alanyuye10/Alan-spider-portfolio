import { motion } from 'framer-motion'
import { TechFallback } from '../components/IconGlyph'
import { Reveal } from '../components/Reveal'
import { SectionReveal } from '../components/SectionReveal'
import { orbitTech } from '../constants/data'

export function TechOrbit() {
  return (
    <SectionReveal><section className="tech-orbit section-space" aria-label="Technology stack showcase">
      <div className="section-shell orbit-shell">
        <Reveal className="orbit-copy">
          <span className="section-kicker"><span>∞</span>Always evolving</span>
          <h2>Technology changes.<br /><em>Good thinking endures.</em></h2>
          <p>I stay curious across the stack while keeping the fundamentals—clarity, performance, accessibility, and human needs—at the center.</p>
          <a href="#contact">Build with me <span>↗</span></a>
        </Reveal>
        <Reveal className="orbit-scene" delay={0.15}>
          <div className="orbit-ring orbit-ring--outer" />
          <div className="orbit-ring orbit-ring--inner" />
          <motion.div className="orbit-track orbit-track--outer" animate={{ rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}>
            {orbitTech.slice(0, 5).map((tech, index) => <motion.div key={tech} className="orbit-tech" style={{ transform: `rotate(${index * 72}deg) translateX(178px) rotate(-${index * 72}deg)` }} animate={{ rotate: -360 }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }} title={tech}><TechFallback name={tech} /></motion.div>)}
          </motion.div>
          <motion.div className="orbit-track orbit-track--inner" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            {orbitTech.slice(5).map((tech, index) => <motion.div key={tech} className="orbit-tech orbit-tech--small" style={{ transform: `rotate(${index * 120}deg) translateX(104px) rotate(-${index * 120}deg)` }} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} title={tech}><TechFallback name={tech} /></motion.div>)}
          </motion.div>
          <div className="orbit-core"><span>A</span><i /><small>MERN</small></div>
        </Reveal>
      </div>
    </section></SectionReveal>
  )
}
