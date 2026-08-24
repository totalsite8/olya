export type ProjectCategory = 'mascots' | 'social' | 'branding' | 'presentations' | 'video' | 'ai'

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
  galleryGroups?: { title: string; images: string[] }[]
  video?: { src: string; poster: string; aspect: '9:16' | '16:9' | '1:1' }
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
