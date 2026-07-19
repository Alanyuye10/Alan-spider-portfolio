import type { Experience, Project, ProjectCategory, SkillGroup, Testimonial } from '../types'

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const roles = ['Friendly Neighborhood Developer', 'MERN Developer', 'React Expert', 'Node.js Developer', 'Shopify Developer', 'UI Engineer']

export const stats = [
  { value: 5, suffix: '+', label: 'Years building' },
  { value: 42, suffix: '+', label: 'Projects shipped' },
  { value: 18, suffix: '', label: 'Technologies' },
  { value: 28, suffix: '+', label: 'Happy clients' },
]

export const skillGroups: SkillGroup[] = [
  {
    name: 'frontend', label: 'Frontend systems', skills: [
      { name: 'React', icon: 'react', level: 96 }, { name: 'TypeScript', icon: 'typescript', level: 92 },
      { name: 'Next.js', icon: 'next', level: 88 }, { name: 'Tailwind', icon: 'tailwind', level: 94 },
    ],
  },
  {
    name: 'backend', label: 'Backend & APIs', skills: [
      { name: 'Node.js', icon: 'node', level: 93 }, { name: 'Express', icon: 'express', level: 94 },
      { name: 'REST / GraphQL', icon: 'api', level: 89 }, { name: 'Auth & Security', icon: 'shield', level: 87 },
    ],
  },
  {
    name: 'data', label: 'Data & cloud', skills: [
      { name: 'MongoDB', icon: 'mongo', level: 92 }, { name: 'Firebase', icon: 'firebase', level: 84 },
      { name: 'AWS', icon: 'aws', level: 81 }, { name: 'Docker', icon: 'docker', level: 86 },
    ],
  },
  {
    name: 'tools', label: 'Commerce & tools', skills: [
      { name: 'Shopify', icon: 'shopify', level: 91 }, { name: 'Git', icon: 'git', level: 95 },
      { name: 'Figma', icon: 'figma', level: 82 }, { name: 'GSAP', icon: 'gsap', level: 88 },
    ],
  },
]

export const projectCategories: ProjectCategory[] = ['All', 'MERN', 'React', 'Node', 'Shopify']

export const projects: Project[] = [
  {
    id: 1, title: 'Nexora Commerce', eyebrow: 'Conversion-first commerce',
    description: 'A headless storefront with personalized discovery, instant search, and a delightfully fast checkout flow.',
    categories: ['MERN', 'React', 'Node'], stack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    metric: '+38% conversion', tone: 'blue', github: 'https://github.com/', live: 'https://example.com', featured: true,
    caseStudy: {
      problem: 'The client\'s existing storefront had high bounce rates and poor mobile conversion. Users struggled with slow search and a checkout flow that leaked 62% of potential sales.',
      approach: 'We rebuilt the entire storefront as a headless MERN stack with Stripe integration. Personalized product discovery, instant search with debounced queries, and a streamlined 2-step checkout were implemented. The admin dashboard gave the team real-time visibility into sales, inventory, and user behavior patterns.',
      results: 'Conversion rate increased by 38% within the first month. Page load time dropped from 4.2s to 0.8s. Average session duration grew by 2.3x. The streamlined checkout reduced cart abandonment by 44%.',
      highlights: ['Reduced bounce rate by 52%', '2-step checkout flow', 'Real-time inventory sync', 'A/B tested product layouts'],
    },
  },
  {
    id: 2, title: 'Pulse Analytics', eyebrow: 'Realtime intelligence',
    description: 'A collaborative SaaS command center that turns live product signals into clear, actionable decisions.',
    categories: ['React', 'Node'], stack: ['TypeScript', 'Socket.io', 'Express', 'Redis'],
    metric: '12M events/day', tone: 'violet', github: 'https://github.com/', live: 'https://example.com', featured: true,
    caseStudy: {
      problem: 'The product team was drowning in data from multiple sources—analytics, support tickets, user sessions—with no unified view. Decisions were slow because insights were scattered across five different tools.',
      approach: 'We designed a real-time command center that ingests events from multiple sources via WebSocket connections, processes them through a Redis-backed pipeline, and surfaces actionable insights through customizable dashboards. Collaborative features allow teams to annotate, share, and act on data together.',
      results: 'The platform processes over 12 million events daily with sub-50ms latency. Teams report 3x faster decision-making. User retention improved by 28% due to the collaborative features and customizable views.',
      highlights: ['12M+ events processed daily', 'Sub-50ms real-time latency', 'Custom dashboard builder', 'Team annotation system'],
    },
  },
  {
    id: 3, title: 'Noir Supply', eyebrow: 'Editorial shopping',
    description: 'An immersive Shopify experience blending editorial storytelling with a frictionless shopping journey.',
    categories: ['Shopify', 'React'], stack: ['Shopify', 'Hydrogen', 'React', 'GSAP'],
    metric: '96 Lighthouse', tone: 'amber', github: 'https://github.com/', live: 'https://example.com', featured: true,
    caseStudy: {
      problem: 'The fashion brand needed a digital experience that matched their editorial photography and storytelling approach. The existing Shopify theme was too rigid and generic, failing to convey the brand\'s premium identity.',
      approach: 'We built a custom Shopify Hydrogen storefront with React, combining editorial storytelling with commerce. Rich media layouts, scroll-driven narrative sections, and custom product interactions create an immersive shopping experience. GSAP powers smooth transitions between editorial content and product showcases.',
      results: 'Achieved a 96 Lighthouse performance score. Average time-on-site increased by 4.1x. The editorial approach drove a 67% higher add-to-cart rate compared to the previous traditional product grid layout.',
      highlights: ['96 Lighthouse performance', '4.1x increase in time-on-site', '67% higher add-to-cart rate', 'Custom Hydrogen storefront'],
    },
  },
  {
    id: 4, title: 'Orbit Workspace', eyebrow: 'Calm team productivity',
    description: 'A focused project workspace with smart automation, shared views, and beautifully simple reporting.',
    categories: ['MERN', 'React', 'Node'], stack: ['React', 'MongoDB', 'Node.js', 'AWS'],
    metric: '4.8/5 rating', tone: 'cyan', github: 'https://github.com/', live: 'https://example.com',
    caseStudy: {
      problem: 'Teams were overwhelmed by bloated project management tools with steep learning curves. The client wanted a focused, intuitive workspace that teams would actually want to use daily—not another tool that required training sessions.',
      approach: 'We built a streamlined MERN application prioritizing clarity and calm. Smart automation handles routine task management, while shared views give teams real-time visibility. The interface was designed with deliberate whitespace, restrained interactions, and progressive disclosure to reduce cognitive load.',
      results: 'The product earned a 4.8/5 rating from early adopters. Onboarding time was under 3 minutes. Teams using Orbit reported 31% fewer meetings because shared visibility replaced status update overhead.',
      highlights: ['4.8/5 user rating', 'Under 3-minute onboarding', '31% fewer status meetings', 'Automated task management'],
    },
  },
]

