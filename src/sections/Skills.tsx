import { motion } from 'framer-motion'
import { IconGlyph } from '../components/IconGlyph'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SectionReveal } from '../components/SectionReveal'
import { skillGroups } from '../constants/data'

export function Skills() {
  return (
    <SectionReveal><section id="skills" className="skills section-space">
      <div className="section-shell">
        <SectionHeading index="02" eyebrow="Capabilities" title="A toolkit built for ambitious products." description="From interface architecture to deployment, I choose tools for the problem—not the trend." />
        <div className="skills-grid">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.name} className="skill-group" delay={groupIndex * 0.07}>
              <div className="skill-group__head"><span>0{groupIndex + 1}</span><h3>{group.label}</h3></div>
              <div className="skill-list">
                {group.skills.map((skill, skillIndex) => (
                  <motion.div className="skill-item" key={skill.name} initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: skillIndex * 0.05, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: 1.02, x: 4, transition: { type: 'spring', stiffness: 280, damping: 18 } }} whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400, damping: 12 } }}>
                    <span className="skill-icon"><IconGlyph name={skill.icon} /></span>
                    <div className="skill-meta"><div><strong>{skill.name}</strong><small>{skill.level}%</small></div><i><motion.b initial={{ scaleX: 0 }} whileInView={{ scaleX: skill.level / 100 }} viewport={{ once: true }} transition={{ delay: 0.2 + skillIndex * 0.06, duration: 1, ease: [0.22, 1, 0.36, 1] }} /></i></div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="skills-marquee">
          <div className="marquee-track" aria-hidden="true">
            {[...skillGroups.flatMap((group) => group.skills), ...skillGroups.flatMap((group) => group.skills)].map((skill, index) => <span key={`${skill.name}-${index}`}><IconGlyph name={skill.icon} size={18} />{skill.name}<i /></span>)}
          </div>
        </Reveal>
      </div>
    </section></SectionReveal>
  )
}
