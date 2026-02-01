import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('sessions')
      .withIndex('by_token', (q) => q.eq('token', args.token))
      .first()
  },
})

export const create = mutation({
  args: {
    userId: v.id('users'),
    token: v.string(),
    expiresAt: v.number(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('sessions', args)
  },
})

export const remove = mutation({
  args: { id: v.id('sessions') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

export const removeByToken = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query('sessions')
      .withIndex('by_token', (q) => q.eq('token', args.token))
      .first()
    if (session) {
      await ctx.db.delete(session._id)
    }
  },
})
