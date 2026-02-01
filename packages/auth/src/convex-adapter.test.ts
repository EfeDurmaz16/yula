import { describe, expect, it, vi } from 'vitest'
import { createConvexAdapter } from './convex-adapter'

const mockClient = {
  query: vi.fn(),
  mutation: vi.fn(),
}

describe('createConvexAdapter', () => {
  it('returns an adapter with required methods', () => {
    const adapter = createConvexAdapter(
      mockClient as unknown as Parameters<typeof createConvexAdapter>[0],
    )
    expect(adapter.id).toBe('convex')
    expect(adapter.create).toBeDefined()
    expect(adapter.findOne).toBeDefined()
    expect(adapter.findMany).toBeDefined()
    expect(adapter.update).toBeDefined()
    expect(adapter.delete).toBeDefined()
  })

  it('create calls mutation', async () => {
    mockClient.mutation.mockResolvedValue('new-id')
    const adapter = createConvexAdapter(
      mockClient as unknown as Parameters<typeof createConvexAdapter>[0],
    )
    const result = await adapter.create({
      model: 'user',
      data: { email: 'test@test.com', name: 'Test' },
    })
    expect(mockClient.mutation).toHaveBeenCalled()
    expect(result.id).toBe('new-id')
  })

  it('findOne by email queries users', async () => {
    mockClient.query.mockResolvedValue({
      _id: 'id1',
      _creationTime: Date.now(),
      email: 'test@test.com',
    })
    const adapter = createConvexAdapter(
      mockClient as unknown as Parameters<typeof createConvexAdapter>[0],
    )
    const result = await adapter.findOne({
      model: 'user',
      where: [{ field: 'email', value: 'test@test.com' }],
    })
    expect(result).toBeDefined()
    expect(result?.id).toBe('id1')
  })

  it('findOne returns null when not found', async () => {
    mockClient.query.mockResolvedValue(null)
    const adapter = createConvexAdapter(
      mockClient as unknown as Parameters<typeof createConvexAdapter>[0],
    )
    const result = await adapter.findOne({
      model: 'user',
      where: [{ field: 'email', value: 'missing@test.com' }],
    })
    expect(result).toBeNull()
  })

  it('findMany for accounts by userId', async () => {
    mockClient.query.mockResolvedValue([
      { _id: 'acc1', _creationTime: Date.now(), providerId: 'github' },
    ])
    const adapter = createConvexAdapter(
      mockClient as unknown as Parameters<typeof createConvexAdapter>[0],
    )
    const result = await adapter.findMany({
      model: 'account',
      where: [{ field: 'userId', value: 'user1' }],
    })
    expect(result).toHaveLength(1)
  })

  it('delete session by token', async () => {
    mockClient.mutation.mockResolvedValue(undefined)
    const adapter = createConvexAdapter(
      mockClient as unknown as Parameters<typeof createConvexAdapter>[0],
    )
    await adapter.delete({
      model: 'session',
      where: [{ field: 'token', value: 'tok_123' }],
    })
    expect(mockClient.mutation).toHaveBeenCalledWith('sessions:removeByToken', { token: 'tok_123' })
  })
})
