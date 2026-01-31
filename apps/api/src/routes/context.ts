import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

export const contextRoutes = new Hono()

const proactiveCallbackSchema = z.object({
  context: z.string().min(1),
  trigger: z.string().min(1),
})

contextRoutes.post('/proactive', zValidator('json', proactiveCallbackSchema), async (c) => {
  const userId = c.req.header('X-User-ID')
  if (!userId) {
    return c.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      },
      401,
    )
  }

  const { context, trigger } = c.req.valid('json')

  const shouldRespond = trigger === 'memory_match' || trigger === 'context_switch'
  const memories: string[] = []

  if (shouldRespond) {
    memories.push('Relevant context based on your previous conversations')
  }

  return c.json({
    success: true,
    data: {
      shouldRespond,
      response: shouldRespond ? `Based on your context: ${context.substring(0, 100)}` : undefined,
      memories,
    },
  })
})

contextRoutes.get('/conversation/:conversationId', async (c) => {
  const userId = c.req.header('X-User-ID')
  if (!userId) {
    return c.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      },
      401,
    )
  }

  const conversationId = c.req.param('conversationId')

  return c.json({
    success: true,
    data: {
      context: `Context for conversation ${conversationId}`,
      memories: [],
    },
  })
})
