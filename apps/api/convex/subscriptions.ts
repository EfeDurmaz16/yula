import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getByUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('subscriptions')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .first()
  },
})

export const create = mutation({
  args: {
    userId: v.id('users'),
    polarSubscriptionId: v.string(),
    status: v.string(),
    currentPeriodEnd: v.number(),
    tier: v.string(),
    billingCycle: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('subscriptions', args)
  },
})

export const update = mutation({
  args: {
    id: v.id('subscriptions'),
    status: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
    tier: v.optional(v.string()),
    billingCycle: v.optional(v.string()),
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

export const cancel = mutation({
  args: { id: v.id('subscriptions') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: 'canceled' })
    return await ctx.db.get(args.id)
  },
})
