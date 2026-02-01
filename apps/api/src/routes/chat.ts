import { zValidator } from '@hono/zod-validator'
import { createAIClient } from '@repo/ai'
import { streamText } from 'ai'
import { Hono } from 'hono'
import { z } from 'zod'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import { getConvexClient } from '../lib/convex'
import type { AppEnv } from '../types'

export const chatRoutes = new Hono<AppEnv>()

const chatSchema = z.object({
  conversationId: z.string(),
  message: z.string().min(1),
})

chatRoutes.post('/', zValidator('json', chatSchema), async (c) => {
  const userId = c.get('userId')

  const { conversationId, message } = c.req.valid('json')
  const convexConversationId = conversationId as Id<'conversations'>

  await getConvexClient().mutation(api.messages.create, {
    userId,
    conversationId: convexConversationId,
    role: 'user',
    content: message,
  })

  const previousMessages = await getConvexClient().query(api.messages.listByConversation, {
    conversationId: convexConversationId,
    limit: 50,
  })

  const anthropic = createAIClient()

  const result = streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: 'You are YULA, a helpful AI assistant with persistent memory.',
    messages: previousMessages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    async onFinish({ text }) {
      await getConvexClient().mutation(api.messages.create, {
        userId,
        conversationId: convexConversationId,
        role: 'assistant',
        content: text,
      })
    },
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
