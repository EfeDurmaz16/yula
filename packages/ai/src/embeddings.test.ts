import { describe, expect, it, vi } from 'vitest'

vi.mock('openai', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      embeddings: {
        create: vi.fn().mockResolvedValue({
          data: [{ embedding: Array(1536).fill(0.1) }],
        }),
      },
    })),
  }
})

import { generateEmbedding } from './embeddings'

describe('generateEmbedding', () => {
  it('returns a 1536-dimensional vector', async () => {
    const embedding = await generateEmbedding('hello world')
    expect(embedding).toHaveLength(1536)
  })

  it('returns number array', async () => {
    const embedding = await generateEmbedding('test')
    expect(embedding.every((n) => typeof n === 'number')).toBe(true)
  })
})
