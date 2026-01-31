export interface MCPServer {
  id: string
  name: string
  description: string
  endpoint: string
  capabilities: MCPCapability[]
  isActive: boolean
}

export type MCPCapability = 'memory' | 'tools' | 'proactive' | 'context'

export interface MCPRequest {
  method: string
  params: Record<string, unknown>
}

export interface MCPResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: number
    message: string
  }
}

export interface MemoryRetrievalRequest {
  query: string
  userId: string
  limit?: number
  threshold?: number
}

export interface MemoryRetrievalResponse {
  memories: Array<{
    id: string
    content: string
    score: number
    source: string
  }>
}

export interface ProactiveCallbackRequest {
  userId: string
  context: string
  trigger: string
}

export interface ProactiveCallbackResponse {
  shouldRespond: boolean
  response?: string
  memories?: string[]
}
