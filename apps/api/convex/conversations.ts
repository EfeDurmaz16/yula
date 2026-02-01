import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const listByUser = query({
  args: {
    userId: v.id('users'),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20
    const results = await ctx.db
      .query('conversations')
      .withIndex('by_user_recent', (q) => q.eq('userId', args.userId))
      .order('desc')
      .take(limit + 1)

    const hasMore = results.length > limit
    const items = hasMore ? results.slice(0, limit) : results

    return { items, hasMore }
  },
})

export const getById = query({
  args: { id: v.id('conversations') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    userId: v.id('users'),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert('conversations', {
      userId: args.userId,
      title: args.title ?? 'New Conversation',
      messageCount: 0,
      lastMessageAt: now,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('conversations'),
    title: v.optional(v.string()),
    summary: v.optional(v.string()),
    messageCount: v.optional(v.number()),
    lastMessageAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args
    const updates: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates[key] = value
      }
    }
    await ctx.db.patch(id, updates)
    return await ctx.db.get(id)
  },
})

export const remove = mutation({
  args: { id: v.id('conversations') },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_conversation', (q) => q.eq('conversationId', args.id))
      .collect()

    for (const msg of messages) {
      await ctx.db.delete(msg._id)
    }

    await ctx.db.delete(args.id)
  },
})
