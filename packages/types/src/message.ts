export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  userId: string
  conversationId: string
  role: MessageRole
  content: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface CreateMessage {
  userId: string
  conversationId: string
  role: MessageRole
  content: string
  metadata?: Record<string, unknown>
}
