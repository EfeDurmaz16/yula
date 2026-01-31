export type MemorySource = 'import' | 'conversation' | 'proactive' | 'tool'

export interface Memory {
  id: string
  userId: string
  content: string
  embedding: number[]
  source: MemorySource
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface CreateMemory {
  content: string
  source?: MemorySource
  metadata?: Record<string, unknown>
}

export interface MemorySearch {
  query: string
  limit?: number
  threshold?: number
}

export interface MemorySearchResult {
  memory: Memory
  score: number
}
