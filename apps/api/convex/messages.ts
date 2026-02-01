import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const listByConversation = query({
  args: {
    conversationId: v.id('conversations'),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50
    const results = await ctx.db
      .query('messages')
      .withIndex('by_conversation', (q) => q.eq('conversationId', args.conversationId))
      .order('asc')
      .take(limit)

    return results
  },
})

export const create = mutation({
  args: {
    userId: v.id('users'),
    conversationId: v.id('conversations'),
    role: v.union(v.literal('user'), v.literal('assistant'), v.literal('system')),
    content: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('messages', {
      userId: args.userId,
      conversationId: args.conversationId,
      role: args.role,
      content: args.content,
      metadata: args.metadata,
    })

    const conversation = await ctx.db.get(args.conversationId)
    if (conversation) {
      await ctx.db.patch(args.conversationId, {
        messageCount: conversation.messageCount + 1,
        lastMessageAt: Date.now(),
      })
    }

    return id
  },
})

export const remove = mutation({
  args: { id: v.id('messages') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
