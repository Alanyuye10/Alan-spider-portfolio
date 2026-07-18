import type { IconType } from 'react-icons'
import {
  SiDocker, SiExpress, SiFigma, SiFirebase, SiGit,
  SiGreensock, SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiShopify,
  SiTailwindcss, SiTypescript,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { FiBox, FiCode, FiDatabase, FiLock } from 'react-icons/fi'

const iconMap: Record<string, IconType> = {
  react: SiReact, typescript: SiTypescript, next: SiNextdotjs, tailwind: SiTailwindcss,
  node: SiNodedotjs, express: SiExpress, mongo: SiMongodb, firebase: SiFirebase,
  aws: FaAws, docker: SiDocker, shopify: SiShopify, git: SiGit,
  figma: SiFigma, gsap: SiGreensock, api: FiCode, shield: FiLock,
}

export function IconGlyph({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = iconMap[name] ?? FiBox
  return <Icon size={size} aria-hidden="true" />
}

export function TechFallback({ name }: { name: string }) {
  const key = name.toLowerCase()
  const Icon = key.includes('node') ? SiNodedotjs : key.includes('react') ? SiReact : key.includes('mongo') ? SiMongodb : key.includes('docker') ? SiDocker : key.includes('shop') ? SiShopify : key.includes('git') ? SiGit : key.includes('aws') ? FaAws : key === 'ts' ? SiTypescript : FiDatabase
  return <Icon aria-hidden="true" />
}
