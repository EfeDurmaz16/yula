import { zValidator } from '@hono/zod-validator'
import { generateEmbedding } from '@repo/ai/embeddings'
import { Hono } from 'hono'
import { z } from 'zod'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import { getConvexClient } from '../lib/convex'
import type { AppEnv } from '../types'

export const memoryRoutes = new Hono<AppEnv>()

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
  const userId = c.get('userId')

  const { content, source, metadata } = c.req.valid('json')
  const embedding = await generateEmbedding(content)

  const id = await getConvexClient().mutation(api.memories.create, {
    userId,
    content,
    embedding,
    source,
    metadata,
  })

  return c.json({
    success: true,
    data: { id, content, source, metadata },
  })
})

memoryRoutes.get('/search', zValidator('query', searchMemorySchema), async (c) => {
  const userId = c.get('userId')

  const { query, limit, threshold } = c.req.valid('query')
  const embedding = await generateEmbedding(query)

  const results = await getConvexClient().action(api.memories.vectorSearch, {
    userId,
    embedding,
    limit,
  })

  const filtered = results.filter(
    (r: Record<string, unknown>) => ((r._score as number) ?? 0) >= threshold,
  )

  return c.json({
    success: true,
    data: { items: filtered, query },
  })
})

memoryRoutes.get('/', async (c) => {
  const userId = c.get('userId')

  const limit = Number(c.req.query('limit') || '20')
  const memories = await getConvexClient().query(api.memories.listByUser, { userId, limit })

  return c.json({
    success: true,
    data: {
      items: memories,
      total: memories.length,
    },
  })
})

memoryRoutes.get('/:id', async (c) => {
  const id = c.req.param('id') as Id<'memories'>
  const memory = await getConvexClient().query(api.memories.getById, { id })

  if (!memory) {
    return c.json(
      { success: false, error: { code: 'NOT_FOUND', message: 'Memory not found' } },
      404,
    )
  }

  return c.json({ success: true, data: memory })
})

memoryRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id') as Id<'memories'>
  await getConvexClient().mutation(api.memories.remove, { id })
  return c.json({ success: true })
})
