import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

export const conversationRoutes = new Hono()

const createConversationSchema = z.object({
  title: z.string().default('New Conversation'),
})

const updateConversationSchema = z.object({
  title: z.string().optional(),
})

conversationRoutes.get('/', async (c) => {
  return c.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
      hasMore: false,
    },
  })
})

conversationRoutes.post('/', zValidator('json', createConversationSchema), async (c) => {
  const { title } = c.req.valid('json')

  return c.json({
    success: true,
    data: {
      id: `conv_${Math.random().toString(36).substring(7)}`,
      title,
      messageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
})

conversationRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')

  return c.json({
    success: true,
    data: {
      id,
      title: 'Conversation',
      messages: [],
      messageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
})

conversationRoutes.patch('/:id', zValidator('json', updateConversationSchema), async (c) => {
  const id = c.req.param('id')
  const updates = c.req.valid('json')

  return c.json({
    success: true,
    data: {
      id,
      ...updates,
      updatedAt: new Date().toISOString(),
    },
  })
})

conversationRoutes.delete('/:id', async (c) => {
  return c.json({ success: true })
})

conversationRoutes.get('/:id/messages', async (c) => {
  return c.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      pageSize: 50,
      hasMore: false,
    },
  })
})
