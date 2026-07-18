import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { FiArrowUpRight, FiGitBranch, FiGithub, FiStar, FiUsers } from 'react-icons/fi'
import { Counter } from '../components/Counter'
import { SectionHeading } from '../components/SectionHeading'
import { SectionReveal } from '../components/SectionReveal'
import { githubStats } from '../constants/data'

const contributions = Array.from({ length: 364 }, (_, index) => {
  const wave = Math.sin(index * 0.47) + Math.cos(index * 0.19) + Math.sin(index * 0.071)
  return wave > 1.35 ? 4 : wave > 0.65 ? 3 : wave > 0.05 ? 2 : wave > -0.55 ? 1 : 0
})

const statIcons = [FiGitBranch, FiStar, FiUsers, FiGithub]

export function GitHubStats() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cells = el.querySelectorAll('i')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cells.forEach((cell, i) => {
              (cell as HTMLElement).style.animationDelay = `${i * 3}ms`
              ;(cell as HTMLElement).classList.add('cell-fill')
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionReveal><section className="github-section section-shell section-space" aria-labelledby="github-title">
      <SectionHeading index="07" eyebrow="Open source" title="Shipping in public, learning in the open." description="A snapshot of consistent practice, useful experiments, and contributions to the developer community." />
      <h2 id="github-title" className="sr-only">GitHub activity</h2>
      <motion.div className="github-panel" initial={{ opacity: 0, scale: 0.84 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="github-panel__head"><div><FiGithub /><span><strong>alan-dev</strong><small>Building useful things, one commit at a time.</small></span></div><a href="https://github.com/" target="_blank" rel="noreferrer">View profile <FiArrowUpRight /></a></div>
        <div className="contribution-wrap">
          <div className="contribution-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div>
          <div className="contribution-grid" ref={gridRef} role="img" aria-label="Illustrative GitHub contribution graph">
            {contributions.map((level, index) => <i key={index} data-level={level} title={`${level} contribution level`} />)}
          </div>
        </div>
        <div className="contribution-footer"><span>1,847 contributions in the last year</span><span>Less <i data-level="0" /><i data-level="1" /><i data-level="2" /><i data-level="3" /><i data-level="4" /> More</span></div>
      </motion.div>
      <div className="github-stat-grid">
        {githubStats.map((stat, index) => {
          const Icon = statIcons[index]
          return (
            <motion.div key={stat.label} className="github-stat animated-border" initial={{ opacity: 0, scale: 0.86 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <Icon /><strong><Counter value={stat.value} suffix={stat.suffix} /></strong><span>{stat.label}</span>
            </motion.div>
          )
        })}
      </div>
    </section></SectionReveal>
  )
}
