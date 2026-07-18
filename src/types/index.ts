export type ProjectCategory = 'All' | 'React' | 'Node' | 'Shopify' | 'MERN'

export interface Project {
  id: number
  title: string
  eyebrow: string
  description: string
  categories: Exclude<ProjectCategory, 'All'>[]
  stack: string[]
  metric: string
  tone: 'blue' | 'violet' | 'cyan' | 'amber'
  github: string
  live: string
  featured?: boolean
}

export interface Skill {
  name: string
  icon: string
  level: number
}

export interface SkillGroup {
  name: string
  label: string
  skills: Skill[]
}

export interface Experience {
  years: string
  role: string
  company: string
  description: string
  highlights: string[]
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}
