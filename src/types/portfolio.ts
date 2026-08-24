export type ProjectCategory = 'mascots' | 'social' | 'branding' | 'presentations'

export interface PortfolioProject {
  id: string
  title: string
  subtitle: string
  category: ProjectCategory
  categoryLabel: string
  year: string
  tags: string[]
  cover: string
  task: string
  role: string[]
  nda?: string
  outcome?: { title: string; stats?: { value: string; label: string }[]; footnote?: string }
  gallery: string[]
}

export interface TimelineEntry {
  period: string
  place: string
  role: string
  details: string[]
}

export interface EducationEntry {
  period: string
  degree: string
  field: string
  institution: string
}
