import { Hono } from 'hono'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockConvexClient, resetMocks } from '../test-helpers'
import type { AppEnv } from '../types'
import { chatRoutes } from './chat'

const app = new Hono<AppEnv>()
app.use('*', async (c, next) => {
  c.set('userId', 'user_1' as AppEnv['Variables']['userId'])
  await next()
})
app.route('/', chatRoutes)

describe('chat routes', () => {
  beforeEach(() => resetMocks())

  it('POST / saves message and streams response', async () => {
    mockConvexClient.mutation.mockResolvedValue('msg_1')
    mockConvexClient.query.mockResolvedValue([{ role: 'user', content: 'hello' }])
    const res = await app.request('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'conv_1', message: 'hello' }),
    })
    expect(res.status).toBe(200)
    expect(mockConvexClient.mutation).toHaveBeenCalled()
  })

  it('POST /regenerate returns success', async () => {
    const res = await app.request('/regenerate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: 'conv_1' }),
    })
    const json = await res.json()
    expect(json.success).toBe(true)
  })
})
