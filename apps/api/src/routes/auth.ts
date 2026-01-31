import { zValidator } from '@hono/zod-validator'
import { emailSchema, passwordSchema } from '@repo/utils/validation'
import { Hono } from 'hono'
import { z } from 'zod'

export const authRoutes = new Hono()

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1),
})

authRoutes.post('/signup', zValidator('json', signupSchema), async (c) => {
  const { email, password, name } = c.req.valid('json')

  const userId = `user_${Math.random().toString(36).substring(7)}`
  const token = `token_${Math.random().toString(36).substring(7)}`

  return c.json({
    success: true,
    data: {
      user: {
        id: userId,
        email,
        name,
        tier: 'free',
        billingCycle: 'monthly',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      accessToken: token,
    },
  })
})

authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email } = c.req.valid('json')

  const userId = `user_${Math.random().toString(36).substring(7)}`
  const token = `token_${Math.random().toString(36).substring(7)}`

  return c.json({
    success: true,
    data: {
      user: {
        id: userId,
        email,
        name: 'User',
        tier: 'free',
        billingCycle: 'monthly',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      accessToken: token,
    },
  })
})

authRoutes.post('/logout', async (c) => {
  return c.json({ success: true })
})

authRoutes.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
      },
      401,
    )
  }

  return c.json({
    success: true,
    data: {
      id: 'user_123',
      email: 'user@example.com',
      name: 'User',
      tier: 'free',
      billingCycle: 'monthly',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
})
