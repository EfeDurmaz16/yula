import type { ProactiveCallbackRequest, ProactiveCallbackResponse } from '@repo/types'

export interface ContextServerConfig {
  apiUrl: string
  apiKey?: string
}

export class ContextServer {
  private config: ContextServerConfig

  constructor(config: ContextServerConfig) {
    this.config = config
  }

  async processProactiveCallback(
    request: ProactiveCallbackRequest,
  ): Promise<ProactiveCallbackResponse> {
    const { userId, context, trigger } = request

    const response = await fetch(`${this.config.apiUrl}/api/context/proactive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
        'X-User-ID': userId,
      },
      body: JSON.stringify({ context, trigger }),
    })

    const data = await response.json()

    if (!data.success) {
      return { shouldRespond: false }
    }

    return {
      shouldRespond: data.data.shouldRespond,
      response: data.data.response,
      memories: data.data.memories,
    }
  }

  async getConversationContext(
    userId: string,
    conversationId: string,
  ): Promise<{ context: string; memories: string[] }> {
    const response = await fetch(
      `${this.config.apiUrl}/api/context/conversation/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'X-User-ID': userId,
        },
      },
    )

    const data = await response.json()

    if (!data.success) {
      return { context: '', memories: [] }
    }

    return {
      context: data.data.context,
      memories: data.data.memories,
    }
  }
}

export function createContextServer(config: ContextServerConfig): ContextServer {
  return new ContextServer(config)
}
