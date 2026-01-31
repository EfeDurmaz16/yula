import type { MemoryRetrievalRequest, MemoryRetrievalResponse } from '@repo/types'

export interface MemoryServerConfig {
  apiUrl: string
  apiKey?: string
}

export class MemoryServer {
  private config: MemoryServerConfig

  constructor(config: MemoryServerConfig) {
    this.config = config
  }

  async retrieveMemories(request: MemoryRetrievalRequest): Promise<MemoryRetrievalResponse> {
    const { query, userId, limit = 10, threshold = 0.7 } = request

    const response = await fetch(
      `${this.config.apiUrl}/api/memory/search?query=${encodeURIComponent(query)}&limit=${limit}&threshold=${threshold}`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'X-User-ID': userId,
        },
      },
    )

    const data = await response.json()

    if (!data.success) {
      return { memories: [] }
    }

    return {
      memories: data.data.items.map(
        (item: { id: string; content: string; score?: number; source: string }) => ({
          id: item.id,
          content: item.content,
          score: item.score || 1,
          source: item.source,
        }),
      ),
    }
  }

  async storeMemory(
    userId: string,
    content: string,
    source: string,
  ): Promise<{ success: boolean; id?: string }> {
    const response = await fetch(`${this.config.apiUrl}/api/memory/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
        'X-User-ID': userId,
      },
      body: JSON.stringify({ content, source }),
    })

    const data = await response.json()

    if (!data.success) {
      return { success: false }
    }

    return { success: true, id: data.data.id }
  }
}

export function createMemoryServer(config: MemoryServerConfig): MemoryServer {
  return new MemoryServer(config)
}
