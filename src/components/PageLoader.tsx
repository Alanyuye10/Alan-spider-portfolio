import { AnimatePresence, motion } from 'framer-motion'
import { SpiderWeb } from './SpiderWeb'

export function PageLoader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="page-loader" initial={{ opacity: 1 }} exit={{ y: '-100%' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none', overflow: 'hidden' }}>
            <SpiderWeb size={2.5} animated={false} />
          </div>
          <motion.div className="loader-logo" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}><span>A</span><em>.</em></motion.div>
          <div className="loader-track"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.75, ease: 'easeInOut' }} /></div>
          <span className="loader-copy">WITH GREAT POWER COMES GREAT RESPONSIBILITY</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
