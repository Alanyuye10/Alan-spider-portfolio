import { useRef } from 'react'
import { FiArrowUpRight, FiCode, FiLayers, FiZap } from 'react-icons/fi'
import heroVisual from '../assets/developer-orbit.jpg'
import { Counter } from '../components/Counter'
import { ParallaxLayer } from '../components/ParallaxLayer'
import { WebReveal } from '../components/WebReveal'
import { SectionHeading } from '../components/SectionHeading'
import { TiltCard } from '../components/TiltCard'
import { stats } from '../constants/data'
import { useGsapReveal } from '../animations/gsapReveal'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  useGsapReveal(sectionRef)

  return (
    <section id="about" ref={sectionRef} className="about section-shell section-space">
      <SectionHeading index="01" eyebrow="About me" title="Engineering with empathy. Designing with purpose." description="I bridge product thinking, visual craft, and robust engineering to build work that earns attention—and keeps it." />
      <div className="about-grid">
        <div className="about-visual" data-gsap-reveal>
          <div className="about-image"><ParallaxLayer speed={-0.12}><img src={heroVisual} alt="Futuristic development system artwork" loading="lazy" /></ParallaxLayer><div className="about-image__label"><span>ALAN.DEV</span><span>INDIA · REMOTE</span></div></div>
          <div className="about-code-card"><div><span /><span /><span /></div><code><span style={{color: '#c084fc'}}>function</span> <span style={{color: '#60a5fa'}}>createImpact</span>() &#123;<br />&nbsp;&nbsp;<span style={{color: '#c084fc'}}>const</span> craft = &#123;<br />&nbsp;&nbsp;&nbsp;&nbsp;detail: <span style={{color: '#f87171'}}>true</span>,<br />&nbsp;&nbsp;&nbsp;&nbsp;curiosity: <span style={{color: '#fbbf24'}}>'∞'</span>,<br />&nbsp;&nbsp;&nbsp;&nbsp;purpose: <span style={{color: '#34d399'}}>'people first'</span>,<br />&nbsp;&nbsp;&#125;<br />&nbsp;&nbsp;<span style={{color: '#60a5fa'}}>return</span> craft<br />&#125;<span className="code-cursor" /></code></div>
          <div className="about-stamp">CRAFTED<br />WITH INTENT<FiArrowUpRight /></div>
        </div>
        <div className="about-content">
          <p className="about-lead" data-gsap-reveal>More than clean code—I care about the feeling a product leaves behind.</p>
          <p data-gsap-reveal>I'm a full-stack developer specializing in the MERN ecosystem, with a design-led approach to solving real problems. From early product thinking to the final interaction detail, I work across the stack to keep ideas coherent.</p>
          <p data-gsap-reveal>I thrive in the space between design and engineering, where technical decisions shape customer experience and good taste becomes a measurable advantage.</p>
          <div className="about-principles" data-gsap-reveal>
            <span><FiZap /> Fast by default</span><span><FiLayers /> Built to scale</span><span><FiCode /> Clean & maintainable</span>
          </div>
        </div>
      </div>
      <div className="stat-grid">
        {stats.map((stat, index) => (
          <WebReveal key={stat.label} delay={index * 0.08} duration={0.6}>
            <TiltCard className="stat-card animated-border">
              <span className="stat-index">0{index + 1}</span>
              <strong><Counter value={stat.value} suffix={stat.suffix} /></strong>
              <p>{stat.label}</p>
            </TiltCard>
          </WebReveal>
        ))}
      </div>
    </section>
  )
}
