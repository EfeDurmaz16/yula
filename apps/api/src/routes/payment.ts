import { zValidator } from '@hono/zod-validator'
import { PRICING } from '@repo/types'
import { Hono } from 'hono'
import { z } from 'zod'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import { getConvexClient } from '../lib/convex'
import type { AppEnv } from '../types'

export const paymentRoutes = new Hono<AppEnv>()

const checkoutSchema = z.object({
  tier: z.enum(['pro', 'max', 'ultra']),
  billingCycle: z.enum(['weekly', 'monthly', 'yearly']),
})

paymentRoutes.post('/checkout', zValidator('json', checkoutSchema), async (c) => {
  const userId = c.get('userId')

  const { tier, billingCycle } = c.req.valid('json')
  const pricing = PRICING[tier]

  const price =
    billingCycle === 'monthly'
      ? pricing.monthlyPrice
      : billingCycle === 'yearly'
        ? pricing.yearlyPrice
        : pricing.weeklyPrice

  return c.json({
    success: true,
    data: {
      checkoutUrl: `https://polar.sh/checkout/yula-${tier}-${billingCycle}`,
      tier,
      billingCycle,
      price,
    },
  })
})

paymentRoutes.post('/webhook', async (c) => {
  const body = await c.req.json()
  const event = body.type

  if (event === 'subscription.created' || event === 'subscription.updated') {
    const sub = body.data
    const userId = sub.metadata?.userId as Id<'users'>
    if (userId) {
      const existing = await getConvexClient().query(api.subscriptions.getByUser, { userId })
      if (existing) {
        await getConvexClient().mutation(api.subscriptions.update, {
          id: existing._id,
          status: sub.status,
          tier: sub.metadata?.tier,
          billingCycle: sub.metadata?.billingCycle,
          currentPeriodEnd: new Date(sub.current_period_end).getTime(),
        })
      } else {
        await getConvexClient().mutation(api.subscriptions.create, {
          userId,
          polarSubscriptionId: sub.id,
          status: sub.status,
          tier: sub.metadata?.tier ?? 'pro',
          billingCycle: sub.metadata?.billingCycle ?? 'monthly',
          currentPeriodEnd: new Date(sub.current_period_end).getTime(),
        })
      }
    }
  }

  return c.json({ received: true })
})

paymentRoutes.get('/subscription', async (c) => {
  const userId = c.get('userId')

  const subscription = await getConvexClient().query(api.subscriptions.getByUser, { userId })

  return c.json({
    success: true,
    data: subscription ?? {
      tier: 'free',
      billingCycle: 'monthly',
      currentPeriodEnd: null,
      status: 'active',
    },
  })
})

paymentRoutes.post('/cancel', async (c) => {
  const userId = c.get('userId')

  const subscription = await getConvexClient().query(api.subscriptions.getByUser, { userId })
  if (subscription) {
    await getConvexClient().mutation(api.subscriptions.cancel, { id: subscription._id })
  }

  return c.json({
    success: true,
    data: { cancelAtPeriodEnd: true },
  })
})
