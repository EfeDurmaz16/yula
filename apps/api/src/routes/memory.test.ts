import { Hono } from 'hono'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockConvexClient, resetMocks } from '../test-helpers'
import type { AppEnv } from '../types'
import { memoryRoutes } from './memory'

const app = new Hono<AppEnv>()
app.use('*', async (c, next) => {
  c.set('userId', 'user_1' as AppEnv['Variables']['userId'])
  await next()
})
app.route('/', memoryRoutes)

describe('memory routes', () => {
  beforeEach(() => resetMocks())

  it('POST /import creates a memory', async () => {
    mockConvexClient.mutation.mockResolvedValue('mem_1')
    const res = await app.request('/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'Remember this', source: 'import' }),
    })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.content).toBe('Remember this')
  })

  it('GET /search performs vector search', async () => {
    mockConvexClient.action.mockResolvedValue([{ content: 'memory 1', _score: 0.9 }])
    const res = await app.request('/search?query=test&limit=5&threshold=0.7', { method: 'GET' })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.items).toHaveLength(1)
  })

  it('GET /search filters by threshold', async () => {
    mockConvexClient.action.mockResolvedValue([{ content: 'low score', _score: 0.3 }])
    const res = await app.request('/search?query=test&threshold=0.7', { method: 'GET' })
    const json = await res.json()
    expect(json.data.items).toHaveLength(0)
  })

  it('GET / lists memories', async () => {
    mockConvexClient.query.mockResolvedValue([])
    const res = await app.request('/', { method: 'GET' })
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('GET /:id returns memory', async () => {
    mockConvexClient.query.mockResolvedValue({ _id: 'mem_1', content: 'test' })
    const res = await app.request('/mem_1', { method: 'GET' })
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('GET /:id returns 404 when not found', async () => {
    mockConvexClient.query.mockResolvedValue(null)
    const res = await app.request('/missing', { method: 'GET' })
    expect(res.status).toBe(404)
  })

  it('DELETE /:id removes memory', async () => {
    mockConvexClient.mutation.mockResolvedValue(undefined)
    const res = await app.request('/mem_1', { method: 'DELETE' })
    const json = await res.json()
    expect(json.success).toBe(true)
  })
})
