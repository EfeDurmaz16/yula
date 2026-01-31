export interface Tool {
  id: string
  userId: string
  name: string
  description: string
  endpoint: string
  schema: Record<string, unknown>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateTool {
  name: string
  description: string
  endpoint: string
  schema: Record<string, unknown>
}
