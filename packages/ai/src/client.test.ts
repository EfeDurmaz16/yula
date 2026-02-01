import { describe, expect, it, vi } from 'vitest'
import { createAIClient } from './client'

vi.mock('@ai-sdk/anthropic', () => ({
  createAnthropic: vi.fn((opts) => {
    const provider = (model: string) => ({ modelId: model, provider: 'anthropic' })
    return provider
  }),
}))

describe('createAIClient', () => {
  it('creates a client with defaults', () => {
    const client = createAIClient()
    expect(client).toBeDefined()
    expect(typeof client).toBe('function')
  })

  it('creates a client with custom api key', () => {
    const client = createAIClient({ apiKey: 'test-key' })
    expect(client).toBeDefined()
  })

  it('returns a callable provider', () => {
    const client = createAIClient()
    const model = client('claude-3-5-sonnet-20241022')
    expect(model).toBeDefined()
    expect((model as unknown as { modelId: string }).modelId).toBe('claude-3-5-sonnet-20241022')
  })
})
