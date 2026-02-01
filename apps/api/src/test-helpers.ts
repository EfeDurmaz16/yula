import { vi } from 'vitest'

export const mockConvexClient = {
  query: vi.fn(),
  mutation: vi.fn(),
  action: vi.fn(),
}

vi.mock('./lib/convex', () => ({
  getConvexClient: () => mockConvexClient,
}))

vi.mock('./lib/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn().mockResolvedValue({
        session: { id: 'session_1', token: 'tok_1' },
        user: { id: 'user_1', email: 'test@test.com', name: 'Test' },
      }),
    },
    handler: vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }))),
  },
}))

vi.mock('@repo/ai/embeddings', () => ({
  generateEmbedding: vi.fn().mockResolvedValue(Array(1536).fill(0.1)),
}))

vi.mock('@repo/ai', () => ({
  createAIClient: vi.fn(() => (model: string) => ({ modelId: model })),
}))

vi.mock('ai', () => ({
  streamText: vi.fn(() => ({
    toDataStreamResponse: () => new Response('streamed'),
  })),
}))

export function resetMocks() {
  mockConvexClient.query.mockReset()
  mockConvexClient.mutation.mockReset()
  mockConvexClient.action.mockReset()
}
