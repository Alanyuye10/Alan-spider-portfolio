import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { CommandPalette } from '../components/CommandPalette'
import { Cursor } from '../components/Cursor'
import { CursorTrail } from '../components/CursorTrail'
import { Footer } from '../components/Footer'
import { GradientMesh } from '../components/GradientMesh'
import { Navbar } from '../components/Navbar'
import { PageLoader } from '../components/PageLoader'
import { ScrollProgress } from '../components/ScrollProgress'
import { SpiderCrawler } from '../components/SpiderCrawler'
import { SpiderRappel } from '../components/SpiderRappel'
import { WebShooter } from '../components/WebShooter'
import { useLenis } from '../hooks/useLenis'

export function PortfolioLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  useLenis()

  const closeCommand = useCallback(() => setCommandOpen(false), [])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    const hotkey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', hotkey)
    return () => { window.clearTimeout(timer); window.removeEventListener('keydown', hotkey) }
  }, [])

  useEffect(() => {
    if (!loading) document.body.classList.add('noise-animated')
    return () => document.body.classList.remove('noise-animated')
  }, [loading])

  return (
    <>
      <PageLoader visible={loading} />
      {!loading && <GradientMesh />}
      <Cursor />
      <CursorTrail />
      <ScrollProgress />
      <SpiderCrawler />
      <SpiderRappel />
      <WebShooter />
      <Navbar onCommand={() => setCommandOpen(true)} />
      {children}
      <Footer />
      <CommandPalette open={commandOpen} onClose={closeCommand} />
    </>
  )
}
