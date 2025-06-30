// Define InternshipStatus as const object for SQLite compatibility
export const InternshipStatus = {
  APPLIED: 'APPLIED',
  INTERVIEWING: 'INTERVIEWING',
  OFFER: 'OFFER',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN'
} as const

export type InternshipStatusType = typeof InternshipStatus[keyof typeof InternshipStatus]

export interface User {
  id: string
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface Internship {
  id: string
  userId: string
  company: string
  role: string
  status: string
  dateApplied: Date
  tags: string
  link?: string
  description?: string
  location?: string
  salary?: string
  createdAt: Date
  updatedAt: Date
  notes?: Note[]
}

export interface Resume {
  id: string
  userId: string
  fileName: string
  fileUrl: string
  fileSize?: number
  uploadedAt: Date
}

export interface Note {
  id: string
  internshipId: string
  title: string
  content: string
  dueDate?: Date
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GeneratedUI {
  id: string
  userId: string
  title: string
  description?: string
  componentCode: string
  prompt: string
  isSaved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateInternshipData {
  company: string
  role: string
  status?: string
  dateApplied?: Date
  tags?: string
  link?: string
  description?: string
  location?: string
  salary?: string
}

export interface UpdateInternshipData extends Partial<CreateInternshipData> {
  id: string
}

export interface CreateNoteData {
  internshipId: string
  title: string
  content: string
  dueDate?: Date
}

export interface KanbanColumn {
  id: string
  title: string
  internships: Internship[]
}

export interface AIMessage {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  timestamp: Date
  componentCode?: string
}

 