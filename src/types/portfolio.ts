export type ProjectCategory = 'design' | 'neuro' | 'video' | 'presentation'

export interface PortfolioProject {
  id: string
  title: string
  subtitle: string
  category: ProjectCategory
  categoryLabel: string
  year: string
  tags: string[]
  cover: string
  description: string
  services: string[]
  accent: string
}

export interface ServiceHighlight {
  id: string
  title: string
  description: string
  items: string[]
}
