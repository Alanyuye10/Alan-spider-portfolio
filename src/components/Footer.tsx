import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { SpiderWeb } from './SpiderWeb'

export function Footer() {
  return (
    <footer className="site-footer">
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none', overflow: 'hidden' }}>
          <SpiderWeb size={1.8} animated={false} />
        </div>
        <div className="footer-top">
        <a href="#hero" className="footer-logo"><span>A</span>lan<em>.</em></a>
        <p>Designing and building digital experiences<br />with clarity, craft, and curiosity.<br /><small style={{ color: 'rgba(148,163,184,.5)', fontSize: '.64rem', display: 'block', marginTop: '6px' }}>"With great power comes great responsibility"</small></p>
        <div className="footer-socials">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Alan. All rights reserved.</span>
        <span className="footer-status"><i /> Swinging between projects</span>
        <a href="#hero">Back to top <FiArrowUp /></a>
      </div>
      </div>
    </footer>
  )
}
