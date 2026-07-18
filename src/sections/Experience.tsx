import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SectionReveal } from '../components/SectionReveal'
import { experiences } from '../constants/data'

export function Experience() {
  const cardVariants = (index: number) => ({
    initial: { opacity: 0, scale: 0.84, filter: 'blur(4px)' },
    whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  })

  return (
    <SectionReveal><section id="experience" className="experience section-space">
      <div className="section-shell">
        <SectionHeading index="04" eyebrow="Experience" title="Built through curiosity, sharpened by practice." description="A timeline of roles where engineering craft, product thinking, and close collaboration created meaningful outcomes." />
        <div className="timeline">
          <motion.div className="timeline-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
          {experiences.map((item, index) => (
            <motion.div key={item.years} className="timeline-item" {...cardVariants(index)} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <div className="timeline-dot"><span /></div>
              <div className="timeline-years">{item.years}</div>
              <div className="timeline-card">
                <div><span className="timeline-index">0{index + 1}</span><FiArrowUpRight /></div>
                <h3>{item.role}</h3><h4>{item.company}</h4><p>{item.description}</p>
                <div className="timeline-tags">{item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section></SectionReveal>
  )
}
