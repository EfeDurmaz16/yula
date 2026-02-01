import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import { getConvexClient } from '../lib/convex'
import type { AppEnv } from '../types'

export const conversationRoutes = new Hono<AppEnv>()

const createConversationSchema = z.object({
  title: z.string().default('New Conversation'),
})

const updateConversationSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
})

conversationRoutes.get('/', async (c) => {
  const userId = c.get('userId')

  const limit = Number(c.req.query('limit') || '20')
  const result = await getConvexClient().query(api.conversations.listByUser, {
    userId,
    limit,
  })

  return c.json({
    success: true,
    data: {
      items: result.items,
      total: result.items.length,
      hasMore: result.hasMore,
    },
  })
})

conversationRoutes.post('/', zValidator('json', createConversationSchema), async (c) => {
  const userId = c.get('userId')

  const { title } = c.req.valid('json')
  const id = await getConvexClient().mutation(api.conversations.create, {
    userId,
    title,
  })

  const conversation = await getConvexClient().query(api.conversations.getById, { id })

  return c.json({ success: true, data: conversation })
})

conversationRoutes.get('/:id', async (c) => {
  const id = c.req.param('id') as Id<'conversations'>
  const conversation = await getConvexClient().query(api.conversations.getById, { id })

  if (!conversation) {
    return c.json(
      { success: false, error: { code: 'NOT_FOUND', message: 'Conversation not found' } },
      404,
    )
  }

  return c.json({ success: true, data: conversation })
})

conversationRoutes.patch('/:id', zValidator('json', updateConversationSchema), async (c) => {
  const id = c.req.param('id') as Id<'conversations'>
  const updates = c.req.valid('json')

  const conversation = await getConvexClient().mutation(api.conversations.update, {
    id,
    ...updates,
  })

  return c.json({ success: true, data: conversation })
})

conversationRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id') as Id<'conversations'>
  await getConvexClient().mutation(api.conversations.remove, { id })
  return c.json({ success: true })
})

conversationRoutes.get('/:id/messages', async (c) => {
  const conversationId = c.req.param('id') as Id<'conversations'>
  const limit = Number(c.req.query('limit') || '50')

  const messages = await getConvexClient().query(api.messages.listByConversation, {
    conversationId,
    limit,
  })

  return c.json({
    success: true,
    data: {
      items: messages,
      total: messages.length,
    },
  })
})
