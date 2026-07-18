import { FiArrowUpRight, FiBarChart2, FiBox, FiShoppingBag, FiUsers } from 'react-icons/fi'
import type { Project } from '../types'

export function ProjectVisual({ project }: { project: Project }) {
  const icons = { blue: FiShoppingBag, violet: FiBarChart2, amber: FiBox, cyan: FiUsers }
  const Icon = icons[project.tone]
  const bars = project.tone === 'violet' ? [36, 58, 44, 76, 65, 89, 72, 94] : [58, 43, 72, 54, 86, 67, 91, 78]

  return (
    <div className={`project-visual project-visual--${project.tone}`} role="img" aria-label={`${project.title} interface preview`}>
      <div className="visual-noise" />
      <div className="project-window">
        <div className="project-window__bar">
          <span /><span /><span />
          <div className="window-pill" />
        </div>
        <div className="project-window__body">
          <div className="visual-sidebar">
            <div className="visual-brand"><Icon /></div>
            {[0, 1, 2, 3].map((item) => <i key={item} className={item === 0 ? 'is-active' : ''} />)}
          </div>
          <div className="visual-content">
            <div className="visual-topline"><span>Overview</span><b><FiArrowUpRight /></b></div>
            <div className="visual-metric"><small>GROWTH</small><strong>{project.metric}</strong></div>
            <div className="visual-chart" aria-hidden="true">
              {bars.map((bar, index) => <i key={index} style={{ height: `${bar}%` }} />)}
            </div>
          </div>
        </div>
      </div>
      <div className="floating-chip floating-chip--one">Live</div>
      <div className="floating-chip floating-chip--two">↗ 24%</div>
    </div>
  )
}
