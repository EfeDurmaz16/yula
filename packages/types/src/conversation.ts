import type { Message } from './message'

export interface Conversation {
  id: string
  userId: string
  title: string
  summary?: string
  messageCount: number
  lastMessageAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[]
}

export interface CreateConversation {
  title?: string
}
