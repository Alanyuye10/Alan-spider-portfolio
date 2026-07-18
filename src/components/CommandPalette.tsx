import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiBriefcase, FiDownload, FiHome, FiMail, FiUser, FiX } from 'react-icons/fi'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

const commands = [
  { label: 'Go home', meta: 'H', href: '#hero', icon: FiHome },
  { label: 'About Alan', meta: 'A', href: '#about', icon: FiUser },
  { label: 'View selected work', meta: 'W', href: '#work', icon: FiBriefcase },
  { label: 'Start a conversation', meta: 'C', href: '#contact', icon: FiMail },
]

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    if (open) { window.addEventListener('keydown', keydown); window.setTimeout(() => inputRef.current?.focus(), 50) }
    return () => window.removeEventListener('keydown', keydown)
  }, [onClose, open])

  useEffect(() => { if (!open) setQuery('') }, [open])

  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="palette-backdrop" role="dialog" aria-modal="true" aria-label="Command palette" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div className="command-palette" initial={{ opacity: 0, y: -20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.25 }} onMouseDown={(event) => event.stopPropagation()}>
            <div className="palette-search"><FiArrowDown /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type a command…" aria-label="Search commands" /><button type="button" onClick={onClose} aria-label="Close"><FiX /></button></div>
            <div className="palette-results">
              <small>QUICK NAVIGATION</small>
              {filtered.map((command) => {
                const Icon = command.icon
                return <a key={command.label} href={command.href} onClick={onClose}><span><Icon />{command.label}</span><kbd>{command.meta}</kbd></a>
              })}
              {filtered.length === 0 && <p className="no-results">No matching commands.</p>}
            </div>
            <div className="palette-footer"><span><FiDownload /> Resume available on request</span><span>ESC to close</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
