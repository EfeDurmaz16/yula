import { zValidator } from '@hono/zod-validator'
import { createAIClient } from '@repo/ai'
import { streamText } from 'ai'
import { Hono } from 'hono'
import { z } from 'zod'

export const chatRoutes = new Hono()

const chatSchema = z.object({
  conversationId: z.string(),
  message: z.string().min(1),
})

chatRoutes.post('/', zValidator('json', chatSchema), async (c) => {
  const { message } = c.req.valid('json')

  const anthropic = createAIClient()

  const result = streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: 'You are YULA, a helpful AI assistant with persistent memory.',
    messages: [{ role: 'user', content: message }],
  })

  const response = result.toDataStreamResponse()

  c.header('Content-Type', 'text/event-stream')
  c.header('Cache-Control', 'no-cache')
  c.header('Connection', 'keep-alive')

  return response
})

chatRoutes.post('/regenerate', async (c) => {
  const body = await c.req.json()
  const { conversationId } = body

  return c.json({
    success: true,
    data: {
      conversationId,
      message: 'Regeneration initiated',
    },
  })
})
