import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ index, eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={`section-heading ${align === 'center' ? 'section-heading--center' : ''}`}>
      <div className="section-kicker"><span>{index}</span>{eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  )
}
