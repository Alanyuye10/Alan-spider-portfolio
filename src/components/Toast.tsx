import { AnimatePresence, motion } from 'framer-motion'
import { FiCheck, FiX } from 'react-icons/fi'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  visible: boolean
  onClose: () => void
}

export function Toast({ message, type, visible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`toast toast--${type}`}
          initial={{ opacity: 0, x: 80, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.92 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="toast__icon">{type === 'success' ? <FiCheck /> : <FiX />}</span>
          <span className="toast__message">{message}</span>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.4)', cursor: 'pointer', padding: '4px' }} aria-label="Close notification"><FiX /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
