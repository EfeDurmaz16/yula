import { Hono } from 'hono'

export const healthRoutes = new Hono()

healthRoutes.get('/', (c) => {
  return c.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '0.0.1',
    },
  })
})
