import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { CommandPalette } from '../components/CommandPalette'
import { Cursor } from '../components/Cursor'
import { CursorTrail } from '../components/CursorTrail'
import { Footer } from '../components/Footer'
import { GradientMesh } from '../components/GradientMesh'
import { Navbar } from '../components/Navbar'
import { PageLoader } from '../components/PageLoader'
import { ScrollProgress } from '../components/ScrollProgress'
import { ComicBurst } from '../components/ComicBurst'
import { SpiderCrawler } from '../components/SpiderCrawler'
import { SpiderRappel } from '../components/SpiderRappel'
import { SpideySense } from '../components/SpideySense'
import { WebShooter } from '../components/WebShooter'
import { WebSwing } from '../components/WebSwing'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'
import { useLenis } from '../hooks/useLenis'

function LayoutInner({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [decorReady, setDecorReady] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const { showEasterEggs } = useTheme()
  useLenis()

  const closeCommand = useCallback(() => setCommandOpen(false), [])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    const decorTimer = window.setTimeout(() => setDecorReady(true), 3000)
    const hotkey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', hotkey)
    return () => { window.clearTimeout(timer); window.clearTimeout(decorTimer); window.removeEventListener('keydown', hotkey) }
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
      {showEasterEggs && <SpiderCrawler />}
      {showEasterEggs && <SpiderRappel />}
      {decorReady && <ComicBurst />}
      {decorReady && <SpideySense />}
      {decorReady && <WebSwing />}
      {decorReady && <WebShooter />}
      <Navbar onCommand={() => setCommandOpen(true)} />
      {children}
      <Footer />
      <CommandPalette open={commandOpen} onClose={closeCommand} />
    </>
  )
}

export function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutInner>{children}</LayoutInner>
    </ThemeProvider>
  )
}
