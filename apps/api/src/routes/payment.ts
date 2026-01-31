import { zValidator } from '@hono/zod-validator'
import { PRICING } from '@repo/types'
import { Hono } from 'hono'
import { z } from 'zod'

export const paymentRoutes = new Hono()

const checkoutSchema = z.object({
  tier: z.enum(['pro', 'max', 'ultra']),
  billingCycle: z.enum(['weekly', 'monthly', 'yearly']),
})

paymentRoutes.post('/checkout', zValidator('json', checkoutSchema), async (c) => {
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
  const signature = c.req.header('polar-signature')
  const body = await c.req.text()

  console.log('Received Polar webhook:', body.substring(0, 100))

  return c.json({ received: true })
})

paymentRoutes.get('/subscription', async (c) => {
  return c.json({
    success: true,
    data: {
      tier: 'free',
      billingCycle: 'monthly',
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    },
  })
})

paymentRoutes.post('/cancel', async (c) => {
  return c.json({
    success: true,
    data: {
      cancelAtPeriodEnd: true,
    },
  })
})
