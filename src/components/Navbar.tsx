import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiCommand, FiMenu, FiX } from 'react-icons/fi'
import { navItems } from '../constants/data'
import { useScrollSpy } from '../hooks/useScrollSpy'

const sectionIds = ['hero', ...navItems.map((item) => item.href.slice(1))]

export function Navbar({ onCommand }: { onCommand: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(sectionIds)

  useEffect(() => {
    let ticking = false
    const update = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          ticking = false
        })
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a href="#hero" className="logo" aria-label="Alan — home"><span>A</span>lan<em>.</em><svg className="logo-spider" width="16" height="14" viewBox="0 0 16 14" fill="none" style={{ marginLeft: 6, verticalAlign: 'middle', opacity: 0.4, transition: 'opacity .3s' }}><ellipse cx="8" cy="8" rx="3" ry="3.5" fill="url(#spiderLogo)" opacity="0.7"/><circle cx="8" cy="4.5" r="2" fill="url(#spiderLogo)"/><circle cx="8" cy="4.5" r="1" fill="#fff" opacity="0.5"/><path d="M5 7L2 4.5L2 5.5Z" fill="url(#spiderLogo)" opacity="0.5"/><path d="M11 7L14 4.5L14 5.5Z" fill="url(#spiderLogo)" opacity="0.5"/><path d="M5 9L1.5 8.5L2 9.5Z" fill="url(#spiderLogo)" opacity="0.5"/><path d="M11 9L14.5 8.5L14 9.5Z" fill="url(#spiderLogo)" opacity="0.5"/><defs><linearGradient id="spiderLogo" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e11d2e"/><stop offset="55%" stopColor="#f8fafc"/><stop offset="100%" stopColor="#0a1f44"/></linearGradient></defs></svg></a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={`underline-gradient ${active === item.href.slice(1) ? 'active' : ''}`}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button type="button" className="command-trigger" onClick={onCommand} aria-label="Open command palette">
            <FiCommand /><span>K</span>
          </button>
                     <a href="#contact" className="nav-cta button--shimmer">Let’s talk <FiArrowUpRight /></a>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mobile-menu__links">
              {navItems.map((item, index) => (
                <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 25, rotateX: -12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.08 + index * 0.06 }} style={{ transformStyle: 'preserve-3d' }}>
                  <span>0{index + 1}</span>{item.label}<FiArrowUpRight />
                </motion.a>
              ))}
            </div>
            <p>Available for selected freelance projects · 2026</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
