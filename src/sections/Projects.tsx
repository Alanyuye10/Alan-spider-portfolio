import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { ProjectVisual } from '../components/ProjectVisual'
import { SectionHeading } from '../components/SectionHeading'
import { SectionReveal } from '../components/SectionReveal'
import { TiltCard } from '../components/TiltCard'
import { projectCategories, projects } from '../constants/data'
import type { ProjectCategory } from '../types'

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('All')
  const filtered = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.categories.includes(filter)), [filter])

  return (
    <SectionReveal><section id="work" className="projects section-shell section-space">
      <div className="projects-heading-row">
        <SectionHeading index="03" eyebrow="Selected work" title="Digital products with a point of view." description="A selection of product, platform, and commerce work—designed to perform in the real world." />
        <div className="project-filters" role="group" aria-label="Filter projects">
          {projectCategories.map((category) => <motion.button type="button" key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} whileTap={{ scale: 0.93 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>{category}{filter === category && <motion.i layoutId="active-filter" />}</motion.button>)}
        </div>
      </div>
      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.article layout key={project.id} initial={{ opacity: 0, scale: 0.84 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.55, delay: index * 0.04 }} className={index === 0 && filter === 'All' ? 'project-card-wrap project-card-wrap--wide' : 'project-card-wrap'}>
              <TiltCard className="project-card animated-border">
                <div className="project-art">
                  {project.featured && <span className="featured-tag">FEATURED</span>}
                  <ProjectVisual project={project} />
                  <div className="project-art__actions">
                    <a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><FiGithub /></a>
                    <a href={project.live} target="_blank" rel="noreferrer" aria-label={`View live ${project.title}`}><FiArrowUpRight /></a>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-info__top"><span>0{project.id} / {project.eyebrow}</span><span>{project.metric}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-stack">{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="projects-note"><span>Have a project in mind?</span><a href="#contact">Let’s build something exceptional <FiArrowUpRight /></a></div>
    </section></SectionReveal>
  )
}
