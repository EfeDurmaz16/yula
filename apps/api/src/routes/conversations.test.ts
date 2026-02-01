import { Hono } from 'hono'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockConvexClient, resetMocks } from '../test-helpers'
import type { AppEnv } from '../types'
import { conversationRoutes } from './conversations'

const app = new Hono<AppEnv>()
app.use('*', async (c, next) => {
  c.set('userId', 'user_1' as AppEnv['Variables']['userId'])
  await next()
})
app.route('/', conversationRoutes)

describe('conversation routes', () => {
  beforeEach(() => resetMocks())

  it('GET / lists conversations', async () => {
    mockConvexClient.query.mockResolvedValue({ items: [], hasMore: false })
    const res = await app.request('/', { method: 'GET' })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.items).toEqual([])
  })

  it('POST / creates a conversation', async () => {
    mockConvexClient.mutation.mockResolvedValue('conv_1')
    mockConvexClient.query.mockResolvedValue({ _id: 'conv_1', title: 'Test', messageCount: 0 })
    const res = await app.request('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test' }),
    })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.title).toBe('Test')
  })

  it('GET /:id returns conversation', async () => {
    mockConvexClient.query.mockResolvedValue({ _id: 'conv_1', title: 'Test' })
    const res = await app.request('/conv_1', { method: 'GET' })
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('GET /:id returns 404 when not found', async () => {
    mockConvexClient.query.mockResolvedValue(null)
    const res = await app.request('/missing', { method: 'GET' })
    expect(res.status).toBe(404)
  })

  it('PATCH /:id updates conversation', async () => {
    mockConvexClient.mutation.mockResolvedValue({ _id: 'conv_1', title: 'Updated' })
    const res = await app.request('/conv_1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated' }),
    })
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('DELETE /:id removes conversation', async () => {
    mockConvexClient.mutation.mockResolvedValue(undefined)
    const res = await app.request('/conv_1', { method: 'DELETE' })
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('GET /:id/messages returns messages', async () => {
    mockConvexClient.query.mockResolvedValue([])
    const res = await app.request('/conv_1/messages', { method: 'GET' })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.items).toEqual([])
  })
})
