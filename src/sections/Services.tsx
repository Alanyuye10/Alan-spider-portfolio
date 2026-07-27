import { motion } from 'framer-motion'
import { FiArrowUpRight, FiLayers, FiLayout, FiServer, FiShoppingBag } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SectionReveal } from '../components/SectionReveal'
import { services } from '../constants/data'

const icons: Record<string, IconType> = { layers: FiLayers, layout: FiLayout, server: FiServer, bag: FiShoppingBag }

export function Services() {
  return (
    <SectionReveal><section className="services section-shell section-space" aria-labelledby="services-title">
      <SectionHeading index="05" eyebrow="What I do" title="From first idea to shipped experience." description="Flexible engagement across strategy, design engineering, full-stack development, and focused product improvements." />
      <h2 id="services-title" className="sr-only">Services</h2>
      <div className="services-list">
        {services.map((service, index) => {
          const Icon = icons[service.icon]
          return (
            <Reveal key={service.title} delay={index * 0.07}>
              <motion.div className="service-row" whileHover="hover" whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 12 } }}>
                <span className="service-number">{service.number}</span>
                <motion.span className="service-icon" whileHover={{ rotate: 8, scale: 1.05 }} whileTap={{ rotate: 8, scale: 1.05 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}><Icon /></motion.span>
                <div><h3>{service.title}</h3><p>{service.text}</p></div>
                <motion.span className="service-arrow" variants={{ hover: { rotate: 45, scale: 1.1 } }}><FiArrowUpRight /></motion.span>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </section></SectionReveal>
  )
}
