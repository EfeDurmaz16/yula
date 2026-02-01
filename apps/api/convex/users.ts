import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()
  },
})

export const getById = query({
  args: { id: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    passwordHash: v.optional(v.string()),
    image: v.optional(v.string()),
    tier: v.optional(
      v.union(v.literal('free'), v.literal('pro'), v.literal('max'), v.literal('ultra')),
    ),
    billingCycle: v.optional(
      v.union(v.literal('weekly'), v.literal('monthly'), v.literal('yearly')),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()

    if (existing) {
      throw new Error('User with this email already exists')
    }

    return await ctx.db.insert('users', {
      email: args.email,
      name: args.name,
      passwordHash: args.passwordHash,
      image: args.image,
      tier: args.tier ?? 'free',
      billingCycle: args.billingCycle ?? 'monthly',
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('users'),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    tier: v.optional(
      v.union(v.literal('free'), v.literal('pro'), v.literal('max'), v.literal('ultra')),
    ),
    billingCycle: v.optional(
      v.union(v.literal('weekly'), v.literal('monthly'), v.literal('yearly')),
    ),
    polarCustomerId: v.optional(v.string()),
    lastLoginAt: v.optional(v.number()),
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
