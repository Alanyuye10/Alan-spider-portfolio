import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState, type FormEvent } from 'react'
import { FiArrowUpRight, FiCheck, FiGithub, FiLinkedin, FiLoader, FiMail, FiMapPin, FiSend, FiTwitter } from 'react-icons/fi'
import { ParallaxLayer } from '../components/ParallaxLayer'
import { Reveal } from '../components/Reveal'
import { SectionReveal } from '../components/SectionReveal'
import { Toast } from '../components/Toast'

interface FormValues { name: string; email: string; subject: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = { name: '', email: '', subject: '', message: '' }

function validate(values: FormValues) {
  const errors: FormErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'Tell me what this is about.'
  if (values.message.trim().length < 20) errors.message = 'Add a little more detail (20 characters minimum).'
  return errors
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'form-ripple'
    ripple.style.left = `${event.clientX - rect.left}px`
    ripple.style.top = `${event.clientY - rect.top}px`
    ripple.style.width = '20px'
    ripple.style.height = '20px'
    target.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }
    setStatus('loading')

    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
      if (endpoint) {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
        if (!response.ok) throw new Error('Unable to submit form')
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700))
        const subject = encodeURIComponent(values.subject)
        const body = encodeURIComponent(`Hi Alan,\n\n${values.message}\n\n— ${values.name}\n${values.email}`)
        window.location.href = `mailto:hello@alan.dev?subject=${subject}&body=${body}`
      }
      setStatus('success')
      setValues(initialValues)
      setToast({ message: 'Message sent! Your email app is ready.', type: 'success' })
    } catch {
      setStatus('error')
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' })
    }
  }

  return (
    <SectionReveal>
      <section id="contact" className="contact section-space">
        <ParallaxLayer speed={-0.15}><div className="contact-glow" aria-hidden="true" /></ParallaxLayer>
        <div className="section-shell">
          <Reveal className="contact-heading">
            <span className="section-kicker"><span>08</span>Contact</span>
            <h2>Have a bold idea?<br /><em>Let's make it real.</em></h2>
            <p>Tell me what you're building, where you're stuck, or what you want to make better. I'll bring curiosity, clarity, and honest thinking.</p>
          </Reveal>
          <div className="contact-grid">
            <Reveal className="contact-details">
              <div className="contact-detail"><span><FiMail /></span><div><small>EMAIL ME</small><a href="mailto:hello@alan.dev">hello@alan.dev <FiArrowUpRight /></a></div></div>
              <div className="contact-detail"><span><FiMapPin /></span><div><small>LOCATION</small><strong>India · Working worldwide</strong></div></div>
              <div className="contact-availability"><i /><div><strong>Open to great conversations</strong><p>Typically replies within 24–48 hours.</p></div></div>
              <div className="contact-socials"><a href="https://github.com/" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="https://linkedin.com/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a><a href="https://twitter.com/" target="_blank" rel="noreferrer"><FiTwitter /> Twitter</a></div>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.1}>
              <form className="contact-form" onSubmit={submit} noValidate>
                <div className="form-row">
                  <label><span>Name</span><input value={values.name} onFocus={handleFocus} onChange={(event) => updateValue('name', event.target.value)} placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <small id="name-error">{errors.name}</small>}</label>
                  <label><span>Email</span><input type="email" value={values.email} onFocus={handleFocus} onChange={(event) => updateValue('email', event.target.value)} placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <small id="email-error">{errors.email}</small>}</label>
                </div>
                <label><span>Subject</span><input value={values.subject} onFocus={handleFocus} onChange={(event) => updateValue('subject', event.target.value)} placeholder="What are we creating?" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} />{errors.subject && <small id="subject-error">{errors.subject}</small>}</label>
                <label><span>Message</span><textarea rows={6} value={values.message} onFocus={handleFocus} onChange={(event) => updateValue('message', event.target.value)} placeholder="A little context goes a long way…" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <small id="message-error">{errors.message}</small>}<i>{values.message.length} / 1000</i></label>
                <button type="submit" className="submit-button" disabled={status === 'loading'}>
                  <AnimatePresence mode="wait">
                    {status === 'loading' ? <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FiLoader className="spin" /> Sending…</motion.span> : <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Send message <FiSend /></motion.span>}
                  </AnimatePresence>
                </button>
                <div className="form-note" aria-live="polite">
                  {status === 'success' && <span className="success"><FiCheck /> Your email app is ready—thanks for reaching out.</span>}
                  {status === 'error' && <span className="error">Something went wrong. Please email hello@alan.dev directly.</span>}
                  {status === 'idle' && <span>Your details stay private. No spam, ever.</span>}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      <Toast message={toast?.message ?? ''} type={toast?.type ?? 'success'} visible={toast !== null} onClose={() => setToast(null)} />
    </SectionReveal>
  )
}
