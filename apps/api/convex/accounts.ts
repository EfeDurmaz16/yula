import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getByProviderAccountId = query({
  args: {
    providerId: v.string(),
    accountId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('accounts')
      .withIndex('by_provider_account', (q) =>
        q.eq('providerId', args.providerId).eq('accountId', args.accountId),
      )
      .first()
  },
})

export const listByUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('accounts')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect()
  },
})

export const create = mutation({
  args: {
    userId: v.id('users'),
    accountId: v.string(),
    providerId: v.string(),
    accessToken: v.optional(v.string()),
    refreshToken: v.optional(v.string()),
    accessTokenExpiresAt: v.optional(v.number()),
    refreshTokenExpiresAt: v.optional(v.number()),
    scope: v.optional(v.string()),
    idToken: v.optional(v.string()),
    password: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('accounts', args)
  },
})

export const remove = mutation({
  args: { id: v.id('accounts') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
