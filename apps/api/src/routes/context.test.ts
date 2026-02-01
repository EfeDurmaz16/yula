import { Hono } from 'hono'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockConvexClient, resetMocks } from '../test-helpers'
import type { AppEnv } from '../types'
import { contextRoutes } from './context'

const app = new Hono<AppEnv>()
app.use('*', async (c, next) => {
  c.set('userId', 'user_1' as AppEnv['Variables']['userId'])
  await next()
})
app.route('/', contextRoutes)

describe('context routes', () => {
  beforeEach(() => resetMocks())

  it('POST /proactive returns context for memory_match trigger', async () => {
    mockConvexClient.action.mockResolvedValue([{ content: 'relevant memory' }])
    const res = await app.request('/proactive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: 'test context', trigger: 'memory_match' }),
    })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.shouldRespond).toBe(true)
    expect(json.data.memories).toContain('relevant memory')
  })

  it('POST /proactive does not respond for unknown trigger', async () => {
    const res = await app.request('/proactive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: 'test', trigger: 'unknown' }),
    })
    const json = await res.json()
    expect(json.data.shouldRespond).toBe(false)
  })

  it('GET /conversation/:id returns context', async () => {
    mockConvexClient.query
      .mockResolvedValueOnce({ _id: 'conv_1', title: 'Test', summary: 'Summary' })
      .mockResolvedValueOnce([{ content: 'msg1' }])
    const res = await app.request('/conversation/conv_1', { method: 'GET' })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.context).toBe('Summary')
  })

  it('GET /conversation/:id returns 404 when not found', async () => {
    mockConvexClient.query.mockResolvedValue(null)
    const res = await app.request('/conversation/missing', { method: 'GET' })
    expect(res.status).toBe(404)
  })
})
