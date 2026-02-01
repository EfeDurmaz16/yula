import { Hono } from 'hono'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockConvexClient, resetMocks } from '../test-helpers'
import type { AppEnv } from '../types'
import { paymentRoutes } from './payment'

const app = new Hono<AppEnv>()
app.use('*', async (c, next) => {
  c.set('userId', 'user_1' as AppEnv['Variables']['userId'])
  await next()
})
app.route('/', paymentRoutes)

describe('payment routes', () => {
  beforeEach(() => resetMocks())

  it('POST /checkout returns checkout url', async () => {
    const res = await app.request('/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'pro', billingCycle: 'monthly' }),
    })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.checkoutUrl).toContain('polar.sh')
    expect(json.data.tier).toBe('pro')
  })

  it('POST /webhook handles subscription created', async () => {
    mockConvexClient.query.mockResolvedValue(null)
    mockConvexClient.mutation.mockResolvedValue('sub_1')
    const res = await app.request('/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'subscription.created',
        data: {
          id: 'polar_sub_1',
          status: 'active',
          current_period_end: '2025-01-01T00:00:00Z',
          metadata: { userId: 'user_1', tier: 'pro', billingCycle: 'monthly' },
        },
      }),
    })
    const json = await res.json()
    expect(json.received).toBe(true)
  })

  it('GET /subscription returns subscription', async () => {
    mockConvexClient.query.mockResolvedValue({
      tier: 'pro',
      billingCycle: 'monthly',
      status: 'active',
    })
    const res = await app.request('/subscription', { method: 'GET' })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.tier).toBe('pro')
  })

  it('GET /subscription returns free defaults when no subscription', async () => {
    mockConvexClient.query.mockResolvedValue(null)
    const res = await app.request('/subscription', { method: 'GET' })
    const json = await res.json()
    expect(json.data.tier).toBe('free')
  })

  it('POST /cancel cancels subscription', async () => {
    mockConvexClient.query.mockResolvedValue({ _id: 'sub_1' })
    mockConvexClient.mutation.mockResolvedValue({ status: 'canceled' })
    const res = await app.request('/cancel', { method: 'POST' })
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.cancelAtPeriodEnd).toBe(true)
  })
})
