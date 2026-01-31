import { zValidator } from '@hono/zod-validator'
import { truncate } from '@repo/utils/formatting'
import { Hono } from 'hono'
import { z } from 'zod'

export const memoryRoutes = new Hono()

const importMemorySchema = z.object({
  content: z.string().min(1),
  source: z.enum(['import', 'conversation', 'proactive', 'tool']).default('import'),
  metadata: z.record(z.unknown()).optional(),
})

const searchMemorySchema = z.object({
  query: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  threshold: z.coerce.number().min(0).max(1).default(0.7),
})

memoryRoutes.post('/import', zValidator('json', importMemorySchema), async (c) => {
  const { content, source, metadata } = c.req.valid('json')

  return c.json({
    success: true,
    data: {
      id: `mem_${Math.random().toString(36).substring(7)}`,
      content: truncate(content, 100),
      source,
      metadata,
      createdAt: new Date().toISOString(),
    },
  })
})

memoryRoutes.get('/search', zValidator('query', searchMemorySchema), async (c) => {
  const { query } = c.req.valid('query')

  return c.json({
    success: true,
    data: {
      items: [],
      query,
    },
  })
})

memoryRoutes.get('/', async (c) => {
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

memoryRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')

  return c.json({
    success: true,
    data: {
      id,
      content: 'Memory content',
      source: 'import',
      createdAt: new Date().toISOString(),
    },
  })
})

memoryRoutes.delete('/:id', async (c) => {
  return c.json({ success: true })
})
