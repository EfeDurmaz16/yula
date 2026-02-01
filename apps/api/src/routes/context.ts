import { zValidator } from '@hono/zod-validator'
import { generateEmbedding } from '@repo/ai/embeddings'
import { Hono } from 'hono'
import { z } from 'zod'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import { getConvexClient } from '../lib/convex'
import type { AppEnv } from '../types'

export const contextRoutes = new Hono<AppEnv>()

const proactiveCallbackSchema = z.object({
  context: z.string().min(1),
  trigger: z.string().min(1),
})

contextRoutes.post('/proactive', zValidator('json', proactiveCallbackSchema), async (c) => {
  const userId = c.get('userId')

  const { context, trigger } = c.req.valid('json')
  const shouldRespond = trigger === 'memory_match' || trigger === 'context_switch'

  let memories: unknown[] = []
  if (shouldRespond) {
    const embedding = await generateEmbedding(context)
    memories = await getConvexClient().action(api.memories.vectorSearch, {
      userId,
      embedding,
      limit: 5,
    })
  }

  return c.json({
    success: true,
    data: {
      shouldRespond,
      response: shouldRespond ? `Based on your context: ${context.substring(0, 100)}` : undefined,
      memories: (memories as { content: string }[]).map((m) => m.content),
    },
  })
})

contextRoutes.get('/conversation/:conversationId', async (c) => {
  const userId = c.get('userId')

  const conversationId = c.req.param('conversationId') as Id<'conversations'>
  const conversation = await getConvexClient().query(api.conversations.getById, {
    id: conversationId,
  })

  if (!conversation) {
    return c.json(
      { success: false, error: { code: 'NOT_FOUND', message: 'Conversation not found' } },
      404,
    )
  }

  const messages = await getConvexClient().query(api.messages.listByConversation, {
    conversationId,
    limit: 10,
  })

  return c.json({
    success: true,
    data: {
      context: conversation.summary || conversation.title,
      memories: (messages as { content: string }[]).map((m) => m.content),
    },
  })
})
