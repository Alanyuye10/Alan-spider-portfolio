import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiArrowUpRight, FiCheck, FiGithub, FiX } from 'react-icons/fi'
import { stopLenis, startLenis } from '../hooks/useLenis'
import type { Project } from '../types'

interface CaseStudyModalProps {
  project: Project | null
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    stopLenis()
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', keydown)
    return () => {
      document.body.style.overflow = ''
      startLenis()
      window.removeEventListener('keydown', keydown)
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={onClose}
          onWheel={(e) => e.stopPropagation()}
          style={{ position: 'fixed', inset: 0, zIndex: 50000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5vh 16px', background: 'rgba(2,4,12,.82)', backdropFilter: 'blur(12px)', overflow: 'auto' }}
        >
          <motion.article
            className="case-study"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ width: 'min(800px, 100%)', maxHeight: '90vh', overflow: 'auto', border: '1px solid var(--line)', borderRadius: 24, background: 'rgba(8,12,27,.96)', boxShadow: '0 40px 120px rgba(0,0,0,.5)' }}
          >
            <div style={{ position: 'sticky', top: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid var(--line)', background: 'rgba(8,12,27,.92)', backdropFilter: 'blur(12px)' }}>
              <div>
                <span style={{ color: 'var(--accent-secondary-bright)', font: '8px var(--mono)', letterSpacing: '.15em', textTransform: 'uppercase' }}>Case Study · 0{project.id}</span>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', border: '1px solid var(--line)', borderRadius: 10, background: 'transparent', color: 'var(--muted)', cursor: 'pointer', transition: '.2s' }}>
                <FiX />
              </button>
            </div>

            <div style={{ padding: '32px 28px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, marginBottom: 28 }}>
                <div>
                  <span style={{ color: 'var(--muted-dark)', font: '8px var(--mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{project.eyebrow}</span>
                  <h2 style={{ margin: '8px 0 6px', font: '600 2rem/1.1 var(--display)', letterSpacing: '-.04em' }}>{project.title}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.82rem', lineHeight: 1.7, maxWidth: 480 }}>{project.description}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`} style={{ width: 44, height: 44, display: 'grid', placeItems: 'center', border: '1px solid var(--line)', borderRadius: 12, color: 'var(--muted)', transition: '.2s' }}><FiGithub /></a>
                  <a href={project.live} target="_blank" rel="noreferrer" aria-label={`View live ${project.title}`} style={{ width: 44, height: 44, display: 'grid', placeItems: 'center', border: '1px solid var(--line)', borderRadius: 12, color: 'var(--accent-secondary-bright)', transition: '.2s' }}><FiArrowUpRight /></a>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {project.stack.map((tech) => (
                  <span key={tech} style={{ padding: '6px 10px', border: '1px solid var(--line)', borderRadius: 8, color: '#a8b4c7', font: '8px var(--mono)' }}>{tech}</span>
                ))}
                <span style={{ padding: '6px 10px', borderRadius: 8, background: 'linear-gradient(135deg, rgba(225,29,46,.14), rgba(10,31,68,.24))', color: 'var(--silver-bright)', font: '8px var(--mono)', border: '1px solid rgba(225,29,46,.24)' }}>{project.metric}</span>
              </div>

              {project.caseStudy && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  <Section label="The problem">
                    <p>{project.caseStudy.problem}</p>
                  </Section>
                  <Section label="Our approach">
                    <p>{project.caseStudy.approach}</p>
                  </Section>
                  <Section label="Results">
                    <p>{project.caseStudy.results}</p>
                  </Section>
                  {project.caseStudy.highlights.length > 0 && (
                    <div>
                      <span style={{ display: 'block', marginBottom: 12, color: 'var(--muted-dark)', font: '8px var(--mono)', letterSpacing: '.15em', textTransform: 'uppercase' }}>Key highlights</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {project.caseStudy.highlights.map((h) => (
                          <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#cbd5e1', fontSize: '.75rem' }}>
                            <FiCheck style={{ color: 'var(--accent-secondary-bright)', flexShrink: 0 }} />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span style={{ display: 'block', marginBottom: 10, color: 'var(--accent-secondary-bright)', font: '8px var(--mono)', letterSpacing: '.15em', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