export const experiences: Experience[] = [
  {
    years: '2024 — NOW', role: 'Senior Full Stack Developer', company: 'Independent / Remote',
    description: 'Partnering with ambitious teams to turn complex product ideas into clear, scalable web experiences.',
    highlights: ['Product strategy', 'System architecture', 'Design engineering'],
  },
  {
    years: '2022 — 2024', role: 'MERN Stack Developer', company: 'Northstar Labs',
    description: 'Led frontend architecture and built reliable Node.js services for fast-growing SaaS products.',
    highlights: ['React platforms', 'REST APIs', 'Performance'],
  },
  {
    years: '2020 — 2022', role: 'Frontend Developer', company: 'Pixel & Logic',
    description: 'Created polished marketing sites and commerce experiences with a sharp eye for interaction design.',
    highlights: ['Creative development', 'Shopify', 'UI systems'],
  },
]

export const services = [
  { number: '01', title: 'Full-stack products', text: 'End-to-end web applications that balance speed, scalability, and a memorable user experience.', icon: 'layers' },
  { number: '02', title: 'Frontend engineering', text: 'Responsive interfaces, robust design systems, and motion that guides instead of distracts.', icon: 'layout' },
  { number: '03', title: 'Backend & APIs', text: 'Secure, observable Node.js services and clean integrations built for real-world traffic.', icon: 'server' },
  { number: '04', title: 'Shopify experiences', text: 'High-converting storefronts and custom commerce solutions with editorial polish.', icon: 'bag' },
]

export const testimonials: Testimonial[] = [
  { quote: 'Alan has that rare ability to care about the business problem, the tiniest interaction detail, and the reliability of the system underneath it.', name: 'Maya Richardson', role: 'Founder, Orbit Labs', initials: 'MR' },
  { quote: 'He transformed a complicated brief into an experience that felt inevitable. Our launch was smoother, faster, and dramatically more confident.', name: 'Daniel Cho', role: 'Product Lead, Nexora', initials: 'DC' },
  { quote: 'The quality bar moved the moment Alan joined. He brought clarity to the codebase and a level of craft our customers immediately noticed.', name: 'Sofia Khan', role: 'Design Director, Northstar', initials: 'SK' },
]

export const githubStats = [
  { value: 96, suffix: '+', label: 'Repositories' },
  { value: 1280, suffix: '+', label: 'Stars earned' },
  { value: 840, suffix: '+', label: 'Followers' },
  { value: 1847, suffix: '', label: 'Contributions' },
]

export const orbitTech = ['React', 'Node', 'TS', 'Mongo', 'AWS', 'Docker', 'Git', 'Shopify']
