import { v } from 'convex/values'
import { api } from './_generated/api'
import { action, mutation, query } from './_generated/server'

export const listByUser = query({
  args: {
    userId: v.id('users'),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20
    const results = await ctx.db
      .query('memories')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .order('desc')
      .take(limit)

    return results
  },
})

export const getById = query({
  args: { id: v.id('memories') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const vectorSearch = action({
  args: {
    userId: v.id('users'),
    embedding: v.array(v.float64()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const results = await ctx.vectorSearch('memories', 'by_embedding', {
      vector: args.embedding,
      limit: args.limit ?? 10,
      filter: (q) => q.eq('userId', args.userId),
    })

    const memories = await Promise.all(
      results.map(async (result) => {
        const memory = await ctx.runQuery(api.memories.getById, { id: result._id })
        return { ...memory, _score: result._score }
      }),
    )

    return memories.filter(Boolean)
  },
})

export const create = mutation({
  args: {
    userId: v.id('users'),
    content: v.string(),
    embedding: v.array(v.float64()),
    source: v.union(
      v.literal('import'),
      v.literal('conversation'),
      v.literal('proactive'),
      v.literal('tool'),
    ),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('memories', {
      userId: args.userId,
      content: args.content,
      embedding: args.embedding,
      source: args.source,
      metadata: args.metadata,
    })
  },
})

export const remove = mutation({
  args: { id: v.id('memories') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
