import { lazy, Suspense } from 'react'
import { SectionDivider } from '../components/SectionDivider'
import { Hero } from '../sections/Hero'

const About = lazy(() => import('../sections/About').then((module) => ({ default: module.About })))
const Skills = lazy(() => import('../sections/Skills').then((module) => ({ default: module.Skills })))
const Projects = lazy(() => import('../sections/Projects').then((module) => ({ default: module.Projects })))
const Experience = lazy(() => import('../sections/Experience').then((module) => ({ default: module.Experience })))
const Services = lazy(() => import('../sections/Services').then((module) => ({ default: module.Services })))
const GitHubStats = lazy(() => import('../sections/GitHubStats').then((module) => ({ default: module.GitHubStats })))
const TechOrbit = lazy(() => import('../sections/TechOrbit').then((module) => ({ default: module.TechOrbit })))
const Contact = lazy(() => import('../sections/Contact').then((module) => ({ default: module.Contact })))

function SectionFallback() {
  return <div className="section-fallback section-shell" aria-hidden="true"><span /><span /><span /></div>
}

export function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <SectionDivider />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <GitHubStats />
        <SectionDivider />
        <TechOrbit />
        <SectionDivider />
        <Contact />
      </Suspense>
    </main>
  )
}
